# 🛠️ Site Audit & Defensive SEO Audit Template
### *Based on Edward Sturm's Screaming Frog & Technical SEO Framework*

Use this template to audit any client or internal website. It focuses on the **20% of technical factors that drive 80% of ranking stability**.

---

## 1. Technical Health Checklist (Pre-Audit)

| Audit Item | Standard / Goal | Pass/Fail | Action Required |
| :--- | :--- | :---: | :--- |
| **HTTP to HTTPS Redirect** | Enforced 301 redirect on all variations | [ ] | Check `http://`, `http://www.`, `https://www.` |
| **GSC Verification** | Verified with Domain-level DNS or URL-prefix | [ ] | Ensure all URL variants are claimed in Search Console |
| **Sitemap Index** | Valid XML sitemap referenced in `robots.txt` | [ ] | Split into `page-sitemap.xml` & `post-sitemap.xml` |
| **Robots.txt Hygiene** | Clean crawl rules, no accidental disallows | [ ] | Confirm Googlebot can reach all CSS/JS and public routes |
| **Single H1 Tag Rule** | Exactly ONE `<h1>` per page | [ ] | Screaming Frog check: filter by `H1 Count > 1` or `= 0` |
| **Image Compression** | WebP format, < 100KB per image | [ ] | Compress with TinyPNG, serve responsive srcset |
| **SSR / Hydration** | Search engines receive prerendered static HTML | [ ] | Verify text content is present in raw page source |
| **Crawl Depth** | All important pages reachable in ≤ 2 clicks | [ ] | Screaming Frog: check crawl depth column |

---

## 2. Page-by-Page Audit Sheet

| URL | Delete URL? | Concise Purpose (Internal Use) | New Slug | Current Page Title | New Page Title | Title Length (px/chars) | Current Meta Desc | New Meta Desc | Current H1 | New H1 | Current H2-1 | Current H2-2 | Crawl Depth | Word Count | Inlinks | Updated & Submitted? |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| `/example-page/` | No | Dental Clinic Web Design BOFU | `/services/dental-clinic-web-design/` | Dental Clinic Websites | Dental Clinic Web Design Services \| Uncoded Hub | 54 chars | High performance websites for dentists. | Custom dental clinic web design engineered for sub-second speed, patient trust, and seamless appointment booking. | Websites for Dentists | Dental Clinic Web Design Services | Why Standard Templates Cost Clinics Patient Trust | Custom Engineered Features for Modern Clinics | 1 | 425 | 18 | Yes |

---

## 3. Screaming Frog Configuration Guide
1. **Mode:** Spider
2. **Configuration > Spider > Crawl:** Ensure images, CSS, JavaScript are checked.
3. **Extraction Filters to Flag:**
   * Pages with **Title > 60 characters** or **Width > 580px**.
   * Pages with **Missing Meta Description** or **Meta Description > 155 characters**.
   * Pages with **H1 count = 0** or **H1 count > 1**.
   * Pages with **Crawl Depth > 3**.
   * Orphan pages (pages with **0 Inlinks**).
   * Thin content pages (**Word Count < 200**).

