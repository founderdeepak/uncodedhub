import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { getAllPosts, NICHES, NICHE_PILLAR_SLUGS, type NicheKey } from '../lib/blog';
import BlogThumbnail from '../components/ui/BlogThumbnail';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   BLOGS & SILO NICHE HUBS — Cloaked Editorial Architecture
   ═══════════════════════════════════════════════════════════════════ */

function isNicheKey(value: string | undefined): value is NicheKey {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(NICHES, value);
}

const PRINCIPLES = [
  {
    tag: 'Principle 1',
    title: 'Zero recycled filler',
    desc: 'No generic 500-word SEO fluff. Every blueprint is extracted from actual client builds, codebase profiling, and genuine conversion tests.',
  },
  {
    tag: 'Principle 2',
    title: 'Metric & code-backed',
    desc: 'Lighthouse 100/100, Core Web Vitals benchmarks, schema markup, and real architectural patterns instead of vague agency generalities.',
  },
  {
    tag: 'Principle 3',
    title: 'Commercial specialization',
    desc: 'Deep industry playbooks for Architects, Doctors, Home Renovators, Real Estate Advisors, and Wedding Filmmakers.',
  },
  {
    tag: 'Principle 4',
    title: 'Direct founder authorship',
    desc: 'Written by Deepak (Lead Engineer) and Geetha (Conversion Strategist). Zero outsourced ghostwriting or generic AI auto-blogs.',
  },
];

