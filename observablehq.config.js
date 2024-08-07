import MarkdownItFootnote from "markdown-it-footnote";


// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "OpenAQ - AQI Hub",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "",
      pages: [
        {name: "Introduction", path: "/index"},
        {name: "Pollutants", path: "/pollutants"},
        {name: "Methods", path: "/methods"},
      ]
    },
    {
      name: "Indices",
      open: true,
      pages: [
        {name: "Australia", path: "/indices/australia"},
        {name: "EU", path:"/indices/eu"},
        {name: "Finland", path:"/indices/finland"},
        {name: "Indonesia", path: "/indices/indonesia"},
        {name: "Kuwait", path: "/indices/kuwait"},
        {name: "Macao", path: "/indices/macao"},
        {name: "Malaysia", path: "/indices/malaysia"},
        {name: "Mexico", path: "/indices/mexico"},
        {name: "Singapore", path: "/indices/singapore"},
        {name: "South Korea", path: "/indices/south-korea"},
        {name: "Thailand", path: "/indices/thailand"},
        {name: "UAE", path: "/indices/uae"},
        {name: "US", path: "/indices/us"},
        {name: "Vietnam", path: "/indices/vietnam"},
      ]
    }
  ],

  // Some additional configuration options and their defaults:
  theme: "light", // try "light", "dark", "slate", etc.
  header: '<h1 class="gradient-title">Air Quality Index Hub</h1>', // what to show in the header (HTML)
  footer: '<div>Developed by <a href="https://openaq.org">OpenAQ</a>. Are we missing an AQI? Did you spot a bug? <a href="https://github.com/openaq/aqi-hub">contribute on github</a></div><div>Content licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></div>', // what to show in the footer (HTML)
  toc: true, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  style: "style.css",
  root: "docs", // path to the source root for preview
  output: "dist", // path to the output root for build
  search: true, // activate search
  markdownIt: (md) => md.use(MarkdownItFootnote)
};
