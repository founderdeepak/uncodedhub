// Regenerates sitemaps in standard organized index hierarchy:
// - public/sitemap_index.xml (Master index)
// - public/page-sitemap.xml (Core pages, commercial hubs, 150 Bangalore locality & spoke landing pages)
// - public/post-sitemap.xml (All 520+ technical blog articles & architecture blueprints)
// - public/sitemap.xml (Master index alias for universal search engine compatibility)
// Runs as a `prebuild` step (see package.json).
import { writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getAllRoutes } from './routes.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, 'public');

const allRoutes = getAllRoutes().filter((r) => r.loc !== '/404');

// Also include live interactive industry demonstration specimens
const demoDir = path.join(publicDir, 'demos');
try {
  const demoFiles = readdirSync(demoDir).filter((f) => f.endsWith('.html'));
  for (const file of demoFiles) {
    allRoutes.push({
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

function buildUrlXml(routes) {
  const body = routes
    .map((r) => {
      const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : '';
      const loc = r.loc.endsWith('/') || r.loc.endsWith('.html') ? r.loc : `${r.loc}/`;

      let imageXml = '';
      if (r.image) {
        const imgLoc = r.image.startsWith('http') ? r.image : `https://uncodedhub.com${r.image}`;
        const titleTag = r.title ? `\n      <image:title>${escapeXml(r.title)}</image:title>` : '';
        const captionTag = r.caption
          ? `\n      <image:caption>${escapeXml(r.caption)}</image:caption>`
          : titleTag
          ? `\n      <image:caption>${escapeXml(r.title)}</image:caption>`
          : '';
        imageXml = `\n    <image:image>\n      <image:loc>${imgLoc}</image:loc>${titleTag}${captionTag}\n    </image:image>`;
      }

      return `  <url>\n    <loc>https://uncodedhub.com${loc}</loc>${lastmod}${imageXml}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
}

// Separate into Post routes (individual blog articles) and Page routes (core, niches, locality hubs/spokes)
const isPostRoute = (r) => {
  if (!r.loc.startsWith('/blog/')) return false;
  if (r.loc.startsWith('/blog/industries/')) return false;
  return true;
};

const postRoutes = allRoutes.filter(isPostRoute);
const pageRoutes = allRoutes.filter((r) => !isPostRoute(r));

// 1. Generate page-sitemap.xml
const pageSitemapXml = buildUrlXml(pageRoutes);
writeFileSync(path.join(publicDir, 'page-sitemap.xml'), pageSitemapXml, 'utf-8');

// 2. Generate post-sitemap.xml
const postSitemapXml = buildUrlXml(postRoutes);
writeFileSync(path.join(publicDir, 'post-sitemap.xml'), postSitemapXml, 'utf-8');

// Determine latest lastmod for the index
const today = new Date().toISOString().split('T')[0];
const latestPageMod = (pageRoutes.map((r) => r.lastmod).filter(Boolean).sort().pop() || today).split('T')[0];
const latestPostMod = (postRoutes.map((r) => r.lastmod).filter(Boolean).sort().pop() || today).split('T')[0];

// 3. Generate sitemap_index.xml & sitemap.xml
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://uncodedhub.com/page-sitemap.xml</loc>
    <lastmod>${latestPageMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://uncodedhub.com/post-sitemap.xml</loc>
    <lastmod>${latestPostMod}</lastmod>
  </sitemap>
</sitemapindex>
`;

writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexXml, 'utf-8');
writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml, 'utf-8');

console.log(`Generated:
  - page-sitemap.xml (${pageRoutes.length} URLs)
  - post-sitemap.xml (${postRoutes.length} URLs)
  - sitemap_index.xml (Master Index)
  - sitemap.xml (Universal Index)
Total URLs: ${allRoutes.length}`);
