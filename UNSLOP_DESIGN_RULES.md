# UNSLOP DESIGN RULES: 20 Standards for Uncoded Hub & All Live Demos

Every page on `uncodedhub.com`, every client deliverable, and all 50 live industry demos must strictly adhere to these 20 design engineering standards. No generic AI templates, no Dribbble tropes, no slop.

---

### 1. Drop the Purple / Rainbow Gradient
* **Rule**: Never use purple-to-pink gradients (`linear-gradient(to right, #8b5cf6, #ec4899)`), neon indigo, or AI-vibe rainbow fills.
* **Standard**: Use grounded, editorial brand palettes: crisp ink black (`#090b0e`), clean paper (`#fbfbfa`), subtle warm rules, and solid brand accents used with restraint.

### 2. Use Consistent Icons, No Emojis
* **Rule**: Never use casual emojis (🚀, 🔥, ⚡, ✍️, 🧭, 💬, 📅, 📱, 📐, 👁️, 🧱, 📬, 📍, 🌍, ☸, 🛕, 🗿, 🎨, 👤) in place of UI icons or section tags.
* **Standard**: Use refined, consistent 1.5px stroke monoline SVGs (Lucide / custom SVG symbols) with identical visual weight, sizing, and color hierarchy.

### 3. Swap Out Inter for Fonts with Character
* **Rule**: Avoid generic, overused default Inter/Roboto sans setups.
* **Standard**: Pair distinct typographic voices with purpose: an editorial display face (`Cinzel`, `Playfair Display`, `Newsreader`) with a refined modern body face (`Plus Jakarta Sans`, `Geist`, `Cabinet Grotesk`) and a clean monospace for metrics (`JetBrains Mono`).

### 4. No Italic Serif Word on the End of Headlines
* **Rule**: Never end a headline with a single decorative italicized serif accent word (e.g., `Let your website sell before *you do.*`). It is the #1 dead giveaway of an AI template.
* **Standard**: Set headlines in a single, confident, uniform typographic voice. Let the copy's meaning create emphasis, not a gimmicky font switch.

### 5. Lose the Headline Badge / Pill
* **Rule**: Stop sticking an all-caps rounded pill badge directly above every single H2 and H3 (`WHY WE BUILT`, `WHAT YOU GET`, `CONVERSION IN ACTION`, `THE SPRINT PROTOCOL`).
* **Standard**: Headings must stand on their own typographic authority, scale, and whitespace. If category context is needed, use a quiet, un-pill'd label in sentence case.

### 6. Skip the 2-Button Hero
* **Rule**: Do not present dual `[Primary Button] [Secondary Button]` in the hero. It dilutes intent and introduces choice paralysis.
* **Standard**: A single, clear, high-contrast primary call-to-action button. Secondary exploration (e.g., viewing demos or portfolio) should be an organic text anchor or scroll cue.

### 7. Match Outer + Inner Radius Mathematically
* **Rule**: Never guess corner radiuses. An outer card with `rounded-3xl` (24px) containing an inner card with arbitrary `rounded-2xl` (16px) looks amateur.
* **Standard**: Enforce the geometric formula:
  $$\text{Radius}_{\text{inner}} = \text{Radius}_{\text{outer}} - \text{Padding}$$
  If outer is 24px and padding is 16px, inner radius must be 8px. If padding exceeds outer radius, inner radius is 0 (square).

### 8. Fix Color Contrast (WCAG AA Compliance)
* **Rule**: No washed-out low-contrast gray text (`#64748b` on dark, or `#94a3b8` on white).
* **Standard**: All body text must maintain a minimum 4.5:1 contrast ratio against its background; large headings must maintain 3:1+.

### 9. Cut the Glowing Colored Shadows
* **Rule**: Remove all neon, glowing drop shadows (`box-shadow: 0 0 50px rgba(199,7,75,0.25)`, glowing halos).
* **Standard**: Use realistic, physical ambient shadows with high diffusion and low opacity, or crisp 1px structural hairlines.

### 10. No Colored Card Borders
* **Rule**: Stop putting bright colored borders (`border-signal/50`, `border-emerald-500/30`, `border-purple-500`) around cards.
* **Standard**: Use quiet, neutral hairline borders (`border-rule`, `border-white/10`, `border-black/8`) that let the content inside provide the focus.

### 11. Break Up Identical Feature Cards
* **Rule**: Never line up 3 identical cloned cards (same icon box, same title length, same paragraph length) in a repetitive grid.
* **Standard**: Use editorial variety: an asymmetrical layout, a featured wide showcase paired with two stacked details, or structured lists with concrete real-world evidence.

