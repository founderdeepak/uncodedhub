import React, { useLayoutEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   Layout and editorial primitives.

   Every page is assembled from these, which is what keeps the grammar
   consistent: the same numbered section headers, the same measure, the
   same hairlines. Previously each page invented its own spacing and
   heading sizes, and that inconsistency is a large part of why the site
   read as machine-assembled.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Reveal ──────────────────────────────────────────────────────────
   A single IntersectionObserver replaces GSAP + ScrollTrigger (~120 KB)
   for the one motion idiom this design uses. Fires once, then detaches.

   Real Lighthouse data on this project caught a defect in the earlier
   version: every Reveal started at opacity 0 unconditionally, including
   content already inside the first viewport on load — the hero
   paragraph, in particular, was Largest Contentful Paint, and it was
   sitting invisible until React hydrated, ran this effect, and an
   IntersectionObserver callback fired asynchronously. That chain,
   amplified by Lighthouse's mobile CPU throttling, was measured at 5.9s
   of render delay — 92% of the total LCP time — for one paragraph of
   text with nothing to download.

   The fix: check synchronously, in useLayoutEffect (which runs before
   the browser's first paint, unlike useEffect), whether the element is
   already within the viewport. If it is, it renders visible from frame
   one — no animation, no JS dependency, nothing for LCP to wait on. The
   IntersectionObserver still does its job for anything genuinely below
   the fold, where a scroll-triggered fade is the actual point. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
    if (alreadyVisible) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ ...style, ...(shown && delay ? { transitionDelay: `${delay}ms` } : undefined) }}
    >
      {children}
    </Tag>
  );
}

/* ── Shell ───────────────────────────────────────────────────────────
   One max width, one gutter, everywhere. */
export function Shell({
  children,
  className = '',
  width = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'narrow' | 'wide';
}) {
  const max =
    width === 'narrow' ? 'max-w-3xl' : width === 'wide' ? 'max-w-[100rem]' : 'max-w-6xl';
  return <div className={`${max} mx-auto px-6 md:px-10 ${className}`}>{children}</div>;
}

/* ── Section header ──────────────────────────────────────────────────
   Numbered, rule-topped, mono eyebrow above a serif title. This is the
   recurring editorial device that gives the site its rhythm. */
export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  inverted = false,
  align = 'left',
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  inverted?: boolean;
  align?: 'left' | 'center';
}) {
  const muted = inverted ? 'text-on-ink-muted' : 'text-muted';
  const rule = inverted ? 'border-rule-on-ink' : 'border-rule';
  /* The signal vermillion clears AA on paper but only reaches ~3.4:1 on
     ink, so dark sections use the lighter tint of the same hue. */
  const accent = inverted ? 'text-signal-bright' : 'text-signal';
  const centered = align === 'center';

  return (
    <div className={centered ? 'text-center' : ''}>
      <div className={`flex items-baseline gap-4 border-t ${rule} pt-4 ${centered ? 'justify-center' : ''}`}>
        <span className={`label ${muted}`}>{index}</span>
        <span className={`label ${accent}`}>{eyebrow}</span>
      </div>
      <h2
        className={`font-display text-display mt-8 ${centered ? 'mx-auto max-w-4xl' : 'max-w-3xl'}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`text-lead ${muted} mt-6 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────
   Deliberately varied vertical rhythm. Uniform padding on every section
   is what flattens a page into a list of equally-important boxes. */
export function Section({
  children,
  id,
  tone = 'paper',
  size = 'default',
  className = '',
}: {
  children: React.ReactNode;
  id?: string;
  tone?: 'paper' | 'sunk' | 'ink';
  size?: 'tight' | 'default' | 'loose';
  className?: string;
}) {
  const pad =
    size === 'tight' ? 'py-14 md:py-16' : size === 'loose' ? 'py-20 md:py-28' : 'py-16 md:py-24';
  const bg =
    tone === 'ink' ? 'on-ink' : tone === 'sunk' ? 'bg-paper-sunk' : 'bg-paper';

  return (
    <section id={id} className={`${bg} ${pad} ${className}`}>
      {children}
    </section>
  );
}
