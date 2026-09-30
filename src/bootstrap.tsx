import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';

export function mountOrHydrate(container: HTMLElement, shouldHydrate: boolean, onReady?: () => void) {
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

  if (shouldHydrate) {
    hydrateRoot(container, app, {
      onRecoverableError(err: unknown, errorInfo) {
        console.error('[HYDRATION RECOVERABLE ERROR]', err, errorInfo?.componentStack);
      },
    });
    if (onReady) setTimeout(onReady, 0);
  } else {
    createRoot(container).render(app);
    if (onReady) setTimeout(onReady, 0);
  }
}
