import { Marked } from 'marked';
import { compileAsciiToSvgDiagram } from './diagram-renderer';

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
  avatar: string;
}

export const AUTHORS: Record<'deepak' | 'geetha', AuthorInfo> = {
  deepak: {
    name: 'Deepak',
    role: 'Co-Founder & Lead Engineer',
    bio: 'Deepak architects ultra-fast, zero-bloat web systems and organic search acquisition engines for high-ticket service businesses in India and abroad.',
    linkedin: 'https://in.linkedin.com/in/deepakdeveloper',
    initials: 'D',
    avatar: '/deepak.webp',
  },
  geetha: {
    name: 'Geetha',
    role: 'Co-Founder & Conversion Strategist',
    bio: 'Geetha leads user research, conversion psychology, and 7-day sprint schedules at Uncoded Hub.',
    linkedin: 'https://www.linkedin.com/in/geethaspecialist',
    initials: 'G',
    avatar: '/geetha.webp',
  },
};

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  niche: NicheKey;
  date: string;
  excerpt: string;
  metaDescription: string;
  keywords?: string;
  image?: string;
  html: string;
  readingMinutes: number;
  toc: TocItem[];
  author: AuthorInfo;
  faqs: FaqItem[];
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const WIKILINK_MAP: Record<string, { label: string; slug: string }> = {
  '06 - What a Fast Portfolio Site Does to Enquiry Quality': {
    label: 'What a Fast Portfolio Site Does to Enquiry Quality',
    slug: 'portfolio-site-enquiry-quality',
  },
  '04 - 7 Website Mistakes That Make a Design Studio Look Smaller': {
    label: '7 Website Mistakes That Make a Design Studio Look Smaller',
    slug: 'interior-design-website-mistakes',
  },
  '11 - Interior Design Client Questionnaire Website': {
    label: 'Interior Design Client Questionnaire Website Strategy',
    slug: 'interior-design-client-questionnaire-website',
  },
  '02 - Property Portals vs Your Own Website': {
    label: 'Property Portals vs Your Own Website',
    slug: 'property-portals-vs-your-own-website',
  },
  '13 - Luxury Real Estate and Penthouse Web Design': {
    label: 'Luxury Real Estate and Penthouse Web Design',
    slug: 'luxury-real-estate-website-design',
  },
  '02 - Why an Instagram Page Is Not a Substitute for a Website': {
    label: 'Why an Instagram Page Is Not a Substitute for a Website',
    slug: 'instagram-vs-website-interior-designers',
  },
  '12 - How to Write Interior Design Case Studies': {
    label: 'How to Write Interior Design Case Studies',
    slug: 'how-to-write-interior-design-case-studies',
  },
  '10 - How AI Assistants Are Changing How Homeowners Find a Designer': {
    label: 'How AI Assistants Are Changing How Homeowners Find a Designer',
    slug: 'ai-assistants-finding-an-interior-designer',
  },
  '09 - What Makes a Good Architecture Portfolio Website (Deeper Look)': {
    label: 'What Makes a Good Architecture Portfolio Website',
    slug: 'architecture-portfolio-website-deeper-look',
  },
  '10 - Neighbourhood Content the Authority-Building Asset Agents Skip': {
    label: 'Neighbourhood Content: The Authority-Building Asset Agents Skip',
    slug: 'neighbourhood-content-real-estate-authority',
  },
  '05 - How Local SEO Beats the Big Portals in Your Own Neighbourhood': {
    label: 'How Local SEO Beats the Big Portals in Your Own Neighbourhood',
    slug: 'local-seo-beats-portals-in-your-neighbourhood',
  },
  "01 - What an Interior Designer's Website Should Include": {
    label: "What an Interior Designer's Website Should Include",
    slug: 'what-an-interior-designers-website-should-include',
  },
  "06 - What a Small Builder's Website Does That a Facebook Page Cannot": {
    label: "What a Small Builder's Website Does That a Facebook Page Cannot",
    slug: 'small-builders-website-vs-facebook-page',
  },
  '08 - Property Listing Page Design': {
    label: 'Property Listing Page Design',
    slug: 'property-listing-page-design',
  },
  '07 - How Fast Should a Real Estate Website Load': {
    label: 'How Fast Should a Real Estate Website Load',
    slug: 'real-estate-website-speed',
  },
  '03 - Why WhatsApp Converts More Property Enquiries Than a Form': {
    label: 'Why WhatsApp Converts More Property Enquiries Than a Form',
    slug: 'whatsapp-vs-contact-form-real-estate',
  },
  "04 - What Makes a Buyer Trust a Property Consultant's Website": {
    label: "What Makes a Buyer Trust a Property Consultant's Website",
    slug: 'what-makes-a-buyer-trust-a-property-consultants-website',
  },
  '05 - How Local SEO Finds High-Budget Clients': {
    label: 'How Local SEO Finds High-Budget Clients',
    slug: 'local-seo-for-high-budget-interior-design-clients',
  },
  '16 - Should Interior Designers Publish Design Fees Online': {
    label: 'Should Interior Designers Publish Design Fees Online',
    slug: 'should-interior-designers-publish-design-fees-online',
  },
  '03 - How Much Should an Interior Design Studio Budget for a Website': {
    label: 'How Much Should an Interior Design Studio Budget for a Website',
    slug: 'interior-design-website-cost-india',
  },
  '14 - 3D Renders vs Built Project Photography Speed': {
    label: '3D Renders vs Built Project Photography Speed',
    slug: '3d-renderings-interior-design-website-speed',
  },
  '18 - Mobile UX Best Practices for Design Portfolios': {
    label: 'Mobile UX Best Practices for Design Portfolios',
    slug: 'mobile-portfolio-ux-interior-designers',
  },
  '12 - NRI Property Buyer Landing Page Strategy': {
    label: 'NRI Property Buyer Landing Page Strategy',
    slug: 'nri-real-estate-landing-page-strategy',
  },
};

