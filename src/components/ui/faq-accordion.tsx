import { useId, useState } from 'react';
import { Helmet } from 'react-helmet-async';

/* ═══════════════════════════════════════════════════════════════════
   FAQ

   Two things were wrong before this rewrite.

   1. It imported `framer-motion` while the project depends on `motion`.
      It only resolved because framer-motion happened to be present as a
      transitive dependency — one clean install away from a build break.
      There is now no animation library here at all: the expand is a CSS
      grid-template-rows transition, which is smaller, smoother, and
      degrades correctly under prefers-reduced-motion.

   2. The FAQPage JSON-LD lived in index.html and asked entirely
      different questions from the ones rendered on the page. Google
      treats structured data that does not match visible content as a
      violation. The schema is now generated from this same array, so
      the two cannot drift apart again.
   ═══════════════════════════════════════════════════════════════════ */

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: 'Seven days sounds like a shortcut. What is being skipped?',
    a: 'Nothing that ends up in the site — what is skipped is the waiting. In a typical agency project the elapsed time is mostly queue: your project sitting behind four others, waiting on a designer who is on two other accounts, waiting for a weekly status call. We are two people working to a fixed scope with no other meetings, so a week of calendar time is close to a week of actual work. If your project genuinely needs longer, we quote longer.',
  },
  {
    q: 'What do you need from me, and how much of my time will it take?',
    a: 'About three hours in total across the week. A ninety-minute discovery call at the start, then two rounds of feedback — one on the copy on day two, one on the design on day four — each of which takes most clients under an hour. We also need your logo and brand files, and access to your domain registrar. That is the whole ask.',
  },
  {
    q: 'Can I edit the site myself after it launches?',
    a: 'Yes. Content lives in a simple editor you log into, and we record a walkthrough of your specific site — not a generic tutorial — so you can change text, swap images, and add pages without calling us. Structural changes are still worth asking us about, but you are never locked out of your own content.',
  },
  {
    q: 'Who owns the site, the domain, and the hosting?',
    a: 'You do, from day one. We set the domain and hosting up in your name on your own accounts rather than reselling them to you, and you get the code. If you ever move to another studio, nothing in the way we build is designed to make that difficult or expensive.',
  },
  {
    q: 'What happens if I do not like the design?',
    a: 'You see it on day four, with your real copy in it, while there is still time to change direction. Revision rounds are included in every scope. If we are genuinely not converging after those rounds, we would rather refund the deposit and part on good terms than hand over something you are not happy to put your name on.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. We work remotely with clients in India, the UK, the US, the UAE and elsewhere. Calls are booked in your timezone. The only practical constraint is that the discovery call needs to land inside our working day in India, and the booking calendar only offers you slots where that is true.',
  },
  {
    q: 'Will the site actually rank on Google?',
    a: 'We do the technical groundwork that makes ranking possible: fast pages, clean semantic markup, correct titles and descriptions, structured data, an accurate sitemap, and Google Business Profile setup for local search. What we will not do is promise you a position. Anyone who guarantees a ranking is either guessing or selling you something else.',
  },
  {
    q: 'You have no case studies. Why should I trust you?',
    a: 'That is the fair question, and the honest answer is that this website is the argument. It is a real piece of our work you can audit right now — run Lighthouse on it, open it with a keyboard, read the copy and count the empty superlatives. Beyond that, the project is structured so you see the copy and the full design before the balance is due, and the deadline carries a written guarantee. We would rather earn it that way than borrow someone else’s logos.',
  },
];

export const FaqAccordion = () => {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div>
      {/* Generated from FAQS above, so the markup Google reads is always
          exactly what a visitor reads. */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
      </Helmet>

      <dl className="border-t border-rule-strong">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.q} className="border-b border-rule">
              <dt>
                <button
                  id={`${uid}-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-8 text-left group"
                >
                  <span
                    className={`font-display text-title transition-colors ${
                      isOpen ? 'text-signal' : 'text-ink group-hover:text-signal'
                    }`}
                  >
                    {faq.q}
                  </span>
                  {/* A rotating hairline cross: two rules, one of which
                      collapses. Lighter than an icon font and it animates
                      the state rather than swapping glyphs. */}
                  <span
                    aria-hidden="true"
                    className="relative shrink-0 w-4 h-4 mt-2.5 text-muted"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2" />
                    <span
                      className={`absolute inset-y-0 left-1/2 w-px bg-current -translate-x-1/2 origin-center transition-transform duration-300 ${
                        isOpen ? 'scale-y-0' : 'scale-y-100'
                      }`}
                    />
                  </span>
                </button>
              </dt>

              <dd
                id={`${uid}-panel-${i}`}
                role="region"
                aria-labelledby={`${uid}-btn-${i}`}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="text-muted leading-relaxed pb-7 pr-12 max-w-2xl">{faq.a}</p>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};
