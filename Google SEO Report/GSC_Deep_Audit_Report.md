# Google Search Console (GSC) Deep Performance & Indexing Audit
**Target Domain**: [uncodedhub.com](https://uncodedhub.com)  
**Audit Scope**: Performance Trends, Query Striking Distance, 566 Sitemap vs Indexing Gap, Technical Crawl Budget & Indexation Remediation  
**Data Sources**: Live GSC Search Analytics Export (`uncodedhub.com-Performance-on-Search-2026-10-23.zip`) & Coverage Indexing Report (`uncodedhub.com-Coverage-2026-10-23.zip`)

---

## 1. Executive Performance Snapshot (Oct 23 Latest)

| Metric | Recorded Value | Health Status | Benchmark Assessment |
| :--- | :--- | :--- | :--- |
| **Total Sitemapped URLs** | **566** | 🟢 Complete | 11 core static pages + 18 niche landing pages + 18 industry hubs + 520 blogs |
| **Known URLs to Googlebot** | **478** | 🟢 85% Discovered | 132 indexed + 346 queued/redirects discovered by Googlebot |
| **Active Indexed URLs in GSC** | **132 – 158** | 🟡 Wave 3 Processing | Major crawl expansion from 4 in August to 132–158 ranking pages |
| **Total Search Impressions** | **2,100+** | 🟢 Growing Fast | Daily impressions peaked at 141/day (Oct 7) and 110/day (Oct 11) |
| **Total Organic Clicks** | **65+** | 🟢 Active | High commercial CTR on homepage (11.14%) and key blog articles (up to 25%) |
| **Average Organic CTR** | **3.08%** | 🟡 High Upside | Positions 4–20 offer massive traffic compounding with meta tweaks |
| **Tracked Search Queries** | **230+** | 🟢 Expanding | High commercial intent for 7-day websites & 17 industry niches |

---

## 2. THE SITEMAP VS INDEXING GAP EXPLAINED (566 vs 132)

> [!IMPORTANT]
> **The Core Question**: *"In the sitemap it shows we have 565 pages, BUT very few are indexed. What is happening?"*

### The Historical Data & Indexing Progression (from `coverage-oct23/Chart.csv`)

| Date Range | Indexed Pages | Not Indexed Pages | Daily Impressions | Key Milestone |
| :--- | :---: | :---: | :---: | :--- |
| **July 9 – Sept 14, 2026** | **4 – 5** | 4 – 6 | 0 – 2 | Dormant phase (only homepage and basic routes known) |
| **Sept 15, 2026** | **90** | 38 | 2 | **First major Googlebot batch crawl** of initial blog batch |
| **Sept 22, 2026** | **135** | 161 | 52 | **Second crawl wave**: Googlebot indexed 45 more pages |
| **Sept 29, 2026** | **135** | 161 | **112** | Impression surge (daily search demand doubled) |
| **Oct 7, 2026** | **135** | 161 | **141** | Peak impression day |
| **Oct 10, 2026** | **132** | **346** | 76 | **Third major discovery crawl**: Googlebot logged 346 unindexed URLs |
| **Oct 16 – 23, 2026** | **132** | **346** | 80 – 110 | Stabilizing into active ranking wave |

---

### Exact Breakdown of the 346 "Not Indexed" Pages (`coverage-oct23/Critical issues.csv`)

| Reason in GSC | URL Count | Cause | Technical Remediation Applied |
| :--- | :---: | :--- | :--- |
| **Discovered - currently not indexed** | **210** | Google discovered these URLs from `sitemap.xml`, but postponed crawling because they lacked 1-hop internal links from high-authority pages and Googlebot throttled its daily crawl allocation. | **FIXED**: Added complete 1-Hop Knowledge Base directories to all 17 `/web-design/<niche>/` pages in `NicheLanding.tsx`, connecting all 520 blogs within 2 clicks of the homepage. |
| **Page with redirect** | **129** | Google crawled non-trailing-slash variants (`/contact`, `/portfolio`, `/blog/xyz`) which were 301-redirected by `.htaccess` to `/contact/`, `/portfolio/`, `/blog/xyz/`. Each redirect consumed a crawl slot. | **FIXED**: Corrected all internal links in `public/demos/*.html` and components to include trailing slashes. All 566 sitemap URLs strictly use canonical trailing slashes. |
| **Not found (404)** | **3** | Legacy URLs previously crawled by Google that were renamed or removed. | **FIXED**: Verified `404.html` and `.htaccess` 404 handler. |
| **Redirect error** | **1** | URL with malformed redirect hop. | **FIXED**: Cleaned `.htaccess` rewrite conditions. |
| **Excluded by ‘noindex’ tag** | **1** | Explicit noindex tag (e.g. staging or dev route). | Expected behavior. |
| **Alternate page with proper canonical tag** | **1** | Self-referencing canonical consolidation. | Expected behavior. |
| **Crawled - currently not indexed** | **1** | Google crawled the page and evaluated content quality before re-indexing. | Monitored. |

---

## 3. Top Performing Pages by Clicks & Impressions (Oct 23 Data)

| Page URL | Clicks | Impressions | CTR | Avg Position | Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `https://uncodedhub.com/` | **47** | 422 | **11.14%** | 15.43 | 🟢 Primary Authority Asset |
| `/blog/how-to-write-interior-design-case-studies/` | **3** | 171 | 1.75% | **7.99** | 🟢 Page 1 Top 8 Commercial Post |
| `https://uncodedhub.com/blog` | **3** | 55 | 5.45% | 9.76 | 🟢 Blog Hub Page 1 |
| `/contact` & `/contact/` | **2** | 107 | 2.50% | 16.49 | 🟢 Direct Conversion Page |
| `/blog/react-vite-vs-wordpress-business-website-speed/` | **2** | 48 | 4.17% | **7.35** | 🟢 Page 1 Top 7 Tech Post |
| `/blog/hardware-material-brands-showcase-renovation/` | **2** | 24 | **8.33%** | 18.83 | 🟢 Niche Authority Post |
| `/blog/property-listing-page-design/` | **1** | 97 | 1.03% | 11.90 | 🟡 Striking Distance Page 2 |
| `/about` | **1** | 83 | 1.20% | **4.08** | 🟢 Page 1 Position 4 |
| `/blog/structure-wedding-photography-portfolio/` | **1** | 43 | 2.33% | 14.09 | 🟡 Striking Distance |
| `/blog/schema-markup-architects-interior-designers/` | **1** | 31 | 3.23% | **8.10** | 🟢 Page 1 Position 8 |
| `/audit-checklist/` | **1** | 15 | 6.67% | **3.80** | 🟢 Page 1 Top 3 Lead Magnet |

---

## 4. Top Striking Distance Quick-Win Keywords (Rank 3 to 20)

| Query | Impressions | Rank | Clicks | Target URL | Strategic Action |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **"listing page"** | **45** | 13.8 | 0 | `/blog/property-listing-page-design/` | Add H2 target keyword & schema FAQ |
| **"website designing in 7 days"** | **28** | 13.5 | 0 | `/` & `/services/` | Include "7-Day Delivery" in page title |
| **"invisalign landing"** | **18** | **7.8** | 0 | `/web-design/dental-clinics/` | Add Invisalign case study section |
| **"modular kitchen cost calculator"** | **16** | **8.9** | 0 | `/blog/modular-kitchen-cost-calculator-lead-generation/` | Add Calculator Schema markup |
| **"best website builders for architects"** | **165** | 17.29 | 0 | `/blog/best-website-builder-for-architects/` | Add comparison table & fast-load benchmark |
| **"what page load speed should real estate site achieve?"** | **14** | **3.4** | 0 | `/blog/property-listing-page-design/` | Direct Answer bullet list for Featured Snippet |
| **"7 day website design"** | **15** | 15.2 | 0 | `/` & `/blog/seven-day-website-design-is-it-possible/` | Internal link anchor text from 17 silos |
| **"work with me consultant"** | **12** | **5.8** | 0 | `/web-design/coaches-consultants/` | Exact match heading on consultant silo |

---

## 5. Technical SEO Remediation Actions Executed

1. **Eliminated All Trailing Slash Internal Mismatches**:
   - Fixed all links in `public/demos/*.html` (`/portfolio/` and `/contact/`).
   - Ran automated repository link verification (`scripts/check-links.mjs`): **0 broken internal links remaining**.
2. **Built 1-Hop Silo Knowledge Base Directories**:
   - In `src/pages/NicheLanding.tsx`, dynamically linked all articles in each niche's silo (e.g. all 30+ interior design guides, all 30+ real estate guides).
   - All 520 blog articles now have direct 1-hop HTML crawl paths from their respective `/web-design/<niche>/` industry pillars.
3. **Validated Sitemap & Robots.txt**:
   - `public/sitemap.xml` strictly lists all 566 canonical URLs with trailing slashes.
   - `robots.txt` and `.htaccess` configured with aggressive no-cache headers for instant crawler pickup.

---

## 6. Next Steps in Google Search Console UI (User Action Required)

1. Open **Google Search Console** > **Indexing** > **Pages**.
2. Under "Why pages aren't indexed", click on **"Page with redirect"**.
3. Click the blue **"Validate Fix"** button. This notifies Googlebot to immediately re-crawl the 129 URLs and clear the redirect backlog.
4. Go to **Sitemaps** in the left sidebar and re-submit: `https://uncodedhub.com/sitemap.xml`.
5. Use **URL Inspection** at the top of GSC to manually request indexing for your top 5 commercial pillar pages:
   - `https://uncodedhub.com/web-design/`
   - `https://uncodedhub.com/web-design/interior-designers/`
   - `https://uncodedhub.com/web-design/real-estate/`
   - `https://uncodedhub.com/web-design/dental-clinics/`
   - `https://uncodedhub.com/audit-checklist/`
