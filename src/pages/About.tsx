import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section } from '../components/primitives';
import { LogoMark } from '../components/Logo';

/* ═══════════════════════════════════════════════════════════════════
   STUDIO (ABOUT)
   Cloaked-inspired design:
   - High-contrast editorial hero with announcement badge
   - Rounded squircle founder cards (rounded-[28px])
   - Cinematic dark chapter: "Who Does What" (Deepak & Geetha)
   - 4 Commitments in squircle bento blocks
   - Colophon & dual-card closing CTA module
   ═══════════════════════════════════════════════════════════════════ */

const COMMITMENTS = [
  {
    n: '01',
    h: 'We will tell you when you do not need us',
    p: 'If a one-page site does what a five-page site would have done, we will quote the one-page site. We would rather have the smaller invoice and the glowing reference than the larger invoice and a client who worked out later that they overbought.',
    badge: 'Honest Scoping',
  },
  {
    n: '02',
    h: 'The people on the call are the people doing the work',
    p: 'There is no hidden junior team behind us that you have not met. Two founders, both on every project. This limits how much work we can take, and we would rather be the studio that is booked out than the one that quietly subcontracts.',
    badge: 'Senior Delivery',
  },
  {
    n: '03',
    h: 'You own everything, including the exit',
    p: 'The domain, the hosting account, the code, the content. Set up in your own name from day one. If you want to move to another studio in a year, nothing here is designed to make that expensive or difficult.',
    badge: 'Total Freedom',
  },
  {
    n: '04',
    h: 'We will not invent numbers to sell you',
    p: 'No borrowed logos, no case studies from clients we never had, no conversion percentages we cannot produce an analytics screenshot for. This is a low bar, and a surprising number of agencies do not clear it.',
    badge: 'Verified Truth',
  },
];

