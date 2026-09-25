# Scalable Multi-Tenant Backend Architecture Manual
### Uncoded Hub &bull; How to Scale from 1 to 200+ Active Clients With Zero Server Overhead

---

## 1. Executive Summary & Core Philosophy

Most digital agencies hit a scaling wall around 10–15 clients because they build and host each website as an isolated island. Managing 200 separate servers, databases, and notification webhooks requires a full-time DevOps team and thousands of dollars in monthly cloud bills.

Uncoded Hub solves this with the **Headless Multi-Tenant Architecture (WaaS — Website-as-a-Service)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       100–200+ Client Frontend Sites                        │
│       (Hosted anywhere: Vercel, Netlify, Cloudflare, Hostinger, AWS)        │
│       All powered by a single script tag:                                   │
│       <script src="https://engine.uncodedhub.com/sdk.js"                    │
│               data-tenant="meridian-interiors-804"></script>                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ (HTTPS REST / WebSockets)
┌─────────────────────────────────────────────────────────────────────────────┐
│                 UNCODED HUB MULTI-TENANT SERVERLESS ENGINE                  │
│       (Supabase PostgreSQL + Edge Functions + Cloudflare Workers)           │
│                                                                             │
│  • Edge API Gateway: Validates tenant keys, rate limits, caches configs     │
│  • Multi-Tenant Schema: Strict Row-Level-Security (RLS) per tenant_id       │
│  • Travel Buffer Matrix: Dynamic slot lockout & 1-tap .ics generation       │
│  • Universal Notification Dispatcher: WhatsApp Cloud API + Resend           │
└───────────────────────┬─────────────────────────────┬───────────────────────┘
                        │                             │
                        ▼                             ▼
         ┌─────────────────────────────┐┌─────────────────────────────┐
         │ UNCODED HUB COMMAND CENTER  ││  WHITELABELED CLIENT PORTAL │
         │   (Deepak & Geetha Admin)   ││   (Each Client Staff Login) │
         │  • 200 Clients Directory    ││  • Only Tenant's Leads      │
         │  • Total Agency MRR Ticker  ││  • Calendar Appointments    │
         │  • 60-Second Client Onboard ││  • Shared Inbox (Unresolved)│
         └─────────────────────────────┘└─────────────────────────────┘
```

---

## 2. The 60-Second Client Onboarding Protocol

When Deepak or Geetha closes client #15 or #180, you do **not** set up a database, write code, or deploy a server.

### The 3-Step Onboarding Flow:
1. **Open Agency Command Center (`agency-command-center.html`)**: Click `+ Onboard New Client`.
2. **Fill 4 Fields**:
   - Client Name: `The Alabaster Studio`
   - Target Niche: `Interior Design & Architecture`
   - Monthly Retainer: `₹9,999/month`
   - Owner WhatsApp / Phone: `+91 98450 12345`
3. **Copy the Generated Embed Snippet**:
   ```html
   <!-- UNCODED HUB AUTONOMOUS ENGINE -->
   <script 
     src="https://engine.uncodedhub.com/sdk.js" 
     data-tenant-key="alabaster-studio-72" 
     async>
   </script>
   ```
   Paste this snippet right before the `</body>` tag of their website. The script immediately renders their branded chat widget, 3-step estimator, and booking calendar!

---

## 3. Multi-Tenant Data Security & Row Level Security (RLS)

In a multi-tenant system, **data leakage between clients is unacceptable**. A dental clinic must never see an interior designer's customer phone numbers.

We enforce isolation at the **PostgreSQL kernel level** using Row-Level Security (RLS):

```sql
-- Security Policy: Staff can only query rows belonging to their verified tenant
CREATE POLICY "Tenant Data Isolation" ON public.leads
    FOR ALL
    TO authenticated
    USING (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid);
```

Even if a malicious actor tries to inspect network traffic, PostgreSQL rejects any query attempting to read another client's `tenant_id`.

---

## 4. The Unified Notification Engine (WhatsApp Cloud API + Email)

Business owners in India do not sit at laptops refreshing dashboards. They live on **WhatsApp**.

When an estimation lead is captured or an appointment is booked:
1. **Edge Function fires a Webhook within 2 seconds**.
2. **Owner Notification**: Uses WhatsApp Cloud API to send an interactive message directly to the business owner:
   > *"⚡ New Qualified Lead for Meridian Interiors!*\n\n*Name: Vikramaditya Singhania*\n*Phone: +91 98200 45678*\n*Scope: 3 BHK Turnkey (₹26L - ₹42L)*\n\n*Tap to call or message now: [Direct WhatsApp Link]"*
3. **Customer Reassurance**: Sends automated WhatsApp/SMS to the customer:
   > *"Hi Vikramaditya, we received your interior estimate request! Our Principal Architect is reviewing your details and will call within 1 business day."*

---

## 5. Automated Recurring Billing & Proof Protocol

### The Retainer Cycle (Day 1 of Every Month):
1. **Automated Metering**: A serverless Cron job runs across all 200 tenants.
2. **Report Generation**: Aggregates the exact metrics for the past 30 days:
   - Total Leads Captured (Name + Phone + Scope)
   - Confirmed In-Home Appointments
   - Total Pipeline Value Generated in ₹ Lakhs / Crores
   - Hours of Phone Triage Saved
3. **Executive Dispatch**: Automatically emails the branded PDF/Summary report to the client with their invoice.
4. **Result**: The client sees 15–30 verified inquiries and booked visits every single month. Churn rate drops to near 0%.

---

## 6. Financial Economics at 15 vs. 100 vs. 200 Clients

| Milestone | Active Clients | Average Monthly Retainer | Monthly Recurring Revenue (MRR) | Annual Recurring Revenue (ARR) | Cloud Hosting Cost |
|---|---|---|---|---|---|
| **Phase 1 (Target)** | **15 Clients** | ₹9,999 / mo | **₹1,49,985 / mo** | **₹18.0 Lakhs / yr** | ₹0 (Free tier) |
| **Phase 2 (Growth)** | **50 Clients** | ₹9,999 / mo | **₹4,99,950 / mo** | **₹60.0 Lakhs / yr** | ~$25/mo (Supabase Pro) |
| **Phase 3 (Scale)** | **100 Clients** | ₹9,999 / mo | **₹9,99,900 / mo** | **₹1.20 Crores / yr** | ~$50/mo |
| **Phase 4 (Dominance)**| **200 Clients** | ₹9,999 / mo | **₹19,99,800 / mo** | **₹2.40 Crores / yr** | ~$100/mo |

**Cloud Margin**: Over **99.5% gross profit margin** on software operations!
