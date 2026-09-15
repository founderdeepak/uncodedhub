// Single source of truth for "which routes exist" — shared by
// generate-sitemap.mjs (what to list) and prerender.mjs (what to
// render to static HTML). Keeping one list means a route added to
// src/App.tsx's <Routes> only needs its slug to show up here once;
// previously the sitemap generator had its own private copy of the
// static route list and blog-post-scanning logic.
import { readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blogDir = path.join(root, 'src', 'content', 'blog');

// Each static route's source file, so its sitemap <lastmod> can come
// from a real git commit date instead of being omitted or guessed.
const STATIC_ROUTE_FILES = {
  '/': 'src/pages/Home.tsx',
  '/services': 'src/pages/Services.tsx',
  '/portfolio': 'src/pages/Portfolio.tsx',
  '/about': 'src/pages/About.tsx',
  '/contact': 'src/pages/Contact.tsx',
};

export const STATIC_ROUTES = Object.keys(STATIC_ROUTE_FILES);

function lastCommitDate(relFile) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%ad', '--date=short', '--', relFile], {
      cwd: root,
      encoding: 'utf-8',
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

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

/** Published (non-draft, title+date present) blog posts, newest first is not
 * guaranteed here — callers that need ordering should sort by `date`. */
export function getBlogPosts() {
  let files = [];
  try {
    files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }

  return files
    .map((file) => {
      const raw = readFileSync(path.join(blogDir, file), 'utf-8');
      const data = parseFrontmatter(raw);
      if (data.draft === 'true' || !data.title || !data.date) return null;
      return { slug: file.replace(/\.md$/, ''), date: data.date, updated: data.updated || null };
    })
    .filter(Boolean);
}

/** Every route the app actually serves, in the shape prerender.mjs needs:
 * a URL path plus, for blog posts, the frontmatter date used as lastmod. */
export function getAllRoutes() {
  const posts = getBlogPosts();
  const routes = STATIC_ROUTES.map((loc) => ({
    loc,
    lastmod: lastCommitDate(STATIC_ROUTE_FILES[loc]),
  }));
  if (posts.length > 0) {
    routes.push({ loc: '/blog' });
    for (const p of posts) {
      routes.push({ loc: `/blog/${p.slug}`, lastmod: p.updated || p.date });
    }
  }
  return routes;
}
