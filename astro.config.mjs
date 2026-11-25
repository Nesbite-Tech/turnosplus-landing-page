// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://turnosplus.app',

  output: 'server',

  // Canonical URLs have no trailing slash; wrangler.jsonc serves pages the same way.
  trailingSlash: 'never',

  // The landing stores no per-visitor data, so skip the Cloudflare KV session binding.
  session: false,

  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'mx', 'br', 'cl', 'us'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      // Skip the 404 page and the bare root, which only redirects to a country.
      filter: (page) => !page.includes('/404') && new URL(page).pathname !== '/',
    }),
  ],
  adapter: cloudflare({
    // Every image page is prerendered, so optimize with Sharp at build time only.
    imageService: 'compile',
  }),
});
