import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import path from "node:path";
import type { IndexDefinition } from "src/types/types";

const glob = import.meta.glob("@data/breakpoints/*.csv");

const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group: string) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

export const GET: APIRoute = async ({ params }) => {
  const index = params.index;
  const data = readFileSync(`src/data/breakpoints/${index}.csv`);

  const parsedContent = parse(data, {
    skip_empty_lines: true,
    columns: (header) => header.map((column: string) => snakeToCamel(column)),
  });

  const stringToNumber: IndexDefinition[] = parsedContent.map(
    (o: IndexDefinition) => ({
      ...o,
      categoryLower: Number(o.categoryLower),
      categoryUpper: Number(o.categoryUpper),
      averagingPeriod: Number(o.averagingPeriod),
      concentrationLower: Number(o.concentrationLower),
      concentrationUpper: Number(o.concentrationUpper),
    })
  );

  return new Response(JSON.stringify(stringToNumber), {
    headers: { "Content-Type": "application/json" },
  });
};

const staticPaths = Object.keys(glob).map((o) => ({
  params: { index: path.parse(o).name },
}));

export function getStaticPaths() {
  return staticPaths;
}
