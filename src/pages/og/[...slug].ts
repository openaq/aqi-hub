import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const pagesCollection = await getCollection("pages");
const indicesCollection = await getCollection("indices");

const pagesContent = pagesCollection.map((o) => {
  return {
    id: o.id,
    title: o.data.title,
    description: "",
  };
});

const indicesContent = indicesCollection.map((index) => {
  return {
    id: index.id,
    title: index.data.name,
    description: "",
  };
});

const collections = [...pagesContent, ...indicesContent];

const pages = Object.fromEntries(
  collections.map(({ id, title, description }) => [id, { title, description }])
);

export const { getStaticPaths, GET } = OGImageRoute({
  pages,
  param: "slug",

  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      title: page.title,
      description: page.description,
      bgGradient: [
        [51, 163, 161],
        [203, 232, 202],
      ],
      //   logo: {
      //     path: "./src/assets/imgs/aqi-hub.png",
      //     size: [100],
      //   },
      border: { color: [51, 163, 161], width: 40 },
      padding: 40,
    };
  },
});
