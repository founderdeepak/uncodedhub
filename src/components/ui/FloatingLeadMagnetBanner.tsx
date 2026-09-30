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
      className={`fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-6 z-[85] w-[calc(100vw-2rem)] md:w-auto md:min-w-[34rem] md:max-w-[40rem] print:hidden transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-ink/95 text-paper border border-white/20 rounded-full shadow-[0_24px_50px_-10px_rgba(0,0,0,0.45)] backdrop-blur-lg flex items-center gap-3 pl-4 sm:pl-5 pr-2 py-2">
        <span className="w-2 h-2 rounded-full bg-signal animate-pulse shrink-0" aria-hidden="true" />

        <button
          type="button"
          onClick={goToLeadMagnet}
          className="flex-1 text-left min-w-0 pr-1 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-signal-bright font-semibold">
              Free audit
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">·</span>
            <span className="text-[11px] text-on-ink-muted hidden sm:inline">Takes 60 seconds</span>
          </div>
          <span className="block text-xs sm:text-[13px] font-medium text-paper truncate leading-snug">
            Score your site before you book a call.
          </span>
        </button>

        <button
          type="button"
          onClick={goToLeadMagnet}
          className="bg-signal hover:bg-signal-bright text-paper font-sans font-medium text-xs py-2 px-4 rounded-full transition-colors shrink-0 shadow-sm cursor-pointer flex items-center gap-1"
        >
          <span>Get Audit</span>
          <span className="hidden sm:inline">→</span>
        </button>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer ml-0.5"
        >
          <IconClose className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
