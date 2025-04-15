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

  let filteredContent = parsedContent.filter(
    (o: IndexDefinition) => o.pollutant == "PM2.5"
  );
  filteredContent = filteredContent.map((o: IndexDefinition) => {
    o.concentrationUpper ? o.concentrationUpper : (o.concentrationUpper = 500);
    return o;
  });

  return new Response(JSON.stringify(filteredContent), {
    headers: { "Content-Type": "application/json" },
  });
};

const staticPaths = Object.keys(glob).map((o) => ({
  params: { index: path.parse(o).name },
}));

export function getStaticPaths() {
  return staticPaths;
}
