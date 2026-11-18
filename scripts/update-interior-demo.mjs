import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const demoPath = path.join(root, 'public', 'demos', 'interior-design.html');

let html = fs.readFileSync(demoPath, 'utf-8');

// 1. Swap Hero Image
const oldHeroImg = 'src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"';
const newHeroImg = 'src="/demos/assets/demo-01-interior/01_Hero_Showcase.png"';
if (html.includes(oldHeroImg)) {
  html = html.replace(oldHeroImg, newHeroImg);
  console.log('✓ Replaced Hero Image');
} else {
  console.log('⚠ Hero image target not found directly, checking regex...');
  html = html.replace(/src="https:\/\/images\.unsplash\.com\/photo-1600210492486-724fe5c67fb0[^"]*"/, 'src="/demos/assets/demo-01-interior/01_Hero_Showcase.png"');
}

// 2. Add New CSS Styles before </style>
const cssInjection = `
    /* ==========================================================================
       INTERACTIVE BEFORE vs AFTER 3D RENDER-TO-REALITY SLIDER
       ========================================================================== */
    .compare-section {
      padding: 90px 0;
      background: var(--bg-surface);
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }
    .compare-frame-outer {
      position: relative;
      max-width: 980px;
      margin: 0 auto;
      width: 100%;
    }
    .compare-container {
      --clip-pos: 50%;
      position: relative;
      width: 100%;
      aspect-ratio: 16/10;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.16);
      border: 1px solid var(--border-color);
      user-select: none;
      -webkit-user-select: none;
      background: #100E0C;
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
    .compare-img-after {
      z-index: 1;
    }
    .compare-img-before {
      z-index: 2;
      clip-path: inset(0 calc(100% - var(--clip-pos, 50%)) 0 0);
      -webkit-clip-path: inset(0 calc(100% - var(--clip-pos, 50%)) 0 0);
    }
    .slider-divider-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--clip-pos, 50%);
      width: 2px;
      background: var(--accent);
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.7);
      z-index: 4;
      pointer-events: none;
      transform: translateX(-50%);
    }
    .slider-handle {
      position: absolute;
      top: 50%;
      left: var(--clip-pos, 50%);
      transform: translate(-50%, -50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--accent);
      border: 3px solid #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
      pointer-events: none;
      z-index: 6;
      font-size: 15px;
      font-weight: 700;
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
    .diff-pill-left, .diff-pill-right {
      position: absolute;
      top: 20px;
      z-index: 5;
      padding: 7px 16px;
      border-radius: 30px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-family: var(--font-body);
      pointer-events: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }
    .diff-pill-left {
      left: 20px;
      background: rgba(18, 16, 14, 0.88);
      color: #F8F5EE;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .diff-pill-right {
      right: 20px;
      background: var(--accent);
      color: #FFFFFF;
    }
    .compare-instructions {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      font-size: 12px;
      font-family: var(--font-body);
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Founder Feature Section */
    .founder-feature-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 56px;
      align-items: center;
    }
    .founder-feature-image-wrap {
      position: relative;
    }
    .founder-feature-img {
      width: 100%;
      height: 520px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-color);
      display: block;
    }
    .founder-badge-card {
      position: absolute;
      bottom: -20px;
      right: -20px;
      background: var(--bg-card);
      border: 2px solid var(--accent);
      border-radius: var(--radius-md);
      padding: 18px 24px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
    }
    .founder-badge-card .f-num {
      font-family: var(--font-heading);
      font-size: 32px;
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
    }
    .founder-badge-card .f-txt {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      font-weight: 600;
      margin-top: 4px;
    }
    .founder-commitments-list {
      margin-top: 28px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .f-item {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    .f-check {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--accent-light);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 13px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .f-item strong {
      display: block;
      font-size: 15px;
      margin-bottom: 2px;
      color: var(--text-primary);
    }
    .f-item p {
      font-size: 13.5px;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.5;
    }

    /* Craftsmanship Section */
    .craft-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 56px;
      align-items: center;
    }
    .craft-image-wrap {
      position: relative;
    }
    .craft-img {
      width: 100%;
      height: 440px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--card-shadow);
      display: block;
    }
    .craft-tag {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: rgba(18, 16, 14, 0.88);
      color: #F8F5EE;
      font-size: 12px;
      padding: 10px 16px;
      border-radius: var(--radius-sm);
      border-left: 3px solid var(--accent);
      font-weight: 500;
    }
    .craft-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }
    .c-metric {
      display: flex;
      flex-direction: column;
    }
    .c-val {
      font-family: var(--font-heading);
      font-size: 26px;
      font-weight: 700;
      color: var(--accent);
    }
    .c-lbl {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 2px;
      line-height: 1.3;
    }

    /* 5-Project Asymmetric Portfolio Grid */
    .portfolio-grid-5 {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 28px;
    }
    .project-card.span-7 {
      grid-column: span 7;
    }
    .project-card.span-5 {
      grid-column: span 5;
    }
    .project-card.span-4 {
      grid-column: span 4;
    }

    @media (max-width: 992px) {
      .founder-feature-grid, .craft-grid { grid-template-columns: 1fr; gap: 32px; }
      .portfolio-grid-5 { grid-template-columns: 1fr; }
      .project-card.span-7, .project-card.span-5, .project-card.span-4 { grid-column: span 1; }
      .founder-badge-card { right: 10px; bottom: -10px; }
      .founder-feature-img { height: 380px; }
      .craft-img { height: 300px; }
      .diff-pill-left, .diff-pill-right { font-size: 9px; padding: 5px 10px; top: 10px; }
      .diff-pill-left { left: 10px; }
      .diff-pill-right { right: 10px; }
    }
`;

