const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_DIR = path.join(__dirname);
const EBOOKS_DIR = path.join(BASE_DIR, 'ebooks');
const FREE_DIR = path.join(BASE_DIR, 'free_ebooks');
const COVERS_OUT = path.join(BASE_DIR, 'gumroad_assets', 'covers');
const PAID_PDF_OUT = path.join(BASE_DIR, 'compiled_pdfs', 'paid');
const FREE_PDF_OUT = path.join(BASE_DIR, 'compiled_pdfs', 'free');

[COVERS_OUT, PAID_PDF_OUT, FREE_PDF_OUT].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Color Themes by Tier
const THEMES = {
  foundation: { bg: '#101216', surface: '#181A20', gold: '#D4AF37', accent: '#E5B842', text: '#F8F9FA', badge: 'FOUNDATIONAL PLAYBOOK' },
  action: { bg: '#0A1813', surface: '#11241D', gold: '#10B981', accent: '#34D399', text: '#F0FDF4', badge: 'ACTION TOOLKIT' },
  systems: { bg: '#101124', surface: '#181A36', gold: '#818CF8', accent: '#A5B4FC', text: '#EEF2FF', badge: 'RELATIONSHIP SYSTEM' },
  master: { bg: '#160E16', surface: '#221622', gold: '#FB7185', accent: '#FDA4AF', text: '#FFF1F2', badge: 'MASTERCLASS VOLUME' },
  codex: { bg: '#070809', surface: '#111317', gold: '#E5B842', accent: '#FDE047', text: '#FFFFFF', badge: 'THE DEFINITIVE CODEX' },
  tactical: { bg: '#15171B', surface: '#1E2127', gold: '#F59E0B', accent: '#FBBF24', text: '#F9FAFB', badge: 'TACTICAL FIELD GUIDE' },
  free: { bg: '#FAF8F5', surface: '#FFFFFF', gold: '#C25E47', accent: '#9A3412', text: '#1A1817', badge: 'OFFICIAL FIELD GUIDE' }
};

function getTheme(filename, isFree) {
  if (isFree) return THEMES.free;
  const num = parseInt(filename.split('_')[0], 10);
  if (num <= 10) return THEMES.foundation;
  if (num <= 15) return THEMES.action;
  if (num <= 20) return THEMES.systems;
  if (num === 23) return THEMES.codex;
  if (num <= 26) return THEMES.master;
  return THEMES.tactical;
}

function parseMarkdown(md) {
  const lines = md.split(/\r?\n/);
  let title = 'Relationship Guide';
  let subtitle = 'A Tactical Field Manual by Deepak Ravi';
  const bodyLines = [];
  let titleSet = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!titleSet && line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').replace(/\*\*/g, '').trim();
      titleSet = true;
      let nextIdx = i + 1;
      while (nextIdx < lines.length && !lines[nextIdx].trim()) nextIdx++;
      if (nextIdx < lines.length && lines[nextIdx].trim().startsWith('### ')) {
        subtitle = lines[nextIdx].trim().replace(/^###\s+/, '').replace(/\*\*/g, '').trim();
        i = nextIdx;
      }
      continue;
    }

    if (line.includes('Love dies from neglect long before it dies from conflict.')) continue;
    bodyLines.push(raw);
  }

  return { title, subtitle, content: bodyLines.join('\n') };
}

