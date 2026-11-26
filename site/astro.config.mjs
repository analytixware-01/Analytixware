// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://analytixware.in',
  // Emit about.html, service.html ... so existing URLs, the sitemap and
  // Google Search Console verification keep working unchanged.
  build: { format: 'file' },
  trailingSlash: 'never',
  compressHTML: true,
  // Keep blog text exactly as written (no automatic curly quotes / dashes).
  markdown: { smartypants: false },
});