if (!html.includes('.compare-section {')) {
  html = html.replace('  </style>', cssInjection + '\n  </style>');
  console.log('✓ Injected new CSS styles');
}

// 3. Comparison Slider HTML
const sliderHtml = `
  <!-- ==========================================================================
       BEFORE vs. AFTER 3D RENDER-TO-REALITY COMPARISON SLIDER
       ========================================================================== -->
  <section id="transformation-slider" class="compare-section">
    <div class="wrap">
      <div class="section-header">
        <div class="badge">Virtual Twin vs Handover Reality</div>
        <h2>What You Sign Off in 3D Is Exactly What You Unlock.</h2>
        <p>Drag the slider to compare the raw bare-shell civil stage against our finished turnkey handover. Zero dimensional compromises. Zero on-site surprises.</p>
      </div>

      <div class="compare-frame-outer">
        <div class="compare-container" id="interiorDiffBox" style="--clip-pos: 50%;">
          <!-- Layer 1: Handover Reality (Base) -->
          <img class="compare-img compare-img-after" 
               src="/demos/assets/demo-01-interior/08_After_Finished.png" 
               alt="Completed Turnkey Transformation - Luxurious Warm Neutral Living Room Sanctuary" 
               loading="lazy">
          
          <!-- Layer 2: Bare Concrete Shell (Clipped) -->
          <img class="compare-img compare-img-before" 
               src="/demos/assets/demo-01-interior/07_Before_Raw.png" 
               alt="Bare Concrete Shell with Chalk MEP Plans in Unfinished Interior" 
               loading="lazy">

          <span class="diff-pill-left">Phase 01: Bare Concrete Shell &amp; MEP</span>
          <span class="diff-pill-right">Phase 03: Completed Handover (Day 48)</span>

          <!-- Divider Line & Handle -->
          <div class="slider-divider-line" aria-hidden="true"></div>
          <div class="slider-handle" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="8 17 3 12 8 7"/><polyline points="16 7 21 12 16 17"/></svg>
          </div>

          <!-- Invisible Range Input for Full Accessible Touch/Mouse Drag -->
          <input type="range" min="0" max="100" value="50" class="compare-slider-input" 
                 aria-label="Slide to compare raw shell against completed interior" 
                 oninput="updateInteriorDiff(this.value)">
        </div>

        <div class="compare-instructions">
          <span>⬅ Drag left to inspect structural rough-in stage</span>
          <span>Drag right to inspect completed bespoke millwork ➡</span>
        </div>
      </div>
    </div>
  </section>
`;

