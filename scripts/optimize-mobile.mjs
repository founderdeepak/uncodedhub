import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/demos/ayyanar-sirpa-kalai.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE CSS IN <style>
// Find the comparison slider CSS block and replace with responsive clip-path slider & mobile typography
const oldSliderCssRegex = /\/\* Interactive Comparison Slider Container \*\/[\s\S]*?(?=\/\* Lightbox Modal \*\/)/;

const newSliderCss = `/* Interactive Comparison Slider Container (Zero-Defect Responsive Clip-Path) */
    .compare-frame-outer {
      position: relative;
      max-width: 860px;
      margin: 0 auto;
      width: 100%;
    }
    .compare-container {
      --clip-pos: 50%;
      position: relative;
      width: 100%;
      aspect-ratio: 16/10;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-museum);
      border: 1px solid var(--border-gold-strong);
      user-select: none;
      -webkit-user-select: none;
      background: #040711;
      touch-action: pan-y;
      cursor: ew-resize;
    }
    .compare-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      display: block;
    }
    .compare-img-painted {
      z-index: 1;
      transition: opacity 0.22s ease;
    }
    .compare-img-unpainted {
      z-index: 2;
      clip-path: inset(0 calc(100% - var(--clip-pos, 50%)) 0 0);
      -webkit-clip-path: inset(0 calc(100% - var(--clip-pos, 50%)) 0 0);
      transition: opacity 0.22s ease;
    }
    .slider-divider-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--clip-pos, 50%);
      width: 2px;
      background: var(--gold-primary);
      box-shadow: 0 0 12px rgba(223, 183, 108, 0.95);
      z-index: 4;
      pointer-events: none;
      transform: translateX(-50%);
    }
    .slider-handle {
      position: absolute;
      top: 50%;
      left: var(--clip-pos, 50%);
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--gold-primary);
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #060913;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.85);
      pointer-events: none;
      z-index: 6;
      font-size: 0.95rem;
    }
    .compare-slider-input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      margin: 0;
      cursor: ew-resize;
      z-index: 10;
      -webkit-appearance: none;
      appearance: none;
    }

    /* Deity Control Bar & Arrow Buttons */
    .diff-header-control-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      max-width: 860px;
      margin: 0 auto 0.85rem;
      padding: 0 0.25rem;
    }
    .diff-active-label-wrap {
      flex: 1;
      text-align: center;
      min-width: 0;
    }
    .diff-active-title {
      font-size: 1.05rem;
      color: var(--gold-light);
      font-weight: 700;
      margin-bottom: 0.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .diff-timer-tag {
      font-size: 0.7rem;
      color: var(--text-dim);
      font-family: var(--font-mono);
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .timer-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      display: inline-block;
      animation: pulse-dot 1.8s infinite ease-in-out;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 0.4; transform: scale(0.85); }
      50% { opacity: 1; transform: scale(1.15); }
    }

    .diff-set-btn {
      padding: 0.5rem 1.15rem;
      border-radius: 9999px;
      font-size: 0.775rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border-gold-subtle);
      background: #090e1f;
      color: var(--text-muted);
      font-family: var(--font-display);
      letter-spacing: 0.06em;
      transition: all 0.2s ease;
      min-height: 40px;
    }
    .diff-set-btn.active, .diff-set-btn:hover {
      background: var(--gold-primary);
      color: #060913;
      border-color: var(--gold-primary);
      font-weight: 700;
    }

    .diff-arrow-btn {
      width: 42px;
      height: 42px;
      min-width: 42px;
      border-radius: 50%;
      background: rgba(10, 16, 36, 0.95);
      border: 1px solid var(--border-gold-strong);
      color: var(--gold-light);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .diff-arrow-btn:hover {
      background: var(--gold-primary);
      color: #000;
      transform: scale(1.06);
    }

    .slider-labels-wrap {
      display: flex;
      justify-content: space-between;
      max-width: 860px;
      margin: 1rem auto 0;
      font-size: 0.8rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }
    .slider-labels-wrap .label-unpainted {
      color: var(--gold-light);
    }
    .slider-labels-wrap .label-painted {
      color: #4ade80;
    }

    `;

