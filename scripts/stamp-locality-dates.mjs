import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const localitiesPath = path.join(root, 'src', 'data', 'bangaloreLocalities.json');
const localities = JSON.parse(readFileSync(localitiesPath, 'utf-8'));

const times = ['08:00:00+05:30', '12:00:00+05:30', '15:00:00+05:30', '18:00:00+05:30', '21:00:00+05:30'];
const startDate = new Date('2026-03-12T00:00:00+05:30');

// Calculate total entries: hubs + spokes
const localityKeys = Object.keys(localities);
let totalEntries = 0;
for (const key of localityKeys) {
  totalEntries += 1; // locality hub
  totalEntries += localities[key].niches.length; // spoke niches
}

const timestamps = [];
let prevDateStr = '';
let lastSlotIdx = -1;
let globalCycle = 0;

for (let i = 0; i < totalEntries; i++) {
  const t = i / (totalEntries - 1);
  const dayOffset = Math.floor(t * 246);
  const d = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  if (dateStr !== prevDateStr) {
    prevDateStr = dateStr;
    lastSlotIdx = (globalCycle % 3);
  } else {
    lastSlotIdx = Math.min(lastSlotIdx + 2, times.length - 1);
  }
  globalCycle++;
  timestamps.push(`${dateStr}T${times[lastSlotIdx]}`);
}

let stampIdx = 0;
for (const key of localityKeys) {
  const loc = localities[key];
  loc.publishedAt = timestamps[stampIdx++];
  for (const niche of loc.niches) {
    niche.publishedAt = timestamps[stampIdx++];
  }
}

writeFileSync(localitiesPath, JSON.stringify(localities, null, 2) + '\n', 'utf-8');
console.log(`Successfully stamped ${totalEntries} dates across ${localityKeys.length} localities.`);
console.log(`First entry: ${timestamps[0]}`);
console.log(`Last entry: ${timestamps[timestamps.length - 1]}`);
