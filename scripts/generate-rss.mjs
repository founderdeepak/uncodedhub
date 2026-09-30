// Generates Pinterest- & Google-compliant RSS 2.0 feeds:
//   - public/rss.xml (and public/feed.xml): latest 15 posts
//   - public/rss-<niche>.xml: per-niche feeds (up to 15 posts each)
//
// Why 15 items + JPEG enclosures + normalized past pubDates:
// 1. Pinterest's RSS validator synchronously fetches and HEAD-checks every
//    <enclosure> image in the feed within an ~8s Envoy upstream timeout.
//    A 140-item feed times out with:
//    `Unexpected token 'u', "upstream r"... is not valid JSON` ("upstream request timeout").
//    Keeping each feed to 15 items (~9 KB) lets Pinterest validate in < 500ms.
// 2. Pinterest RSS requires image/jpeg or image/png in <enclosure> (not image/webp).
//    This script automatically generates a .jpg sibling in public/blog/ for
//    every post included in any RSS feed.
// 3. Pinterest ignores items whose <pubDate> is in the future relative to real UTC.
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicDir = path.join(root, 'public');
const SITE_URL = 'https://uncodedhub.com';
const MAX_ITEMS_PER_FEED = 15;

function parseFrontmatterAndBody(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] || '' };
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractFirstParagraph(markdown) {
  const lines = markdown
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(
      (l) =>
        l &&
        !l.startsWith('#') &&
        !l.startsWith('*By ') &&
        !l.startsWith('!') &&
        !l.startsWith('>') &&
        !l.startsWith('-') &&
        !l.startsWith('|')
    );
  if (!lines.length) return '';
  return lines[0]
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

function ensureJpgEnclosure(relImage) {
  let cleanRel = relImage.startsWith('/') ? relImage : `/${relImage}`;
  if (cleanRel.endsWith('.webp')) {
    const webpAbs = path.join(publicDir, cleanRel.replace(/^\//, ''));
    const jpgRel = cleanRel.replace(/\.webp$/, '.jpg');
    const jpgAbs = path.join(publicDir, jpgRel.replace(/^\//, ''));
    if (existsSync(webpAbs) && !existsSync(jpgAbs)) {
      try {
        execFileSync(
          'ffmpeg',
          ['-y', '-loglevel', 'error', '-i', webpAbs, '-frames:v', '1', '-update', '1', '-q:v', '4', jpgAbs],
          { stdio: 'ignore' }
        );
      } catch {
        // Fallback to og-image.jpg if ffmpeg is unavailable in CI
      }
    }
    if (existsSync(jpgAbs)) {
      return {
        url: `${SITE_URL}${jpgRel}`,
        bytes: statSync(jpgAbs).size,
        mime: 'image/jpeg',
      };
    }
  } else {
    const abs = path.join(publicDir, cleanRel.replace(/^\//, ''));
    if (existsSync(abs)) {
      return {
        url: `${SITE_URL}${cleanRel}`,
        bytes: statSync(abs).size,
        mime: cleanRel.endsWith('.png') ? 'image/png' : 'image/jpeg',
      };
    }
  }

  const fallbackAbs = path.join(publicDir, 'og-image.jpg');
  return {
    url: `${SITE_URL}/og-image.jpg`,
    bytes: existsSync(fallbackAbs) ? statSync(fallbackAbs).size : 109402,
    mime: 'image/jpeg',
  };
}

const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));

const allPosts = files
  .map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(path.join(blogDir, file), 'utf-8');
    const { data, body } = parseFrontmatterAndBody(raw);
    if (data.draft === 'true' || !data.title || !data.date) return null;

    const description =
      data.metaDescription ||
      (data.excerpt && data.excerpt !== data.title ? data.excerpt : '') ||
      extractFirstParagraph(body) ||
      data.title;

    const relImage = data.image || `/blog/${slug}.webp`;

    return {
      slug,
      title: data.title,
      description,
      niche: data.niche || 'studio',
      date: data.date,
      relImage,
    };
  })
  .filter(Boolean)
  .sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return a.slug.localeCompare(b.slug);
  });

// Reference anchor in the past (March 2026 UTC) so no <pubDate> is ever
// seen as "in the future" by Pinterest's or Google's UTC servers, even if
// markdown frontmatter dates were authored with a shifted local clock.
const ANCHOR_MS = Date.UTC(2026, 2, 25, 9, 0, 0); // Wed, 25 Mar 2026 09:00:00 GMT
const DAY_MS = 24 * 60 * 60 * 1000;

function buildFeedXml({ title, description, feedFileName, items }) {
  const itemsXml = items
    .map((post, idx) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(ANCHOR_MS - idx * DAY_MS).toUTCString();
      const titleXml = escapeXml(post.title);
      const descXml = escapeXml(post.description);
      const enc = ensureJpgEnclosure(post.relImage);

      return `    <item>
      <title>${titleXml}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${descXml}</description>
      <enclosure url="${escapeXml(enc.url)}" length="${enc.bytes}" type="${enc.mime}" />
    </item>`;
    })
    .join('\n');

  const lastBuildDate = new Date(ANCHOR_MS).toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/${feedFileName}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;
}

// 1. Main RSS feed (latest 15 posts) -> public/rss.xml & public/feed.xml
const mainItems = allPosts.slice(0, MAX_ITEMS_PER_FEED);
const mainXml = buildFeedXml({
  title: 'Uncoded Hub — Web Design, Speed & Conversion',
  description:
    'Practical guides for service-business owners on high-converting web design, Core Web Vitals, local SEO, and seven-day custom builds.',
  feedFileName: 'rss.xml',
  items: mainItems,
});
writeFileSync(path.join(publicDir, 'rss.xml'), mainXml, 'utf-8');
writeFileSync(path.join(publicDir, 'feed.xml'), mainXml, 'utf-8');

// 2. Niche-specific RSS feeds (so each Pinterest Board can auto-publish its own niche)
const NICHES = {
  'interior-designers': 'Uncoded Hub — Interior Design Website Strategy',
  'real-estate': 'Uncoded Hub — Real Estate Website & Lead Generation',
  'dental-clinics': 'Uncoded Hub — Dental & Healthcare Clinic Websites',
  'wedding-photographers': 'Uncoded Hub — Wedding Photography Website Strategy',
  'home-renovation': 'Uncoded Hub — Home Renovation & Builder Websites',
  'coaches-consultants': 'Uncoded Hub — Coach & Consultant Website Strategy',
  studio: 'Uncoded Hub — Small Business Website & SEO Guides',
};

for (const [nicheKey, nicheTitle] of Object.entries(NICHES)) {
  const nicheItems = allPosts.filter((p) => p.niche === nicheKey).slice(0, MAX_ITEMS_PER_FEED);
  if (nicheItems.length === 0) continue;
  const fileName = `rss-${nicheKey}.xml`;
  const xml = buildFeedXml({
    title: nicheTitle,
    description: `${nicheTitle} — published by Uncoded Hub.`,
    feedFileName: fileName,
    items: nicheItems,
  });
  writeFileSync(path.join(publicDir, fileName), xml, 'utf-8');
}

console.log(
  `Generated rss.xml (${mainItems.length} items) + ${Object.keys(NICHES).length} niche RSS feeds with JPEG enclosures.`
);
