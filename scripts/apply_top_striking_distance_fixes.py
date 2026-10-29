import os
import re

base_dir = r"c:\Users\LENOVO\Downloads\uncoded-hub"

# 1. Update real-estate-website-speed.md
p1 = os.path.join(base_dir, "src", "content", "blog", "real-estate-website-speed.md")
with open(p1, "r", encoding="utf-8") as f:
    c1 = f.read()

c1_updated = re.sub(
    r'title: ".*?"',
    'title: "What Page Load Speed Should a Real Estate Website Achieve? (2026 Benchmarks)"',
    c1, count=1
)
c1_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "A modern real estate website must achieve under 2.5 seconds LCP on mobile. Learn exact Google speed benchmarks, image compression rules, and how speed drives buyer enquiries."',
    c1_updated, count=1
)
c1_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "what page load speed should real estate site achieve, real estate website speed, real estate web strategy, property listing page speed, high converting web architecture"',
    c1_updated, count=1
)
c1_updated = c1_updated.replace(
    '## The short answer',
    '## What Page Load Speed Should a Modern Real Estate Website Achieve?\n\n> [!IMPORTANT]\n> **Target Benchmark:** Under **2.5 seconds LCP (Largest Contentful Paint)** on mobile 4G, **INP under 200 milliseconds**, and **CLS under 0.1**.'
)
with open(p1, "w", encoding="utf-8") as f:
    f.write(c1_updated)
print("Updated real-estate-website-speed.md")

# 2. Update consultant-work-with-me-page.md
p2 = os.path.join(base_dir, "src", "content", "blog", "consultant-work-with-me-page.md")
with open(p2, "r", encoding="utf-8") as f:
    c2 = f.read()

c2_updated = re.sub(
    r'title: ".*?"',
    'title: "Work With Me Consultant Page: What It Must Say to Book High-Ticket Clients"',
    c2, count=1
)
c2_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Structure a high-converting \'Work With Me\' page for consultants. The 3-part blueprint, objection-handling framework, and exact copy that converts visitors into booked calls."',
    c2_updated, count=1
)
c2_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "work with me consultant, consultant work with me page, consulting website architecture, coaches consultants website design, high converting web architecture"',
    c2_updated, count=1
)
c2_updated = c2_updated.replace(
    '## The short answer',
    '## What a Consultant \'Work With Me\' Page Must Actually Say\n\n> [!TIP]\n> A high-converting consultant work with me page requires three components: **(1) A clear engagement sequence**, **(2) Direct pre-emption of cost and timeline hesitations**, and **(3) A singular, high-contrast booking CTA**.'
)
with open(p2, "w", encoding="utf-8") as f:
    f.write(c2_updated)
print("Updated consultant-work-with-me-page.md")

# 3. Update best-website-builder-for-architects.md
p3 = os.path.join(base_dir, "src", "content", "blog", "best-website-builder-for-architects.md")
with open(p3, "r", encoding="utf-8") as f:
    c3 = f.read()

c3_updated = re.sub(
    r'title: ".*?"',
    'title: "Best Website Builders for Architects: 2026 Comparison & Review"',
    c3, count=1
)
c3_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Compare the best website builders for architects in 2026: Squarespace vs Webflow vs WordPress vs Custom React. Test high-res image load speeds, portfolio SEO, and RFP intake."',
    c3_updated, count=1
)
c3_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "best website builders for architects, architect site builder, architect website builder, best website builder for architects, interior design website, high converting web architecture"',
    c3_updated, count=1
)
# Add comparison table before "## Treat the DIY site as an experiment"
table_md = """## Architect Website Builder Comparison Matrix (2026)

| Platform | Mobile LCP Speed | High-Res Portfolio SEO | Technical Overhead | Best For |
| :--- | :---: | :---: | :---: | :--- |
| **Squarespace** | 3.5s – 5.2s (Slow) | Basic / Clumsy | Zero (Drag & Drop) | Solo architects pre-revenue (MVP) |
| **Webflow** | 2.2s – 3.8s (Moderate) | Good | High learning curve | Design-heavy boutique studios |
| **WordPress** | 3.0s – 6.5s (Plugin Bloat) | High maintenance | Constant updates & security | Legacy firms with dedicated webmaster |
| **Custom React / Vite (Uncoded Hub)** | **0.6s – 1.2s (Instant)** | **Advanced Schema & 1-Hop Silos** | **Zero (7-Day Handcrafted Delivery)** | **Growing practices competing for institutional commissions & RFPs** |

"""
if "## Architect Website Builder Comparison Matrix" not in c3_updated:
    c3_updated = c3_updated.replace("## Treat the DIY site as an experiment", table_md + "## Treat the DIY site as an experiment")

