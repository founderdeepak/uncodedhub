import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('UncodedHub Projects/001_Sri_Ayyanar_Sirpa_Kalai/Difference');
const destDirs = [
  path.resolve('public/demos/ayyanar/difference'),
  path.resolve('dist/demos/ayyanar/difference'),
  path.resolve('public/ayyanar/difference'),
  path.resolve('dist/ayyanar/difference')
];

destDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const fileMap = {
  'Amman - Sudhai Sirpam - unpainted.png': 'amman-unpainted.png',
  'Amman - Varna Velai - painted.png': 'amman-painted.png',
  'Murugan - Sudhai Sirpam - unpainted.png': 'murugan-unpainted.png',
  'Murugan - Varna Velai - painted.png': 'murugan-painted.png',
  'Sivan -Sudhai Sirpam - unpainted.png': 'sivan-unpainted.png',
  'Sivan - Varna Velai - painted.png': 'sivan-painted.png'
};

const srcFiles = fs.readdirSync(srcDir);

for (const [srcName, destName] of Object.entries(fileMap)) {
  const match = srcFiles.find(f => f.trim().toLowerCase() === srcName.trim().toLowerCase());
  if (!match) {
    console.error('Match not found for:', srcName);
    continue;
  }
  const srcPath = path.join(srcDir, match);
  const buffer = fs.readFileSync(srcPath);
  destDirs.forEach(dest => {
    fs.writeFileSync(path.join(dest, destName), buffer);
  });
  console.log(`Copied ${match} -> ${destName}`);
}

console.log('All 6 difference comparison assets deployed successfully.');
