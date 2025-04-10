import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { parse } from "csv-parse/sync";

export const GET: APIRoute = async ({ params }) => {
  const indice = params.indice;

  const breakpointFile = await getEntry("breakpoints", indice!);

  const parsedContent = parse(breakpointFile, {
    columns: true,
    skip_empty_lines: true,
  });

  return new Response(JSON.stringify(parsedContent), {
    headers: { "Content-Type": "application/json" },
  });
};

export function getStaticPaths() {
  return [{ params: { indice: "eu" } }];
}

// import type { APIRoute } from "astro";
// import { parse } from "csv-parse/sync";
// import path from "node:path";

// export const GET: APIRoute = async ({ params }) => {
//   const indice = params.indice;

//   const filePath = path.join("src/data/breakpoints", `${indice}.csv`);

//   const parsedContent = parse(filePath, {
//     columns: true,
//     skip_empty_lines: true,
//   });

//   return new Response(JSON.stringify(parsedContent), {
//     headers: { "Content-Type": "application/json" },
//   });
// };

// export function getStaticPaths() {
//   return [{ params: { indice: "eu" } }];
// }
