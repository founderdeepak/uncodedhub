import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Read image assets as base64 for reliable, zero-latency rendering in Playwright PDF
const logoBase64 = fs.readFileSync('public/logo-medium.webp').toString('base64');
const logoDataUri = `data:image/webp;base64,${logoBase64}`;

const deepakBase64 = fs.readFileSync('public/deepak.webp').toString('base64');
const deepakDataUri = `data:image/webp;base64,${deepakBase64}`;

const geethaBase64 = fs.readFileSync('public/geetha.webp').toString('base64');
const geethaDataUri = `data:image/webp;base64,${geethaBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The High-Trust Advantage — Uncoded Hub</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: #14130F;
      background: #FAF8F5;
      font-size: 12.5px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 15mm 18mm 13mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FAF8F5;
      overflow: hidden;
    }

    /* Subtle graph paper grid */
    .page::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: 
        linear-gradient(to right, rgba(20, 19, 15, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(20, 19, 15, 0.025) 1px, transparent 1px);
      background-size: 15mm 15mm;
      pointer-events: none;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 9px;
      border-bottom: 1.5px solid #14130F;
      position: relative;
      z-index: 2;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo-img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      display: block;
    }

    .brand-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1;
      color: #14130F;
    }

    .brand-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #C7074B;
      font-weight: 700;
      margin-top: 2px;
    }

    .header-meta {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      color: #555046;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 1.35;
    }

    .hero-title-box {
      margin: 11px 0 9px;
      position: relative;
      z-index: 2;
    }

    .kicker {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #C7074B;
      background: rgba(199, 7, 75, 0.08);
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 5px;
      border: 1px solid rgba(199, 7, 75, 0.2);
    }

    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 29px;
      line-height: 1.08;
      font-weight: 700;
      color: #14130F;
      margin-bottom: 4px;
      letter-spacing: -0.02em;
    }

    .hero-sub {
      font-size: 13px;
      color: #4A453C;
      font-style: italic;
      line-height: 1.4;
    }

    .content-body {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 11px;
    }

    .section-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      color: #14130F;
      border-bottom: 1px solid rgba(20, 19, 15, 0.15);
      padding-bottom: 4px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .section-title span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      font-weight: 700;
      color: #C7074B;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .box {
      background: #FFFFFF;
      border: 1px solid #E2DCD2;
      border-radius: 8px;
      padding: 10px 14px;
      box-shadow: 0 2px 5px rgba(20, 19, 15, 0.03);
    }

    /* Dual-Path Visual Diagram Graphic */
    .infographic-dual-path {
      background: #FFFFFF;
      border: 1px solid #DDD8CE;
      border-radius: 10px;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      position: relative;
    }
    .path-col {
      border-radius: 8px;
      padding: 10px 12px;
    }
    .path-bad {
      background: #FFF8F8;
      border: 1px solid #F6D6D9;
    }
    .path-good {
      background: #F4FAF6;
      border: 1px solid #CDE7D5;
    }
    .path-head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(0,0,0,0.08);
    }
    .path-bad .path-head { color: #B91C1C; }
    .path-good .path-head { color: #15803D; }

    .path-steps {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .path-step {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 11px;
      line-height: 1.35;
      color: #38352E;
    }
    .step-badge {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .path-bad .step-badge { background: #FEE2E2; color: #991B1B; }
    .path-good .step-badge { background: #DCFCE7; color: #166534; }

    /* Misconceptions Grid */
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }

    .myth-item {
      background: #FFFFFF;
      border: 1px solid #E5DFD5;
      border-radius: 8px;
      padding: 9px 11px;
      position: relative;
    }

    .myth-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .myth-item strong {
      color: #C7074B;
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .myth-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .myth-item h4 {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 3px;
      color: #14130F;
      line-height: 1.25;
    }

    .myth-item p {
      font-size: 11px;
      color: #555046;
      line-height: 1.4;
    }

    /* Stat Callout Graphic */
    .stat-graphic-strip {
      background: #14130F;
      color: #FAF8F5;
      border-radius: 10px;
      padding: 12px 18px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 16px;
      align-items: center;
    }

    .stat-num {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 40px;
      line-height: 1;
      font-weight: 700;
      color: #C7074B;
    }

    .stat-text {
      font-size: 11.5px;
      color: #D6D0C5;
      line-height: 1.4;
    }

    .stat-text strong {
      color: #FAF8F5;
    }

    .stat-chart-box {
      width: 140px;
      text-align: right;
    }

    .footer {
      border-top: 1px solid #E2DCD2;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      color: #7A7468;
      position: relative;
      z-index: 2;
    }

    /* Page 2 Cards */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .privilege-card {
      background: #FFFFFF;
      border: 1px solid #E2DCD2;
      border-radius: 8px;
      padding: 10px 12px;
      position: relative;
    }

    .priv-head-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .privilege-card .num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      color: #C7074B;
      letter-spacing: 0.05em;
    }

    .priv-metric-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #F4F1EA;
      color: #14130F;
    }

    .privilege-card h4 {
      font-size: 12.5px;
      font-weight: 700;
      color: #14130F;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .privilege-card p {
      font-size: 11px;
      color: #555046;
      line-height: 1.4;
    }

    /* 7-Day Sprint Roadmap Diagram */
    .roadmap-container {
      background: #FFFFFF;
      border: 1px solid #E2DCD2;
      border-radius: 10px;
      padding: 10px 14px;
    }
    .roadmap-track {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      position: relative;
      margin-top: 6px;
    }
    .roadmap-step {
      background: #FBFAF8;
      border: 1px solid #E5DFD5;
      border-radius: 6px;
      padding: 8px 9px;
      text-align: left;
      position: relative;
    }
    .roadmap-step.active {
      border-color: #C7074B;
      background: #FFF9FA;
    }
    .step-day {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 800;
      color: #C7074B;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2px;
    }
    .step-title {
      font-size: 11px;
      font-weight: 700;
      color: #14130F;
      line-height: 1.25;
      margin-bottom: 2px;
    }
    .step-desc {
      font-size: 9.5px;
      color: #555046;
      line-height: 1.35;
    }

    .solution-box {
      background: #14130F;
      color: #FAF8F5;
      border-radius: 10px;
      padding: 13px 18px;
      border: 1px solid #2B2720;
    }

    .solution-box h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 19px;
      color: #FAF8F5;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .solution-pillars {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 8px 0;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .pillar-item {
      font-size: 10.5px;
      color: #CBC4B7;
      line-height: 1.35;
    }

    .pillar-item strong {
      color: #FAF8F5;
      display: block;
      margin-bottom: 2px;
      font-size: 11.5px;
    }

    .cta-strip {
      background: #C7074B;
      color: #FFFFFF;
      padding: 10px 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
    }

    .cta-text {
      font-size: 12px;
      font-weight: 600;
    }

    .cta-btn {
      background: #FFFFFF;
      color: #14130F;
      font-weight: 800;
      font-size: 10.5px;
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Page 3 Styles: About, Founders & Sacred Quote */
    .page3-founders-grid {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 18px;
      align-items: center;
      background: #FFFFFF;
      border: 1px solid #E2DCD2;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 10px;
    }
    .page3-photos-wrap {
      display: flex;
      gap: 10px;
    }
    .page3-photo-card {
      width: 82px;
      text-align: center;
    }
    .page3-photo-card img {
      width: 82px;
      height: 96px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid #C4BDB0;
      filter: grayscale(12%);
      display: block;
    }
    .page3-photo-name {
      font-size: 11.5px;
      font-weight: 700;
      color: #14130F;
      margin-top: 4px;
      display: block;
    }
    .page3-photo-role {
      font-size: 9px;
      color: #555046;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: block;
    }

    .page3-about-text h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 21px;
      font-weight: 700;
      color: #14130F;
      line-height: 1.2;
      margin-bottom: 6px;
    }
    .page3-about-text p {
      font-size: 11.5px;
      color: #38352E;
      line-height: 1.5;
      margin-bottom: 8px;
    }

    .studio-promises-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid #EDEAE4;
    }
    .promise-item {
      font-size: 10px;
      color: #555046;
      line-height: 1.35;
    }
    .promise-item strong {
      color: #C7074B;
      display: block;
      font-size: 10.5px;
      margin-bottom: 1px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Sacred Verse Presentation Box (Exact Website Aesthetic) */
    .sacred-quote-box {
      background: #FBF8EE;
      border: 1.5px solid rgba(180, 140, 30, 0.35);
      border-radius: 12px;
      padding: 18px 24px;
      text-align: center;
      position: relative;
      margin: 8px 0;
      box-shadow: 0 4px 16px rgba(180, 140, 30, 0.06);
    }
    .sacred-tamil-verse {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 17px;
      font-weight: 600;
      line-height: 1.6;
      max-width: 580px;
      margin: 0 auto 10px;
      background: linear-gradient(135deg, #7a5a10 0%, #b8902a 35%, #9a7220 65%, #5c4010 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gold-dot-rule {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 10px 0;
    }
    .gold-line {
      height: 1px;
      width: 50px;
      background: linear-gradient(90deg, transparent, rgba(180, 140, 30, 0.6));
    }
    .gold-line.reverse {
      background: linear-gradient(90deg, rgba(180, 140, 30, 0.6), transparent);
    }
    .gold-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(160, 110, 20, 0.85);
    }
    .sacred-english-quote {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 15.5px;
      font-style: italic;
      line-height: 1.55;
      max-width: 540px;
      margin: 0 auto 8px;
      color: rgba(80, 55, 10, 0.9);
    }
    .sacred-gratitude {
      font-size: 11px;
      color: rgba(120, 90, 20, 0.75);
      line-height: 1.4;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* Page 3 Final Closing CTA Box */
    .page3-closing-cta {
      background: #14130F;
      color: #FAF8F5;
      border-radius: 12px;
      padding: 16px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      border: 1px solid #2B2720;
      margin-top: 6px;
    }
    .closing-cta-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .closing-cta-sub {
      font-size: 11.5px;
      color: #D6D0C5;
      line-height: 1.4;
    }
    .closing-cta-button {
      background: #C7074B;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 11.5px;
      padding: 10px 18px;
      border-radius: 8px;
      text-decoration: none;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(199, 7, 75, 0.35);
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-wrap">
          <img src="${logoDataUri}" alt="Uncoded Hub" class="brand-logo-img">
          <div>
            <div class="brand-title">Uncoded Hub</div>
            <div class="brand-sub">Executive Strategy Briefing</div>
          </div>
        </div>
        <div class="header-meta">
          Two-Person Studio · Bengaluru<br>
          Direct Founder Delivery: Deepak &amp; Geetha
        </div>
      </div>

      <div class="hero-title-box">
        <span class="kicker">Strategic Reality Check</span>
        <h1>The High-Trust Advantage</h1>
        <p class="hero-sub">Why Exceptional Local Businesses Lose High-Ticket Work to Mediocre Competitors (And The 50ms Trust Shift)</p>
      </div>

      <div class="content-body">
        
        <!-- The Silent Decision & Dual Path Infographic -->
        <div>
          <div class="section-title">
            1. The 50-Millisecond Silent Decision
            <span>Customer Psychology</span>
          </div>
          
          <div class="box" style="margin-bottom: 8px;">
            <p style="font-size: 12px; color: #2B2720; line-height: 1.45;">
              When a prospective patient, client, or homeowner searches for your service in your city, they don't review your 15 years of dedication or degrees.
              <strong>They make a subconscious go/no-go choice within the first 50 milliseconds based purely on visual certainty.</strong> In high-ticket services, clients do not buy a service—they buy <em>relief from the fear of making an expensive mistake</em>.
            </p>
          </div>

          <!-- Infographic: The 50ms Decision Fork -->
          <div class="infographic-dual-path">
            <!-- Path A -->
            <div class="path-col path-bad">
              <div class="path-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                The Outdated / Missing Website Path
              </div>
              <div class="path-steps">
                <div class="path-step">
                  <div class="step-badge">1</div>
                  <div><strong>Slow 4.8s Mobile 4G Load</strong><br>Visitor experiences lag, blank screens, or broken shifts.</div>
                </div>
                <div class="path-step">
                  <div class="step-badge">2</div>
                  <div><strong>Subconscious Risk Alarm</strong><br>Lack of upfront pricing or credentials triggers doubt.</div>
                </div>
                <div class="path-step">
                  <div class="step-badge">3</div>
                  <div><strong>70% Silent Drop-Off</strong><br>Prospect backs out and books your established-looking competitor.</div>
                </div>
              </div>
            </div>

            <!-- Path B -->
            <div class="path-col path-good">
              <div class="path-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                The Uncoded Hub High-Trust Flagship
              </div>
              <div class="path-steps">
                <div class="path-step">
                  <div class="step-badge">1</div>
                  <div><strong>Instant Sub-1.2s Load</strong><br>Pure handcrafted code renders cleanly on any mobile network.</div>
                </div>
                <div class="path-step">
                  <div class="step-badge">2</div>
                  <div><strong>Visual Authority &amp; Proof</strong><br>Transparent service clarity and interactive qualification build trust.</div>
                </div>
                <div class="path-step">
                  <div class="step-badge">3</div>
                  <div><strong>Pre-Sold WhatsApp Inbound</strong><br>Prospect arrives ready to pay your full asking fee without haggling.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- The 3 Costly Misconceptions with Icons -->
        <div>
          <div class="section-title">
            2. The 3 Costly Misconceptions Holding Business Owners Back
            <span>The Leaking Bucket</span>
          </div>
          <div class="grid-3">
            <div class="myth-item">
              <div class="myth-header-row">
                <strong>Misconception 01</strong>
                <svg class="myth-icon" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </div>
              <h4>"I Rely Purely On Word of Mouth"</h4>
              <p>Word of mouth initiates the inquiry, but <strong>84% of referred clients still Google your business name</strong> before booking. If they find no authoritative digital flagship, the referral quietly slips away.</p>
            </div>
            <div class="myth-item">
              <div class="myth-header-row">
                <strong>Misconception 02</strong>
                <svg class="myth-icon" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h4>"My Instagram Or Maps Is Enough"</h4>
              <p>Social algorithms throttle reach, and serious high-ticket clients view an Instagram-only business as informal and unaccredited. You rent audience attention; you don't own the asset.</p>
            </div>
            <div class="myth-item">
              <div class="myth-header-row">
                <strong>Misconception 03</strong>
                <svg class="myth-icon" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h4>"Websites Take Months &amp; Lakhs"</h4>
              <p>Traditional agencies bloat scopes with junior account managers. A senior two-person studio writes pure code and deploys your customized, production-grade flagship in <strong>7 working days flat</strong>.</p>
            </div>
          </div>
        </div>

        <!-- Stat Callout Graphic Strip -->
        <div class="stat-graphic-strip">
          <div class="stat-num">70%</div>
          <div class="stat-text">
            <strong>Of high-intent Indian mobile users abandon sites taking longer than 3 seconds to load.</strong><br>
            A bloated WordPress or DIY site is a silent cash leak on every prospective client looking up your business.
          </div>
          <div class="stat-chart-box">
            <svg width="130" height="42" viewBox="0 0 130 42">
              <rect x="0" y="8" width="130" height="10" rx="5" fill="rgba(255,255,255,0.15)"/>
              <rect x="0" y="8" width="91" height="10" rx="5" fill="#C7074B"/>
              <text x="0" y="32" fill="#D6D0C5" font-family="'JetBrains Mono', monospace" font-size="9">70% Abandonment</text>
              <text x="96" y="16" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700">3s Limit</text>
            </svg>
          </div>
        </div>

      </div>
    </div>

    <div class="footer">
      <span>Uncoded Hub · Executive Strategy Briefing</span>
      <span>Page 1 of 3</span>
      <span>WhatsApp: +91 8660819023</span>
    </div>
  </div>


  <!-- ================= PAGE 2 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-wrap">
          <img src="${logoDataUri}" alt="Uncoded Hub" class="brand-logo-img">
          <div>
            <div class="brand-title">Uncoded Hub</div>
            <div class="brand-sub">Market Leadership Blueprint</div>
          </div>
        </div>
        <div class="header-meta">
          Handcrafted 7-Day Sprints<br>
          100% Asset Ownership Guarantee
        </div>
      </div>

      <div class="hero-title-box">
        <span class="kicker">The Market Dividend</span>
        <h1 style="font-size: 28px;">The 4 Privileges of a High-Conversion Flagship</h1>
        <p class="hero-sub">What Changes in Your Business the Day You Deploy a High-Performance Digital System</p>
      </div>

      <div class="content-body">
        
        <!-- The 4 Privileges with Graphical Badges -->
        <div class="grid-2">
          <div class="privilege-card">
            <div class="priv-head-row">
              <span class="num">PRIVILEGE 01</span>
              <span class="priv-metric-tag">+40% Pricing Power</span>
            </div>
            <h4>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
              Command Premium Pricing Power
            </h4>
            <p>You escape the local discount war. When your digital presence looks institutional, prospective clients stop haggling and respect your fees before dialing your number.</p>
          </div>

          <div class="privilege-card">
            <div class="priv-head-row">
              <span class="num">PRIVILEGE 02</span>
              <span class="priv-metric-tag">Pre-Sold Inbound</span>
            </div>
            <h4>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>
              Automated Pre-Sold Inquiries
            </h4>
            <p>Transparent service breakdowns, interactive diagnostic tools, and visual proof pre-educate clients 24/7. When they contact you, they have already chosen to hire you.</p>
          </div>

          <div class="privilege-card">
            <div class="priv-head-row">
              <span class="num">PRIVILEGE 03</span>
              <span class="priv-metric-tag">Zero Wasted Hours</span>
            </div>
            <h4>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter Out Tire-Kickers
            </h4>
            <p>Clear intake criteria and structured self-qualification naturally filter out low-intent price shoppers, preserving your staff's valuable time for high-value consultations.</p>
          </div>

          <div class="privilege-card">
            <div class="priv-head-row">
              <span class="num">PRIVILEGE 04</span>
              <span class="priv-metric-tag">Permanent Asset</span>
            </div>
            <h4>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C7074B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Compounding Sovereign Equity
            </h4>
            <p>Unlike rented social profiles vulnerable to algorithm changes, an owned domain builds enduring local SEO authority that compounds in enterprise value every single year.</p>
          </div>
        </div>

        <!-- 7-Day Sprint Roadmap Diagram -->
        <div class="roadmap-container">
          <div class="section-title" style="border:none; margin-bottom: 2px; padding-bottom: 0;">
            The 7-Day Uncoded Hub Sprint Roadmap
            <span>Rapid Execution</span>
          </div>
          <div class="roadmap-track">
            <div class="roadmap-step">
              <span class="step-day">DAY 01</span>
              <div class="step-title">Blueprint &amp; Intake</div>
              <div class="step-desc">Target client saga, competitive positioning &amp; offer architecture.</div>
            </div>
            <div class="roadmap-step">
              <span class="step-day">DAYS 02–03</span>
              <div class="step-title">Design &amp; Copy</div>
              <div class="step-desc">High-trust typography, mobile wireframes &amp; persuasive copy.</div>
            </div>
            <div class="roadmap-step active">
              <span class="step-day">DAYS 04–05</span>
              <div class="step-title">Engineering</div>
              <div class="step-desc">Pure lightweight code, sub-1.5s load speed &amp; interactive tools.</div>
            </div>
            <div class="roadmap-step">
              <span class="step-day">DAY 06</span>
              <div class="step-title">Testing &amp; QA</div>
              <div class="step-desc">Cross-device validation, local SEO schema &amp; WhatsApp routing.</div>
            </div>
            <div class="roadmap-step">
              <span class="step-day">DAY 07</span>
              <div class="step-title">Launch &amp; Handover</div>
              <div class="step-desc">Live deployment, 100% asset transfer &amp; founder walk-through.</div>
            </div>
          </div>
        </div>

        <!-- Why Uncoded Hub Section -->
        <div>
          <div class="solution-box">
            <h3>
              Two Founders. Seven Working Days. Zero Excuses.
              <span style="font-family:'JetBrains Mono',monospace; font-size:9.5px; background:rgba(255,255,255,0.12); padding:3px 8px; border-radius:4px; font-weight:700;">SENIOR ONLY</span>
            </h3>
            <p style="font-size: 11.5px; color: #D6D0C5; line-height: 1.45; margin-bottom: 6px;">
              Uncoded Hub is Deepak and Geetha in Bengaluru. We got tired of watching dedicated local business owners lose clients to inferior competitors simply because the competitor had a faster, clearer website.
            </p>

            <div class="solution-pillars">
              <div class="pillar-item">
                <strong>1. Senior Delivery Only</strong>
                No interns, junior handoffs, or account managers. Both co-founders personally design and build every single line.
              </div>
              <div class="pillar-item">
                <strong>2. Sub-1.5s Speed Standard</strong>
                Handcrafted pure code with zero bloated plugins, guaranteeing lightning load times on Indian mobile 4G networks.
              </div>
              <div class="pillar-item">
                <strong>3. 100% Sovereign Ownership</strong>
                Domain, hosting, code, and content in your name from day one with zero ongoing platform lock-in fees.
              </div>
            </div>
          </div>
        </div>

        <!-- Action Box -->
        <div class="cta-strip">
          <div class="cta-text">
            Continue to Page 3 for the Studio Story, Founders &amp; Sacred Verse →
          </div>
          <div class="cta-btn">Page 3 / 3</div>
        </div>

      </div>
    </div>

    <div class="footer">
      <span>Uncoded Hub · Market Leadership Blueprint</span>
      <span>Page 2 of 3</span>
      <span>https://uncodedhub.com</span>
    </div>
  </div>


  <!-- ================= PAGE 3 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-wrap">
          <img src="${logoDataUri}" alt="Uncoded Hub" class="brand-logo-img">
          <div>
            <div class="brand-title">Uncoded Hub</div>
            <div class="brand-sub">The Studio · Deepak &amp; Geetha</div>
          </div>
        </div>
        <div class="header-meta">
          Two-Person Studio · Bengaluru<br>
          100% Asset Ownership · Senior Delivery Only
        </div>
      </div>

      <div class="hero-title-box">
        <span class="kicker">About Uncoded Hub</span>
        <h1 style="font-size: 28px;">Two People, One Sprint at a Time, in Bengaluru.</h1>
        <p class="hero-sub">Direct founder engineering and design. No middlemen, no account managers.</p>
      </div>

      <div class="content-body">
        
        <!-- Founders Presentation Card -->
        <div class="page3-founders-grid">
          <div class="page3-photos-wrap">
            <div class="page3-photo-card">
              <img src="${deepakDataUri}" alt="Deepak, Engineering Co-Founder">
              <span class="page3-photo-name">Deepak</span>
              <span class="page3-photo-role">Engineering</span>
            </div>
            <div class="page3-photo-card">
              <img src="${geethaDataUri}" alt="Geetha, Design &amp; Strategy Co-Founder">
              <span class="page3-photo-name">Geetha</span>
              <span class="page3-photo-role">Design &amp; Copy</span>
            </div>
          </div>
          <div class="page3-about-text">
            <h3>Direct Accountability From Day One.</h3>
            <p>
              Uncoded Hub is a brother and sister who got tired of watching competent, high-quality businesses lose work to worse competitors simply because the competitor had a faster, clearer website.
            </p>
            <div class="studio-promises-strip">
              <div class="promise-item">
                <strong>Senior Delivery Only</strong>
                Both founders write every line of code and craft every visual. No junior delegation.
              </div>
              <div class="promise-item">
                <strong>7-Day Turnaround</strong>
                Complete launch in 7 working days flat. We run one focused sprint at a time.
              </div>
              <div class="promise-item">
                <strong>Zero Platform Lock-in</strong>
                100% client code, domain, and hosting ownership in your name from day one.
              </div>
            </div>
          </div>
        </div>

        <!-- The Sacred Verse Box (Exact Website Aesthetic) -->
        <div class="sacred-quote-box">
          <div class="sacred-tamil-verse">
            என் செயலாவது யாதொன்றும் இல்லை — இனித் தெய்வமே உன்செயலே என்று உணரப் பெற்றேன்
          </div>
          
          <div class="gold-dot-rule">
            <div class="gold-line"></div>
            <div class="gold-dot"></div>
            <div class="gold-line reverse"></div>
          </div>

          <div class="sacred-english-quote">
            “I have realised that nothing I do is truly mine. From now on, O God — everything that happens is only Your doing.”
          </div>

          <div class="sacred-gratitude">
            We are grateful for the work, and we strive to be worthy of it on every project.
          </div>
        </div>

        <!-- Closing High-Impact CTA Box -->
        <div class="page3-closing-cta">
          <div>
            <div class="closing-cta-title">Ready to Claim the Website Built for Your Business?</div>
            <div class="closing-cta-sub">
              Your live prototype is already engineered. Let's customize it with your branding, services, and intake flow in a 7-day sprint.
            </div>
          </div>
          <a href="https://wa.me/918660819023?text=Hi%20Deepak%20%26%20Geetha,%20I%20reviewed%20your%203-page%20executive%20guide%20and%20want%20to%20discuss%20claiming%20our%20website." class="closing-cta-button">
            WhatsApp Deepak &amp; Geetha →
          </a>
        </div>

      </div>
    </div>

    <div class="footer">
      <span>© 2026 Uncoded Hub · Bengaluru, India</span>
      <span>Page 3 of 3</span>
      <span>Direct WhatsApp: +91 8660819023</span>
    </div>
  </div>

</body>
</html>
`;

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  
  // Save HTML version as backup
  fs.writeFileSync('Lead Magnet/The_High_Trust_Advantage.html', htmlContent);
  
  // Ensure public/downloads exists
  if (!fs.existsSync('public/downloads')) {
    fs.mkdirSync('public/downloads', { recursive: true });
  }

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true
  });

  // Save to public/downloads and Lead Magnet/
  fs.writeFileSync('public/downloads/the-high-trust-advantage.pdf', pdfBuffer);
  fs.writeFileSync('Lead Magnet/The High Trust Advantage.pdf', pdfBuffer);

  console.log('Successfully generated 3-page PDF lead magnet at:');
  console.log(' - public/downloads/the-high-trust-advantage.pdf');
  console.log(' - Lead Magnet/The High Trust Advantage.pdf');

  await browser.close();
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
