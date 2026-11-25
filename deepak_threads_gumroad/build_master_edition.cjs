const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_DIR = path.join(__dirname);
const EBOOKS_DIR = path.join(BASE_DIR, 'ebooks');
const FREE_DIR = path.join(BASE_DIR, 'free_ebooks');
const COVERS_OUT = path.join(BASE_DIR, 'gumroad_assets', 'covers');
const BUNDLES_OUT = path.join(BASE_DIR, 'gumroad_assets', 'bundles');
const PAID_PDF_OUT = path.join(BASE_DIR, 'compiled_pdfs', 'paid');
const FREE_PDF_OUT = path.join(BASE_DIR, 'compiled_pdfs', 'free');

[COVERS_OUT, BUNDLES_OUT, PAID_PDF_OUT, FREE_PDF_OUT].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. Bespoke Geometric SVG Emblems for all 32 Books
const EMBLEMS = {
  1: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M10,50 Q25,20 40,50 T70,50 T100,50 M10,50 Q25,80 40,50 T70,50 T100,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2"/></svg>`,
  2: `<svg viewBox="0 0 100 100" class="emblem-svg"><polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" stroke-width="1"/><line x1="50" y1="48" x2="85" y2="48" stroke="currentColor" stroke-width="1.5"/></svg>`,
  3: `<svg viewBox="0 0 100 100" class="emblem-svg"><rect x="35" y="25" width="30" height="60" fill="none" stroke="currentColor" stroke-width="2"/><rect x="20" y="45" width="15" height="40" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="65" y="40" width="15" height="45" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="10" x2="50" y2="25" stroke="currentColor" stroke-width="2"/></svg>`,
  4: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="42" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="58" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  5: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="50" r="6" fill="currentColor"/><circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4,3"/></svg>`,
  6: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M50,20 A30,30 0 0,0 20,50 A30,30 0 0,0 50,80 A30,30 0 0,0 80,50" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,30 A20,20 0 0,0 30,50 A20,20 0 0,0 50,70" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  7: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M50,15 A35,35 0 0,0 75,70 A30,30 0 1,1 50,15 Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="35" r="2" fill="currentColor"/><circle cx="25" cy="55" r="1.5" fill="currentColor"/></svg>`,
  8: `<svg viewBox="0 0 100 100" class="emblem-svg"><rect x="30" y="20" width="40" height="65" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30,20 L50,40 L50,85 L30,85 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="52" x2="46" y2="52" stroke="currentColor" stroke-width="3"/></svg>`,
  9: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M15,50 Q50,20 85,50 Q50,80 15,50 Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="6" fill="currentColor"/></svg>`,
  10: `<svg viewBox="0 0 100 100" class="emblem-svg"><rect x="30" y="45" width="40" height="35" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40,45 V32 A10,10 0 0,1 60,32 V25" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="62" r="4" fill="currentColor"/></svg>`,
  11: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="25" cy="30" r="3" fill="currentColor"/><circle cx="70" cy="25" r="3" fill="currentColor"/><circle cx="50" cy="50" r="4" fill="currentColor"/><circle cx="30" cy="75" r="3" fill="currentColor"/><circle cx="75" cy="70" r="3" fill="currentColor"/><line x1="25" y1="30" x2="50" y2="50" stroke="currentColor" stroke-width="1"/><line x1="70" y1="25" x2="50" y2="50" stroke="currentColor" stroke-width="1"/><line x1="50" y1="50" x2="30" y2="75" stroke="currentColor" stroke-width="1"/><line x1="50" y1="50" x2="75" y2="70" stroke="currentColor" stroke-width="1"/></svg>`,
  12: `<svg viewBox="0 0 100 100" class="emblem-svg"><rect x="25" y="20" width="25" height="60" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="50" y="20" width="25" height="60" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="2"/></svg>`,
  13: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M50,15 L78,25 V55 C78,72 50,85 50,85 C50,85 22,72 22,55 V25 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" stroke-width="1.5"/><line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" stroke-width="1.5"/></svg>`,
  14: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M20,60 Q30,30 50,30 Q70,30 80,60" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30,60 Q40,42 50,42 Q60,42 70,60" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="62" r="5" fill="currentColor"/></svg>`,
  15: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="22" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="29" x2="50" y2="78" stroke="currentColor" stroke-width="2.5"/><line x1="30" y1="40" x2="70" y2="40" stroke="currentColor" stroke-width="2.5"/><path d="M22,62 C22,78 78,78 78,62" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`,
  16: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  17: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M50,15 C55,30 75,45 65,65 C60,75 50,85 50,85 C50,85 30,70 35,50 C38,40 50,35 50,15 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,55 C52,62 58,68 55,75 C52,78 50,82 50,82" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  18: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M20,80 H35 V65 H50 V50 H65 V35 H80 V20" fill="none" stroke="currentColor" stroke-width="2"/><line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3"/></svg>`,
  19: `<svg viewBox="0 0 100 100" class="emblem-svg"><polygon points="30,20 70,20 50,50" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="30,80 70,80 50,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="25" y1="20" x2="75" y2="20" stroke="currentColor" stroke-width="2.5"/><line x1="25" y1="80" x2="75" y2="80" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="62" r="2" fill="currentColor"/></svg>`,
  20: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M35,50 C20,35 20,65 35,50 C50,35 50,65 65,50 C80,35 80,65 65,50 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  21: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M20,65 L28,35 L40,50 L50,25 L60,50 L72,35 L80,65 Z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="20" y="65" width="60" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="22" r="3" fill="currentColor"/></svg>`,
  22: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M10,50 C25,25 35,75 50,50 C65,25 75,75 90,50" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15,50 C28,35 36,65 50,50 C64,35 72,65 85,50" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/></svg>`,
  23: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2,2"/><text x="50" y="55" font-family="'Cinzel', serif" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle">MMXXVI</text></svg>`,
  24: `<svg viewBox="0 0 100 100" class="emblem-svg"><ellipse cx="44" cy="50" rx="22" ry="14" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-20 44 50)"/><ellipse cx="56" cy="50" rx="22" ry="14" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(20 56 50)"/></svg>`,
  25: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M50,10 Q45,30 52,42 T48,65 Q55,78 50,90" fill="none" stroke="currentColor" stroke-width="3"/><path d="M48,42 L35,50" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M51,65 L65,70" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  26: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="25" r="4" fill="currentColor"/><circle cx="25" cy="50" r="4" fill="currentColor"/><circle cx="75" cy="50" r="4" fill="currentColor"/><circle cx="35" cy="75" r="4" fill="currentColor"/><circle cx="65" cy="75" r="4" fill="currentColor"/><circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="25" x2="50" y2="44" stroke="currentColor" stroke-width="1.2"/><line x1="25" y1="50" x2="44" y2="50" stroke="currentColor" stroke-width="1.2"/><line x1="75" y1="50" x2="56" y2="50" stroke="currentColor" stroke-width="1.2"/><line x1="50" y1="56" x2="35" y2="75" stroke="currentColor" stroke-width="1.2"/><line x1="50" y1="56" x2="65" y2="75" stroke="currentColor" stroke-width="1.2"/></svg>`,
  27: `<svg viewBox="0 0 100 100" class="emblem-svg"><rect x="25" y="25" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"/><rect x="53" y="25" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"/><rect x="25" y="53" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"/><rect x="53" y="53" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  28: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50,34 V65 M30,45 L70,45 M35,85 L50,65 L65,85" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  29: `<svg viewBox="0 0 100 100" class="emblem-svg"><path d="M25,35 L50,55 L75,35" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25,50 L50,70 L75,50" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  30: `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="50,18 55,45 82,50 55,55 50,82 45,55 18,50 45,45" fill="currentColor"/></svg>`,
  31: `<svg viewBox="0 0 100 100" class="emblem-svg"><polygon points="55,15 25,55 48,55 45,85 75,45 52,45" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  32: `<svg viewBox="0 0 100 100" class="emblem-svg"><line x1="15" y1="65" x2="85" y2="65" stroke="currentColor" stroke-width="2"/><path d="M30,65 A20,20 0 0,1 70,65" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="35" x2="50" y2="25" stroke="currentColor" stroke-width="1.5"/><line x1="32" y1="42" x2="25" y2="35" stroke="currentColor" stroke-width="1.5"/><line x1="68" y1="42" x2="75" y2="35" stroke="currentColor" stroke-width="1.5"/></svg>`
};

const DEFAULT_EMBLEM = `<svg viewBox="0 0 100 100" class="emblem-svg"><circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="currentColor"/></svg>`;

// Tier Metadata
const THEMES = {
  foundation: { bg: '#0E1116', surface: '#161B22', gold: '#D4AF37', accent: '#E6CA65', text: '#F8F9FA', badge: 'FOUNDATIONAL PLAYBOOK • $7', tierName: 'Core Foundational Series' },
  action: { bg: '#091A14', surface: '#102A20', gold: '#10B981', accent: '#34D399', text: '#F0FDF4', badge: 'ACTION TOOLKIT • $9', tierName: 'Tactical Action Series' },
  systems: { bg: '#0F1026', surface: '#1A1C3E', gold: '#818CF8', accent: '#C7D2FE', text: '#EEF2FF', badge: 'RELATIONSHIP SYSTEM • $14', tierName: 'Relationship Dynamics Series' },
  master: { bg: '#170E17', surface: '#281728', gold: '#FB7185', accent: '#FECDD3', text: '#FFF1F2', badge: 'MASTERCLASS VOLUME • $19–$24', tierName: 'Masterwork Psychology Series' },
  codex: { bg: '#060709', surface: '#111317', gold: '#E5B842', accent: '#FDE047', text: '#FFFFFF', badge: 'THE DEFINITIVE CODEX • $29', tierName: 'The Definitive Lifetime Reference' },
  tactical: { bg: '#131518', surface: '#1E2126', gold: '#F59E0B', accent: '#FDE68A', text: '#F9FAFB', badge: 'TACTICAL FIELD GUIDE • $5', tierName: 'Pocket Field Guide Series' },
  free: { bg: '#FAF8F5', surface: '#FFFFFF', gold: '#C25E47', accent: '#9A3412', text: '#1A1817', badge: 'FREE STARTER PRIMER • $0', tierName: 'Official Reader Lead Magnet' }
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

function markdownToHTML(md, theme) {
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
      html += `<div class="chapter-break"></div>
               <div class="chapter-header">
                 <span class="chapter-tag">EXECUTIVE CHAPTER</span>
                 <h2 class="section-title">${text}</h2>
                 <div class="gold-rule"></div>
               </div>`;
    } else if (trimmed.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '');
      html += `<h3 class="sub-title">${text}</h3>`;
    } else if (trimmed.startsWith('> ')) {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/^>\s+/, '');
      html += `<div class="quote-card"><span class="quote-symbol">“</span><div class="quote-text">${text}</div></div>`;
    } else if (/^\d+\.\s+/.test(trimmed)) {
      if (inList) { html += '</ul>'; inList = false; }
      const match = trimmed.match(/^(\d+)\.\s+(.*)/);
      const num = match[1];
      const text = match[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<div class="numbered-item"><span class="item-num">${num.padStart(2, '0')}</span><div class="item-content">${text}</div></div>`;
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { html += '<ul class="bullet-list">'; inList = true; }
      const text = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<li>${text}</li>`;
    } else if (trimmed.startsWith('---')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<div class="gold-rule" style="margin: 8mm auto;"></div>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      const text = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Format dialog/text message lines cleanly
      if (text.startsWith('"') || text.startsWith('*"')) {
        html += `<div class="script-bubble">${text}</div>`;
      } else {
        html += `<p class="body-p">${text}</p>`;
      }
    }
  }

  if (inList) html += '</ul>';
  return html;
}

function buildHTMLDocument(bookId, title, subtitle, chapters, contentHTML, theme, isFree) {
  const emblemSVG = (!isFree && EMBLEMS[bookId]) ? EMBLEMS[bookId] : DEFAULT_EMBLEM;
  const isDark = theme.bg !== '#FAF8F5';
  const textColor = isDark ? '#E5E7EB' : '#2D3748';
  const headingColor = isDark ? '#FFFFFF' : '#111827';
  const cardBg = isDark ? theme.surface : '#F8FAFC';

  let tocHTML = '';
  if (chapters && chapters.length > 0) {
    tocHTML = `<div class="toc-spread">
      <div class="toc-header">
        <span class="chapter-tag">EXECUTIVE STRUCTURE</span>
        <h3 class="toc-title">Table of Contents</h3>
        <div class="gold-rule"></div>
      </div>
      <div class="toc-grid">
        ${chapters.map((ch, idx) => `
          <div class="toc-item">
            <span class="toc-num">${(idx + 1).toString().padStart(2, '0')}</span>
            <span class="toc-text">${ch}</span>
          </div>
        `).join('')}
      </div>
    </div>`;
  }

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
      font-size: 10.5pt;
      line-height: 1.7;
    }

    /* 1. ULTRA-LUXURY COVER */
    .cover-page {
      page-break-after: always;
      width: 210mm;
      height: 297mm;
      background: ${theme.bg};
      color: ${theme.text};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 22mm 18mm;
      position: relative;
      overflow: hidden;
    }

    .cover-border-outer {
      position: absolute;
      inset: 10mm;
      border: 1.5px solid ${theme.gold};
      pointer-events: none;
    }

    .cover-border-inner {
      position: absolute;
      inset: 13mm;
      border: 0.5px solid ${theme.accent};
      opacity: 0.35;
      pointer-events: none;
    }

    .corner-decor {
      position: absolute;
      width: 6mm;
      height: 6mm;
      border: 1.5px solid ${theme.gold};
    }
    .tl { top: 9mm; left: 9mm; border-right: none; border-bottom: none; }
    .tr { top: 9mm; right: 9mm; border-left: none; border-bottom: none; }
    .bl { bottom: 9mm; left: 9mm; border-right: none; border-top: none; }
    .br { bottom: 9mm; right: 9mm; border-left: none; border-top: none; }

    .cover-top {
      text-align: center;
      margin-top: 4mm;
    }

    .series-badge {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8pt;
      letter-spacing: 3px;
      color: ${theme.gold};
      text-transform: uppercase;
      font-weight: 700;
      display: inline-block;
      padding: 2mm 6mm;
      border: 0.5px solid ${theme.gold}44;
      border-radius: 50px;
    }

    .cover-center {
      text-align: center;
      padding: 0 4mm;
      margin: auto 0;
    }

    .emblem-wrapper {
      width: 32mm;
      height: 32mm;
      margin: 0 auto 8mm auto;
      color: ${theme.gold};
      opacity: 0.95;
      filter: drop-shadow(0 0 10px ${theme.gold}33);
    }
    .emblem-svg {
      width: 100%;
      height: 100%;
    }

    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 25pt;
      font-weight: 800;
      color: ${theme.text};
      line-height: 1.22;
      letter-spacing: 1.2px;
      margin-bottom: 5mm;
      text-transform: uppercase;
    }

    .gold-rule {
      width: 45mm;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, ${theme.gold}, transparent);
      margin: 0 auto 5mm auto;
    }

    .cover-subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-size: 13.5pt;
      font-weight: 600;
      color: ${theme.accent};
      line-height: 1.45;
      font-style: italic;
      max-width: 135mm;
      margin: 0 auto;
    }

    .cover-bottom {
      text-align: center;
      margin-bottom: 4mm;
    }

    .author-name {
      font-family: 'Cinzel', serif;
      font-size: 12pt;
      font-weight: 700;
      letter-spacing: 3px;
      color: ${theme.gold};
      text-transform: uppercase;
      margin-bottom: 1.5mm;
    }

    .author-bio {
      font-size: 8.5pt;
      color: ${isDark ? '#9CA3AF' : '#64748B'};
      margin-bottom: 3mm;
    }

    .signature-quote {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 10pt;
      color: ${theme.gold};
      opacity: 0.85;
    }

    /* 2. PREFATORY / TITLE PAGE */
    .prefatory-page {
      page-break-after: always;
      padding: 28mm 24mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }

    .pre-top {
      font-size: 8.5pt;
      color: #94A3B8;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .pre-title {
      font-family: 'Cinzel', serif;
      font-size: 20pt;
      color: #0F172A;
      margin-bottom: 3mm;
    }

    .pre-sub {
      font-family: 'Cormorant Garamond', serif;
      font-size: 12.5pt;
      color: #64748B;
      font-style: italic;
      max-width: 120mm;
      margin: 0 auto;
    }

    .imprint-box {
      border-top: 1px solid #E2E8F0;
      padding-top: 6mm;
      font-size: 8pt;
      color: #94A3B8;
      line-height: 1.6;
    }

    /* 3. TOC & EPIGRAPH */
    .toc-spread {
      page-break-after: always;
      padding: 24mm 22mm;
    }

    .chapter-tag {
      font-size: 8pt;
      font-weight: 700;
      color: ${theme.gold};
      letter-spacing: 2.5px;
      text-transform: uppercase;
      display: block;
      margin-bottom: 2mm;
    }

    .toc-title {
      font-family: 'Cinzel', serif;
      font-size: 16pt;
      color: #0F172A;
      margin-bottom: 4mm;
    }

    .toc-grid {
      margin-top: 8mm;
      display: flex;
      flex-direction: column;
      gap: 3.5mm;
    }

    .toc-item {
      display: flex;
      align-items: baseline;
      gap: 4mm;
      border-bottom: 0.5px dashed #E2E8F0;
      padding-bottom: 2.5mm;
    }

    .toc-num {
      font-family: 'Cinzel', serif;
      font-weight: 700;
      color: ${theme.gold};
      font-size: 10pt;
    }

    .toc-text {
      font-size: 10pt;
      font-weight: 600;
      color: #1E293B;
      flex: 1;
    }

    /* 4. INTERIOR CONTENT SPREAD */
    .interior-content {
      padding: 22mm 22mm 22mm 22mm;
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 2.5mm;
      margin-bottom: 8mm;
      font-size: 8pt;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }

    .chapter-break {
      page-break-before: always;
      height: 6mm;
    }

    .chapter-header {
      margin-bottom: 6mm;
    }

    .section-title {
      font-family: 'Cinzel', serif;
      font-size: 14pt;
      color: #0F172A;
      margin-top: 1mm;
      letter-spacing: 0.5px;
    }

    .sub-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 11pt;
      color: #1E293B;
      margin: 6mm 0 3mm 0;
      font-weight: 700;
    }

    .body-p {
      margin-bottom: 3.5mm;
      text-align: justify;
      color: #334155;
    }

    .numbered-item {
      display: flex;
      gap: 4mm;
      margin-bottom: 4mm;
      background: #F8FAFC;
      padding: 3.5mm 4.5mm;
      border-radius: 6px;
      border-left: 3px solid ${theme.gold};
    }

    .item-num {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      color: ${theme.gold};
      font-size: 10.5pt;
      min-width: 6mm;
    }

    .item-content {
      flex: 1;
      color: #1E293B;
    }

    .bullet-list {
      margin: 3mm 0 5mm 6mm;
      color: #334155;
    }

    .bullet-list li {
      margin-bottom: 1.5mm;
    }

    .quote-card {
      background: #F1F5F9;
      border-left: 3.5px solid ${theme.gold};
      padding: 4mm 5mm;
      margin: 5mm 0;
      border-radius: 0 6px 6px 0;
      display: flex;
      gap: 3mm;
    }

    .quote-symbol {
      font-family: 'Cinzel', serif;
      font-size: 20pt;
      line-height: 1;
      color: ${theme.gold};
    }

    .quote-text {
      font-style: italic;
      color: #475569;
      font-size: 9.5pt;
    }

    .script-bubble {
      background: #0F172A;
      color: #F8FAFC;
      padding: 3mm 4.5mm;
      border-radius: 6px;
      border-left: 3px solid ${theme.gold};
      margin: 3mm 0 4mm 0;
      font-size: 9.5pt;
      font-style: italic;
    }

    /* 5. CLOSING BACK MATTER */
    .closing-page {
      page-break-before: always;
      padding: 24mm 22mm;
      text-align: center;
    }

    .closing-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 7mm;
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
    <div class="corner-decor tl"></div>
    <div class="corner-decor tr"></div>
    <div class="corner-decor bl"></div>
    <div class="corner-decor br"></div>

    <div class="cover-top">
      <span class="series-badge">${theme.badge}</span>
    </div>

    <div class="cover-center">
      <div class="emblem-wrapper">${emblemSVG}</div>
      <div class="cover-title">${title}</div>
      <div class="gold-rule"></div>
      <div class="cover-subtitle">${subtitle}</div>
    </div>

    <div class="cover-bottom">
      <div class="author-name">Deepak Ravi</div>
      <div class="author-bio">@founderdeepak • Relationship Analyst</div>
      <div class="signature-quote">"Love dies from neglect long before it dies from conflict."</div>
    </div>
  </div>

  <!-- 2. PREFATORY / TITLE PAGE -->
  <div class="prefatory-page">
    <div class="pre-top">
      <div>A DEEPAK RAVI FIELD MANUAL • OFFICIAL EDITION</div>
      <div style="margin-top:1mm; color:${theme.gold}; font-weight:700;">${theme.tierName}</div>
    </div>

    <div>
      <div class="pre-title">${title}</div>
      <div class="pre-sub">${subtitle}</div>
      <div class="gold-rule" style="margin-top:5mm;"></div>
    </div>

    <div class="imprint-box">
      <div><strong>Author:</strong> Deepak Ravi (@founderdeepak)</div>
      <div><strong>Platform:</strong> The Deepak Ravi Digital Publishing Empire</div>
      <div>Published Exclusively on Gumroad • First Edition 2026</div>
      <div style="margin-top:2mm; font-style:italic;">All rights reserved. No part of this publication may be reproduced without prior permission.</div>
    </div>
  </div>

  <!-- 3. TABLE OF CONTENTS -->
  ${tocHTML}

  <!-- 4. INTERIOR CONTENT -->
  <div class="interior-content">
    <div class="header-bar">
      <span>${title}</span>
      <span>DEEPAK RAVI OFFICIAL EDITION</span>
    </div>

    ${contentHTML}

    <!-- 5. CLOSING BACK MATTER -->
    <div class="closing-page">
      <div class="gold-rule"></div>
      <h3 style="font-family:'Cinzel', serif; font-size:14pt; margin-bottom:3mm; color:#0F172A;">About the Author</h3>
      <p style="font-size:9.5pt; color:#475569; max-width:130mm; margin:0 auto 6mm auto; line-height:1.6;">
        Deepak Ravi (@founderdeepak) is an entrepreneur and modern relationship analyst whose observations on human attraction, emotional maturity, and communication have reached over 5.9 million readers globally.
      </p>
      
      <div class="closing-card">
        <h4 style="font-size:10.5pt; font-weight:700; margin-bottom:2mm; color:#0F172A;">Deepen Your Relationship Intelligence</h4>
        <p style="font-size:9pt; color:#64748B; margin-bottom:3.5mm;">
          Unlock the complete 32-book tactical library covering modern texting, mixed signals, emotional charisma, and long-term union.
        </p>
        <p style="font-size:8.5pt; font-weight:700; color:#B45309;">
          🎁 Use Code <span style="font-family:monospace; background:#FEF3C7; padding:1px 6px; border-radius:3px;">READER20</span> for 20% off all individual guides and bundles.
        </p>
      </div>

      <p style="font-size:8pt; color:#94A3B8; margin-top:8mm;">
        © 2026 Deepak Ravi. All rights reserved. • Distributed exclusively via Gumroad.
      </p>
    </div>
  </div>
</body>
</html>`;
}

