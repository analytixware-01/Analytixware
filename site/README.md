# Analytixware website (Astro)

The analytixware.in site, rebuilt with [Astro](https://astro.build). It keeps the same theme and markup and outputs the same `.html` URLs.

## Commands (run inside `site/`)

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (first time only) |
| `npm run dev` | Local dev server with live reload at http://localhost:4321/index.html |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run optimize:media` | Compress any new images or videos added to `public/img` |

## Where things live

- `src/layouts/Base.astro` holds the `<head>` (SEO meta, fonts, CSS, Google Analytics, WhatsApp widget), the spinner, the back-to-top button and the scripts.
- `src/components/Navbar.astro` and `src/components/Footer.astro` are shared by every page.
- `src/data/site.ts` has the company address, phone, email, social links and menu items. Edit them here once.
- `src/pages/*.astro` has one file per page. The file name becomes the URL (`about.astro` becomes `/about.html`).
- `public/` holds static files copied as-is: `css/`, `js/`, `lib/`, `img/`, the PDFs, `sitemap.xml` and the Google verification file.

## Adding a page

Create `src/pages/new-page.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="Page title" description="SEO description" active="service.html">
    <!-- page content (Bootstrap markup, same as before) -->
</Base>
```

## Deploying

Run `npm run build` and upload the **contents** of `dist/` to the web host, the same way the old HTML files were uploaded. It also works with free static hosts such as Netlify, Cloudflare Pages, Vercel or GitHub Pages (build command `npm run build`, output folder `dist`).
