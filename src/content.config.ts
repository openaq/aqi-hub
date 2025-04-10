import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const indices = defineCollection({
  loader: glob({ pattern: ["*.{md,mdx}"], base: "src/content/indices" }),
  schema: () =>
    z.object({
      name: z.string(),
      indexName: z.string(),
      indexAcronym: z.string(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: ["*.{md,mdx}"], base: "src/content/pages" }),
  schema: () =>
    z.object({
      title: z.string(),
    }),
});

const breakpoints = defineCollection({
  loader: glob({
    pattern: "*.csv",
    base: "src/data/breakpoints",
  }),
  schema: () =>
    z.object({
      ISO: z.string(),
    }),
});

export const collections = {
  breakpoints,
  indices,
  pages,
};
