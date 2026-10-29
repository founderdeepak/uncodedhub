// Regenerates public/sitemap.xml from the routes in routes.mjs (static
// pages + whatever non-draft posts currently exist in
// src/content/blog/). Runs as a `prebuild` step (see package.json) so
// publishing a Markdown post is enough on its own — nobody has to
// remember to hand-edit the sitemap.
import { writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getAllRoutes } from './routes.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

// <priority> and <changefreq> are both explicitly ignored by Google
// (and have been for years) — omitted rather than carried as dead
// weight. <lastmod> is kept: it's the one hint crawlers still use for
// recrawl prioritization, so every route gets one, not just blog posts.
const routes = getAllRoutes().filter((r) => r.loc !== '/404');

// Also include all 17 live interactive industry demonstration specimens
const demoDir = path.join(root, 'public', 'demos');
try {
  const demoFiles = readdirSync(demoDir).filter((f) => f.endsWith('.html'));
  for (const file of demoFiles) {
    routes.push({
      loc: `/demos/${file}`,
      lastmod: '2026-10-23',
    });
  }
} catch {}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const body = routes
  .map((r) => {
    const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : '';
    const loc = r.loc.endsWith('/') || r.loc.endsWith('.html') ? r.loc : `${r.loc}/`;
    
    let imageXml = '';
    if (r.image) {
      const imgLoc = r.image.startsWith('http') ? r.image : `https://uncodedhub.com${r.image}`;
      const titleTag = r.title ? `\n      <image:title>${escapeXml(r.title)}</image:title>` : '';
      const captionTag = r.caption ? `\n      <image:caption>${escapeXml(r.caption)}</image:caption>` : (titleTag ? `\n      <image:caption>${escapeXml(r.title)}</image:caption>` : '');
      imageXml = `\n    <image:image>\n      <image:loc>${imgLoc}</image:loc>${titleTag}${captionTag}\n    </image:image>`;
    }

    return `  <url>\n    <loc>https://uncodedhub.com${loc}</loc>${lastmod}${imageXml}\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;

writeFileSync(sitemapPath, xml);
const postCount = routes.filter((r) => r.loc.startsWith('/blog/')).length;
console.log(`sitemap.xml written with ${routes.length} URLs (${postCount} blog posts).`);
