// Content collections: the site's editable content, checked at build time.
// If a field is missing or has the wrong type, `npm run build` stops with a clear message.
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per post in src/content/blog/. Newest date is shown first.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: file('src/content/services.yaml'),
  schema: z.object({
    title: z.string(),
    // Font Awesome 5 (free, solid) icon names used on the service cards
    icon: z.enum([
      'fa-robot', 'fa-database', 'fa-cloud', 'fa-chart-bar', 'fa-brain', 'fa-chart-pie',
      'fa-dollar-sign', 'fa-chart-line', 'fa-code', 'fa-cogs', 'fa-comments',
    ]),
    summary: z.string(),
    description: z.string(),
  }),
});

const caseStudies = defineCollection({
  loader: file('src/content/case-studies.yaml'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string(),
    link: z.string(),
  }),
});

const dashboards = defineCollection({
  loader: file('src/content/dashboards.yaml'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    alt: z.string(),
  }),
});

export const collections = { blog, services, caseStudies, dashboards };
