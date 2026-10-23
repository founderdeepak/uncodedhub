import fs from 'fs';
import path from 'path';

function parseCsv(filepath) {
  if (!fs.existsSync(filepath)) return [];
  const text = fs.readFileSync(filepath, 'utf8');
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  // Simple CSV line parser handling quotes
  const parseLine = (line) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur);
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = (values[idx] || '').trim();
    });
    rows.push(obj);
  }
  return rows;
}

const sfDir = path.resolve('screamingfrog reports');

console.log('=== 1. Missing Canonicals ===');
const canonicals = parseCsv(path.join(sfDir, 'canonicals_all.csv'));
const missingCanonicals = canonicals.filter(r => !r['Canonical Link Element 1'] || r['Canonical Link Element 1'] === '');
console.log(`Found ${missingCanonicals.length} missing canonicals:`);
missingCanonicals.forEach(r => console.log(' ', r['Address']));

console.log('\n=== 2. 3xx Internal Redirects ===');
const responseCodes = parseCsv(path.join(sfDir, 'response_codes_all.csv'));
const redirects = responseCodes.filter(r => r['Status Code'] && r['Status Code'].startsWith('3'));
console.log(`Found ${redirects.length} redirects:`);
redirects.slice(0, 30).forEach(r => console.log(`  ${r['Status Code']} ${r['Address']} -> ${r['Redirect URL']}`));

console.log('\n=== 3. Security / Unsafe Cross-Origin ===');
const security = parseCsv(path.join(sfDir, 'security_all.csv'));
const unsafe = security.filter(r => r['Unsafe Cross-Origin Links'] === 'True' || r['Bad Content Type'] === 'True');
console.log(`Found ${unsafe.length} security flags:`);
unsafe.forEach(r => console.log(' ', r['Address'], 'Unsafe:', r['Unsafe Cross-Origin Links'], 'BadContent:', r['Bad Content Type']));

console.log('\n=== 4. Demo URLs in Screaming Frog ===');
const allUrls = parseCsv(path.join(sfDir, 'url_all.csv'));
const demoUrls = allUrls.filter(r => r['Address'].includes('demo'));
console.log(`Found ${demoUrls.length} demo URLs:`);
demoUrls.forEach(r => console.log(' ', r['Address'], 'Status:', r['Status Code'], 'Indexability:', r['Indexability'], 'Canonical:', r['Canonical Link Element 1']));

console.log('\n=== 5. Images missing Alt Text ===');
const images = parseCsv(path.join(sfDir, 'images_all.csv'));
const missingAlt = images.filter(r => r['Alt Text'] === '' && r['Status Code'] === '200');
console.log(`Found ${missingAlt.length} images without alt text:`);
missingAlt.slice(0, 10).forEach(r => console.log(' ', r['Address']));