// 15 Bundles Specification
const BUNDLES = [
  { id: 1, title: 'The Modern Texting & Flirting Toolkit', price: '$9', books: 'Books 02 + 07', desc: '75 Copy-Paste Texts & Late-Night Intimacy Protocols', tag: 'BESTSELLER' },
  { id: 2, title: 'The Silent Signs & Body Language Pack', price: '$14', books: 'Books 01 + 08 + 09', desc: 'Decode Involuntary Signals, Green Lights & Micro-Tells', tag: 'POPULAR' },
  { id: 3, title: 'The High-Stakes Romance Kit', price: '$14', books: 'Books 03 + 04 + 01', desc: 'Workplace Chemistry & Moving Past The Friend Zone', tag: 'TACTICAL' },
  { id: 4, title: 'The Deep Connection & Intimacy Masterclass', price: '$14', books: 'Books 05 + 06 + 10', desc: 'Quiet Chemistry, Compliments & The Situationship Exit', tag: 'CORE' },
  { id: 5, title: 'The Complete 10-Book Original Vault', price: '$29', books: 'Books 01 through 10', desc: 'The Entire Foundational Collection in One Slipcase', tag: 'FLAGSHIP • SAVE $41' },
  { id: 6, title: 'The Rapid Dating Quick-Check Pack', price: '$15', books: 'Books 27 to 32', desc: 'All 6 Pocket Field Guides for Live Dating Scenarios', tag: 'TACTICAL PACK' },
  { id: 7, title: 'The Date Night & Attraction Mastery Pack', price: '$19', books: 'Books 11 + 14 + 02', desc: 'Experiential Dates, DM Attraction & Seamless Texting', tag: 'EXPERIENCE' },
  { id: 8, title: 'The Reconnection & Ex-Back Strategy Pack', price: '$19', books: 'Books 12 + 19 + 05', desc: 'Behavioral Audit, The Power of Absence & Quiet Chemistry', tag: 'PSYCHOLOGY' },
  { id: 9, title: 'The Boundary & Self-Worth Armor Kit', price: '$19', books: 'Books 13 + 10 + 15', desc: 'Unshakeable Boundaries, Jealousy Antidotes & Freedom', tag: 'EMPOWERMENT' },
  { id: 10, title: 'The 60-Day Relationship Blueprint Pack', price: '$27', books: 'Books 18 + 16 + 08', desc: 'From Day 1 Coffee to Full Emotional Exclusivity', tag: 'ROADMAP' },
  { id: 11, title: 'The Master Conversation & Banter Suite', price: '$27', books: 'Books 20 + 06 + 02 + 07', desc: 'Vocal Flow, Deep Compliments & Conversational Tension', tag: 'MASTERY' },
  { id: 12, title: 'The Seduction & Magnetic Presence Masterclass', price: '$34', books: 'Books 17 + 19 + 09 + 05 + 26', desc: 'The Complete 5-Volume Neuro-Attraction System', tag: 'ADVANCED' },
  { id: 13, title: 'The Long-Term Love & Healing Double-System', price: '$34', books: 'Books 24 + 25', desc: 'Sustaining Passion Over 5+ Years & Heartbreak Recovery', tag: 'LIFELONG' },
  { id: 14, title: 'The Executive Double-Bible Masterclass', price: '$29', books: 'Books 21 + 22', desc: 'Modern Romance Bible & Emotional Intelligence Bible', tag: 'COLLECTOR' },
  { id: 15, title: 'The Grand 32-Book Master Lifetime Library', price: '$99', books: 'ALL 32 BOOKS', desc: 'The Ultimate Sovereign Digital Product Empire • All 32 Editions', tag: 'LIFETIME • SAVE $300+' }
];

