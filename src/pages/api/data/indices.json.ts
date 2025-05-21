import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { parse } from "csv-parse/sync";
import { globSync } from "tinyglobby";
import type { IndexDefinition } from "src/types/types";
import { loadIndices } from "@data/loaders";

const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group: string) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

export const GET: APIRoute = async () => {
  const indices = loadIndices()

  return new Response(JSON.stringify(indices), {
    headers: { "Content-Type": "application/json" },
  });
};
