import { spawn, execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = 4328;
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
  } catch {}
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Server did not respond at ${url}`);
}

async function main() {
  console.log(`[VERIFY] Launching preview server on ${BASE}...`);
  previewProc = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: root, stdio: 'pipe', shell: true }
  );

  await waitForServer(BASE);
  console.log(`[VERIFY] Preview server is ready!`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', (msg) => console.log(`[PAGE LOG] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', (err) => console.error(`[PAGE ERROR]`, err));

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // ── TEST 1: Blog Table Borders & Lines ──────────────────────────
    console.log('\n--- TEST 1: Blog Table Borders & Styling ---');
    await page.goto(`${BASE}/blog/substack-medium-vs-owned-consultant-website/`, { waitUntil: 'networkidle' });
    console.log('Loaded URL:', page.url(), 'Title:', await page.title());
    const tableEl = page.locator('.prose-article table');
    await tableEl.waitFor({ state: 'attached', timeout: 10000 });
    await tableEl.scrollIntoViewIfNeeded();

    const tableStyles = await page.evaluate(() => {
      const wrapper = document.querySelector('.table-responsive-wrapper');
      const th = document.querySelector('.prose-article th');
      const td = document.querySelector('.prose-article td');
      const wrapperStyle = wrapper ? window.getComputedStyle(wrapper) : null;
      const thStyle = th ? window.getComputedStyle(th) : null;
      const tdStyle = td ? window.getComputedStyle(td) : null;
      return {
        wrapperBorder: wrapperStyle?.borderBottomWidth,
        thBg: thStyle?.backgroundColor,
        thBorderRight: thStyle?.borderRightWidth,
        tdBorderBottom: tdStyle?.borderBottomWidth,
        tdPadding: tdStyle?.paddingTop,
      };
    });

    assert(tableStyles.wrapperBorder !== '0px', `Table container has visible outer border (${tableStyles.wrapperBorder})`);
    assert(tableStyles.thBorderRight !== '0px', `Table headers have cell border divider (${tableStyles.thBorderRight})`);
    assert(tableStyles.tdBorderBottom !== '0px', `Table rows have horizontal dividing line (${tableStyles.tdBorderBottom})`);
    assert(tableStyles.tdPadding !== '0px', `Table cells have comfortable padding (${tableStyles.tdPadding})`);

    // ── TEST 2: Checklist Formatting (No Double Bullets) ───────────
    console.log('\n--- TEST 2: Checklist Formatting & Unicode Box ---');
    await page.goto(`${BASE}/blog/how-to-audit-your-business-website-before-redesign/`, { waitUntil: 'networkidle' });
    const articleEl = page.locator('.prose-article');
    await articleEl.waitFor({ state: 'attached', timeout: 10000 });
    await articleEl.scrollIntoViewIfNeeded();

    const checklistStyles = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.checklist-item, .prose-article li'));
      const taskItem = items.find(li => li.querySelector('.checklist-box'));
      const listStyle = taskItem ? window.getComputedStyle(taskItem).listStyleType : 'none';
      const box = taskItem ? taskItem.querySelector('.checklist-box') : null;
      return {
        hasTaskItem: !!taskItem,
        listStyle,
        hasChecklistBox: !!box,
      };
    });

    assert(checklistStyles.hasTaskItem, 'Checklist item rendered');
    assert(checklistStyles.listStyle === 'none', `Checklist has NO bullet disc (${checklistStyles.listStyle})`);
    assert(checklistStyles.hasChecklistBox, 'Custom styled square checkbox rendered');

    // ── TEST 3: Lead Magnet Input Text Color (Not White on White) ───
    console.log('\n--- TEST 3: Lead Magnet Input Text Color ---');
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const nameInput = page.locator('#lm-first-name');
    await nameInput.waitFor({ state: 'attached', timeout: 10000 });
    await nameInput.scrollIntoViewIfNeeded();

    const inputColor = await nameInput.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // In rgb, white is rgb(255, 255, 255). Dark ink is rgb(23, 22, 26).
    assert(inputColor !== 'rgb(255, 255, 255)', `Input text color is NOT white: ${inputColor}`);

    // ── TEST 4: Instant Interactive Scorecard Access on Submit ──────
    console.log('\n--- TEST 4: Instant Access Link on Submit ---');
    await nameInput.fill('Geetha');
    await page.locator('#lm-email').fill('test@uncodedhub.com');

    // Intercept POST so we test UI immediately
    await page.route('**/macros/s/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    // Fast-forward or wait 2.1s for rate limiter
    await page.waitForTimeout(2200);
    await page.locator('button[type="submit"]:has-text("Send Me the Free Audit")').click();

    await page.waitForSelector('text=Check your inbox');
    const scorecardLink = page.locator('a[href="/audit-checklist"]:has-text("Live Scorecard")');
    assert(await scorecardLink.isVisible(), 'Instant link to /audit-checklist appears in confirmation state');

    // ── TEST 5: Interactive Audit Checklist Page ────────────────────
    console.log('\n--- TEST 5: /audit-checklist Live Interactive Page ---');
    await page.goto(`${BASE}/audit-checklist/`, { waitUntil: 'networkidle' });
    const h1El = page.locator('h1:has-text("The Pre-Sold Prospects Audit")');
    await h1El.waitFor({ state: 'attached', timeout: 10000 });
    await h1El.scrollIntoViewIfNeeded();
    assert(await h1El.count() > 0, 'Audit checklist title displayed');

    const totalScoreEl = page.locator('#score-total-val');
    await totalScoreEl.waitFor({ state: 'visible', timeout: 10000 });
    const totalBefore = await totalScoreEl.textContent();
    assert(totalBefore !== '', `Initial total score displayed: ${totalBefore}/20`);

    // Click "2" on Point #1 card
    const score2Btn = page.locator('.bg-paper-raised button:text-is("2")').first();
    await score2Btn.scrollIntoViewIfNeeded();
    await score2Btn.click();

    const totalAfter = await page.locator('#score-total-val').textContent();
    assert(totalAfter !== totalBefore, `Interactive score updated: ${totalBefore} -> ${totalAfter}`);

    // Verify 20-minute action checklist checkbox toggles
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.scrollIntoViewIfNeeded();
    const wasChecked = await firstCheckbox.isChecked();
    await firstCheckbox.click();
    const isNowChecked = await firstCheckbox.isChecked();
    assert(wasChecked !== isNowChecked, 'Action checklist checkbox toggles cleanly');

    // ── TEST 6: Audit Safeguard on Fresh Unauthenticated Visitor ────
    console.log('\n--- TEST 6: Audit Safeguard & Email Gate ---');
    const freshContext = await browser.newContext();
    const freshPage = await freshContext.newPage();
    await freshPage.route('**/macros/s/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });
    freshPage.on('console', (msg) => console.log(`[FRESH PAGE LOG] ${msg.type()}: ${msg.text()}`));
    freshPage.on('pageerror', (err) => console.error(`[FRESH PAGE ERROR]`, err));

    await freshPage.goto(`${BASE}/audit-checklist/`, { waitUntil: 'networkidle' });
    const gateEmailInput = freshPage.locator('#gate-email');
    await gateEmailInput.waitFor({ state: 'attached', timeout: 5000 });
    assert(await gateEmailInput.isVisible(), 'Safeguard gate email input is visible for new visitors');

    const scoreButtonsCount = await freshPage.locator('.bg-paper-raised button:text-is("2")').count();
    assert(scoreButtonsCount === 0, 'Scorecard buttons are strictly locked/hidden before email submission');

    // Fill the gate form to unlock
    await freshPage.locator('#gate-name').fill('Geetha Test');
    await freshPage.locator('#gate-email').fill('geetha.client@example.com');
    await freshPage.locator('button[type="submit"]:has-text("Unlock Full Audit Scorecard")').click();

    const unlockedScoreHeader = freshPage.locator('#score-total-val');
    await unlockedScoreHeader.waitFor({ state: 'attached', timeout: 5000 });
    assert(await unlockedScoreHeader.isVisible(), 'Scorecard unlocks instantly on-screen after submitting name & email');

    const unlockedButtonsCount = await freshPage.locator('.bg-paper-raised button:text-is("2")').count();
    assert(unlockedButtonsCount > 0, '10-point scorecard buttons are active and interactive after unlock');

    await freshContext.close();

  } catch (err) {
    console.error('[ERROR during tests]:', err);
    failed++;
  } finally {
    await browser?.close();
    killTree(previewProc);
    console.log(`\n========================================`);
    console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

main();