// Insert slider right after </section> of problem section and before <section id="portfolio"
const portfolioSectionMarker = '  <section id="portfolio" class="section-padding">';
if (!html.includes('id="transformation-slider"') && html.includes(portfolioSectionMarker)) {
  html = html.replace(portfolioSectionMarker, sliderHtml + '\n' + portfolioSectionMarker);
  console.log('✓ Inserted Transformation Slider Section');
}

// 4. Update the Portfolio to 5 Flagship Works
const newPortfolioHtml = `
  <section id="portfolio" class="section-padding">
    <div class="wrap">
      <div class="section-header">
        <div class="badge">Architectural Portfolio</div>
        <h2>Homes That Feel Like You. Crafted to Endure.</h2>
        <p>Explore five recently completed private residences, duplex penthouses, and bespoke sanctuaries across Bangalore and Mumbai.</p>
      </div>

      <div class="portfolio-grid-5">
        <!-- Project 1 (7 cols): The Alabaster Penthouse -->
        <div class="project-card span-7">
          <div class="project-img-wrap" style="height: 340px;">
            <img src="/demos/assets/demo-01-interior/02_Work_01.png" 
                 alt="The Alabaster Penthouse - Minimalist Master Bedroom Sanctuary with Fluted Oak" 
                 loading="lazy">
            <span class="project-tag">Minimalist Penthouse</span>
          </div>
          <div class="project-body">
            <div>
              <h3>The Alabaster Penthouse</h3>
              <p>Minimalist micro-cement walls, concealed fluted oak millwork, sheer linen drapery, and integrated warm brass sconces designed for a venture partner's family.</p>
            </div>
            <div class="project-meta">
              <span>Indiranagar &bull; 4,200 Sq.Ft</span>
              <strong style="color: var(--accent);">52 Days Turnkey</strong>
            </div>
          </div>
        </div>

        <!-- Project 2 (5 cols): The Monolith Culinary Atelier -->
        <div class="project-card span-5">
          <div class="project-img-wrap" style="height: 340px;">
            <img src="/demos/assets/demo-01-interior/03_Work_02.png" 
                 alt="The Monolith Culinary Atelier - Luxury Kitchen with Veined Quartzite Island" 
                 loading="lazy">
            <span class="project-tag">Culinary Atelier</span>
          </div>
          <div class="project-body">
            <div>
              <h3>The Monolith Culinary Atelier</h3>
              <p>Monolithic waterfall quartzite island, matte black recessed cabinetry, concealed Gaggenau appliances, and linear architectural brass illumination.</p>
            </div>
            <div class="project-meta">
              <span>Koramangala &bull; 3,600 Sq.Ft</span>
              <strong style="color: var(--accent);">44 Days Turnkey</strong>
            </div>
          </div>
        </div>

        <!-- Project 3 (4 cols): The Smoked Oak Study & Library -->
        <div class="project-card span-4">
          <div class="project-img-wrap" style="height: 280px;">
            <img src="/demos/assets/demo-01-interior/04_Work_03.png" 
                 alt="The Smoked Oak Library & Study - Moody Modern Den" 
                 loading="lazy">
            <span class="project-tag">Private Library</span>
          </div>
          <div class="project-body">
            <div>
              <h3>The Smoked Oak Study</h3>
              <p>Floor-to-ceiling dark oak shelving with concealed LED channels, camel leather lounge seating, and acoustic ceiling plaster.</p>
            </div>
            <div class="project-meta">
              <span>Sadashivanagar &bull; 5,100 Sq.Ft</span>
              <strong style="color: var(--accent);">58 Days Turnkey</strong>
            </div>
          </div>
        </div>

        <!-- Project 4 (4 cols): The Travertine Wellness Sanctuary -->
        <div class="project-card span-4">
          <div class="project-img-wrap" style="height: 280px;">
            <img src="/demos/assets/demo-01-interior/05_Work_04.png" 
                 alt="The Travertine Wellness Bath - Warm Japandi Spa Bathroom Retreat" 
                 loading="lazy">
            <span class="project-tag">Spa Sanctuary</span>
          </div>
          <div class="project-body">
            <div>
              <h3>The Travertine Wellness Spa</h3>
              <p>Freestanding stone soaking tub on river pebbles, fluted glass shower enclosure, brushed gunmetal hardware, and natural skylight framing.</p>
            </div>
            <div class="project-meta">
              <span>Whitefield &bull; 5,800 Sq.Ft</span>
              <strong style="color: var(--accent);">64 Days Turnkey</strong>
            </div>
          </div>
        </div>

        <!-- Project 5 (4 cols): The Nordic Dining Pavilion -->
        <div class="project-card span-4">
          <div class="project-img-wrap" style="height: 280px;">
            <img src="/demos/assets/demo-01-interior/06_Work_05.png" 
                 alt="The Nordic Dining Pavilion - Sculptural Bleached Oak Dining Room" 
                 loading="lazy">
            <span class="project-tag">Dining Pavilion</span>
          </div>
          <div class="project-body">
            <div>
              <h3>The Nordic Dining Pavilion</h3>
              <p>Solid bleached oak dining table with curved architectural contours, woven paper-cord seating, and textured plaster wall backdrop.</p>
            </div>
            <div class="project-meta">
              <span>Lavelle Road &bull; 4,600 Sq.Ft</span>
              <strong style="color: var(--accent);">48 Days Turnkey</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

// Replace old portfolio
const portfolioRegex = /<section id="portfolio" class="section-padding">[\s\S]*?<\/section>/;
if (portfolioRegex.test(html)) {
  html = html.replace(portfolioRegex, newPortfolioHtml.trim());
  console.log('✓ Upgraded Portfolio to 5 Flagship Works');
}

// 5. Leadership & Craftsmanship Sections after Roadmap
const leadershipAndCraftHtml = `
  <!-- ==========================================================================
       PRINCIPAL ARCHITECT / STUDIO LEADERSHIP
       ========================================================================== -->
  <section id="leadership" class="section-padding" style="background: var(--bg-surface); border-top: 1px solid var(--border-color);">
    <div class="wrap">
      <div class="founder-feature-grid">
        <div class="founder-feature-image-wrap">
          <img src="/demos/assets/demo-01-interior/09_Founder_Or_Expert.png" 
               alt="Ar. Devendra Varma, Principal Architect & Founding Director" 
               class="founder-feature-img" 
               loading="lazy">
          <div class="founder-badge-card">
            <span class="f-num">18+</span>
            <span class="f-txt">Years of Architectural Practice</span>
          </div>
        </div>
        <div class="founder-feature-content">
          <div class="badge">Direct Senior Partner Execution</div>
          <h2>"We cap our active roster at 4 private residences per quarter."</h2>
          <p style="font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
            Most large interior agencies operate like factory assembly lines: a senior partner pitches you, signs the contract, and hands execution over to junior interns. At Meridian, the founding principals personally engineer every wall junction, inspect every stone slab, and supervise all trade subcontractors on site.
          </p>
          <div class="founder-commitments-list">
            <div class="f-item">
              <span class="f-check">&#10003;</span>
              <div>
                <strong>Single-Threaded Site Supervision</strong>
                <p>Your dedicated resident engineer is stationed on your site 6 days a week with zero multi-project split attention.</p>
              </div>
            </div>
            <div class="f-item">
              <span class="f-check">&#10003;</span>
              <div>
                <strong>Direct Founder WhatsApp Desk</strong>
                <p>Direct daily communication with Ar. Devendra and the engineering lead. No call centers or junior ticket queues.</p>
              </div>
            </div>
            <div class="f-item">
              <span class="f-check">&#10003;</span>
              <div>
                <strong>100% Factory Direct Trade Sourcing</strong>
                <p>Original commercial invoices from Blum Austria, Saint-Gobain, and Italian quarry importers are handed over on project closeout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================================================
       MATERIAL INTEGRITY & CRAFTSMANSHIP MACRO
       ========================================================================== -->
  <section class="section-padding" style="border-top: 1px solid var(--border-color);">
    <div class="wrap">
      <div class="craft-grid">
        <div class="craft-content">
          <div class="badge">Material Authenticity</div>
          <h2>Honest Materials. Precision Joinery. Zero Toxic Adhesives.</h2>
          <p style="font-size: 16px; color: var(--text-muted); line-height: 1.7;">
            A luxury home must breathe. We refuse commercial grade particleboards that emit VOC formaldehyde. Every carcass is crafted from calibrated marine BWP plywood, and every edge is sealed with European PUR hot-melt edgebanding.
          </p>
          <div class="craft-metrics">
            <div class="c-metric">
              <span class="c-val">E1 / E0</span>
              <span class="c-lbl">Formaldehyde Free Emission</span>
            </div>
            <div class="c-metric">
              <span class="c-val">100%</span>
              <span class="c-lbl">BWP Calibrated Marine Core</span>
            </div>
            <div class="c-metric">
              <span class="c-val">200k</span>
              <span class="c-lbl">Cycle Blum Hinge Testing</span>
            </div>
          </div>
        </div>
        <div class="craft-image-wrap">
          <img src="/demos/assets/demo-01-interior/10_Process_Detail.png" 
               alt="Artisanal Joinery: Hand-Fitting Smoked Oak to Veined Travertine" 
               class="craft-img" 
               loading="lazy">
          <span class="craft-tag">Precision Joinery: Smoked Walnut &amp; Hand-Selected Limestone</span>
        </div>
      </div>
    </div>
  </section>
