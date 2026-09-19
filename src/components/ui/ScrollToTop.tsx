import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   SCROLL TO TOP BUTTON

   Appears once the visitor has scrolled past the hero section
   (roughly 400px — enough to confirm they've committed to reading).
   Clicking it smooth-scrolls back to the very top of the page.

   Positioned above the EnquiryDock (z-[90]) and the floating lead
   magnet banner (z-[85]) — uses z-[80] so it doesn't obscure those
   controls, but stays above normal page content.

   Lives in App.tsx so it renders on every page (homepage, services,
   about, contact, blog, all blog articles, 404).
   ═══════════════════════════════════════════════════════════════════ */

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll back to top"
      className={`fixed bottom-6 left-6 z-[80] print:hidden
        w-10 h-10 rounded-full
        bg-paper border border-rule-strong shadow-[0_4px_16px_rgba(20,19,15,0.14)]
        flex items-center justify-center
        text-ink-soft hover:text-ink hover:border-ink hover:shadow-[0_6px_20px_rgba(20,19,15,0.2)]
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}
      `}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 12V2M2.5 6.5L7 2L11.5 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
