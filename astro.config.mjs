// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://maximumexecution.com',
  output: 'static',
  adapter: cloudflare({
    platformProxy: { enabled: true }, // exposes Cloudflare env bindings in local dev via wrangler
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
