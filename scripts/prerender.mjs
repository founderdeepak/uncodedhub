// Post-build step: renders every route the app actually serves in a
// real headless browser (against the just-built dist/, via `vite
// preview`) and writes the fully-rendered HTML to a matching static
// file. This is what makes uncodedhub.com's content, titles, meta
// tags, and JSON-LD visible to crawlers that don't execute
// JavaScript (most non-Google bots, including the AI crawlers the
// site's own robots.txt invites in) instead of shipping an empty
// `<div id="root">` for every URL.
//
// The client bundle is untouched — src/main.tsx hydrates onto this
// static HTML instead of throwing it away and rendering from scratch,
// so interactivity works exactly as it did before.
import { spawn, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { getAllRoutes } from './routes.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, 'dist');
const PORT = 4319; // arbitrary, unlikely to collide with dev's 3000 or preview's default 4173
const BASE = `http://localhost:${PORT}`;
// A path guaranteed not to match any real route, so the app renders
// its NotFound page — captured to dist/404.html for Apache's
// ErrorDocument directive (see public/.htaccess).
const NOT_FOUND_PROBE = '/__prerender_404_probe__';

// Module-scope so both the normal shutdown path (main()'s own
// finally) and the timeout/error path below can reach it to
// force-kill it. Without this, a timeout that calls process.exit()
// leaves `vite preview` running as an orphan with inherited stdio
// pipes -- which makes GitHub Actions treat the step as still
// "running" indefinitely, even though this script has already given
// up. That is what actually happened on the first two CI attempts:
// not a hang inside this script's own logic, but an orphaned `vite
// preview` (spawned via shell:true, so a plain .kill() only reaches
// the shell layer, not vite itself) keeping the step's log stream
// open after main() lost the timeout race. Playwright's own browser
// process is not this script's responsibility to track -- browser.close()
// below handles it.
let previewProc = null;

function killTree(child) {
  if (!child) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' });
    } else {
      // Negative pid targets the whole process group. `preview` is
      // spawned with detached:true specifically so it gets its own
      // group (npx -> node -> vite all land in it); killing the group
      // reaches vite's own child processes too, not just the shell.
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

function cleanup() {
  killTree(previewProc);
}

function outputPathFor(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
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

async function renderOnce(page, route) {
  const url = `${BASE}${route}`;
  const startedAt = Date.now();
  // Not `networkidle`: the Contact page's Supabase client can keep a
  // connection open indefinitely, which means the network never goes
  // idle and every route after it would time out waiting for something
  // that isn't coming. `domcontentloaded` + an explicit readiness check
  // (title set, #root populated) is what actually indicates the route
  // has rendered, regardless of what background connections it holds.
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForFunction(
    () => document.title.length > 0 && !!document.getElementById('root')?.children.length,
    { timeout: 20_000 },
  );
  // Small settle buffer: Helmet's effect and any post-mount reveal
  // classes run a tick or two after the check above passes.
  await page.waitForTimeout(200);
  const html = await page.content();
  console.log(`  [${Date.now() - startedAt}ms] ${route}`);
  return html;
}

async function renderRoute(page, route, attempts = 2) {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await renderOnce(page, route);
    } catch (err) {
      // A cold lazy-loaded chunk (first hit against localhost after the
      // preview server just started) occasionally misses the timeout
      // once; a bare retry on the same page is enough to clear it. Only
      // the last attempt's error propagates.
      if (i === attempts) throw err;
      console.warn(`  (retrying ${route} after: ${err.message.split('\n')[0]})`);
    }
  }
}

async function main() {
  const allRoutes = getAllRoutes().map((r) => r.loc);
  // `/` must render LAST. Every route that doesn't have its own static
  // file yet falls back (via vite preview's SPA history fallback) to
  // whatever dist/index.html currently contains. If '/' were rendered
  // first, dist/index.html would be overwritten with the fully-hydrated
  // homepage mid-run, and every subsequent route would then hydrate
  // (wrongly) onto that leftover homepage markup instead of client-
  // rendering fresh onto the original empty shell -- producing the
  // homepage's title/content on every other route. Keeping the fallback
  // file untouched (the original empty-shell build output) until the
  // very end is what makes every other route's fallback-served load a
  // clean client render instead of a mismatched hydration.
  // The 404 probe has the same fallback-file dependency, so it also
  // has to render before '/' is written.
  const routes = [...allRoutes.filter((r) => r !== '/'), NOT_FOUND_PROBE, '/'];
  console.log(`Prerendering ${allRoutes.length} routes + 404...`);

  const preview = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: root, stdio: 'pipe', shell: true, detached: process.platform !== 'win32' },
  );
  previewProc = preview;
  let previewOutput = '';
  preview.stdout?.on('data', (d) => (previewOutput += d));
  preview.stderr?.on('data', (d) => (previewOutput += d));

  // --no-sandbox: GitHub Actions runs as root, and Chromium's sandbox
  // refuses to initialize under root without it.
  // --disable-dev-shm-usage: GitHub Actions containers give /dev/shm a
  // tiny default size, which starves Chromium's shared memory and
  // makes it crash or stall under normal (non-trivial) page loads.
  // Both are the standard pairing for running Chromium in a CI
  // container; harmless locally.
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    await waitForServer(BASE + '/');
    const page = await browser.newPage();

    for (const route of routes) {
      const html = await renderRoute(page, route);
      if (route === NOT_FOUND_PROBE) {
        writeFileSync(path.join(distDir, '404.html'), html);
        console.log(`  (404) -> 404.html`);
        continue;
      }
      const outPath = outputPathFor(route);
      mkdirSync(path.dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
    }

    await page.close();
  } catch (err) {
    console.error('--- vite preview output ---\n' + previewOutput);
    throw err;
  } finally {
    await browser.close().catch(() => {});
    cleanup();
  }

  console.log(`Prerendered ${allRoutes.length} routes + 404.html.`);
}

// Hard ceiling on the whole script. Local runs finish in well under 2
// minutes; this is generous headroom for CI overhead. Without this, an
// unexpected hang anywhere (browser launch, a wedged navigation) burns
// CI minutes indefinitely instead of failing with a clear signal.
const OVERALL_TIMEOUT_MS = 8 * 60 * 1000;
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error(`prerender.mjs exceeded ${OVERALL_TIMEOUT_MS}ms overall`)), OVERALL_TIMEOUT_MS),
);

Promise.race([main(), timeout]).catch((err) => {
  console.error(err);
  // main() may still be mid-flight if `timeout` won the race -- its own
  // finally block hasn't necessarily run yet, so clean up explicitly
  // here too rather than trusting it to happen eventually.
  cleanup();
  process.exit(1);
});
