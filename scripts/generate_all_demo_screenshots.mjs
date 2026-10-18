import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEMOS = [
  {
    id: 'interior-design',
    themes: ['warm-heritage', 'obsidian-luxe', 'avant-garde'],
  },
  {
    id: 'real-estate',
    themes: ['heritage-estate', 'nocturne-penthouse', 'swiss-architectural'],
  },
  {
    id: 'dental-clinic',
    themes: ['nordic-sanctuary', 'harley-medluxe', 'swiss-radiance'],
  },
  {
    id: 'wedding-photography',
    themes: ['fine-art-editorial', 'cinematic-nocturne', 'vogue-minimalist'],
  },
  {
    id: 'home-renovation',
    themes: ['industrial-craft', 'obsidian-copper', 'nordic-living'],
  },
  {
    id: 'executive-coaching',
    themes: ['bespoke-executive', 'thought-leader', 'tech-monolith'],
  },
  {
    id: 'educational-academy',
    themes: ['oxford-academic-navy', 'cyber-stem-dark', 'campus-clarity-emerald'],
  },
  {
    id: 'gym-fitness-club',
    themes: ['raw-iron-stealth', 'nordic-athletic-slate', 'cyber-volt-black'],
  },
  {
    id: 'business-portfolio',
    themes: ['blue-chip-corporate-navy', 'obsidian-enterprise-dark', 'swiss-minimalist-monochrome'],
  },
  {
    id: 'spa-wellness',
    themes: ['bali-botanical-sand', 'midnight-sanctuary-dark', 'rose-quartz-elegance'],
  },
  {
    id: 'salon-beauty',
    themes: ['royal-champagne-ivory', 'noir-editorial-chic', 'modern-blush-velvet'],
  },
  {
    id: 'fitness-coach',
    themes: ['executive-stealth-dark', 'clinical-biomechanics-grey', 'cyber-athletic-black'],
  },
  {
    id: 'yoga-meditation',
    themes: ['sunlit-teakwood-saffron', 'celestial-moonlit-dark', 'mindful-sage-minimal'],
  },
  {
    id: 'creative-portfolio',
    themes: ['avant-garde-noir', 'editorial-swiss-white', 'cyberpunk-neon-gradient'],
  },
  {
    id: 'healthcare-diagnostics',
    themes: ['clinical-trust-sapphire', 'modern-biotech-dark', 'family-health-emerald'],
  },
  {
    id: 'clinic-polyclinic',
    themes: ['compassionate-sky-blue', 'executive-clinic-slate', 'holistic-family-mint'],
  },
  {
    id: 'doctor-specialist',
    themes: ['eminent-surgical-navy', 'robotic-precision-dark', 'patient-compassion-pearl'],
  },
];

const thumbnailsDir = path.join(__dirname, '..', 'public', 'demos', 'thumbnails');
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

async function run() {
  console.log(`Starting automated capture for ${DEMOS.length} demos (51 theme screenshots)...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 810 }, // Natural 16:9 ratio
    deviceScaleFactor: 1.5,
  });
  const page = await context.newPage();

  let count = 0;

  for (const demo of DEMOS) {
    const url = `http://localhost:3000/demos/${demo.id}.html`;
    console.log(`\n[${++count}/${DEMOS.length}] Loading ${demo.id}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      console.warn(`Initial networkidle timeout on ${demo.id}, proceeding anyway...`);
    }

    // Clean up popups, docks, badges that obstruct screenshots
    await page.evaluate(() => {
      const selectors = [
        '.theme-controller',
        '#leadMagnetWidget',
        '.lead-magnet-floating-widget',
        '#uncodedPitchModal',
        '.modal-backdrop',
        '#consent-banner',
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
      });
      // Scroll to top
      window.scrollTo(0, 0);
    });

    for (let i = 0; i < demo.themes.length; i++) {
      const theme = demo.themes[i];
      const themeNum = i + 1;

      await page.evaluate((t) => {
        document.body.setAttribute('data-theme', t);
        window.dispatchEvent(new Event('resize'));
        window.scrollTo(0, 0);
      }, theme);

      // Brief delay for theme color/style transition
      await page.waitForTimeout(400);

      const filename = `${demo.id}-theme${themeNum}.webp`;
      const outPath = path.join(thumbnailsDir, filename);

      await page.screenshot({
        path: outPath,
        type: 'webp',
        quality: 88,
        clip: { x: 0, y: 0, width: 1440, height: 810 },
      });

      console.log(`  ✓ Saved ${filename} (${theme})`);

      // If theme 1, also save as [demo.id].webp for backwards compatibility
      if (themeNum === 1) {
        const legacyPath = path.join(thumbnailsDir, `${demo.id}.webp`);
        fs.copyFileSync(outPath, legacyPath);
      }
    }
  }

  await browser.close();
  console.log(`\n🎉 Successfully generated all 51 theme screenshots in ${thumbnailsDir}!`);
}

run().catch(console.error);
