import { getCollection, render, type CollectionEntry } from "astro:content";

export async function GET() {
  const siteUrl = import.meta.env.SITE;

  const indices = await getCollection("indices");
  const pages = await getCollection("pages");

  type CollectionsName = "pages" | "indices";

  const routes = {
    indices: ["indices"],
    pages: [],
  };

  const getRoute = (collection: CollectionsName): string[] => {
    return routes[collection];
  };

  const entryMap = async (entry: CollectionEntry<CollectionsName>) => {
    const { remarkPluginFrontmatter } = await render(entry);
    const { collection, id } = entry;
    const { lastModified } = remarkPluginFrontmatter;
    return {
      slug: id,
      lastModified,
      route: getRoute(collection),
    };
  };

  const indicesEntries = await Promise.all(indices.map(entryMap));
  const pagesEntries = await Promise.all(
    pages.filter((entry) => entry.id !== "index").map(entryMap)
  );

  const buildPath = (paths: string[], slug: string) => {
    const fullPath = [...paths, slug].join("/");

    const url = new URL(fullPath, siteUrl);
    return url;
  };

  const buildUrlEntry = ({
    lastModified,
    slug,
    route,
  }: {
    lastModified: string;
    slug?: string;
    route?: string[];
  }) => {
    if (!slug || !route) return;

    const url = buildPath(route, slug);

    return `<url>
    <loc>${url.href}</loc>
  
    ${
      lastModified
        ? `<lastmod>${new Date(lastModified).toISOString()}</lastmod>`
        : `<lastmod>No latest modified date found</lastmod>`
    }
    </url>`;
  };

  const result = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>${siteUrl}</loc></url>

${pagesEntries.map(buildUrlEntry).join("\n")}
${indicesEntries.map(buildUrlEntry).join("\n")}


  </urlset>  `.trim();

  return new Response(result, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
