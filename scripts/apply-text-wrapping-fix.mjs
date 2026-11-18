import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/demos/ayyanar-sirpa-kalai.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. REPLACE THE GLOBAL TEXT-WRAP & ADD WORD-PRESERVATION CSS
const oldTextWrapRegex = /h1, h2, h3, h4, h5, h6\s*\{\s*text-wrap:\s*balance;\s*\}\s*p\s*\{\s*text-wrap:\s*pretty;\s*\}/;

const newTextWrapCss = `/* ==========================================================================
       GLOBAL TEXT WRAPPING & WORD-INTEGRITY ENGINE (NEVER SPLIT WORDS IN HALF)
       ========================================================================== */
    *, *::before, *::after {
      word-break: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: none !important;
      -webkit-hyphens: none !important;
      -ms-hyphens: none !important;
    }

    /* Headings, Titles, Badges, Tabs, and Buttons: NEVER break words in the middle */
    h1, h2, h3, h4, h5, h6,
    .font-heritage,
    .font-mono-tag,
    .section-title-responsive,
    .hero-title-responsive,
    .sub-title-responsive,
    .card-title-responsive,
    .gallery-filter-btn,
    .diff-set-btn,
    .diff-active-title,
    .btn-gold-editorial,
    .btn-wire-editorial,
    .strip-item,
    .nav-link,
    .phase-badge,
    button,
    label {
      word-break: keep-all !important;
      overflow-wrap: normal !important;
      text-wrap: wrap !important;
      line-break: strict !important;
    }

    /* Items that MUST ALWAYS stay together on a single unbroken line */
    .strip-item,
    .diff-set-btn,
    .phase-badge,
    .btn-lang-switch,
    .mobile-sticky-dock a,
    .diff-timer-tag,
    .avatar-medallion,
    .keep-together {
      white-space: nowrap !important;
      word-break: keep-all !important;
      display: inline-flex !important;
      align-items: center !important;
    }

    .gallery-filter-btn {
      white-space: nowrap !important;
      word-break: keep-all !important;
    }`;

if (oldTextWrapRegex.test(content)) {
  content = content.replace(oldTextWrapRegex, newTextWrapCss);
  console.log('Replaced text-wrap with word integrity rules');
} else {
  console.log('Target text-wrap block not matched directly, appending to style block...');
  content = content.replace('</style>', newTextWrapCss + '\n  </style>');
}

// 2. ENHANCE TAMIL TYPOGRAPHY RULES IN STYLE
const oldTamilCssRegex = /\/\* Tamil Typography Tuning \*\/[\s\S]*?(?=\/\* Global Mobile Guards \*\/)/;
const newTamilCss = `/* Tamil Typography Tuning - Absolute Protection against Syllable & Character Splitting */
    body.lang-ta {
      font-family: 'Noto Sans Tamil', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    body.lang-ta,
    body.lang-ta * {
      letter-spacing: normal !important;
      word-break: keep-all !important;
      line-break: strict !important;
      hyphens: none !important;
      -webkit-hyphens: none !important;
    }
    body.lang-ta .font-heritage {
      font-family: 'Noto Sans Tamil', serif !important;
      letter-spacing: 0 !important;
    }
    body.lang-ta h1, 
    body.lang-ta h2, 
    body.lang-ta h3, 
    body.lang-ta h4, 
    body.lang-ta h5, 
    body.lang-ta h6 {
      line-height: 1.35 !important;
      word-break: keep-all !important;
      overflow-wrap: normal !important;
    }
    body.lang-ta p {
      line-height: 1.75 !important;
      text-align: left !important;
      word-break: normal !important;
      overflow-wrap: break-word !important;
    }
    `;

if (oldTamilCssRegex.test(content)) {
  content = content.replace(oldTamilCssRegex, newTamilCss);
  console.log('Replaced Tamil CSS rules');
}

