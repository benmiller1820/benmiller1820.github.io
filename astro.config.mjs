// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { markdownSections } from './src/lib/markdown-sections.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://benmiller1820.github.io',
  // If this repo is ever renamed (not <user>.github.io), set base: '/<repo-name>'.
  trailingSlash: 'ignore',
  // Fonts come from Google Fonts at build time and are served from this site,
  // with metric-matched fallbacks so text doesn't jump when they load.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-serif',
      weights: [400],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-sans',
      weights: [400, 500, 600],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  markdown: {
    // Two-column ## sections, the key decision callout, scrollable tables.
    processor: satteri({ hastPlugins: [markdownSections] }),
  },
});
