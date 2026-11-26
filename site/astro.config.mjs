// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://analytixware.in',
  // Pages are linked as clean URLs (/about, /services ...) and built as about.html, services.html.
  // The web server serves /about from about.html and 301-redirects old *.html addresses:
  // see public/.htaccess (LiteSpeed/Apache) and public/_redirects (Netlify/Cloudflare Pages).
  build: { format: 'file' },
  trailingSlash: 'never',
  compressHTML: true,
  // Keep blog text exactly as written (no automatic curly quotes / dashes).
  markdown: { smartypants: false },
});
