/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {test: {
    environment:"node"
  }},
  {
    site: 'https://aqihub.info/',
    trailingSlash: 'always',
  }
);