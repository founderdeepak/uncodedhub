/* Cheap existence check for the nav/App shell — deliberately separate
   from blog.ts. import.meta.glob without `eager` only registers dynamic
   import functions at build time; it never pulls post content or the
   `marked` parser into whichever bundle imports this file. blog.ts's
   eager, parsed post list is fine for the already-lazy-loaded /blog
   routes, but App.tsx is in the main bundle every visitor downloads, so
   it must not drag the full post corpus in just to decide whether to
   show one nav link. */
const postFiles = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default' });

export const hasBlogPosts = Object.keys(postFiles).length > 0;
