import fs from 'fs';
import path from 'path';

const dir = path.resolve('public/demos/ayyanar');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// 1. Gopuram Hero SVG
const gopuramHeroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080d1e"/>
      <stop offset="100%" stop-color="#03050c"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5dfa8"/>
      <stop offset="50%" stop-color="#dfb76c"/>
      <stop offset="100%" stop-color="#9a7732"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(223, 183, 108, 0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="1000" fill="url(#bgGrad)"/>
  <rect width="800" height="1000" fill="url(#grid)"/>

  <!-- Architectural Yantra & Elevation -->
  <g stroke="url(#goldGrad)" fill="none" stroke-width="2" opacity="0.9">
    <!-- Kalasam Spire Top -->
    <path d="M 400 80 L 400 120 M 390 120 L 410 120 M 395 100 L 405 100" stroke-width="3"/>
    <circle cx="400" cy="140" r="14" fill="#dfb76c"/>
    <path d="M 370 170 Q 400 150 430 170 L 440 190 L 360 190 Z" fill="rgba(223, 183, 108, 0.15)"/>

    <!-- Tier 7 -->
    <rect x="340" y="200" width="120" height="45" rx="3" stroke-width="1.5"/>
    <path d="M 320 250 L 480 250 L 460 280 L 340 280 Z"/>

    <!-- Tier 6 -->
    <rect x="310" y="290" width="180" height="55" rx="3" stroke-width="1.5"/>
    <path d="M 280 350 L 520 350 L 500 385 L 300 385 Z"/>

    <!-- Tier 5 -->
    <rect x="270" y="395" width="260" height="65" rx="3" stroke-width="1.5"/>
    <path d="M 230 465 L 570 465 L 550 505 L 250 505 Z"/>

    <!-- Tier 4 -->
    <rect x="230" y="515" width="340" height="75" rx="3" stroke-width="1.5"/>
    <path d="M 180 595 L 620 595 L 595 640 L 205 640 Z"/>

    <!-- Tier 3 -->
    <rect x="180" y="650" width="440" height="85" rx="3" stroke-width="1.5"/>
    <path d="M 130 740 L 670 740 L 640 790 L 160 790 Z"/>

    <!-- Tier 2 Base Plinth -->
    <rect x="140" y="800" width="520" height="95" rx="3" stroke-width="2"/>

    <!-- Grand Entrance Gateway (Dwaram) -->
    <path d="M 320 895 L 320 780 Q 400 740 480 780 L 480 895 Z" stroke-width="2.5" fill="rgba(6, 9, 19, 0.95)"/>
    <circle cx="400" cy="730" r="18" fill="none" stroke-width="2"/>
    <path d="M 400 710 L 400 750 M 380 730 L 420 730" stroke-width="1.5"/>
  </g>

  <!-- Typography Stamp -->
  <text x="400" y="940" text-anchor="middle" font-family="'Cinzel', serif" font-size="22" font-weight="700" fill="#f5dfa8" letter-spacing="4">
    CHOZHA RAJA GOPURAM
  </text>
  <text x="400" y="970" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#8a9bb8" letter-spacing="2">
    AGAMA VIDHI · 7-TIER ARCHITECTURAL SPECIFICATION
  </text>
</svg>`;

// 2. Sculpture Detail SVG
const sculptureDetailSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a1024"/>
      <stop offset="100%" stop-color="#04060e"/>
    </linearGradient>
    <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5dfa8"/>
      <stop offset="50%" stop-color="#dfb76c"/>
      <stop offset="100%" stop-color="#8c6a28"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bgGrad2)"/>
  
  <!-- Sacred Halo (Prabhavali) -->
  <circle cx="400" cy="380" r="220" fill="none" stroke="url(#goldGrad2)" stroke-width="3" stroke-dasharray="8 6"/>
  <circle cx="400" cy="380" r="190" fill="none" stroke="rgba(223, 183, 108, 0.4)" stroke-width="1.5"/>
  
  <!-- Chozha Deity Iconography Silhouette -->
  <g stroke="url(#goldGrad2)" fill="none" stroke-width="2.5">
    <!-- Kiritam (Crown) -->
    <path d="M 360 240 L 400 140 L 440 240 Z" fill="rgba(223, 183, 108, 0.15)"/>
    <circle cx="400" cy="130" r="8" fill="#dfb76c"/>
    <path d="M 370 200 L 430 200 M 380 170 L 420 170"/>

    <!-- Face & Serene Meditative Eyes -->
    <path d="M 350 250 Q 400 230 450 250 Q 460 330 400 370 Q 340 330 350 250 Z" fill="rgba(10, 16, 36, 0.8)"/>
    <path d="M 370 280 Q 385 270 400 280 M 400 280 Q 415 270 430 280" stroke-width="2"/>
    <path d="M 400 280 L 400 320 L 390 330 L 410 330" stroke-width="1.5"/>
    <path d="M 380 345 Q 400 355 420 345" stroke-width="2"/>

    <!-- Kundala (Earrings) & Neck Ornaments -->
    <circle cx="340" cy="310" r="14" fill="rgba(223, 183, 108, 0.2)"/>
    <circle cx="460" cy="310" r="14" fill="rgba(223, 183, 108, 0.2)"/>
    <path d="M 330 390 Q 400 440 470 390 Q 400 460 330 390 Z" fill="rgba(223, 183, 108, 0.1)"/>

    <!-- Sacred Torso & Abhaya Hasta (Grace Posture) -->
    <path d="M 330 430 L 260 520 Q 230 540 250 580 L 290 560" stroke-width="2"/>
    <path d="M 470 430 L 540 520 Q 570 540 550 580 L 510 560" stroke-width="2"/>
    
    <!-- Peedam (Lotus Pedestal Base) -->
    <path d="M 220 780 Q 400 730 580 780 L 620 840 Q 400 810 180 840 Z" fill="rgba(223, 183, 108, 0.2)"/>
    <rect x="200" y="840" width="400" height="40" rx="4" stroke-width="2"/>
  </g>

  <text x="400" y="930" text-anchor="middle" font-family="'Cinzel', serif" font-size="20" font-weight="700" fill="#f5dfa8" letter-spacing="3">
    CHOZHA MOOLA VIGRAHAM
  </text>
  <text x="400" y="960" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#8a9bb8" letter-spacing="2">
    HAND-CARVED KRISHNA SHILA GRANITE &amp; PANCHALOHA
  </text>
</svg>`;

// 3. Temple Architecture SVG
const templeArchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080e22"/>
      <stop offset="100%" stop-color="#03050d"/>
    </linearGradient>
    <linearGradient id="goldGrad3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5dfa8"/>
      <stop offset="100%" stop-color="#a38035"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bgGrad3)"/>

  <!-- Pillars & Mandapam Perspective -->
  <g stroke="url(#goldGrad3)" fill="none" stroke-width="2">
    <!-- Ceiling Beam & Cornice -->
    <rect x="100" y="160" width="600" height="60" rx="3" fill="rgba(223, 183, 108, 0.1)"/>
    <path d="M 60 220 L 740 220 M 80 240 L 720 240" stroke-width="1.5"/>

    <!-- Left Pillar with Yali Bracket -->
    <rect x="160" y="240" width="80" height="580" rx="2" stroke-width="2"/>
    <path d="M 140 280 L 260 280 M 140 780 L 260 780"/>
    <path d="M 160 340 Q 110 390 140 450 Q 190 420 160 340 Z" fill="rgba(223, 183, 108, 0.15)"/>

    <!-- Center Sanctum Entrance -->
    <path d="M 320 820 L 320 380 Q 400 320 480 380 L 480 820 Z" stroke-width="2.5" fill="rgba(5, 8, 18, 0.95)"/>
    <circle cx="400" cy="500" r="40" stroke-width="2"/>
    <circle cx="400" cy="500" r="16" fill="#dfb76c"/>

    <!-- Right Pillar with Yali Bracket -->
    <rect x="560" y="240" width="80" height="580" rx="2" stroke-width="2"/>
    <path d="M 540 280 L 660 280 M 540 780 L 660 780"/>
    <path d="M 640 340 Q 690 390 660 450 Q 610 420 640 340 Z" fill="rgba(223, 183, 108, 0.15)"/>

    <!-- Base Plinth Steps -->
    <path d="M 100 820 L 700 820 L 740 860 L 60 860 Z" fill="rgba(223, 183, 108, 0.08)"/>
    <rect x="40" y="860" width="720" height="30" stroke-width="2"/>
  </g>

  <text x="400" y="930" text-anchor="middle" font-family="'Cinzel', serif" font-size="20" font-weight="700" fill="#f5dfa8" letter-spacing="3">
    MAHA MANDAPAM &amp; YALI PILLARS
  </text>
  <text x="400" y="960" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#8a9bb8" letter-spacing="2">
    DRAVIDIAN MONOLITHIC GRANITE ARCHITECTURE
  </text>
