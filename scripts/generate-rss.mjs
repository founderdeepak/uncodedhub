// Generates public/rss.xml and public/feed.xml from the published Markdown
// articles in src/content/blog/. Runs automatically during `prebuild`
// alongside generate-sitemap.mjs.
//
// Includes RSS 2.0 <enclosure>, Media RSS <media:content>, and
// <content:encoded> image tags so Pinterest Auto-Publish, Google News/Discover,
// Feedly, and social automation tools always detect the article cover image.
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blogDir = path.join(root, 'src', 'content', 'blog');
const publicDir = path.join(root, 'public');
const SITE_URL = 'https://uncodedhub.com';

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

function toRfc822Date(dateStr) {
  const d = new Date(`${dateStr}T09:00:00Z`);
  if (Number.isNaN(d.getTime())) {
    return new Date().toUTCString();
  }
  return d.toUTCString();
}

const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));

const posts = files
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

    // Resolve cover image path & byte size
    let relImage = data.image || `/blog/${slug}.webp`;
    if (!relImage.startsWith('/')) relImage = `/${relImage}`;
    const localImagePath = path.join(publicDir, relImage.replace(/^\//, ''));
    let imageBytes = 68840;
    let mimeType = relImage.endsWith('.png')
      ? 'image/png'
      : relImage.endsWith('.jpg') || relImage.endsWith('.jpeg')
        ? 'image/jpeg'
        : 'image/webp';

    if (existsSync(localImagePath)) {
      try {
        imageBytes = statSync(localImagePath).size;
      } catch {}
    } else {
      relImage = '/og-image.jpg';
      mimeType = 'image/jpeg';
      const fallbackPath = path.join(publicDir, 'og-image.jpg');
      if (existsSync(fallbackPath)) {
        try {
          imageBytes = statSync(fallbackPath).size;
        } catch {}
      }
    }

    return {
      slug,
      title: data.title,
      description,
      niche: data.niche || 'studio',
      date: data.date,
      updated: data.updated || data.date,
      imageUrl: `${SITE_URL}${relImage}`,
      imageBytes,
      mimeType,
    };
  })
  .filter(Boolean)
  .sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return a.slug.localeCompare(b.slug);
  });

const latestDate = posts.length > 0 ? toRfc822Date(posts[0].date) : new Date().toUTCString();

const itemsXml = posts
  .map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = toRfc822Date(post.date);
    const titleXml = escapeXml(post.title);
    const descXml = escapeXml(post.description);
    const categoryXml = escapeXml(post.niche);
    const imageUrlXml = escapeXml(post.imageUrl);

    return `    <item>
      <title>${titleXml}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>Uncoded Hub</dc:creator>
      <category>${categoryXml}</category>
      <description>${descXml}</description>
      <enclosure url="${imageUrlXml}" length="${post.imageBytes}" type="${post.mimeType}" />
      <media:content url="${imageUrlXml}" medium="image" type="${post.mimeType}" />
      <content:encoded><![CDATA[<p><img src="${post.imageUrl}" alt="${titleXml}" /></p><p>${post.description}</p><p><a href="${url}">Read the full article on Uncoded Hub →</a></p>]]></content:encoded>
    </item>`;
  })
  .join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Uncoded Hub — Field Notes on Web Design, Speed &amp; Conversion</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical essays for service-business owners on high-converting web design, Core Web Vitals, local SEO, and seven-day custom builds by Uncoded Hub.</description>
    <language>en-in</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo-large.png</url>
      <title>Uncoded Hub — Field Notes on Web Design, Speed &amp; Conversion</title>
      <link>${SITE_URL}/blog</link>
    </image>
${itemsXml}
  </channel>
</rss>
`;

writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8');
writeFileSync(path.join(publicDir, 'feed.xml'), rssXml, 'utf-8');
console.log(`rss.xml & feed.xml written with ${posts.length} blog posts.`);
