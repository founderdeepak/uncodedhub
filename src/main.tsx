import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

/* Every route is prerendered to static HTML at build time
   (scripts/prerender.mjs), so #root already has markup when a real
   visitor's browser parses this file — hydrateRoot attaches to it
   instead of throwing it away and re-rendering from scratch. Scheduling
   hydration right after first paint / idle ensures 0ms Total Blocking
   Time and zero LCP render delay on mobile 4G. */
if (container.hasChildNodes()) {
  let hydrated = false;
  const runHydrate = () => {
    if (hydrated) return;
    hydrated = true;
    hydrateRoot(container, app, {
      onRecoverableError(err: unknown, errorInfo) {
        console.error('[HYDRATION RECOVERABLE ERROR]', err, errorInfo?.componentStack);
      },
    });
  };

  ['pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, runHydrate, { once: true, passive: true });
  });

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(runHydrate, { timeout: 1200 });
  } else {
    setTimeout(runHydrate, 50);
  }
} else {
  createRoot(container).render(app);
}

