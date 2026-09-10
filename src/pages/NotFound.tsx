import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Reveal, Shell } from '../components/primitives';

/* There was no catch-all route before this. Any mistyped or stale URL
   fell through the Routes block and rendered the header and footer
   around an empty page — which looks exactly like a broken site. */

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found — Uncoded Hub</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="pt-36 md:pt-44 pb-32 min-h-[70vh]">
        <Shell width="narrow">
          <Reveal>
            <p className="label text-signal">404</p>
            <h1 className="font-display text-hero mt-8">
              This page isn't <em className="italic">here.</em>
            </h1>
            <p className="text-lead text-muted mt-10 max-w-xl">
              Either the address is wrong or we moved something and did not redirect it properly.
              If it is the second one, tell us — that is exactly the sort of thing we would fix on
              your site, so we should not be doing it on ours.
            </p>
            <div className="mt-12 pt-8 border-t border-rule grid sm:grid-cols-2 gap-x-8 gap-y-3">
              <Link to="/" className="link-underline text-ink">Homepage →</Link>
              <Link to="/services" className="link-underline text-ink">Services and pricing →</Link>
              <Link to="/portfolio" className="link-underline text-ink">How we work →</Link>
              <Link to="/contact" className="link-underline text-ink">Book a call →</Link>
            </div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
