// Cloudflare Pages Function — GitHub OAuth proxy for Decap CMS
// Handles both /api/auth and /api/auth/callback routes

interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // GET /api/auth — initiate OAuth by redirecting to GitHub
  if (request.method === 'GET' && url.pathname === '/api/auth') {
    const redirectUri = `${url.origin}/api/auth/callback`;
    const githubAuthUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${env.GITHUB_CLIENT_ID}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=repo,user`;

    return Response.redirect(githubAuthUrl, 302);
  }

  // GET /api/auth/callback — exchange code for token
  if (request.method === 'GET' && url.pathname === '/api/auth/callback') {
    const code = url.searchParams.get('code');

    if (!code) {
      return new Response('Missing authorization code', { status: 400, headers: corsHeaders });
    }

    // Exchange code for access token with GitHub
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new Response(JSON.stringify({ error: tokenData.error_description || tokenData.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send the token back via postMessage to the Decap CMS popup window
    const content = `<!DOCTYPE html>
<html>
<body>
<script>
  (function() {
    function receiveMessage() {
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify(tokenData)}',
        window.location.origin
      );
      window.close();
    }
    receiveMessage();
  })();
<\/script>
</body>
</html>`;

    return new Response(content, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders });
};
