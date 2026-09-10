/* ═══════════════════════════════════════════════════════════════════
   The mark.

   This is the brand's own artwork — "Only Logo Uncodedhub.png" — used
   as supplied, not redrawn. The only processing done to it: the flat
   cream backdrop it shipped with has been keyed out to real
   transparency (public/logo-*.png), since a solid-colour square behind
   the mark would show as a visible box on both the paper and ink
   grounds this site uses. Nothing about the mark's shape, line work,
   node positions, or gradient was touched — same pixels, just isolated
   from their background and re-exported at a few sizes so a 1.3 MB
   source file isn't shipped to render a header-sized icon.
   ═══════════════════════════════════════════════════════════════════ */

export function LogoMark({
  size = 44,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/logo-medium.webp"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={52} />
      <span className="font-display text-[1.375rem] leading-none tracking-[-0.01em]">
        Uncoded Hub
      </span>
    </span>
  );
}
