/* Existence flag for nav/App shell. The site has active blog posts,
   so this is true. Statically true prevents import.meta.glob from
   polluting the entry bundle with all 145 markdown dynamic import mappings. */
export const hasBlogPosts = true;
