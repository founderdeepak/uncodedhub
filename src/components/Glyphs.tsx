/* ═══════════════════════════════════════════════════════════════════
   GLYPHS

   Single-stroke icons, drawn from the same construction as the logo
   mark: 24×24, currentColor, no fill except where a glyph specifically
   needs a solid dot. These are sized as real focal elements here (used
   inside process nodes and stat cards), not small accents — the
   default size is set by each call site.
   ═══════════════════════════════════════════════════════════════════ */

const base = { viewBox: '0 0 24 24', fill: 'none' as const };
const s = { stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function IconCompass({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" {...s} />
      <path d="M15.2 8.8l-4.6 1.6-1.6 4.6 4.6-1.6 1.6-4.6Z" {...s} />
    </svg>
  );
}

export function IconDocument({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5.5" y="3.5" width="13" height="17" {...s} />
      <line x1="8.5" y1="8.5" x2="15.5" y2="8.5" {...s} />
      <line x1="8.5" y1="12" x2="15.5" y2="12" {...s} />
      <line x1="8.5" y1="15.5" x2="12.5" y2="15.5" {...s} />
    </svg>
  );
}

export function IconFrame({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="15" {...s} />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" {...s} />
      <line x1="9" y1="9.5" x2="9" y2="19.5" {...s} />
    </svg>
  );
}

export function IconBrackets({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 4.5 3.5 12 9 19.5" {...s} />
      <path d="M15 4.5 20.5 12 15 19.5" {...s} />
    </svg>
  );
}

export function IconLaunch({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.5v16" {...s} />
      <path d="M12 3.5l5 6M12 3.5l-5 6" {...s} />
      <path d="M6.5 20.5h11" {...s} />
    </svg>
  );
}

export function IconTimer({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="13" r="8" {...s} />
      <path d="M12 13V8.2" {...s} />
      <path d="M9 2.5h6" {...s} />
    </svg>
  );
}

export function IconGauge({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3.5 16a8.5 8.5 0 1 1 17 0" {...s} />
      <path d="M12 16l4-5" {...s} />
      <circle cx="12" cy="16" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconLayers({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4.5" y="4.5" width="10.5" height="10.5" {...s} />
      <rect x="9" y="9" width="10.5" height="10.5" {...s} />
    </svg>
  );
}

export function IconContrast({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" {...s} />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconKeyboard({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="6.5" width="18" height="11" {...s} />
      <line x1="7" y1="10.5" x2="7.01" y2="10.5" {...s} strokeWidth="2.2" />
      <line x1="10.5" y1="10.5" x2="10.51" y2="10.5" {...s} strokeWidth="2.2" />
      <line x1="14" y1="10.5" x2="14.01" y2="10.5" {...s} strokeWidth="2.2" />
      <line x1="17.5" y1="10.5" x2="17.51" y2="10.5" {...s} strokeWidth="2.2" />
      <line x1="7" y1="14" x2="17.5" y2="14" {...s} />
    </svg>
  );
}

export function IconCode({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M8.5 5.5 3.5 12l5 6.5" {...s} />
      <path d="M15.5 5.5l5 6.5-5 6.5" {...s} />
      <line x1="13.2" y1="3.7" x2="10.8" y2="20.3" {...s} />
    </svg>
  );
}

export function IconClose({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" {...s} />
      <line x1="18" y1="6" x2="6" y2="18" {...s} />
    </svg>
  );
}
