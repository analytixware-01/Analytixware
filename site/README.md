# Analytixware website (Astro)

The analytixware.in site, rebuilt with [Astro](https://astro.build) as a static site. It keeps the original theme and uses clean URLs (`/about`, `/services`, …).

Most day-to-day changes are content edits in **`src/content/`**: plain text files with no HTML.

## Editing content

| To change… | Edit this file | Appears on |
| --- | --- | --- |
| Blog posts | `src/content/blog/*.md` (one file per post) | `/blog` |
| Services | `src/content/services.yaml` | home page cards and `/services` |
| Case studies | `src/content/case-studies.yaml` | `/case-studies` |
| Dashboard templates | `src/content/dashboards.yaml` | `/dashboards` (and `/thank-you`) |
| Address, phone, email, social links, menu | `src/data/site.ts` | navbar and footer on every page |

Items appear in the order they are written in the file. Move an item up or down to reorder it.

### Add a blog post

Create a new file in `src/content/blog/`, for example `my-new-post.md`:

```markdown
---
title: "My New Post"
date: "2026-12-01"
excerpt: "One or two sentences shown before Read More..."
tags:
  - DataAnalytics
  - Dashboards
---

The full article goes here. Leave a blank line between paragraphs.

**1. A bold sub-heading**

- A bullet point
- Another bullet point

*Italic text* and [a link](https://example.com) work too.
```

- Posts are sorted newest first by `date` (format `YYYY-MM-DD`). The page shows it as "1 Dec 2026, Tuesday".
- Write tags without the `#`; it's added automatically.
- Add `draft: true` to the top section to hide a post without deleting it.
- Links to other websites open in a new tab.

### Add a service, case study or dashboard

Copy an existing block in the `.yaml` file, paste it where it should appear, and change the text. Each block starts with `- id:`. The id must be unique, lowercase, with dashes and no spaces.

```yaml
- id: shopify-dashboard
  title: Shopify Dashboard
  description: >-
    The description can span several lines.
    Keep the two-space indent.
  image: img/shopify.png
  alt: Shopify Dashboard
```

Put new images in `public/img/` and run `npm run optimize:media` to compress them.

If a required field is missing or misspelled, `npm run build` stops and names the file and field to fix.

## Commands (run inside `site/`)

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (first time only) |
| `npm run dev` | Local preview with live reload at http://localhost:4321/ |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run optimize:media` | Compress new images or videos in `public/img` |

## Where the layout lives (for developers)

- `src/layouts/Base.astro`: `<head>` (SEO, fonts, CSS, Google Analytics, WhatsApp widget), spinner, scripts.
- `src/components/`: `Navbar`, `Footer`, `PageHero` (blue page banner), `ServiceCard`, `BlogCard`, `CaseStudyCard`, `DashboardRow`.
- `src/pages/*.astro`: one file per page. The file name becomes the URL (`about.astro` becomes `/about`).
- `src/content.config.ts`: the fields each content type must have.
- `public/`: static files copied as-is (`css/`, `js/`, `lib/`, `img/`, PDFs, `sitemap.xml`, Google verification file).

Theme styles are in `public/css/style.css`. Page markup uses Bootstrap 5 classes.

## Page addresses

Pages have clean URLs with no `.html`:

| Page | URL | Source file |
| --- | --- | --- |
| Home | `/` | `src/pages/index.astro` |
| About | `/about` | `src/pages/about.astro` |
| Services | `/services` | `src/pages/services.astro` |
| Case studies | `/case-studies` | `src/pages/case-studies.astro` |
| Request a case study | `/request-case-study` | `src/pages/request-case-study.astro` |
| Blog | `/blog` | `src/pages/blog.astro` |
| Contact | `/contact` | `src/pages/contact.astro` |
| Dashboard templates | `/dashboards` | `src/pages/dashboards.astro` |
| Thank you (after forms) | `/thank-you` | `src/pages/thank-you.astro` |
| Not found | any unknown URL | `src/pages/404.astro` |

Menu links are in `src/data/site.ts`. `sitemap.xml` is generated from `src/pages` automatically.

## Checking changes while editing

Run `npm run dev` inside `site/` and open http://localhost:4321/. Saved changes appear in the browser automatically.
After changing `src/content.config.ts` or adding a new content type, stop the server (Ctrl+C) and run `npm run dev` again.

## Deploying

Run `npm run build` and upload the **contents** of `dist/` to the web host, including the hidden `.htaccess` file. On the current LiteSpeed/cPanel hosting, `.htaccess`:

- serves `/about` from `about.html`, so visitors never see `.html`
- permanently redirects (301) every old address (`about.html`, `service.html`, `project.html`, `blogs.html` …) to its new URL, keeping Google rankings and old links working
- redirects to HTTPS, removes trailing slashes, shows the custom 404 page, and sets caching and compression

Netlify and Cloudflare Pages serve clean URLs automatically and use `_redirects` for the old addresses (build command `npm run build`, output folder `dist`).

After going live, submit `https://analytixware.in/sitemap.xml` in Google Search Console.