export default function About({ onBook }: { onBook: () => void }) {
  return (
    <>
      <Helmet>
        <title>Studio — Uncoded Hub</title>
        <meta
          name="description"
          content="A two-person web design and development studio in Bengaluru. Who does the work, how we work, and what we commit to before you hire us."
        />
        <link rel="canonical" href="https://uncodedhub.com/about/" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-10 md:pt-16 pb-14">
        <Shell>
          <Reveal>
            <span className="label text-signal font-semibold block mb-3">
              The studio · Deepak &amp; Geetha
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink max-w-[17ch] leading-[1.08] tracking-tight">
              Two people, one week at a time, in{' '}
              <em className="italic hero-signal font-medium">Bengaluru.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-6 max-w-2xl leading-relaxed">
              Uncoded Hub is a brother and sister who got tired of watching competent, high-quality businesses
              lose work to worse competitors simply because the competitor had a faster, clearer website.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Origin / Why this exists ────────────────────────────── */}
      <Section size="default">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Dual Founder Squircle Cards */}
            <Reveal className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[24px] overflow-hidden border border-rule-strong bg-paper-raised shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/deepak-mobile.webp" />
                    <img
                      src="/deepak.webp"
                      alt="Deepak, co-founder"
                      width={540}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="photo-hover w-full h-full object-cover grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule bg-paper">
                    <strong className="text-xs text-ink block font-sans">Deepak</strong>
                    <span className="text-[10px] text-muted font-mono">Engineering</span>
                  </div>
                </div>

                <div className="rounded-[24px] overflow-hidden border border-rule-strong bg-paper-raised shadow-sm">
                  <picture className="w-full aspect-[3/4] block">
                    <source media="(max-width: 767px)" srcSet="/geetha-mobile.webp" />
                    <img
                      src="/geetha.webp"
                      alt="Geetha, co-founder"
                      width={700}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      className="photo-hover w-full h-full object-cover object-top grayscale"
                    />
                  </picture>
                  <div className="p-3 text-center border-t border-rule bg-paper">
                    <strong className="text-xs text-ink block font-sans">Geetha</strong>
                    <span className="text-[10px] text-muted font-mono">Design & Copy</span>
                  </div>
                </div>
              </div>
              <p className="label text-muted mt-4 text-center">Deepak &amp; Geetha · Working Remotely Worldwide</p>
            </Reveal>

            {/* Right: Narrative */}
            <Reveal delay={100} className="lg:col-span-7">
              <span className="label text-signal font-semibold block mb-2.5">
                The origin
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink font-normal tracking-tight mb-6">
                The same failure, over and over.
              </h2>
              <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                <p>
                  The pattern was always identical. A business that genuinely knew what it was doing —
                  a clinic, an architecture firm, a renovation contractor with twenty years behind it —
                  losing high-ticket enquiries to a younger competitor. Not because the competitor was
                  better. Because their site loaded in one second and clearly stated what they did in the first sentence.
                </p>
                <p>
                  A proper website from a traditional agency took three months and cost more than most
                  businesses could justify. So they bought a bloated WordPress template and let it rot.
                </p>
                <p>
                  We built Uncoded Hub to eliminate that trade-off: agency-grade design and engineering,
                  delivered in seven working days at a transparent, fixed price.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── Founder Bios: Evidence-Led ───────────────────────────── */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden border-y border-white/10">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/3 w-96 h-96 bg-signal/15 rounded-full blur-[100px] pointer-events-none"
        />

        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="label text-signal-bright block mb-3">
                Who does the work
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-paper font-normal leading-tight">
                The people you meet are the{' '}
                <em className="text-signal-bright italic font-medium">people who build.</em>
              </h2>
            </div>
          </Reveal>

          {/* Geetha */}
          <Reveal>
            <div className="mb-10 p-8 sm:p-10 rounded-[28px] bg-white/[0.04] backdrop-blur-md border border-white/10">
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright mb-4">
                    Co-founder · Design
                  </span>
                  <h3 className="font-display text-3xl text-paper font-medium mb-1">Geetha</h3>
                  <p className="text-[11px] font-mono text-white/50 mb-6 tracking-wide uppercase">
                    2.5 yrs McKinsey &amp; Co. · 15,000+ slides · 550+ decks · Senior leaders &amp; global teams
                  </p>
                  <div className="space-y-3 text-on-ink-muted text-xs sm:text-sm leading-relaxed">
                    <p>
                      Before Uncoded Hub, Geetha spent 2.5 years as a Business Presentation Specialist at McKinsey &amp; Company — designing more than 15,000 slides and 550+ decks for senior leaders and global teams. The job was never to make information look good. It was to take something complicated, find what mattered, and make it clear enough that someone could understand it, trust it, and act on it.
                    </p>
                    <p>
                      She brings that discipline to every client website. Today she designs for businesses where trust matters before the first conversation — interior designers, architects, clinics, photographers, renovation studios, and other high-consideration service businesses.
                    </p>
                    <p>
                      Her focus: <strong className="text-paper">make the quality of the business impossible to miss online.</strong> Every page has a job. Every section has a reason to exist.
                    </p>
                    <p className="text-paper/70 italic text-xs border-t border-white/10 pt-4 mt-2">
                      2.5 years at McKinsey. 550+ decks. 15,000+ slides. Now designing websites that make service businesses look as credible online as they are in person.
                    </p>
                  </div>
                </div>
                {/* Geetha stat cards */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 content-start">
                  <div className="bg-white/[0.06] border border-white/10 rounded-[18px] p-5 text-center">
                    <span className="font-display text-3xl text-signal-bright font-semibold">2.5</span>
                    <span className="font-display text-xl text-signal-bright font-semibold"> yrs</span>
                    <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-wide">McKinsey &amp; Co.</p>
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-[18px] p-5 text-center">
                    <span className="font-display text-3xl text-signal-bright font-semibold">15,000+</span>
                    <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-wide">Slides designed</p>
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-[18px] p-5 text-center col-span-2 md:col-span-1">
                    <span className="font-display text-3xl text-signal-bright font-semibold">550+</span>
                    <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-wide">Decks delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Deepak */}
          <Reveal delay={100}>
            <div className="mb-16 p-8 sm:p-10 rounded-[28px] bg-white/[0.04] backdrop-blur-md border border-white/10">
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-[6px] bg-signal/20 text-signal-bright mb-4">
                    Co-founder · Engineering
                  </span>
                  <h3 className="font-display text-3xl text-paper font-medium mb-1">Deepak</h3>
                  <p className="text-[11px] font-mono text-white/50 mb-6 tracking-wide uppercase">
                    7.2+ yrs · 17,000+ lines of code · Games · Apps · Web · WebGL · AR/VR
                  </p>
                  <div className="space-y-3 text-on-ink-muted text-xs sm:text-sm leading-relaxed">
                    <p>
                      Deepak has spent 7.2+ years building software across very different problems — from games and mobile apps to websites, WebGL, AR/VR and multiplayer projects — writing more than 17,000 lines of code across C, C++, C#, Swift, Java, HTML, CSS and JavaScript.
                    </p>
                    <p>
                      For him, the code has never been the finished product. The finished product is something that works — properly structured, tested, fixed, and delivered to the point where someone can actually use it.
                    </p>
                    <p>
                      Alongside engineering, he has worked across SEO, AEO, AIEO, content, copywriting and business development, and coordinated teams of 20+ people as a Project Coordinator — giving him a broader view of how a website needs to perform beyond the code.
                    </p>
                    <p>
                      At Uncoded Hub, that all comes together in one role: <strong className="text-paper">turning Geetha's designs and the client's requirements into a website that works as hard as it looks.</strong>
                    </p>
                    <p className="text-paper/70 italic text-xs border-t border-white/10 pt-4 mt-2">
                      7.2+ years building software. 17,000+ lines of code. Games, apps, web, WebGL and AR/VR. Now building fast, reliable websites that turn clear design into a working business tool.
                    </p>
                  </div>
                </div>
                {/* Deepak stat cards */}
                <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 content-start">
                  <div className="bg-white/[0.06] border border-white/10 rounded-[18px] p-5 text-center">
                    <span className="font-display text-3xl text-signal-bright font-semibold">7.2+</span>
                    <span className="font-display text-lg text-signal-bright font-semibold"> yrs</span>
                    <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-wide">In software</p>
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-[18px] p-5 text-center">
                    <span className="font-display text-3xl text-signal-bright font-semibold">17k+</span>
                    <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-wide">Lines of code</p>
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-[18px] p-5 text-center col-span-2 md:col-span-1">
                    <span className="font-display text-3xl text-signal-bright font-semibold">20+</span>
                    <p className="text-[10px] text-white/50 mt-1 font-mono uppercase tracking-wide">People coordinated</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={150}>
            <div className="text-center border-t border-white/10 pt-12">
              <p className="font-display text-2xl sm:text-3xl text-paper font-normal leading-snug max-w-2xl mx-auto">
                She makes it clear.{' '}
                <em className="text-signal-bright italic">He makes it work.</em>
                <br />
                Together, they build the whole thing.
              </p>
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* ── Commitments Bento Cards ──────────────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="label text-signal font-semibold block mb-2.5">
                Contractual truth
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
                Four commitments we hold to.
              </h2>
              <p className="text-muted text-base max-w-xl mx-auto mt-4">
                Not empty values. Values are free. These are the commitments that hold us accountable.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.n} delay={i * 70}>
                <div className="bg-paper-raised p-8 rounded-[24px] border border-rule-strong shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <span className="card-tag mb-4">
                      {c.badge}
                    </span>
                    <h3 className="font-display text-2xl text-ink font-medium mb-3">{c.h}</h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{c.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* -- Colophon: Divine Golden (Light) -- */}
      <section className="relative overflow-hidden py-28 md:py-36">
        {/* Warm cream/parchment base */}
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fdf8ee 0%, #faf3e0 50%, #fdf8ee 100%)' }} />
        {/* Subtle warm centre glow */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 72%)' }} />
        {/* Top border */}
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(180,140,30,0.4) 50%, transparent 100%)' }} />
        {/* Bottom border */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(180,140,30,0.3) 50%, transparent 100%)' }} />

        <Shell width="narrow">
          <Reveal>
            <div className="relative text-center">

              {/* Label */}
              <span className="inline-block text-[10px] font-mono font-semibold tracking-[0.22em] uppercase mb-10" style={{ color: 'rgba(160,110,20,0.7)' }}>
                Colophon &nbsp;&middot;&nbsp; Our Belief
              </span>

              {/* Ornament */}
              <div className="flex items-center justify-center mb-10" aria-hidden="true">
                <svg width="240" height="52" viewBox="0 0 240 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="26" x2="88" y2="26" stroke="url(#colL)" strokeWidth="0.75"/>
                  <line x1="152" y1="26" x2="240" y2="26" stroke="url(#colR)" strokeWidth="0.75"/>
                  <polygon points="120,10 134,26 120,42 106,26" fill="none" stroke="rgba(180,140,30,0.6)" strokeWidth="1"/>
                  <polygon points="120,17 128,26 120,35 112,26" fill="rgba(212,175,55,0.12)"/>
                  <circle cx="120" cy="26" r="2.5" fill="rgba(160,110,20,0.8)"/>
                  <circle cx="96" cy="26" r="1.5" fill="rgba(180,140,30,0.4)"/>
                  <circle cx="144" cy="26" r="1.5" fill="rgba(180,140,30,0.4)"/>
                  <defs>
                    <linearGradient id="colL" x1="0" y1="0" x2="88" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(180,140,30,0)"/>
                      <stop offset="100%" stopColor="rgba(180,140,30,0.5)"/>
                    </linearGradient>
                    <linearGradient id="colR" x1="152" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(180,140,30,0.5)"/>
                      <stop offset="100%" stopColor="rgba(180,140,30,0)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Tamil verse — deep antique gold on light (reduced 20% to match English) */}
              <p
                className="font-display text-[1.2rem] sm:text-[1.5rem] md:text-[1.68rem] font-normal leading-[1.65] max-w-2xl mx-auto mb-8"
                style={{
                  background: 'linear-gradient(135deg, #7a5a10 0%, #b8902a 35%, #9a7220 65%, #5c4010 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {'என் செயலாவது யாதொன்றும் இல்லை — இனித் தெய்வமே உன்செயலே என்று உணரப் பெற்றேன்'}
              </p>

              {/* Gold dot rule */}
              <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,140,30,0.5))' }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(160,110,20,0.7)' }} />
                <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(180,140,30,0.5), transparent)' }} />
              </div>

              {/* English translation — matched in size and typographic dignity with the Tamil verse */}
              <p
                className="font-display text-[1.2rem] sm:text-[1.5rem] md:text-[1.68rem] italic font-normal leading-[1.65] max-w-2xl mx-auto mb-8"
                style={{ color: 'rgba(80,55,10,0.85)' }}
              >
                &ldquo;I have realised that nothing I do is truly mine. From now on, O God &mdash;
                everything that happens is only Your doing.&rdquo;
              </p>

              {/* Gratitude */}
              <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(120,90,20,0.65)' }}>
                We are grateful for the work, and we strive to be worthy of it on every project.
              </p>

            </div>
          </Reveal>
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
                    Come and ask us anything.<br />
                    <span className="text-signal-bright italic">Direct conversation with Deepak & Geetha.</span>
                  </h3>
                  <p className="text-on-ink-muted text-sm leading-relaxed mt-4 max-w-md">
                    Twenty minutes with the two people who will write, design, and code your website. No intermediate account managers.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 text-xs font-mono text-on-ink-muted">
                  <span>● Deepak & Geetha</span>
                  <span>·</span>
                  <span>Direct delivery</span>
                </div>
              </div>

              <div className="md:col-span-6 bg-white/[0.05] p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="label text-signal-bright block mb-2">
                    Co-founder discovery
                  </span>
                  <h4 className="font-display text-2xl text-paper font-medium mb-3">
                    Let's see if we're the right fit.
                  </h4>
                  <p className="text-on-ink-muted text-xs leading-relaxed mb-6">
                    Book a free discovery call. If we think a week is the wrong shape for your build, that's where we say so.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onBook}
                    className="w-full bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-sm py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Schedule 20-Minute Call</span>
                    <span>→</span>
                  </button>
                  <Link
                    to="/portfolio"
                    className="w-full block text-center text-xs text-on-ink-muted hover:text-paper py-2 transition-colors"
                  >
                    Or explore our 6 interactive demos
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
