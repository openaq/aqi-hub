// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
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
  experimental: {
    svg: true,
  },

  integrations: [mdx()],
  site: "http://localhost:4321",
});
