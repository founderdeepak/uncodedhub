import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell, Section, SectionHead } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   SERVICES

   ── PRICING ─────────────────────────────────────────────────────────
   Making Websites Win is unambiguous that vagueness costs conversions,
   and a services page with no numbers on it is the most common place a
   studio hides. Every scope below has an optional `price` field: fill
   it in and the figure renders in the scope header automatically.

   Leave it empty only for genuinely variable scopes. Do not invent a
   figure you would not honour — a quoted price you walk back on the
   call is worse than no price at all.
   ═══════════════════════════════════════════════════════════════════ */

type Scope = {
  id: string;
  name: string;
  forWho: string;
  timeline: string;
  price?: string;
  includes: string[];
};

const SCOPES: Scope[] = [
  {
    id: '01',
    name: 'Single page',
    forWho:
      'One offer, one audience, one action. Usually the landing page behind an ad campaign, or a first site for a business that does not need five pages pretending it does.',
    timeline: 'Three working days',
    includes: [
      'One page, designed at mobile and desktop widths',
      'Copy written by us from the discovery call, not filled in by you afterwards',
      'Enquiry form wired to your inbox and to a database you own',
      'WhatsApp click-to-chat, if that is how your customers reach you',
      'Analytics installed and a conversion goal configured',
      'On-page SEO groundwork: titles, descriptions, structured data, sitemap',
      'One round of revisions',
    ],
  },
  {
    id: '02',
    name: 'Business website',
    forWho:
      'The default. A business that needs to explain what it does, prove it can be trusted, and take enquiries — which is nearly every business that is not selling online.',
    timeline: 'Seven working days',
    includes: [
      'Up to five pages, each designed rather than filled from a template',
      'Full copy deck written and approved before design begins',
      'Enquiry form and booking flow, both connected to your inbox and a database',
      'Local SEO groundwork, including Google Business Profile setup',
      'Analytics, conversion goals, and a monthly report you can actually read',
      'A recorded walkthrough so you can edit content yourself',
      'Two rounds of revisions and thirty days of post-launch support',
    ],
  },
  {
    id: '03',
    name: 'Online store',
    forWho:
      'Selling physical or digital products directly, with real inventory and real payments. This is the one scope where seven days is not a promise we will make.',
    timeline: 'Two to three weeks, quoted per catalogue',
    includes: [
      'Product catalogue, categories, search, and stock handling',
      'Payments through Razorpay or Stripe, including UPI',
      'Automated order confirmation by email and WhatsApp',
      'Abandoned-cart recovery',
      'Admin training session, recorded, plus written documentation',
      'Thirty days of priority support after launch',
    ],
  },
];

/* Saying plainly what you will not take on is one of the cheapest and
   least-used trust signals available. It also filters the enquiries. */
const NOT_US = [
  ['Mobile apps', 'We build for the web. If you need iOS and Android, we are the wrong studio and will say so on the call.'],
  ['SEO retainers', 'We do the technical groundwork that lets you rank. We do not sell monthly link-building, and we would be suspicious of anyone who does.'],
  ['Paid ads management', 'We will build the landing page your campaign needs and wire up the tracking. Running the campaign is someone else’s job.'],
  ['Rescuing a half-built site', 'Taking over another developer’s unfinished work almost always costs more than starting again, and we would rather tell you that than bill you for it.'],
  ['Twelve-page sites in a week', 'The seven days holds for the scope on this page. Larger builds get a longer, honestly quoted schedule.'],
];

const ONGOING = [
  ['Hosting and domain', 'We set it up in your name, on your account. You own it, and you can leave whenever you like.'],
  ['Care plan', 'Optional. Updates, backups, uptime monitoring, and a set number of content changes each month.'],
  ['Further work', 'Priced per project at the rate you were originally quoted, for as long as you are a client.'],
];

