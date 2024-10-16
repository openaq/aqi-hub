import { existsSync, writeFileSync } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import config from '../observablehq.config.js'; 

const outputFile = path.join(path.resolve(), 'sitemap.xml');

const getLastModified = (filePath) => {
    try {
      const gitCommand = `git log -1 --format=%cI -- "${filePath}"`;
      let result = execSync(gitCommand, { encoding: 'utf-8' }).trim();  
      return result;
    } catch (err) {
      console.warn(`Warning: Could not retrieve Git history for ${filePath}. Using current date.`);
      return new Date().toISOString();
    }
  };

function writeSitemap(pages) {
  const baseUrl = 'https://aqihub.info';
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  pages.forEach((page) => {
    const filePath = path.join(path.resolve(), 'docs',`${page.path}.md`);
    if (existsSync(filePath)) {
      const lastMod = getLastModified(filePath);
      sitemapContent += '  <url>\n';
      sitemapContent += `    <loc>${baseUrl}${page.path}</loc>\n`;
      sitemapContent += `    <lastmod>${lastMod}</lastmod>\n`;
      sitemapContent += '  </url>\n';
    } else {
      console.warn(`Warning: File '${filePath}' does not exist, skipping...`);
    }
  });

  sitemapContent += '</urlset>\n';

  writeFileSync(outputFile, sitemapContent);
  console.log(`Sitemap generated at ${outputFile}`);
}

function extractPaths(pages) {
  let paths = [];
  pages.forEach((section) => {
    section.pages.forEach((page) => {
      paths.push({ path: page.path });
    });
  });
  return paths;
}

const pages = extractPaths(config.pages);
writeSitemap(pages);
