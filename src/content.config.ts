// Content collections: the shape of every Markdown file's frontmatter.
// If a required field is missing or the wrong type, `npm run build` fails
// and names the file and field, so mistakes never reach the live site.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A picture, or a labeled placeholder box until a real image is added.
// `alt` doubles as the placeholder label, e.g. "[job submission]".
const picture = (image: () => z.ZodType) =>
  z.object({
    src: image().optional(),
    alt: z.string(),
  });

// Home page: src/content/pages/home.md. The Markdown body is the bio.
const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional(),
    headline: z.string(),
    headlineAccent: z.string(),
    resumeLabel: z.string().default('Download resume ↓'),
    linkedinLabel: z.string().default('LinkedIn ↗'),
    workHeading: z.string().default('Selected work'),
    workYear: z.string(),
  }),
});

// About page: src/content/pages/about.md. The Markdown body holds the
// "How I got here" and "What I believe" sections (one per ## heading).
const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().default('About'),
      heading: z.string(),
      intro: z.string(),
      photo: picture(image),
      cardsHeading: z.string(),
      cards: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
      closing: z.object({
        heading: z.string(),
        emailLabel: z.string().default('Email me'),
        resumeLabel: z.string().default('Download resume ↓'),
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
      title: z.string(),
      tag: z.string(),
      summary: z.string(),
      hook: z.string(),
      intro: z.string(),
      role: z.string(),
      timeline: z.string(),
      status: z.string(),
      // A full https:// link becomes clickable; anything else shows as text.
      liveUrl: z.string(),
      thumbnail: picture(image),
      hero: picture(image),
      screenshots: z.array(picture(image)).max(2).default([]),
      decision: z.object({
        eyebrow: z.string().default('Key decision'),
        headline: z.string(),
        body: z.string(),
        // Comparison table: first row is the column headers.
        table: z.array(z.array(z.string())).min(2).optional(),
        points: z.array(z.string()).optional(),
        why: z.string().optional(),
        tradeoff: z.string().optional(),
      }),
    }),
});

export const collections = { home, about, work };