if (oldSliderCssRegex.test(content)) {
  content = content.replace(oldSliderCssRegex, newSliderCss);
  console.log('Replaced slider CSS');
} else {
  console.error('Slider CSS regex did not match!');
}

// 2. ENHANCE RESPONSIVE TYPOGRAPHY & MOBILE MEDIA QUERIES
const oldMediaBlockRegex = /@media \(min-width: 992px\) \{[\s\S]*?\}\s*<\/style>/;
const newMediaBlock = `
    /* Fluid Responsive Typography Classes */
    .hero-title-responsive {
      font-size: clamp(1.9rem, 6.5vw, 3.25rem) !important;
      line-height: 1.15 !important;
    }
    .section-title-responsive {
      font-size: clamp(1.5rem, 5vw, 2.75rem) !important;
      line-height: 1.22 !important;
    }
    .sub-title-responsive {
      font-size: clamp(1.25rem, 4.2vw, 2.15rem) !important;
      line-height: 1.25 !important;
    }
    .card-title-responsive {
      font-size: clamp(1.05rem, 3.5vw, 1.35rem) !important;
      line-height: 1.3 !important;
    }

    /* Tamil Typography Tuning */
    body.lang-ta {
      font-family: 'Noto Sans Tamil', -apple-system, sans-serif !important;
    }
    body.lang-ta * {
      letter-spacing: normal !important;
    }
    body.lang-ta .font-heritage {
      font-family: 'Noto Sans Tamil', serif !important;
      letter-spacing: 0.01em !important;
    }
    body.lang-ta h1, body.lang-ta h2, body.lang-ta h3, body.lang-ta h4, body.lang-ta h5, body.lang-ta h6 {
      line-height: 1.35 !important;
    }

    /* Global Mobile Guards */
    html, body {
      overflow-x: hidden !important;
      width: 100% !important;
      max-width: 100vw !important;
    }

    /* ============================================================
       MOBILE OPTIMIZATION (< 768px): FONT SIZES, PADDING, SLIDER
       ============================================================ */
    @media (max-width: 768px) {
      /* Padding normalization to eliminate horizontal overflow */
      section {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        padding-top: 2.25rem !important;
        padding-bottom: 3.5rem !important;
      }
      .museum-card {
        padding: 1.25rem 1rem !important;
      }

      /* Top Lineage Bar */
      #lineage-bar {
        padding: 0.4rem 1rem !important;
      }
      #lineage-badge {
        font-size: 0.65rem !important;
        line-height: 1.3 !important;
      }

      /* Sticky Header */
      .sticky-header > div {
        padding: 0.65rem 1rem !important;
        gap: 0.5rem !important;
      }
      #brand-title {
        font-size: 0.95rem !important;
        line-height: 1.2 !important;
      }
      #brand-subtitle {
        font-size: 0.58rem !important;
      }
      .btn-lang-switch {
        padding: 0.35rem 0.65rem !important;
        font-size: 0.7rem !important;
      }

      /* Hero Stage */
      #heritage {
        padding-top: 1.75rem !important;
        padding-bottom: 2.5rem !important;
      }
      .hero-grid {
        gap: 2rem !important;
      }
      #hero-tag {
        font-size: 0.68rem !important;
        margin-bottom: 0.5rem !important;
      }
      #hero-description {
        font-size: 0.875rem !important;
        line-height: 1.65 !important;
        max-width: 100% !important;
        margin-bottom: 1.5rem !important;
      }
      .hero-cta-wrap {
        flex-direction: column !important;
        width: 100% !important;
        gap: 0.75rem !important;
      }
      .hero-cta-wrap .btn-gold-editorial,
      .hero-cta-wrap .btn-wire-editorial {
        width: 100% !important;
        justify-content: center !important;
        padding: 0.85rem 1.25rem !important;
        font-size: 0.8rem !important;
      }
      #hero-specs-badge {
        font-size: 0.65rem !important;
      }

      /* Horizontal strip */
      #strip-disciplines {
        padding: 1rem !important;
        font-size: 0.68rem !important;
        gap: 0.5rem !important;
        margin-bottom: 2.5rem !important;
      }

      /* Paint Engine Card */
      #diff-showcase-box {
        padding: 1.5rem 0.85rem !important;
      }
      #engine-subtitle {
        font-size: 0.825rem !important;
        line-height: 1.55 !important;
        margin-bottom: 1.25rem !important;
      }
      .diff-tabs-wrap {
        gap: 0.4rem !important;
        margin-bottom: 1.25rem !important;
      }
      .diff-set-btn {
        padding: 0.4rem 0.75rem !important;
        font-size: 0.72rem !important;
        min-height: 36px !important;
      }
      .diff-header-control-bar {
        gap: 0.5rem !important;
        margin-bottom: 0.65rem !important;
      }
      .diff-active-title {
        font-size: 0.88rem !important;
        white-space: normal !important;
        line-height: 1.3 !important;
      }
      .diff-timer-tag {
        font-size: 0.65rem !important;
      }
      .diff-arrow-btn {
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        font-size: 0.85rem !important;
      }
      .compare-container {
        aspect-ratio: 4/3 !important;
        margin-top: 0.5rem !important;
      }
      .slider-handle {
        width: 38px !important;
        height: 38px !important;
        font-size: 0.85rem !important;
      }
      .slider-labels-wrap {
        flex-direction: column !important;
        gap: 0.35rem !important;
        text-align: center !important;
        font-size: 0.72rem !important;
        margin-top: 0.75rem !important;
      }
      .brush-cta-wrap button {
        width: 100% !important;
        justify-content: center !important;
        font-size: 0.75rem !important;
      }

      /* Process Cards */
      #process-subtitle, #works-subtitle, #disc-subtitle, #sth-subtitle {
        font-size: 0.875rem !important;
        line-height: 1.6 !important;
      }

      /* Estimator */
      #estimator .museum-card {
        padding: 1.5rem 1rem !important;
      }
      #calc-duration {
        font-size: 1.45rem !important;
      }
      #btn-calc-whatsapp {
        font-size: 0.825rem !important;
        padding: 0.85rem 1rem !important;
      }

      /* Final CTA */
      #final-title {
        font-size: 1.5rem !important;
      }
      #final-desc {
        font-size: 0.875rem !important;
      }
    }

    @media (min-width: 992px) {
      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1.15fr 0.85fr;
        gap: 2rem;
        align-items: center;
      }
      .desktop-nav {
        display: flex !important;
      }
      .mobile-menu-trigger {
        display: none !important;
      }
      .mobile-sticky-dock {
        display: none;
      }
      body {
        padding-bottom: 0;
      }
    }
  </style>`;

