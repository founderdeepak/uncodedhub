// Pushes every route to IndexNow (Bing, Yandex, Seznam.cz, Naver)
// so changes get crawled within minutes instead of waiting on scheduled passes.
import { getAllRoutes } from './routes.mjs';

const host = 'uncodedhub.com';
const key = '053a9cd8e5d94a87a086ed1013135f55';
const keyLocation = `https://${host}/${key}.txt`;

const urlList = getAllRoutes().map((r) => `https://${host}${r.loc}`);

const endpoints = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList }),
    });

    console.log(`[IndexNow] Pushed ${urlList.length} URLs to ${endpoint} — status ${res.status}`);
    if (res.status !== 200 && res.status !== 202) {
      const err = await res.text();
      console.warn(`[IndexNow Response] ${endpoint}: ${err}`);
    }
  } catch (err) {
    console.warn(`[IndexNow Network Error] ${endpoint}:`, err.message);
  }
}
