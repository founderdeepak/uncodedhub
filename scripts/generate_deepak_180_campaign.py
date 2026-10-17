import csv
import os
from datetime import datetime, timedelta

# Create output directory
OUTPUT_DIR = r"c:\Users\LENOVO\Downloads\uncoded-hub\linkedIn_Master\deepak_180_instagram_campaign"
os.makedirs(OUTPUT_DIR, exist_ok=True)

START_DATE = datetime(2026, 10, 14)

# 30-Day Master Arc Themes:
# Days 1-7: The Silent Client Loss & First Impressions (Wake-up call, speed as competence)
# Days 8-14: Technical Architecture vs Agency Bloat (WordPress/Elementor death vs pure code)
# Days 15-21: Conversion Killers & Real Production Disasters (Forms, PDFs, mobile UX, database locks)
# Days 22-28: Sprint Discipline, Contracts & The 7-Day Guarantee (Risk reversal, fixed pricing, velocity)
# Days 29-30: Mastery, Scale & The Uncoded Standard (Craftsmanship, longevity, compounding)

def generate_all_posts():
    # Slot 1: 09:00 AM - Morning Razor
    slot1_rows = []
    
    # Slot 2: 12:00 PM - Architecture Teardown (Uncoded Hub Theme)
    slot2_rows = []
    
    # Slot 3: 03:00 PM - 5-Point Listicle
    slot3_rows = []
    
    # Slot 4: 06:00 PM - Contrarian Truths
    slot4_rows = []
    
    # Slot 5: 09:00 PM - Midnight Founder Wisdom (Uncoded Hub Theme)
    slot5_rows = []
    
    # Slot 6: 12:00 AM - Midnight Engineering Log
    slot6_rows = []
    
    # Master Zernio scheduling rows
    zernio_rows = []

    content_data = [
        # DAY 1
        {
            "day": 1,
            "s1": {
                "hook": "Your best clients do not reject you on discovery calls.",
                "subtext": "They reject you 48 hours earlier on their phone when your website takes 5 seconds to load.",
                "punchline": "In high-ticket services, speed is your first test of competence."
            },
            "s2": {
                "title": "WordPress Bloat vs. Uncoded Bespoke Code",
                "left_hdr": "WORDPRESS BLOAT", "left_1": "38 Active Plugins", "left_2": "4.8s Mobile Load", "left_3": "32/100 Core Web Vitals",
                "right_hdr": "UNCODED BESPOKE CODE", "right_1": "0 Plugins Required", "right_2": "0.7s Mobile Load", "right_3": "100/100 Core Web Vitals",
                "quote": "Every extra second costs 20% of high-intent clients."
            },
            "s3": {
                "title": "5 Technical Red Flags Leaking High-Ticket Deals",
                "p1": "Mobile load time exceeding 2.0 seconds",
                "p2": "Shifted layout during render (failing CLS)",
                "p3": "Broken tap targets on mobile thumb-zones",
                "p4": "42MB PDF portfolio attached via WhatsApp",
                "p5": "Burying direct booking link under 4 menus"
            },
            "s4": {
                "badge": "7-DAY SPRINT // LATE MEANS FREE",
                "headline": "Why Traditional Agencies Take 12 Weeks to Ship 5 Pages",
                "ph1": "Week 1–3:", "dt1": "Sales meetings & scope inflation",
                "ph2": "Week 4–7:", "dt2": "Junior intern assembling a bloated theme",
                "ph3": "Week 11–12:", "dt3": "Broken slow site launched anyway",
                "guarantee": "We killed hourly billing. 7-day fixed sprints. Late means 100% free."
            },
            "s5": {
                "quote": "Masters eliminate friction until nothing more can be removed. Elegance is speed.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The $40,000 WordPress Crash at 11:42 PM",
                "sum1": "A routine WooCommerce auto-update triggered a database lock during a flash sale.",
                "sum2": "18 minutes of downtime cost 340 completed transactions.",
                "lesson": "Never let third-party plugins manage mission-critical revenue. Hardcode your core.",
                "status": "RESOLVED", "duration": "00:18:00", "impact": "$40,000"
            }
        },
        # DAY 2
        {
            "day": 2,
            "s1": {
                "hook": "Nobody hires an expensive specialist with an amateur storefront.",
                "subtext": "If you charge $5,000 for advisory or design, your website cannot look like a weekend DIY project.",
                "punchline": "Perceived value starts at your URL, not during contract negotiation."
            },
            "s2": {
                "title": "The Mobile Thumb-Zone vs. Desktop Award Design",
                "left_hdr": "DESKTOP AGENCY MINDSET", "left_1": "Heavy 4K Video Backgrounds", "left_2": "Hidden Hamburger Nav Menus", "left_3": "Parallax Scroll Hijacking",
                "right_hdr": "MOBILE THUMB REALITY", "right_1": "82% Users Browse One-Handed", "right_2": "1-Tap Direct WhatsApp Route", "right_3": "Sub-Second Thumb-Reach CTA",
                "quote": "Design for human thumbs, not design award judges."
            },
            "s3": {
                "title": "5 Reasons Elementor Sites Bleed Mobile Conversions",
                "p1": "40+ nested container divs per section",
                "p2": "Unused JavaScript loaded on every single page",
                "p3": "Render-blocking CSS preventing first paint",
                "p4": "External Google Fonts loaded without font-display swap",
                "p5": "Auto-updating plugins that silently corrupt layouts"
            },
            "s4": {
                "badge": "CONTRACTUAL TERMS // ZERO RISK",
                "headline": "Why We Contractually Guarantee Launch Deadlines",
                "ph1": "Typical Agency:", "dt1": "Vague delivery estimates with zero penalties",
                "ph2": "Uncoded Standard:", "dt2": "Day 7 at 8:00 PM IST hard contractual deadline",
                "ph3": "The Consequence:", "dt3": "Missed by 1 minute? Entire invoice is 100% free",
                "guarantee": "True senior engineers take all delivery risk onto their own shoulders."
            },
            "s5": {
                "quote": "A client evaluates your operational rigor long before they evaluate your service.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Silent Font Request That Leaked 2.1 Seconds",
                "sum1": "14 separate Google Font weights loaded across 2 external domains on page load.",
                "sum2": "Browser wasted 4 Round-Trip Times (RTT) before painting the first letter of copy.",
                "lesson": "Self-host strictly used woff2 glyphs. Drop latin-extended subsets. Save 200KB instantly.",
                "status": "OPTIMIZED", "duration": "00:09:30", "impact": "-2.1s LCP"
            }
        },
        # DAY 3
        {
            "day": 3,
            "s1": {
                "hook": "If your site takes 4 seconds, you just lost 40% of your buyers.",
                "subtext": "Google's data is undeniable: bounce rates spike 90% as load time moves from 1s to 5s.",
                "punchline": "You cannot out-market slow code. Fix your digital foundation first."
            },
            "s2": {
                "title": "Lighthouse 100/100 Benchmark vs. Industry Average",
                "left_hdr": "AVERAGE AGENCY PORTFOLIO", "left_1": "Largest Contentful Paint: 4.2s", "left_2": "Cumulative Layout Shift: 0.28", "left_3": "Total Blocking Time: 840ms",
                "right_hdr": "UNCODED BESPOKE BENCHMARK", "right_1": "Largest Contentful Paint: < 0.8s", "right_2": "Cumulative Layout Shift: 0.00", "right_3": "Total Blocking Time: 0ms",
                "quote": "When Google measures 100/100 speed, organic search authority compounds."
            },
            "s3": {
                "title": "5 Things High-Ticket Buyers Check in 10 Seconds",
                "p1": "Instant proof of previous tier-1 clients",
                "p2": "Exact delivery timeframe without sales ambiguity",
                "p3": "Clear scope of work stated in plain language",
                "p4": "Frictionless calendar link without 12-field forms",
                "p5": "Clean typography that reflects executive discipline"
            },
            "s4": {
                "badge": "COMMERCIAL REALITY // NO FLUFF",
                "headline": "The Death of the 12-Page Corporate Brochure Website",
                "ph1": "The Fluff:", "dt1": "Nobody clicks 'Vision 2030' or 'Our Heritage'",
                "ph2": "The Reality:", "dt2": "Buyers want 1 focused page with proof & clarity",
                "ph3": "The Outcome:", "dt3": "1 high-converting architecture page outperforms 12 pages",
                "guarantee": "Cut the digital noise. Guide your prospect to one inevitable decision."
            },
            "s5": {
                "quote": "A fast site says: 'I respect your time.' A slow site says: 'I don't care about your schedule.'",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The 12MB PNG Hero Image That Killed 60% Mobile Leads",
                "sum1": "A luxury interior designer uploaded an uncompressed camera-raw render to their hero section.",
                "sum2": "Mobile visitors on 4G cellular waited 6.4 seconds staring at a blank white screen.",
                "lesson": "Compress to modern AVIF/WebP. Enforce explicit width/height. Never trust raw uploads.",
                "status": "REPAIRED", "duration": "00:12:00", "impact": "+44% INQUIRIES"
            }
        },
        # DAY 4
        {
            "day": 4,
            "s1": {
                "hook": "A 42MB PDF attachment sent over WhatsApp is a deal killer.",
                "subtext": "Your prospect opens WhatsApp in transit on weak 4G. The download stalls. They hire your competitor.",
                "punchline": "Replace heavy attachments with a sub-second private digital client portal."
            },
            "s2": {
                "title": "WhatsApp 1-Tap Routing vs. Shared Email Form",
                "left_hdr": "TRADITIONAL CONTACT FORM", "left_1": "10 Mandatory Form Fields", "left_2": "Emails Sent to Shared Box", "left_3": "Average Reply Time: 72 Hours",
                "right_hdr": "UNCODED DUAL ROUTING", "right_1": "Direct 1-Tap WhatsApp Chat", "right_2": "Instant Google Meet Sync", "right_3": "Zero Friction Lead Capture",
                "quote": "Capture high-intent buyers before their curiosity cools down."
            },
            "s3": {
                "title": "5 Copywriting Tweaks That Double Discovery Calls",
                "p1": "Replace 'Book a Consultation' with 'Check Availability'",
                "p2": "State your delivery timeline directly in the hero headline",
                "p3": "Display client logos with direct links to verified work",
                "p4": "Add a 1-tap WhatsApp chat button for instant questions",
                "p5": "Put your pricing floor above the fold to repel bad fits"
            },
            "s4": {
                "badge": "AGENCY SECRETS // THE RETAINER TRAP",
                "headline": "Why Agencies Sell Monthly Maintenance Retainers",
                "ph1": "The Secret:", "dt1": "They build fragile WordPress sites so they keep breaking",
                "ph2": "The Trap:", "dt2": "Charging ₹25,000/month just to click 'Update Plugins'",
                "ph3": "Our Model:", "dt3": "Compiled static code that never breaks, hacks, or crashes",
                "guarantee": "Zero maintenance retainers. You own your code forever."
            },
            "s5": {
                "quote": "Clarity always beats cleverness in high-ticket transactions.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Hidden Zombie Script That Froze Checkout",
                "sum1": "An abandoned analytics pixel from 2022 began throwing unhandled Promise rejections.",
                "sum2": "Checkout CTA button click listener was blocked on iOS Safari devices.",
                "lesson": "Audit third-party tags quarterly. Isolate scripts with web workers. Don't block the main thread.",
                "status": "PURGED", "duration": "00:22:00", "impact": "RESTORED CTA"
            }
        },
        # DAY 5
        {
            "day": 5,
            "s1": {
                "hook": "Stop selling vitamins when your clients need a painkiller.",
                "subtext": "Nobody buys cardiovascular supplements during a midnight migraine. They want relief right now.",
                "punchline": "Name your client's exact burning problem and deliver an immediate remedy."
            },
            "s2": {
                "title": "Compiled Jamstack vs. Heavy PHP Database Calls",
                "left_hdr": "DYNAMIC PHP/SQL ARCHITECTURE", "left_1": "Database Query on Every Visit", "left_2": "Server Overhead & Memory Leaks", "left_3": "Vulnerable to SQL Injection & Bots",
                "right_hdr": "PRE-RENDERED EDGE ASSETS", "right_1": "Globally Cached on Edge CDN", "right_2": "Zero Database Latency on Views", "right_3": "100% Immutable & Unhackable",
                "quote": "Serve static pre-compiled assets. Let global edge caches handle the scale."
            },
            "s3": {
                "title": "5 Layout Mistakes That Destroy Trust Instantly",
                "p1": "Conflicting fonts with 4 different serif/sans styles",
                "p2": "Inconsistent margin spacing between sections",
                "p3": "Low contrast gray text that is unreadable in sunlight",
                "p4": "Stock photos of generic handshakes and glass buildings",
                "p5": "Auto-playing video headers with sudden loud audio"
            },
            "s4": {
                "badge": "DELIVERY SPEED // SENIOR SPRINT",
                "headline": "Why We Only Deploy 7-Day Sprints",
                "ph1": "Day 1–2:", "dt1": "Scope lock, wireframes & high-converting copy",
                "ph2": "Day 3–5:", "dt2": "Pure hand-coded engineering & responsive testing",
                "ph3": "Day 6–7:", "dt3": "Speed optimization, 100/100 Lighthouse & live DNS",
                "guarantee": "No 4-month agency drag. Clean, disciplined, production deployment."
            },
            "s5": {
                "quote": "Simplicity is prerequisite for reliability. Complex architectures hide amateur engineering.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Cumulative Layout Shift That Misdirected 120 Clicks",
                "sum1": "An unsized top promo banner popped in 1.4 seconds after initial paint.",
                "sum2": "Visitors trying to click 'View Projects' accidentally tapped the privacy policy link.",
                "lesson": "Reserve layout dimensions with CSS aspect-ratio. Zero layout shifts, zero lost intent.",
                "status": "FIXED", "duration": "00:07:15", "impact": "CLS 0.00"
            }
        },
        # DAY 6
        {
            "day": 6,
            "s1": {
                "hook": "Cheap web design is the most expensive mistake a founder makes.",
                "subtext": "Saving ₹40,000 on an amateur freelancer costs you ₹10,00,000 in lost high-ticket clients.",
                "punchline": "You do not save money on poor infrastructure. You just pay in lost revenue."
            },
            "s2": {
                "title": "Bespoke Code vs. Drag-and-Drop Page Builders",
                "left_hdr": "DRAG & DROP BUILDERS", "left_1": "Generates 15MB of Sloppy HTML", "left_2": "Locked Inside Proprietary Ecosystem", "left_3": "Slow Monthly Licensing Fees",
                "right_hdr": "BESPOKE CLEAN CODE", "right_1": "Sub-400KB Featherweight Bundle", "right_2": "100% Clean Code Ownership", "right_3": "Zero Monthly Builder Subscriptions",
                "quote": "True digital assets are built on open web standards, not proprietary lock-in."
            },
            "s3": {
                "title": "5 Reasons High-Net-Worth Clients Disqualify You",
                "p1": "Your site fails to load within 3 seconds on their iPhone",
                "p2": "Your case studies lack hard metrics and verified outcomes",
                "p3": "Your branding looks like a generic ThemeForest clone",
                "p4": "You force them to download an external presentation",
                "p5": "You have broken links or blurry unoptimized images"
            },
            "s4": {
                "badge": "ACCOUNTABILITY // ZERO EXCUSES",
                "headline": "What 'Late Means Free' Actually Means",
                "ph1": "The Agreement:", "dt1": "Fixed scope and fixed 7-day launch date in writing",
                "ph2": "The Deadline:", "dt2": "Day 7 at 8:00 PM IST with staging verification",
                "ph3": "The Penalty:", "dt3": "If we miss it by 60 seconds: $0 owed. Site is yours free.",
                "guarantee": "We put our entire fee on the line because our engineering never fails."
            },
            "s5": {
                "quote": "When your packaging is chaotic, your expertise is discounted. When flawless, price resistance disappears.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Cache Invalidation Bug That Stalled a ₹15L Launch",
                "sum1": "Cloudflare cached old API pricing endpoints with a 72-hour TTL during a product revamp.",
                "sum2": "High-intent early-bird prospects saw stale error screens on payment checkout.",
                "lesson": "Implement precise cache-control headers. Always tie asset busting to Git commit hashes.",
                "status": "PURGED", "duration": "00:14:00", "impact": "REVIVED LAUNCH"
            }
        },
        # DAY 7
        {
            "day": 7,
            "s1": {
                "hook": "Your website headline should take 3 seconds to understand, not 30.",
                "subtext": "If your prospect needs a dictionary to figure out what you do, they have already closed the tab.",
                "punchline": "In premium consulting, clarity always beats corporate jargon."
            },
            "s2": {
                "title": "Boutique Focus vs. Generalist Agency Chaos",
                "left_hdr": "GENERALIST AGENCIES", "left_1": "'We do SEO, Apps, Logos & Web'", "left_2": "Farms Work Out to Junior Interns", "left_3": "Takes 3 Months with Mediocre Output",
                "right_hdr": "UNCODED HUB BOUTIQUE", "right_1": "Bespoke High-Ticket Architecture Only", "right_2": "Senior Engineers Write Every Line", "right_3": "7-Day Sprint with Speed Guarantee",
                "quote": "Do one thing with extraordinary precision."
            },
            "s3": {
                "title": "5 Technical Traps That Kill Google Mobile SEO",
                "p1": "Failing Largest Contentful Paint (> 2.5s threshold)",
                "p2": "Layout shifting when third-party ad scripts inject",
                "p3": "Buttons positioned too close together for thumb tap",
                "p4": "Slow server response time (TTFB exceeding 600ms)",
                "p5": "Missing mobile viewport meta tags"
            },
            "s4": {
                "badge": "RADICAL SIMPLICITY // ZERO DEBT",
                "headline": "Why We Ban Third-Party WordPress Themes",
                "ph1": "The Reality:", "dt1": "Themes package 50,000 lines of code you never use",
                "ph2": "The Consequence:", "dt2": "Endless plugin conflicts and security patch panics",
                "ph3": "The Antidote:", "dt3": "Hand-coded semantic HTML and lean custom CSS",
                "guarantee": "Fast. Secure. Beautiful. Built strictly for your exact offer."
            },
            "s5": {
                "quote": "Discipline is the product. When you eliminate bloat, velocity takes care of itself.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Memory Leak That Crashed Node.js at 2:00 AM",
                "sum1": "An unclosed event listener in a custom SSR middleware accumulated 1.8GB heap memory.",
                "sum2": "Server restarted every 40 minutes under moderate traffic spikes.",
                "lesson": "Prefer pre-rendered static edge generation over stateful long-lived node servers.",
                "status": "PATCHED", "duration": "00:26:00", "impact": "HEAP STABLE"
            }
        },
        # DAY 8
        {
            "day": 8,
            "s1": {
                "hook": "The fastest way to increase your prices is to improve your packaging.",
                "subtext": "A mediocre service with elite visual packaging commands 3x higher fees than a master craftsman trapped inside an amateur website.",
                "punchline": "Packaging sets the anchor price before you speak a single word."
            },
            "s2": {
                "title": "Edge CDN Hosting vs. Cheap Shared Hosting",
                "left_hdr": "CHEAP SHARED CPANEL", "left_1": "Single Server in One Location", "left_2": "Crashes When 50 Visitors Arrive", "left_3": "Average TTFB Exceeding 1.4s",
                "right_hdr": "GLOBAL EDGE NETWORK", "right_1": "300+ Edge Locations Worldwide", "right_2": "Infinitely Scalable Traffic Handling", "right_3": "Sub-50ms Time to First Byte",
                "quote": "Host on the global edge. Deliver instant speed to clients anywhere in the world."
            },
            "s3": {
                "title": "5 Red Flags in Your Agency's Pitch Deck",
                "p1": "Refusal to provide a hard launch deadline in the contract",
                "p2": "Hourly billing that incentivizes them to work slower",
                "p3": "Recommending bloated WordPress plugins for basic features",
                "p4": "No mention of Core Web Vitals or mobile speed guarantees",
                "p5": "Senior salesperson sells you; junior intern builds your site"
            },
            "s4": {
                "badge": "PRICING POWER // VALUE ANCHOR",
                "headline": "Why Elite Boutique Studios Charge 5x More",
                "ph1": "Amateur Presence:", "dt1": "Forces you into commoditized price negotiations",
                "ph2": "Elite Architecture:", "dt2": "Establishes category leadership before the call",
                "ph3": "The ROI:", "dt3": "One high-ticket client pays for your entire web build",
                "guarantee": "Your website is not an expense. It is your primary pricing asset."
            },
            "s5": {
                "quote": "True luxury is the absence of unnecessary friction.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Webpack Chunk Bloat That Snuck Past Code Review",
                "sum1": "An entire un-tree-shaken Lodash library was bundled into the critical path.",
                "sum2": "Main bundle grew from 180KB to 720KB overnight, delaying first paint.",
                "lesson": "Enforce strict bundle-size CI checks. Fail builds automatically if budget exceeds 200KB.",
                "status": "PURGED", "duration": "00:08:45", "impact": "-540KB BUNDLE"
            }
        },
        # DAY 9
        {
            "day": 9,
            "s1": {
                "hook": "If your site looks like everyone else's, you will compete on price like everyone else.",
                "subtext": "Templated WordPress themes make distinct boutique studios look like generic commodities.",
                "punchline": "Bespoke digital architecture is your defense against price erosion."
            },
            "s2": {
                "title": "Clean CSS Architecture vs. 40 External Stylesheets",
                "left_hdr": "TYPICAL CMS SITE", "left_1": "3.4MB of Unused CSS Rules", "left_2": "Multiple Conflicting !important Tags", "left_3": "Render Blocked for 1.8 Seconds",
                "right_hdr": "UNCODED BESPOKE CSS", "right_1": "Sub-25KB Purged CSS Bundle", "right_2": "Clean Design System Tokens", "right_3": "Instant 0.2s First Contentful Paint",
                "quote": "Ship only the CSS your user actually sees. Delete the rest."
            },
            "s3": {
                "title": "5 Rules of High-Converting Mobile UX",
                "p1": "Primary call-to-action button anchored in the bottom thumb zone",
                "p2": "Tap targets at least 48x48px with generous padding",
                "p3": "Zero horizontal scrolling on any mobile screen width",
                "p4": "Phone numbers and WhatsApp links set as 1-tap direct dials",
                "p5": "High-contrast text readable in direct outdoor sunlight"
            },
            "s4": {
                "badge": "SPEED ENGINEERING // REAL METRICS",
                "headline": "Why We Obsess Over Core Web Vitals",
                "ph1": "Google's Stance:", "dt1": "Page experience is an explicit ranking factor",
                "ph2": "The Reality:", "dt2": "90% of agency websites fail mobile Core Web Vitals",
                "ph3": "Our Guarantee:", "dt3": "Every Uncoded site ships with 90+ verified mobile scores",
                "guarantee": "We measure what matters: speed, stability, and conversion."
            },
            "s5": {
                "quote": "Elegance is not about adding ornamentation. It is about making the complex feel effortless.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Silent DNS Propagation Lag That Delayed a Launch",
                "sum1": "Default 86,400s (24h) TTL on nameservers caused inconsistent SSL cert validation globally.",
                "sum2": "Some clients saw security warnings while others loaded the staging site.",
                "lesson": "Drop DNS TTL to 300s 48 hours prior to launch. Instant seamless cutovers.",
                "status": "SYNCED", "duration": "00:15:00", "impact": "GLOBAL 100% SSL"
            }
        },
        # DAY 10
        {
            "day": 10,
            "s1": {
                "hook": "Your website is your only employee who never sleeps, calls in sick, or complains.",
                "subtext": "Give it the speed, design, and conversion architecture it needs to close clients around the clock.",
                "punchline": "Invest in your 24/7 salesperson. The returns compound forever."
            },
            "s2": {
                "title": "Modern Micro-Animations vs. Distracting Bloat",
                "left_hdr": "SLOPPY JAVASCRIPT ANIMATIONS", "left_1": "Scroll-Lagging Parallax Scripts", "left_2": "High CPU Utilization on Phones", "left_3": "Fails Low-Power Battery Mode",
                "right_hdr": "HARDWARE ACCELERATED CSS", "right_1": "GPU-Rendered Transforms Only", "right_2": "Smooth 60 FPS Fluid Transitions", "right_3": "Zero JavaScript Main Thread Lag",
                "quote": "Subtle motion guides the eye. Heavy animations distract the buyer."
            },
            "s3": {
                "title": "5 Tech Audits Every Founder Should Run Today",
                "p1": "Run your URL through Google PageSpeed Insights on Mobile",
                "p2": "Inspect your page size in Network tab (is it over 1.5MB?)",
                "p3": "Test booking a call from your phone on cellular 4G",
                "p4": "Check if your layout shifts while images load",
                "p5": "Verify your contact form sends an instant notification"
            },
            "s4": {
                "badge": "RISK REVERSAL // PURE CONFIDENCE",
                "headline": "Why Traditional Agencies Hate Fixed Pricing",
                "ph1": "The Agency Model:", "dt1": "Bid low, then bill endless hours for 'scope changes'",
                "ph2": "The Uncoded Model:", "dt2": "Fixed sprint investment locked before Day 1 begins",
                "ph3": "The Outcome:", "dt3": "Zero surprise invoices. 7-day launch. Late means free.",
                "guarantee": "Fixed price. Fixed timeline. 100% accountability."
            },
            "s5": {
                "quote": "Respect given to the buyer in the first three seconds builds trust for the next three years.",
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": "The Third-Party Chat Widget That Stole 1.6MB of RAM",
                "sum1": "An unoptimized live chat iframe pulled 24 scripts and 3 iframes on initial load.",
                "sum2": "Mobile scroll stuttered on older iPhones, causing 28% drop-off.",
                "lesson": "Lazy-load non-critical widgets on user interaction or after scroll intent.",
                "status": "OPTIMIZED", "duration": "00:11:30", "impact": "SMOOTH 60FPS"
            }
        }
    ]

    # Topics for Days 11 to 30
    topics_day11_30 = [
        # Day 11
        ("The 'Contact Us' page is where high-ticket deals go to die.",
         "Burying your booking calendar behind a generic contact form creates 3 days of email latency.",
         "High-intent buyers buy on momentum. Remove every obstacle.",
         "Calendar Sync vs Contact Form", "3-Day Email Delay", "Lost Buyer Momentum", "Manual Back-and-Forth", "1-Tap Direct Calendar", "Real-Time Availability", "Zero Scheduling Friction",
         "5 Conversion Leaks on Service Pages", ["No direct case study links", "Vague deliverable descriptions", "Missing founder direct contact", "Generic stock photography", "No transparent turnaround time"],
         "Why We Build in Pure TypeScript & HTML", "Framework churn creates technical debt", "Bloated dependencies break builds", "Clean code standards outlast trends",
         "The best code is the code you never had to write.",
         "The Unhandled Promise That Swallowed Lead Forms", "Form submission threw silent console error on Safari", "6 qualified leads lost over the weekend", "Always wrap fetch handlers in try/catch with fallback UI", "PATCHED", "00:16:00", "RECOVERED LEADS"),

        # Day 12
        ("Your portfolio should showcase outcomes, not just pretty pictures.",
         "Clients do not hire you for aesthetics alone. They hire you for the commercial result your design creates.",
         "Frame your past work around revenue, speed, and client authority.",
         "Outcome Portfolios vs Dribbble Art", "Pretty visual mockups only", "Zero commercial metrics", "Attracts low-budget inquiries", "Hard conversion numbers", "Verified business impact", "Attracts high-paying clients",
         "5 Ways to Turn Your Site into a Closing Machine", ["Showcase verified client ROI", "Display a clear 7-day sprint timeline", "Highlight your 'Late Means Free' guarantee", "Provide a direct WhatsApp line", "State who you do NOT work with"],
         "Why We Reject Scope Creep on Day 1", "Unclear scope leads to 6-month delays", "Scope creep inflates costs silently", "Clear boundaries guarantee 7-day shipping",
         "Speed is not about rushing. Speed is about removing unnecessary friction.",
         "The Broken CORS Policy That Blocked Lead Ingestion", "Subdomain API endpoint rejected cross-origin form headers", "3 inbound client submissions failed silently", "Configure explicit CORS whitelist on edge router", "RESOLVED", "00:08:00", "API HEALTHY"),

        # Day 13
        ("If you have to explain where to click, your UI has already failed.",
         "Intuitive design requires zero cognitive effort. The next step should be unmistakable.",
         "Make the high-value action the most natural action on the page.",
         "Clear Visual Hierarchy vs Cluttered Portals", "Competing buttons everywhere", "Confusing navigation labels", "Overwhelmed visitors bounce", "Single unmistakable call to action", "Effortless reading rhythm", "Visitors take action instantly",
         "5 Usability Flaws That Frustrate Mobile Visitors", ["Sticky banners blocking 30% of screen", "Forms requiring manual address entry", "Small font sizes under 14px", "Unresponsive image galleries", "Popups that cannot be closed on mobile"],
         "Why We Refuse to Use External Framework Bloat", "Heavy UI libraries ship 90% unused code", "Slows down critical render path", "Custom lightweight CSS runs faster",
         "Simplicity of interface is the ultimate expression of engineering craft.",
         "The Image Aspect Ratio Bug That Broke Mobile Grids", "Missing aspect-ratio CSS caused severe layout collapse on resize", "Mobile visitors saw overlapping image cards", "Enforce CSS aspect-ratio container standards", "FIXED", "00:06:00", "CLEAN MOBILE"),

        # Day 14
        ("A 100/100 Lighthouse score is not a vanity metric. It is a moat.",
         "When your site loads in 600ms, Google ranks you higher and your visitors never bounce.",
         "Performance is the highest-leverage competitive advantage you can own.",
         "Sub-Second Performance vs Sluggish Load", "4.5s average mobile wait", "40% bounce rate before paint", "Lower organic search ranking", "650ms instant mobile paint", "Sub-5% bounce rate", "Highest organic authority",
         "5 Performance Benchmarks Your Site Must Pass", ["First Contentful Paint under 0.8s", "Largest Contentful Paint under 1.2s", "Cumulative Layout Shift strictly 0.00", "Total Blocking Time strictly 0ms", "Total page bundle weight under 500KB"],
         "Why Senior Engineers Code Without Plugins", "Plugins are other people's untested code", "Security vulnerabilities compound", "Custom code gives 100% control",
         "Mastery means knowing what to leave out, not what to cram in.",
         "The Unoptimized Video Hero That Consumed 45MB Data", "Background video loop loaded full 1080p stream on cellular", "Mobile users experienced severe frame drops", "Replace with compressed WebM/MP4 with poster image", "OPTIMIZED", "00:19:00", "BUNDLE -42MB"),

        # Day 15
        ("High-ticket clients do not browse. They evaluate and decide.",
         "They are busy executives looking for evidence that you are the safest choice.",
         "Give them proof, clarity, and a frictionless path to hire you.",
         "Executive Portals vs Casual Brochure Sites", "Endless text with zero proof", "Vague promises and corporate buzzwords", "High drop-off rate", "Concrete case studies and metrics", "Direct founder access", "Fast commercial decisions",
         "5 Trust Triggers for High-Ticket Websites", ["Verified client logos and testimonials", "A transparent delivery timeline", "A clear contractual guarantee", "High-contrast, professional typography", "Instant, zero-friction communication channels"],
         "Why We Deliver Staging Sites on Day 5", "Allows 48 hours for exhaustive testing", "Zero rush on launch day", "Ensures 100% flawless deployment",
         "True authority does not shout. It presents clear evidence and lets the client choose.",
         "The Redis Cache Crash That Stalled Lead Ingestion", "Redis memory exhaustion caused job queue backup", "Lead alerts were delayed by 45 minutes", "Set memory max-limits and LRU eviction policy", "RESOLVED", "00:13:00", "QUEUE NORMAL"),

        # Day 16
        ("If your website looks dated, clients assume your methods are dated too.",
         "Visual polish reflects operational excellence. An obsolete site suggests stagnant skills.",
         "Modernize your digital presence to match your true level of expertise.",
         "Modern Minimalist Design vs 2018 Cluttered Themes", "Heavy drop shadows and gradients", "Cluttered multi-level navigation", "Feels like an outdated template", "Crisp typographic hierarchy", "Generous negative space", "Feels like an elite boutique studio",
         "5 Signs Your Website Is Repelling Premium Clients", ["It takes longer than 3 seconds to load", "It looks identical to your competitors' sites", "It lacks recent case studies or proof", "The mobile experience feels clunky", "There is no clear next step for the buyer"],
         "Why We Avoid Premature Optimization", "Build the core architecture cleanly first", "Measure real performance bottlenecks", "Optimize with surgical precision",
         "Craftsmanship is doing it right even when no one is watching.",
         "The Sticky Header That Blocked Form Inputs on iOS", "Fixed position header covered input focus on mobile keyboard pop", "Users could not see what they were typing", "Implement CSS scroll-padding-top and dynamic viewport units", "FIXED", "00:07:30", "IOS FORM OK"),

        # Day 17
        ("Don't make clients guess what you charge. Anchor value early.",
         "Ambiguous pricing invites unqualified leads and repels serious decision-makers.",
         "State your investment range clearly to filter for high-intent buyers.",
         "Transparent Value Anchors vs Hidden Pricing", "No pricing info anywhere", "Attracts budget-sensitive tire-kickers", "Wastes hours on discovery calls", "Clear investment floor displayed", "Filters out unqualified prospects", "Attracts ready-to-invest clients",
         "5 Ways to Pre-Qualify Leads on Your Landing Page", ["Display your minimum project investment", "Specify who your service is NOT for", "Outline your required client commitment", "Ask 2 qualifying questions before booking", "Showcase work done for similar tier clients"],
         "Why We Write Custom Semantic Markup", "Improves screen reader accessibility", "Boosts organic SEO crawling speed", "Provides clean structure for styling",
         "Clarity is kindness. Tell your prospect exactly what to expect.",
         "The Uncompressed SVG That Froze the DOM", "Complex architectural floorplan SVG with 85,000 path nodes", "Mobile browser froze for 3.2 seconds parsing vectors", "Simplify SVG paths and convert complex vectors to WebP", "OPTIMIZED", "00:11:00", "DOM SMOOTH"),

        # Day 18
        ("Your digital presence should command respect before you utter a word.",
         "First impressions anchor the negotiation. A world-class website sets a high bar.",
         "Never let inferior packaging undermine your superior craft.",
         "Authority Architecture vs Generic Storefront", "Amateur layout and inconsistent styling", "Looks like a side project", "Invites aggressive fee bargaining", "Editorial typography and razor-sharp speed", "Looks like a category leader", "Commands premium pricing with ease",
         "5 Details That Make a Website Feel Ultra-Premium", ["Refined typographic hierarchy with contrasting weights", "Consistent margin and padding grid discipline", "Subtle, hardware-accelerated micro-interactions", "High-contrast, accessible color palette", "Blazing fast page transitions"],
         "Why We Enforce Mobile-First Development", "Over 80% of executive traffic is mobile", "Designing for desktop first creates mobile debt", "Mobile constraints force extreme clarity",
         "When your standard is excellence, speed is simply a natural byproduct.",
         "The Viewport Meta Tag Bug That Scaled Text Incorrectly", "Missing user-scalable parameter caused text overflow on tablet", "Layout looked fragmented on iPad portrait mode", "Standardize responsive viewport meta configurations", "CORRECTED", "00:05:00", "TABLET OK"),

        # Day 19
        ("A slow website is an active tax on every marketing dollar you spend.",
         "You pay for ads and outreach, only for half your traffic to bounce before the page loads.",
         "Stop funding traffic into a broken, leaking bucket.",
         "High-Velocity Funnel vs Leaky Legacy Site", "5-second load times lose 40% of traffic", "Fragmented mobile layout kills conversions", "High customer acquisition cost", "Sub-second load retains 95% of visitors", "Frictionless mobile paths convert smoothly", "Maximum ROI on every marketing rupee",
         "5 Costly Technical Mistakes Founders Overlook", ["Ignoring mobile Core Web Vitals", "Relying on slow, unoptimized shared hosting", "Using heavy, uncompressed image assets", "Neglecting broken link checks across pages", "Failing to test forms on mobile devices"],
         "Why We Use Git-Backed Atomic Deployments", "Zero downtime during production updates", "Instant rollback if an issue arises", "Complete audit trail of every code change",
         "Reliability is not an accident. It is the result of disciplined systems.",
         "The SSL Certificate Expiry That Blacklisted a Domain", "Auto-renewal failed due to broken ACME challenge route", "Chrome displayed terrifying red security warning screen", "Automate Let's Encrypt with redundant DNS verification", "RENEWED", "00:10:00", "SSL SECURE"),

        # Day 20
        ("Clients don't buy your process. They buy certainty of outcome.",
         "Spare them the technical jargon. Promise a specific result delivered by a specific date.",
         "Certainty is the rarest and most valuable commodity in service business.",
         "Certainty-Driven Offers vs Vague Time & Materials", "Open-ended hourly billing", "Ambiguous launch dates", "Client carries all financial risk", "Fixed sprint fee with clear scope", "Guaranteed 7-day launch date", "Agency takes all delivery risk",
         "5 Ways to De-Risk Your Offer for High-Ticket Clients", ["Offer a contractual 'Late Means Free' guarantee", "Deliver verified 90+ Lighthouse speed scores", "Provide a dedicated staging site for early review", "Include 30 days of complimentary post-launch support", "Showcase testimonials with verified revenue impact"],
         "Why We Limit Sprints to Two Clients at a Time", "Guarantees 100% dedicated senior focus", "Prevents context switching and delays", "Maintains uncompromising code quality",
         "Focus is saying no to a hundred good ideas to execute one great one.",
         "The Database Connection Pool Leak at Midnight", "Unclosed pool connections reached AWS RDS limit of 100", "New visitors saw generic 500 Internal Server Error", "Implement connection timeout and automatic reaper hooks", "RESOLVED", "00:17:30", "POOL HEALTHY"),

        # Day 21
        ("Your website should filter out bad fits as aggressively as it attracts good ones.",
         "A landing page that tries to appeal to everyone ends up appealing to no one.",
         "Be polarizing in your positioning to attract your ideal client.",
         "Polarizing High-Ticket Positioning vs Vanilla Generalist", "'We help everyone build great websites'", "Attracts low-budget, demanding clients", "Drains team energy and margins", "'We build bespoke sites for high-ticket firms in 7 days'", "Repels tire-kickers and low budgets", "Attracts dream clients ready to pay",
         "5 Red Flags in Prospects You Should Reject", ["Asking for discounts before seeing scope", "Demanding 12-page sites with zero clear goal", "Refusing to commit to a 7-day feedback rhythm", "Insisting on using bloated WordPress page builders", "Believing web design is a commodity expense"],
         "Why We Test Across 12 Device Viewports", "Ensures flawless rendering on every screen", "Catches edge-case layout shifts early", "Guarantees universal visual excellence",
         "Positioning is sacrifice. The more specific you are, the more powerful your pull.",
         "The Mobile Safari 100vh Scroll Bug", "Classic iOS Safari viewport height caused bottom CTA to hide under bar", "Users could not tap the primary action button", "Adopt modern dvh (dynamic viewport height) units", "RESOLVED", "00:06:15", "IOS PERFECT"),

        # Day 22
        ("The 'Late Means Free' guarantee is our ultimate test of engineering discipline.",
         "When your entire fee is at stake, you eliminate excuses and execute with military precision.",
         "Accountability changes how you work.",
         "Contractual Accountability vs Agency Excuses", "Endless delay emails and scope creep fights", "Missed deadlines with zero consequences", "Client left stranded with broken site", "Day 7 at 8 PM hard contractual deadline", "Late by 1 minute? Entire fee is $0", "Senior engineers ship with 100% confidence",
         "5 Reasons Agencies Refuse to Guarantee Deadlines", ["Their teams rely on junior offshore interns", "They don't understand their own tech stack", "They bloated the scope to bill more hours", "They lack a standardized sprint framework", "They are afraid of taking financial risk"],
         "Why We Use Modular Design Tokens", "Ensures consistent colors, fonts, and spacing", "Enables rapid, error-free UI updates", "Keeps codebase lean and maintainable",
         "When you have nothing to hide, you guarantee your work without hesitation.",
         "The Font Flash (FOUT) That Shifted Text Layout", "Web font loaded late without fallback metrics match", "Text jumped 18px down, failing CLS audit", "Match fallback font metrics using size-adjust in CSS", "OPTIMIZED", "00:08:00", "CLS 0.00"),

        # Day 23
        ("In high-ticket sales, friction is the invisible killer of momentum.",
         "Every extra form field, slow-loading script, or buried link cuts your conversion in half.",
         "Remove the friction and watch your inbound pipeline flourish.",
         "Frictionless Conversion vs High-Friction Gateways", "12-field form requiring company size and budget", "Email back-and-forth over 4 days", "Lead interest evaporates", "1-tap WhatsApp route or instant calendar sync", "Real-time conversation within minutes", "High conversion from intent to client",
         "5 Friction Points You Must Eliminate Today", ["Contact forms asking for unnecessary information", "Broken or slow-loading portfolio images", "Missing direct booking links on mobile", "PDF attachments that require downloading", "Vague pricing that creates anxiety"],
         "Why We Ship Zero-Dependency Code", "Eliminates third-party supply chain risks", "Guarantees lightning-fast execution", "Future-proofs your digital assets",
         "Elegance is the elimination of friction at every touchpoint.",
         "The Unhandled Webhook Timeout That Delayed Onboarding", "Payment webhook timed out after 30s under network latency", "Client did not receive automatic portal access email", "Implement idempotent queue worker with exponential backoff", "RESOLVED", "00:14:45", "WEBHOOK STABLE"),

        # Day 24
        ("Your digital storefront should reflect your pricing, not your past.",
         "Many founders still use websites from when their fees were 1/5th of what they charge today.",
         "Upgrade your digital packaging to match your current market value.",
         "Modern High-Ticket Storefront vs Legacy Startup Site", "Designed when services were ₹50,000", "Looks DIY and makeshift", "Forces awkward price conversations", "Re-engineered for ₹5,00,000+ offerings", "Commands immediate executive respect", "Justifies premium fees effortlessly",
         "5 Signs Your Website Is Anchoring You to Low Fees", ["It features outdated projects from 3 years ago", "The typography feels generic and unpolished", "It lacks prominent, verified client testimonials", "It does not clearly articulate your unique edge", "It takes longer than 2 seconds to load"],
         "Why We Hand-Craft Every Component", "No generic, off-the-shelf templates", "Tailored to your specific brand identity", "Built for maximum performance and conversion",
         "Your URL is the front door of your business. Keep it spotless.",
         "The Broken OpenGraph Tag That Mangled Social Previews", "Malformed og:image meta tag showed gray placeholder on LinkedIn", "Shared links looked broken in executive message threads", "Automate dynamic 1200x630 OG image generation", "CORRECTED", "00:09:00", "PREVIEWS RICH"),

        # Day 25
        ("Speed of delivery is the ultimate competitive advantage.",
         "While your competitors spend 3 months talking about a website, we have already shipped yours.",
         "Move fast. Ship clean. Capture the market.",
         "7-Day Sprint Delivery vs 3-Month Agency Drag", "12 weeks of scope meetings and delays", "High burn rate and lost market opportunity", "Frustration and delayed revenue", "7 business days from kickoff to live deployment", "Immediate market presence and lead capture", "High momentum and early returns",
         "5 Ways Fast Shipping Transforms Your Business", ["You test and validate messaging immediately", "You capture high-intent buyers while interest is hot", "You save months of wasted team bandwidth", "You establish category velocity over competitors", "You eliminate the anxiety of endless redesigns"],
         "Why We Freeze Scope After Kickoff", "Protects the 7-day launch guarantee", "Forces sharp focus on core value", "Eliminates scope creep and delays",
         "Velocity compounds. The faster you ship, the faster you learn.",
         "The Unoptimized Font Subset That Bloated Bundle Size", "Included full Cyrillic and Vietnamese glyph sets in English site", "Added 95KB of unused binary font data to first load", "Restrict unicode-range strictly to Basic Latin and punctuation", "OPTIMIZED", "00:06:45", "BUNDLE -95KB"),

        # Day 26
        ("A great website is not an art project. It is an engine of commerce.",
         "Its sole purpose is to convert qualified visitors into paying clients.",
         "Never sacrifice speed, clarity, or conversion for superficial decoration.",
         "Conversion-Focused Architecture vs Vanity Design", "Flashy animations that slow down the page", "Vague headlines that confuse the reader", "Wins design awards but zero clients", "Blazing-fast load times and crisp typography", "Unmistakable value proposition and proof", "Drives consistent high-ticket inquiries",
         "5 Conversion Principles for Service Businesses", ["Lead with the burning problem you solve", "Provide concrete proof above the fold", "Make the next step obvious and effortless", "Ensure mobile performance is sub-second", "Remove all unnecessary distractions"],
         "Why We Audit Core Web Vitals on Every Build", "Guarantees Google search engine compliance", "Ensures zero visual layout shifts", "Delivers an unmatched user experience",
         "Form follows function. In digital architecture, function is conversion.",
         "The Content Security Policy Bug That Blocked Analytics", "Overly strict script-src directive rejected Google Tag Manager", "No conversion events recorded for 8 hours", "Refine CSP directives with explicit cryptographic nonces", "RESOLVED", "00:11:30", "TAGS VERIFIED"),

        # Day 27
        ("The best websites are built by senior engineers, not junior interns.",
         "Traditional agencies sell you with senior partners and pass your build to trainees.",
         "At Uncoded Hub, senior architects write every single line of code.",
         "Senior Architecture vs Junior Assembly", "Built with 35 plugins and bloated templates", "Fragile, slow, and prone to breaking", "Requires endless maintenance fees", "Hand-crafted with clean, semantic markup", "Fast, secure, and rock-solid", "Zero monthly maintenance needed",
         "5 Questions to Ask Before Hiring an Agency", ["Who specifically will be writing my code?", "Do you contractually guarantee launch dates?", "What mobile Lighthouse score do you guarantee?", "Will my site rely on third-party WordPress plugins?", "Do I own 100% of my code upon launch?"],
         "Why We Build With Zero External Dependencies", "Immunity from third-party vulnerability exploits", "Sub-second execution speeds across all devices", "Complete architectural freedom and control",
         "Quality is never an accident. It is always the result of intelligent effort.",
         "The CSS Specificity War That Broke Button Hover States", "Multiple !important declarations created conflicting styles", "Button hover state turned transparent on dark mode", "Refactor CSS using clean BEM naming and zero !important", "FIXED", "00:07:00", "HOVER CLEAN"),

        # Day 28
        ("In a world of noise, radical simplicity is the ultimate differentiator.",
         "Cut through the clutter with clean design, lightning speed, and clear messaging.",
         "Stand out by being effortlessly clear.",
         "Radical Simplicity vs Cluttered Chaos", "Dozens of animations, popups, and badges", "Overwhelmed visitors don't know where to look", "High bounce rate and lost trust", "Clean layout, generous space, sharp typography", "Visitor's focus drawn naturally to your offer", "High engagement and instant trust",
         "5 Steps to Declutter Your Website Today", ["Remove all non-essential popups and banners", "Cut your headline copy by 50% for punchy impact", "Eliminate all unused third-party tracking scripts", "Consolidate multiple CTA buttons into one clear path", "Ensure your font pairings don't exceed two typefaces"],
         "Why We Use Fraunces and Inter Typography", "Fraunces delivers editorial warmth and authority", "Inter guarantees flawless readability on screens", "Creates a cohesive, high-end visual tone",
         "Perfection is achieved not when there is nothing more to add, but when nothing is left to take away.",
         "The Broken Anchor Link That Dropped 40% Mobile Form Clicks", "ID hash mismatch between sticky nav and mobile section", "Users clicked 'Book Call' and stayed on top of page", "Standardize semantic section IDs and smooth-scroll CSS", "RESOLVED", "00:04:30", "NAV FLAWLESS"),

        # Day 29
        ("Your website is the single most enduring asset in your digital ecosystem.",
         "Social algorithms change daily, but your website remains under your complete ownership.",
         "Build a digital fortress that compounds value for years to come.",
         "Owned Digital Asset vs Rented Social Land", "Subject to algorithm changes and account bans", "Zero control over platform layout or rules", "Ephemeral content forgotten in 24 hours", "100% owned digital real estate", "Bespoke architecture tailored to your brand", "Permanent conversion asset that compounds",
         "5 Long-Term Benefits of Bespoke Web Architecture", ["Zero vulnerability to third-party plugin hacks", "Immunity to sudden platform pricing increases", "Effortless scalability as traffic increases", "Superior organic search authority over time", "A premium asset that increases enterprise value"],
         "Why We Don't Build on Proprietary Builders", "Avoids vendor lock-in and migration headaches", "Preserves full ownership of your IP", "Guarantees maximum performance and security",
         "Build on rock, not on sand. Own your digital foundation.",
         "The Unchecked Memory Leak in Node.js Cluster", "Worker processes did not restart gracefully on max memory", "Server response time degraded by 3.4 seconds over 24 hours", "Configure PM2 auto-restart on memory limit threshold", "STABILIZED", "00:15:00", "SUB-50MS TTFB"),

        # Day 30
        ("The Uncoded Hub Standard: 7 Days. 100/100 Speed. Late Means Free.",
         "We set out to prove that web architecture can be fast, disciplined, and uncompromisingly elite.",
         "Thank you for following along on this 30-day journey of clean code and high performance.",
         "The Uncoded Standard vs The Status Quo", "12-week delays, 38 plugins, slow mobile load", "Endless excuses and billable hours", "Fragile sites that break in months", "7-day sprint, 0 plugins, sub-second load", "Contractual 'Late Means Free' guarantee", "Bespoke digital architecture that lasts years",
         "5 Core Beliefs That Drive Uncoded Hub", ["Speed is not a feature; it is competence", "Design discipline reflects operational rigor", "Contractual accountability builds true trust", "Clean code outlasts temporary design trends", "Simplicity is the ultimate sophistication"],
         "Why We Stand Behind Every Single Line of Code", "We don't use shortcuts, bloat, or templates", "Every build is engineered to the highest standard", "Your success is our reputation in the market",
         "The standard you walk past is the standard you accept. Never settle for slow.",
         "The Final Production Audit: 100/100 Across All Vitals", "Exhaustive automated crawl across all 30 days of deployments", "Zero broken links, zero CLS shifts, sub-800ms LCP verified", "Full architectural integrity delivered for all client platforms", "VERIFIED", "00:00:00", "100/100 ALL VITALS")
    ]

    for idx, t in enumerate(topics_day11_30):
        day_num = idx + 11
        content_data.append({
            "day": day_num,
            "s1": {"hook": t[0], "subtext": t[1], "punchline": t[2]},
            "s2": {
                "title": t[3],
                "left_hdr": "LEGACY APPROACH", "left_1": t[4], "left_2": t[5], "left_3": t[6],
                "right_hdr": "UNCODED BESPOKE", "right_1": t[7], "right_2": t[8], "right_3": t[9],
                "quote": "Bespoke architecture delivers lasting conversion advantages."
            },
            "s3": {
                "title": t[10],
                "p1": t[11][0], "p2": t[11][1], "p3": t[11][2], "p4": t[11][3], "p5": t[11][4]
            },
            "s4": {
                "badge": "7-DAY SPRINT // LATE MEANS FREE",
                "headline": t[12],
                "ph1": "The Problem:", "dt1": t[13],
                "ph2": "The Trap:", "dt2": t[14],
                "ph3": "The Standard:", "dt3": t[15],
                "guarantee": "We killed hourly billing. 7-day fixed sprints. Late means 100% free."
            },
            "s5": {
                "quote": t[16],
                "sig": "— Deepak, Uncoded Hub"
            },
            "s6": {
                "headline": t[17],
                "sum1": t[18],
                "sum2": t[19],
                "lesson": t[20],
                "status": t[21], "duration": t[22], "impact": t[23]
            }
        })

    # Assemble rows for all 6 slots and Zernio
    for c in content_data:
        day_num = c["day"]
        post_date = (START_DATE + timedelta(days=day_num - 1)).strftime("%Y-%m-%d")

        # SLOT 1 (09:00 AM) - Morning Razor
        slot1_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "09:00",
            "Slot_Kicker": "MORNING RAZOR // 09:00 AM",
            "Hook_Headline": c["s1"]["hook"],
            "Subtext": c["s1"]["subtext"],
            "Boxed_Punchline": c["s1"]["punchline"],
            "Footer": "@founderdeepak • uncodedhub.com"
        })

        # SLOT 2 (12:00 PM) - Architecture Teardown (Uncoded Hub Theme)
        slot2_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "12:00",
            "Slot_Kicker": "ARCHITECTURE TEARDOWN // BENCHMARK",
            "Teardown_Title": c["s2"]["title"],
            "Left_Header": c["s2"]["left_hdr"],
            "Left_Item_1": c["s2"]["left_1"],
            "Left_Item_2": c["s2"]["left_2"],
            "Left_Item_3": c["s2"]["left_3"],
            "Right_Header": c["s2"]["right_hdr"],
            "Right_Item_1": c["s2"]["right_1"],
            "Right_Item_2": c["s2"]["right_2"],
            "Right_Item_3": c["s2"]["right_3"],
            "Bottom_Quote": c["s2"]["quote"]
        })

        # SLOT 3 (03:00 PM) - 5-Point Listicle
        slot3_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "15:00",
            "Slot_Kicker": "TECHNICAL AUDIT // 5 RED FLAGS",
            "Listicle_Title": c["s3"]["title"],
            "Point_01": c["s3"]["p1"],
            "Point_02": c["s3"]["p2"],
            "Point_03": c["s3"]["p3"],
            "Point_04": c["s3"]["p4"],
            "Point_05": c["s3"]["p5"],
            "Footer_Note": "Save this for your next site audit • @founderdeepak"
        })

        # SLOT 4 (06:00 PM) - Contrarian Truths
        slot4_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "18:00",
            "Badge_Tag": c["s4"]["badge"],
            "Contrarian_Headline": c["s4"]["headline"],
            "Timeline_Phase_1": c["s4"]["ph1"],
            "Timeline_Detail_1": c["s4"]["dt1"],
            "Timeline_Phase_2": c["s4"]["ph2"],
            "Timeline_Detail_2": c["s4"]["dt2"],
            "Timeline_Phase_3": c["s4"]["ph3"],
            "Timeline_Detail_3": c["s4"]["dt3"],
            "Guarantee_Punchline": c["s4"]["guarantee"]
        })

        # SLOT 5 (09:00 PM) - Midnight Founder Wisdom (Uncoded Hub Theme)
        slot5_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "21:00",
            "Slot_Eyebrow": "FOUNDER WISDOM // 21:00 IST",
            "Quote_Body": c["s5"]["quote"],
            "Author_Signature": c["s5"]["sig"]
        })

        # SLOT 6 (12:00 AM / Midnight) - Midnight Engineering Log
        slot6_rows.append({
            "Day": day_num,
            "Date": post_date,
            "Slot_Time": "23:59",
            "Terminal_Timestamp": "[00:00:00 IST] // PRODUCTION POST-MORTEM",
            "Log_Headline": c["s6"]["headline"],
            "Incident_Summary_1": c["s6"]["sum1"],
            "Incident_Summary_2": c["s6"]["sum2"],
            "Lesson_Learned": c["s6"]["lesson"],
            "Status": c["s6"]["status"],
            "Duration": c["s6"]["duration"],
            "Impact": c["s6"]["impact"]
        })

        # Build Zernio rows for all 6 slots with exact image mappings
        raw_github_base = "https://raw.githubusercontent.com/founderdeepak/uncodedhub/main/linkedIn_Master/deepak_180_instagram_campaign/images/"
        
        slots = [
            ("09:00", c["s1"]["hook"], f"{c['s1']['hook']}\n\n{c['s1']['subtext']}\n\n{c['s1']['punchline']}\n\n#WebPerformance #HighTicketSales #FounderMindset #WebEngineering #CoreWebVitals", f"Day{day_num:02d}_09AM_MorningRazor.png"),
            ("12:00", c["s2"]["title"], f"{c['s2']['title']}\n\n{c['s2']['left_hdr']}:\n• {c['s2']['left_1']}\n• {c['s2']['left_2']}\n• {c['s2']['left_3']}\n\n{c['s2']['right_hdr']}:\n• {c['s2']['right_1']}\n• {c['s2']['right_2']}\n• {c['s2']['right_3']}\n\n{c['s2']['quote']}\n\n#CleanCode #ArchitectureTeardown #WebDevelopment #UncodedHub #NoBloat", f"Day{day_num:02d}_12PM_ArchitectureTeardown.png"),
            ("15:00", c["s3"]["title"], f"{c['s3']['title']}:\n\n1. {c['s3']['p1']}\n2. {c['s3']['p2']}\n3. {c['s3']['p3']}\n4. {c['s3']['p4']}\n5. {c['s3']['p5']}\n\nAudit your digital foundation before scaling ad spend.\n\n#WebsiteAudit #UXDesign #ConversionOptimization #BoutiqueFirm #EngineeringMatters", f"Day{day_num:02d}_03PM_5PointListicle.png"),
            ("18:00", c["s4"]["headline"], f"{c['s4']['headline']}\n\n• {c['s4']['ph1']} {c['s4']['dt1']}\n• {c['s4']['ph2']} {c['s4']['dt2']}\n• {c['s4']['ph3']} {c['s4']['dt3']}\n\n{c['s4']['guarantee']}\n\n#RiskReversal #SprintDelivery #ContractualGuarantee #LateMeansFree #AgencyReality", f"Day{day_num:02d}_06PM_ContrarianTruths.png"),
            ("21:00", c["s5"]["quote"][:50] + "...", f"\"{c['s5']['quote']}\"\n\n{c['s5']['sig']}\n\n#ExecutivePresence #Craftsmanship #FounderPhilosophy #DeepakReflections #UncodedHub", f"Day{day_num:02d}_09PM_FounderWisdom.png"),
            ("23:59", c["s6"]["headline"], f"[PRODUCTION INCIDENT REPORT // 00:00 IST]\n\n{c['s6']['headline']}\n\nSummary:\n• {c['s6']['sum1']}\n• {c['s6']['sum2']}\n\nCore Takeaway:\n{c['s6']['lesson']}\n\nStatus: {c['s6']['status']} | Duration: {c['s6']['duration']} | Impact: {c['s6']['impact']}\n\n#DevOps #WebArchitecture #SystemOutage #CleanCodeOnly #EngineeringLog", f"Day{day_num:02d}_12AM_MidnightLog.png")
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

    # Write Slot 1 CSV
    f1 = os.path.join(OUTPUT_DIR, "01_slot_09am_morning_razor_30.csv")
    with open(f1, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot1_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot1_rows)
    print(f"Written: {f1} ({len(slot1_rows)} rows)")

    # Write Slot 2 CSV
    f2 = os.path.join(OUTPUT_DIR, "02_slot_12pm_architecture_teardown_30.csv")
    with open(f2, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot2_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot2_rows)
    print(f"Written: {f2} ({len(slot2_rows)} rows)")

    # Write Slot 3 CSV
    f3 = os.path.join(OUTPUT_DIR, "03_slot_03pm_5point_listicle_30.csv")
    with open(f3, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot3_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot3_rows)
    print(f"Written: {f3} ({len(slot3_rows)} rows)")

    # Write Slot 4 CSV
    f4 = os.path.join(OUTPUT_DIR, "04_slot_06pm_contrarian_truths_30.csv")
    with open(f4, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot4_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot4_rows)
    print(f"Written: {f4} ({len(slot4_rows)} rows)")

    # Write Slot 5 CSV
    f5 = os.path.join(OUTPUT_DIR, "05_slot_09pm_founder_wisdom_30.csv")
    with open(f5, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot5_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot5_rows)
    print(f"Written: {f5} ({len(slot5_rows)} rows)")

    # Write Slot 6 CSV
    f6 = os.path.join(OUTPUT_DIR, "06_slot_12am_midnight_log_30.csv")
    with open(f6, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(slot6_rows[0].keys()))
        writer.writeheader()
        writer.writerows(slot6_rows)
    print(f"Written: {f6} ({len(slot6_rows)} rows)")

    # Write Master Zernio CSV
    fz = os.path.join(OUTPUT_DIR, "master_deepak_180_zernio_schedule.csv")
    with open(fz, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(zernio_rows[0].keys()))
        writer.writeheader()
        writer.writerows(zernio_rows)
    print(f"Written: {fz} ({len(zernio_rows)} rows)")

if __name__ == "__main__":
    generate_all_posts()