with open(p3, "w", encoding="utf-8") as f:
    f.write(c3_updated)
print("Updated best-website-builder-for-architects.md")

# 4. Update medical-advertising-ethics-before-after-photos-india.md
p4 = os.path.join(base_dir, "src", "content", "blog", "medical-advertising-ethics-before-after-photos-india.md")
with open(p4, "r", encoding="utf-8") as f:
    c4 = f.read()

c4_updated = re.sub(
    r'title: ".*?"',
    'title: "Medical Advertising Ethics in India: NMC & Dental Council Rules (2026)"',
    c4, count=1
)
c4_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Can doctors show before/after photos in India? Complete 2026 guide to NMC & Dental Council advertising rules, legal photo consent, and avoiding license penalties."',
    c4_updated, count=1
)
c4_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "medical advertising ethics, nmc advertising guidelines for doctors, dental council advertising ethics, dental clinic web architecture, high converting web architecture"',
    c4_updated, count=1
)
with open(p4, "w", encoding="utf-8") as f:
    f.write(c4_updated)
print("Updated medical-advertising-ethics-before-after-photos-india.md")

# 5. Update property-listing-page-design.md
p5 = os.path.join(base_dir, "src", "content", "blog", "property-listing-page-design.md")
with open(p5, "r", encoding="utf-8") as f:
    c5 = f.read()

c5_updated = re.sub(
    r'title: ".*?"',
    'title: "Property Listing Page Design: High-Converting Real Estate Layout (2026)"',
    c5, count=1
)
c5_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "How to design an individual real estate listing page that books site visits. Exact specs table, carpet vs super built-up rules, and WhatsApp lead buttons."',
    c5_updated, count=1
)
c5_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "listing page, property listing page design, real estate listing page, real estate web strategy, property listing page speed, high converting web architecture"',
    c5_updated, count=1
)
with open(p5, "w", encoding="utf-8") as f:
    f.write(c5_updated)
print("Updated property-listing-page-design.md")

# 6. Update interior-design-website-cost-india.md
p6 = os.path.join(base_dir, "src", "content", "blog", "interior-design-website-cost-india.md")
with open(p6, "r", encoding="utf-8") as f:
    c6 = f.read()

c6_updated = re.sub(
    r'title: ".*?"',
    'title: "Interior Design Website Cost in India (2026 Price Breakdown)"',
    c6, count=1
)
c6_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "How much does an interior design website cost in India? Honest 2026 price breakdown from ₹25,000 to ₹1,50,000, case study costs, and red flags in cheap quotes."',
    c6_updated, count=1
)
c6_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "interior design website cost india, interior design website cost, much should interior design website cost, interior design website, interior designers website design, high converting web architecture"',
    c6_updated, count=1
)
with open(p6, "w", encoding="utf-8") as f:
    f.write(c6_updated)
print("Updated interior-design-website-cost-india.md")

# 7. Update clear-aligners-landing-page-conversion.md
p7 = os.path.join(base_dir, "src", "content", "blog", "clear-aligners-landing-page-conversion.md")
with open(p7, "r", encoding="utf-8") as f:
    c7 = f.read()