`;

const processSectionEnd = '</section>\n\n  <!-- ==========================================================================\n       GUARANTEES & SOCIAL PROOF';
if (!html.includes('id="leadership"') && html.includes('id="process"')) {
  // insert before guarantees section
  const guaranteesMarker = '  <!-- ==========================================================================\n       GUARANTEES & SOCIAL PROOF';
  if (html.includes(guaranteesMarker)) {
    html = html.replace(guaranteesMarker, leadershipAndCraftHtml + '\n' + guaranteesMarker);
    console.log('✓ Inserted Leadership & Craftsmanship Sections');
  } else {
    // fallback
    const gSectionMarker = '  <section id="guarantees" class="section-padding">';
    html = html.replace(gSectionMarker, leadershipAndCraftHtml + '\n' + gSectionMarker);
    console.log('✓ Inserted Leadership & Craftsmanship Sections (fallback marker)');
  }
}

// 6. JavaScript helper for difference slider
const jsInjection = `
    function updateInteriorDiff(val) {
      var box = document.getElementById('interiorDiffBox');
      if (box) {
        box.style.setProperty('--clip-pos', val + '%');
      }
    }
`;

if (!html.includes('function updateInteriorDiff(')) {
  html = html.replace('  </script>', jsInjection + '\n  </script>');
  console.log('✓ Injected updateInteriorDiff JavaScript');
}

fs.writeFileSync(demoPath, html, 'utf-8');
console.log('🎉 Successfully upgraded public/demos/interior-design.html with all 10 authentic images!');
