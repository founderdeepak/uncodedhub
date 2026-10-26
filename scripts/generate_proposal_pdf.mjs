import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Read Uncoded Hub logo as base64 for crisp, zero-latency embedding
const logoBase64 = fs.readFileSync('public/logo-medium.webp').toString('base64');
const logoDataUri = `data:image/webp;base64,${logoBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Website Proposal for Dhananjay Joshi — Uncoded Hub</title>
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
      color: #14130F;
      background: #FFFFFF;
      font-size: 13px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      width: 210mm;
      height: 297mm;
      padding: 18mm 20mm 15mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
      overflow: hidden;
    }

    /* Top running document title */
    .top-meta {
      font-size: 10px;
      color: #7A7870;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 25px;
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 18px;
      border-bottom: 1.5px solid #14130F;
      margin-bottom: 24px;
    }

    .proposal-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 32px;
      font-weight: 700;
      line-height: 1.15;
      color: #14130F;
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }

    .proposal-meta {
      font-size: 13px;
      color: #5A5850;
      font-weight: 500;
    }
    .proposal-meta strong {
      color: #14130F;
      font-weight: 700;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo-img {
      width: 38px;
      height: 38px;
      object-fit: contain;
    }

    .brand-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 700;
      color: #14130F;
      line-height: 1;
    }

    .brand-sub {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #7A7870;
      font-weight: 600;
      margin-top: 2px;
    }

    /* Content sections */
    .content-area {
      flex: 1;
    }

    .section-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 22px;
      font-weight: 700;
      color: #14130F;
      margin-top: 22px;
      margin-bottom: 10px;
      letter-spacing: -0.01em;
    }

    .section-title:first-child {
      margin-top: 0;
    }

    p {
      color: #2D2B26;
      font-size: 13px;
      line-height: 1.65;
      margin-bottom: 14px;
    }

    .package-block {
      background: #FAF8F5;
      border: 1px solid #EAE6DF;
      border-left: 3.5px solid #14130F;
      border-radius: 4px;
      padding: 12px 16px;
      margin-bottom: 14px;
    }

    .package-heading {
      font-size: 13.5px;
      font-weight: 700;
      color: #14130F;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .badge-rec {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: #EAE6DF;
      color: #4A4840;
      padding: 2px 8px;
      border-radius: 3px;
      font-weight: 600;
    }

    .package-desc {
      font-size: 12.5px;
      color: #3D3B35;
      margin-bottom: 0;
      line-height: 1.55;
    }

    /* Table Styles */
    .pricing-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 14px;
      background: #FFFFFF;
      border: 1px solid #D8D4CC;
      border-radius: 6px;
      overflow: hidden;
      font-size: 12px;
    }

    .pricing-table th {
      background: #F4F1EA;
      color: #14130F;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 9px 14px;
      border-bottom: 1.5px solid #14130F;
      border-right: 1px solid #D8D4CC;
    }

    .pricing-table th:first-child {
      width: 22%;
      font-size: 13px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #6A6860;
    }

    .pricing-table th:last-child {
      border-right: none;
    }

    .pricing-table td {
      padding: 9px 14px;
      border-bottom: 1px solid #EAE6DF;
      border-right: 1px solid #D8D4CC;
      color: #2D2B26;
      vertical-align: top;
      line-height: 1.45;
    }

    .pricing-table td:first-child {
      font-weight: 700;
      color: #14130F;
      background: #FAF8F5;
    }

    .pricing-table td:last-child {
      border-right: none;
    }

    .pricing-table tr:last-child td {
      border-bottom: none;
    }

    .price-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13.5px;
      font-weight: 700;
      color: #14130F;
    }

    .maint-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      color: #1E3A8A;
    }

    .sub-note {
      font-size: 10.5px;
      color: #6A6860;
      display: block;
      margin-top: 2px;
    }

    /* Highlight Banner */
    .support-banner {
      background: #FAF8F5;
      border: 1px solid #D8D4CC;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }

    .support-banner-title {
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #14130F;
      font-weight: 700;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .support-banner ul {
      list-style: none;
      padding-left: 0;
      font-size: 11.5px;
      color: #3D3B35;
    }

    .support-banner li {
      margin-bottom: 3px;
      position: relative;
      padding-left: 14px;
    }

    .support-banner li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #14130F;
      font-weight: bold;
    }

    /* Bullet Lists */
    ul.bullet-list {
      list-style: none;
      padding-left: 0;
      margin-bottom: 12px;
    }

    ul.bullet-list li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 4px;
      color: #2D2B26;
      font-size: 12px;
      line-height: 1.45;
    }

    ul.bullet-list li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #14130F;
      font-weight: bold;
      font-size: 13px;
      line-height: 1.2;
    }

    .signoff {
      margin-top: 12px;
      font-size: 12px;
      color: #2D2B26;
    }

    .signoff strong {
      display: block;
      color: #14130F;
      font-size: 13.5px;
      margin-top: 4px;
    }

    /* Footer pagination bar */
    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid #D8D4CC;
      font-size: 10px;
      color: #7A7870;
      letter-spacing: 0.04em;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="page">
    <div>
      <div class="top-meta">Website Proposal for Dhananjay Joshi</div>

      <header class="header-bar">
        <div>
          <h1 class="proposal-title">Website Proposal for Dhananjay Joshi</h1>
          <div class="proposal-meta">Prepared by <strong>Deepak and Geetha</strong>, Uncoded Hub | uncodedhub.com</div>
        </div>
        <div class="brand-wrap">
          <img src="${logoDataUri}" alt="Uncoded Hub" class="brand-logo-img">
          <div>
            <div class="brand-title">Uncoded Hub</div>
            <div class="brand-sub">Digital Craft</div>
          </div>
        </div>
      </header>

      <main class="content-area">
        <h2 class="section-title">Why you need a website</h2>
        <p>
          You asked why a website is needed when you already share photos on WhatsApp or Instagram.
        </p>
        <p>
          High-end hotels, interior designers and architects choose art for their projects and need to show options to their clients. On WhatsApp, photos get lost or look compressed. With a website, they can open your link on a phone or iPad, view your frames on wall mockups of lobbies, living rooms and offices, and share it with the decision-maker. It also shows that you are a serious, professional fine-art studio.
        </p>

        <h2 class="section-title" style="margin-top: 26px;">How a customer places an order</h2>
        <p style="margin-bottom: 12px;">We offer two packages tailored to your business model:</p>

        <div class="package-block">
          <div class="package-heading">
            <span>Package A: Gallery + WhatsApp Enquiries</span>
            <span class="badge-rec">Recommended Start</span>
          </div>
          <p class="package-desc">
            The buyer chooses a photo, size (for example 20x30") and frame, then taps <strong>"Enquire on WhatsApp"</strong>. You get all the details on your phone and discuss price, advance payment and delivery directly with them.
          </p>
        </div>

        <div class="package-block" style="border-left-color: #1E3A8A;">
          <div class="package-heading">
            <span>Package B: Online Catalogue + Razorpay + Customer Records</span>
          </div>
          <p class="package-desc">
            The buyer selects a frame, enters the delivery address and pays online by UPI, card or netbanking. Customer details and the ordered frame are saved in a private list that only you can access, so you build your own client list.
          </p>
        </div>

        <h2 class="section-title" style="margin-top: 26px;">Adding new wildlife photos yourself</h2>
        <p>
          Yes. We will set up a simple private page where you pick a photo from your phone or laptop and add it to your website. No technical skills are needed.
        </p>
      </main>
    </div>

    <footer class="footer-bar">
      <span>Website Proposal for Dhananjay Joshi</span>
      <span>Page 1 of 2</span>
    </footer>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page">
    <div>
      <div class="top-meta">Website Proposal for Dhananjay Joshi</div>

      <header class="header-bar">
        <div>
          <h1 class="proposal-title" style="font-size: 26px; margin-bottom: 2px;">Investment & Deliverables</h1>
          <div class="proposal-meta">Clear, fixed-scope pricing with zero hidden costs</div>
        </div>
        <div class="brand-wrap">
          <img src="${logoDataUri}" alt="Uncoded Hub" class="brand-logo-img">
          <div>
            <div class="brand-title">Uncoded Hub</div>
            <div class="brand-sub">Digital Craft</div>
          </div>
        </div>
      </header>

      <main class="content-area">
        <!-- Pricing Table -->
        <table class="pricing-table">
          <thead>
            <tr>
              <th>Detail</th>
              <th>Package A</th>
              <th>Package B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What it is</td>
              <td><strong>Gallery + WhatsApp enquiries</strong></td>
              <td><strong>Online catalogue + Razorpay + customer records</strong></td>
            </tr>
            <tr>
              <td>Includes</td>
              <td>Home, Gallery, Wall Styling Guides, About, and WhatsApp enquiries</td>
              <td>Everything in Package A, plus Razorpay online payments and the customer records setup</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <span class="price-tag">Rs 30,000</span>
                <span class="sub-note">One-time investment</span>
              </td>
              <td>
                <span class="price-tag">Rs 55,000</span>
                <span class="sub-note">Special introductory price (Regular Rs 65,000)</span>
              </td>
            </tr>
            <tr>
              <td>Maintenance</td>
              <td>
                <span class="maint-tag">Rs 3,000 / month</span>
                <span class="sub-note">Optional / On-Demand</span>
              </td>
              <td>
                <span class="maint-tag">Rs 5,000 / month</span>
                <span class="sub-note">Optional / On-Demand</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Support & Maintenance Policy Banner -->
        <div class="support-banner">
          <div class="support-banner-title">
            <span>🛡️ Dedicated Support & Maintenance Policy</span>
          </div>
          <ul>
            <li><strong>First 30 Days Complete Support:</strong> We provide complete free support and maintenance for the first 30 days after project launch at zero extra cost.</li>
            <li><strong>Flexible On-Demand Maintenance:</strong> Ongoing maintenance is completely optional. When a month of updates or changes is required, we will help with it. You only pay for the months you actively request our help.</li>
            <li><strong>Domain & Hosting:</strong> Rs 2,000 to 3,000 per year (managed high-speed server & SSL security).</li>
          </ul>
        </div>

        <!-- Terms -->
        <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 700; margin-bottom: 6px; color: #14130F;">Terms</h3>
        <ul class="bullet-list">
          <li>50% advance to begin</li>
          <li>Delivery within 7 working days from the day we receive your photos and content</li>
          <li>The website is fully yours</li>
        </ul>

        <!-- What We Need From You -->
        <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 700; margin-bottom: 6px; color: #14130F;">What we need from you</h3>
        <ul class="bullet-list">
          <li>Your photos</li>
          <li>Your logo</li>
          <li>A short bio</li>
        </ul>

        <!-- Next Steps -->
        <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 700; margin-bottom: 6px; color: #14130F;">Next steps</h3>
        <p style="font-size: 12px; margin-bottom: 10px;">
          Please take your time to discuss this with your family. If you would like to go ahead, just reply and we will send the agreement and advance details.
        </p>

        <div class="signoff">
          Warm regards,<br>
          <strong>Deepak and Geetha</strong>
          <span style="font-size: 11px; color: #5A5850;">Uncoded Hub | uncodedhub.com</span>
        </div>
      </main>
    </div>

    <footer class="footer-bar">
      <span>Website Proposal for Dhananjay Joshi</span>
      <span>Page 2 of 2</span>
    </footer>
  </div>

</body>
</html>
`;

async function generatePDF() {
  console.log('Launching Playwright Chromium to compile proposal PDF...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // Ensure output directories exist
  const clientDir = 'Client Database/1. Client one - photography';
  if (!fs.existsSync(clientDir)) {
    fs.mkdirSync(clientDir, { recursive: true });
  }
  if (!fs.existsSync('public/downloads')) {
    fs.mkdirSync('public/downloads', { recursive: true });
  }

  // Save HTML version
  fs.writeFileSync(path.join(clientDir, 'Website Proposal for Dhananjay Joshi.html'), htmlContent);

  // Generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true
  });

  const targetPdf = path.join(clientDir, 'Website Proposal for Dhananjay Joshi.pdf');
  const publicPdf = 'public/downloads/Website_Proposal_Dhananjay_Joshi.pdf';

  fs.writeFileSync(targetPdf, pdfBuffer);
  fs.writeFileSync(publicPdf, pdfBuffer);

  console.log('✅ Successfully generated official proposal PDF at:');
  console.log(` - ${targetPdf}`);
  console.log(` - ${publicPdf}`);

  await browser.close();
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
