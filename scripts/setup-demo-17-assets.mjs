import fs from 'fs';
import path from 'path';

const srcDir = 'UncodedHub Projects/Demo_17_Doctor_Specialist/Assets';
const destDir = 'public/demos/assets/demo-17-doctor-specialist';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

const mappings = [
  { prefix: '01', dest: '01_Hero_Showcase.png' },
  { prefix: '02', dest: '02_Work_01.png' },
  { prefix: '03', dest: '03_Work_02.png' },
  { prefix: '04', dest: '04_Work_03.png' },
  { prefix: '05', dest: '05_Work_04.png' },
  { prefix: '06', dest: '06_Work_05.png' },
  { prefix: '07', dest: '07_Before_Raw.png' },
  { prefix: '08', dest: '08_After_Finished.png' },
  { prefix: '09', dest: '09_Artisan_Founder.png' },
  { prefix: '10', dest: '10_Process_Detail.png' },
];

for (const m of mappings) {
  const match = files.find(f => f.startsWith(m.prefix));
  if (match) {
    const srcPath = path.join(srcDir, match);
    const destPath = path.join(destDir, m.dest);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${match} -> ${m.dest}`);
  } else {
    console.error(`Warning: No match found for prefix ${m.prefix}`);
  }
}
console.log('Demo 17 asset setup complete.');
