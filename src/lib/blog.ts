import { marked } from 'marked';

/* ═══════════════════════════════════════════════════════════════════
   BLOG CONTENT LOADER

   Posts are plain Markdown files in src/content/blog/ — see the README
   in that folder for the exact format. The filename (minus .md) is the
   URL slug, so renaming a published file breaks its link and any
   ranking it has earned; treat filenames as permanent once live.

   `import.meta.glob` with `eager: true` bundles every post's raw text
   at build time (no runtime fetch, no CMS round-trip). At the post
   counts this site will ever carry (tens, not thousands), parsing
   frontmatter and rendering Markdown once per file at module load is
   negligible — a build-time pipeline would be premature machinery for
   this scale.
   ═══════════════════════════════════════════════════════════════════ */

export const NICHES = {
  'interior-designers': 'Interior Designers & Architects',
  'real-estate': 'Real Estate & Property Consultants',
  'dental-clinics': 'Dental & Aesthetic Clinics',
  'wedding-photographers': 'Wedding Photographers & Event Planners',
  'home-renovation': 'Home Renovation & Modular Kitchens',
  'coaches-consultants': 'Coaches & Consultants',
  studio: 'Studio Notes',
} as const;

export type NicheKey = keyof typeof NICHES;

export interface BlogPost {
  slug: string;
  title: string;
  niche: NicheKey;
  date: string;
  excerpt: string;
  metaDescription: string;
  html: string;
  readingMinutes: number;
}

function isNicheKey(value: string): value is NicheKey {
  return Object.prototype.hasOwnProperty.call(NICHES, value);
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const [, block, body] = match;
  const data: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: body.trim() };
}

const rawFiles = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(rawFiles)) {
    const slug = path.replace('/src/content/blog/', '').replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);

    if (data.draft === 'true') continue;
    if (!data.title || !data.date) continue;

    const niche = data.niche && isNicheKey(data.niche) ? data.niche : 'studio';
    const words = body.split(/\s+/).filter(Boolean).length;

    posts.push({
      slug,
      title: data.title,
      niche,
      date: data.date,
      excerpt: data.excerpt ?? '',
      metaDescription: data.metaDescription || data.excerpt || data.title,
      html: marked.parse(body, { async: false }) as string,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

let cached: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (!cached) cached = loadPosts();
  return cached;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByNiche(niche: NicheKey): BlogPost[] {
  return getAllPosts().filter((p) => p.niche === niche);
}
