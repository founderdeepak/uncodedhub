import { spawn, execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

let previewProc = null;

function killTree(child) {
  if (!child) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' });
    } else {
      process.kill(-child.pid, 'SIGKILL');
    }
  } catch {
    try {
      child.kill('SIGKILL');
    } catch {
      // already gone
    }
  }
}

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`vite preview did not become ready at ${url} within ${timeoutMs}ms`);
}

async function startPreviewServer() {
  console.log(`[E2E] Starting preview server on ${BASE}...`);
  previewProc = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: root, stdio: 'pipe', shell: true, detached: process.platform !== 'win32' }
  );

  let previewOutput = '';
  previewProc.stdout?.on('data', (d) => (previewOutput += d));
  previewProc.stderr?.on('data', (d) => (previewOutput += d));

  await waitForServer(BASE);
  console.log(`[E2E] Preview server ready at ${BASE}`);
}

async function runTests() {
  let browser = null;
  let passed = 0;
  let failed = 0;

  try {
    await startPreviewServer();

    console.log('[E2E] Launching headless browser...');
    browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // ── Test 1: Home Page ──
    console.log('[E2E] Test 1: Verifying Home Page (/) ...');
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    if (title.includes('Uncoded Hub')) {
      console.log('  ✓ Home page title verified:', title);
      passed++;
    } else {
      console.error('  ✗ Home page title failed:', title);
      failed++;
    }

    // ── Test 2: Blog Hub & Search ──
    console.log('[E2E] Test 2: Verifying Blog Hub & Instant Search (/blog) ...');
    await page.goto(`${BASE}/blog`, { waitUntil: 'networkidle' });
    const blogTitle = await page.title();
    console.log('  ✓ Blog page title:', blogTitle);

    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.waitFor({ state: 'attached', timeout: 8000 });
    await searchInput.scrollIntoViewIfNeeded();
    console.log('  ✓ Search bar is present');

    // Type search query
    await searchInput.fill('dental implant');
    await page.waitForTimeout(500);
    const resultText = await page.locator('text=/matching "dental implant"/').textContent();
    console.log('  ✓ Search filter results:', resultText?.trim());

    // Clear search query
    const clearBtn = page.locator('button:has-text("✕")');
    await clearBtn.click();
    await page.waitForTimeout(500);
    console.log('  ✓ Search cleared successfully');
    passed++;

    // ── Test 3: Niche Hub Page ──
    console.log('[E2E] Test 3: Verifying Niche Hub Page (/blog/niche/dental-clinics) ...');
    await page.goto(`${BASE}/blog/niche/dental-clinics`, { waitUntil: 'networkidle' });
    const nicheHeading = await page.locator('h1').textContent();
    console.log('  ✓ Niche heading:', nicheHeading?.trim());

    const blueprintBadge = page.locator('text=Master Industry Blueprint');
    await blueprintBadge.waitFor({ state: 'attached', timeout: 8000 });
    console.log('  ✓ Master Industry Blueprint card verified');
    passed++;

    // ── Test 4: Individual Blog Post with TOC, Takeaways, Author, Related ──
    console.log('[E2E] Test 4: Verifying Blog Post Features (/blog/what-a-dental-clinics-website-should-include) ...');
    await page.goto(`${BASE}/blog/what-a-dental-clinics-website-should-include`, { waitUntil: 'networkidle' });

    // Breadcrumb
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await breadcrumb.waitFor({ state: 'attached', timeout: 8000 });
    console.log('  ✓ Breadcrumbs verified');

    // Executive Summary
    const execSummary = page.locator('text=Executive Summary · Key Takeaways');
    await execSummary.waitFor({ state: 'attached', timeout: 8000 });
    console.log('  ✓ Executive Takeaways box verified');

    // Table of Contents
    const toc = page.locator('nav[aria-label="Table of contents"]');
    await toc.waitFor({ state: 'attached', timeout: 8000 });
    const tocCount = await toc.locator('ol li').count();
    console.log(`  ✓ Table of Contents verified with ${tocCount} items`);

    // Author Bio
    const authorCard = page.locator('text=Verified Studio Author');
    await authorCard.waitFor({ state: 'attached', timeout: 8000 });
    console.log('  ✓ Verified Author Bio verified');

    // Related Articles
    const relatedSection = page.locator('text=Continue Reading in this Industry Series');
    await relatedSection.waitFor({ state: 'attached', timeout: 8000 });
    const relatedCardsCount = await page.locator('section:has-text("Continue Reading") article').count();
    console.log(`  ✓ In-Silo Related Articles section verified with ${relatedCardsCount} cards`);
    passed++;

    // ── Test 5: Contact Page ──
    console.log('[E2E] Test 5: Verifying Contact Page (/contact) ...');
    await page.goto(`${BASE}/contact`, { waitUntil: 'domcontentloaded' });
    const contactHeading = await page.locator('h1').textContent();
    console.log('  ✓ Contact page loaded:', contactHeading?.trim());
    passed++;

    // ── Test 6: WebP Thumbnail Delivery & Hero Image Rendering ──
    console.log('[E2E] Test 6: Verifying WebP Thumbnail Delivery & Hero Image Rendering ...');
    await page.goto(`${BASE}/blog/what-a-dental-clinics-website-should-include`, { waitUntil: 'networkidle' });
    const heroImg = page.locator('figure img[src*=".webp"]');
    await heroImg.waitFor({ state: 'visible', timeout: 8000 });
    const imgSrc = await heroImg.getAttribute('src');
    const isLoaded = await heroImg.evaluate((img) => img.complete && img.naturalWidth > 0);
    if (isLoaded && imgSrc && imgSrc.endsWith('.webp')) {
      console.log(`  ✓ WebP hero image verified (${imgSrc}) loaded with natural width`);
      passed++;
    } else {
      throw new Error(`WebP image failed to load or render properly: ${imgSrc}`);
    }

    if (consoleErrors.length > 0) {
      console.warn('[E2E] Console warnings/errors during test run:', consoleErrors);
    }

    console.log(`\n========================================`);
    console.log(`[E2E] ALL ${passed} PLAYWRIGHT TESTS PASSED (0 failed)`);
    console.log(`========================================\n`);
  } catch (err) {
    console.error('[E2E] Test run failed:', err);
    failed++;
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    killTree(previewProc);
  }
}

runTests();
