import { getCollection, type CollectionEntry } from 'astro:content';

export type CaseStudy = CollectionEntry<'work'>;

// Published case studies, ordered by their `order` field.
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const entries = await getCollection('work', ({ data }) => !data.draft);
  const orders = entries.map((e) => e.data.order);
  const dupe = orders.find((o, i) => orders.indexOf(o) !== i);
  if (dupe !== undefined) throw new Error(`Two case studies share order: ${dupe}`);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

// 1 -> "01"
export const caseNumber = (order: number) => String(order).padStart(2, '0');

// "Case study 01 · 0-to-1 product" (first part of the tag line)
export const caseEyebrow = (entry: CaseStudy) =>
  `Case study ${caseNumber(entry.data.order)} · ${entry.data.tag.split('·')[0].trim()}`;

// The next case study in order, wrapping around to the first.
export const nextCaseStudy = (all: CaseStudy[], current: CaseStudy) =>
  all[(all.findIndex((e) => e.id === current.id) + 1) % all.length];

// Only a clean http(s) URL becomes a link; "[Live app link]" or
// "https://hdmllp.com (once launched)" display as plain text.
export function liveHref(value: string): string | undefined {
  if (/\s/.test(value.trim())) return undefined;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}
