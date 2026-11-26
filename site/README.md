# Analytixware website (Astro)

The analytixware.in site, rebuilt with [Astro](https://astro.build) as a static site. It keeps the original theme and outputs the same `.html` URLs.

Most day-to-day changes are content edits in **`src/content/`**: plain text files with no HTML.

## Editing content

| To change… | Edit this file | Appears on |
| --- | --- | --- |
| Blog posts | `src/content/blog/*.md` (one file per post) | `blogs.html` |
| Services | `src/content/services.yaml` | home page cards and `service.html` |
| Case studies | `src/content/case-studies.yaml` | `project.html` |
| Dashboard templates | `src/content/dashboards.yaml` | `dashboards.html` (and `thankyou.html`) |
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
| `npm run dev` | Local preview with live reload at http://localhost:4321/index.html |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run optimize:media` | Compress new images or videos in `public/img` |

## Where the layout lives (for developers)

- `src/layouts/Base.astro`: `<head>` (SEO, fonts, CSS, Google Analytics, WhatsApp widget), spinner, scripts.
- `src/components/`: `Navbar`, `Footer`, `PageHero` (blue page banner), `ServiceCard`, `BlogCard`, `CaseStudyCard`, `DashboardRow`.
- `src/pages/*.astro`: one file per page. The file name becomes the URL (`about.astro` becomes `/about.html`).
- `src/content.config.ts`: the fields each content type must have.
- `public/`: static files copied as-is (`css/`, `js/`, `lib/`, `img/`, PDFs, `sitemap.xml`, Google verification file).

Theme styles are in `public/css/style.css`. Page markup uses Bootstrap 5 classes.

## Deploying

Run `npm run build` and upload the **contents** of `dist/` to the web host, as the old HTML files were. Free static hosts such as Netlify, Cloudflare Pages, Vercel or GitHub Pages also work (build command `npm run build`, output folder `dist`).
