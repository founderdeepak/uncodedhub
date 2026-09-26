import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { getAllPosts, NICHES, NICHE_PILLAR_SLUGS, type NicheKey } from '../lib/blog';
import BlogThumbnail from '../components/ui/BlogThumbnail';

/* ═══════════════════════════════════════════════════════════════════
   BLOGS & SILO NICHE HUBS — list & pillar view

   Reads all 140 posts in src/content/blog/ at build time.
   Supports both all-posts discovery and dedicated Niche Hub Pages
   (/blog/niche/:niche), highlighting the Master Pillar Guide
   as the central anchor for each industry silo.
   ═══════════════════════════════════════════════════════════════════ */

function isNicheKey(value: string | undefined): value is NicheKey {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(NICHES, value);
}

export default function Blogs() {
  const posts = getAllPosts();
  const { niche: routeNiche } = useParams<{ niche?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const activeNiche: NicheKey | 'all' = isNicheKey(routeNiche) ? routeNiche : 'all';

  // Keep scroll position smooth on niche change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeNiche]);

  const filtered = useMemo(() => {
    let list = activeNiche === 'all' ? posts : posts.filter((p) => p.niche === activeNiche);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          NICHES[p.niche].toLowerCase().includes(q),
      );
    }
    return list;
  }, [posts, activeNiche, searchQuery]);

  const nichesInUse = useMemo(
    () => Array.from(new Set(posts.map((p) => p.niche))),
    [posts],
  );

  // When a specific niche is selected, separate the Master Pillar from the cluster guides
  const { pillarPost, clusterPosts } = useMemo(() => {
    if (activeNiche === 'all') {
      return { pillarPost: null, clusterPosts: filtered };
    }
    const targetSlug = NICHE_PILLAR_SLUGS[activeNiche];
    const pillar = filtered.find((p) => p.slug === targetSlug) || null;
    const clusters = filtered.filter((p) => p.slug !== targetSlug);
    return { pillarPost: pillar, clusterPosts: clusters };
  }, [filtered, activeNiche]);

  if (posts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Blogs — Uncoded Hub</title>
          <meta name="robots" content="noindex, follow" />
          <meta
            name="description"
            content="Notes on building business websites, from the Uncoded Hub studio."
          />
        </Helmet>

        <section className="pt-36 md:pt-44 pb-32 min-h-[70vh]">
          <Shell width="narrow">
            <Reveal>
              <p className="label text-signal">Blogs</p>
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

  const isNicheView = activeNiche !== 'all';
  const pageTitle = isNicheView
    ? `${NICHES[activeNiche]} Website & SEO Master Guides — Uncoded Hub`
    : 'Blogs & Industry Blueprints — Uncoded Hub';
  const pageDesc = isNicheView
    ? `Master pillar blueprint and specialized guides on website strategy, high-ticket conversions, and local SEO for ${NICHES[activeNiche]}.`
    : 'Practical notes on websites, SEO, and getting found online — written for the businesses we build for.';
  const canonicalUrl = isNicheView
    ? `https://uncodedhub.com/blog/niche/${activeNiche}`
    : 'https://uncodedhub.com/blog';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <section className="pt-36 md:pt-44 pb-16">
        <Shell>
          <Reveal>
            <p className="label text-signal">
              {isNicheView ? `${NICHES[activeNiche]} · Knowledge Hub` : 'Blogs & Knowledge Hub'}
            </p>
            <h1 className="font-display text-hero mt-8 max-w-[20ch]">
              {isNicheView
                ? `${NICHES[activeNiche]}: Master Guide & Tactical Series`
                : 'Notes on what actually gets a business found online.'}
            </h1>
            {isNicheView && (
              <p className="text-lead text-muted mt-6 max-w-2xl">
                The comprehensive architectural blueprint and {clusterPosts.length} companion guides
                engineered specifically for {NICHES[activeNiche].toLowerCase()}.
              </p>
            )}
          </Reveal>
        </Shell>
      </section>

      <section className="pb-32">
        <Shell>
          {/* ── Search & Filter Controls ── */}
          <Reveal className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-6 border-b border-rule">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by keyword, procedure, or topic..."
                  className="w-full bg-paper-raised/70 border border-rule-strong px-4 py-2.5 pl-10 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-signal transition-colors rounded-[2px]"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-xs select-none">
                  ⚲
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-muted hover:text-ink cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <p className="label text-muted text-xs whitespace-nowrap self-end sm:self-center">
                {filtered.length} {filtered.length === 1 ? 'Article' : 'Articles'}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </p>
            </div>
          </Reveal>

          {nichesInUse.length > 1 && (
            <Reveal className="flex flex-wrap gap-2 mb-14 pb-10 border-b border-rule">
              <button
                onClick={() => navigate('/blog')}
                className={`label px-4 py-2 border transition-colors ${
                  activeNiche === 'all'
                    ? 'bg-ink text-paper border-ink font-semibold'
                    : 'border-rule-strong text-muted hover:text-ink'
                }`}
              >
                All ({posts.length})
              </button>
              {nichesInUse.map((niche) => (
                <button
                  key={niche}
                  onClick={() => navigate(`/blog/niche/${niche}`)}
                  className={`label px-4 py-2 border transition-colors ${
                    activeNiche === niche
                      ? 'bg-ink text-paper border-ink font-semibold'
                      : 'border-rule-strong text-muted hover:text-ink'
                  }`}
                >
                  {NICHES[niche]}
                </button>
              ))}
            </Reveal>
          )}

          {/* ── Empty Search Results State ── */}
          {filtered.length === 0 && (
            <div className="py-20 text-center border border-rule bg-paper-raised/30 p-8 my-8">
              <h3 className="font-display text-2xl text-ink">No articles match your search</h3>
              <p className="text-muted text-sm mt-3 max-w-md mx-auto">
                We couldn't find any guides matching "{searchQuery}". Try searching for another term
                or clear the search.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="btn-primary !py-2.5 !px-6 mt-6 text-xs cursor-pointer"
              >
                Clear Search Query
              </button>
            </div>
          )}

          {/* ── Featured Master Pillar Guide Card ── */}
          {isNicheView && pillarPost && !searchQuery && (
            <Reveal className="mb-20">
              <div className="p-8 md:p-12 border-2 border-signal/40 bg-surface/30 rounded-[2px] relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <span className="label bg-signal/10 text-signal border border-signal/30 px-3 py-1 text-xs tracking-widest font-semibold uppercase">
                    ★ Master Industry Blueprint
                  </span>
                  <span className="label text-muted text-xs">Pillar Guide</span>
                </div>

                <h2 className="font-display text-2xl md:text-4xl mt-5 max-w-[26ch] leading-snug">
                  <Link
                    to={`/blog/${pillarPost.slug}`}
                    className="hover:text-signal transition-colors"
                  >
                    {pillarPost.title}
                  </Link>
                </h2>

                <p className="text-lead text-muted mt-5 max-w-3xl leading-relaxed">
                  {pillarPost.excerpt}
                </p>

                <div className="mt-8 pt-6 border-t border-rule flex items-center justify-between flex-wrap gap-4">
                  <p className="label text-muted">
                    {`${new Date(pillarPost.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })} · ${pillarPost.readingMinutes} min comprehensive read`}
                  </p>
                  <Link
                    to={`/blog/${pillarPost.slug}`}
                    className="btn-primary !py-2.5 !px-6 inline-flex items-center gap-2"
                  >
                    Read Master Guide →
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* ── Header for Cluster Guides when in Niche View ── */}
          {isNicheView && (
            <div className="mb-10 pb-4 border-b border-rule flex items-center justify-between">
              <h3 className="label text-ink tracking-widest uppercase text-xs font-semibold">
                Specialized Tactical Guides ({clusterPosts.length} Articles)
              </h3>
              <span className="label text-muted text-xs">Silo Knowledge Base</span>
            </div>
          )}

          {/* ── Grid of Articles ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {clusterPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 40} as="article">
                <Link to={`/blog/${post.slug}`} className="group block">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      width={880}
                      height={495}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-video object-cover grayscale border border-rule-strong mb-5 group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <BlogThumbnail niche={post.niche} size="card" className="mb-5" />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="label text-signal">{NICHES[post.niche]}</span>
                    {NICHE_PILLAR_SLUGS[post.niche] === post.slug && (
                      <span className="label bg-signal/10 text-signal border border-signal/20 px-2 py-0.5 text-[10px] uppercase font-semibold">
                        Pillar
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-title mt-3 group-hover:text-signal transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted leading-relaxed mt-3 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="label text-muted mt-5 text-xs">
                    {`${new Date(post.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })} · ${post.readingMinutes} min read`}
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
