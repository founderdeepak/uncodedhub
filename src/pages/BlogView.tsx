import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   ARTICLE

   This route previously rendered a complete dummy article — "Using AI
   within a Workflow", with a fabricated author byline, a fabricated
   date, and a twenty-entry table of contents — for *any* slug anyone
   typed. It was placeholder scaffolding that shipped to production.

   With no articles published, the honest behaviour is to say so.

   ── RENDERING REAL ARTICLES ─────────────────────────────────────────
   Add a posts source, look the slug up here, and render the article
   when it resolves. Keep this branch for slugs that do not.
   ═══════════════════════════════════════════════════════════════════ */

export default function BlogView() {
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
              We have not published anything yet, so any link you followed to get here was
              pointing at nothing. Sorry about that.
            </p>
            <div className="mt-12 pt-8 border-t border-rule flex flex-wrap gap-x-8 gap-y-3">
              <Link to="/" className="link-underline text-ink">
                Back to the homepage →
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
