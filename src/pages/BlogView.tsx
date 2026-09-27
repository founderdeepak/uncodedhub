import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import {
  getPostBySlug,
  NICHES,
  getRelatedPosts,
  NICHE_PILLAR_SLUGS,
  getPostsByNiche,
} from '../lib/blog';
import BlogThumbnail from '../components/ui/BlogThumbnail';

/* ═══════════════════════════════════════════════════════════════════
   ARTICLE VIEW

   Renders long-form markdown posts with an interactive Table of
   Contents, executive takeaways, verified author bio, fast-track
   studio consultation callout, and in-silo related articles.
   ═══════════════════════════════════════════════════════════════════ */

export default function BlogView() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [copied, setCopied] = useState(false);
  const [tocCollapsed, setTocCollapsed] = useState(false);

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
              <p className="label text-signal">Blogs</p>
              <h1 className="font-display text-hero mt-8">That article does not exist.</h1>
              <p className="text-lead text-muted mt-10 max-w-xl">
                We have not published anything at this address, so any link you followed to get
                here was pointing at nothing. Sorry about that.
              </p>
              <div className="mt-12 pt-8 border-t border-rule flex flex-wrap gap-x-8 gap-y-3">
                <Link to="/blog" className="link-underline text-ink">
                  Back to the blogs →
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

  const relatedPosts = getRelatedPosts(post, 3);
  const nicheTotalCount = getPostsByNiche(post.niche).length;
  const pillarSlug = NICHE_PILLAR_SLUGS[post.niche];

  const url = `https://uncodedhub.com/blog/${post.slug}`;
  const ogImageUrl = post.image
    ? `https://uncodedhub.com${post.image}`
    : 'https://uncodedhub.com/og-image.jpg';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: [ogImageUrl],
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.linkedin,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://uncodedhub.com/logo-large.png',
      },
    },
    mainEntityOfPage: url,
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;
  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title,
  )}&url=${encodeURIComponent(url)}`;

  return (
    <>
      <Helmet>
        <title>{`${post.title} — Uncoded Hub`}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />
        {/* OpenGraph */}
        <meta property="og:site_name" content="Uncoded Hub" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content={post.title} />
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@uncodedhub" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={post.title} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="pt-36 md:pt-44 pb-20">
        <Shell width="narrow">
          <Reveal>
            {/* ── Breadcrumb ── */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-xs">
              <Link to="/blog" className="label text-signal hover:underline">
                ← Blogs
              </Link>
              <span className="text-rule-strong">/</span>
              <Link
                to={`/blog/niche/${post.niche}`}
                className="label text-muted hover:text-ink transition-colors"
              >
                {NICHES[post.niche]}
              </Link>
            </nav>

            <h1 className="font-display text-hero mt-8">{post.title}</h1>

            {/* ── Byline & Metadata ── */}
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 mt-6 pt-6 border-t border-rule">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xs">
                  {post.author.initials}
                </span>
                <div>
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium text-sm text-ink hover:text-signal transition-colors inline-flex items-center gap-1"
                  >
                    {post.author.name}
                    <span className="text-[10px] text-muted">↗</span>
                  </a>
                  <p className="label text-muted text-[11px]">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>

            {/* ── Utility & Share Bar ── */}
            <div className="mt-6 flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-rule text-xs">
              <div className="flex items-center gap-3">
                <span className="label text-muted text-[10px] tracking-widest uppercase">
                  Share Guide:
                </span>
                <a
                  href={shareLinkedInUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-quiet hover:text-signal transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={shareTwitterUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-quiet hover:text-signal transition-colors"
                >
                  X (Twitter)
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="label text-ink hover:text-signal transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? '✓ Link Copied to Clipboard' : '⎘ Copy Article Link'}
              </button>
            </div>
          </Reveal>

          {/* ── Hero Image / Graphic Motif ── */}
          <Reveal delay={40} className="mt-10">
            {post.image ? (
              <figure className="m-0 p-0">
                <img
                  src={post.image}
                  alt={`${post.title} — Architectural Blueprint by Uncoded Hub`}
                  width={1600}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full aspect-video object-cover border border-rule-strong shadow-sm"
                />
              </figure>
            ) : (
              <BlogThumbnail niche={post.niche} size="hero" />
            )}
          </Reveal>

          {/* ── Executive Summary / Key Takeaways Box ── */}
          {post.excerpt && (
            <Reveal delay={60} className="mt-10">
              <div className="p-6 md:p-8 border-l-2 border-signal bg-paper-raised/50 border border-y-rule border-r-rule">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                  <p className="label text-signal text-xs font-semibold tracking-wider">
                    Executive Summary · Key Takeaways
                  </p>
                </div>
                <p className="text-ink leading-relaxed text-sm md:text-base font-normal">
                  {post.excerpt}
                </p>
              </div>
            </Reveal>
          )}

          {/* ── Interactive Table of Contents ── */}
          {post.toc && post.toc.length > 0 && (
            <Reveal delay={70} className="mt-8">
              <nav
                aria-label="Table of contents"
                className="p-6 md:p-8 border border-rule-strong bg-paper-raised/40 rounded-[2px]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-rule">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <h2 className="label text-ink font-semibold tracking-wider text-xs">
                      Table of Contents
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="label text-muted text-xs">{post.toc.length} Sections</span>
                    <button
                      type="button"
                      onClick={() => setTocCollapsed(!tocCollapsed)}
                      className="label text-signal hover:underline text-xs cursor-pointer"
                    >
                      {tocCollapsed ? 'Expand [↓]' : 'Collapse [↑]'}
                    </button>
                  </div>
                </div>

                {!tocCollapsed && (
                  <ol className="mt-5 space-y-2.5 text-sm">
                    {post.toc.map((item, index) => {
                      const isH3 = item.level === 3;
                      return (
                        <li key={item.id} className={isH3 ? 'pl-6 text-muted' : 'font-medium'}>
                          <a
                            href={`#${item.id}`}
                            className="hover:text-signal transition-colors inline-flex items-baseline gap-2.5 group"
                          >
                            {!isH3 && (
                              <span className="font-mono text-xs text-signal/80 group-hover:text-signal">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            )}
                            {isH3 && <span className="text-rule-strong">↳</span>}
                            <span className="group-hover:underline underline-offset-4">
                              {item.text}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </nav>
            </Reveal>
          )}

          {/* ── Article Content ── */}
          <Reveal delay={80} className="mt-14 pt-14 border-t border-rule">
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.html }} />
          </Reveal>

          {/* ── In-Article Fast-Track Conversion Callout ── */}
          <Reveal delay={100} className="mt-16">
            <div className="p-7 md:p-9 border border-signal/30 bg-surface/50 rounded-[2px] relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal"></span>
                <p className="label text-signal text-xs">Uncoded Hub · 7-Day Fast-Track Delivery</p>
              </div>
              <h3 className="font-display text-xl md:text-2xl mt-3 text-ink">
                Need a high-converting website built for your {NICHES[post.niche].toLowerCase()}{' '}
                business?
              </h3>
              <p className="text-muted text-sm mt-2.5 max-w-2xl leading-relaxed">
                No WordPress bloat or agency delays. We deliver custom high-performance websites in 7
                business days with a published late-means-free guarantee and complete code ownership.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn-primary !py-2.5 !px-6 text-xs">
                  Book a 20-minute call →
                </Link>
                <Link
                  to={`/blog/niche/${post.niche}`}
                  className="link-underline text-xs text-ink hover:text-signal transition-colors"
                >
                  Browse all {NICHES[post.niche]} guides →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ── Verified Author Bio & Trust Box ── */}
          <Reveal delay={120} className="mt-16 pt-10 border-t border-rule">
            <div className="p-6 md:p-8 bg-paper-raised/40 border border-rule-strong flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xl shrink-0">
                {post.author.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display text-lg text-ink font-medium">{post.author.name}</h3>
                  <span className="label bg-signal/10 text-signal border border-signal/20 px-2 py-0.5 text-[10px] uppercase font-semibold">
                    Verified Studio Author
                  </span>
                </div>
                <p className="label text-muted text-xs mt-0.5">{post.author.role}</p>
                <p className="text-muted text-sm mt-3 leading-relaxed">{post.author.bio}</p>
                <div className="mt-4 flex items-center gap-4">
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-xs text-ink hover:text-signal transition-colors inline-flex items-center gap-1"
                  >
                    Connect on LinkedIn ↗
                  </a>
                  <Link
                    to="/about"
                    className="link-underline text-xs text-muted hover:text-ink transition-colors"
                  >
                    About Uncoded Hub →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Final Consultation CTA ── */}
          <Reveal delay={140} className="mt-16 pt-10 border-t border-rule">
            <p className="text-lead text-muted max-w-xl">
              Want a site built around your own business instead of a generic template?
            </p>
            <Link to="/contact" className="btn-primary mt-6">
              Book a 20-minute call
            </Link>
          </Reveal>
        </Shell>
      </article>

      {/* ── In-Silo Related Articles Section ── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-rule py-20 md:py-28 bg-paper-raised/40">
          <Shell>
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-rule">
                <div>
                  <p className="label text-signal">Related Articles · {NICHES[post.niche]}</p>
                  <h2 className="font-display text-2xl md:text-3xl mt-2">
                    Continue Reading in this Industry Series
                  </h2>
                </div>
                <Link
                  to={`/blog/niche/${post.niche}`}
                  className="link-underline text-sm font-medium hover:text-signal transition-colors inline-flex items-center gap-1.5"
                >
                  View all {nicheTotalCount} {NICHES[post.niche]} guides →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((related, i) => (
                  <Reveal key={related.slug} delay={i * 40} as="article">
                    <Link to={`/blog/${related.slug}`} className="group block">
                      {related.image ? (
                        <img
                          src={related.image}
                          alt={related.title}
                          width={880}
                          height={495}
                          loading="lazy"
                          decoding="async"
                          className="w-full aspect-video object-cover border border-rule-strong mb-5 group-hover:border-signal transition-all duration-300"
                        />
                      ) : (
                        <BlogThumbnail niche={related.niche} size="card" className="mb-5" />
                      )}
                      <div className="flex items-center justify-between">
                        <span className="label text-signal">{NICHES[related.niche]}</span>
                        {related.slug === pillarSlug && (
                          <span className="label bg-signal/10 text-signal border border-signal/20 px-2 py-0.5 text-[10px] uppercase font-semibold">
                            ★ Master Pillar
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-title mt-3 group-hover:text-signal transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="text-muted leading-relaxed mt-3 line-clamp-2 text-sm">
                          {related.excerpt}
                        </p>
                      )}
                      <p className="label text-muted mt-5 text-xs">
                        {`${new Date(related.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })} · ${related.readingMinutes} min read`}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>
      )}
    </>
  );
}
