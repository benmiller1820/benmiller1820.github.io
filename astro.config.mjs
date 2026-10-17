// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://benmiller1820.github.io',
  // If this repo is ever renamed (not <user>.github.io), set base: '/<repo-name>'.
  trailingSlash: 'ignore',
});
