// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { markdownSections } from './src/lib/markdown-sections.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://benmiller1820.github.io',
  // If this repo is ever renamed (not <user>.github.io), set base: '/<repo-name>'.
  trailingSlash: 'ignore',
  markdown: {
    // Two-column ## sections, the key decision callout, scrollable tables.
    processor: satteri({ hastPlugins: [markdownSections] }),
  },
});