function resolveWikilinks(text: string): string {
  return text.replace(/\[\[(.*?)\]\]/g, (_match, inner) => {
    const trimmed = inner.trim();
    const entry = WIKILINK_MAP[trimmed];
    if (entry) {
      return `[${entry.label}](/blog/${entry.slug}/)`;
    }
    const clean = trimmed.replace(/^\d+\s*-\s*/, '').trim();
    return `[${clean}](/blog/${slugify(clean)}/)`;
  });
}

function cleanBlogBody(rawBody: string): string {
  let cleaned = rawBody;
  cleaned = resolveWikilinks(cleaned);
  // Clean up double-bullet unicode boxes (e.g. "- ☐ " -> "- [ ] ")
  cleaned = cleaned.replace(/^(\s*[-*])\s*☐\s*/gm, '$1 [ ] ');
  cleaned = cleaned.replace(/^(\s*[-*])\s*☑\s*/gm, '$1 [x] ');
  // Clean up redundant consecutive horizontal rules
  cleaned = cleaned.replace(/(?:^|\n)\s*---\s*\n(?:\s*\n)*\s*---\s*(?=\n|$)/g, '\n\n---\n\n');
  // Strip duplicate h1 title at start of article body
  cleaned = cleaned.replace(/^#\s+[^\r\n]+\r?\n+/m, '');
  // Strip duplicate author line (e.g. *By [Deepak]...* or *By [Geetha]...*)
  cleaned = cleaned.replace(/^\*By\s+\[?[A-Za-z]+\]?[^\r\n]*\*\s*\r?\n+/m, '');
  // Strip redundant mid-article or footer "### Work With Uncoded Hub" boilerplate (authoritatively rendered by BlogView's bento)
  cleaned = cleaned.replace(/(?:---\s*\r?\n)?###\s*Work With Uncoded Hub[\s\S]*$/i, '');
  return cleaned.trim();
}

function renderPost(markdown: string, slug: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seenIds = new Map<string, number>();
  const instance = new Marked();
  let diagramIndex = 0;

  instance.use({
    renderer: {
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        let headerSlug = slugify(token.text);
        if (!headerSlug) headerSlug = `section-${toc.length + 1}`;
        const count = seenIds.get(headerSlug) || 0;
        seenIds.set(headerSlug, count + 1);
        const finalId = count === 0 ? headerSlug : `${headerSlug}-${count + 1}`;

        if (token.depth === 2 || token.depth === 3) {
          toc.push({
            id: finalId,
            text: token.text.replace(/^#+\s*/, ''),
            level: token.depth,
          });
        }
        return `<h${token.depth} id="${finalId}">${text}</h${token.depth}>\n`;
      },
      table(token) {
        const header = token.header
          .map((cell) => {
            const content = this.parser.parseInline(cell.tokens);
            const align = cell.align ? ` align="${cell.align}"` : '';
            return `<th${align}>${content}</th>`;
          })
          .join('');

        const rows = token.rows
          .map((row) => {
            const cells = row
              .map((cell) => {
                const content = this.parser.parseInline(cell.tokens);
                const align = cell.align ? ` align="${cell.align}"` : '';
                return `<td${align}>${content}</td>`;
              })
              .join('');
            return `<tr>${cells}</tr>`;
          })
          .join('\n');

        return `<div class="table-responsive-wrapper">\n<table>\n<thead>\n<tr>${header}</tr>\n</thead>\n<tbody>\n${rows}\n</tbody>\n</table>\n</div>\n`;
      },
      list(token) {
        const isTaskList = token.items.some((it: any) => it.task);
        const body = token.items.map((it: any) => this.listitem(it)).join('');
        const tag = token.ordered ? 'ol' : 'ul';
        const cls = isTaskList ? ' class="checklist-unstyled"' : '';
        return `<${tag}${cls}>\n${body}</${tag}>\n`;
      },
      listitem(token) {
        if (token.task) {
          const rawText = this.parser.parse(token.tokens);
          const cleanText = rawText
            .replace(/^<input[^>]*>\s*/i, '')
            .replace(/^<p>\s*<input[^>]*>\s*/i, '<p>');
          return `<li class="checklist-item"><span class="checklist-box" aria-hidden="true">${token.checked ? '✓' : ''}</span><span>${cleanText}</span></li>\n`;
        }
        const text = this.parser.parse(token.tokens);
        return `<li>${text}</li>\n`;
      },
      link(token) {
        let href = token.href || '';
        // Canonical trailing slash: if internal link without extension, ensure trailing slash
        if (href.startsWith('/') && !href.includes('#') && !href.includes('?') && !/\.[a-zA-Z0-9]{1,5}$/.test(href)) {
          if (!href.endsWith('/')) {
            href += '/';
          }
        }
        const text = this.parser.parseInline(token.tokens);
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
        return `<a href="${href}"${title}>${text}</a>`;
      },
      code(token) {
        const lang = (token.lang || '').toLowerCase().trim();
        if (lang === 'json' || lang === 'txt' || lang === 'javascript' || lang === 'typescript' || lang === 'html' || lang === 'css') {
          return `<pre class="code-block" tabindex="0"><code class="font-mono text-xs">${escapeHtml(token.text)}</code></pre>\n`;
        }
        diagramIndex++;
        return compileAsciiToSvgDiagram(token.text, slug, diagramIndex) + '\n';
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

export function extractFaqs(markdown: string): FaqItem[] {
  const faqSectionMatch = markdown.match(/##\s*Frequently\s+asked\s+questions[\s\S]*?(?=\n##\s|$)/i);
  if (!faqSectionMatch) return [];
  const sectionText = faqSectionMatch[0];
  const items: FaqItem[] = [];
  const regex = /\*\*(.+?\?)\*\*\r?\n([\s\S]+?)(?=\r?\n\r?\n\*\*|\r?\n##|$)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(sectionText)) !== null) {
    const question = match[1].replace(/[*_#]/g, '').trim();
    const answer = match[2].trim().replace(/\r?\n+/g, ' ');
    if (question && answer) {
      items.push({ question, answer });
    }
  }
  return items;
}

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(rawFiles)) {
    const slug = path.replace('/src/content/blog/', '').replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);

    if (data.draft === 'true') continue;
    if (!data.title || !data.date) continue;

    const niche = data.niche && isNicheKey(data.niche) ? data.niche : 'studio';
    const cleanedBody = cleanBlogBody(body);
    const words = cleanedBody.split(/\s+/).filter(Boolean).length;
    const { html, toc } = renderPost(cleanedBody, slug);
    const faqs = extractFaqs(cleanedBody);

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
      keywords: data.keywords || undefined,
      image: data.image || undefined,
      html,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      toc,
      author,
      faqs,
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
