// Generates /sitemap.xml from the pages in src/pages (no need to edit it by hand).
import type { APIRoute } from 'astro';
import { site } from '../data/site';

const EXCLUDE = new Set(['/404', '/thank-you']);
const PRIORITY: Record<string, string> = { '/': '1.00' };

export const GET: APIRoute = () => {
  const pages = Object.keys(import.meta.glob('./**/*.astro'))
    .map((file) => file.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/index$/, '/'))
    .filter((path) => !path.includes('[') && !EXCLUDE.has(path))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((path) => `  <url>\n    <loc>${new URL(path, site.url).href}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${PRIORITY[path] ?? '0.80'}</priority>\n  </url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