c7_updated = re.sub(
    r'title: ".*?"',
    'title: "Invisalign & Clear Aligners Landing Page: 6-Stage Dental Funnel"',
    c7, count=1
)
c7_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Convert adult ortho patients with high-ticket Invisalign landing page architecture. Discover the 6-stage funnel, EMI transparency tables, and 3D smile scan flows."',
    c7_updated, count=1
)
c7_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "invisalign landing, clear aligners landing page, invisalign landing page architecture, dental clinic web architecture, dental clinics website design, high converting web architecture"',
    c7_updated, count=1
)
with open(p7, "w", encoding="utf-8") as f:
    f.write(c7_updated)
print("Updated clear-aligners-landing-page-conversion.md")

# 8. Update conversion-rate-benchmarks-service-business-india.md
p8 = os.path.join(base_dir, "src", "content", "blog", "conversion-rate-benchmarks-service-business-india.md")
with open(p8, "r", encoding="utf-8") as f:
    c8 = f.read()

c8_updated = re.sub(
    r'title: ".*?"',
    'title: "Website Conversion Rate Benchmarks in India (2026 Industry Data)"',
    c8, count=1
)
c8_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Real website conversion rate benchmarks for Indian service businesses: Clinics (5-9%), Real Estate (2-4%), Interior Design (3-5%). Learn how top 10% sites double leads."',
    c8_updated, count=1
)
c8_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "website conversion rate, conversion rate benchmarks india, service business conversion rate, web engineering and conversion, studio website design, high converting web architecture"',
    c8_updated, count=1
)
with open(p8, "w", encoding="utf-8") as f:
    f.write(c8_updated)
print("Updated conversion-rate-benchmarks-service-business-india.md")

# 9. Update modular-kitchen-cost-calculator-lead-generation.md
p9 = os.path.join(base_dir, "src", "content", "blog", "modular-kitchen-cost-calculator-lead-generation.md")
with open(p9, "r", encoding="utf-8") as f:
    c9 = f.read()

c9_updated = re.sub(
    r'title: ".*?"',
    'title: "Modular Kitchen Cost Calculator: 2026 Price Estimator & Guide"',
    c9, count=1
)
c9_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Use this modular kitchen cost calculator to estimate 2026 prices in India (L-shape, U-shape, parallel). Plywood, acrylic, PU finishes and hardware cost breakdown."',
    c9_updated, count=1
)
c9_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "modular kitchen cost calculator, modular kitchen cost, modular kitchen price estimator, home renovation web design, high converting web architecture"',
    c9_updated, count=1
)
with open(p9, "w", encoding="utf-8") as f:
    f.write(c9_updated)
print("Updated modular-kitchen-cost-calculator-lead-generation.md")

# 10. Update seven-day-website-design-is-it-possible.md
p10 = os.path.join(base_dir, "src", "content", "blog", "seven-day-website-design-is-it-possible.md")
with open(p10, "r", encoding="utf-8") as f:
    c10 = f.read()

c10_updated = re.sub(
    r'title: ".*?"',
    'title: "7-Day Website Design: How We Build & Launch Custom Sites on Time"',
    c10, count=1
)
c10_updated = re.sub(
    r'metaDescription: ".*?"',
    'metaDescription: "Can a custom business website be built in 7 days? Learn our day-by-day sprint architecture, client preparation checklist, and contractual late-means-free guarantee."',
    c10_updated, count=1
)
c10_updated = re.sub(
    r'keywords: ".*?"',
    'keywords: "7 day website design, website designing in 7 days, website in 7 days, 7day website design, studio website design, high converting web architecture"',
    c10_updated, count=1
)
with open(p10, "w", encoding="utf-8") as f:
    f.write(c10_updated)
print("Updated seven-day-website-design-is-it-possible.md")

print("\nAll striking distance blogs updated successfully!")