export default function Blogs() {
  const posts = getAllPosts();
  const { niche: routeNiche } = useParams<{ niche?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const activeNiche: NicheKey | 'all' = isNicheKey(routeNiche) ? routeNiche : 'all';

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

  const { pillarPost, clusterPosts } = useMemo(() => {
    if (activeNiche === 'all') {
      return { pillarPost: null, clusterPosts: filtered };
    }
    const targetSlug = NICHE_PILLAR_SLUGS[activeNiche];
    const pillar = filtered.find((p) => p.slug === targetSlug) || null;
    const clusters = filtered.filter((p) => p.slug !== targetSlug);
    return { pillarPost: pillar, clusterPosts: clusters };
  }, [filtered, activeNiche]);

  const isNicheView = activeNiche !== 'all';
  const pageTitle = isNicheView
    ? `${NICHES[activeNiche]} Website & SEO Master Guides — Uncoded Hub`
    : 'Blogs & Industry Blueprints — Uncoded Hub';
  const pageDesc = isNicheView
    ? `Master pillar blueprint and companion guides on website strategy, high-ticket conversions, and local SEO for ${NICHES[activeNiche]}.`
    : 'Practical notes on websites, SEO, and getting found online — written by Deepak & Geetha.';
  const canonicalUrl = isNicheView
    ? `https://uncodedhub.com/blog/niche/${activeNiche}/`
    : 'https://uncodedhub.com/blog/';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* ── Editorial Hero ──────────────────────────────────────── */}
      <section className="pt-10 sm:pt-16 pb-16 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
              <div className="lg:col-span-8">
                <p className="label text-signal mb-3">
                  {isNicheView ? `${NICHES[activeNiche]} · Knowledge hub` : 'Research & blueprints · 140+ guides'}
                </p>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05]">
                  {isNicheView
                    ? `${NICHES[activeNiche]}: Master Guide & Tactical Series`
                    : 'Notes on what actually gets a business found online.'}
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  {isNicheView
                    ? `The master architectural blueprint and ${clusterPosts.length} companion tactical guides engineered specifically for ${NICHES[activeNiche].toLowerCase()}.`
                    : 'Practical, field-tested blueprints on architecture, high-ticket conversion, and organic search. Written directly by Deepak & Geetha from active client builds.'}
                </p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Interactive Search & Filter Controls ────────────────── */}
      <section className="py-12 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between">
              {/* Search Box in Squircle Pill */}
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 140+ guides by keyword, procedure, or industry..."
                  className="w-full bg-paper-raised border border-rule-strong px-5 py-3.5 pl-11 text-sm text-ink placeholder:text-muted rounded-full focus:outline-none focus:border-ink transition-colors shadow-xs"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm select-none">
                  ⚲
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted hover:text-ink cursor-pointer bg-paper px-2 py-0.5 rounded-full border border-rule"
                  >
                    Clear ✕
                  </button>
                )}
              </div>

              {/* Counter Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper border border-rule-strong text-xs font-mono text-muted shadow-xs self-start md:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                <span>
                  {filtered.length} {filtered.length === 1 ? 'Article' : 'Articles'}
                  {searchQuery ? ` matching "${searchQuery}"` : ' in Index'}
                </span>
              </div>
            </div>

            {/* Niche Filter Pills */}
            {nichesInUse.length > 1 && (
              <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-rule">
                <button
                  onClick={() => navigate('/blog/')}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    activeNiche === 'all'
                      ? 'bg-ink text-paper font-medium shadow-xs'
                      : 'bg-paper-raised border border-rule-strong text-muted hover:text-ink hover:border-ink'
                  }`}
                >
                  All Blueprints ({posts.length})
                </button>
                {nichesInUse.map((niche) => {
                  const active = activeNiche === niche;
                  return (
                    <button
                      key={niche}
                      onClick={() => navigate(`/blog/niche/${niche}/`)}
                      className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        active
                          ? 'bg-ink text-paper font-medium shadow-xs'
                          : 'bg-paper-raised border border-rule-strong text-muted hover:text-ink hover:border-ink'
                      }`}
                    >
                      {NICHES[niche]}
                    </button>
                  );
                })}
              </div>
            )}
          </Reveal>
        </Shell>
      </section>

      {/* ── Main Content Grid ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-paper">
        <Shell>
          {/* Empty Search Results State */}
          {filtered.length === 0 && (
            <div className="py-20 text-center border border-rule-strong bg-paper-raised rounded-[28px] p-8 sm:p-12 my-8 shadow-xs">
              <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-3">
                ZERO RESULTS FOUND
              </span>
              <h3 className="font-display text-3xl text-ink">No articles match your search</h3>
              <p className="text-muted text-sm mt-3 max-w-md mx-auto leading-relaxed">
                We couldn't find any blueprints matching "{searchQuery}". Try searching for another topic or reset the filter.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="btn-primary !py-3 !px-8 mt-6 text-xs rounded-full cursor-pointer"
              >
                Clear Search Query
              </button>
            </div>
          )}

          {/* Featured Master Pillar Guide Card in Niche View */}
          {isNicheView && pillarPost && !searchQuery && (
            <Reveal className="mb-20">
              <div className="p-8 sm:p-14 border border-signal/40 bg-paper-raised rounded-[32px] relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-80 h-80 bg-signal/10 rounded-full blur-[100px] pointer-events-none -z-10" />

                <div className="mb-6">
                  <span className="card-tag">
                    Master industry blueprint · 7-day sprint foundation
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal max-w-3xl leading-tight">
                  <Link
                    to={`/blog/${pillarPost.slug}/`}
                    className="hover:text-signal transition-colors"
                  >
                    {pillarPost.title}
                  </Link>
                </h2>

                <p className="text-muted text-sm sm:text-base mt-6 max-w-3xl leading-relaxed">
                  {pillarPost.excerpt}
                </p>

                <div className="mt-10 pt-8 border-t border-rule flex items-center justify-between flex-wrap gap-4">
                  <p className="text-xs text-muted">
                    {`${new Date(pillarPost.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })} · ${pillarPost.readingMinutes} min comprehensive read · Author: ${pillarPost.author.name}`}
                  </p>
                  <Link
                    to={`/blog/${pillarPost.slug}/`}
                    className="btn-primary !py-3 !px-8 text-xs rounded-full inline-flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Read Master Blueprint</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* Subheading for Cluster Guides in Niche View */}
          {isNicheView && (
            <div className="mb-10 pb-4 border-b border-rule flex items-center justify-between">
              <h3 className="text-xs text-ink font-semibold">
                Specialized tactical guides ({clusterPosts.length} articles)
              </h3>
              <span className="text-xs text-muted">Silo knowledge base</span>
            </div>
          )}

          {/* Squircle Bento Grid of Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clusterPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 30} as="article">
                <Link
                  to={`/blog/${post.slug}/`}
                  className="group block bg-paper-raised border border-rule-strong rounded-[24px] p-6 shadow-xs hover:border-ink/40 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Tile */}
                    {post.image ? (
                      <div className="rounded-[16px] border border-rule-strong mb-5 aspect-[16/10] bg-paper-sunken/80 overflow-hidden flex items-center justify-center p-1.5">
                        <img
                          src={post.image}
                          alt={post.title}
                          width={880}
                          height={550}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain rounded-[12px] group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <BlogThumbnail niche={post.niche} size="card" className="mb-5" />
                    )}

                    {/* Metadata Header */}
                    <div className="mb-3">
                      <span className="card-tag">
                        {NICHES[post.niche]}
                        {NICHE_PILLAR_SLUGS[post.niche] === post.slug ? ' · Pillar' : ''}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl sm:text-2xl text-ink font-medium group-hover:text-signal transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted leading-relaxed mt-3 line-clamp-2 text-xs sm:text-sm">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-6 pt-4 border-t border-rule flex items-center justify-between text-xs font-mono text-muted">
                    <span>
                      {`${new Date(post.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })} · ${post.readingMinutes}m read`}
                    </span>
                    <span className="text-signal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans text-xs font-medium">
                      Read Blueprint →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── Cinematic Dark Chapter: Editorial Principles ────────── */}
      <section className="bg-ink text-paper py-24 sm:py-32 relative overflow-hidden border-y border-white/10">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-signal/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="label text-signal-bright block mb-3">
                Editorial rigor
              </span>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-paper font-normal leading-[1.1] tracking-tight">
                The 4 principles behind our blueprints
              </h2>
              <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed mt-6 max-w-xl">
                Why we publish our entire technical playbook openly. No gatekept "contact for pricing" secrets, no superficial tips.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.tag} delay={i * 80}>
                <div className="bg-white/[0.04] p-8 rounded-[24px] border border-white/10 flex flex-col justify-between h-full hover:border-white/20 transition-all duration-300">
                  <div>
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright mb-4">
                      {p.tag}
                    </span>
                    <h3 className="font-display text-2xl text-paper font-medium mb-3 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-on-ink-muted text-xs leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* ── Cloaked-Style Dual-Card Closing CTA ─────────────────── */}
      <section className="bg-ink text-paper py-20 border-t border-white/10">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-[32px] p-8 sm:p-12">
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <LogoMark size={48} />
                    <span className="font-display text-2xl text-paper font-medium">Uncoded Hub</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight">
                    Turn these blueprints into your website.<br />
                    <em className="text-signal-bright italic font-medium">Delivered in seven days.</em>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Written by Deepak &amp; Geetha. Every article on this hub describes what we build every week for growing businesses.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs text-on-ink-muted">
                  <span>● Deepak &amp; Geetha</span>
                  <span>·</span>
                  <span>140+ Guides</span>
                  <span>·</span>
                  <span>Direct delivery</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="label text-signal-bright block mb-2">
                    7-day sprint reservation
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to build your bespoke site?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Book a free twenty-minute discovery call directly with Deepak & Geetha. You leave with an exact scope and fixed price.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/contact/"
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Book Discovery Call</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/portfolio/"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or test our 6 interactive sector demos first →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
