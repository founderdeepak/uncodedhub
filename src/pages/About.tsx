import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   UNCODED HUB — STUDIO & ABOUT PAGE
   Canonical: https://uncodedhub.com/about/

   Core Positioning:
   "Good Businesses Deserve Better Websites. We Built Uncoded Hub to Make That Happen."
   "A brother-and-sister team combining thoughtful design and custom engineering to help ambitious businesses compete, grow, and earn the trust they deserve."

   Narrative Journey:
   1. Powerful Opening & Origin Story (The frustrating pattern of good businesses losing to flashy rivals)
   2. Meet Deepak & Geetha (Two complementary strengths: engineering architecture & design clarity)
   3. Working Philosophy: "We'd Rather Earn Your Trust Than Win Your Project" (The 4 Commitments)
   4. The 7-Day Sprint Ethos & Personal Humility
   5. The Colophon: Sacred Tamil Verse & Sincere Gratitude
   6. Direct Co-Founder Discovery CTA (Deepak & Geetha, +91 86608 19023)
   ═══════════════════════════════════════════════════════════════════ */

interface AboutProps {
  onBook?: () => void;
}

const COMMITMENTS = [
  {
    num: '01',
    headline: 'We will tell you when you do not need us',
    summary:
      'If a one-page site does what a five-page site would have done, we will recommend the one-page option. We will never sell you something simply because it makes the invoice bigger. We would rather have a smaller invoice and your long-term trust than a client who realizes later they overbought.',
    badge: 'Honest Scoping',
  },
  {
    num: '02',
    headline: 'The people on the call are the people doing the work',
    summary:
      'There is no hidden junior team behind us that you have not met. Two founders, both on every project. Deepak handles the engineering; Geetha directs the design. We would rather be the studio that is booked out than the one that quietly subcontracts to interns.',
    badge: 'Senior Delivery',
  },
  {
    num: '03',
    headline: 'You own everything, including the exit',
    summary:
      'Your domain, hosting account, code, and project assets are registered in your own name from day one. If you ever decide to work with another studio in the future, you are completely free to do so. Nothing here is designed to make leaving difficult or expensive.',
    badge: 'Total Ownership',
  },
  {
    num: '04',
    headline: 'We will not invent numbers to sell you',
    summary:
      'No borrowed logos, no fabricated testimonials, no phantom case studies, and no exaggerated conversion claims we cannot verify with live analytics. We would rather earn your trust through the actual quality of our work than pretend to be something we are not.',
    badge: 'Radical Truth',
  },
];

