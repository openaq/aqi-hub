import type { APIRoute } from "astro";
import path from "node:path";
import { globSync } from "tinyglobby";
import { loadIndex } from "@data/loaders";

const glob = globSync("src/data/breakpoints/*.csv");

export const GET: APIRoute = async ({ params }) => {
  const index = params.index;
  if (!index) {
    return new Response("Not found", {status: 404 })
  }
  const data = loadIndex(index!)

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

const staticPaths = glob.map((o) => ({
  params: { index: path.parse(o).name },
}));

export function getStaticPaths() {
  return staticPaths;
}
