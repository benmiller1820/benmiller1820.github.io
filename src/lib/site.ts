// Validates src/site.config.ts at build time so a typo in an email or URL
// fails the build instead of shipping a broken link. Components import
// `site` from here, not from the config file directly.
import { z } from 'astro/zod';
import { site as config } from '../site.config';
import { isPlaceholder } from './placeholder';

const orPlaceholder = (schema: z.ZodType<string>) =>
  z.string().refine((v) => isPlaceholder(v) || schema.safeParse(v).success, {
    message: 'must be a valid value or a [bracketed placeholder]',
  });

const schema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  email: orPlaceholder(z.email()),
  linkedin: orPlaceholder(z.url({ protocol: /^https$/ })),
  resume: z.string().startsWith('/'),
  description: z.string().min(1),
});

const parsed = schema.safeParse(config);
if (!parsed.success) {
  throw new Error(`src/site.config.ts is invalid:\n${z.prettifyError(parsed.error)}`);
}

export const site = parsed.data;
