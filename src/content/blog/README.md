# Adding a blog post

Drop a `.md` file in this folder. The filename becomes the URL, so
`why-interior-designers-need-a-website.md` publishes at
`/blog/why-interior-designers-need-a-website`.

**Filenames are permanent once a post is live.** Renaming the file after
publishing breaks the link and throws away any search ranking that post
has already earned — pick the final slug up front (lowercase, hyphens,
no spaces, no dates).

Start every file with frontmatter exactly in this shape:

```
---
title: Why Interior Designers Need a Website in 2026
niche: interior-designers
date: 2026-09-15
excerpt: A one-sentence summary shown on the blog list and used as the meta description if nothing more specific is given.
---

The article body goes here, in plain Markdown — headings, paragraphs,
lists, links, bold/italic all work normally.
```

## `niche` values

Use one of the six site niches, or `studio` for a general post that
isn't tied to one vertical:

- `interior-designers`
- `real-estate`
- `dental-clinics`
- `wedding-photographers`
- `home-renovation`
- `coaches-consultants`
- `studio`

## Optional frontmatter fields

- `metaDescription` — overrides `excerpt` for the `<meta name="description">` tag specifically, if you want the on-page summary and the search-result summary to read differently.
- `draft: true` — keeps the post out of the live site (and out of the sitemap) until it's ready. Remove the line, or set it to `false`, to publish.

## What NOT to do

Per this project's honesty rule (see `CLAUDE.md` / the design-direction
notes), do not invent client names, results, statistics, or quotes in a
post. If a number isn't independently verifiable, don't state it as
fact — write around it instead.
