# Implementation Plan - Performance Optimization & Day/Night Theme Toggle

This plan covers website speed optimizations (improving Lighthouse performance score), optimizing deepak and geetha images, updating the services booking status, and implementing a Day/Night (Light/Dark) toggle that automatically adapts based on user timings.

## User Review Required

> [!IMPORTANT]
> - **Font loading behavior**: I will move Google Font loading from CSS `@import` directly into `index.html`'s `<head>` with asynchronous loading. This will prevent render-blocking and improve FCP/LCP.
> - **Three.js Code Splitting**: I will code-split the Three.js network sphere (`WireframeSphere`) using React's `lazy` and `Suspense` so that the heavy Three.js library doesn't delay the initial load of the homepage.
> - **Light Theme Accent Colors**: For optimal contrast and modern looks in light mode, I have tailored deeper shades of Cyan (`#008CA3`) and Magenta (`#9E00E6`) to match accessibility guidelines, instead of using the glowing neon versions which are unreadable on light backgrounds.

## Proposed Changes

### Configuration & HTML

#### [MODIFY] [index.html](file:///c:/Users/LENOVO/Downloads/uncoded-hub/index.html)
- Move Google Fonts stylesheet from CSS import to `<head>` as an asynchronous link to eliminate render-blocking.
- Defer Google Tag Manager/Analytics execution to window `load` event so it does not block the critical rendering path.
- Add `<noscript>` fallback for Google Fonts.

---

### Styles & Design System

#### [MODIFY] [index.css](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/index.css)
- Redefine `@theme` properties (`--color-midnight`, `--color-cyber`, `--color-magenta`, `--color-cyan`, `--color-steel`, `--color-white`) as CSS variables (`var(--theme-...)`).
- Add a `:root` block representing the default Dark/Night mode styles.
- Add a `:root.light` block representing the custom Light/Day mode styles.
- Define theme-based variables for components (e.g. accordion backgrounds, footer gradients, and text strokes) to automatically adapt when `.light` class is added.
- Add `text-always-white` and `text-always-midnight` utility classes to prevent certain texts (like white text on gradients) from swapping colors.

---

### Navbar & Theme Toggle

#### [MODIFY] [App.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/App.tsx)
- Implement a Day/Night toggle button in the Navbar header.
- On initialization, detect the theme using:
  1. Saved preference in `localStorage`.
  2. If none, check the user's current local time: if hour is between 6 AM and 6 PM (06:00 - 18:00), default to Light mode; otherwise Dark mode.
- Manage body/html class switching dynamically (add/remove `.light` class).
- Add support for changing the meta `theme-color` dynamically.
- Update specific element classes to ensure high-contrast text on gradient buttons.

---

### Pages & Optimizations

#### [MODIFY] [Home.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/pages/Home.tsx)
- Code-split `<WireframeSphere />` using `React.lazy` and `Suspense`.
- Set explicit `width` and `height` attributes on the `/deepak.webp` and `/geetha.webp` image tags.
- Add `loading="lazy"` and `decoding="async"` to image tags.

#### [MODIFY] [About.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/pages/About.tsx)
- Set explicit `width` and `height` attributes on `/deepak.webp` and `/geetha.webp`.
- Add `loading="lazy"` and `decoding="async"` to all images.

#### [MODIFY] [Services.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/pages/Services.tsx)
- Change `STATUS: 1/3 SPOTS REMAINING` to `STATUS: 2/3 SPOTS BOOKED`.

---

### Components

#### [MODIFY] [faq-accordion.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/components/ui/faq-accordion.tsx)
- Swap inline hardcoded background colors in framer-motion `animate` property to use theme-based CSS variables (`var(--faq-bg-open)` and `var(--faq-bg-closed)`).

#### [MODIFY] [hover-footer.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/components/ui/hover-footer.tsx)
- Update wrapper style to use the CSS variable `var(--footer-bg)` instead of the hardcoded dark linear gradient.
- Update the SVG stroke in `InteractiveFooterText` to use `var(--footer-text-stroke)`.

#### [MODIFY] [floating-whatsapp.tsx](file:///c:/Users/LENOVO/Downloads/uncoded-hub/src/components/ui/floating-whatsapp.tsx)
- Replace hardcoded dark-blue backgrounds (`#0B0E23` / `#11142A`) with Tailwind classes `bg-cyber` and `bg-midnight` so that the chatbox automatically inherits theme styles and turns light in light mode.

---

## Verification Plan

### Automated Build Verification
- Propose running `npm run build` after editing to ensure the bundle compiles cleanly and TypeScript validation checks out.

### Manual Theme Verification
- Verify that the theme toggles correctly on click.
- Verify that clearing `localStorage` and refreshing sets the theme based on local time (e.g. at 6:00 AM it turns Light, at 6:00 PM it turns Dark).
- Ensure no layout shift or poor contrast in light mode.