</svg>`;

// 4. Sudhai Relief SVG
const sudhaiReliefSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1022"/>
      <stop offset="100%" stop-color="#04060d"/>
    </linearGradient>
    <linearGradient id="mortarGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d6ceb8"/>
      <stop offset="50%" stop-color="#b8ab91"/>
      <stop offset="100%" stop-color="#736854"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bgGrad4)"/>

  <!-- High Relief Lime Mortar Modeling Simulation -->
  <g stroke="url(#mortarGrad)" fill="none" stroke-width="2">
    <rect x="120" y="140" width="560" height="700" rx="8" stroke-width="2.5" fill="rgba(20, 26, 44, 0.4)"/>
    
    <!-- Simha (Lion) Guardian Relieff -->
    <circle cx="400" cy="400" r="150" stroke-width="3" fill="rgba(184, 171, 145, 0.08)"/>
    <path d="M 280 400 Q 400 280 520 400 Q 560 520 400 560 Q 240 520 280 400 Z" fill="rgba(184, 171, 145, 0.15)"/>
    
    <!-- Lion Eyes & Mane -->
    <circle cx="350" cy="380" r="16" fill="#b8ab91"/>
    <circle cx="450" cy="380" r="16" fill="#b8ab91"/>
    <path d="M 400 410 L 380 460 L 420 460 Z" fill="#736854"/>
    <path d="M 350 490 Q 400 520 450 490" stroke-width="3"/>
    
    <!-- Surrounding Makara Floral Motifs -->
    <path d="M 180 200 Q 280 240 220 320" stroke-width="2"/>
    <path d="M 620 200 Q 520 240 580 320" stroke-width="2"/>
    <path d="M 180 780 Q 280 740 220 660" stroke-width="2"/>
    <path d="M 620 780 Q 520 740 580 660" stroke-width="2"/>
  </g>

  <text x="400" y="900" text-anchor="middle" font-family="'Cinzel', serif" font-size="20" font-weight="700" fill="#d6ceb8" letter-spacing="3">
    SUDHAI SIRPAM (LIME MORTAR)
  </text>
  <text x="400" y="930" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#8a9bb8" letter-spacing="2">
    TRADITIONAL GOPURA SUDHAI &amp; VAHANA RELIEF
  </text>
</svg>`;

