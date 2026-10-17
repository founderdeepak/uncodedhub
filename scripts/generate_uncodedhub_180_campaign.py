import csv
import os
from datetime import datetime, timedelta

OUTPUT_DIR = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\uncodedhub_180_instagram_campaign"
os.makedirs(OUTPUT_DIR, exist_ok=True)

START_DATE = datetime(2026, 11, 14)

def generate_uncodedhub_posts():
    slot1_rows = []
    slot2_rows = []
    slot3_rows = []
    slot4_rows = []
    slot5_rows = []
    slot6_rows = []
    zernio_rows = []

    # 30 Comprehensive Days of Studio Engineering Content
    content_data = [
        # DAY 1
        {
            "day": 1,
            "s1": {
                "headline": "Why 84% of Premium Service Websites Fail on Mobile",
                "m1": "Average Mobile Load: 6.4s",
                "m2": "Layout Shift (CLS): 0.42 (Failing)",
                "m3": "Page Payload: 14.2MB (Uncompressed)",
                "takeaway": "You cannot build a luxury brand on sluggish digital infrastructure."
            },
            "s2": {
                "title": "Client Legacy Stack vs. Uncoded Bespoke Rebuild",
                "old_hdr": "LEGACY WORDPRESS STACK",
                "old_stats": "42 Active Plugins • 5.8s Mobile Load • 31/100 Lighthouse",
                "new_hdr": "UNCODED BESPOKE SPRINT",
                "new_stats": "0 Plugins • 0.6s Mobile Load • 100/100 Core Web Vitals",
                "quote": "We turn slow digital storefronts into high-converting revenue engines."
            },
            "s3": {
                "title": "5 Non-Negotiables Built Into Every 7-Day Sprint",
                "l1": "Sub-1.0s mobile load time on standard 4G networks",
                "l2": "Zero third-party plugin dependencies or database bloat",
                "l3": "100/100 Core Web Vitals verified across all pages",
                "l4": "Direct 1-tap WhatsApp + calendar booking routes",
                "l5": "100% clean code ownership with zero monthly builder lock-in"
            },
            "s4": {
                "title": "Inside Our 7-Day Sprint: How We Ship in 168 Hours",
                "ph1": "Day 1–2:", "dt1": "Scope lock, high-converting copywriting & wireframes",
                "ph2": "Day 3–5:", "dt2": "Pure bespoke engineering & responsive device testing",
                "ph3": "Day 6–7:", "dt3": "Speed optimization, 100/100 audit & live DNS cutover",
                "guarantee": "Missed by 1 minute? The entire sprint is 100% free."
            },
            "s5": {
                "statement": "We killed hourly billing. We killed bloated themes. We believe high-ticket service firms deserve digital infrastructure as rigorous as their craftsmanship."
            },
            "s6": {
                "headline": "DEPLOY #142: Sub-400ms Global Edge Routing",
                "change": "Replaced dynamic SSR database queries with pre-rendered edge HTML. Purged 800KB of unused client JS.",
                "telemetry": "Mobile LCP reduced to 0.58s. Cumulative Layout Shift 0.00. 100/100 Lighthouse verified globally.",
                "status": "STATUS: DEPLOYED • CDN: GLOBAL EDGE • VITALS: 100/100"
            }
        },
        # DAY 2
        {
            "day": 2,
            "s1": {
                "headline": "The Hidden Bounce Rate of Aesthetic Clinic Websites",
                "m1": "Initial Mobile TTFB: 1.8s",
                "m2": "Unoptimized Image Weight: 9.8MB",
                "m3": "Mobile Abandonment: 58%",
                "takeaway": "Patients seeking ₹1,00,000 treatments judge clinical precision by digital speed."
            },
            "s2": {
                "title": "Clinic Multi-Step Intake vs. 1-Tap Booking Portal",
                "old_hdr": "14-FIELD FORM GATE",
                "old_stats": "Requires Desktop PDF • 72-Hour Response • 12% Conversion",
                "new_hdr": "UNCODED CLINICAL ROUTE",
                "new_stats": "1-Tap WhatsApp Consultation • Instant Slot Sync • 38% Conversion",
                "quote": "Remove booking friction to double private consultations."
            },
            "s3": {
                "title": "5 Technical Red Flags on High-End Clinic Websites",
                "l1": "Render-blocking appointment booking widgets that freeze scrolling",
                "l2": "Hero images exceeding 4MB uploaded directly from DSLR cameras",
                "l3": "Broken layout elements when viewing doctor credentials on mobile",
                "l4": "Missing treatment price floors that attract tire-kickers",
                "l5": "Slow server responses that trigger security warnings on Safari"
            },
            "s4": {
                "title": "The Commercial Reality of Fixed-Scope Sprints",
                "ph1": "Typical Agency:", "dt1": "Open-ended scopes that stretch to 4 months",
                "ph2": "Uncoded Studio:", "dt2": "Fixed 7-day milestone locked before kickoff",
                "ph3": "Client Benefit:", "dt3": "Zero surprise invoices. 100% certainty of delivery",
                "guarantee": "Commercial certainty is the ultimate client luxury."
            },
            "s5": {
                "statement": "Speed is not a feature. Speed is the first test of your institutional competence."
            },
            "s6": {
                "headline": "DEPLOY #143: WebP/AVIF Automated Image Pipeline",
                "change": "Enforced build-time image compression converting raw PNG/JPEG assets into modern next-gen formats.",
                "telemetry": "Asset payload slashed from 14.2MB to 680KB. Mobile Largest Contentful Paint dropped from 4.2s to 0.72s.",
                "status": "STATUS: OPTIMIZED • PAYLOAD: -95% • LCP: 0.72s"
            }
        },
        # DAY 3
        {
            "day": 3,
            "s1": {
                "headline": "Architecture Firms: The 42MB PDF Portfolio Disaster",
                "m1": "WhatsApp Download Failure: 64%",
                "m2": "Mobile Rendering Lag: 8.2s",
                "m3": "Lost Commercial Inquiries: 4/10",
                "takeaway": "High-net-worth clients browse on mobile. Heavy PDFs cost you deals."
            },
            "s2": {
                "title": "Heavy PDF Downloads vs. Sub-Second Digital Showcase",
                "old_hdr": "STATIC ATTACHMENTS",
                "old_stats": "42MB Download • Fails on Low Signal • Zero Visitor Analytics",
                "new_hdr": "UNCODED DIGITAL GALLERY",
                "new_stats": "Sub-400KB Web Experience • Zero Download • Full Intent Tracking",
                "quote": "Bespoke digital architecture presents high-ticket work with editorial grace."
            },
            "s3": {
                "title": "5 Design Details High-Net-Worth Buyers Notice in 3 Seconds",
                "l1": "Harmonious typographic hierarchy between serif titles and sans body",
                "l2": "Generous negative space that communicates institutional confidence",
                "l3": "Instant touch responsiveness with zero mobile scroll delay",
                "l4": "Direct access to verified project scale and outcome metrics",
                "l5": "Unmistakable next step to book an executive consultation"
            },
            "s4": {
                "title": "Why We Contractually Enforce 'Late Means Free'",
                "ph1": "The Agreement:", "dt1": "7 calendar days from asset handover to staging delivery",
                "ph2": "The Inspection:", "dt2": "Verified 90+ mobile Core Web Vitals on Google Lighthouse",
                "ph3": "The Rule:", "dt3": "If we launch late by 1 minute: 100% of our fee is waived",
                "guarantee": "We take all delivery risk so our clients carry zero exposure."
            },
            "s5": {
                "statement": "When your packaging is chaotic, your expertise is discounted. When flawless, price resistance disappears."
            },
            "s6": {
                "headline": "DEPLOY #144: Critical CSS Inlining & Font Subsetting",
                "change": "Inlined critical above-the-fold CSS. Stripped 1,200 unused glyphs from Fraunces & Inter woff2 font files.",
                "telemetry": "Eliminated render-blocking stylesheets. First Contentful Paint reached 0.42s on 4G cellular.",
                "status": "STATUS: INLINED • FCP: 0.42s • TTFB: 48ms"
            }
        },
        # DAY 4
        {
            "day": 4,
            "s1": {
                "headline": "Real Estate Developers: Why Portal Leads Are Burning Your Margins",
                "m1": "Aggregator Portal Lead Leak: 72%",
                "m2": "Shared Broker Competition: 6-8 Agents",
                "m3": "Lead Quality Score: 2.1/10",
                "takeaway": "Relying solely on property portals turns luxury developments into commodities."
            },
            "s2": {
                "title": "Aggregator Listing vs. Dedicated Project Microsite",
                "old_hdr": "SHARED PROPERTY PORTAL",
                "old_stats": "Competitor Ads on Your Listing • Stale Inquiries • Zero Brand Moat",
                "new_hdr": "BESPOKE RERA MICROSITE",
                "new_stats": "100% Exclusive Inquiries • 0.8s Virtual Tour • High Buyer Intent",
                "quote": "Own your buyer relationship from the first click."
            },
            "s3": {
                "title": "5 Technical Features of High-Converting Luxury Microsites",
                "l1": "Fast-loading interactive floor plan viewers optimized for mobile",
                "l2": "1-tap WhatsApp VIP concierge booking with real-time slot selection",
                "l3": "Pre-cached progressive image loading for architectural renders",
                "l4": "RERA compliance documentation accessible in 1 tap without downloads",
                "l5": "Dynamic location map routing with proximity highlights"
            },
            "s4": {
                "title": "How Senior Engineers Ship in 7 Days Without Burnout",
                "ph1": "Pre-Sprint:", "dt1": "Scope strictly frozen. Zero mid-sprint feature creep",
                "ph2": "Production:", "dt2": "Reusable design tokens and pure semantic markup",
                "ph3": "Deployment:", "dt3": "Automated Git-backed CI/CD with instant rollback",
                "guarantee": "Discipline is our operating system. Velocity is the natural outcome."
            },
            "s5": {
                "statement": "True luxury is the absence of unnecessary friction. The best digital platforms feel invisible."
            },
            "s6": {
                "headline": "DEPLOY #145: Edge-Cached Dynamic OG Social Previews",
                "change": "Engineered automated serverless OpenGraph generator creating 1200x630 previews for every project page.",
                "telemetry": "Social share click-through rates on LinkedIn & WhatsApp increased by 2.4x across 12 client properties.",
                "status": "STATUS: AUTOMATED • CTR: +140% • EDGE CACHE: HIT"
            }
        },
        # DAY 5
        {
            "day": 5,
            "s1": {
                "headline": "The Silent Cost of Monthly Agency Maintenance Retainers",
                "m1": "Average Monthly Retainer: ₹25,000",
                "m2": "Actual Work Done: Clicking 'Update Plugins'",
                "m3": "Annual Retainer Waste: ₹3,00,000",
                "takeaway": "Traditional agencies build fragile sites so they can bill you forever to fix them."
            },
            "s2": {
                "title": "Fragile WordPress Stack vs. Immutable Compiled Code",
                "old_hdr": "PLUGIN-DEPENDENT CMS",
                "old_stats": "Requires Monthly Patches • Vulnerable to Exploits • Slows Over Time",
                "new_hdr": "UNCODED COMPILED CODE",
                "new_stats": "Zero Maintenance Retainers • 100% Unhackable • Runs Fast Forever",
                "quote": "You should own your digital assets completely, with zero recurring hostage fees."
            },
            "s3": {
                "title": "5 Questions to Ask Before Signing an Agency Contract",
                "l1": "Do you contractually guarantee launch dates with financial penalties?",
                "l2": "What mobile Core Web Vitals score do you put in writing?",
                "l3": "Will junior interns or senior engineers write our production code?",
                "l4": "Do we own 100% of our source code upon project completion?",
                "l5": "Will this site require monthly maintenance retainers to stay online?"
            },
            "s4": {
                "title": "The Economics of Speed: Why Faster Sites Make More Money",
                "ph1": "The Latency Tax:", "dt1": "Every 100ms delay reduces checkout conversions by 1%",
                "ph2": "The SEO Reward:", "dt2": "Google algorithmically elevates 90+ Core Web Vitals",
                "ph3": "The Outcome:", "dt3": "Sub-second sites lower ad acquisition costs permanently",
                "guarantee": "Investing in speed compounds returns on every rupee of traffic."
            },
            "s5": {
                "statement": "Amateurs add features until nothing more can be added. Masters eliminate friction until nothing more can be removed."
            },
            "s6": {
                "headline": "DEPLOY #146: Pre-Rendered Static JSON API Endpoints",
                "change": "Replaced runtime database lookups on service catalog pages with pre-compiled edge JSON caches.",
                "telemetry": "Time to First Byte (TTFB) reduced from 640ms to 28ms globally across 300+ CDN nodes.",
                "status": "STATUS: STATIC EDGE • TTFB: 28ms • DB LOAD: 0%"
            }
        }
    ]

    # Systematic expansion for Days 6 to 30
    topics_6_to_30 = [
        # Day 6
        ("Why 92% of Modular Kitchen Studios Lose Mobile Quotes", "Form Abandonment: 68%", "Image Gallery Lag: 5.4s", "Missed Showroom Visits: 3/5",
         "Slow loading kitchen portfolios frustrate homeowners comparing finishes on mobile.",
         "Generic Catalog vs Interactive Finishes Showcase", "40-Page Cluttered PDF", "Fails on Phone", "Zero Followup", "Bespoke 3D Finish Viewer", "Sub-Second Mobile", "Instant Visit Booking", "Make showroom bookings effortless.",
         "5 Usability Flaws on Interior Studio Portfolios", ["Unoptimized 8K renders that stall mobile data", "Missing material transparency and pricing guides", "No direct WhatsApp designer consultation", "Burying past client locations", "Complex multi-page navigation"],
         "Why We Guarantee 100% Core Web Vitals", "Page speed is an explicit ranking factor", "Mobile users abandon sites after 3 seconds", "Fast code builds immediate trust",
         "Craftsmanship is doing it right even when no one is watching.",
         "DEPLOY #147: Dynamic Asset Preloading on Hover", "Preloaded route bundles on pointer hover intent.", "Perceived page transition time dropped to 0ms.", "STATUS: ZERO LATENCY • NAV: INSTANT"),

        # Day 7
        ("The Luxury Wedding Photographer Dilemma: 100MB Galleries", "Initial Gallery Paint: 9.2s", "Mobile Data Drain: 98MB", "Client Bounce Rate: 46%",
         "Couples booking ₹5,00,000 weddings expect editorial poise, not loading spinners.",
         "Slow Heavy Gallery vs Progressive Visual Editorial", "Uncompressed High-Res Dumps", "Stutters on iPhone", "Lost Inquiries", "Progressive AVIF Responsive Sets", "Instant 60fps Scroll", "Direct Date Check", "Elevate your visual storytelling.",
         "5 Elements of an Ultra-High-Converting Creative Portfolio", ["Curated outcome hero stories", "Sub-second responsive image grids", "Transparent pricing tier anchors", "Direct calendar check for availability", "Verified bride & groom reviews"],
         "Why We Ban Theme Builders in Production", "Themes package thousands of unused styles", "Frequent updates break custom layouts", "Custom markup guarantees clean stability",
         "Elegance is the elimination of friction at every client touchpoint.",
         "DEPLOY #148: Hardware-Accelerated CSS Carousel", "Replaced heavy JS sliders with native CSS scroll-snap.", "Eliminated 65KB of vendor JS from portfolio pages.", "STATUS: 60FPS SMOOTH • BUNDLE: -65KB"),

        # Day 8
        ("Executive Coaches: The Credibility Gap of DIY Websites", "Bounce Rate on Bio: 62%", "Average Session Duration: 24s", "Inbound Call Rate: 1.2%",
         "Advising C-suite leaders while using a generic $49 theme undermines your authority.",
         "Generic Bio Page vs Category-Leader Executive Portal", "Cookie-Cutter Template", "No Verified Impact", "Fee Bargaining", "Editorial Monocle Layout", "Hard Case Metrics", "Executive Trust", "Packaging anchors your advisory fees.",
         "5 Trust Triggers for High-Ticket Advisory Platforms", ["Tier-1 executive client logos", "Clear frameworks with proprietary naming", "Transparent engagement minimums", "Frictionless discovery calendar", "Clean editorial typographic hierarchy"],
         "The Power of a 7-Day Sprint for Consultancies", "Fast launches preserve strategic momentum", "Focuses strictly on client-converting essentials", "Eliminates months of internal committee delay",
         "Clarity always beats cleverness in high-ticket transactions.",
         "DEPLOY #149: DNS-Prefetch & Preconnect Optimization", "Configured preconnect hints for Google Fonts and payment APIs.", "Saved 180ms on third-party handshake latency.", "STATUS: PREFETCH ACTIVE • HANDSHAKE: -180MS"),

        # Day 9
        ("The True Cost of a 'Free' Consultation Form", "Form Fields: 12", "Drop-Off at Field 4: 54%", "Average Form Fill Time: 4.8 min",
         "Forcing prospects through an interrogation form kills inbound buyer intent.",
         "12-Field Interrogation vs 1-Tap Dual Route", "Mandatory Phone & Address", "Sent to Shared Inbox", "Cold Lead", "Instant Google Meet Sync", "Direct WhatsApp Line", "Warm Conversation", "Meet high-intent buyers in their preferred channel.",
         "5 Conversion Killers on Service Contact Pages", ["Asking for budget before demonstrating value", "Captcha challenges that fail on mobile devices", "Broken form submission validation errors", "No confirmation of reply timeframe", "Vague promises of 'getting back soon'"],
         "Why We Include 30 Days of Free Warranty Post-Launch", "Guarantees zero anxiety after DNS cutover", "Covers all edge-case device adjustments", "Proves complete confidence in our codebase",
         "Respect given in the first three seconds builds trust for the next three years.",
         "DEPLOY #150: Automated Lighthouse CI Performance Gate", "Integrated automated speed audits into GitHub deployment pipeline.", "Blocked builds that score under 95 on mobile Core Web Vitals.", "STATUS: CI GATE ENFORCED • MIN SCORE: 95/100"),

        # Day 10
        ("Why 78% of Dental Implant Clinics Fail Google Local SEO", "Mobile Speed Score: 24/100", "Local 3-Pack Visibility: Low", "Bounce Rate from Maps: 61%",
         "Google's mobile ranking algorithm actively penalizes slow healthcare websites.",
         "Slow Template vs Sub-Second Healthcare Architecture", "Heavy WordPress Plugins", "Layout Shifts", "Lost Rankings", "Semantic Clean HTML", "Zero Layout Shift", "Top 3-Pack Authority", "Speed is your strongest local SEO asset.",
         "5 Technical Fixes for Medical Practice Websites", ["Fix Cumulative Layout Shift on doctor photo headers", "Compress clinical before/after galleries to WebP", "Implement schema markup for medical clinics", "Add 1-tap emergency appointment booking", "Ensure text is high-contrast and readable outdoors"],
         "Why We Only Work With Two Clients at a Time", "Guarantees 100% senior engineering dedication", "Eliminates agency context switching", "Protects our 7-day launch guarantee",
         "Focus is saying no to a hundred distractions to execute one masterpiece.",
         "DEPLOY #151: Schema.org Healthcare Structured Data", "Deployed structured JSON-LD schemas across all clinic deployments.", "Google Search rich results enabled for doctor ratings & hours.", "STATUS: SCHEMA LIVE • RICH SNIPPETS: ENABLED"),

        # Day 11-30 abbreviated topics
        ("The Mobile Typography Mistake That Kills Readability", "Body Text Font Size: 12px", "Contrast Ratio: 2.4:1 (Fail)", "Mobile Eye Strain: High", "Small gray text forces high-net-worth buyers to squint and bounce.", "Low-Contrast Bloat vs High-Contrast Editorial", "Unreadable Gray Text", "Fails WCAG Standards", "Lost Leads", "Deep Ink on Warm Paper", "Strict 4.5:1 AA Floor", "Effortless Read", "Design for human eyes in real-world sunlight.", "5 Typography Rules for Premium Service Brands", ["Never use font sizes under 16px for body copy", "Enforce strict 4.5:1 contrast against background", "Limit typefaces to two complementary voices", "Set line-height between 1.5 and 1.6 for readability", "Use letter-spacing discipline on all uppercase eyebrows"], "Why We Use Fraunces and Inter Exclusively", "Fraunces delivers editorial warmth and authority", "Inter guarantees crystal-clear interface readability", "Creates a cohesive high-end publication aesthetic", "Simplicity is prerequisite for reliability.", "DEPLOY #152: Fluid Clamp Typography Engine", "Deployed CSS clamp scales across all headings.", "Eliminated jagged media query layout jumps.", "STATUS: FLUID TYPE • ZERO JUMPS"),
        ("The Trap of Third-Party Chat Widgets", "Script Weight: 1.8MB", "Network Requests: 28", "Main Thread Block: 420ms", "Heavy chat widgets slow down the page more than the conversion they generate.", "Bloated Third-Party Widget vs Native 1-Tap Route", "24 External Scripts", "Slows Entire Page", "2% Chat Rate", "Zero Script Overhead", "Instant WhatsApp Direct", "High Lead Volume", "Connect buyers directly without slowing down code.", "5 Ways Third-Party Scripts Damage Your Business", ["They expose your visitors to third-party tracking", "They block the main browser thread during initial paint", "They frequently fail during cellular connection drops", "They increase your vulnerability to script injection", "They drain mobile device battery life rapidly"], "Why We Code Without Third-Party Bloat", "Zero external dependencies mean total reliability", "Sub-second speeds remain permanent over time", "Clients maintain 100% ownership of their IP", "The best code is the code you never had to write.", "DEPLOY #153: Native Web Worker Event Bridge", "Offloaded telemetry tracking scripts to background web workers.", "Freed main thread completely for smooth 60fps interaction.", "STATUS: WORKER ACTIVE • MAIN THREAD: 0MS"),
        ("Why Luxury Brands Must Never Use Generic Bootstrap", "Identical Grid Aesthetics: 100%", "Unused CSS Shipped: 140KB", "Commoditized Brand Feel: High", "When your layout looks like a template, clients assume your service is generic.", "Generic Bootstrap Theme vs Bespoke Design System", "Cookie-Cutter Look", "Endless Div Nesting", "Price Resistance", "Custom Design Tokens", "Semantic Clean Markup", "Premium Perception", "Bespoke digital architecture protects your pricing power.", "5 Hallmarks of Bespoke Digital Architecture", ["Bespoke design tokens aligned to brand identity", "Hardware-accelerated CSS transitions", "Sub-500KB total page weight budgets", "Zero unneeded CSS rules in production bundles", "Mobile thumb-zone layout intentionality"], "The Architecture Behind 7-Day Velocity", "Locked scopes prevent feature creep", "Senior engineers write clean semantic code", "Automated deployment pipelines eliminate manual errors", "Discipline is the product.", "DEPLOY #154: PurgeCSS Dead-Code Elimination", "Automated build step removing 100% of unused CSS rules.", "Reduced final stylesheet size from 280KB to 14KB.", "STATUS: PURGED • CSS SIZE: 14KB • SAVINGS: 95%"),
        ("The Fallacy of the 100-Question Discovery Form", "Average Completion Rate: 8%", "Lead Loss at Step 3: 65%", "Lost Buyer Momentum: Severe", "Prospects want to know if you can solve their problem, not write a thesis.", "Exhaustive Form vs Frictionless Qualification", "Lengthy Questionnaires", "High Drop-Off", "Cold Prospect", "2-Question Qualifier", "Instant Calendar Sync", "Engaged Prospect", "Make it effortless for clients to take the first step.", "5 Friction Points to Remove From Service Funnels", ["Demanding phone numbers on initial contact", "Forcing account creation to view case studies", "Hiding pricing minimums behind email gates", "Using multi-step forms without progress bars", "Failing to offer an instant chat alternative"], "Why We Stand Behind Our 'Late Means Free' Promise", "It forces our team to maintain extreme operational rigor", "It de-risks the entire transaction for our client", "It proves our 7-day sprint model is battle-tested", "When you have nothing to hide, you guarantee your work.", "DEPLOY #155: Idempotent Form Submission Engine", "Implemented client-side debounce and unique submission nonces.", "Eliminated duplicate lead submissions across all intake portals.", "STATUS: IDEMPOTENT • ZERO DUPLICATES"),
        ("Why Client Proof Must Load in Under 1 Second", "Proof Section Abandonment: 44%", "Time Spent Waiting: 3.8s", "Lost Trust Before View: 60%", "If your case study images take 4 seconds to load, clients never see your success.", "Sluggish Portfolio vs Instant Evidence Engine", "Uncompressed Renders", "Broken Layouts", "Skeptical Buyer", "Pre-Cached Edge Images", "Instant Proof Display", "High Trust Buyer", "Deliver evidence before buyer skepticism sets in.", "5 Ways to Structure High-Converting Case Studies", ["Lead with the commercial outcome achieved", "Show before and after metrics clearly", "Include a verified client testimonial quote", "Highlight the turnaround speed of delivery", "Provide a clear next step to achieve similar results"], "Why We Ban Hourly Billing Forever", "Hourly billing rewards slowness and inefficiency", "Fixed sprint pricing aligns our goals with client success", "Both parties focus entirely on shipping world-class output", "Incentives drive outcomes. We align with velocity.", "DEPLOY #156: Global Edge CDN Cache Invalidation", "Integrated Git-commit hash asset busting on edge caches.", "Zero stale cache views during instant client production updates.", "STATUS: ZERO STALE CACHE • PURGE TIME: 180MS"),
        ("The Security Risk of Abandoned WordPress Plugins", "Known Vulnerabilities in Top Plugins: 4,000+", "Average Attack Frequency: 22 min", "Site Defacement Risk: Critical", "Every plugin you install is an open door for automated malicious bots.", "Vulnerable CMS vs Hardened Compiled Edge HTML", "38 Plugin Vulnerabilities", "Constant Patch Panic", "Security Risk", "0 Plugin Dependencies", "100% Immutable Edge HTML", "Total Peace of Mind", "Eliminate vulnerabilities at the architectural level.", "5 Security Audits Every Business Owner Must Run", ["Check for outdated plugins with known CVE exploits", "Verify SSL certificates auto-renew without warnings", "Test database endpoints against public crawling", "Ensure admin login pages are not on default URLs", "Implement strict Content Security Policy headers"], "Why Uncoded Sites Are Inherently Unhackable", "We ship pre-rendered static assets to global edge CDNs", "There is no live database exposed on public page visits", "Attackers have zero execution vectors to exploit", "Security is not an afterthought. It is the foundation.", "DEPLOY #157: Strict Content Security Policy (CSP)", "Configured cryptographic nonces for all scripts and styles.", "Zero vulnerability to cross-site scripting (XSS) attacks.", "STATUS: CSP ENFORCED • GRADE: A+ SECURITY"),
        ("Why Most Agency Websites Are Slow on Cellular 4G", "Desktop Load Time: 1.2s", "Mobile 4G Load Time: 6.8s", "Performance Gap: 5.6s", "Agencies design on office gigabit fiber and forget how clients browse on phones.", "Desktop-Biased Build vs Mobile-First Architecture", "Heavy Video Backgrounds", "Stalls on Cellular", "Lost Mobile Traffic", "Lightweight SVG Accents", "Sub-Second on 4G", "Flawless Experience", "Design for real-world cellular network constraints.", "5 Optimization Rules for Cellular Performance", ["Budget total page payload under 1.0MB", "Enforce strict lazy-loading on off-screen assets", "Avoid auto-playing video banners on mobile viewports", "Self-host all font files with preconnect hints", "Minify and compress all text assets using Brotli"], "The Power of Mobile-First Constraints", "Mobile limitations force extreme design discipline", "Ensures the essential message is delivered clearly", "Creates an unmatched experience on every screen size", "Constraints breed creativity and operational rigor.", "DEPLOY #158: Brotli Compression on All Text Assets", "Enabled Brotli level-11 compression across all edge networks.", "Reduced HTML, CSS, and JS transfer sizes by an additional 22%.", "STATUS: BROTLI ACTIVE • TRANSFER: -22%"),
        ("The Difference Between Web Design and Web Architecture", "Web Design Focus: Colors & Fonts", "Web Architecture Focus: Speed, Scale & Revenue", "Client Business Impact: 10x Greater", "Pretty templates win awards. Engineered architectures close high-ticket clients.", "Superficial Decor vs Commercial Engine", "Focus on Trends Only", "Fragile Codebase", "Zero Revenue Moat", "Focus on Conversion", "Robust Infrastructure", "Long-Term Growth", "Treat your digital presence as mission-critical infrastructure.", "5 Technical Layers of High-Converting Architecture", ["Semantic HTML foundation for SEO and accessibility", "Lightweight CSS design tokens for visual consistency", "Hardware-accelerated animations for fluid interaction", "Global edge caching for sub-second worldwide delivery", "Direct low-friction conversion pathways for lead capture"], "Why Senior Engineers Matter in Agency Work", "Senior engineers anticipate edge cases before coding", "They eliminate technical debt before it compounds", "They ship robust solutions in days, not months", "Experience is the shortcut to simplicity.", "DEPLOY #159: CSS Containment for Rendering Speed", "Applied CSS contain: layout style to independent card modules.", "Reduced browser layout calculation time by 48% on complex pages.", "STATUS: CSS CONTAINMENT • PAINT: -48% TIME"),
        ("Why Your Website Is Your Highest-ROI Asset", "Social Post Lifespan: 24 Hours", "Website Asset Lifespan: 5+ Years", "Compounding Value: Exponential", "Stop renting your brand on social platforms. Invest in owned digital real estate.", "Rented Social Feed vs Owned Digital Fortress", "Subject to Algorithm Cuts", "Zero Customization", "Fleeting Attention", "100% Owned Domain", "Bespoke Architecture", "Compounding Authority", "Build your business on rock, not algorithmic sand.", "5 Compounding Benefits of Bespoke Architecture", ["Superior organic search authority over time", "Zero monthly platform licensing or builder fees", "Complete control over the buyer journey and data", "Immunity to sudden social platform bans or changes", "An appreciating enterprise asset that adds company value"], "The Philosophy of Uncoded Hub", "We build tools that endure, perform, and convert", "We reject shortcuts, bloat, and billable hours", "We hold ourselves contractually accountable to results", "Build for longevity. Ship with speed.", "DEPLOY #160: Automated Sitemap & Robots Protocol", "Generated automated dynamic XML sitemaps with priority weighting.", "Search engine indexing time dropped from 7 days to 24 hours.", "STATUS: SITEMAP SYNCED • INDEX: < 24 HOURS"),
        ("The Final Sprint: 30 Days of Engineering Excellence", "Total Deployments: 180+", "Average Speed Score: 98/100", "Client Conversion Uplift: +42%", "We proved that world-class web architecture can be fast, disciplined, and uncompromisingly elite.", "Traditional Chaos vs Uncoded Hub Standard", "Months of Delay", "Fragile Code", "Endless Retainers", "7-Day Sprints", "100/100 Speed", "Late Means Free", "Never settle for slow code. The standard you accept is the standard you deliver.", "5 Core Values Behind Every Uncoded Hub Build", ["Speed is competence, not a feature", "Design discipline reflects operational rigor", "Contractual accountability builds real trust", "Clean code outlasts design trends", "Simplicity is the ultimate sophistication"], "Thank You for Following Our Journey", "We exist to elevate boutique firms through clean code", "Our 7-day sprint model is open for new partner studios", "Let's build something extraordinary together", "The standard you walk past is the standard you accept.", "DEPLOY #161: Full Telemetry Audit Across All Stacks", "Final automated verification across all 30 days of production builds.", "Zero errors, zero broken links, sub-600ms global speed verified.", "STATUS: 100/100 ALL VITALS • DEPLOYED WORLDWIDE")
    ]

    for idx, t in enumerate(topics_6_to_30):
        day_num = idx + 6
        content_data.append({
            "day": day_num,
            "s1": {"headline": t[0], "m1": t[1], "m2": t[2], "m3": t[3], "takeaway": t[4]},
            "s2": {"title": t[5], "old_hdr": "LEGACY APPROACH", "old_stats": f"{t[6]} • {t[7]} • {t[8]}", "new_hdr": "UNCODED BESPOKE", "new_stats": f"{t[9]} • {t[10]} • {t[11]}", "quote": t[12]},
            "s3": {"title": t[13], "l1": t[14][0], "l2": t[14][1], "l3": t[14][2], "l4": t[14][3], "l5": t[14][4]},
            "s4": {"title": t[15], "ph1": "Challenge:", "dt1": t[16], "ph2": "Solution:", "dt2": t[17], "ph3": "Outcome:", "dt3": t[18], "guarantee": "7-day sprint delivery. Late means 100% free."},
            "s5": {"statement": t[19]},
            "s6": {"headline": t[20], "change": t[21], "telemetry": t[22], "status": t[23]}
        })

    # Fill remaining days up to 30 with systematic variations
    while len(content_data) < 30:
        day_num = len(content_data) + 1
        base = content_data[(day_num - 1) % 5]
        content_data.append({
            "day": day_num,
            "s1": {
                "headline": f"Audit #{day_num}: High-Ticket Mobile Conversion Telemetry",
                "m1": "Mobile Latency: 5.2s",
                "m2": "Layout Shift: 0.38",
                "m3": "Payload Weight: 11.4MB",
                "takeaway": "Uncoded bespoke architecture cuts bounce rates by 50% instantly."
            },
            "s2": {
                "title": f"Sprint Teardown #{day_num}: Bloated Theme vs Clean Architecture",
                "old_hdr": "GENERIC THEME",
                "old_stats": "38 Plugins • 4.8s Load • Failing Core Vitals",
                "new_hdr": "UNCODED CODE",
                "new_stats": "0 Plugins • 0.6s Mobile Load • 100/100 Vitals",
                "quote": "Bespoke engineering delivers permanent competitive advantages."
            },
            "s3": {
                "title": f"5 Engineering Laws Behind Sprint #{day_num}",
                "l1": "Sub-1.0s mobile load verified on real 4G networks",
                "l2": "100% clean semantic markup with zero template wrappers",
                "l3": "Hardware-accelerated CSS animations running at 60fps",
                "l4": "Direct 1-tap WhatsApp consultation pathways",
                "l5": "Complete code ownership transferred upon launch"
            },
            "s4": {
                "title": f"How We Ship Production Client Platforms in 7 Days",
                "ph1": "Day 1–2:", "dt1": "Scope freeze, copywriting & responsive wireframes",
                "ph2": "Day 3–5:", "dt2": "Hand-crafted engineering & cross-browser verification",
                "ph3": "Day 6–7:", "dt3": "Speed optimization, Lighthouse 100/100 & live DNS",
                "guarantee": "Missed by 1 minute? Entire project fee is 100% waived."
            },
            "s5": {
                "statement": "We engineer digital client acquisition infrastructure for boutique firms who refuse to accept mediocre agency standards."
            },
            "s6": {
                "headline": f"DEPLOY #{150 + day_num}: Edge Pre-Rendering Verification",
                "change": "Enforced global edge pre-rendering and build-time asset optimization.",
                "telemetry": "Mobile load time verified at 0.54s globally with 0 layout shift.",
                "status": f"STATUS: DEPLOYED • TIME: 0.54S • SCORE: 100/100"
            }
        })

    # Assemble rows for all 6 slots and Zernio
    raw_github_base = "https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/uncodedhub_180_instagram_campaign/images/"

    for c in content_data:
        day_num = c["day"]
        post_date = (START_DATE + timedelta(days=day_num - 1)).strftime("%Y-%m-%d")

        # SLOT 1 (08:00 AM) - Market Telemetry Audit
        slot1_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "08:00",
            "Audit_Kicker": "MARKET TELEMETRY // Q4 AUDIT",
            "Audit_Headline": c["s1"]["headline"],
            "Metric_1": c["s1"]["m1"],
            "Metric_2": c["s1"]["m2"],
            "Metric_3": c["s1"]["m3"],
            "Takeaway_Text": c["s1"]["takeaway"],
            "Footer": "Uncoded Hub Research Lab • uncodedhub.com"
        })

        # SLOT 2 (11:00 AM) - Architecture Teardown (Center Spine)
        slot2_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "11:00",
            "Case_Tag": "STUDIO REBUILD // ARCHITECTURE TEARDOWN",
            "Case_Title": c["s2"]["title"],
            "Old_Header": c["s2"]["old_hdr"],
            "Old_Stats_Line": c["s2"]["old_stats"],
            "New_Header": c["s2"]["new_hdr"],
            "New_Stats_Line": c["s2"]["new_stats"],
            "ROI_Result_Quote": c["s2"]["quote"]
        })

        # SLOT 3 (02:00 PM) - 5-Point Studio Standard
        slot3_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "14:00",
            "Standard_Tag": "UNCODED HUB STANDARD // 5 LAWS",
            "Standard_Title": c["s3"]["title"],
            "Law_01": c["s3"]["l1"],
            "Law_02": c["s3"]["l2"],
            "Law_03": c["s3"]["l3"],
            "Law_04": c["s3"]["l4"],
            "Law_05": c["s3"]["l5"],
            "Footer_Banner": "The engineering benchmark for boutique service firms."
        })

        # SLOT 4 (05:00 PM) - 7-Day Sprint Protocol
        slot4_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "17:00",
            "Sprint_Tag": "THE 7-DAY SPRINT // CONTRACTUAL PROTOCOL",
            "Sprint_Title": c["s4"]["title"],
            "Phase_1": c["s4"]["ph1"],
            "Detail_1": c["s4"]["dt1"],
            "Phase_2": c["s4"]["ph2"],
            "Detail_2": c["s4"]["dt2"],
            "Phase_3": c["s4"]["ph3"],
            "Detail_3": c["s4"]["dt3"],
            "Guarantee_Text": c["s4"]["guarantee"]
        })

        # SLOT 5 (08:00 PM) - Studio Manifesto (Center Spine)
        slot5_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "20:00",
            "Manifesto_Issue": f"UNCODED HUB MANIFESTO // ISSUE #{day_num:02d}",
            "Manifesto_Statement": c["s5"]["statement"],
            "Studio_Signature": "UNCODED HUB • Product-Led Engineering Studio"
        })

        # SLOT 6 (11:00 PM) - Deploy Changelog
        slot6_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "23:00",
            "Deploy_Timestamp": "[23:00:00 IST] // CHANGELOG & DEPLOY TELEMETRY",
            "Deploy_Headline": c["s6"]["headline"],
            "Changelog_Box": c["s6"]["change"],
            "Telemetry_Box": c["s6"]["telemetry"],
            "Status_Bar": c["s6"]["status"]
        })

        # Zernio 6 Slots
        slots = [
            ("08:00", c["s1"]["headline"], f"[UNCODED HUB TELEMETRY AUDIT]\n\n{c['s1']['headline']}\n\nKey Telemetry Findings:\n• {c['s1']['m1']}\n• {c['s1']['m2']}\n• {c['s1']['m3']}\n\nCore Takeaway:\n{c['s1']['takeaway']}\n\nCurious how your platform scores? Comment 'AUDIT' with your URL.\n\n#WebPerformance #CoreWebVitals #UncodedHub #DigitalArchitecture #HighTicketSales", f"Day{day_num:02d}_08AM_TelemetryAudit.png"),
            ("11:00", c["s2"]["title"], f"[ARCHITECTURE TEARDOWN // BENCHMARK]\n\n{c['s2']['title']}\n\n{c['s2']['old_hdr']}:\n{c['s2']['old_stats']}\n\n{c['s2']['new_hdr']}:\n{c['s2']['new_stats']}\n\n\"{c['s2']['quote']}\"\n\n#CleanCode #NoBloat #WebDevelopment #HighTicketWeb #BoutiqueFirms", f"Day{day_num:02d}_11AM_ArchitectureTeardown.png"),
            ("14:00", c["s3"]["title"], f"[UNCODED HUB ENGINEERING SPEC]\n\n{c['s3']['title']}:\n\n1. {c['s3']['l1']}\n2. {c['s3']['l2']}\n3. {c['s3']['l3']}\n4. {c['s3']['l4']}\n5. {c['s3']['l5']}\n\nSave this checklist for your next digital infrastructure audit.\n\n#WebsiteStandard #EngineeringRigor #UXStandards #DigitalExcellence #UncodedHub", f"Day{day_num:02d}_02PM_StudioStandard.png"),
            ("17:00", c["s4"]["title"], f"[THE 7-DAY SPRINT PROTOCOL]\n\n{c['s4']['title']}\n\n• {c['s4']['ph1']} {c['s4']['dt1']}\n• {c['s4']['ph2']} {c['s4']['dt2']}\n• {c['s4']['ph3']} {c['s4']['dt3']}\n\n{c['s4']['guarantee']}\n\n#SprintDelivery #RiskReversal #ContractualAccountability #LateMeansFree #NoDelays", f"Day{day_num:02d}_05PM_SprintProtocol.png"),
            ("20:00", f"Manifesto Issue #{day_num:02d}", f"\"{c['s5']['statement']}\"\n\n— UNCODED HUB • Product-Led Engineering Studio\n\n#StudioManifesto #Craftsmanship #EngineeringEthics #BoutiqueExcellence #UncodedHub", f"Day{day_num:02d}_08PM_StudioManifesto.png"),
            ("23:00", c["s6"]["headline"], f"[PRODUCTION DEPLOY REPORT // 23:00 IST]\n\n{c['s6']['headline']}\n\nChange Log:\n{c['s6']['change']}\n\nPerformance Telemetry:\n{c['s6']['telemetry']}\n\n{c['s6']['status']}\n\n#DevOps #EdgeComputing #GlobalCDN #CoreWebVitals #ReleaseNotes", f"Day{day_num:02d}_11PM_DeployChangelog.png")
        ]

        for slot_time, title, caption, img_filename in slots:
            sched_datetime = f"{post_date} {slot_time}"
            media_url = f"{raw_github_base}{img_filename}"
            zernio_rows.append({
                "post_content": caption,
                "platforms": "instagram,facebook",
                "profiles": "6ac91e8c0b80c7bfcba45e7a",
                "schedule_time": sched_datetime,
                "schedule_time_twitter": "",
                "schedule_time_instagram": sched_datetime,
                "schedule_time_facebook": sched_datetime,
                "schedule_time_youtube": "",
                "schedule_time_linkedin": "",
                "schedule_time_tiktok": "",
                "schedule_time_threads": "",
                "schedule_time_pinterest": "",
                "schedule_time_reddit": "",
                "schedule_time_bluesky": "",
                "schedule_time_googlebusiness": "",
                "schedule_time_telegram": "",
                "tz": "Asia/Kolkata",
                "media_urls": media_url,
                "is_draft": "false",
                "publish_now": "false",
                "use_queue": "false",
                "title": title,
                "tags": "",
                "hashtags": "",
                "visibility": "public",
                "mentions": "",
                "crossposting_enabled": "true",
                "metadata": "",
                "youtube_title": "",
                "youtube_description": "",
                "youtube_first_comment": "",
                "youtube_thumbnail_url": "",
                "facebook_first_comment": "",
                "linkedin_first_comment": "",
                "instagram_content_type": "post",
                "instagram_collaborators": "",
                "instagram_thumbnail_url": "",
                "instagram_first_comment": "",
                "instagram_is_ai_generated": "",
                "tiktok_privacy": "",
                "tiktok_allow_comments": "",
                "tiktok_allow_duet": "",
                "tiktok_allow_stitch": "",
                "tiktok_commercial_content": "",
                "tiktok_brand_partner": "",
                "tiktok_organic_brand": "",
                "tiktok_media_type": "",
                "tiktok_description": "",
                "tiktok_auto_add_music": "",
                "twitter_thread_items": "",
                "threads_thread_items": "",
                "custom_content_twitter": "",
                "custom_content_linkedin": "",
                "custom_content_facebook": "",
                "custom_content_instagram": "",
                "custom_content_youtube": "",
                "custom_content_tiktok": "",
                "custom_content_threads": "",
                "custom_content_googlebusiness": "",
                "custom_content_telegram": "",
                "custom_media_twitter": "",
                "custom_media_linkedin": "",
                "custom_media_facebook": "",
                "custom_media_instagram": "",
                "custom_media_youtube": "",
                "custom_media_tiktok": "",
                "custom_media_threads": "",
                "custom_media_googlebusiness": "",
                "custom_media_telegram": "",
                "pinterest_title": "",
                "pinterest_link": "",
                "googlebusiness_cta_type": "",
                "googlebusiness_cta_url": "",
                "telegram_parse_mode": "",
                "telegram_disable_web_page_preview": "",
                "telegram_disable_notification": "",
                "telegram_protect_content": "",
                "tiktok_draft": "",
                "tiktok_made_with_ai": "",
                "reddit_subreddit": "",
                "reddit_flair_id": "",
                "reddit_flair_text": "",
                "reddit_nsfw": "",
                "reddit_spoiler": ""
            })

    # Save 6 Segregated Canva CSVs
    f1 = os.path.join(OUTPUT_DIR, "01_slot_08am_telemetry_audit_30.csv")
    with open(f1, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot1_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot1_rows)
    print(f"Written: {f1} ({len(slot1_rows)} rows)")

    f2 = os.path.join(OUTPUT_DIR, "02_slot_11am_architecture_teardown_30.csv")
    with open(f2, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot2_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot2_rows)
    print(f"Written: {f2} ({len(slot2_rows)} rows)")

    f3 = os.path.join(OUTPUT_DIR, "03_slot_02pm_5point_standards_30.csv")
    with open(f3, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot3_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot3_rows)
    print(f"Written: {f3} ({len(slot3_rows)} rows)")

    f4 = os.path.join(OUTPUT_DIR, "04_slot_05pm_sprint_protocol_30.csv")
    with open(f4, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot4_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot4_rows)
    print(f"Written: {f4} ({len(slot4_rows)} rows)")

    f5 = os.path.join(OUTPUT_DIR, "05_slot_08pm_studio_manifesto_30.csv")
    with open(f5, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot5_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot5_rows)
    print(f"Written: {f5} ({len(slot5_rows)} rows)")

    f6 = os.path.join(OUTPUT_DIR, "06_slot_11pm_deploy_changelog_30.csv")
    with open(f6, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot6_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot6_rows)
    print(f"Written: {f6} ({len(slot6_rows)} rows)")

    # Save Master Zernio CSV
    fz = os.path.join(OUTPUT_DIR, "master_uncodedhub_180_zernio_schedule.csv")
    with open(fz, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(zernio_rows[0].keys()))
        writer.writeheader()
        writer.writerows(zernio_rows)
    print(f"Written: {fz} ({len(zernio_rows)} rows)")

if __name__ == "__main__":
    generate_uncodedhub_posts()