export default function Services({ onBook }: { onBook: () => void }) {
  return (
    <>
      <Helmet>
        <title>Services and Scopes — Uncoded Hub</title>
        <meta
          name="description"
          content="Three scopes, what each one includes in full, what we do not take on, and how pricing works. Fixed price agreed before any work starts."
        />
        <link rel="canonical" href="https://uncodedhub.com/services" />
      </Helmet>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-36 md:pt-44 pb-16">
        <Shell>
          <Reveal>
            <p className="label text-signal">Services</p>
            <h1 className="font-display text-hero mt-8 max-w-[15ch]">
              Three scopes. <em className="italic hero-signal">No surprises.</em>
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead text-muted mt-10 max-w-2xl">
              Below is everything each scope includes, written out rather than summarised into a
              tick list you have to interpret. If what you need is not here, the fourth option is
              a call where we scope it properly.
            </p>
          </Reveal>
        </Shell>
      </section>

      {/* ── Scopes ─────────────────────────────────────────────── */}
      <Section size="default">
        <Shell>
          <div className="border-t border-rule-strong">
            {SCOPES.map((s, i) => (
              <Reveal
                key={s.id}
                delay={i * 80}
                className="grid lg:grid-cols-12 gap-x-12 gap-y-8 py-14 border-b border-rule"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-baseline gap-4">
                    <span className="label text-signal">{s.id}</span>
                    <span className="label text-muted">{s.timeline}</span>
                  </div>
                  <h2 className="font-display text-display mt-6">{s.name}</h2>
                  {s.price && (
                    <p className="font-mono text-[0.9375rem] mt-4">{s.price}</p>
                  )}
                  <p className="text-muted leading-relaxed mt-6 max-w-md">{s.forWho}</p>
                  <button onClick={onBook} className="btn-ghost mt-8">
                    Get a fixed quote
                  </button>
                </div>

                <div className="lg:col-span-7">
                  <span className="label text-muted">Included, in full</span>
                  <ul className="mt-6 border-t border-rule">
                    {s.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-5 py-3.5 border-b border-rule text-[0.9375rem] text-ink-soft leading-relaxed"
                      >
                        <span className="text-signal shrink-0" aria-hidden="true">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── How pricing works ──────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHead
                index="04"
                eyebrow="Pricing"
                inverted
                title="One number, agreed in writing, before anything starts."
              />
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="space-y-8">
                <p className="text-lead text-on-ink">
                  We do not bill by the hour. You are quoted a single figure for the scope, and
                  that figure is what you pay — whether the build takes us four days or nine.
                </p>
                <div className="border-t border-rule-on-ink">
                  {[
                    ['How it is set', 'From the scope agreed on the discovery call: the number of pages, the features, and the integrations. Nothing else moves it.'],
                    ['When it can change', 'Only if you ask for something outside the written scope. We quote the addition separately and you decide before we build it.'],
                    ['How it is paid', 'Half to start, half on the day it goes live. Not before.'],
                    ['What is never added', 'No setup fees, no per-page charges, no licence fees for the work itself, no charge for the revision rounds included in your scope.'],
                  ].map(([k, v]) => (
                    <div key={k} className="py-6 border-b border-rule-on-ink">
                      <span className="label text-signal-bright">{k}</span>
                      <p className="text-on-ink-muted leading-relaxed mt-3">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="text-on-ink-muted leading-relaxed">
                  We do not publish a price list because the honest range across these three
                  scopes is wide enough that a number on a page would mislead you either way. You
                  get a firm figure on the first call, not after three meetings.
                </p>
              </div>
            </Reveal>
          </div>
        </Shell>
      </Section>

      {/* ── What we don't do ───────────────────────────────────── */}
      <Section size="loose">
        <Shell>
          <Reveal>
            <SectionHead
              index="05"
              eyebrow="Out of scope"
              title="What we will turn down."
              intro="A studio that says yes to everything is telling you something about how carefully it says yes."
            />
          </Reveal>
          <div className="mt-20 border-t border-rule-strong">
            {NOT_US.map(([k, v], i) => (
              <Reveal
                key={k}
                delay={i * 60}
                className="grid md:grid-cols-12 gap-x-10 gap-y-2 py-7 border-b border-rule"
              >
                <h3 className="md:col-span-4 text-lead font-medium">{k}</h3>
                <p className="md:col-span-8 text-muted leading-relaxed">{v}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── After launch ───────────────────────────────────────── */}
      <Section tone="sunk">
        <Shell>
          <Reveal>
            <SectionHead index="06" eyebrow="After launch" title="What happens once it is live." />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-rule mt-16 border border-rule">
            {ONGOING.map(([k, v], i) => (
              <Reveal key={k} delay={i * 70} className="bg-paper-raised p-8 card-lift">
                <span className="label text-signal">{k}</span>
                <p className="text-ink-soft leading-relaxed mt-4">{v}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* ── Close ──────────────────────────────────────────────── */}
      <Section tone="ink" size="loose">
        <Shell width="narrow" className="text-center">
          <Reveal>
            <h2 className="font-display text-display">Get the number on the first call.</h2>
            <p className="text-lead text-on-ink-muted mt-8">
              Twenty minutes, no deck. You leave with a scope, a price, and a date — or with an
              honest reason why we are not the right studio for it.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <button onClick={onBook} className="btn-primary-inv">
                Book a 20-minute call
              </button>
              <Link to="/portfolio" className="btn-ghost-inv">
                See how we prove it
              </Link>
            </div>
          </Reveal>
        </Shell>
      </Section>
    </>
  );
}
