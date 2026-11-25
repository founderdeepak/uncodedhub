const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_DIR = path.join(__dirname);
const COVERS_DIR = path.join(BASE_DIR, 'Ebook Images', 'Book cover');
const EBOOKS_DIR = path.join(BASE_DIR, 'ebooks');
const FREE_DIR = path.join(BASE_DIR, 'free_ebooks');
const PAID_PDF_OUT = path.join(BASE_DIR, 'compiled_pdfs', 'paid');
const FREE_PDF_OUT = path.join(BASE_DIR, 'compiled_pdfs', 'free');
const GUMROAD_COVERS_OUT = path.join(BASE_DIR, 'gumroad_assets', 'covers');

[PAID_PDF_OUT, FREE_PDF_OUT, GUMROAD_COVERS_OUT].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Color themes matched 1:1 to the Paid Book Covers
const PAID_THEMES = {
  1: { primary: '#D4AF37', secondary: '#E6CA65', dark: '#111318', light: '#F8FAFC', name: 'Charcoal & Champagne Gold' },
  2: { primary: '#C5A059', secondary: '#E0B86C', dark: '#121418', light: '#F9FAFB', name: 'Graphite & Burnished Gold' },
  3: { primary: '#D4AF37', secondary: '#38BDF8', dark: '#0B1528', light: '#F0F9FF', name: 'Executive Navy & Bronze Gold' },
  4: { primary: '#D97757', secondary: '#C88A58', dark: '#2A140E', light: '#FFF7ED', name: 'Terracotta & Warm Bronze' },
  5: { primary: '#A3B18A', secondary: '#DAD7CD', dark: '#151A14', light: '#F4F6F0', name: 'Matte Olive & Ripple Gold' },
  6: { primary: '#C87D65', secondary: '#E5989B', dark: '#201A1E', light: '#FFF1F2', name: 'Stone Grey & Copper Rose' },
  7: { primary: '#818CF8', secondary: '#C7D2FE', dark: '#0B0E26', light: '#EEF2FF', name: 'Midnight Indigo & Moon Gold' },
  8: { primary: '#E5A93C', secondary: '#FDE047', dark: '#0E0F12', light: '#FEFCE8', name: 'Obsidian & Portal Gold' },
  9: { primary: '#D4AF37', secondary: '#FBBF24', dark: '#141619', light: '#F8FAFC', name: 'Charcoal & Metallic Iris Gold' },
  10: { primary: '#E5B842', secondary: '#FBBF24', dark: '#0C0D0F', light: '#FFFBEB', name: 'Matte Black & Key Gold' },
  11: { primary: '#D9A05B', secondary: '#F59E0B', dark: '#2A1810', light: '#FFFBEB', name: 'Cognac Leather & Constellation Gold' },
  12: { primary: '#8D4638', secondary: '#D4AF37', dark: '#1E1B18', light: '#FEF2F2', name: 'Terracotta Slate & Hairline Gold' },
  13: { primary: '#C5A059', secondary: '#E2D4A8', dark: '#0C0D11', light: '#F8FAFC', name: 'Obsidian Marble & Shield Gold' },
  14: { primary: '#0EA5E9', secondary: '#E5A93C', dark: '#101827', light: '#F0F9FF', name: 'Titanium Grey & Tech Gold' },
  15: { primary: '#10B981', secondary: '#34D399', dark: '#0A1D16', light: '#ECFDF5', name: 'Emerald Green & Anchor Gold' },
  16: { primary: '#6366F1', secondary: '#A5B4FC', dark: '#0D1129', light: '#EEF2FF', name: 'Midnight Navy & Orbital Gold' },
  17: { primary: '#EF4444', secondary: '#F59E0B', dark: '#140A0C', light: '#FEF2F2', name: 'Velvet Black & Flame Gold' },
  18: { primary: '#C59B4B', secondary: '#92400E', dark: '#1F1A12', light: '#FEF3C7', name: 'Alabaster Cream & Staircase Gold' },
  19: { primary: '#818CF8', secondary: '#D4AF37', dark: '#0F122B', light: '#EEF2FF', name: 'Slate Indigo & Hourglass Gold' },
  20: { primary: '#D4A373', secondary: '#FAEDCD', dark: '#1E140F', light: '#FFFBEB', name: 'Chocolate Linen & Infinite Gold' },
  21: { primary: '#E5B842', secondary: '#FDE047', dark: '#08080A', light: '#FFFDF5', name: 'Royal Leather & Imperial Gold Crest' },
  22: { primary: '#D4AF37', secondary: '#F3E8FF', dark: '#1A1612', light: '#FAF5FF', name: 'Midnight Bronze & Resonance Gold' },
  23: { primary: '#E5B842', secondary: '#FFDF79', dark: '#060814', light: '#F8FAFC', name: 'Obsidian Archival Navy & 24k Gold' },
  24: { primary: '#B45309', secondary: '#D4AF37', dark: '#1F120E', light: '#FFF7ED', name: 'Terracotta & Interlocking Rings Gold' },
  25: { primary: '#E5B842', secondary: '#D97706', dark: '#0C0E12', light: '#FFFBEB', name: 'Matte Slate & Kintsugi Gold Seam' },
  26: { primary: '#D4AF37', secondary: '#60A5FA', dark: '#07080A', light: '#F0FDF4', name: 'Obsidian & Neural Matrix Gold' },
  27: { primary: '#EA580C', secondary: '#F59E0B', dark: '#121316', light: '#FFF7ED', name: 'Swiss Modernist & Copper Gold' },
  28: { primary: '#D4AF37', secondary: '#FCD34D', dark: '#16181B', light: '#F8FAFC', name: 'Matte Charcoal & Vector Gold' },
  29: { primary: '#DC2626', secondary: '#F59E0B', dark: '#140C0E', light: '#FEF2F2', name: 'Matte Black & Screening Red' },
  30: { primary: '#059669', secondary: '#34D399', dark: '#061A14', light: '#ECFDF5', name: 'Slate Grey & Compass Emerald' },
  31: { primary: '#EAB308', secondary: '#FDE047', dark: '#131518', light: '#FEFCE8', name: 'Graphite & Lightning Gold' },
  32: { primary: '#D97706', secondary: '#FBBF24', dark: '#1C140F', light: '#FFFBEB', name: 'Espresso & Sunrise Amber' }
};