if (oldMediaBlockRegex.test(content)) {
  content = content.replace(oldMediaBlockRegex, newMediaBlock);
  console.log('Replaced media queries & typography');
} else {
  console.error('Media block regex did not match!');
}

// 3. UPDATE PAINT ENGINE HTML
const oldEngineHtmlRegex = /<!-- ═+[\s\r\n]*INTERACTIVE PAINT & SCULPT ENGINE: 3-SET DIFFERENCE CAROUSEL[\s\S]*?(?=<!-- ═+[\s\r\n]*MASTER PORTFOLIO:)/;

const newEngineHtml = `<!-- ═══════════════════════════════════════════════════════════════════
       INTERACTIVE PAINT & SCULPT ENGINE: 3-SET DIFFERENCE CAROUSEL
       (Amman, Murugan, Sivan - Auto-rotates every 6 seconds with Prev/Next)
       ═══════════════════════════════════════════════════════════════════ -->
  <section id="paint-engine" style="max-width: 1400px; margin: 0 auto; padding: 2rem 1.5rem 6rem;">
    <div class="museum-card" style="max-width: 1020px; margin: 0 auto; padding: 3rem 2rem; text-align: center; background: #080d1c; border: 1px solid var(--border-gold-strong);" id="diff-showcase-box">
      
      <div class="font-mono-tag" style="font-size: 0.75rem; color: var(--gold-primary); margin-bottom: 0.5rem;" id="engine-tag">
        INTERACTIVE PAINT &amp; SCULPT ENGINE
      </div>
      <h3 class="font-heritage sub-title-responsive" style="color: #fff; margin-bottom: 0.5rem;" id="engine-title">
        DRAG THE BRUSH: RAW SCULPTING TO KOVIL VARNA VELAI
      </h3>
      <p style="color: var(--text-muted); max-width: 680px; margin: 0 auto 1.75rem;" id="engine-subtitle">
        Slide left and right to inspect the sacred transformation from handcrafted Sudhai mortar relief into vibrant, consecrated temple color across our completed sanctum sculptures.
      </p>

      <!-- 3 Deity Selectors Pills -->
      <div class="diff-tabs-wrap" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.65rem; margin-bottom: 1.5rem;" id="diff-tabs-container">
        <button class="diff-set-btn active" onclick="switchDifferenceSet(0)" id="diff-tab-0">
          <i class="fa-solid fa-om" style="margin-right: 0.4rem;"></i> <span id="diff-name-0">01 · Sri Amman</span>
        </button>
        <button class="diff-set-btn" onclick="switchDifferenceSet(1)" id="diff-tab-1">
          <i class="fa-solid fa-om" style="margin-right: 0.4rem;"></i> <span id="diff-name-1">02 · Lord Murugan</span>
        </button>
        <button class="diff-set-btn" onclick="switchDifferenceSet(2)" id="diff-tab-2">
          <i class="fa-solid fa-om" style="margin-right: 0.4rem;"></i> <span id="diff-name-2">03 · Lord Sivan</span>
        </button>
      </div>

      <!-- Deity Active Label Bar with Prev/Next Controls -->
      <div class="diff-header-control-bar">
        <button onclick="prevDifferenceSet()" class="diff-arrow-btn" id="diff-prev-btn" title="Previous Deity Set" aria-label="Previous Deity">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="diff-active-label-wrap">
          <div class="font-heritage diff-active-title" id="diff-active-label">
            Sri Amman — Sudhai Sirpam to Kovil Varna Velai
          </div>
          <div class="diff-timer-tag" id="diff-timer-indicator">
            <span class="timer-dot"></span> AUTO ADVANCE (6s)
          </div>
        </div>

        <button onclick="nextDifferenceSet()" class="diff-arrow-btn" id="diff-next-btn" title="Next Deity Set" aria-label="Next Deity">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <!-- The Rock-Solid Slider Comparison Frame using CSS clip-path -->
      <div class="compare-frame-outer">
        <div class="compare-container" id="compare-box" style="--clip-pos: 50%;">
          <!-- Layer 1: Consecrated Painted Temple Art (Base) -->
          <img class="compare-img compare-img-painted" id="compare-painted-img" src="ayyanar/difference/amman-painted.png" alt="Kovil Varna Velai Temple Painting">
          
          <!-- Layer 2: Raw Sudhai Mortar Sculpted Relief (Clipped) -->
          <img class="compare-img compare-img-unpainted" id="compare-unpainted-img" src="ayyanar/difference/amman-unpainted.png" alt="Sudhai Mortar Sculpture Relief">

          <!-- Divider Line -->
          <div class="slider-divider-line" id="slider-line"></div>
          
          <!-- Central Circular Handle -->
          <div class="slider-handle" id="slider-handle">
            <i class="fas fa-arrows-alt-h"></i>
          </div>

          <!-- Range Input for Keyboard & Accessibility -->
          <input type="range" min="0" max="100" value="50" class="compare-slider-input" id="compare-range" aria-label="Compare raw sculpture with painted temple art">
        </div>
      </div>

      <!-- Comparison Legend Labels -->
      <div class="slider-labels-wrap">
        <span class="label-unpainted" id="slider-label-left">← Sculpted Relief (Sudhai Sirpam)</span>
        <span class="label-painted" id="slider-label-right">Consecrated Temple Painting (Varna Velai) →</span>
      </div>

      <!-- Auto Sweep Brush CTA -->
      <div class="brush-cta-wrap" style="margin-top: 1.5rem; display: flex; justify-content: center;">
        <button id="brush-play-btn" onclick="playAutoBrushAnimation()" class="btn-wire-editorial" style="font-size: 0.8rem; padding: 0.65rem 1.5rem;">
          <i class="fa-solid fa-paintbrush" style="color: var(--gold-primary);"></i> <span id="brush-btn-text">WATCH AUTOMATIC BRUSH SWEEP</span>
        </button>
      </div>

    </div>
  </section>

  `;

