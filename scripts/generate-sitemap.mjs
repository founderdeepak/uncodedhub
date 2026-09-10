// Regenerates public/sitemap.xml from the static routes plus whatever
// non-draft posts currently exist in src/content/blog/. Runs as a
// `prebuild` step (see package.json) so publishing a Markdown post is
// enough on its own — nobody has to remember to hand-edit the sitemap.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blogDir = path.join(root, 'src', 'content', 'blog');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/portfolio', changefreq: 'monthly', priority: '0.8' },
  { loc: '/about', changefreq: 'yearly', priority: '0.7' },
  { loc: '/contact', changefreq: 'yearly', priority: '0.9' },
];

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return data;
}

function getBlogEntries() {
  let files = [];
  try {
    files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  const posts = files
    .map((file) => {
      const raw = readFileSync(path.join(blogDir, file), 'utf-8');
      const data = parseFrontmatter(raw);
      if (data.draft === 'true' || !data.title || !data.date) return null;
      return { slug: file.replace(/\.md$/, ''), date: data.date };
    })
    .filter(Boolean);

  if (posts.length === 0) return [];

  return [
    { loc: '/blog', changefreq: 'weekly', priority: '0.6' },
    ...posts.map((p) => ({
      loc: `/blog/${p.slug}`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: p.date,
    })),
  ];
}

const blogEntries = getBlogEntries();
const entries = [...STATIC_ROUTES, ...blogEntries];

const body = entries
  .map((e) => {
    const lastmod = e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>https://uncodedhub.com${e.loc}</loc>${lastmod}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(sitemapPath, xml);
const postCount = Math.max(0, blogEntries.length - (blogEntries.length > 0 ? 1 : 0));
console.log(`sitemap.xml written with ${entries.length} URLs (${postCount} blog posts).`);
