// Cloudflare Pages _middleware.js
// Serves /images/uploads/ files from GitHub raw content when the static file
// hasn't been deployed yet (bridges the gap between CMS upload and deploy).
// Works with both Cloudflare Pages Functions v1 and v2.

const REPO = 'Comunicacionsocialulanurr/ula-social-communication';
const BRANCH = 'master';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Only intercept /images/uploads/ requests
  if (!url.pathname.startsWith('/images/uploads/')) {
    return next(request);
  }

  // Try the deployed static file first
  const staticResponse = await next(request);

  // If it was found, return it directly
  if (staticResponse.status !== 404) {
    return staticResponse;
  }

  // File not found in build output (probably newly uploaded via CMS)
  // Fetch from GitHub raw content instead
  const filePath = url.pathname.replace('/images/uploads/', '');
  // Encode each path segment individually to handle spaces, unicode, etc.
  const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
  const rawUrl = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/public/images/uploads/${encodedPath}`;

  try {
    const ghResponse = await fetch(rawUrl);

    if (!ghResponse.ok) {
      // GitHub doesn't have it either — return the original 404
      return staticResponse;
    }

    // Forward the GitHub response with caching headers
    const headers = new Headers(ghResponse.headers);
    headers.set('Cache-Control', 'public, max-age=86400');

    return new Response(ghResponse.body, {
      status: ghResponse.status,
      headers,
    });
  } catch (error) {
    console.error('Media proxy error:', error);
    return staticResponse;
  }
}
