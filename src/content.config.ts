import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { parse } from "csv-parse/sync";
import { globSync } from "tinyglobby";

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

const filePaths = "src/data/breakpoints";
const allFiles = globSync(`${filePaths}/*.csv`);

const breakpoints = allFiles.map((o: string) => {
  return defineCollection({
    loader: file(o, {
      parser: (text) => parse(text, { columns: true, skipEmptyLines: true }),
    }),
  });
});

export const collections = {
  indices,
  pages,
  ...breakpoints,
};
