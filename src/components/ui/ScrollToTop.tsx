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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 350);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Circumference of 40px diameter circle (r = 18px): 2 * pi * 18 ≈ 113.1
  const circumference = 113.1;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll back to top"
      title="Back to top"
      className={`fixed bottom-6 left-6 z-[80] print:hidden
        group w-12 h-12 rounded-full
        bg-ink text-paper
        shadow-[0_8px_24px_rgba(0,0,0,0.28)] hover:shadow-[0_8px_28px_rgba(199,7,75,0.45)]
        flex items-center justify-center
        transition-all duration-300 ease-out cursor-pointer hover:scale-105
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {/* Outer Raspberry Ring with Progress */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        {/* Subtle static raspberry track */}
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="currentColor"
          className="text-signal/25"
          strokeWidth="2.5"
        />
        {/* Active raspberry outer ring fill */}
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="#c7074b"
          className="text-signal"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: 'stroke-dashoffset 150ms ease-out',
          }}
        />
      </svg>

      {/* Upward Chevron Icon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="text-paper group-hover:-translate-y-0.5 transition-transform duration-200 relative z-10"
      >
        <path
          d="M7 12V2M2.5 6.5L7 2L11.5 6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
