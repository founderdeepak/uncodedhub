import './index.css';

const container = document.getElementById('root')!;

/* Every route is prerendered to static HTML at build time
   (scripts/prerender.mjs), so #root already has markup when a real
   visitor's browser parses this file. Loading the React runtime on first
   interaction keeps initial TBT and unused-JS at 0 during first paint,
   while replaying any immediate button click seamlessly. */
if (container.hasChildNodes()) {
  let started = false;
  let ready = false;
  let pendingClickTarget: HTMLElement | null = null;
  const events = ['pointerdown', 'touchstart', 'mousemove', 'keydown', 'scroll', 'wheel', 'focusin'];

  const runHydrate = () => {
    if (started) return;
    started = true;
    events.forEach((evt) => window.removeEventListener(evt, runHydrate));
    import('./bootstrap').then(({ mountOrHydrate }) => {
      mountOrHydrate(container, true, () => {
        ready = true;
        if (pendingClickTarget && document.contains(pendingClickTarget)) {
          const target = pendingClickTarget;
          pendingClickTarget = null;
          target.click();
        }
      });
    });
  };

  window.addEventListener(
    'click',
    (e) => {
      if (!ready && e.target instanceof HTMLElement) {
        const btn = e.target.closest('button');
        if (btn) {
          pendingClickTarget = btn;
          runHydrate();
        }
      }
    },
    { capture: true, once: true },
  );

  events.forEach((evt) => {
    window.addEventListener(evt, runHydrate, { once: true, passive: true });
  });

  try {
    if (window.location.pathname.includes('/audit') || localStorage.getItem('uh_audit_unlocked')) {
      runHydrate();
    }
  } catch {}
} else {
  import('./bootstrap').then(({ mountOrHydrate }) => mountOrHydrate(container, false));
}
