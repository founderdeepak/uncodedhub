import fs from 'fs';
import path from 'path';

const blogDir = './src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') && f !== 'README.md');

const PILLARS = {
  'interior-designers': {
    slug: 'what-an-interior-designers-website-should-include',
    title: "What an Interior Designer's Website Should Include",
    nicheName: 'Interior Designers & Architects',
    shortSubject: 'interior design website'
  },
  'real-estate': {
    slug: 'what-a-real-estate-agents-website-should-include',
    title: "What a Real Estate Agent's Website Should Include",
    nicheName: 'Real Estate & Property Consultants',
    shortSubject: 'real estate web strategy'
  },
  'dental-clinics': {
    slug: 'what-a-dental-clinics-website-should-include',
    title: "What a Dental Clinic's Website Should Include",
    nicheName: 'Dental & Aesthetic Clinics',
    shortSubject: 'dental clinic web architecture'
  },
  'wedding-photographers': {
    slug: 'what-a-wedding-photographers-website-should-include',
    title: "What a Wedding Photographer's Website Should Include",
    nicheName: 'Wedding Photographers & Event Planners',
    shortSubject: 'wedding photography website'
  },
  'home-renovation': {
    slug: 'what-a-modular-kitchen-renovation-website-should-include',
    title: "What a Modular Kitchen & Renovation Website Should Include",
    nicheName: 'Home Renovation & Modular Kitchens',
    shortSubject: 'home renovation web design'
  },
  'coaches-consultants': {
    slug: 'what-a-coachs-website-should-include',
    title: "What a Coach or Consultant's Website Should Include",
    nicheName: 'Coaches & Consultants',
    shortSubject: 'consulting website architecture'
  },
  'studio': {
    slug: 'how-much-should-a-small-business-website-cost-in-india',
    title: "How Much Should a Small Business Website Cost in India",
    nicheName: 'Web Engineering & Studio Insights',
    shortSubject: 'web engineering and conversion'
  }
};

// 1. First pass: parse all posts into memory
const posts = [];
const postsByNiche = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const slug = f.replace(/\.md$/, '');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return;

  const [, rawFm, rawBody] = match;
  const fm = {};
  rawFm.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':');
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[key] = val;
    }
  });

  const niche = fm.niche || 'studio';
  const post = {
    file: f,
    slug,
    niche,
    fm,
    rawBody: rawBody.trim(),
    title: fm.title || slug
  };

  posts.push(post);
  if (!postsByNiche[niche]) postsByNiche[niche] = [];
  postsByNiche[niche].push(post);
});

console.log(`Loaded ${posts.length} blog posts across 7 niches.`);

// 2. Helper to generate targeted metaDescription
function generateMetaDescription(title, excerpt, niche) {
  const pillar = PILLARS[niche] || PILLARS.studio;
  let base = excerpt && excerpt.length > 50 && excerpt !== title ? excerpt : '';
  
  if (!base) {
    base = `Complete architectural blueprint on ${title.toLowerCase().replace(/[:?]/g, '')}. Discover actionable conversion frameworks and benchmarks from Uncoded Hub.`;
  }
  
  // Clean up and truncate to ~150 chars
  base = base.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (base.length > 158) {
    base = base.slice(0, 155).replace(/\s+\S*$/, '') + '...';
  } else if (base.length < 110) {
    base = `${base} Engineered by Uncoded Hub for high-ticket client acquisition.`;
    if (base.length > 158) {
      base = base.slice(0, 155).replace(/\s+\S*$/, '') + '...';
    }
  }
  return base;
}

// 3. Helper to generate keywords
function generateKeywords(title, niche) {
  const cleanTitle = title.toLowerCase().replace(/[^a-z0-9\s]/g, '');
  const words = cleanTitle.split(/\s+/).filter(w => w.length > 3 && !['what', 'with', 'from', 'this', 'that', 'your', 'have', 'more', 'than', 'into'].includes(w));
  const primaryKw = words.slice(0, 3).join(' ');
  const pillar = PILLARS[niche] || PILLARS.studio;
  
  const kwList = [
    primaryKw,
    pillar.shortSubject,
    `${niche.replace('-', ' ')} website design`,
    'high converting web architecture',
    'uncoded hub blueprint'
  ];
  return kwList.slice(0, 4).join(', ');
}

// 4. Helper to generate FAQs if missing
function generateFaqsForPost(title, niche) {
  const pillar = PILLARS[niche] || PILLARS.studio;
  const cleanTitle = title.replace(/[:?]/g, '').trim();

  return `\n\n## Frequently asked questions\n\n` +
    `**Why is ${cleanTitle.toLowerCase()} critical for modern businesses?**\n` +
    `It directly impacts how prospective high-value clients perceive authority, evaluate delivery capability, and choose to reach out. Clean web systems and transparent information remove friction before the initial consultation.\n\n` +
    `**What is the most common mistake made in this area?**\n` +
    `Focusing purely on aesthetic styling while ignoring page load speed, mobile UX, and structured proof. A site that looks impressive but loads slowly loses qualified leads before they can evaluate the work.\n\n` +
    `**How can a business improve their performance in this category?**\n` +
    `Audit your current conversion path, optimize media payloads to sub-second load times, and structure case studies as transparent narratives covering constraints, execution, and measured outcomes.`;
}

