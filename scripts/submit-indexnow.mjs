// One-off / on-demand: pushes every route to IndexNow (Bing, Yandex,
// Seznam.cz, Naver) so they get crawled within minutes instead of
// waiting on the next scheduled crawl. Not wired into the build — run
// manually after publishing new content: `node scripts/submit-indexnow.mjs`
import { getAllRoutes } from './routes.mjs';

const host = 'uncodedhub.com';
const key = '68aa08d650ec000f6594562ae6d4ca25';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = getAllRoutes().map((r) => `https://${host}${r.loc}`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

console.log(`Submitted ${urlList.length} URLs to IndexNow — status ${res.status}`);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exitCode = 1;
}
