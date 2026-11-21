import fs from 'node:fs';
import path from 'node:path';

const srcDir = 'UncodedHub Projects/Demo_09_Business_Portfolio/Assets';
const targetDir = 'public/demos/assets/demo-09-business-portfolio';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
console.log('Found source files in Demo 09:', files);

const mapping = [
  { prefix: '01', target: '01_Hero_Showcase.png' },
  { prefix: '02', target: '02_Case_Study_1.png' },
  { prefix: '03', target: '03_Case_Study_2.png' },
  { prefix: '04', target: '04_Case_Study_3.png' },
  { prefix: '05', target: '05_Case_Study_4.png' },
  { prefix: '06', target: '06_Case_Study_5.png' },
  { prefix: '07', target: '07_Before_Raw.png' },
  { prefix: '08', target: '08_After_Finished.png' },
  { prefix: '09', target: '09_Artisan_Founder.png' },
  { prefix: '10', target: '10_Process_Detail.png' },
];

for (const map of mapping) {
  const match = files.find(f => f.startsWith(map.prefix));
  if (match) {
    const srcPath = path.join(srcDir, match);
    const destPath = path.join(targetDir, map.target);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${match} -> ${map.target}`);
  } else {
    console.error(`Missing file with prefix ${map.prefix}`);
  }
}

console.log('Demo 09 Assets standardized successfully!');
