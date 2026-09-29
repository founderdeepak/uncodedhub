import { Marked } from 'marked';

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

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface AuthorInfo {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  initials: string;
}

export const AUTHORS: Record<'deepak' | 'geetha', AuthorInfo> = {
  deepak: {
    name: 'Deepak',
    role: 'Co-Founder & Lead Engineer',
    bio: 'Deepak architects ultra-fast, zero-bloat web systems and organic search acquisition engines for high-ticket service businesses in India and abroad.',
    linkedin: 'https://in.linkedin.com/in/deepakdeveloper',
    initials: 'D',
  },
  geetha: {
    name: 'Geetha',
    role: 'Co-Founder & Conversion Strategist',
    bio: 'Geetha leads user research, conversion psychology, and 7-day sprint schedules at Uncoded Hub.',
    linkedin: 'https://www.linkedin.com/in/geethaspecialist',
    initials: 'G',
  },
};

export interface BlogPost {
  slug: string;
  title: string;
  niche: NicheKey;
  date: string;
  excerpt: string;
  metaDescription: string;
  image?: string;
  html: string;
  readingMinutes: number;
  toc: TocItem[];
  author: AuthorInfo;
}

function isNicheKey(value: string): value is NicheKey {
  return Object.prototype.hasOwnProperty.call(NICHES, value);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
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

function renderPost(markdown: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seenIds = new Map<string, number>();
  const instance = new Marked();

  instance.use({
    renderer: {
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        let slug = slugify(token.text);
        if (!slug) slug = `section-${toc.length + 1}`;
        const count = seenIds.get(slug) || 0;
        seenIds.set(slug, count + 1);
        const finalId = count === 0 ? slug : `${slug}-${count + 1}`;

        if (token.depth === 2 || token.depth === 3) {
          toc.push({
            id: finalId,
            text: token.text.replace(/^#+\s*/, ''),
            level: token.depth,
          });
        }
        return `<h${token.depth} id="${finalId}">${text}</h${token.depth}>\n`;
      },
    },
  });

  const html = instance.parse(markdown) as string;
  return { html, toc };
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
    const { html, toc } = renderPost(body);

    const isGeetha =
      /geethaspecialist/i.test(body) ||
      /\*By \[Geetha\]/i.test(body) ||
      (data.author && /geetha/i.test(data.author));
    const author = isGeetha ? AUTHORS.geetha : AUTHORS.deepak;

    posts.push({
      slug,
      title: data.title,
      niche,
      date: data.date,
      excerpt: data.excerpt ?? '',
      metaDescription: data.metaDescription || data.excerpt || data.title,
      image: data.image || undefined,
      html,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      toc,
      author,
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const NICHE_PILLAR_SLUGS: Record<NicheKey, string> = {
  'interior-designers': 'what-an-interior-designers-website-should-include',
  'real-estate': 'what-a-real-estate-agents-website-should-include',
  'dental-clinics': 'what-a-dental-clinics-website-should-include',
  'wedding-photographers': 'what-a-wedding-photographers-website-should-include',
  'home-renovation': 'what-a-modular-kitchen-renovation-website-should-include',
  'coaches-consultants': 'what-a-coachs-website-should-include',
  studio: 'how-much-should-a-small-business-website-cost-in-india',
};

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

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const nichePosts = getPostsByNiche(currentPost.niche);
  const otherPosts = nichePosts.filter((p) => p.slug !== currentPost.slug);
  const pillarSlug = NICHE_PILLAR_SLUGS[currentPost.niche];

  const related: BlogPost[] = [];

  // If this post is not the pillar and the pillar exists in this niche, prioritize the pillar
  if (currentPost.slug !== pillarSlug && pillarSlug) {
    const pillar = otherPosts.find((p) => p.slug === pillarSlug);
    if (pillar) {
      related.push(pillar);
    }
  }

  // Find neighbors or chronological companions in this niche
  const currentIndex = nichePosts.findIndex((p) => p.slug === currentPost.slug);
  const siblings = otherPosts.filter((p) => p.slug !== pillarSlug);

  // Pick chronologically closest articles for natural contextual progression
  siblings.sort((a, b) => {
    const distA = Math.abs(nichePosts.findIndex((p) => p.slug === a.slug) - currentIndex);
    const distB = Math.abs(nichePosts.findIndex((p) => p.slug === b.slug) - currentIndex);
    return distA - distB;
  });

  for (const post of siblings) {
    if (related.length >= limit) break;
    related.push(post);
  }

  // Fallback: if we still have fewer than limit, pull from other posts
  if (related.length < limit) {
    const remaining = getAllPosts().filter(
      (p) => p.slug !== currentPost.slug && !related.some((r) => r.slug === p.slug),
    );
    for (const post of remaining) {
      if (related.length >= limit) break;
      related.push(post);
    }
  }

  return related;
}