// Color themes matched 1:1 to the Free Book Covers
const FREE_THEMES = {
  1: { primary: '#C25E47', secondary: '#D4AF37', dark: '#1A1817', light: '#FDF8F6', name: 'Alabaster & Terracotta Primer' },
  2: { primary: '#0284C7', secondary: '#38BDF8', dark: '#0F172A', light: '#F0F9FF', name: 'Clean White & Electric Blue' },
  3: { primary: '#0D9488', secondary: '#2DD4BF', dark: '#111E22', light: '#F0FDFA', name: 'Corporate Cream & Office Teal' },
  4: { primary: '#E11D48', secondary: '#FB7185', dark: '#1C0D12', light: '#FFF1F2', name: 'Warm Linen & Rose Crimson' },
  5: { primary: '#7C3AED', secondary: '#A78BFA', dark: '#150C22', light: '#F5F3FF', name: 'Mint Alabaster & Royal Violet' },
  6: { primary: '#D97706', secondary: '#FBBF24', dark: '#1C130E', light: '#FFFBEB', name: 'Rose Cream & Amber Gold' },
  7: { primary: '#4F46E5', secondary: '#818CF8', dark: '#0E0E24', light: '#EEF2FF', name: 'Twilight & Midnight Indigo' },
  8: { primary: '#059669', secondary: '#34D399', dark: '#071A12', light: '#ECFDF5', name: 'Pure White & Green Light Emerald' },
  9: { primary: '#475569', secondary: '#D4AF37', dark: '#0F172A', light: '#F8FAFC', name: 'Slate White & Body Language Gold' },
  10: { primary: '#DC2626', secondary: '#F87171', dark: '#1A0A0C', light: '#FEF2F2', name: 'Warm Alabaster & Red Flag Warning' }
};