// 3. UPDATE #strip-disciplines SPANS WITH .strip-item CLASS
content = content.replace(/<span id="strip-1">/g, '<span id="strip-1" class="strip-item">');
content = content.replace(/<span id="strip-2">/g, '<span id="strip-2" class="strip-item">');
content = content.replace(/<span id="strip-3">/g, '<span id="strip-3" class="strip-item">');
content = content.replace(/<span id="strip-4">/g, '<span id="strip-4" class="strip-item">');
content = content.replace(/<span id="strip-5">/g, '<span id="strip-5" class="strip-item">');
content = content.replace(/<span id="strip-6">/g, '<span id="strip-6" class="strip-item">');

// 4. UPDATE PHASE BADGES WITH .phase-badge CLASS
content = content.replace(/id="p1-badge"/g, 'id="p1-badge" class="phase-badge"');
content = content.replace(/id="p2-badge"/g, 'id="p2-badge" class="phase-badge"');
content = content.replace(/id="p3-badge"/g, 'id="p3-badge" class="phase-badge"');
content = content.replace(/id="p4-badge"/g, 'id="p4-badge" class="phase-badge"');

// 5. UPDATE HERO TITLE MARKUP AND TRANSLATION
content = content.replace(
  /<h2 class="font-heritage hero-title-responsive" id="hero-title">[\s\S]*?<\/h2>/,
  `<h2 class="font-heritage hero-title-responsive" id="hero-title">
          <span style="white-space: nowrap;">S R I</span> <br>
          <span style="color: var(--gold-light); display: inline-block; white-space: nowrap;">A Y Y A N A R</span>
        </h2>`
);

content = content.replace(
  /heroTitle: "S R I <br><span style='color: var\(--gold-light\);'>A Y Y A N A R<\/span>",/,
  `heroTitle: "<span style='white-space: nowrap;'>S R I</span> <br><span style='color: var(--gold-light); display: inline-block; white-space: nowrap;'>A Y Y A N A R</span>",`
);

content = content.replace(
  /heroTitle: "ஸ்ரீ அய்யனார் <br><span style='color: var\(--gold-light\);'>சிற்பக் கலைக்கூடம்<\/span>",/,
  `heroTitle: "<span style='white-space: nowrap;'>ஸ்ரீ அய்யனார்</span> <br><span style='color: var(--gold-light); display: inline-block; white-space: nowrap;'>சிற்பக் கலைக்கூடம்</span>",`
);

// 6. BRAND TITLE IN HEADER - PROTECT FROM SPLITTING
content = content.replace(
  /<div class="font-heritage"[^>]*id="brand-title">[\s\S]*?SRI AYYANAR SIRPA KALAI[\s\S]*?<\/div>/,
  `<div class="font-heritage" style="font-weight: 700; color: #fff; line-height: 1.2; word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" id="brand-title">SRI AYYANAR SIRPA KALAI</div>`
);

content = content.replace(
  /<div[^>]*id="brand-subtitle">[\s\S]*?MASTER STHAPATHIS A\.K\. BALAJI[\s\S]*?<\/div>/,
  `<div style="color: var(--gold-light); font-family: var(--font-mono); word-break: keep-all; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" id="brand-subtitle">MASTER STHAPATHIS A.K. BALAJI &amp; A.K. THENNARASU</div>`
);

// 7. LINEAGE BAR ON MOBILE - OVERFLOW GUARDS
content = content.replace(
  /<span id="lineage-badge">/,
  '<span id="lineage-badge" style="word-break: keep-all; white-space: nowrap; display: inline-block;">'
);

// 8. TUNE HERO-TITLE RESPONSIVE FONT SIZE ON MOBILE
content = content.replace(
  /\.hero-title-responsive\s*\{\s*font-size:\s*clamp\(1\.9rem,\s*6\.5vw,\s*3\.25rem\)/,
  `.hero-title-responsive {
      font-size: clamp(1.75rem, 5.8vw, 3.25rem)`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully applied global text-wrapping and word preservation fix!');
