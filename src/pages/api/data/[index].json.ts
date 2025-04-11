import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import path from "node:path";

interface IndexType {
  ISO: string;
  variant: string;
  category: string;
  hex: string;
  categoryLower: number;
  categoryUpper: string;
  pollutant: string;
  units: string;
  averagingPeriod: string;
  concentrationLower: number;
  concentrationUpper: number;
}

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
    (o: IndexType) => o.pollutant == "PM2.5" && o.averagingPeriod == "24"
  );
  filteredContent = filteredContent.map((o: IndexType) => {
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
