import MarkdownItFootnote from "markdown-it-footnote";


// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "OpenAQ - AQI Hub",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  head: `
    <link rel="icon" href="favicon-16x16.png" type="image/png" sizes="16x16">
    <link rel="icon" href="favicon-32x32.png" type="image/png" sizes="32x32">
    <script defer data-domain="aqihub.info" src="https://plausible.io/js/script.js" integrity="sha384-tPOxpLA2/UQKnIkz9xzbWtR4zQVKGeV8UuJKit0l3PQToVtMKtGT9iybQfhxLo+J" crossorigin="anonymous"></script>
  `,
  pages: [
    {
      name: "",
      pages: [
        {name: "Introduction", path: "/index"},
        {name: "Pollutants", path: "/pollutants"},
        {name: "Reporting periods", path: "/reporting-periods"},
        {name: "Methods", path: "/methods"},
      ]
    },
    {
      name: "Indices",
      pages: [
        {name: "Australia", path: "/indices/australia"},
        {name: "Canada", path: "/indices/canada"},
        {name: "China", path: "/indices/china"},
        {name: "European Union", path:"/indices/eu"},
        {name: "Finland", path:"/indices/finland"},
        {name: "Hong Kong", path: "/indices/hong-kong"},
        {name: "India", path: "/indices/india"},
        {name: "Indonesia", path: "/indices/indonesia"},
        {name: "Kuwait", path: "/indices/kuwait"},
        {name: "Macao", path: "/indices/macao"},
        {name: "Malaysia", path: "/indices/malaysia"},
        {name: "Mexico", path: "/indices/mexico"},
        {name: "Peru", path: "/indices/peru"},
        {name: "Singapore", path: "/indices/singapore"},
        {name: "South Africa", path: "/indices/south-africa"},
        {name: "South Korea", path: "/indices/south-korea"},
        {name: "Taiwan", path: "/indices/taiwan"},
        {name: "Thailand", path: "/indices/thailand"},
        {name: "Türkiye", path: "/indices/turkiye"},
        {name: "United Arab Emirates", path: "/indices/uae"},
        {name: "United Kingdom", path: "/indices/uk"},
        {name: "United States of America", path: "/indices/us"},
        {name: "Vietnam", path: "/indices/vietnam"},
      ]
    }
  ],

  // Some additional configuration options and their defaults:
  theme: "light", // try "light", "dark", "slate", etc.
  header: '<h1 class="gradient-title">Air Quality Index Hub</h1>', // what to show in the header (HTML)
  footer: '<div>Developed by <a href="https://openaq.org">OpenAQ</a>. Are we missing an AQI? Did you spot a bug? <a href="https://github.com/openaq/aqi-hub">contribute on github</a></div><div>Content licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></div>', // what to show in the footer (HTML)
  toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  style: "style.css",
  root: "docs", // path to the source root for preview
  output: "dist", // path to the output root for build
  search: true, // activate search
  markdownIt: (md) => md.use(MarkdownItFootnote)
};
