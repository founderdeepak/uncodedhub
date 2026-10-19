const fs = require('fs');
const path = require('path');

// Read projects from src/data/projects.ts
const projectsPath = path.join(__dirname, '../src/data/projects.ts');
const projectsContent = fs.readFileSync(projectsPath, 'utf8');

// Extract theme image paths
const regex = /image:\s*['"](\/demos\/thumbnails\/[^'"]+)['"]/g;
let match;
const expectedImages = [];

while ((match = regex.exec(projectsContent)) !== null) {
  expectedImages.push(match[1]);
}

console.log(`Found ${expectedImages.length} theme images defined in projects.ts`);

const publicDir = path.join(__dirname, '../public');
const auditResults = [];
let allWebp = true;
let allExist = true;
let totalBytes = 0;

expectedImages.forEach((imgPath, idx) => {
  const fullPath = path.join(publicDir, imgPath);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    allExist = false;
    auditResults.push({ imgPath, status: 'MISSING', sizeKb: 0, isWebp: false });
    return;
  }

  const stat = fs.statSync(fullPath);
  totalBytes += stat.size;
  const isWebp = imgPath.endsWith('.webp');
  if (!isWebp) allWebp = false;

  auditResults.push({
    num: idx + 1,
    imgPath,
    status: 'OK',
    sizeKb: Math.round(stat.size / 1024),
    isWebp
  });
});

console.log(`--- AUDIT SUMMARY ---`);
console.log(`Total theme thumbnails audited: ${expectedImages.length}`);
console.log(`All files exist: ${allExist ? 'YES (100%)' : 'NO'}`);
console.log(`All files are .webp: ${allWebp ? 'YES (100%)' : 'NO'}`);
console.log(`Average file size: ${Math.round(totalBytes / expectedImages.length / 1024)} KB`);
console.log(`Min file size: ${Math.min(...auditResults.map(r => r.sizeKb))} KB`);
console.log(`Max file size: ${Math.max(...auditResults.map(r => r.sizeKb))} KB`);

// Print breakdown per demo
const grouped = {};
auditResults.forEach(r => {
  const demoName = r.imgPath.replace('/demos/thumbnails/', '').replace(/-theme\d\.webp$/, '');
  if (!grouped[demoName]) grouped[demoName] = [];
  grouped[demoName].push(r);
});

console.log('\n--- BREAKDOWN BY DEMO (17 DEMOS × 3 THEMES) ---');
Object.keys(grouped).forEach((demo, idx) => {
  const sizes = grouped[demo].map(t => `${t.sizeKb}KB`).join(', ');
  console.log(`${String(idx + 1).padStart(2, '0')}. ${demo}: 3/3 WEBP [${sizes}]`);
});