function parseMarkdown(md) {
  const lines = md.split(/\r?\n/);
  let title = 'Relationship Guide';
  let subtitle = 'A Tactical Field Manual by Deepak Ravi';
  const bodyLines = [];
  const chapters = [];
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

    if (line.startsWith('## ')) {
      chapters.push(line.replace(/^##\s+/, '').replace(/\*\*/g, '').trim());
    }

    if (line.includes('Love dies from neglect long before it dies from conflict.')) continue;
    bodyLines.push(raw);
  }

  return { title, subtitle, chapters, content: bodyLines.join('\n') };
}

function markdownToHTML(md, theme, bookTitle) {
  let html = '';
  const lines = md.split(/\r?\n/);
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) { html += '</ul>'; inList = false; }
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '');
      html += `<div class="chapter-header">
                 <div class="running-header">
                   <span>${bookTitle}</span>
                   <span style="color:${theme.primary}; font-weight:700;">DEEPAK RAVI OFFICIAL EDITION</span>
                 </div>
                 <span class="chapter-badge" style="color:${theme.primary};">EXECUTIVE CHAPTER</span>
                 <h2 class="section-title">${text}</h2>
                 <div class="gold-rule" style="background:linear-gradient(90deg, ${theme.primary}, transparent); margin: 3mm 0 5mm 0;"></div>
               </div>`;
    } else if (trimmed.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '');
      html += `<h3 class="sub-title">${text}</h3>`;
    } else if (trimmed.startsWith('> ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^>\s+/, '');
      html += `<div class="quote-card" style="border-left-color:${theme.primary};"><span class="quote-symbol" style="color:${theme.primary};">“</span><div class="quote-text">${text}</div></div>`;
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (inList) { html += '</ul>'; inList = false; }
      const match = trimmed.match(/^(\d+)\.\s+(.*)/);
      const num = match[1];
      const text = match[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<div class="numbered-item" style="border-left-color:${theme.primary}; background:${theme.light};"><span class="item-num" style="color:${theme.primary};">${num.padStart(2, '0')}</span><div class="item-content">${text}</div></div>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { html += '<ul class="bullet-list">'; inList = true; }
      const text = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<li>${text}</li>`;
    } else if (trimmed.startsWith('---')) {
      // Lookahead: if next non-empty line starts with '## ' or is end of document, skip
      let nextIdx = i + 1;
      while (nextIdx < lines.length && !lines[nextIdx].trim()) nextIdx++;
      if (nextIdx >= lines.length || lines[nextIdx].trim().startsWith('## ')) {
        continue;
      }
      if (inList) { html += '</ul>'; inList = false; }
      html += `<div class="gold-rule" style="margin: 5mm auto; background:linear-gradient(90deg, transparent, ${theme.primary}88, transparent);"></div>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
      if (text.startsWith('"') || text.startsWith('*"')) {
        html += `<div class="script-bubble" style="background:${theme.dark}; border-left-color:${theme.primary};">${text}</div>`;
      } else {
        html += `<p class="body-p">${text}</p>`;
      }
    }
  }

  if (inList) html += '</ul>';
  return html;
}

