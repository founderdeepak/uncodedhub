import fs from 'node:fs';
import path from 'node:path';

const srcDir = 'UncodedHub Projects/Demo_13_Yoga_Meditation/Assets';
const targetDir = 'public/demos/assets/demo-13-yoga-meditation';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
console.log('Found source files in Demo 13:', files);

const mapping = [
  { prefix: '01', target: '01_Hero_Showcase.png' },
  { prefix: '02', target: '02_Work_01.png' },
  { prefix: '03', target: '03_Work_02.png' },
  { prefix: '04', target: '04_Work_03.png' },
  { prefix: '05', target: '05_Work_04.png' },
  { prefix: '06', target: '06_Work_05.png' },
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

console.log('Demo 13 Assets standardized successfully!');
