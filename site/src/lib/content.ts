import fs from 'node:fs';
import { getCollection, type CollectionEntry, type DataCollectionKey } from 'astro:content';

const files = {
  services: 'src/content/services.yaml',
  caseStudies: 'src/content/case-studies.yaml',
  dashboards: 'src/content/dashboards.yaml',
} as const;

/**
 * Entries of a YAML-backed collection in the order they are written in the file
 * (Astro itself returns them sorted by id). Reorder the file to reorder the page.
 */
export async function getInFileOrder<C extends keyof typeof files & DataCollectionKey>(name: C): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(name);
  const source = fs.readFileSync(files[name], 'utf8');
  const order = [...source.matchAll(/^-\s+id:\s*["']?([^"'\n]+?)["']?\s*$/gm)].map((m) => m[1]);
  const rank = (id: string) => {
    const i = order.indexOf(id);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return entries.sort((a, b) => rank(a.id) - rank(b.id));
}
