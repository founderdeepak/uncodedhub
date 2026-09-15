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
  return page.content();
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
    { cwd: root, stdio: 'pipe', shell: true },
  );
  let previewOutput = '';
  preview.stdout?.on('data', (d) => (previewOutput += d));
  preview.stderr?.on('data', (d) => (previewOutput += d));

  // --no-sandbox: GitHub Actions runs as root, and Chromium's sandbox
  // refuses to initialize under root without it -- launch() just hangs
  // rather than erroring, which is why the first CI run sat "in
  // progress" indefinitely instead of failing fast. Harmless locally.
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
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
      console.log(`  ${route} -> ${path.relative(distDir, outPath)}`);
    }

    await page.close();
  } catch (err) {
    console.error('--- vite preview output ---\n' + previewOutput);
    throw err;
  } finally {
    await browser.close();
    // `preview` was spawned with shell:true (npx -> node -> vite), so
    // preview.kill() only kills the shell, leaving the actual vite
    // server running and the port held. On Windows, kill the whole
    // process tree explicitly; elsewhere the plain kill is sufficient.
    if (process.platform === 'win32' && preview.pid) {
      try {
        execSync(`taskkill /PID ${preview.pid} /T /F`, { stdio: 'ignore' });
      } catch {
        // already exited
      }
    } else {
      preview.kill();
    }
  }

  console.log(`Prerendered ${allRoutes.length} routes + 404.html.`);
}

// Hard ceiling on the whole script. Local runs finish in well under 2
// minutes; this is generous headroom for CI overhead. Without this, an
// unexpected hang anywhere (browser launch, a wedged navigation) burns
// CI minutes indefinitely instead of failing with a clear signal -- as
// the first CI run of this script did before --no-sandbox was added.
const OVERALL_TIMEOUT_MS = 8 * 60 * 1000;
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error(`prerender.mjs exceeded ${OVERALL_TIMEOUT_MS}ms overall`)), OVERALL_TIMEOUT_MS),
);

Promise.race([main(), timeout]).catch((err) => {
  console.error(err);
  process.exit(1);
});
