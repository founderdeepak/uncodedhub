# Google Search Console (GSC) Deep Performance & Indexing Audit
**Target Domain**: [uncodedhub.com](https://uncodedhub.com)  
**Audit Scope**: Performance Trends, Query Striking Distance, Technical Indexing Coverage, Regional Demand & Action Roadmap  
**Data Sources**: Live GSC Search Analytics Export (`uncodedhub.com-Performance-on-Search-2026-10-11`) & Coverage Indexing Report (`uncodedhub.com-Coverage-2026-10-07`)

---

## 1. Executive Performance Snapshot

| Metric | Recorded Value | Health Status | Benchmark Assessment |
| :--- | :--- | :--- | :--- |
| **Total Search Impressions** | **1,868** | 🟢 Growing | Consistent search visibility across commercial & educational queries |
| **Total Organic Clicks** | **59** | 🟢 Active | Strong brand and core landing page click capture |
| **Average Organic CTR** | **3.16%** | 🟡 Opportunity | High upside on Pages 1 & 2 by tuning meta descriptions & titles |
| **Tracked Search Queries** | **215** | 🟢 Expanding | Broad keyword footprint spanning 17 industry niches & web design speed |
| **Indexed / Crawled URLs** | **158** | 🟢 Solid Base | Core pages + initial cluster of 520 blogs actively tracked by Googlebot |

---

## 2. Top Performing Pages

### Top Pages by Clicks (Conversion & Traffic Drivers)
1. **Homepage (`/`)**: **43 clicks** | 352 impressions | **12.22% CTR** | Avg Position: 16.8  
   *Observation*: Exceptional CTR for an average position of 16.8, indicating strong brand authority and CTR from navigational searches.
2. **Blog Hub (`/blog`)**: **3 clicks** | 55 impressions | **5.45% CTR** | Avg Position: 9.8  
   *Observation*: Ranks on Page 1 (Pos 9.8) for foundational directory queries.
3. **Interior Design Case Studies (`/blog/how-to-write-interior-design-case-studies/`)**: **2 clicks** | 90 impressions | **2.22% CTR** | Avg Position: 8.4  
   *Observation*: High commercial intent; interior designers seeking case study frameworks.
4. **Contact Page (`/contact`)**: **2 clicks** | 69 impressions | **2.90% CTR** | Avg Position: 16.5  
5. **About Page (`/about`)**: **1 click** | 83 impressions | **1.20% CTR** | Avg Position: **4.1** (Page 1)  
6. **Property Listing Page Design (`/blog/property-listing-page-design/`)**: **1 click** | 73 impressions | **1.37% CTR** | Avg Position: 11.3  
7. **Small Business Website Cost (`/blog/how-much-should-a-small-business-website-cost-in-india`)**: **1 click** | 21 impressions | **4.76% CTR** | Avg Position: 25.4  

---

## 3. High-Priority "Striking Distance" Keywords (Quick Wins)

These queries rank on **Page 1 or 2 (Positions 3 to 20)** with substantial organic impressions. Pushing these keywords into the **Top 3** yields the fastest traffic compounding:

| Query | Impressions | Current Pos | Clicks | CTR | Recommended Target Page | Action Required |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **"listing page"** | **39** | 14.9 | 0 | 0.0% | `/blog/property-listing-page-design` | Add H2 target keyword & schema FAQ |
| **"website designing in 7 days"** | **21** | 14.2 | 0 | 0.0% | `/` & `/services` | Optimize meta title to include "7-Day Delivery" |
| **"invisalign landing"** | **14** | **8.1** | 0 | 0.0% | `/web-design/dental-clinics` | Mention Invisalign landing structure in intro |
| **"modular kitchen cost calculator"** | **13** | **9.1** | 0 | 0.0% | `/blog/modular-kitchen-cost-calculator-lead-generation` | Add Calculator Schema & snippet preview |
| **"best website builders for architects"** | **13** | 19.1 | 0 | 0.0% | `/blog/best-website-builder-for-architects` | Update title with current year & comparison table |
| **"7 day website design"** | **11** | 16.8 | 0 | 0.0% | `/` & `/blog/seven-day-website-design-is-it-possible` | Internal link from 17 niche pages to 7-day guarantee |
| **"what page load speed should real estate site achieve?"** | **11** | **3.5** | 0 | 0.0% | `/blog/property-listing-page-design` | Optimize for Featured Snippet (bullet list) |
| **"work with me consultant"** | **10** | **6.2** | 0 | 0.0% | `/web-design/coaches-consultants` | Add exact anchor text link on consultant landing page |
| **"what is the difference between real estate site & portal?"** | **6** | **5.2** | 0 | 0.0% | `/blog/property-portals-vs-your-own-website` | Target direct answer snippet (table comparison) |
| **"renovation cost transparency"** | **7** | 17.0 | 0 | 0.0% | `/web-design/home-renovation` | Add H2 on transparent pricing & estimate calculator |

---

## 4. Geographic & Device Insights

### Demand by Region
- **India**: **48 Clicks (81.4%)** | 456 Impressions | Dominant commercial base for turnkey 7-day websites.
- **United States**: **5 Clicks** | **645 Impressions (34.5% of total impressions)** | **Massive untrodden demand** from US businesses searching for boutique web design and architectural builders.
- **United Kingdom**: **1 Click** | 154 Impressions | Growing presence for luxury portfolios and consulting.

> [!TIP]
> **US Market Opportunity**: US searchers generate 645 impressions (the largest single country impression volume). High-ticket international inquiries can be targeted by displaying international currency toggles (USD / INR) on `/pricing` and `/contact`.

### Device Share
- **Desktop**: 1,449 impressions (77.5%) | 40 clicks (67.8%) — B2B decision makers evaluate agency sites on desktop computers during business hours.
- **Mobile**: 411 impressions (22.0%) | 19 clicks (32.2%) — High mobile CTR (4.62%), emphasizing the value of our mobile performance and compressed OpenGraph social share previews.

---

## 5. Technical Indexing Coverage & Remediation

According to the Google Search Console Coverage Audit:

1. **125 URLs: "Page with redirect"**:
   - **Root Cause**: Trailing slash vs non-trailing slash inconsistency (e.g. `/portfolio` vs `/portfolio/` and `/about` vs `/about/`).
   - **Fix**: Canonical tags now strictly enforce standard non-trailing slash URLs. Ensure XML sitemap outputs only standard non-trailing URLs.
2. **29 URLs: "Discovered - currently not indexed"**:
   - **Status**: Google has found these blog pages via internal links or sitemaps but has not yet crawled them due to crawl budget allocation.
   - **Fix**: With our newly completed `llms.txt`, full industry silo cross-linking, and RSS pinging, these will progressively index.
3. **3 URLs: "Not found (404)"**:
   - Check and add 301 redirects for any legacy test URLs in `public/_redirects` or Cloudflare/Hostinger rules.
4. **0 Critical Schema Errors**:
   - All Schema.org `WebSite`, `Organization`, and newly updated `ImageObject` markup validate cleanly.

---

## 6. Immediate SEO Action Items

1. **Title & Meta Tag CTR Optimization**:
   - Update titles for pages ranking in positions 8-15 to include high-CTR power brackets: `[7-Day Delivery]`, `(2026 Guide)`, `[Live Demo + Pricing]`.
2. **Featured Snippet Takeover**:
   - For query `"what page load speed should a modern real estate website achieve?"` (Position 3.5), place a concise 45-word definition block right under the H2.
3. **Sitemap Refresh**:
   - Regenerate and resubmit `sitemap.xml` in GSC to accelerate indexing of the 29 discovered blog URLs.
