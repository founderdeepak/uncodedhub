import { NICHES, type NicheKey } from '../../lib/blog';

/* ═══════════════════════════════════════════════════════════════════
   BLOG THUMBNAIL — no-photography placeholder

   Every article needs a visual on the journal grid and above the body,
   but nothing in the source content includes real photography, and
   generating 70 AI images is blocked on unbilled API keys (see chat).
   This reuses the site's own closing-wordmark motif from SiteFooter.tsx
   — an oversized, low-opacity serif word bleeding off the tile edge —
   so every post has a distinct, on-brand visual today with zero
   photography and zero external dependency. Swap in `post.image` (see
   src/content/blog/README.md) whenever real hero photos exist; this
   component is only ever the fallback.
   ═══════════════════════════════════════════════════════════════════ */

const THUMB: Record<NicheKey, { bg: string; ghost: string; label: string; word: string }> = {
  studio: { bg: 'bg-ink', ghost: 'text-on-ink/[0.16]', label: 'text-signal-bright', word: 'Studio' },
  'coaches-consultants': {
    bg: 'bg-paper-sunk',
    ghost: 'text-ink/[0.09]',
    label: 'text-signal',
    word: 'Coach',
  },
  'dental-clinics': {
    bg: 'bg-signal-wash',
    ghost: 'text-ink/[0.09]',
    label: 'text-signal',
    word: 'Clinic',
  },
  'home-renovation': {
    bg: 'bg-ink-raised',
    ghost: 'text-on-ink/[0.16]',
    label: 'text-signal-bright',
    word: 'Renovate',
  },
  'interior-designers': {
    bg: 'bg-paper-raised',
    ghost: 'text-ink/[0.09]',
    label: 'text-signal',
    word: 'Interior',
  },
  'real-estate': { bg: 'bg-ink-soft', ghost: 'text-on-ink/[0.16]', label: 'text-signal-bright', word: 'Estate' },
  'wedding-photographers': {
    bg: 'bg-paper',
    ghost: 'text-ink/[0.09]',
    label: 'text-signal',
    word: 'Wedding',
  },
};

export default function BlogThumbnail({
  niche,
  size = 'card',
  className = '',
}: {
  niche: NicheKey;
  size?: 'card' | 'hero';
  className?: string;
}) {
  const t = THUMB[niche];
  const ghostSize = size === 'hero' ? 'clamp(3.5rem, 11vw, 9rem)' : 'clamp(2.25rem, 9vw, 4.5rem)';

  return (
    <div
      className={`relative overflow-hidden border border-rule-strong aspect-video ${t.bg} ${className}`}
      aria-hidden="true"
    >
      <span
        className={`font-display absolute -left-1 -bottom-3 select-none whitespace-nowrap ${t.ghost}`}
        style={{ fontSize: ghostSize, lineHeight: 0.8, letterSpacing: '-0.03em' }}
      >
        {t.word}
      </span>
      <span className={`label absolute top-4 left-4 sm:top-5 sm:left-5 ${t.label}`}>{NICHES[niche]}</span>
    </div>
  );
}