// 5. Varna Painting SVG
const varnaPaintingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad5" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c1228"/>
      <stop offset="100%" stop-color="#040610"/>
    </linearGradient>
    <linearGradient id="varnaColorGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="35%" stop-color="#ef4444"/>
      <stop offset="70%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bgGrad5)"/>

  <!-- Consecrated Painted Temple Art -->
  <g stroke="url(#varnaColorGrad)" fill="none" stroke-width="2.5">
    <circle cx="400" cy="400" r="160" stroke-width="3" fill="rgba(239, 68, 68, 0.12)"/>
    <circle cx="400" cy="400" r="210" stroke-dasharray="8 6" stroke-width="2"/>
    
    <!-- Consecrated Painted Mask with Rich Mineral Colors -->
    <path d="M 280 400 Q 400 280 520 400 Q 560 520 400 560 Q 240 520 280 400 Z" fill="rgba(251, 191, 36, 0.25)"/>
    <circle cx="350" cy="380" r="18" fill="#ef4444" stroke="#fbbf24" stroke-width="2"/>
    <circle cx="450" cy="380" r="18" fill="#ef4444" stroke="#fbbf24" stroke-width="2"/>
    <path d="M 400 410 L 380 460 L 420 460 Z" fill="#3b82f6"/>
    <path d="M 340 490 Q 400 540 460 490" stroke-width="4" stroke="#10b981"/>

    <!-- Gold Foil Embellishments -->
    <circle cx="400" cy="270" r="14" fill="#fbbf24"/>
    <circle cx="400" cy="220" r="10" fill="#fbbf24"/>
  </g>

  <text x="400" y="900" text-anchor="middle" font-family="'Cinzel', serif" font-size="20" font-weight="700" fill="#fbbf24" letter-spacing="3">
    KOVIL VARNA VELAI (PAINTING)
  </text>
  <text x="400" y="930" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" fill="#8a9bb8" letter-spacing="2">
    CONSECRATED WEATHERPROOF MINERAL PIGMENTS
  </text>
</svg>`;

// Write all SVGs
const svgs = {
  'gopuram-hero.svg': gopuramHeroSvg,
  'sculpture-detail.svg': sculptureDetailSvg,
  'temple-architecture.svg': templeArchSvg,
  'sudhai-relief.svg': sudhaiReliefSvg,
  'varna-painting.svg': varnaPaintingSvg,
  // Also write JPG aliases pointing to the SVGs for instant compatibility
  'gopuram-hero.jpg': gopuramHeroSvg,
  'sculpture-detail.jpg': sculptureDetailSvg,
  'temple-architecture.jpg': templeArchSvg,
  'sudhai-relief.jpg': sudhaiReliefSvg,
  'varna-painting.jpg': varnaPaintingSvg
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content);
  // Also copy to public/ayyanar, dist/ayyanar, dist/demos/ayyanar
  ['public/ayyanar', 'dist/ayyanar', 'dist/demos/ayyanar'].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, filename), content);
  });
  console.log('Created asset:', filename);
}
