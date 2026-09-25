# Super Website Features — Technical & Architecture Blueprint

This blueprint outlines the complete system architecture for turning any standard brochure website into an **Autonomous Customer Capture, Quoting, Booking & Lead Ops Engine**.

---

## System Architecture Overview

```
                         [ Visitor / Homeowner ]
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Live Chat /     │      │ 3-Step Project   │      │ Self-Serve       │
│  Contact Form    │      │ Cost Estimator   │      │ Booking Engine   │
└────────┬─────────┘      └────────┬─────────┘      └────────┬─────────┘
         │                         │ (Gate: Lead Capture)    │ (Optional Deposit)
         │                         ▼                         │
         │                ┌──────────────────┐               │
         │                │ Dynamic Pricing  │───────────────┘
         │                │ & Bridge to Book │
         │                └────────┬─────────┘
         │                         │
         └────────────────┬────────┴─────────────────────────┐
                          ▼                                  ▼
             ┌─────────────────────────┐        ┌─────────────────────────┐
             │ Immediate Notification  │        │ Central Database &      │
             │ Loop (Owner + Customer) │        │ Shared Inbox / CRM      │
             └─────────────────────────┘        └────────────┬────────────┘
                                                             │
                                                             ▼
                                                ┌─────────────────────────┐
                                                │ Staff / Admin Dashboard │
                                                │ (Bookings & Lead Status)│
                                                └─────────────────────────┘
```

---

## The 9 Core Modules Detailed

### Module 1: Unified Messaging & Shared Inbox
- **Components**:
  - Floating live chat widget (bottom right) with greeting state and sound alert.
  - Standard embedded contact inquiry form.
- **Unified Pipeline**:
  - All inquiries flow into a single centralized database/inbox table.
  - Three distinct lifecycle statuses:
    1. `UNRESOLVED` (New lead, red indicator, needs response)
    2. `WAITING_ON_CUSTOMER` (Staff replied, ball in client's court)
    3. `RESOLVED` (Lead converted, closed, or booked)
- **Value**: Prevents leads from slipping through cracked email accounts or forgotten WhatsApp chats.

---

### Module 2: Self-Serve Calendar & Appointment Booking Engine
- **Page Route**: `/book-estimate` or Modal Overlay.
- **Fields Captured**: Project Type, Preferred Date, Time Slot, Full Name, Phone, Email, Property Address.
- **Business Logic Rules**:
  - Operating Hours: Monday to Friday, 8:00 AM to 4:00 PM.
  - Slot Duration: 1-hour appointment blocks.
  - **Travel Buffer Rule**: Automatic 1-hour travel buffer locked out after each booking (e.g. 10:00 AM booking automatically blocks 11:00 AM for drive time).
- **Post-Booking Automation**:
  - 1-Tap Calendar Export: Pre-built `.ics` / Webcal links for Google Calendar, Apple iCal, and Microsoft Outlook.
  - On-Screen Trust Confirmation:
    > *"You're booked. Add it to your calendar below so you don't forget, and we'll call the day before to confirm."*

---

### Module 3 & 4: 3-Step Interactive Project Cost Estimator & Matrix Pricing
- **Page Route**: `/estimate`
- **UX**: 3-step wizard with visual progress bar, back navigation, and mobile-friendly tap cards.
  - **Step 1: Project Scope** &rarr; Kitchen | Bathroom | Basement | Home Addition
  - **Step 2: Project Size** &rarr; Plain-English layman definitions:
    - *Small*: Powder room / Galley kitchen under 120 sq.ft
    - *Medium*: Standard suburban layout / 150–250 sq.ft
    - *Large*: Open-concept layout / 300+ sq.ft with structural walls
  - **Step 3: Finish Quality** &rarr; Standard | Mid-Range | High-End
- **Pricing Calculation Engine**:
  ```javascript
  function calculateEstimate(type, size, finish) {
    const baseRates = {
      kitchen:  { small: [25000, 40000],  medium: [40000, 70000],   large: [70000, 120000] },
      bathroom: { small: [12000, 20000],  medium: [20000, 35000],   large: [35000, 60000] },
      basement: { small: [20000, 35000],  medium: [35000, 55000],   large: [55000, 90000] },
      addition: { small: [60000, 100000], medium: [100000, 180000], large: [180000, 300000] }
    };
    
    let [min, max] = baseRates[type][size];
    
    if (finish === 'high-end') {
      min = Math.round(min * 1.15);
      max = Math.round(max * 1.15);
    } else if (finish === 'standard') {
      min = Math.round(min * 0.90);
      max = Math.round(max * 0.90);
    } // mid-range remains 1.0x baseline
    
    return { min, max };
  }
  ```
- **Legal & Expectation Disclaimer**:
  > *"This is a planning range based on jobs we have completed in the local area. Your exact price depends on layout, materials and site conditions."*

---

### Module 5: Gated Lead Capture & Booking Bridge
- **The Psychology**: The visitor has answered all 3 steps and is eager to see the number.
- **The Gate**: Before displaying the minimum & maximum estimate range, an unavoidable modal requires:
  - Full Name
  - Direct Phone Number
  - Email Address
- **The Bridge**: The moment the price range reveals, a high-contrast CTA button appears below the number:
  > **[ Book Your Free In-Home Estimate To Lock This Rate &rarr; ]**
  (Seamlessly pre-fills their name, phone, and project type into the Booking Page).

---

### Module 6: Automated 2-Way Notification Loop
1. **Immediate Owner Dispatch (Within 10 seconds)**:
   - SMS / WhatsApp / Email alert to business owner containing:
     - Full prospect details (Name, Phone, Email, Property Address)
     - Exact estimator answers (Project Type, Size, Finish Tier, Quoted Range)
     - Direct tap-to-call link for instant owner follow-up.
2. **Instant Customer Reassurance (Zero Friction)**:
   - Email/SMS sent to lead immediately:
     > *"Hi [First Name], we received your project details! We are reviewing your specifications and will call you within one business day from [Phone Number] to discuss your vision."*

---

### Module 7: Refundable Commitment Deposit Integration
- **Gateway**: Stripe / Razorpay Checkout.
- **Feature**: Optional $250 / ₹5,000 reservation deposit.
- **Policy Display**: Prominently displayed next to checkout button:
  > *"100% Fully Refundable if cancelled more than 24 hours prior to appointment."*
- **Outcome**: Completely eliminates no-shows and tire-kickers, elevating prospect commitment to near 100%.

---

### Module 8: Unified Staff & Admin CRM Dashboard
- **Access Route**: Discreet footer link `/staff-portal` (Password/Auth protected).
- **Core Views**:
  1. **Bookings Calendar View**: Day/Week view showing scheduled in-home estimates with addresses and travel buffers.
  2. **Shared Lead Inbox**: Real-time tracker for Chat, Contact Form, and Estimator leads with Status toggles (`Unresolved` &rarr; `Waiting on Customer` &rarr; `Resolved`).
  3. **Cancellation & Rescheduling Logs**: Tracks dropped slots and reasons.
  4. **Staff Management**: Assign estimator visits to specific field project managers.

---

### Module 9: Technical SEO, Microdata & Automated Sitemap
- **Metadata**: Unique programmatic Title tags, OpenGraph previews, and Meta Descriptions per route.
- **Structured JSON-LD Schema**:
  - `LocalBusiness` / `HomeAndConstructionBusiness` schema.
  - `Service` & `FAQPage` schema.
- **Automated XML Sitemap**: Keeps search engines indexing all quote, estimation, and service landing routes.
