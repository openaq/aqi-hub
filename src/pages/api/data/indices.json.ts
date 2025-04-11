import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import { globSync } from "tinyglobby";
import type { IndexDefinition } from "src/types/types";

const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group: string) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

export const GET: APIRoute = async () => {
  const data = globSync(["src/data/breakpoints/*.csv"]);

  const parsedContent = data.map((o) => {
    const csvContent = readFileSync(o);

    const parsed = parse(csvContent, {
      skip_empty_lines: true,
      columns: (header) => header.map((column: string) => snakeToCamel(column)),
    });

    return parsed;
  });

  const combinedData = parsedContent.flat();

  let filteredContent = combinedData.filter(
    (o: IndexDefinition) => o.pollutant == "PM2.5" && o.averagingPeriod == "24"
  );

  filteredContent = filteredContent.map((o: IndexDefinition) => {
    o.concentrationUpper ? o.concentrationUpper : (o.concentrationUpper = 500);
    return o;
  });

  return new Response(JSON.stringify(filteredContent), {
    headers: { "Content-Type": "application/json" },
  });
};
