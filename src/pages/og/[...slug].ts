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
    description: index.data.indexName,
  };
});

const collections = [...pagesContent, ...indicesContent];

const pages = Object.fromEntries(
  collections.map(({ id, title, description }) => [id, { title, description }])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "slug",
  pages,

  getImageOptions: (_path, page) => {
    return {
      title: page.title,
      description: page.description,
      bgGradient: [
        [250, 250, 250],
        [250, 250, 250],
      ],
      layout: "horizontal",
      bgImage: {
        path: "src/assets/imgs/aqi-hub.png",
        position: "start",
        fit: "contain",
        size: [450],
      },

      fonts: ["src/assets/fonts/SpaceGrotesk-Medium.ttf"],
      font: {
        title: {
          color: [0, 0, 0],
          size: 44,
          families: ["Space Grotesk"],
          position: "start",
          offsetX: 40,
        },
        description: {
          color: [0, 0, 0],
          size: 26,
          families: ["Space Grotesk"],
          position: "start",
        },
      },
    };
  },
});
