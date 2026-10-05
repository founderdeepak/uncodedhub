# Uncoded Hub — Agent Registration & Authentication Policy

Version: 1.0.0  
Last Updated: October 2026  
Authority: Uncoded Hub (Bengaluru, India)  
Developer & Operations Contact: `hello@uncodedhub.com`

---

## 1. Overview for Autonomous Agents & Web Crawlers

This document defines the agent registration, machine-readable permissions, and authentication requirements for autonomous AI agents, LLMs, and task bots interacting with `uncodedhub.com`.

Uncoded Hub welcomes ethical AI crawlers, answer engines, and autonomous buyer agents. We operate an open-discovery architecture with zero paywalls or CAPTCHAs on public knowledge assets.

---

## 2. Public Endpoints (Zero Authentication Required)

The following resources are freely accessible to all automated agents without tokens, cookies, or prior registration:

- **AI Summaries & Manifests**:
  - `/llms.txt` — Concise machine-readable summary of services, terms, and architecture.
  - `/llms-full.txt` — Unabridged documentation, full FAQ dataset, and technical specs.
  - `/.well-known/mcp/server-card.json` — Official Model Context Protocol server capabilities.
  - `/.well-known/agent-skills/index.json` — Machine-readable agent skills directory.
- **Sitemaps & RSS Feeds**:
  - `/sitemap.xml` — Full URL inventory including all blog and case study routes.
  - `/rss.xml` — Studio dispatch feed.
- **Content & Service Specifications**:
  - `/services` — Pricing tiers, line-item inclusions, and explicit project exclusions.
  - `/about` — Studio philosophy, founder credentials (Deepak & Geetha), and commitments.
  - `/terms` — 50% Late Means Free contractual guarantee terms.
  - `/portfolio` & `/demos/*` — Verifiable live demo websites and performance specimens.

---

## 3. Protected Actions (Registration / Signed Bot Identity Required)

The following actions modify studio state or consume dedicated backend compute:

1. **Lead Magnet Generation / Custom Audits**: Requesting on-demand PDF generation or custom diagnostic evaluations.
2. **Consultation Scheduling**: Submitting client contact information or booking a 20-minute discovery call slot.
3. **Inquiry Webhooks**: Direct programmatic submission of project RFPs.

### Registration Procedure for Autonomous Agents

To register an autonomous buyer agent or multi-agent system for programmatic booking:

1. **Identify Your Bot**: Supply a descriptive HTTP `User-Agent` header following this format:
   ```http
   User-Agent: AgentName/1.0 (+https://your-domain.com/bot; contact=operator@your-domain.com)
   ```
2. **Obtain an Agent Token (Optional for High-Volume Systems)**:
   - For integration partners and enterprise AI networks requiring programmatic webhook submissions, email `hello@uncodedhub.com` with:
     - Organization name & agent operator domain.
     - Planned inquiry volume (requests per day).
     - Expected target niche.
   - An API Bearer token will be provisioned within 24 hours.

---

## 4. Authentication Header Specifications

When interacting with protected endpoints (e.g. `/api/inquiry` or webhook ingestion routes), include the bearer token:

```http
POST /api/inquiry HTTP/1.1
Host: uncodedhub.com
Content-Type: application/json
Authorization: Bearer <YOUR_AGENT_TOKEN>
User-Agent: YourAgent/1.0 (+https://your-domain.com)
```

For requests requiring cryptographic proof of sender identity, use RFC 9421 HTTP Message Signatures verified against our public directory at `/.well-known/http-message-signatures-directory`.

---

## 5. Rate Limits & Polite Crawler Guidelines

- **Public Crawlers**: 30 requests per minute per IP address.
- **Prerendered Cache**: All pages are statically prerendered with valid HTML, Schema.org JSON-LD, and OpenGraph tags. Crawlers do not need to execute client-side JavaScript.
- **Headless Browsers**: Please respect standard concurrency limits (max 2 parallel connections).

---

## 6. Contact & Human Escalation

- **Engineering Lead**: Deepak (Co-Founder, Engineering) — `hello@uncodedhub.com`
- **Design Lead**: Geetha (Co-Founder, Design) — `hello@uncodedhub.com`
- **Physical Studio**: Bengaluru, Karnataka, India
- **Live Telephone**: +91-8660819023