### 12. No Glassmorphism
* **Rule**: Ban `backdrop-blur-md bg-white/[0.04]`. Frosted glass cards look like outdated 2021 Dribbble concepts and cause rendering lag on mobile.
* **Standard**: Use clean, solid, tactile surfaces (`bg-paper`, `bg-paper-raised`, `bg-ink`, `bg-surface`).

### 13. Ease Up on All-Caps Labels
* **Rule**: Avoid screaming blocks of `UPPERCASE MONO TEXT` everywhere.
* **Standard**: Use Sentence Case or Title Case for tags, labels, and buttons. Restrict uppercase exclusively to short standard acronyms (GST, LCP, SEO).

### 14. Drop the Vanity Stat Banner
* **Rule**: Avoid the cliché strip of 3 huge isolated numbers (`7 Days / 100% / 99+`) floating in a vacuum.
* **Standard**: Embed proof metrics directly into sentences and verifiable context (e.g., *"Lighthouse 99 performance verified on real mobile 4G"* linked to the tool).

### 15. Ditch the Generic "1-2-3 Steps"
* **Rule**: Avoid generic "Step 01: Plan, Step 02: Build, Step 03: Launch" cards that say nothing concrete.
* **Standard**: Present the actual schedule as a real working sprint roadmap: Day 1 Kickoff & Intake, Days 2–5 Engineering & Copy, Days 6–7 QA & Domain Handover.

### 16. Fix Text Wrapping (No Orphan Words)
* **Rule**: Never allow single trailing words on their own line at the end of a heading or paragraph.
* **Standard**: Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

### 17. No Gradient Backgrounds
* **Rule**: Remove ambient radial gradient orbs (`radial-gradient(circle, rgba(...))`) and background color washes.
* **Standard**: Ground the page on solid, stable, high-confidence surface colors.

### 18. Restyle Default Shadcn / Template Primitives
* **Rule**: Never ship default shadcn / Tailwind UI components out-of-the-box without bespoke styling.
* **Standard**: Every accordian, tab, input, and modal must be customized with brand-native spacing, borders, typography, and focus states.

### 19. No Fade-In on Every Section
* **Rule**: Stop attaching scroll fade-in reveals and delayed opacity animations to every single container. It makes browsing feel sluggish.
* **Standard**: Content should be immediately readable. Reserve subtle animation exclusively for meaningful interactive states (hover transitions, active tabs, interactive sliders).

### 20. Custom Favicon + Complete Meta Tags
* **Rule**: Never leave default framework favicons or generic boilerplate meta titles.
* **Standard**: Provide dedicated SVG and PNG touch favicons, complete OpenGraph images, descriptive canonical URLs, and schema markup on every page.

---

### 21. Mobile Viewport Discipline & Zero-Overlap Ergonomics (The Honor / Geetha Standard)
* **Rule**: Never allow badges, pills, browser mockup bars, or action buttons to overflow card boundaries, squish into jagged heights, or have floating action buttons obscure reading copy on 360px–390px mobile screens.
* **Standards**:
  1. **Zero Text-Pill Overflow**: Badges and pills must have `max-w-full`, `break-words`, and `leading-tight` with `rounded-xl sm:rounded-full` so long case study or category labels never protrude past card boundaries on compact mobile screens.
  2. **Browser Mockup Bar Responsiveness**: Mockup window bars must have `min-w-0 flex-1 truncate` on the URL bar (`law-firm.uncodedhub.com`) and hide secondary aesthetic style tags on mobile (`hidden sm:inline-block`) so mockup headers never squeeze or truncate into broken fragments (`law-`, `dental-`).
  3. **Action Button Stacking**: Action button pairs side-by-side must stack full-width on mobile (`grid grid-cols-1 sm:grid-cols-2 gap-3 w-full`) with equal padding (`!py-3 !px-4`) and equal height, eliminating jagged vertical misalignment.
  4. **Stacked Bottom-Right Floating Controls**: Never place floating action buttons on opposite bottom corners on mobile. Stack `ScrollToTop` directly above `FloatingWhatsApp` on the bottom right (`bottom-[4.75rem] sm:bottom-24 right-4 sm:right-6` and `bottom-4 sm:bottom-6 right-4 sm:right-6`). The entire left-to-right reading area of headings, paragraphs, and trust statements remains 100% unobstructed.
  5. **Card Padding Scaling & Radius Harmony**: Outer card containers must scale down padding on compact screens (`p-4 sm:p-8 lg:p-10`), with inner cards maintaining geometric radius harmony ($R_{\text{inner}} = R_{\text{outer}} - \text{Padding}$) so inner cards never stick out.

