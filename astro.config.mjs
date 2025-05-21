// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkModifiedTime } from './remark-modified-time.mjs';
import dsv from '@rollup/plugin-dsv'

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://aqihub.info',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkMath, remarkModifiedTime],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['noopener', 'noreferrer'] },
      ],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          headingProperties: {
            className: ['anchor'],
          },
          properties: {
            className: ['anchor-link'],
          },
        },
      ],
    ],
  },
  integrations: [mdx(), solidJs()],
  vite: {
    plugins: [dsv()]
  }
});
