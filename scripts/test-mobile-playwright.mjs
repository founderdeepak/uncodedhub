import { chromium } from 'playwright';
import path from 'path';

async function runTest() {
  const browser = await chromium.launch({ headless: true });
  
  // Test 1: Mobile Viewport (iPhone 14: 390 x 844)
  console.log('Testing Mobile Viewport (390 x 844)...');
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  
  const page = await context.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  const url = 'file:///' + path.resolve('public/demos/ayyanar-sirpa-kalai.html').replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Check horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile horizontal overflow (> 390px):', hasHorizontalOverflow);

  // Check font size of hero title on mobile
  const heroFontSize = await page.evaluate(() => {
    const el = document.getElementById('hero-title');
    return el ? window.getComputedStyle(el).fontSize : 'NOT FOUND';
  });
  console.log('Hero title computed font-size on mobile:', heroFontSize);

  // Check paint engine elements
  const sliderStatus = await page.evaluate(() => {
    const box = document.getElementById('compare-box');
    const painted = document.getElementById('compare-painted-img');
    const unpainted = document.getElementById('compare-unpainted-img');
    const line = document.getElementById('slider-line');
    const handle = document.getElementById('slider-handle');
    
    const boxRect = box ? box.getBoundingClientRect() : null;
    const paintedRect = painted ? painted.getBoundingClientRect() : null;
    const unpaintedRect = unpainted ? unpainted.getBoundingClientRect() : null;

    return {
      boxExists: !!box,
      paintedExists: !!painted,
      unpaintedExists: !!unpainted,
      lineExists: !!line,
      handleExists: !!handle,
      boxWidth: boxRect ? boxRect.width : 0,
      paintedWidth: paintedRect ? paintedRect.width : 0,
      unpaintedWidth: unpaintedRect ? unpaintedRect.width : 0,
    };
  });
  console.log('Slider Status on Mobile:', sliderStatus);

  // Test slider move
  await page.evaluate(() => {
    window.updateSlider(30);
  });
  const clipPos = await page.evaluate(() => {
    const box = document.getElementById('compare-box');
    return box ? box.style.getPropertyValue('--clip-pos') : null;
  });
  console.log('Slider updated clip-pos:', clipPos);

  // Test difference set switch to Lord Murugan (index 1)
  await page.evaluate(() => {
    window.switchDifferenceSet(1);
  });
  await page.waitForTimeout(300);
  const activeDeity = await page.evaluate(() => {
    const label = document.getElementById('diff-active-label');
    const painted = document.getElementById('compare-painted-img');
    return {
      label: label ? label.textContent.trim() : null,
      paintedSrc: painted ? painted.src : null
    };
  });
  console.log('Switched to Deity 1:', activeDeity);

  // Test Tamil Translation Switch
  await page.evaluate(() => {
    window.toggleLanguage();
  });
  const tamilTexts = await page.evaluate(() => {
    return {
      brand: document.getElementById('brand-title')?.textContent.trim(),
      hero: document.getElementById('hero-title')?.textContent.trim(),
      process: document.getElementById('process-title')?.textContent.trim(),
      engine: document.getElementById('engine-title')?.textContent.trim(),
      hasLangTaClass: document.body.classList.contains('lang-ta'),
      overflowAfterTamil: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Tamil Mode Status:', tamilTexts);

  console.log('Page Errors:', errors.length > 0 ? errors : 'NONE (0 errors)');

  await browser.close();
}

runTest().catch(console.error);
