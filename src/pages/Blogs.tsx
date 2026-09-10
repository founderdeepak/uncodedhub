import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';

/* ═══════════════════════════════════════════════════════════════════
   JOURNAL

   This page has no articles yet, and until it does it carries a
   `noindex` and is absent from both the primary navigation and
   sitemap.xml. Previously it was linked from every page and submitted
   to Google while rendering "Updates SOON" — a permanently thin page,
   linked sitewide, is a small ranking liability and a slightly larger
   credibility one.

   It also carried a dead `blogs` array of one placeholder post that was
   never rendered. That has been removed.

   ── PUBLISHING THE FIRST POST ───────────────────────────────────────
   When there is real writing here: remove the noindex below, add
   /blog back to NAV in App.tsx and to public/sitemap.xml, and render
   the list in place of the notice.
   ═══════════════════════════════════════════════════════════════════ */

export default function Blogs() {
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
              building a particular site, and what we would do differently — it will appear here.
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
