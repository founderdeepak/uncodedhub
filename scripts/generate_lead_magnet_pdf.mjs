import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The High-Trust Advantage — Uncoded Hub</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

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
      color: #12110E;
      background: #FAF8F5;
      font-size: 13px;
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 18mm 20mm 16mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FAF8F5;
      overflow: hidden;
    }

    /* Subtle background grid rule */
    .page::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: 
        linear-gradient(to right, rgba(18, 17, 14, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(18, 17, 14, 0.03) 1px, transparent 1px);
      background-size: 20mm 20mm;
      pointer-events: none;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1.5px solid #12110E;
      position: relative;
      z-index: 2;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo-mark {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #12110E;
      color: #FAF8F5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 16px;
      letter-spacing: -0.02em;
    }

    .brand-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1;
    }

    .brand-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #C7074B;
      font-weight: 600;
      margin-top: 2px;
    }

    .header-meta {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: #555046;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 1.4;
    }

    .hero-title-box {
      margin: 16px 0 14px;
      position: relative;
      z-index: 2;
    }

    .kicker {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #C7074B;
      background: rgba(199, 7, 75, 0.08);
      padding: 3px 9px;
      border-radius: 4px;
      margin-bottom: 8px;
      border: 1px solid rgba(199, 7, 75, 0.2);
    }

    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 32px;
      line-height: 1.08;
      font-weight: 700;
      color: #12110E;
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }

    .hero-sub {
      font-size: 13.5px;
      color: #4A453C;
      font-style: italic;
      line-height: 1.45;
    }

    .content-body {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .section-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      color: #12110E;
      border-bottom: 1px solid rgba(18, 17, 14, 0.18);
      padding-bottom: 4px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .section-title span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 600;
      color: #C7074B;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .box {
      background: #FFFFFF;
      border: 1px solid #E2DCD2;
      border-radius: 10px;
      padding: 12px 14px;
      box-shadow: 0 2px 6px rgba(18, 17, 14, 0.03);
    }

    .box-signal {
      background: #FFF5F7;
      border: 1px solid rgba(199, 7, 75, 0.25);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    .myth-item {
      background: #FFFFFF;
      border: 1px solid #E5DFD5;
      border-radius: 8px;
      padding: 10px 12px;
    }

    .myth-item strong {
      color: #C7074B;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: block;
      margin-bottom: 3px;
    }

    .myth-item h4 {
      font-size: 12.5px;
      font-weight: 700;
      margin-bottom: 4px;
      color: #12110E;
    }

    .myth-item p {
      font-size: 11.5px;
      color: #555046;
      line-height: 1.45;
    }

    .stat-callout {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #12110E;
      color: #FAF8F5;
      border-radius: 10px;
      padding: 14px 18px;
    }

    .stat-num {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 42px;
      line-height: 1;
      font-weight: 700;
      color: #C7074B;
    }

    .stat-text {
      font-size: 12px;
      color: #D6D0C5;
      line-height: 1.45;
    }

    .stat-text strong {
      color: #FAF8F5;
    }

    .footer {
      border-top: 1px solid #E2DCD2;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: #7A7468;
      position: relative;
      z-index: 2;
    }

    .privilege-card {
      background: #FFFFFF;
      border: 1px solid #E2DCD2;
      border-radius: 8px;
      padding: 11px 13px;
    }

    .privilege-card .num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      color: #C7074B;
      margin-bottom: 3px;
      display: block;
    }

    .privilege-card h4 {
      font-size: 13px;
      font-weight: 700;
      color: #12110E;
      margin-bottom: 4px;
    }

    .privilege-card p {
      font-size: 11.5px;
      color: #555046;
      line-height: 1.45;
    }

    .solution-box {
      background: #12110E;
      color: #FAF8F5;
      border-radius: 12px;
      padding: 16px 20px;
      border: 1px solid #2B2720;
    }

    .solution-box h3 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      color: #FAF8F5;
      margin-bottom: 6px;
    }

    .solution-pillars {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin: 10px 0;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .pillar-item {
      font-size: 11px;
      color: #CBC4B7;
      line-height: 1.4;
    }

    .pillar-item strong {
      color: #FAF8F5;
      display: block;
      margin-bottom: 2px;
      font-size: 12px;
    }

    .cta-strip {
      background: #C7074B;
      color: #FFFFFF;
      padding: 12px 18px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }

    .cta-text {
      font-size: 12.5px;
      font-weight: 600;
    }

    .cta-btn {
      background: #FFFFFF;
      color: #12110E;
      font-weight: 800;
      font-size: 11px;
      padding: 7px 14px;
      border-radius: 6px;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .founders-quote {
      font-style: italic;
      color: #4A453C;
      font-size: 11.5px;
      line-height: 1.5;
      border-left: 2.5px solid #C7074B;
      padding-left: 10px;
      margin: 6px 0;
    }
  </style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-wrap">
          <div class="brand-logo-mark">UH</div>
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
        <p class="hero-sub">Why Exceptional Local Businesses Lose Work to Mediocre Competitors (And The 50-Millisecond Trust Shift)</p>
      </div>

      <div class="content-body">
        
        <!-- The Silent Decision -->
        <div>
          <div class="section-title">
            1. The 50-Millisecond Silent Decision
            <span>Customer Psychology</span>
          </div>
          <div class="box">
            <p style="font-size: 12.5px; color: #2B2720; margin-bottom: 8px;">
              When a prospective patient, client, or homeowner searches for your service in your city, they don't judge you on your years of training, your ethical integrity, or how hard you work. 
              <strong>They judge you in the first 50 milliseconds based purely on visual certainty.</strong>
            </p>
            <p style="font-size: 12px; color: #555046;">
              In high-ticket local services (consultations, surgery, renovations, coaching, weddings), clients do not purchase your service—they purchase <em>relief from the fear of making an expensive mistake</em>. If your web presence feels slow, broken, or non-existent, their subconscious mind registers risk and clicks to the next provider.
            </p>
          </div>
        </div>

        <!-- The 3 Costly Misconceptions -->
        <div>
          <div class="section-title">
            2. The 3 Costly Misconceptions Holding Business Owners Back
            <span>The Leaking Bucket</span>
          </div>
          <div class="grid-3">
            <div class="myth-item">
              <strong>Misconception 01</strong>
              <h4>"I Rely Purely On Word of Mouth"</h4>
              <p>Word of mouth starts the conversation, but 84% of referred clients still Google your business before booking. If they find an outdated page, the referral silently dies.</p>
            </div>
            <div class="myth-item">
              <strong>Misconception 02</strong>
              <h4>"My Instagram Page Is Sufficient"</h4>
              <p>Social media algorithms throttle your reach, and serious high-ticket clients view an Instagram-only business as informal, fly-by-night, and unregulated.</p>
            </div>
            <div class="myth-item">
              <strong>Misconception 03</strong>
              <h4>"Websites Take 3 Months &amp; Lakhs"</h4>
              <p>Traditional agencies bloat scopes with junior account managers. In 2026, two senior engineers build a custom high-performance asset in 7 working days flat.</p>
            </div>
          </div>
        </div>

        <!-- Callout Banner -->
        <div class="stat-callout">
          <div class="stat-num">70%</div>
          <div class="stat-text">
            <strong>Of high-intent prospects abandon websites that take longer than 3 seconds to load on mobile 4G.</strong>
            A slow WordPress site isn't just an embarrassment—it is a continuous, invisible cash drain on every rupee you spend on Google Maps, local SEO, or personal networking.
          </div>
        </div>

      </div>
    </div>

    <div class="footer">
      <span>Uncoded Hub · The High-Trust Website Advantage</span>
      <span>Page 1 of 2</span>
      <span>Direct WhatsApp: +91 8660819023</span>
    </div>
  </div>


  <!-- ================= PAGE 2 ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div class="brand-wrap">
          <div class="brand-logo-mark">UH</div>
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
        <h1 style="font-size: 29px;">The 4 Privileges of a High-Conversion Flagship</h1>
        <p class="hero-sub">What Changes in Your Business the Day You Deploy a High-Performance Digital System</p>
      </div>

      <div class="content-body">
        
        <!-- The 4 Privileges -->
        <div class="grid-2">
          <div class="privilege-card">
            <span class="num">PRIVILEGE 01</span>
            <h4>Command Premium Pricing Power</h4>
            <p>You escape the discount war. When your digital presence looks authoritative and institutional, prospective clients stop haggling on fees and respect your expertise from the first greeting.</p>
          </div>
          <div class="privilege-card">
            <span class="num">PRIVILEGE 02</span>
            <h4>Automated Pre-Sold Inbound Inquiries</h4>
            <p>Transparent fee structures, interactive diagnostic tools, and clinical credentials educate prospects while you sleep. By the time they contact you, they have already decided to hire you.</p>
          </div>
          <div class="privilege-card">
            <span class="num">PRIVILEGE 03</span>
            <h4>Filter Out Unqualified Tire-Kickers</h4>
            <p>Clear intake criteria and upfront service details naturally repel low-budget inquiries, protecting your staff's valuable clinical and consulting hours for genuine high-ticket buyers.</p>
          </div>
          <div class="privilege-card">
            <span class="num">PRIVILEGE 04</span>
            <h4>Compounding Asset Independence</h4>
            <p>Unlike rented social platforms that can ban your account overnight, a standalone website on your own domain builds permanent SEO authority that appreciates in value every single year.</p>
          </div>
        </div>

        <!-- Why Uncoded Hub Section -->
        <div>
          <div class="section-title">
            Why Choosing Uncoded Hub Is The Unfair Advantage
            <span>Senior-Only Execution</span>
          </div>

          <div class="solution-box">
            <h3>Two Founders. Seven Working Days. Zero Excuses.</h3>
            <p style="font-size: 12px; color: #D6D0C5; line-height: 1.5; margin-bottom: 8px;">
              Uncoded Hub was founded by Deepak and Geetha in Bengaluru. We got tired of watching competent, high-integrity local businesses lose market share to inferior competitors who simply had a faster, clearer website.
            </p>

            <div class="solution-pillars">
              <div class="pillar-item">
                <strong>1. Senior Delivery Only</strong>
                No account managers or outsourced junior teams. Both founders build every page of your project.
              </div>
              <div class="pillar-item">
                <strong>2. Sub-1.5s Speed Guarantee</strong>
                Handcrafted pure code with zero bloated plugins, ensuring instantaneous load times on Indian mobile 4G networks.
              </div>
              <div class="pillar-item">
                <strong>3. 100% Client Ownership</strong>
                Hosting, code, fonts, and domains registered in your name from day one with zero monthly lock-ins.
              </div>
            </div>

            <div class="founders-quote">
              "We would rather have a smaller invoice and a client who sends three referrals than an overblown budget that leaves a sour taste. We treat your business reputation with the same obsessive precision as our own."
            </div>
          </div>
        </div>

        <!-- Action Box -->
        <div class="cta-strip">
          <div class="cta-text">
            Ready to claim the live prototype built for your business?
          </div>
          <div class="cta-btn">WhatsApp +91 8660819023</div>
        </div>

      </div>
    </div>

    <div class="footer">
      <span>© 2026 Uncoded Hub · Bengaluru, India</span>
      <span>Page 2 of 2</span>
      <span>https://uncodedhub.com</span>
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

  console.log('Successfully generated 2-page PDF lead magnet at:');
  console.log(' - public/downloads/the-high-trust-advantage.pdf');
  console.log(' - Lead Magnet/The High Trust Advantage.pdf');

  await browser.close();
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
