const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_DIR = path.join(__dirname);
const MD_DIR = path.join(BASE_DIR, 'markdown');
const OUT_DIR = path.join(BASE_DIR, 'compiled_pdfs');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const FILES = [
  {
    input: '01_GBP_3_Pack_Ranking_Blueprint.md',
    output: '01_GBP_3_Pack_Ranking_Blueprint.pdf',
    badge: 'PILLAR 01 &bull; LOCAL SEARCH DOMINANCE',
    accent: '#0284C7',
    tagline: 'Local SEO & Maps Ranking SOP'
  },
  {
    input: '02_WhatsApp_5_Star_Review_Funnel.md',
    output: '02_WhatsApp_5_Star_Review_Funnel.pdf',
    badge: 'PILLAR 02 &bull; SOCIAL PROOF AUTOMATION',
    accent: '#10B981',
    tagline: '5-Star WhatsApp Review Engine'
  },
  {
    input: '03_Inbound_Lead_Conversion_Scripts.md',
    output: '03_Inbound_Lead_Conversion_Scripts.pdf',
    badge: 'PILLAR 03 &bull; HIGH-TICKET SALES CONVERSION',
    accent: '#8B5CF6',
    tagline: 'Rapid-Response Sales Conversion Scripts'
  },
  {
    input: '04_Local_Competitor_Vulnerability_Audit.md',
    output: '04_Local_Competitor_Vulnerability_Audit.pdf',
    badge: 'PILLAR 04 &bull; STRATEGIC MARKET INTELLIGENCE',
    accent: '#D97706',
    tagline: 'Local Competitor Diagnostic Audit'
  },
  {
    input: '00_Local_Inbound_Authority_Master_Playbook.md',
    output: 'Uncoded_Hub_Local_Inbound_Authority_Master_Playbook.pdf',
    badge: 'MASTER EDITION &bull; UNIFIED CLIENT ASSET SYSTEM',
    accent: '#06B6D4',
    tagline: 'Complete Inbound Authority & 5-Star Review Playbook'
  }
];

