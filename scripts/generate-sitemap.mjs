// Regenerates public/sitemap.xml from the routes in routes.mjs (static
// pages + whatever non-draft posts currently exist in
// src/content/blog/). Runs as a `prebuild` step (see package.json) so
// publishing a Markdown post is enough on its own — nobody has to
// remember to hand-edit the sitemap.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getAllRoutes } from './routes.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

// <priority> and <changefreq> are both explicitly ignored by Google
// (and have been for years) — omitted rather than carried as dead
// weight. <lastmod> is kept: it's the one hint crawlers still use for
// recrawl prioritization, so every route gets one, not just blog posts.
const routes = getAllRoutes();

const body = routes
  .map((r) => {
    const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>https://uncodedhub.com${r.loc}</loc>${lastmod}\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(sitemapPath, xml);
const postCount = routes.filter((r) => r.loc.startsWith('/blog/')).length;
console.log(`sitemap.xml written with ${routes.length} URLs (${postCount} blog posts).`);