function markdownToHTML(md) {
  let html = '';
  const lines = md.split(/\r?\n/);
  let inList = false;

  for (let line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) { html += '</ul>'; inList = false; }
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '');
      html += `<h2 class="section-title">${text}</h2>`;
    } else if (trimmed.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '');
      html += `<h3 class="sub-title">${text}</h3>`;
    } else if (trimmed.startsWith('> ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^>\s+/, '');
      html += `<blockquote class="callout-box">${text}</blockquote>`;
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (inList) { html += '</ul>'; inList = false; }
      const match = trimmed.match(/^(\d+)\.\s+(.*)/);
      const num = match[1];
      const text = match[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<div class="numbered-item"><span class="item-num">${num}</span><div class="item-content">${text}</div></div>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { html += '<ul class="bullet-list">'; inList = true; }
      const text = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<li>${text}</li>`;
    } else if (trimmed.startsWith('---')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<div class="gold-divider"></div>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
      html += `<p class="body-p">${text}</p>`;
    }
  }

  if (inList) html += '</ul>';
  return html;
}

function buildHTMLDocument(title, subtitle, contentHTML, theme, isFree) {
  const isDark = theme.bg !== '#FAF8F5';
  const textColor = isDark ? '#E5E7EB' : '#2D3748';
  const headingColor = isDark ? '#FFFFFF' : '#111827';
  const quoteBg = isDark ? theme.surface : '#F7FAFC';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: ${textColor};
      background: #FFFFFF;
      font-size: 11pt;
      line-height: 1.7;
    }

    /* COVER PAGE */
    .cover-page {
      page-break-after: always;
      width: 210mm;
      height: 297mm;
      background: ${theme.bg};
      color: ${theme.text};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24mm 20mm;
      position: relative;
      overflow: hidden;
    }

    .cover-border-outer {
      position: absolute;
      inset: 12mm;
      border: 1.5px solid ${theme.gold};
      pointer-events: none;
    }

    .cover-border-inner {
      position: absolute;
      inset: 15mm;
      border: 0.5px solid ${theme.accent};
      opacity: 0.4;
      pointer-events: none;
    }

    .cover-badge {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8.5pt;
      letter-spacing: 3px;
      color: ${theme.gold};
      text-transform: uppercase;
      font-weight: 700;
      text-align: center;
      margin-top: 8mm;
    }

    .cover-main-lockup {
      text-align: center;
      padding: 0 5mm;
    }

    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 26pt;
      font-weight: 800;
      color: ${theme.text};
      line-height: 1.25;
      letter-spacing: 1.5px;
      margin-bottom: 6mm;
      text-transform: uppercase;
    }

    .cover-divider {
      width: 50mm;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, ${theme.gold}, transparent);
      margin: 0 auto 6mm auto;
    }

    .cover-subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-size: 14pt;
      font-weight: 600;
      color: ${theme.gold};
      line-height: 1.45;
      font-style: italic;
      max-width: 140mm;
      margin: 0 auto;
    }

    .cover-author-block {
      text-align: center;
      margin-bottom: 8mm;
    }

    .cover-author-name {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 700;
      letter-spacing: 3px;
      color: ${theme.gold};
      text-transform: uppercase;
      margin-bottom: 2mm;
    }

    .cover-author-tag {
      font-size: 9pt;
      color: ${isDark ? '#9CA3AF' : '#64748B'};
      margin-bottom: 4mm;
    }

    .cover-quote {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 10.5pt;
      color: ${theme.accent};
      opacity: 0.9;
    }

    /* INTERIOR PAGES */
    .interior-content {
      padding: 24mm 22mm 24mm 22mm;
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 3mm;
      margin-bottom: 8mm;
      font-size: 8pt;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      color: ${headingColor};
      margin: 10mm 0 4mm 0;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid ${theme.gold};
      padding-bottom: 2mm;
    }

    .sub-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12pt;
      color: ${isDark ? '#374151' : '#1E293B'};
      margin: 6mm 0 3mm 0;
      font-weight: 700;
    }

    .body-p {
      margin-bottom: 4mm;
      text-align: justify;
    }

    .numbered-item {
      display: flex;
      gap: 4mm;
      margin-bottom: 4.5mm;
      background: ${quoteBg};
      padding: 3.5mm 4mm;
      border-radius: 4px;
      border-left: 3px solid ${theme.gold};
    }

    .item-num {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      color: ${theme.gold};
      font-size: 11pt;
      min-width: 6mm;
    }

    .item-content {
      flex: 1;
    }

    .bullet-list {
      margin: 3mm 0 5mm 6mm;
    }

    .bullet-list li {
      margin-bottom: 2mm;
    }

    .callout-box {
      background: ${quoteBg};
      border-left: 3.5px solid ${theme.gold};
      padding: 4mm 5mm;
      margin: 6mm 0;
      font-style: italic;
      color: #4B5563;
      border-radius: 0 4px 4px 0;
    }

    .gold-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #CBD5E1, transparent);
      margin: 8mm 0;
    }

    .closing-page {
      page-break-before: always;
      padding: 24mm 22mm;
      text-align: center;
    }

    .closing-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 8mm;
      background: #F8FAFC;
      margin-top: 6mm;
    }
  </style>
</head>
<body>
  <!-- 1. LUXURY COVER -->
  <div class="cover-page" id="book-cover">
    <div class="cover-border-outer"></div>
    <div class="cover-border-inner"></div>

    <div class="cover-badge">${theme.badge}</div>

    <div class="cover-main-lockup">
      <div class="cover-title">${title}</div>
      <div class="cover-divider"></div>
      <div class="cover-subtitle">${subtitle}</div>
    </div>

    <div class="cover-author-block">
      <div class="cover-author-name">Deepak Ravi</div>
      <div class="cover-author-tag">@founderdeepak • Relationship Analyst</div>
      <div class="cover-quote">"Love dies from neglect long before it dies from conflict."</div>
    </div>
  </div>

  <!-- 2. INTERIOR CONTENT -->
  <div class="interior-content">
    <div class="header-bar">
      <span>${title}</span>
      <span>Deepak Ravi Official Edition</span>
    </div>

    ${contentHTML}

    <!-- Closing Back Matter -->
    <div class="closing-page">
      <div class="cover-divider" style="background:#D4AF37; margin:0 auto 6mm auto;"></div>
      <h3 style="font-family:'Cinzel', serif; font-size:14pt; margin-bottom:3mm;">About the Author</h3>
      <p style="font-size:10pt; color:#4B5563; max-width:130mm; margin:0 auto 6mm auto; line-height:1.6;">
        Deepak Ravi (@founderdeepak) is an entrepreneur and modern relationship analyst whose observations on human attraction, emotional maturity, and communication have reached over 5.9 million readers globally.
      </p>
      
      <div class="closing-card">
        <h4 style="font-size:11pt; font-weight:700; margin-bottom:2mm; color:#1E293B;">Deepen Your Relationship Intelligence</h4>
        <p style="font-size:9.5pt; color:#64748B; margin-bottom:4mm;">
          Unlock the complete 32-book tactical library covering modern texting, mixed signals, emotional charisma, and long-term union.
        </p>
        <p style="font-size:9pt; font-weight:700; color:#B45309;">
          🎁 Use Code <span style="font-family:monospace; background:#FEF3C7; padding:1px 6px; border-radius:3px;">READER20</span> for 20% off all individual guides and bundles.
        </p>
      </div>

      <p style="font-size:8.5pt; color:#94A3B8; margin-top:8mm;">
        © 2026 Deepak Ravi. All rights reserved. • Distributed exclusively via Gumroad.
      </p>
    </div>
  </div>
</body>
</html>`;
}

async function compileAll() {
  console.log('Launching Playwright Chromium Engine...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. Process Paid Ebooks
  const paidFiles = fs.readdirSync(EBOOKS_DIR).filter(f => f.endsWith('.md')).sort();
  console.log(`\nCompiling ${paidFiles.length} Paid Books...`);

  for (let i = 0; i < paidFiles.length; i++) {
    const file = paidFiles[i];
    const slug = file.replace('.md', '');
    const mdPath = path.join(EBOOKS_DIR, file);
    const md = fs.readFileSync(mdPath, 'utf8');
    const { title, subtitle, content } = parseMarkdown(md);
    const theme = getTheme(file, false);
    const htmlContent = markdownToHTML(content);
    const docHTML = buildHTMLDocument(title, subtitle, htmlContent, theme, false);

    await page.setContent(docHTML, { waitUntil: 'networkidle' });

    // Export standalone cover PNG (1600x2400)
    const coverEl = await page.$('#book-cover');
    if (coverEl) {
      const coverOutPath = path.join(COVERS_OUT, `${slug}.png`);
      await coverEl.screenshot({ path: coverOutPath });
    }

    // Export full PDF
    const pdfOutPath = path.join(PAID_PDF_OUT, `${slug}.pdf`);
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    console.log(`[${i + 1}/${paidFiles.length}] Completed: ${title} -> ${slug}.pdf`);
  }

  // 2. Process Free Ebooks
  const freeFiles = fs.readdirSync(FREE_DIR).filter(f => f.endsWith('.md')).sort();
  console.log(`\nCompiling ${freeFiles.length} Free Lead Magnets...`);

  for (let i = 0; i < freeFiles.length; i++) {
    const file = freeFiles[i];
    const slug = file.replace('.md', '');
    const mdPath = path.join(FREE_DIR, file);
    const md = fs.readFileSync(mdPath, 'utf8');
    const { title, subtitle, content } = parseMarkdown(md);
    const theme = getTheme(file, true);
    const htmlContent = markdownToHTML(content);
    const docHTML = buildHTMLDocument(title, subtitle, htmlContent, theme, true);

    await page.setContent(docHTML, { waitUntil: 'networkidle' });

    // Export standalone cover PNG
    const coverEl = await page.$('#book-cover');
    if (coverEl) {
      const coverOutPath = path.join(COVERS_OUT, `${slug}.png`);
      await coverEl.screenshot({ path: coverOutPath });
    }

    // Export full PDF
    const pdfOutPath = path.join(FREE_PDF_OUT, `${slug}.pdf`);
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    console.log(`[Free ${i + 1}/${freeFiles.length}] Completed: ${title} -> ${slug}.pdf`);
  }

  await browser.close();
  console.log('\n🎉 ALL 42 EBOOKS & COVERS BUILT SUCCESSFULLY!');
}

compileAll().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
