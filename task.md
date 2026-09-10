# Tasks - Final PageSpeed, Image, and Layout Optimizations

- [x] Compress and optimize `geetha.webp` and `deepak.webp` images to reduce file sizes (saved ~68KB total)
- [x] Add `aria-label="Close chat window"` to WhatsApp chatbot close button to fix the "Buttons do not have an accessible name" warning in Lighthouse
- [x] Raise floating banner's `z-index` from `z-40` to `z-49` to prevent overlapping and rendering behind scrollable page contents (like the footer)
- [x] Implement route-based lazy loading (React.lazy/Suspense) in `App.tsx` (reduced initial JS size by 40% from 800KB to 485KB!)
- [x] Defer rendering of the `FloatingWhatsApp` chatbot widget by 2 seconds in `App.tsx` to eliminate its boot weight and supabase loading from the critical rendering path
- [x] Verify project compilation and rebuild production output
- [x] Package final optimized assets into `uncoded-hub-build-latest.zip`
