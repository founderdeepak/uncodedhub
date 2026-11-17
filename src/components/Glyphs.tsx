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

export function IconQuill({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M19 3C10 3 6 9 6 15c0 2 1 4 3 5l1-3c-1-1-1-2-1-3 0-4 3-8 8-9l2-2Z" {...s} />
      <path d="M6 15l-3 6 6-3" {...s} />
    </svg>
  );
}

export function IconBolt({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" {...s} />
    </svg>
  );
}

export function IconChat({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M20 14a4 4 0 0 1-4 4H7.5L3 21V6a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v8Z" {...s} />
    </svg>
  );
}

export function IconCalendar({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" {...s} />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" {...s} />
      <line x1="8" y1="2.5" x2="8" y2="5.5" {...s} />
      <line x1="16" y1="2.5" x2="16" y2="5.5" {...s} />
    </svg>
  );
}

export function IconDeviceMobile({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" {...s} />
      <line x1="10.5" y1="18" x2="13.5" y2="18" {...s} />
    </svg>
  );
}

export function IconLayoutGrid({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" {...s} />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1" {...s} />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1" {...s} />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1" {...s} />
    </svg>
  );
}

export function IconEye({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M2.5 12c2.5-5 6-7.5 9.5-7.5s7 2.5 9.5 7.5c-2.5 5-6 7.5-9.5 7.5S5 17 2.5 12Z" {...s} />
      <circle cx="12" cy="12" r="3" {...s} />
    </svg>
  );
}

export function IconHierarchy({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="8.5" y="2.5" width="7" height="5" rx="1" {...s} />
      <rect x="2.5" y="16.5" width="7" height="5" rx="1" {...s} />
      <rect x="14.5" y="16.5" width="7" height="5" rx="1" {...s} />
      <path d="M12 7.5v4.5M6 16.5v-2a2.5 2.5 0 0 1 2.5-2.5h7a2.5 2.5 0 0 1 2.5 2.5v2" {...s} />
    </svg>
  );
}

export function IconFunnel({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <polygon points="3.5 4.5 20.5 4.5 14 12.5 14 19.5 10 21.5 10 12.5 3.5 4.5" {...s} />
    </svg>
  );
}

export function IconMapPin({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 21.5s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" {...s} />
      <circle cx="12" cy="9.5" r="2.5" {...s} />
    </svg>
  );
}

export function IconGlobe({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...s} />
      <line x1="3" y1="12" x2="21" y2="12" {...s} />
      <path d="M12 3a14.5 14.5 0 0 1 4 9 14.5 14.5 0 0 1-4 9 14.5 14.5 0 0 1-4-9 14.5 14.5 0 0 1 4-9Z" {...s} />
    </svg>
  );
}

export function IconSearch({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7.5" {...s} />
      <line x1="16.5" y1="16.5" x2="21" y2="21" {...s} />
    </svg>
  );
}

export function IconDeviceDesktop({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" {...s} />
      <line x1="8" y1="20.5" x2="16" y2="20.5" {...s} />
      <line x1="12" y1="16.5" x2="12" y2="20.5" {...s} />
    </svg>
  );
}

export function IconDeviceTablet({ className = '' }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" {...s} />
      <line x1="11" y1="18.5" x2="13" y2="18.5" {...s} />
    </svg>
  );
}
