import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { getPostBySlug, NICHES } from '../lib/blog';

/* ═══════════════════════════════════════════════════════════════════
   ARTICLE

   Looks the slug up in src/content/blog/ (see src/lib/blog.ts) and
   renders it if found. Unresolved slugs — including every slug before
   the first post is published — fall through to the same honest "not
   found" state this route has always shown; see the honesty rule in
   CLAUDE.md for why that beats rendering placeholder content.
   ═══════════════════════════════════════════════════════════════════ */

export default function BlogView() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Not found — Uncoded Hub</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <section className="pt-36 md:pt-44 pb-32 min-h-[70vh]">
          <Shell width="narrow">
            <Reveal>
              <p className="label text-signal">Journal</p>
              <h1 className="font-display text-hero mt-8">That article does not exist.</h1>
              <p className="text-lead text-muted mt-10 max-w-xl">
                We have not published anything at this address, so any link you followed to get
                here was pointing at nothing. Sorry about that.
              </p>
              <div className="mt-12 pt-8 border-t border-rule flex flex-wrap gap-x-8 gap-y-3">
                <Link to="/blog" className="link-underline text-ink">
                  Back to the journal →
                </Link>
                <Link to="/contact" className="link-underline text-ink">
                  Book a call →
                </Link>
              </div>
            </Reveal>
          </Shell>
        </section>
      </>
    );
  }

  const url = `https://uncodedhub.com/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Uncoded Hub' },
    publisher: { '@type': 'Organization', name: 'Uncoded Hub' },
    mainEntityOfPage: url,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — Uncoded Hub</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="pt-36 md:pt-44 pb-32">
        <Shell width="narrow">
          <Reveal>
            <Link to="/blog" className="label text-signal">
              ← Journal
            </Link>
            <span className="label text-muted ml-4">{NICHES[post.niche]}</span>
            <h1 className="font-display text-hero mt-8">{post.title}</h1>
            <p className="label text-muted mt-6">
              {new Date(post.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
              · {post.readingMinutes} min read
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-14 pt-14 border-t border-rule">
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.html }} />
          </Reveal>

          <Reveal delay={140} className="mt-20 pt-10 border-t border-rule">
            <p className="text-lead text-muted max-w-xl">
              Want a site built around your own business instead of a template?
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              Book a 20-minute call
            </Link>
          </Reveal>
        </Shell>
      </article>
    </>
  );
}
