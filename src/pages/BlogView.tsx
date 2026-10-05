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
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   ARTICLE VIEW — Cloaked-Style Editorial Longform Architecture
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
          <title>Article Not Found — Uncoded Hub</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <section className="pt-36 md:pt-44 pb-32 min-h-[70vh] bg-paper">
          <Shell width="narrow">
            <Reveal>
              <span className="text-xs font-mono text-signal uppercase tracking-wider block mb-4">
                404 · NOT FOUND
              </span>
              <h1 className="font-display text-5xl sm:text-6xl text-ink font-normal">That article does not exist.</h1>
              <p className="text-muted text-base mt-6 max-w-xl leading-relaxed">
                We have not published anything at this address. The URL may have moved or been retired.
              </p>
              <div className="mt-10 pt-8 border-t border-rule flex flex-wrap gap-4">
                <Link to="/blog" className="btn-primary !py-3 !px-6 rounded-full text-xs">
                  ← Back to All Blueprints
                </Link>
                <Link to="/contact" className="px-6 py-3 rounded-full border border-rule-strong text-xs font-mono hover:border-ink transition-colors">
                  Contact Studio →
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

  const url = `https://uncodedhub.com/blog/${post.slug}/`;
  const ogImageUrl = post.image
    ? `https://uncodedhub.com${post.image}`
    : 'https://uncodedhub.com/og-image.jpg';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: [ogImageUrl],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
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
    about: {
      '@type': 'Thing',
      name: NICHES[post.niche],
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://uncodedhub.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blueprints',
        item: 'https://uncodedhub.com/blog/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: NICHES[post.niche],
        item: `https://uncodedhub.com/blog/niche/${post.niche}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: url,
      },
    ],
  };

  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

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
        {post.keywords && <meta name="keywords" content={post.keywords} />}
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
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={NICHES[post.niche]} />
        <meta property="article:author" content={post.author.name} />
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@uncodedhub" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={post.title} />
        {/* Schema.org Rich Structured Data */}
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      <article className="pt-10 sm:pt-16 pb-20 bg-paper">
        <Shell width="narrow">
          <Reveal>
            {/* ── Breadcrumb & Top Pill ── */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono">
                <Link to="/blog" className="text-signal hover:underline">
                  ← Blogs
                </Link>
                <span className="text-rule-strong">/</span>
                <Link
                  to={`/blog/niche/${post.niche}`}
                  className="text-muted hover:text-ink transition-colors"
                >
                  {NICHES[post.niche]}
                </Link>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-raised border border-rule-strong text-[11px] font-mono text-muted shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                <span>ARCHITECTURAL BLUEPRINT</span>
              </div>
            </div>

            {/* ── Article Heading ── */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-ink font-normal tracking-tight leading-[1.08] mb-8">
              {post.title}
            </h1>

            {/* ── Author Byline & Timing Meta Row ── */}
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6 py-6 border-y border-rule">
              <div className="flex items-center gap-3.5">
                <span className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center font-display text-base font-medium shadow-xs">
                  {post.author.initials}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <a
                      href={post.author.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-medium text-sm text-ink hover:text-signal transition-colors inline-flex items-center gap-1"
                    >
                      {post.author.name}
                      <span className="text-[10px] text-muted">↗</span>
                    </a>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-paper-raised border border-rule text-signal">
                      Verified Author
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-muted mt-0.5">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-muted">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {post.date.includes('T') && (
                    <span>
                      {' · '}
                      {new Date(post.date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </span>
                  )}
                </time>
                <span>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>

            {/* ── Social Share & Copy Bar ── */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-rule text-xs font-mono">
              <div className="flex items-center gap-3 text-muted">
                <span className="text-[10px] uppercase tracking-wider">Share:</span>
                <a
                  href={shareLinkedInUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-signal transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={shareTwitterUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-signal transition-colors"
                >
                  X (Twitter) ↗
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="text-ink hover:text-signal transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? '✓ Link Copied' : '⎘ Copy Article Link'}
              </button>
            </div>
          </Reveal>

          {/* ── Hero Graphic Motif / Image ── */}
          <Reveal delay={40} className="mt-10">
            {post.image ? (
              <figure className="m-0 p-0 rounded-[28px] border border-rule-strong bg-paper-sunken/60 overflow-hidden p-2 sm:p-3 shadow-xs">
                <img
                  src={post.image}
                  alt={`${post.title} — Architectural Blueprint by Uncoded Hub`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto max-h-[680px] object-contain rounded-[20px] mx-auto block"
                />
              </figure>
            ) : (
              <BlogThumbnail niche={post.niche} size="hero" className="rounded-[28px]" />
            )}
          </Reveal>

          {/* ── Executive Summary / Key Takeaways Bento Card ── */}
          {post.excerpt && (
            <Reveal delay={60} className="mt-10">
              <div className="p-8 rounded-[24px] bg-paper-sunken border border-rule-strong shadow-xs">
                <span className="card-tag mb-3">
                  Executive summary · Key takeaways
                </span>
                <p className="text-ink text-sm sm:text-base leading-relaxed">
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
                className="p-8 rounded-[24px] bg-paper-raised border border-rule-strong shadow-xs"
              >
                <div className="flex items-center justify-between pb-4 border-b border-rule">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                    <h2 className="text-xs text-ink font-semibold">
                      Table of contents
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted">{post.toc.length} Sections</span>
                    <button
                      type="button"
                      onClick={() => setTocCollapsed(!tocCollapsed)}
                      className="text-xs font-mono text-signal hover:underline cursor-pointer"
                    >
                      {tocCollapsed ? 'Expand [↓]' : 'Collapse [↑]'}
                    </button>
                  </div>
                </div>

                {!tocCollapsed && (
                  <ol className="mt-6 space-y-3 text-sm">
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
                            <span className="group-hover:underline underline-offset-4 text-xs sm:text-sm">
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

          {/* ── In-Article Fast-Track Conversion Bento ── */}
          <Reveal delay={100} className="mt-16">
            <div className="bg-ink text-paper p-8 sm:p-12 rounded-[28px] border border-white/10 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-72 h-72 bg-signal/15 rounded-full blur-[90px] pointer-events-none -z-10" />

              <span className="label text-signal-bright block mb-2.5">
                Uncoded Hub · 7-day fast-track delivery
              </span>

              <h3 className="font-display text-2xl sm:text-3xl text-paper font-normal leading-tight mt-2">
                Need a high-converting website built for your {NICHES[post.niche].toLowerCase()} business?
              </h3>

              <p className="text-on-ink-muted text-xs sm:text-sm mt-3.5 max-w-xl leading-relaxed">
                Zero WordPress bloat, zero junior handoffs. Deepak & Geetha build bespoke high-performance websites in 7 business days with a contractual late-means-free guarantee and complete code ownership.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-xs py-3.5 px-7 rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book a 20-minute discovery call</span>
                  <span>→</span>
                </Link>
                <Link
                  to={`/blog/niche/${post.niche}`}
                  className="text-xs font-mono text-on-ink-muted hover:text-paper transition-colors"
                >
                  Browse all {NICHES[post.niche]} guides →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ── Verified Author Bio Box ── */}
          <Reveal delay={120} className="mt-16 pt-10 border-t border-rule">
            <div className="p-8 bg-paper-raised border border-rule-strong rounded-[24px] shadow-xs flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-2xl font-medium shrink-0 shadow-xs">
                {post.author.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display text-2xl text-ink font-medium">{post.author.name}</h3>
                  <span className="text-[10px] font-mono bg-signal/10 text-signal border border-signal/20 px-2.5 py-0.5 rounded-full uppercase font-semibold">
                    Verified Studio Author
                  </span>
                </div>
                <p className="text-xs font-mono text-muted mt-1">{post.author.role}</p>
                <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">{post.author.bio}</p>
                <div className="mt-4 flex items-center gap-4 text-xs font-mono">
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-signal hover:underline inline-flex items-center gap-1"
                  >
                    Connect on LinkedIn ↗
                  </a>
                  <Link
                    to="/about"
                    className="text-muted hover:text-ink transition-colors"
                  >
                    About Deepak & Geetha →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </article>

      {/* ── In-Silo Related Articles Section ── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-rule py-20 md:py-28 bg-paper-sunken">
          <Shell>
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-rule">
                <div>
                  <span className="label text-signal block mb-2">
                    Related blueprints · {NICHES[post.niche]}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal">
                    Continue reading in this industry series
                  </h2>
                </div>
                <Link
                  to={`/blog/niche/${post.niche}`}
                  className="text-xs font-medium text-signal hover:underline inline-flex items-center gap-1.5"
                >
                  View all {nicheTotalCount} {NICHES[post.niche]} guides →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((related, i) => (
                  <Reveal key={related.slug} delay={i * 40} as="article">
                    <Link
                      to={`/blog/${related.slug}`}
                      className="group block bg-paper-raised border border-rule-strong rounded-[24px] p-6 shadow-xs hover:border-ink/40 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between"
                    >
                      <div>
                        {related.image ? (
                          <div className="rounded-[16px] border border-rule-strong mb-5 aspect-[16/10] bg-paper-sunken/80 overflow-hidden flex items-center justify-center p-1.5">
                            <img
                              src={related.image}
                              alt={related.title}
                              width={880}
                              height={550}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain rounded-[12px] group-hover:scale-[1.02] transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <BlogThumbnail niche={related.niche} size="card" className="mb-5" />
                        )}

                        <div className="mb-3">
                          <span className="card-tag">
                            {NICHES[related.niche]}
                            {related.slug === pillarSlug ? ' · Master pillar' : ''}
                          </span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl text-ink font-medium group-hover:text-signal transition-colors line-clamp-2 leading-snug">
                          {related.title}
                        </h3>

                        {related.excerpt && (
                          <p className="text-muted leading-relaxed mt-3 line-clamp-2 text-xs sm:text-sm">
                            {related.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-rule flex items-center justify-between text-xs font-mono text-muted">
                        <span>
                          {`${new Date(related.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })} · ${related.readingMinutes}m read`}
                        </span>
                        <span className="text-signal group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans text-xs font-medium">
                          Read Blueprint →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </Shell>
        </section>
      )}

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
                    Build your website with the engineers who write this.<br />
                    <span className="text-signal-bright italic">Direct with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    One 20-minute video call. We look at your business live, discuss the architecture, and deliver an exact scope and fixed price the next day.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak & Geetha</span>
                  <span>·</span>
                  <span>Direct Delivery</span>
                  <span>·</span>
                  <span>7-Day Sprints</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="label text-signal-bright block mb-2">
                    7-day sprint reservation
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Ready to book your discovery call?
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Slots are scheduled in your local timezone. Zero pitch decks, zero high-pressure sales reps.
                  </p>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule 20-Minute Call</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/portfolio"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or test our 6 live client demos first →
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