function buildBundleHTML(b) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1920px;
      height: 1080px;
      background: radial-gradient(circle at 60% 40%, #161922 0%, #0A0C10 100%);
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 90px 120px;
      overflow: hidden;
      position: relative;
    }

    .outer-frame {
      position: absolute;
      inset: 35px;
      border: 1.5px solid #D4AF3744;
      pointer-events: none;
    }

    .inner-frame {
      position: absolute;
      inset: 45px;
      border: 0.5px solid #D4AF3722;
      pointer-events: none;
    }

    /* Left Copy Column */
    .left-col {
      width: 850px;
      z-index: 2;
    }

    .bundle-tag {
      display: inline-block;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 4px;
      color: #D4AF37;
      text-transform: uppercase;
      background: #D4AF3715;
      border: 1px solid #D4AF3755;
      padding: 6px 18px;
      border-radius: 50px;
      margin-bottom: 24px;
    }

    .bundle-title {
      font-family: 'Cinzel', serif;
      font-size: 52px;
      font-weight: 800;
      line-height: 1.15;
      color: #FFFFFF;
      margin-bottom: 18px;
      text-transform: uppercase;
    }

    .gold-bar {
      width: 90px;
      height: 3px;
      background: linear-gradient(90deg, #D4AF37, transparent);
      margin-bottom: 24px;
    }

    .bundle-desc {
      font-size: 22px;
      color: #94A3B8;
      line-height: 1.5;
      margin-bottom: 30px;
    }

    .bundle-specs {
      display: flex;
      gap: 30px;
      align-items: center;
    }

    .price-pill {
      font-family: 'Cinzel', serif;
      font-size: 40px;
      font-weight: 800;
      color: #D4AF37;
      background: #11141C;
      border: 1.5px solid #D4AF3788;
      padding: 8px 32px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
    }

    .books-included {
      font-size: 18px;
      font-weight: 600;
      color: #E2E8F0;
    }

    .author-credit {
      margin-top: 40px;
      font-size: 15px;
      color: #64748B;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* Right 3D Visual Column */
    .right-col {
      width: 750px;
      height: 750px;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
      position: relative;
    }

    .box-container {
      width: 440px;
      height: 580px;
      position: relative;
      transform: rotateY(-22deg) rotateX(10deg);
      transform-style: preserve-3d;
      box-shadow: 25px 35px 70px rgba(0,0,0,0.85);
      border-radius: 14px;
      background: linear-gradient(135deg, #181B24 0%, #0D0F14 100%);
      border: 2px solid #D4AF3799;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 45px 35px;
      text-align: center;
    }

    .box-spine-edge {
      position: absolute;
      left: -28px;
      top: 0;
      width: 28px;
      height: 100%;
      background: linear-gradient(90deg, #090A0D, #161922);
      transform: rotateY(-90deg);
      transform-origin: right;
      border-left: 1.5px solid #D4AF3766;
    }

    .box-crest {
      font-size: 13px;
      letter-spacing: 3px;
      color: #D4AF37;
      text-transform: uppercase;
      font-weight: 700;
    }

    .box-inner-title {
      font-family: 'Cinzel', serif;
      font-size: 32px;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
      margin: auto 0;
    }

    .box-footer-label {
      font-size: 13px;
      letter-spacing: 2px;
      color: #D4AF37;
      text-transform: uppercase;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="outer-frame"></div>
  <div class="inner-frame"></div>

  <div class="left-col">
    <span class="bundle-tag">${b.tag}</span>
    <h1 class="bundle-title">${b.title}</h1>
    <div class="gold-bar"></div>
    <p class="bundle-desc">${b.desc}</p>
    <div class="bundle-specs">
      <div class="price-pill">${b.price}</div>
      <div class="books-included">Includes ${b.books} • Instant PDF Download</div>
    </div>
    <div class="author-credit">Curated by Deepak Ravi (@founderdeepak)</div>
  </div>

  <div class="right-col">
    <div class="box-container">
      <div class="box-spine-edge"></div>
      <div class="box-crest">DEEPAK RAVI OFFICIAL BUNDLE</div>
      <div class="box-inner-title">${b.title}</div>
      <div class="box-footer-label">${b.books} • COMPLETE BOX SET</div>
    </div>
  </div>
</body>
</html>`;
}

async function runMasterBuild() {
  console.log('🚀 Starting Master Elevated Build Engine (42 Books + 15 Bundles)...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. Process 32 Paid Ebooks
  const paidFiles = fs.readdirSync(EBOOKS_DIR).filter(f => f.endsWith('.md')).sort();
  console.log(`\nCompiling ${paidFiles.length} Paid Master Ebooks...`);

  for (let i = 0; i < paidFiles.length; i++) {
    const file = paidFiles[i];
    const slug = file.replace('.md', '');
    const bookId = parseInt(file.split('_')[0], 10);
    const md = fs.readFileSync(path.join(EBOOKS_DIR, file), 'utf8');
    const { title, subtitle, chapters, content } = parseMarkdown(md);
    const theme = getTheme(file, false);
    const htmlContent = markdownToHTML(content, theme);
    const docHTML = buildHTMLDocument(bookId, title, subtitle, chapters, htmlContent, theme, false);

    await page.setContent(docHTML, { waitUntil: 'networkidle' });

    // Standalone high-res cover PNG
    const coverEl = await page.$('#book-cover');
    if (coverEl) {
      await coverEl.screenshot({ path: path.join(COVERS_OUT, `${slug}.png`) });
    }

    // High-res PDF
    await page.pdf({
      path: path.join(PAID_PDF_OUT, `${slug}.pdf`),
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    console.log(`[Paid ${i + 1}/${paidFiles.length}] Master Edition Built: ${title}`);
  }

  // 2. Process 10 Free Ebooks
  const freeFiles = fs.readdirSync(FREE_DIR).filter(f => f.endsWith('.md')).sort();
  console.log(`\nCompiling ${freeFiles.length} Free Master Ebooks...`);

  for (let i = 0; i < freeFiles.length; i++) {
    const file = freeFiles[i];
    const slug = file.replace('.md', '');
    const md = fs.readFileSync(path.join(FREE_DIR, file), 'utf8');
    const { title, subtitle, chapters, content } = parseMarkdown(md);
    const theme = getTheme(file, true);
    const htmlContent = markdownToHTML(content, theme);
    const docHTML = buildHTMLDocument(0, title, subtitle, chapters, htmlContent, theme, true);

    await page.setContent(docHTML, { waitUntil: 'networkidle' });

    const coverEl = await page.$('#book-cover');
    if (coverEl) {
      await coverEl.screenshot({ path: path.join(COVERS_OUT, `${slug}.png`) });
    }

    await page.pdf({
      path: path.join(FREE_PDF_OUT, `${slug}.pdf`),
      format: 'A4',
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });

    console.log(`[Free ${i + 1}/${freeFiles.length}] Master Edition Built: ${title}`);
  }

  // 3. Process 15 Commercial 3D Bundle Banners (1920x1080)
  console.log(`\nRendering 15 Commercial 3D Bundle Banners (16:9)...`);
  await page.setViewportSize({ width: 1920, height: 1080 });

  for (let b of BUNDLES) {
    const bundleHTML = buildBundleHTML(b);
    await page.setContent(bundleHTML, { waitUntil: 'networkidle' });
    const slug = `bundle_${b.id.toString().padStart(2, '0')}`;
    await page.screenshot({ path: path.join(BUNDLES_OUT, `${slug}.png`) });
    console.log(`[Bundle ${b.id}/15] 3D Banner Rendered: ${b.title}`);
  }

  await browser.close();
  console.log('\n🌟 ALL 42 MASTER EBOOKS & 15 COMMERCIAL BUNDLE BANNERS COMPILED SUCCESSFULLY!');
}

runMasterBuild().catch(err => {
  console.error('Master Build Failed:', err);
  process.exit(1);
});
