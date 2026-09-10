import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { getAllPosts, NICHES, type NicheKey } from '../lib/blog';

/* ═══════════════════════════════════════════════════════════════════
   JOURNAL — list view

   Reads whatever is in src/content/blog/ at build time. With zero
   posts this renders the same honest empty state the page has always
   shown — see src/pages/BlogView.tsx for the matching empty state on
   individual article URLs, and CLAUDE.md's honesty rule for why this
   page refuses to fill itself with keyword-holding filler in the
   meantime. The nav link and the noindex tag both key off post count
   automatically (see App.tsx), so there is nothing to flip by hand
   once the first real post lands.
   ═══════════════════════════════════════════════════════════════════ */

export default function Blogs() {
  const posts = getAllPosts();
  const [activeNiche, setActiveNiche] = useState<NicheKey | 'all'>('all');

  const visible = useMemo(
    () => (activeNiche === 'all' ? posts : posts.filter((p) => p.niche === activeNiche)),
    [posts, activeNiche],
  );

  const nichesInUse = useMemo(
    () => Array.from(new Set(posts.map((p) => p.niche))),
    [posts],
  );

  if (posts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Journal — Uncoded Hub</title>
          <meta name="robots" content="noindex, follow" />
          <meta
            name="description"
            content="Notes on building business websites, from the Uncoded Hub studio."
          />
        </Helmet>

        <section className="pt-36 md:pt-44 pb-32 min-h-[70vh]">
          <Shell width="narrow">
            <Reveal>
              <p className="label text-signal">Journal</p>
              <h1 className="font-display text-hero mt-8">Nothing here yet.</h1>
              <p className="text-lead text-muted mt-10 max-w-xl">
                We would rather leave this empty than fill it with the kind of post that exists to
                hold a keyword. When there is something worth reading — what we actually learned
                building a particular site, and what we would do differently — it will appear
                here.
              </p>
              <div className="mt-12 pt-8 border-t border-rule flex flex-wrap gap-x-8 gap-y-3">
                <Link to="/portfolio" className="link-underline text-ink">
                  See how we work instead →
                </Link>
                <Link to="/services" className="link-underline text-ink">
                  What it costs →
                </Link>
              </div>
            </Reveal>
          </Shell>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Journal — Uncoded Hub</title>
        <meta
          name="description"
          content="Practical notes on websites, SEO, and getting found online — written for the businesses we build for."
        />
        <link rel="canonical" href="https://uncodedhub.com/blog" />
      </Helmet>

      <section className="pt-36 md:pt-44 pb-16">
        <Shell>
          <Reveal>
            <p className="label text-signal">Journal</p>
            <h1 className="font-display text-hero mt-8 max-w-[18ch]">
              Notes on what actually gets a business found online.
            </h1>
          </Reveal>
        </Shell>
      </section>

      <section className="pb-32">
        <Shell>
          {nichesInUse.length > 1 && (
            <Reveal className="flex flex-wrap gap-2 mb-14 pb-10 border-b border-rule">
              <button
                onClick={() => setActiveNiche('all')}
                className={`label px-4 py-2 border ${
                  activeNiche === 'all'
                    ? 'bg-ink text-paper border-ink'
                    : 'border-rule-strong text-muted hover:text-ink'
                }`}
              >
                All
              </button>
              {nichesInUse.map((niche) => (
                <button
                  key={niche}
                  onClick={() => setActiveNiche(niche)}
                  className={`label px-4 py-2 border ${
                    activeNiche === niche
                      ? 'bg-ink text-paper border-ink'
                      : 'border-rule-strong text-muted hover:text-ink'
                  }`}
                >
                  {NICHES[niche]}
                </button>
              ))}
            </Reveal>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {visible.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60} as="article">
                <Link to={`/blog/${post.slug}`} className="group block">
                  <span className="label text-signal">{NICHES[post.niche]}</span>
                  <h2 className="font-display text-title mt-4 group-hover:text-signal transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted leading-relaxed mt-3">{post.excerpt}</p>
                  )}
                  <p className="label text-muted mt-5">
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {post.readingMinutes} min read
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
}