function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  let html = '';
  let inList = false;
  let inOrderedList = false;
  let inTable = false;
  let tableHeaderParsed = false;
  let inBlockquote = false;
  let title = '';
  let subtitle = '';
  let metaLines = [];
  let titleFound = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Extract title & subtitle from top
    if (!titleFound && line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim();
      titleFound = true;
      continue;
    }
    if (titleFound && !subtitle && line.startsWith('### ')) {
      subtitle = line.replace(/^###\s+/, '').trim();
      continue;
    }
    if (titleFound && line.startsWith('**') && (line.includes('Uncoded Hub') || line.includes('Authored') || line.includes('Confidential'))) {
      metaLines.push(line.replace(/\*\*/g, '').trim());
      continue;
    }
    if (titleFound && line === '---' && metaLines.length > 0) {
      // End of header section
      continue;
    }

    // Close open lists if line is not a list item
    if (inList && !line.startsWith('- ') && !line.startsWith('* ')) {
      html += '</ul>\n';
      inList = false;
    }
    if (inOrderedList && !/^\d+\.\s+/.test(line)) {
      html += '</ol>\n';
      inOrderedList = false;
    }
    if (inTable && !line.startsWith('|')) {
      html += '</tbody></table></div>\n';
      inTable = false;
      tableHeaderParsed = false;
    }
    if (inBlockquote && !line.startsWith('>')) {
      html += '</blockquote>\n';
      inBlockquote = false;
    }

    if (!line) {
      continue;
    }

    // Dividers
    if (line === '---' || line === '***') {
      html += '<hr class="section-divider" />\n';
      continue;
    }

    // Headings
    if (line.startsWith('## ')) {
      const headingText = formatInline(line.replace(/^##\s+/, ''));
      html += `<h2 class="section-heading">${headingText}</h2>\n`;
      continue;
    }
    if (line.startsWith('### ')) {
      const headingText = formatInline(line.replace(/^###\s+/, ''));
      html += `<h3 class="sub-heading">${headingText}</h3>\n`;
      continue;
    }
    if (line.startsWith('#### ')) {
      const headingText = formatInline(line.replace(/^####\s+/, ''));
      html += `<h4 class="minor-heading">${headingText}</h4>\n`;
      continue;
    }

    // Tables
    if (line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (line.includes('---')) {
        // Separator row
        tableHeaderParsed = true;
        continue;
      }
      if (!inTable) {
        inTable = true;
        html += '<div class="table-wrapper"><table>\n<thead><tr>\n';
        cells.forEach(cell => {
          html += `<th>${formatInline(cell)}</th>\n`;
        });
        html += '</tr></thead><tbody>\n';
      } else {
        html += '<tr>\n';
        cells.forEach(cell => {
          html += `<td>${formatInline(cell)}</td>\n`;
        });
        html += '</tr>\n';
      }
      continue;
    }

    // Blockquotes
    if (line.startsWith('>')) {
      const quoteText = formatInline(line.replace(/^>\s*/, ''));
      if (!inBlockquote) {
        inBlockquote = true;
        html += '<blockquote class="callout-box">\n';
      }
      html += `<p>${quoteText}</p>\n`;
      continue;
    }

    // Unordered lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const itemText = formatInline(line.replace(/^[-*]\s+/, ''));
      if (!inList) {
        inList = true;
        html += '<ul>\n';
      }
      html += `<li>${itemText}</li>\n`;
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(line)) {
      const itemText = formatInline(line.replace(/^\d+\.\s+/, ''));
      if (!inOrderedList) {
        inOrderedList = true;
        html += '<ol>\n';
      }
      html += `<li>${itemText}</li>\n`;
      continue;
    }

    // Regular paragraphs
    html += `<p>${formatInline(line)}</p>\n`;
  }

  // Close lingering elements
  if (inList) html += '</ul>\n';
  if (inOrderedList) html += '</ol>\n';
  if (inTable) html += '</tbody></table></div>\n';
  if (inBlockquote) html += '</blockquote>\n';

  return { title, subtitle, metaLines, bodyHtml: html };
}

function formatInline(str) {
  return str
    .replace(/&bull;/g, '•')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function buildDocumentHtml(item, parsed) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${parsed.title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cinzel:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {
    size: A4;
    margin: 22mm 18mm 22mm 18mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #1E293B;
    background: #FFFFFF;
    line-height: 1.65;
    font-size: 10.5pt;
    margin: 0;
    padding: 0;
  }

  /* Cover Page */
  .cover-page {
    page-break-after: always;
    min-height: 250mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30mm 15mm 20mm 15mm;
    background: linear-gradient(145deg, #0A0D14 0%, #111827 50%, #0F172A 100%);
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }

  .cover-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 14px;
  }

  .brand-badge {
    font-size: 8.5pt;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: ${item.accent};
    text-transform: uppercase;
  }

  .vault-val {
    font-size: 8pt;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #94A3B8;
    background: rgba(255, 255, 255, 0.07);
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .cover-middle {
    margin: auto 0;
    padding: 20mm 0;
  }

  .pillar-badge {
    display: inline-block;
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.12em;
    padding: 6px 14px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.08);
    border-left: 3px solid ${item.accent};
    color: #F8FAFC;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .cover-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 26pt;
    font-weight: 800;
    line-height: 1.25;
    color: #FFFFFF;
    margin: 0 0 16px 0;
    letter-spacing: -0.02em;
  }

  .cover-subtitle {
    font-size: 13pt;
    font-weight: 400;
    line-height: 1.5;
    color: #CBD5E1;
    margin: 0 0 24px 0;
  }

  .cover-divider {
    width: 60px;
    height: 3px;
    background: ${item.accent};
    margin-bottom: 24px;
  }

  .cover-tagline {
    font-size: 11pt;
    font-weight: 500;
    color: ${item.accent};
    letter-spacing: 0.04em;
  }

  .cover-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 8.5pt;
    color: #94A3B8;
    line-height: 1.5;
  }

  .author-block strong {
    color: #FFFFFF;
    display: block;
    font-size: 9.5pt;
    margin-bottom: 2px;
  }

  .confidential-block {
    text-align: right;
    font-size: 8pt;
    color: #E2E8F0;
  }

  /* Body Content */
  .content-container {
    padding: 0;
  }

  h2.section-heading {
    font-size: 16pt;
    font-weight: 700;
    color: #0F172A;
    margin: 32px 0 14px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #E2E8F0;
    page-break-after: avoid;
    break-after: avoid;
    letter-spacing: -0.01em;
  }

  h3.sub-heading {
    font-size: 12.5pt;
    font-weight: 700;
    color: #1E293B;
    margin: 24px 0 10px 0;
    page-break-after: avoid;
    break-after: avoid;
  }

  h4.minor-heading {
    font-size: 10.5pt;
    font-weight: 700;
    color: #334155;
    margin: 18px 0 8px 0;
    page-break-after: avoid;
    break-after: avoid;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin: 0 0 12px 0;
    color: #334155;
    text-align: justify;
  }

  strong {
    color: #0F172A;
    font-weight: 600;
  }

  ul, ol {
    margin: 0 0 14px 0;
    padding-left: 22px;
  }

  li {
    margin-bottom: 6px;
    color: #334155;
  }

  /* Code & Script formatting */
  code.inline-code {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 8.5pt;
    background: #F1F5F9;
    color: #0F172A;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #E2E8F0;
  }

  /* Callout boxes */
  blockquote.callout-box {
    margin: 18px 0;
    padding: 14px 18px;
    background: #F8FAFC;
    border-left: 4px solid ${item.accent};
    border-radius: 0 6px 6px 0;
    border-top: 1px solid #E2E8F0;
    border-right: 1px solid #E2E8F0;
    border-bottom: 1px solid #E2E8F0;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  blockquote.callout-box p {
    margin: 0 0 6px 0;
    color: #1E293B;
    font-size: 10pt;
  }

  blockquote.callout-box p:last-child {
    margin-bottom: 0;
  }

  /* Tables */
  .table-wrapper {
    margin: 20px 0;
    overflow-x: auto;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
  }

  th {
    background: #0F172A;
    color: #FFFFFF;
    font-weight: 600;
    padding: 10px 12px;
    text-align: left;
    border: 1px solid #1E293B;
    letter-spacing: 0.02em;
  }

  td {
    padding: 9px 12px;
    border: 1px solid #CBD5E1;
    color: #334155;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background: #F8FAFC;
  }

  /* Section Dividers */
  hr.section-divider {
    border: 0;
    height: 1px;
    background: #E2E8F0;
    margin: 26px 0;
  }
</style>
</head>
<body>

<!-- Cover Page -->
<div class="cover-page">
  <div class="cover-top">
    <div class="brand-badge">UNCODED HUB &bull; PRIVATE CLIENT VAULT</div>
    <div class="vault-val">INCLUDED &bull; ₹15,000 VALUE</div>
  </div>

  <div class="cover-middle">
    <div class="pillar-badge">${item.badge}</div>
    <h1 class="cover-title">${parsed.title}</h1>
    <div class="cover-subtitle">${parsed.subtitle || item.tagline}</div>
    <div class="cover-divider"></div>
    <div class="cover-tagline">${item.tagline}</div>
  </div>

  <div class="cover-footer">
    <div class="author-block">
      <strong>Deepak &amp; Geetha</strong>
      Founders &amp; Web Architects, Uncoded Hub<br>
      Bangalore, Karnataka, India
    </div>
    <div class="confidential-block">
      <strong>STRICTLY CONFIDENTIAL</strong><br>
      Licensed Exclusively to Active Clients of Uncoded Hub
    </div>
  </div>
</div>

<!-- Body Content -->
<div class="content-container">
  ${parsed.bodyHtml}
</div>

</body>
</html>`;
}

async function run() {
  console.log('🚀 Starting Client Bonus PDF Compilation with Playwright...');
  const browser = await chromium.launch({ headless: true });

  for (const item of FILES) {
    const mdPath = path.join(MD_DIR, item.input);
    const pdfPath = path.join(OUT_DIR, item.output);

    if (!fs.existsSync(mdPath)) {
      console.error(`❌ Missing file: ${mdPath}`);
      continue;
    }

    console.log(`\n📄 Processing: ${item.input} -> ${item.output}`);
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const parsed = markdownToHtml(mdContent);
    const fullHtml = buildDocumentHtml(item, parsed);

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      margin: {
        top: '22mm',
        bottom: '22mm',
        left: '18mm',
        right: '18mm'
      },
      headerTemplate: `
        <div style="font-size: 7.5pt; font-family: 'Plus Jakarta Sans', sans-serif; color: #94A3B8; width: 100%; display: flex; justify-content: space-between; padding: 0 18mm; border-bottom: 0.5px solid #E2E8F0; padding-bottom: 3px;">
          <span style="font-weight: 600; letter-spacing: 0.05em; color: #64748B;">UNCODED HUB CLIENT ASSET SERIES</span>
          <span style="letter-spacing: 0.03em;">CONFIDENTIAL &bull; CLIENT EDITION</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 7.5pt; font-family: 'Plus Jakarta Sans', sans-serif; color: #94A3B8; width: 100%; display: flex; justify-content: space-between; padding: 0 18mm; border-top: 0.5px solid #E2E8F0; padding-top: 3px;">
          <span>Uncoded Hub &bull; uncodedhub.com</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `
    });

    const stats = fs.statSync(pdfPath);
    console.log(`✅ Generated: ${item.output} (${(stats.size / 1024).toFixed(1)} KB)`);
    await page.close();
  }

  await browser.close();
  console.log('\n🎉 All 5 Client Bonus PDFs compiled successfully!');
}

run().catch(err => {
  console.error('Fatal error during PDF generation:', err);
  process.exit(1);
});
