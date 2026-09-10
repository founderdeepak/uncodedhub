import { useEffect, useRef, useState } from 'react';
import { IconClose } from '../Glyphs';

/* ═══════════════════════════════════════════════════════════════════
   FLOATING LEAD MAGNET BANNER

   Appears once the visitor has scrolled 70% of the way through the
   hero section (#hero) — past the headline and CTA, so it never
   competes with the primary "Schedule my FREE 20-minute call" button
   for attention on first paint. Clicking it smooth-scrolls to the
   lead magnet section (#lead-magnet) rather than duplicating that
   section's form here.

   Hides itself again once the lead magnet section is actually in
   view (no point pointing at something already on screen), and stays
   dismissed for the rest of the browser session once closed.

   Positioned at bottom-24 rather than bottom-5/6 to clear the
   EnquiryDock, which already occupies the bottom-right corner
   (fixed bottom-5 right-5, z-[90]) on every page.
   ═══════════════════════════════════════════════════════════════════ */

const DISMISS_KEY = 'leadMagnetBannerDismissed';

export function FloatingLeadMagnetBanner() {
  const [visible, setVisible] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    dismissedRef.current = sessionStorage.getItem(DISMISS_KEY) === '1';

    const hero = document.getElementById('hero');
    const leadMagnet = document.getElementById('lead-magnet');
    if (!hero) return;

    let ticking = false;

    const evaluate = () => {
      ticking = false;
      if (dismissedRef.current) {
        setVisible(false);
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const scrolledPastHero = heroRect.top <= -0.7 * heroRect.height;

      const leadMagnetInView = leadMagnet
        ? leadMagnet.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(scrolledPastHero && !leadMagnetInView);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const dismiss = () => {
    dismissedRef.current = true;
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  const goToLeadMagnet = () => {
    document.getElementById('lead-magnet')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      role="complementary"
      aria-label="Free website audit"
      className={`fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-6 z-[85] w-[calc(100vw-2.5rem)] md:w-[32rem] print:hidden transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <div className="bg-paper-raised border border-rule-strong rounded-[3px] shadow-[0_18px_50px_-12px_rgba(20,19,15,0.32)] flex items-center gap-4 pl-5 pr-3 py-3">
        <button
          type="button"
          onClick={goToLeadMagnet}
          className="flex-1 text-left min-w-0"
        >
          <span className="label text-signal">Free · 10-point audit</span>
          <span className="block text-[0.8125rem] md:text-[0.9375rem] font-medium text-ink mt-0.5 leading-snug">
            Not ready to book a call? Score your site first.
          </span>
        </button>

        <button
          type="button"
          onClick={goToLeadMagnet}
          className="btn-primary !px-4 !py-2.5 !text-[0.8125rem] shrink-0"
        >
          Get it free →
        </button>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 text-muted hover:text-ink transition-colors p-1"
        >
          <IconClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