export default function About({ onBook }: AboutProps) {
  const handleBooking = () => {
    if (onBook) {
      onBook();
    } else {
      window.location.href = '/contact/#book';
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Uncoded Hub | Deepak & Geetha',
    description:
      'Good businesses deserve better websites. Meet Deepak and Geetha, a brother-and-sister team running a boutique web design and development studio in Bengaluru, India.',
    url: 'https://uncodedhub.com/about/',
    mainEntity: {
      '@type': 'Organization',
      name: 'Uncoded Hub',
      url: 'https://uncodedhub.com/',
      founders: [
        {
          '@type': 'Person',
          name: 'Deepak',
          jobTitle: 'Co-Founder & Technical Architect',
        },
        {
          '@type': 'Person',
          name: 'Geetha',
          jobTitle: 'Co-Founder & Head of Design',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>About Uncoded Hub | Deepak &amp; Geetha · Boutique Web Studio</title>
        <meta
          name="description"
          content="Good businesses deserve better websites. Meet Deepak and Geetha, a brother-and-sister team in Bengaluru combining thoughtful design and custom engineering for ambitious businesses."
        />
        <link rel="canonical" href="https://uncodedhub.com/about/" />
        <meta property="og:title" content="About Uncoded Hub | Deepak & Geetha" />
        <meta
          property="og:description"
          content="Good businesses deserve better websites. We built Uncoded Hub to make that happen."
        />
        <meta property="og:url" content="https://uncodedhub.com/about/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://uncodedhub.com/og/about.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Deepak & Geetha — Founders of Uncoded Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Uncoded Hub | Deepak & Geetha" />
        <meta
          name="twitter:description"
          content="A brother-and-sister team combining thoughtful design and custom engineering to help ambitious businesses compete, grow, and earn the trust they deserve."
        />
        <meta name="twitter:image" content="https://uncodedhub.com/og/about.jpg" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Breadcrumb Ribbon ────────────────────────────────────────── */}
      <div className="bg-paper border-b border-rule pt-20 sm:pt-24 pb-3">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-muted">
              <Link to="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-ink font-medium">Studio &amp; About</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 text-signal font-mono text-[11px]">
                <span>Deepak &amp; Geetha · Brother &amp; Sister Studio</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-rule text-ink font-mono text-[11px]">
                <span>📍 Bengaluru, India · Serving Worldwide</span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* ── Chapter 1: Powerful Opening & Central Purpose ────────────── */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 bg-paper relative overflow-hidden border-b border-rule">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-signal/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Shell>
          <Reveal>
            <div className="max-w-4xl">
              <span className="label text-signal font-semibold block mb-4">
                THE STUDIO · WHY WE BUILT UNCODED HUB
              </span>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-normal tracking-tight leading-[1.05] mb-6">
                Good businesses deserve better websites. <br />
                <em className="italic text-signal font-normal">We built Uncoded Hub to make that happen.</em>
              </h1>

              <p className="text-lead text-muted text-base sm:text-xl leading-relaxed max-w-3xl mb-8">
                We're Deepak and Geetha, a brother-and-sister team running a small web design and development studio in Bengaluru, India. We combine thoughtful design and custom engineering to help ambitious businesses compete, grow, and earn the trust they deserve.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleBooking}
                  className="btn-primary !px-8 !py-4 text-sm rounded-full shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book a Free Discovery Call</span>
                  <span>→</span>
                </button>

                <a
                  href="#origin-story"
                  className="px-6 py-4 rounded-full border border-rule-strong hover:border-signal text-ink font-mono text-xs uppercase tracking-wider transition-colors bg-paper-raised inline-flex items-center gap-2"
                >
                  <span>Read Our Story</span>
                  <span>↓</span>
                </a>

                <a
                  href="https://wa.me/918660819023?text=Hi%20Deepak%20and%20Geetha,%20I'd%20like%20to%20learn%20more%20about%20your%20studio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted hover:text-signal transition-colors inline-flex items-center gap-1.5 px-3 py-2"
                >
                  <span>💬 WhatsApp: +91 86608 19023</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Chapter 2: The Origin Story (The Problem We Care About) ──── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule" id="origin-story">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Dual Founder Squircle Cards */}
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[24px] overflow-hidden border border-rule-strong bg-paper shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/deepak-mobile.webp" />
                    <img
                      src="/deepak.webp"
                      alt="Deepak, co-founder of Uncoded Hub"
                      width={540}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="photo-hover w-full h-full object-cover grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule bg-paper">
                    <strong className="text-xs text-ink block font-sans">Deepak</strong>
                    <span className="text-[10px] text-muted font-mono uppercase tracking-wider">Engineering</span>
                  </div>
                </div>

                <div className="rounded-[24px] overflow-hidden border border-rule-strong bg-paper shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/geetha-mobile.webp" />
                    <img
                      src="/geetha.webp"
                      alt="Geetha, co-founder of Uncoded Hub"
                      width={700}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      className="photo-hover w-full h-full object-cover object-top grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule bg-paper">
                    <strong className="text-xs text-ink block font-sans">Geetha</strong>
                    <span className="text-[10px] text-muted font-mono uppercase tracking-wider">Design &amp; Strategy</span>
                  </div>
                </div>
              </div>
              <p className="label text-muted mt-4 text-center text-xs font-mono">
                Deepak &amp; Geetha · Co-Founders, Uncoded Hub
              </p>
            </Reveal>

            {/* Right: The Origin Narrative */}
            <Reveal delay={100} className="lg:col-span-7">
              <span className="card-tag mb-3">WHY WE BUILT UNCODED HUB</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight mb-6">
                We've seen it happen too many times.
              </h2>

              <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  A business spends years getting really good at what it does. It builds a stellar reputation, takes deep care of its clients, and delivers work it can be proud of.
                </p>
                <p>
                  A clinic with decades of clinical expertise. An architecture firm with transformative buildings. A commercial contractor with twenty years of structural precision.
                </p>
                <p>
                  But when someone visits their website, none of that excellence comes across. The site takes six seconds to load, the typography is clunky, and the messaging fails to explain what makes them remarkable.
                </p>
                <p className="text-ink font-medium">
                  Instead, a competitor with a better-looking website, clearer messaging, and a faster mobile experience gets the enquiry.
                </p>
                <p>
                  And the frustrating part? The better business doesn't always win. The business that communicates better often does. We felt there was something deeply wrong with that.
                </p>
                <p>
                  We also saw how difficult it was for businesses to get a genuinely good website. Traditional agencies often meant 3 to 6 months of endless waiting, inflated invoices, and multiple layers of account managers standing between the client and the people actually doing the work. Many businesses gave up, bought bloated WordPress templates, and watched them rot.
                </p>
                <p className="p-4 rounded-xl bg-paper border border-rule text-ink-soft font-medium">
                  We believed there had to be a better way. So we built Uncoded Hub around a different idea: give businesses the personal attention, design quality, and technical care they deserve, without the unnecessary delays, inflated costs, and bureaucratic complexity of traditional agency projects.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* ── Chapter 3: Meet Deepak & Geetha (Two Complementary Strengths) */}
      <section className="bg-ink text-paper py-20 sm:py-28 relative overflow-hidden border-y border-white/10" id="founders">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/3 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="text-signal-bright font-mono text-xs font-semibold uppercase tracking-wider block mb-3">
                TWO COMPLEMENTARY STRENGTHS · ONE SHARED STANDARD
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-paper font-normal leading-tight mb-4">
                She makes it clear. <em className="text-signal-bright italic font-medium">He makes it work.</em>
              </h2>
              <p className="text-on-ink-muted text-sm sm:text-base leading-relaxed">
                We're a small team by choice, and that shapes everything about how we work. Instead of passing your project between ten different junior departments, we divide our responsibilities by our natural strengths:
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Geetha */}
            <Reveal delay={50}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.04] backdrop-blur-md border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright font-mono uppercase tracking-wider">
                      Design &amp; Visual Strategy
                    </span>
                    <span className="text-xs font-mono text-white/40">Co-Founder</span>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src="/geetha.webp"
                      alt="Geetha, Co-Founder & Head of Design"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-signal-bright/40 shadow-lg shrink-0"
                      width={80}
                      height={80}
                    />
                    <div>
                      <h3 className="font-display text-3xl text-paper font-medium mb-1">Geetha</h3>
                      <p className="text-xs font-mono text-signal-bright/90">
                        Visual direction, typography, layout &amp; conversion psychology
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-on-ink-muted text-xs sm:text-sm leading-relaxed">
                    <p>
                      Geetha leads design and delivery. She focuses on typography, color palettes, visual hierarchy, and all the deliberate details that shape how someone feels when they visit a website.
                    </p>
                    <p>
                      Before Uncoded Hub, Geetha spent 2.5 years as a Business Presentation Specialist at McKinsey &amp; Company—designing more than 15,000 slides and 550+ executive decks for global leaders. The job was never to make things pretty for the sake of decoration. It was to take something complicated, find what truly mattered, and make it so clear that someone could understand it, trust it, and act on it.
                    </p>
                    <p>
                      Her belief is simple: <strong className="text-paper">design isn’t decoration; design is clarity.</strong> Every element should have an undeniable reason to be there, and every page should make it effortless for someone to trust the business behind it.
                    </p>
                    <p className="text-white/60 italic text-xs border-t border-white/10 pt-3">
                      She is also the calm, steady presence during busy project launches who refuses to let quality slip under pressure.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-lg font-bold text-signal-bright block">2.5 yrs</span>
                    <span className="text-[10px] text-white/50 block">McKinsey &amp; Co.</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-lg font-bold text-signal-bright block">15,000+</span>
                    <span className="text-[10px] text-white/50 block">Slides Designed</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-lg font-bold text-signal-bright block">550+</span>
                    <span className="text-[10px] text-white/50 block">Decks Delivered</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Deepak */}
            <Reveal delay={100}>
              <div className="p-8 sm:p-10 rounded-[28px] bg-white/[0.04] backdrop-blur-md border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright font-mono uppercase tracking-wider">
                      Engineering &amp; Architecture
                    </span>
                    <span className="text-xs font-mono text-white/40">Co-Founder</span>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src="/deepak.webp"
                      alt="Deepak, Co-Founder & Technical Architect"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-signal-bright/40 shadow-lg shrink-0"
                      width={80}
                      height={80}
                    />
                    <div>
                      <h3 className="font-display text-3xl text-paper font-medium mb-1">Deepak</h3>
                      <p className="text-xs font-mono text-signal-bright/90">
                        Structure, custom React code, sub-second speed &amp; edge deployment
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 text-on-ink-muted text-xs sm:text-sm leading-relaxed">
                    <p>
                      Deepak leads engineering, technical discovery, and structural architecture. He’s the person thinking about how everything fits together under the hood, how it performs on real mobile 4G networks, and how each architectural decision helps visitors move closer to becoming customers.
                    </p>
                    <p>
                      Over 7.2+ years, Deepak has built software across diverse technical challenges—from websites and web applications to WebGL, interactive systems, and multiplayer games—writing more than 17,000 lines of clean code across modern frameworks. For him, the code is never just code; it is a reliable business tool that must load in under a second and never break.
                    </p>
                    <p>
                      Alongside engineering, he has coordinated teams of 20+ people and studied technical SEO, giving him a complete view of how a platform needs to perform commercially beyond the code editor.
                    </p>
                    <p className="text-white/60 italic text-xs border-t border-white/10 pt-3">
                      He is also the kind of person who once climbed the sacred Velliangiri hills alone, spent the night on the mountain, and reached the summit at dawn. He believes some of the best decisions come when you slow down, step away from the noise, and think clearly.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-lg font-bold text-signal-bright block">7.2+ yrs</span>
                    <span className="text-[10px] text-white/50 block">In Software</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-lg font-bold text-signal-bright block">17,000+</span>
                    <span className="text-[10px] text-white/50 block">Lines of Code</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                    <span className="text-lg font-bold text-signal-bright block">20+</span>
                    <span className="text-[10px] text-white/50 block">Team Coordination</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/10 text-center max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-paper font-sans leading-relaxed mb-0">
              Together, we bring those two sides together. <strong>Deepak makes sure the website works beautifully under the hood. Geetha makes sure it communicates beautifully on the screen.</strong> And because we are both personally involved in every project, the people you meet on day one are the exact same people doing the actual work.
            </p>
          </div>
        </Shell>
      </section>

      {/* ── Chapter 4: Working Philosophy & The 4 Commitments ─────────── */}
      <section className="py-20 sm:py-28 bg-paper border-b border-rule" id="commitments">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <span className="card-tag mb-3">RADICAL ACCOUNTABILITY</span>
              <h2 className="font-display text-3xl sm:text-5xl text-ink font-normal tracking-tight">
                We'd rather earn your trust than win your project.
              </h2>
              <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
                Not empty corporate values. Values are free. These are the four contractual commitments that shape every single project we take on:
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.num} delay={i * 50}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule hover:border-signal/50 shadow-xs flex flex-col justify-between h-full transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="card-tag">{c.badge}</span>
                      <span className="font-mono text-xs text-muted font-bold">Commitment {c.num}</span>
                    </div>
                    <h3 className="font-display text-2xl text-ink font-medium mb-3">{c.headline}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{c.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-paper-sunken border border-rule text-xs font-mono text-muted text-center max-w-3xl mx-auto">
            ⚡ <strong>The 7-Day Sprint Guarantee:</strong> If we ever miss your agreed launch date due to our own delay, you get a 100% full refund and keep the complete codebase for free.
          </div>
        </Shell>
      </section>

      {/* ── Chapter 5: The Studio Ethos & Personal Humility ───────────── */}
      <section className="py-20 sm:py-28 bg-paper-sunken border-b border-rule">
        <Shell>
          <Reveal>
            <div className="max-w-3xl mx-auto space-y-6 text-muted text-sm sm:text-base leading-relaxed">
              <span className="card-tag">A STUDIO BUILT ON INTENTION</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight">
                Why we choose to stay small.
              </h2>

              <p>
                Our seven-day website sprint is another direct extension of that belief. By working to a clear, agreed scope—with both founders directly involved—we give each project focused, single-threaded attention and avoid the months of waiting that make traditional agency projects drag on.
              </p>
              <p>
                We work with businesses across Bengaluru, India, and internationally across the United States, United Kingdom, Australia, United Arab Emirates, Europe, and Canada. And we genuinely enjoy getting to understand the very different commercial challenges each business faces.
              </p>
              <p>
                Because at the end of the day, we aren't interested in building websites just to add another project to our portfolio.
              </p>
              <p className="text-ink font-medium text-base sm:text-lg">
                We want to help good businesses present themselves better, earn the trust of the people they want to reach, and compete with confidence.
              </p>
              <p>
                We know we're a small studio. We don't pretend to be a massive agency with hundreds of employees or a wall full of awards.
              </p>
              <p>
                We're two people who care deeply about the work, take personal responsibility for what we deliver, and believe that a better experience starts with treating every project like it matters.
              </p>
              <p>
                And we're grateful for every business that trusts us to be part of its journey.
              </p>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Chapter 6: The Sacred Colophon & Divine Heritage ─────────── */}
      <section className="relative overflow-hidden py-28 md:py-36 bg-paper border-b border-rule">
        {/* Subtle warm base gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #fdf8ee 0%, #faf3e0 50%, #fdf8ee 100%)' }}
        />
        {/* Subtle warm center glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 72%)' }}
        />
        {/* Hairline borders */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(180,140,30,0.4) 50%, transparent 100%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(180,140,30,0.3) 50%, transparent 100%)' }}
        />

        <Shell width="narrow">
          <Reveal>
            <div className="relative text-center">
              {/* Label */}
              <span
                className="inline-block text-[10px] font-mono font-semibold tracking-[0.22em] uppercase mb-10"
                style={{ color: 'rgba(160,110,20,0.7)' }}
              >
                Colophon &nbsp;&middot;&nbsp; Our Guiding Belief
              </span>

              {/* Sacred Ornament */}
              <div className="flex items-center justify-center mb-10" aria-hidden="true">
                <svg width="240" height="52" viewBox="0 0 240 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="26" x2="88" y2="26" stroke="url(#colL)" strokeWidth="0.75" />
                  <line x1="152" y1="26" x2="240" y2="26" stroke="url(#colR)" strokeWidth="0.75" />
                  <polygon points="120,10 134,26 120,42 106,26" fill="none" stroke="rgba(180,140,30,0.6)" strokeWidth="1" />
                  <polygon points="120,17 128,26 120,35 112,26" fill="rgba(212,175,55,0.12)" />
                  <circle cx="120" cy="26" r="2.5" fill="rgba(160,110,20,0.8)" />
                  <circle cx="96" cy="26" r="1.5" fill="rgba(180,140,30,0.4)" />
                  <circle cx="144" cy="26" r="1.5" fill="rgba(180,140,30,0.4)" />
                  <defs>
                    <linearGradient id="colL" x1="0" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(180,140,30,0)" />
                      <stop offset="100%" stopColor="rgba(180,140,30,0.5)" />
                    </linearGradient>
                    <linearGradient id="colR" x1="152" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(180,140,30,0.5)" />
                      <stop offset="100%" stopColor="rgba(180,140,30,0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Tamil verse */}
              <p
                className="font-display text-[1.25rem] sm:text-[1.55rem] md:text-[1.75rem] font-normal leading-[1.65] max-w-2xl mx-auto mb-8 font-serif"
                style={{
                  background: 'linear-gradient(135deg, #7a5a10 0%, #b8902a 35%, #9a7220 65%, #5c4010 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {'என் செயலாவது யாதொன்றும் இல்லை — இனித் தெய்வமே உன்செயலே என்று உணரப் பெற்றேன்'}
              </p>

              {/* Gold dot divider */}
              <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,140,30,0.5))' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(160,110,20,0.7)' }} />
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(180,140,30,0.5), transparent)' }} />
              </div>

              {/* English translation */}
              <p
                className="font-display text-[1.15rem] sm:text-[1.4rem] md:text-[1.55rem] italic font-normal leading-[1.65] max-w-2xl mx-auto mb-8"
                style={{ color: 'rgba(80,55,10,0.85)' }}
              >
                &ldquo;I have realised that nothing I do is truly mine. From now on, everything that happens is only Your doing.&rdquo;
              </p>

              {/* Signature & Gratitude */}
              <div className="pt-6 border-t border-[rgba(180,140,30,0.25)] max-w-md mx-auto text-xs font-mono" style={{ color: 'rgba(120,90,20,0.75)' }}>
                <p className="font-semibold text-sm mb-1 text-ink">With gratitude,</p>
                <p className="font-medium text-xs mb-0">Deepak &amp; Geetha</p>
                <p className="text-[11px] text-muted">Co-Founders, Uncoded Hub · Bengaluru, India</p>
              </div>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Chapter 7: Direct Co-Founder Discovery CTA ───────────────── */}
      <section className="bg-ink text-paper py-20 border-t border-white/10">
        <Shell>
          <Reveal>
            <div className="grid md:grid-cols-12 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-[32px] p-8 sm:p-12">
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <LogoMark className="w-9 h-9 text-signal shrink-0" />
                    <div className="flex items-center -space-x-2">
                      <img
                        src="/deepak.webp"
                        alt="Deepak, Co-Founder"
                        className="w-11 h-11 rounded-full object-cover border-2 border-signal shadow-md"
                        width={44}
                        height={44}
                      />
                      <img
                        src="/geetha.webp"
                        alt="Geetha, Co-Founder"
                        className="w-11 h-11 rounded-full object-cover border-2 border-signal shadow-md"
                        width={44}
                        height={44}
                      />
                    </div>
                    <div>
                      <span className="font-display text-xl text-paper font-medium block">Uncoded Hub</span>
                      <span className="font-mono text-[10px] text-signal uppercase tracking-wider block">Direct Founders</span>
                    </div>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-tight">
                    Come and talk directly with Deepak &amp; Geetha.
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Twenty minutes with the two people who will actually write, design, and code your website. No intermediate account managers, no junior handoffs.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak &amp; Geetha</span>
                  <span>·</span>
                  <span>Direct Delivery</span>
                  <span>·</span>
                  <span>+91 86608 19023</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="label text-signal-bright block mb-2 font-mono text-xs">
                    Co-Founder Discovery
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Let's see if we're the right fit.
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Book a free 20-minute discovery call. If we think a 7-day sprint is the wrong shape for your build, we'll tell you honestly.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleBooking}
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule 20-Minute Call</span>
                    <span>→</span>
                  </button>
                  <Link
                    to="/portfolio/"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors font-mono"
                  >
                    Or explore our 50 live website demos ↗
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