function buildRoyalDocument(title, subtitle, chapters, contentHTML, theme, coverBase64, isFree) {
  let tocListHTML = '';
  if (chapters && chapters.length > 0) {
    tocListHTML = chapters.map((ch, idx) => `
      <div class="toc-item">
        <span class="toc-num" style="color:${theme.primary};">${(idx + 1).toString().padStart(2, '0')}</span>
        <span class="toc-text">${ch}</span>
      </div>
    `).join('');
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* UNIFORM PAGE GEOMETRY: Strict 24mm Top & Bottom, 20mm Sides on Every Page */
    @page {
      size: A4 portrait;
      margin-top: 24mm;
      margin-bottom: 24mm;
      margin-left: 20mm;
      margin-right: 20mm;
    }

    /* Cover Page has 0 margin (100% full-bleed cover image) */
    @page :first {
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html, body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      color: #334155;
      background: #FFFFFF;
      font-size: 10pt;
      line-height: 1.65;
    }

    /* 1. COVER PAGE - Full Bleed */
    .cover-page {
      width: 100vw;
      height: 100vh;
      break-after: page;
      page-break-after: always;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #000000;
    }

    .cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 2. TITLE SPREAD - Fits perfectly within 24mm page margins with zero overflow */
    .title-spread {
      break-after: page;
      page-break-after: always;
      height: 242mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      background: #FFFFFF;
      box-sizing: border-box;
    }

    .series-badge {
      font-size: 8pt;
      letter-spacing: 3px;
      color: ${theme.primary};
      text-transform: uppercase;
      font-weight: 700;
    }

    .pre-title {
      font-family: 'Cinzel', serif;
      font-size: 22pt;
      font-weight: 800;
      color: #0F172A;
      margin-top: 3mm;
      margin-bottom: 2.5mm;
      line-height: 1.25;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .pre-sub {
      font-family: 'Cormorant Garamond', serif;
      font-size: 13pt;
      color: #64748B;
      font-style: italic;
      max-width: 135mm;
      margin: 0 auto;
      line-height: 1.4;
    }

    .gold-rule {
      width: 45mm;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, ${theme.primary}, transparent);
      margin: 4mm auto;
    }

    .epigraph-card {
      border: 1px solid #E2E8F0;
      background: #F8FAFC;
      border-radius: 8px;
      padding: 6mm 8mm;
      max-width: 140mm;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .epigraph-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 14pt;
      font-style: italic;
      color: #0F172A;
      line-height: 1.5;
      margin-bottom: 2.5mm;
    }

    .epigraph-author {
      font-family: 'Cinzel', serif;
      font-size: 9pt;
      letter-spacing: 2px;
      color: ${theme.primary};
      font-weight: 700;
      text-transform: uppercase;
    }

    .imprint-footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 3.5mm;
      font-size: 8pt;
      color: #94A3B8;
      line-height: 1.6;
    }

    /* 3. TABLE OF CONTENTS SPREAD - Fits perfectly inside margins */
    .toc-page {
      break-after: page;
      page-break-after: always;
      height: 242mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FFFFFF;
      box-sizing: border-box;
    }

    .toc-header-title {
      font-family: 'Cinzel', serif;
      font-size: 16pt;
      color: #0F172A;
      margin-bottom: 2mm;
    }

    .toc-list {
      margin-top: 3mm;
      display: flex;
      flex-direction: column;
      gap: 2.5mm;
    }

    .toc-item {
      display: flex;
      align-items: baseline;
      gap: 4mm;
      border-bottom: 1px dashed #E2E8F0;
      padding: 2mm 0;
    }

    .toc-num {
      font-family: 'Cinzel', serif;
      font-weight: 700;
      font-size: 10pt;
    }

    .toc-text {
      font-size: 9.8pt;
      font-weight: 600;
      color: #1E293B;
      flex: 1;
    }

    .briefing-box {
      background: #F8FAFC;
      border-left: 3.5px solid ${theme.primary};
      border-radius: 0 8px 8px 0;
      padding: 5mm 6.5mm;
    }

    .briefing-title {
      font-family: 'Cinzel', serif;
      font-size: 10pt;
      color: #0F172A;
      margin-bottom: 1.5mm;
      font-weight: 700;
    }

    /* 4. INTERIOR CONTENT - Governed by strict @page 24mm margin */
    .interior-content {
      background: #FFFFFF;
    }

    .chapter-header {
      break-before: page;
      page-break-before: always;
      margin-bottom: 6mm;
    }

    .interior-content > .chapter-header:first-of-type {
      break-before: auto;
      page-break-before: auto;
    }

    .running-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 2mm;
      margin-bottom: 5mm;
      font-size: 7.5pt;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }

    .chapter-badge {
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      display: block;
      margin-bottom: 1.5mm;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 14.5pt;
      color: #0F172A;
      margin-top: 1mm;
      letter-spacing: 0.5px;
    }

    .sub-title {
      font-size: 11pt;
      color: #1E293B;
      margin: 5mm 0 2mm 0;
      font-weight: 700;
      page-break-after: avoid;
      break-after: avoid;
    }

    .body-p {
      margin-bottom: 3.2mm;
      text-align: justify;
      color: #334155;
      line-height: 1.65;
    }

    /* CARDS & SCRIPT BUBBLES - Anti-Split Geometry */
    .numbered-item {
      display: flex;
      gap: 3.5mm;
      margin-bottom: 3.2mm;
      padding: 3mm 4mm;
      border-radius: 0 6px 6px 0;
      border-left-width: 3.5px;
      border-left-style: solid;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .item-num {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 10pt;
      min-width: 6mm;
    }

    .item-content {
      flex: 1;
      color: #1E293B;
      font-size: 9.8pt;
    }

    .bullet-list {
      margin: 2mm 0 3.5mm 6mm;
      color: #334155;
    }

    .bullet-list li {
      margin-bottom: 1.5mm;
    }

    .quote-card {
      background: #F1F5F9;
      border-left-width: 3.5px;
      border-left-style: solid;
      padding: 3mm 4.5mm;
      margin: 4mm 0;
      border-radius: 0 6px 6px 0;
      display: flex;
      gap: 3mm;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .quote-symbol {
      font-family: 'Cinzel', serif;
      font-size: 18pt;
      line-height: 1;
    }

    .quote-text {
      font-style: italic;
      color: #475569;
      font-size: 9.5pt;
    }

    .script-bubble {
      color: #F8FAFC;
      padding: 3.2mm 4.2mm;
      border-radius: 0 6px 6px 0;
      border-left-width: 3.5px;
      border-left-style: solid;
      margin: 3mm 0;
      font-size: 9.5pt;
      font-style: italic;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* 5. CLOSING BACK MATTER */
    .closing-page {
      break-before: page;
      page-break-before: always;
      text-align: center;
      background: #FFFFFF;
      padding-top: 4mm;
    }

    .closing-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 5mm 7mm;
      background: #F8FAFC;
      margin-top: 4mm;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  </style>
</head>
<body>
  <!-- 1. OFFICIAL FULL-BLEED BOOK COVER -->
  <div class="cover-page">
    <img class="cover-img" src="${coverBase64}" alt="${title} Cover" />
  </div>

  <!-- 2. TITLE, EPIGRAPH & PREFATORY SPREAD -->
  <div class="title-spread">
    <div>
      <div class="series-badge">A DEEPAK RAVI FIELD MANUAL • OFFICIAL AUTHOR EDITION</div>
      <h1 class="pre-title">${title}</h1>
      <div class="pre-sub">${subtitle}</div>
      <div class="gold-rule"></div>
    </div>

    <div class="epigraph-card">
      <div class="epigraph-text">“Love dies from neglect long before it dies from conflict.”</div>
      <div class="epigraph-author">— Deepak Ravi (@founderdeepak)</div>
    </div>

    <div class="imprint-footer">
      <div><strong>Author:</strong> Deepak Ravi (@founderdeepak) • Relationship Analyst & Entrepreneur</div>
      <div><strong>Published Exclusively on Gumroad</strong> • First Official Edition 2026</div>
      <div style="margin-top:1.5mm;">All rights reserved. Designed and published with authentic cover art and royal editorial standards.</div>
    </div>
  </div>

  <!-- 3. TABLE OF CONTENTS & FIELD BRIEFING SPREAD -->
  <div class="toc-page">
    <div>
      <div class="series-badge">EXECUTIVE STRUCTURE</div>
      <h2 class="toc-header-title">Table of Contents</h2>
      <div class="gold-rule" style="margin: 2mm 0 4mm 0;"></div>
      <div class="toc-list">
        ${tocListHTML}
      </div>
    </div>

    <div class="briefing-box">
      <div class="briefing-title">Tactical Field Briefing</div>
      <p style="font-size:9pt; color:#64748B; line-height:1.5;">
        This playbook is engineered for immediate real-world execution. Shaded dark cards indicate high-converting copy-paste text scripts, while numbered cards detail non-verbal behavioral protocols. Read in sequence or refer to specific chapters when navigating active romantic ambiguity.
      </p>
    </div>
  </div>

  <!-- 4. INTERIOR CONTENT -->
  <div class="interior-content">
    ${contentHTML}

    <!-- 5. CLOSING BACK MATTER -->
    <div class="closing-page">
      <div class="gold-rule"></div>
      <h3 style="font-family:'Cinzel', serif; font-size:14pt; margin-bottom:3mm; color:#0F172A; margin-top:2mm;">About the Author</h3>
      <p style="font-size:9.5pt; color:#475569; max-width:130mm; margin:0 auto 4mm auto; line-height:1.6;">
        Deepak Ravi (@founderdeepak) is an entrepreneur and modern relationship analyst whose observations on human attraction, emotional maturity, and communication have reached over 5.9 million readers globally on Threads.
      </p>
      
      <div class="closing-card">
        <h4 style="font-size:10.5pt; font-weight:700; margin-bottom:2mm; color:#0F172A;">Deepen Your Relationship Intelligence</h4>
        <p style="font-size:9pt; color:#64748B; margin-bottom:2.5mm;">
          Unlock the complete tactical library covering modern texting, mixed signals, emotional charisma, and long-term union.
        </p>
        <p style="font-size:8.5pt; font-weight:700; color:#B45309;">
          🎁 Use Code <span style="font-family:monospace; background:#FEF3C7; padding:1px 6px; border-radius:3px;">READER20</span> for 20% off all individual guides and bundles on Gumroad.
        </p>
      </div>

      <p style="font-size:8pt; color:#94A3B8; margin-top:6mm;">
        © 2026 Deepak Ravi. All rights reserved. • Distributed exclusively via Gumroad.
      </p>
    </div>
  </div>
</body>
</html>`;
}

async function runRoyalCompilation() {
  console.log('👑 Launching Royal & Premium Ebook Compilation Engine...\n');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const coverFiles = fs.readdirSync(COVERS_DIR);

  // 1. Process 32 Paid Ebooks
  let paidFiles = fs.readdirSync(EBOOKS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  if (process.env.TARGET_BOOKS) {
    const targets = process.env.TARGET_BOOKS.split(',');
    paidFiles = paidFiles.filter(f => targets.some(t => f.startsWith(t)));
  }

  console.log(`=== COMPILING ${paidFiles.length} PAID ROYAL EDITIONS ===`);

  for (let i = 0; i < paidFiles.length; i++) {
    const file = paidFiles[i];
    const num = parseInt(file.split('_')[0], 10);
    const numStr = file.split('_')[0];
    const slug = file.replace('.md', '');
    const md = fs.readFileSync(path.join(EBOOKS_DIR, file), 'utf8');
    const { title, subtitle, chapters, content } = parseMarkdown(md);

    // Locate exact cover image
    const coverFileName = coverFiles.find(c => c.startsWith(`Book ${numStr} `));
    if (!coverFileName) {
      console.error(`❌ Cover NOT found for Book ${numStr}!`);
      continue;
    }

    const coverPath = path.join(COVERS_DIR, coverFileName);
    const coverBase64 = 'data:image/png;base64,' + fs.readFileSync(coverPath).toString('base64');
    
    fs.copyFileSync(coverPath, path.join(GUMROAD_COVERS_OUT, `${slug}.png`));

    const theme = PAID_THEMES[num] || PAID_THEMES[1];
    const htmlContent = markdownToHTML(content, theme, title);
    const docHTML = buildRoyalDocument(title, subtitle, chapters, htmlContent, theme, coverBase64, false);

    await page.setContent(docHTML, { waitUntil: 'load' });

    const pdfOutPath = path.join(PAID_PDF_OUT, `${slug}.pdf`);
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    console.log(`[${i + 1}/${paidFiles.length}] ✅ Book ${numStr} Completed: "${title}" | Theme: ${theme.name}`);
  }

  if (process.env.SKIP_FREE) {
    await browser.close();
    console.log('\n👑 TARGET PAID EDITIONS SUCCESSFULLY COMPILED!');
    return;
  }

  // 2. Process 10 Free Ebooks
  const freeFiles = fs.readdirSync(FREE_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  console.log(`\n=== COMPILING ${freeFiles.length} FREE ROYAL STARTER EDITIONS ===`);

  for (let i = 0; i < freeFiles.length; i++) {
    const file = freeFiles[i];
    const numStr = file.replace('free_', '').split('_')[0];
    const num = parseInt(numStr, 10);
    const slug = file.replace('.md', '');
    const md = fs.readFileSync(path.join(FREE_DIR, file), 'utf8');
    const { title, subtitle, chapters, content } = parseMarkdown(md);

    // Locate exact cover image
    const coverFileName = coverFiles.find(c => c.startsWith(`Free Book ${numStr} `));
    if (!coverFileName) {
      console.error(`❌ Cover NOT found for Free Book ${numStr}!`);
      continue;
    }

    const coverPath = path.join(COVERS_DIR, coverFileName);
    const coverBase64 = 'data:image/png;base64,' + fs.readFileSync(coverPath).toString('base64');

    fs.copyFileSync(coverPath, path.join(GUMROAD_COVERS_OUT, `${slug}.png`));

    const theme = FREE_THEMES[num] || FREE_THEMES[1];
    const htmlContent = markdownToHTML(content, theme, title);
    const docHTML = buildRoyalDocument(title, subtitle, chapters, htmlContent, theme, coverBase64, true);

    await page.setContent(docHTML, { waitUntil: 'load' });

    const pdfOutPath = path.join(FREE_PDF_OUT, `${slug}.pdf`);
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    console.log(`[Free ${i + 1}/${freeFiles.length}] ✅ Free Book ${numStr} Completed: "${title}" | Theme: ${theme.name}`);
  }

  await browser.close();
  console.log('\n👑 ALL ROYAL EDITIONS SUCCESSFULLY RECOMPILED WITH PERFECT GEOMETRY!');
}

runRoyalCompilation().catch(err => {
  console.error('Compilation failed:', err);
  process.exit(1);
});