if (oldEngineHtmlRegex.test(content)) {
  content = content.replace(oldEngineHtmlRegex, newEngineHtml);
  console.log('Replaced Paint Engine HTML');
} else {
  console.error('Engine HTML regex did not match!');
}

// 4. UPDATE JAVASCRIPT SLIDER LOGIC
const oldJsSliderRegex = /\/\/ 2\. Drag & Scroll-Driven Slider Logic[\s\S]*?(?=\/\/ 3\. Complete Bilingual)/;

const newJsSlider = `// 2. Responsive Touch & Mouse Slider Engine (Zero-Conflict)
    // -------------------------------------------------------------
    const compareBox = document.getElementById('compare-box');
    const compareRange = document.getElementById('compare-range');

    function updateSlider(val) {
      if (!compareBox) return;
      const clamped = Math.max(0, Math.min(100, Math.round(val)));
      compareBox.style.setProperty('--clip-pos', clamped + '%');
      if (compareRange && compareRange.value != clamped) {
        compareRange.value = clamped;
      }
    }

    if (compareRange) {
      compareRange.addEventListener('input', (e) => {
        updateSlider(e.target.value);
        resetAutoTimer();
      });
    }

    // Direct touch & pointer drag support for mobile and desktop
    if (compareBox) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let isHorizontalDrag = null;

      function getCoords(e) {
        if (e.touches && e.touches.length > 0) {
          return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
      }

      function onPointerStart(e) {
        isDragging = true;
        isHorizontalDrag = null;
        const c = getCoords(e);
        startX = c.x;
        startY = c.y;
        onPointerMove(e);
        resetAutoTimer();
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        const c = getCoords(e);
        const dx = Math.abs(c.x - startX);
        const dy = Math.abs(c.y - startY);

        if (isHorizontalDrag === null && (dx > 5 || dy > 5)) {
          isHorizontalDrag = dx >= dy;
        }

        if (isHorizontalDrag === true) {
          if (e.cancelable) e.preventDefault();
          const rect = compareBox.getBoundingClientRect();
          const percent = ((c.x - rect.left) / rect.width) * 100;
          updateSlider(percent);
        }
      }

      function onPointerEnd() {
        isDragging = false;
        isHorizontalDrag = null;
      }

      compareBox.addEventListener('touchstart', onPointerStart, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerEnd);
      window.addEventListener('touchcancel', onPointerEnd);

      compareBox.addEventListener('mousedown', (e) => {
        onPointerStart(e);
        const onMouseMove = (ev) => onPointerMove(ev);
        const onMouseUp = () => {
          onPointerEnd();
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });
    }

    // Gentle one-time scroll preview (does not hijack user interaction)
    let hasPlayedScrollIntro = false;
    window.addEventListener('scroll', () => {
      if (hasPlayedScrollIntro || !compareBox || isUserInteracting) return;
      const rect = compareBox.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < winH * 0.75 && rect.bottom > winH * 0.25) {
        hasPlayedScrollIntro = true;
        // subtle brief shift to show interactiveness
        let start = 50;
        let delta = 15;
        let t = 0;
        const introInterval = setInterval(() => {
          t += 0.1;
          const pos = 50 + delta * Math.sin(t * Math.PI);
          updateSlider(pos);
          if (t >= 1) {
            clearInterval(introInterval);
            updateSlider(50);
          }
        }, 30);
      }
    }, { passive: true });

    // Smooth brush sweep animation
    let isSweeping = false;
    function playAutoBrushAnimation() {
      if (isSweeping) return;
      isSweeping = true;
      resetAutoTimer();
      const btnText = document.getElementById('brush-btn-text');
      if (btnText) btnText.textContent = currentLang === 'ta' ? 'வர்ண தூரிகை பூசுகிறது...' : 'PAINTING IN PROGRESS...';
      
      let step = 0;
      const totalSteps = 100;
      const interval = setInterval(() => {
        step++;
        const angle = (step / totalSteps) * Math.PI * 2;
        const val = Math.round(50 + 40 * Math.sin(angle));
        updateSlider(val);
        
        if (step >= totalSteps) {
          clearInterval(interval);
          isSweeping = false;
          updateSlider(50);
          if (btnText) btnText.textContent = currentLang === 'ta' ? 'தானியங்கி தூரிகை சுழற்சி' : 'WATCH AUTOMATIC BRUSH SWEEP';
        }
      }, 25);
    }

    `;

