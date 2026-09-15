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
   instead of throwing it away and re-rendering from scratch. In dev
   (`vite dev`) and in `vite preview` before the prerender step has run,
   #root is empty, so this falls back to a normal client render. */
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
