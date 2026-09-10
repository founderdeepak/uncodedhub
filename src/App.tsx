import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Routes, Route, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Logo, LogoMark } from './components/Logo';
import SiteFooter from './components/SiteFooter';
/* Deferred: the dock is not part of the first screen, so it should not
   be part of the first download either. */
const EnquiryDock = lazy(() =>
  import('./components/EnquiryDock').then((m) => ({ default: m.EnquiryDock })),
);

/* Home is the one route not code-split. Every other route only pays a
   waterfall (fetch main bundle, then fetch the route chunk) once a
   visitor has already navigated — the JS engine is warm and there is
   no LCP riding on it. Home is where nearly every visitor lands first,
   so splitting it added a second network round-trip in front of the
   hero paragraph that is this site's own LCP element, for content that
   is already inside the initial bundle budget. Bundling it directly
   removes that round-trip for the page it actually matters on. */
import Home from './pages/Home';
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogView = lazy(() => import('./pages/BlogView'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* Paths are unchanged from the previous site so existing links and
   indexed URLs keep working; only the labels are new. /blog is
   deliberately absent — it has no content yet, and a permanently empty
   page linked from every other page is a liability, not an asset. */
const NAV = [
  { label: 'Work', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'Studio', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /* The header sits transparent over the hero and only acquires a
     ground and a hairline once the page has moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  /* Lock the page behind the mobile overlay, and let Escape close it. */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const goToBooking = useCallback(() => {
    navigate('/contact');
    window.requestAnimationFrame(() => {
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ink focus:text-paper focus:px-5 focus:py-3 focus:rounded-[3px]"
      >
        Skip to content
      </a>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-300 ${
          scrolled || menuOpen
            ? 'bg-paper/92 backdrop-blur-[2px] border-b border-rule'
            : 'border-b border-transparent'
        }`}
      >
        <div className="scroll-progress" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-[4.5rem] flex items-center justify-between">
          {/* inline-flex (not the default inline) so this wraps its
              content tightly — an inline <a> carries phantom descender
              space below its content from the surrounding line box,
              which pushed the logo group a few px above true vertical
              centre in the header. */}
          <Link to="/" aria-label="Uncoded Hub — home" className="shrink-0 brand-link inline-flex items-center">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
            {NAV.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-[0.9375rem] link-quiet ${isActive ? 'text-signal' : 'text-ink-soft hover:text-ink'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button onClick={goToBooking} className="btn-primary !px-6 !py-2.5">
              Book a call
            </button>
          </nav>

          <button
            className="md:hidden label text-ink-soft py-2"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* ── Mobile navigation ──────────────────────────────────── */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-0 z-[99] bg-paper md:hidden pt-[4.5rem] flex flex-col"
      >
        <nav aria-label="Mobile" className="flex-1 px-6 pt-10 flex flex-col">
          {NAV.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-display text-[2.5rem] leading-[1.25] py-3 border-b border-rule flex items-baseline gap-5"
            >
              <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </Link>
          ))}
          <button onClick={goToBooking} className="btn-primary w-full mt-10">
            Book a call
          </button>
          <p className="label text-muted mt-auto pb-10 pt-12">
            hello@uncodedhub.com · +91 86608 19023
          </p>
        </nav>
      </div>

      {/* ── Routes ─────────────────────────────────────────────── */}
      <main id="main" className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LogoMark size={28} className="animate-pulse" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home onBook={goToBooking} />} />
            <Route path="/services" element={<Services onBook={goToBooking} />} />
            <Route path="/portfolio" element={<Work onBook={goToBooking} />} />
            <Route path="/about" element={<About onBook={goToBooking} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <SiteFooter />
      <Suspense fallback={null}>
        <EnquiryDock />
      </Suspense>
    </div>
  );
}
