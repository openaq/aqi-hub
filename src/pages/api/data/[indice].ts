export const prerender = false;
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { parse } from "csv-parse/sync";

export const GET: APIRoute = async ({ params }) => {
  const breakpointFile = await getEntry("breakpoints", "test");

  const parsedContent = parse(breakpointFile, {
    columns: true,
    skip_empty_lines: true,
  });

  return new Response(JSON.stringify(parsedContent), {
    headers: { "Content-Type": "application/json" },
  });
};
