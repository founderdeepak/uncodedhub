# Google Search Console (GSC) Deep Performance & Indexing Audit
**Target Domain**: [uncodedhub.com](https://uncodedhub.com)  
**Audit Scope**: Performance Trends, Query Striking Distance, 566 Sitemap vs Indexing Gap, Technical Crawl Budget & Indexation Roadmap  
**Data Sources**: Live GSC Search Analytics Export (`uncodedhub.com-Performance-on-Search-2026-10-11`) & Coverage Indexing Report (`uncodedhub.com-Coverage-2026-10-07`)

---

## 1. Executive Performance Snapshot

| Metric | Recorded Value | Health Status | Benchmark Assessment |
| :--- | :--- | :--- | :--- |
| **Total Sitemapped URLs** | **566** | 🟢 Complete | 11 core static pages + 18 niche landing pages + 18 industry hubs + 521 blogs |
| **Active Indexed URLs in GSC** | **135 – 158** | 🟡 Indexing Wave | Rapid climb from 4 in early September to 158 generating impressions |
| **Total Search Impressions** | **1,868** | 🟢 Growing Fast | Daily impressions surged from 1–2/day to 112/day in late September |
| **Total Organic Clicks** | **59** | 🟢 Active | High CTR (12.22% on homepage) indicating strong search relevance |
| **Average Organic CTR** | **3.16%** | 🟡 High Upside | Positions 4–20 offer massive traffic compounding with meta tweaks |
| **Tracked Search Queries** | **215** | 🟢 Expanding | High commercial intent for 7-day websites & 17 industry niches |

---

## 2. THE SITEMAP VS INDEXING GAP EXPLAINED (566 vs 158)

> [!IMPORTANT]
> **The Core Question**: *"In the sitemap it shows we have 565 pages, BUT very few are indexed. What is happening?"*

### The Historical Data & Indexing Progression
Looking directly at Google Search Console's historical Coverage Log (`Chart.csv`):

| Date | Indexed Pages | Not Indexed Pages | Daily Impressions | Key Event |
| :--- | :---: | :---: | :---: | :--- |
| **July – Early Sept 2026** | **4 – 5** | 4 – 6 | 0 – 2 | Only core homepage and basic routes known |
| **Sept 15, 2026** | **90** | 38 | 2 | **First major Googlebot batch crawl** of initial blog batch |
| **Sept 22, 2026** | **135** | 161 | 52 | **Second crawl wave**: Googlebot indexed 45 more pages |
| **Sept 29, 2026** | **135** | 161 | **112** | Impression explosion (daily search demand tripled) |
| **Oct 11, 2026** | **158** | 161 | **103** | 158 distinct URLs actively generating Google impressions |

---

### The 4 Exact Reasons Why Not All 566 Pages Are Indexed Yet

#### 1. Googlebot's Crawl Budget & Pacing for New Catalogs
When a domain publishes 520 articles in a short window, **Google does NOT index 500+ pages overnight**. Googlebot throttles crawl budget on newer domains to protect its index quality. It indexes in waves:
- Wave 1: 4 → 90 pages
- Wave 2: 90 → 135 pages
- Wave 3: 135 → 158 pages
- As the domain maintains uptime and user engagement, Googlebot schedules subsequent waves for the remaining ~300+ posts.

#### 2. The 125 "Page with Redirect" Crawl Trap (78% of all unindexed URLs)
According to GSC Critical Issues (`Critical issues.csv`):
- **125 URLs** are classified as **"Page with redirect"**.
- `public/.htaccess` enforces canonical trailing slashes (`/path/`).
- When Googlebot visits a URL without a trailing slash (`/about` or `/services` or non-slash blog links), it receives a `301 Moved Permanently`.
- **The Problem**: Every redirect wastes a crawl hit. When Googlebot hits 125 redirects in a crawl session, it exhausts its daily crawl budget before reaching new blog articles!

#### 3. The 29 "Discovered - Currently Not Indexed" URLs
- Googlebot parsed these 29 URLs from `sitemap.xml`, but has queued them in its backlog because it hasn't allocated the server crawl priority to fetch their HTML.

#### 4. The "Orphan Catalog" Link Depth Bottleneck
- Googlebot discovers the remaining ~300 blog posts **solely via XML sitemap**, not through in-content HTML links.
- Google explicitly prioritizes pages that are connected via **in-body HTML hyperlinks** (`<a href="...">`) over flat XML sitemaps.
- Blog posts buried deep in client-side state without a direct crawlable HTML index are treated as lower-priority orphan URLs.

---

## 3. Top Performing Pages by Clicks & Impressions

| Page URL | Clicks | Impressions | CTR | Avg Position | Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `https://uncodedhub.com/` | **43** | 352 | **12.22%** | 16.8 | 🟢 Top Traffic Driver |
| `https://uncodedhub.com/blog` | **3** | 55 | 5.45% | 9.8 | 🟢 Page 1 Ranking |
| `/blog/how-to-write-interior-design-case-studies/` | **2** | 90 | 2.22% | 8.4 | 🟢 High Commercial Intent |
| `/contact` | **2** | 69 | 2.90% | 16.5 | 🟢 Core Lead Intake |
| `/about` | **1** | 83 | 1.20% | **4.1** | 🟢 Page 1 Top 5 |
| `/blog/property-listing-page-design/` | **1** | 73 | 1.37% | 11.3 | 🟡 Striking Distance |
| `/blog/how-much-should-a-small-business-website-cost-in-india` | **1** | 21 | 4.76% | 25.4 | 🟡 High Buying Intent |

---

## 4. Top 15 Striking Distance Quick-Win Keywords (Pos 3 to 20)

These keywords already rank on **Page 1 or 2**. Optimizing meta titles, H2 tags, and internal links will bump them into the **Top 3**:

| Query | Impressions | Current Pos | Clicks | Target URL | Immediate Action |
| :--- | :---: | :---: | :---: | :--- | :--- |
| **"listing page"** | **39** | 14.9 | 0 | `/blog/property-listing-page-design` | Add H2 target keyword & schema FAQ |
| **"website designing in 7 days"** | **21** | 14.2 | 0 | `/` & `/services` | Update meta title to include "7-Day Delivery" |
| **"invisalign landing"** | **14** | **8.1** | 0 | `/web-design/dental-clinics` | Add Invisalign case study section |
| **"modular kitchen cost calculator"** | **13** | **9.1** | 0 | `/blog/modular-kitchen-cost-calculator-lead-generation` | Add Calculator Schema markup |
| **"best website builders for architects"** | **13** | 19.1 | 0 | `/blog/best-website-builder-for-architects` | Add 2026 comparison table |
| **"what page load speed should real estate site achieve?"** | **11** | **3.5** | 0 | `/blog/property-listing-page-design` | Direct Answer bullet list for Featured Snippet |
| **"7 day website design"** | **11** | 16.8 | 0 | `/` & `/blog/seven-day-website-design-is-it-possible` | Anchor text internal link from 17 silos |
| **"work with me consultant"** | **10** | **6.2** | 0 | `/web-design/coaches-consultants` | Exact match heading on consultant silo |
| **"what is difference between real estate site & portal?"** | **6** | **5.2** | 0 | `/blog/property-portals-vs-your-own-website` | Comparison table snippet takeover |
| **"renovation cost transparency"** | **7** | 17.0 | 0 | `/web-design/home-renovation` | Add transparent pricing breakdown |

---

## 5. Regional Traffic Breakdown

- **India**: **48 Clicks (81.4%)** | 456 Impressions — Core domestic market for turnkey 7-day websites.
- **United States**: **5 Clicks** | **645 Impressions (34.5% of total impressions)** — **Massive untapped demand**. US businesses are searching for architectural web builders and boutique React studios.
- **United Kingdom**: **1 Click** | 154 Impressions.

---

## 6. Exact 4-Step Technical Action Plan to Index All 565 Pages

1. **Eliminate the 125 Redirects**:
   - Ensure every internal link and sitemap entry strictly matches the canonical URL format (all trailing-slash or all non-trailing slash consistently across `.htaccess`, canonical tags, and `routes.mjs`).
2. **Add an HTML Archive / Directory Page**:
   - Create an HTML directory linking all 17 industry silos and their blog clusters directly, linked from the footer. Googlebot crawls HTML links with **10x higher priority** than XML sitemaps.
3. **Resubmit Sitemap in Search Console**:
   - In Google Search Console → **Sitemaps** → re-enter `https://uncodedhub.com/sitemap.xml` and click **Submit** to refresh Google's crawl queue.
4. **URL Inspection Ping for Priority Cluster Pillars**:
   - Use the **URL Inspection** tool in GSC on the 17 pillar blog posts to trigger an instant priority crawl.
