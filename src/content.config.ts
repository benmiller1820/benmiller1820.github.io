// Content collections: the shape of every Markdown file's frontmatter.
// If a required field is missing or the wrong type, `npm run build` fails
// and names the file and field, so mistakes never reach the live site.
import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { smartQuotes } from './lib/typography';

// Display text: straight quotes become curly, like Markdown body text.
const text = z.string().transform(smartQuotes);

// A picture, or a labeled placeholder box until a real image is added.
// `alt` doubles as the placeholder label, e.g. "[job submission]".
const picture = (image: SchemaContext['image']) =>
  z.object({
    src: image().optional(),
    alt: text,
  });

// Home page: src/content/pages/home.md. The Markdown body is the bio.
const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content/pages' }),
  schema: z.object({
    title: text.optional(),
    headline: text,
    headlineAccent: text,
    resumeLabel: text.default('Download resume ↓'),
    linkedinLabel: text.default('LinkedIn ↗'),
    workHeading: text.default('Selected work'),
    workYear: text,
  }),
});

// About page: src/content/pages/about.md. The Markdown body holds the
// "How I got here" and "What I believe" sections (one per ## heading).
const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: text.default('About'),
      heading: text,
      intro: text,
      photo: picture(image),
      cardsHeading: text,
      cards: z.array(z.object({ title: text, text: text })).min(1),
      closing: z.object({
        heading: text,
        emailLabel: text.default('Email me'),
        resumeLabel: text.default('Download resume ↓'),
      }),
    }),
});

// Case studies: one file per case study in src/content/work/.
// The file name becomes the URL: clink.md -> /work/clink/
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      draft: z.boolean().default(false),
      title: text,
      tag: text,
      summary: text,
      hook: text,
      intro: text,
      role: text,
      timeline: text,
      status: text,
      // A full https:// link becomes clickable; anything else shows as text.
      liveUrl: z.string(),
      thumbnail: picture(image),
      hero: picture(image),
      screenshots: z.array(picture(image)).max(2).default([]),
      decision: z.object({
        eyebrow: text.default('Key decision'),
        headline: text,
        body: text,
        // Comparison table: first row is the column headers.
        table: z.array(z.array(text)).min(2).optional(),
        points: z.array(text).optional(),
        why: text.optional(),
        tradeoff: text.optional(),
      }),
    }),
});

export const collections = { home, about, work };
