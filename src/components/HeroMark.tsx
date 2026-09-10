/* ═══════════════════════════════════════════════════════════════════
   HERO MARK

   The homepage hero was pure typography — a deliberate choice while
   there was nothing honest to show. That trade-off has been revisited:
   this is the brand's own logo artwork at large scale, not a redrawn
   interpretation of it (see Logo.tsx for what was and wasn't done to
   the source file). Two small satellite points sit around it — one
   connected by a single thin line, one deliberately not — so the
   composition reads as loose atmosphere rather than a copy-paste of
   the mark stamped onto the page.

   The rotating ring is a native CSS @keyframes animation, removed
   entirely under prefers-reduced-motion via the global rule in
   index.css. No canvas, no animation library.
   ═══════════════════════════════════════════════════════════════════ */

export function HeroMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className={className}>
      <circle
        cx="230"
        cy="190"
        r="188"
        stroke="var(--color-ink)"
        strokeOpacity="0.08"
        strokeWidth="1"
        className="hero-mark-ring"
        style={{ transformOrigin: '230px 190px' }}
      />

      <line x1="304" y1="146" x2="342" y2="108" stroke="var(--color-ink)" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="342" cy="108" r="4" fill="var(--color-ink)" fillOpacity="0.3" />
      <circle cx="120" cy="320" r="3" fill="var(--color-ink)" fillOpacity="0.2" />

      <image href="/logo-large.webp" x="135" y="95" width="190" height="190" />
    </svg>
  );
}
