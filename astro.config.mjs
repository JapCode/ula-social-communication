// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [mdx(), tina()],
  vite: {
    plugins: [tailwindcss(), tinaAdminDevRedirect()],
    ssr: {
      noExternal: ['@tinacms/astro', '@tinacms/bridge', '@tinacms/auth', 'tinacms'],
    },
    server: {
      proxy: {
        '/admin': {
          target: 'http://localhost:4001',
          changeOrigin: true,
        },
      },
    },
  },
  image: {
    service: passthroughImageService(),
  },
});