if (oldJsSliderRegex.test(content)) {
  content = content.replace(oldJsSliderRegex, newJsSlider);
  console.log('Replaced JS Slider logic');
} else {
  console.error('JS Slider regex did not match!');
}

// 5. UPDATE HEADING CLASSES IN HTML FOR RESPONSIVE SCALING
content = content.replace(/id="hero-title" class="font-heritage"[^>]*>/, 'id="hero-title" class="font-heritage hero-title-responsive">');
content = content.replace(/class="font-heritage" style="font-size: 3\.25rem[^"]*" id="hero-title"/, 'class="font-heritage hero-title-responsive" id="hero-title"');
content = content.replace(/class="font-heritage" style="font-size: 2\.75rem[^"]*" id="process-title"/, 'class="font-heritage section-title-responsive" id="process-title"');
content = content.replace(/class="font-heritage" style="font-size: 2\.75rem[^"]*" id="works-title"/, 'class="font-heritage section-title-responsive" id="works-title"');
content = content.replace(/class="font-heritage" style="font-size: 2\.5rem[^"]*" id="disc-title"/, 'class="font-heritage section-title-responsive" id="disc-title"');
content = content.replace(/class="font-heritage" style="font-size: 2\.25rem[^"]*" id="calc-title"/, 'class="font-heritage section-title-responsive" id="calc-title"');
content = content.replace(/class="font-heritage" style="font-size: 2\.5rem[^"]*" id="sth-title"/, 'class="font-heritage section-title-responsive" id="sth-title"');
content = content.replace(/class="font-heritage" style="font-size: 2\.25rem[^"]*" id="final-title"/, 'class="font-heritage section-title-responsive" id="final-title"');

// Wrap hero buttons in .hero-cta-wrap
content = content.replace(/<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2\.5rem;">\s*(<a href="https:\/\/wa\.me[\s\S]*?VIEW PROCESS\s*<\/a>)/, '<div class="hero-cta-wrap" style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem;">\n          $1');

// Top lineage bar id
content = content.replace(/<!-- Top Lineage Bar -->\s*<div style="background: #03060e;/, '<!-- Top Lineage Bar -->\n  <div id="lineage-bar" style="background: #03060e;');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully optimized public/demos/ayyanar-sirpa-kalai.html for mobile!');