// 5. Process each post
let modifiedCount = 0;

posts.forEach(post => {
  const pillar = PILLARS[post.niche];
  const isPillar = post.slug === pillar.slug;
  let body = post.rawBody;

  // Clean duplicate titles/author lines at the very top of body
  body = body.replace(/^#\s+[^\r\n]+\r?\n+/m, '');
  body = body.replace(/^\*By\s+\[?[A-Za-z]+\]?[^\r\n]*\*\s*\r?\n+/m, '');

  // A. Frontmatter fixes
  const fm = { ...post.fm };
  if (!fm.title) fm.title = post.title;
  if (!fm.niche) fm.niche = post.niche;
  if (!fm.date) fm.date = '2026-06-01';

  // Determine author
  if (!fm.author) {
    const isGeetha = /geethaspecialist/i.test(body) || /\*By \[Geetha\]/i.test(post.rawBody);
    fm.author = isGeetha ? 'geetha' : 'deepak';
  }

  // Ensure high-CTR metaDescription
  if (!fm.metaDescription || fm.metaDescription.length < 80 || fm.metaDescription === fm.title) {
    fm.metaDescription = generateMetaDescription(fm.title, fm.excerpt, post.niche);
  }

  // Ensure excerpt
  if (!fm.excerpt || fm.excerpt === fm.title) {
    fm.excerpt = fm.metaDescription;
  }

  // Ensure keywords
  if (!fm.keywords) {
    fm.keywords = generateKeywords(fm.title, post.niche);
  }

  // B. SILO Pillar Link
  const hasPillarLink = isPillar || body.includes(pillar.slug) || body.includes(`[[${pillar.slug}]]`);
  let pillarCallout = '';
  if (!hasPillarLink) {
    pillarCallout = `\n\n> **Silo Pillar Guide:** For our comprehensive master breakdown of layout strategy, technical performance, and conversion architecture in this category, explore [${pillar.title}](/blog/${pillar.slug}).\n`;
  }

  // C. Sibling Links (if internal links < 3)
  const existingLinks = (body.match(/\/blog\/[a-zA-Z0-9_-]+/g) || []).length + (body.match(/\[\[.*?\]\]/g) || []).length;
  let siblingSection = '';
  if (existingLinks < 2) {
    const siblings = (postsByNiche[post.niche] || [])
      .filter(p => p.slug !== post.slug && p.slug !== pillar.slug)
      .slice(0, 2);

    if (siblings.length >= 2) {
      siblingSection = `\n\n### Related Blueprints in This Silo\n` +
        `- [${siblings[0].title}](/blog/${siblings[0].slug})\n` +
        `- [${siblings[1].title}](/blog/${siblings[1].slug})\n`;
    }
  }

  // D. Studio Conversion Bridge
  let studioBridge = '';
  if (!body.includes('/audit') && !body.includes('/contact') && !body.includes('Work With Uncoded Hub')) {
    studioBridge = `\n\n---\n\n*Planning a website that reliably converts high-ticket inquiries? [Get a Free 60-Minute Website Audit](/audit) or [Schedule a 15-Minute Strategy Sprint](/contact) with Uncoded Hub.*`;
  }

  // E. FAQ Section
  let faqSection = '';
  if (!/##\s*Frequently\s+asked\s+questions/i.test(body)) {
    faqSection = generateFaqsForPost(post.title, post.niche);
  }

  // Combine body enhancements before FAQs or at the end
  if (pillarCallout) {
    body += pillarCallout;
  }
  if (siblingSection) {
    body += siblingSection;
  }
  if (studioBridge) {
    body += studioBridge;
  }
  if (faqSection) {
    body += faqSection;
  }

  // Clean trailing spaces and redundant newlines
  body = body.replace(/\n{4,}/g, '\n\n').trim();

  // Rebuild Frontmatter
  const fmOrder = ['title', 'niche', 'date', 'author', 'excerpt', 'metaDescription', 'keywords', 'image'];
  const fmLines = ['---'];
  fmOrder.forEach(k => {
    if (fm[k]) {
      fmLines.push(`${k}: "${fm[k].replace(/"/g, '\\"')}"`);
    }
  });
  // Add any extra keys
  Object.keys(fm).forEach(k => {
    if (!fmOrder.includes(k)) {
      fmLines.push(`${k}: "${fm[k].replace(/"/g, '\\"')}"`);
    }
  });
  fmLines.push('---');

  const finalContent = `${fmLines.join('\n')}\n\n${body}\n`;

  // Write file
  fs.writeFileSync(path.join(blogDir, post.file), finalContent, 'utf8');
  modifiedCount++;
});

console.log(`Successfully upgraded all ${modifiedCount} blog posts with complete SEO, SILO linking, and FAQ schemas!`);
