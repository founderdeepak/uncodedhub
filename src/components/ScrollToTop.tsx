import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* `html { scroll-behavior: smooth }` is what makes in-page anchors feel
   right, but it also applies to this reset — so a route change used to
   animate a long scroll up through the outgoing page before the new one
   appeared. Forcing 'instant' here keeps smooth anchors and makes
   navigation land immediately.

   Hash links are left alone so /contact#book still scrolls to the
   booking calendar rather than being yanked to the top. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
