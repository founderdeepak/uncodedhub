import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('UncodedHub Projects/001_Sri_Ayyanar_Sirpa_Kalai');
const destDirs = [
  path.resolve('public/demos/ayyanar'),
  path.resolve('dist/demos/ayyanar'),
  path.resolve('public/ayyanar'),
  path.resolve('dist/ayyanar')
];

destDirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Map source files to clean semantic filenames
const assetMap = {
  '1. Raja Gopuram — Hero Showcase - Vibrant South Indian Temple Gopuram at Sunset.png': [
    'hero-gopuram.png',
    'gopuram-hero.jpg',
    'gopuram-hero.png'
  ],
  '2. Sudhai Sirpam — Unpainted Temple Stucco Work - Ornate Ivory Temple Gopuram Under Blue Skies.png': [
    'sudhai-sirpam.png',
    'sudhai-relief.jpg',
    'sudhai-relief.png'
  ],
  '3. Kovil Varna Velai — Traditional Temple Sculpture Painting Vibrant Hindu Temple Gopuram Sculptures.png': [
    'kovil-varna-velai.png',
    'varna-painting.jpg',
    'varna-painting.png'
  ],
  '4.Temple Landmark — Raja Gopuram & Entrance - Vibrant South Indian Temple Entrance.png': [
    'landmark-besur-palayam.png',
    'temple-architecture.jpg',
    'temple-architecture.png'
  ],
  '5. Pachai Vaaliamman Kovil — Temple Entrance Concept - Vibrant South Indian Temple Entrance.png': [
    'landmark-pachai-vaali.png'
  ],
  '6. Muthumariamman Kovil — Puducherry - Vibrant South Indian Temple Gopuram.png': [
    'landmark-puducherry.png'
  ],
  '7. Sivan Kovil — Mandapam & Sanctum Exterior, Hosur Vibrant South Indian Temple Courtyard.png': [
    'landmark-hosur-sivan.png'
  ],
  '8. Pachai Amman Kovil — Vahanas & Gopura Sudhai - Vibrant South Indian Temple Gopuram Details.png': [
    'landmark-hosur-matham.png'
  ],
  '9a. Creative Human Sculpture — Independent Artwork - Serene Classical Statue Workshop-1.png': [
    'sculpture-detail.jpg',
    'sculpture-detail.png',
    'human-sculpture-1.png'
  ],
  '9b. Creative Human Sculpture — Independent Artwork - Serene Stone Goddess with Veena and Peacock-2.png': [
    'deity-sculpture-veena.png'
  ],
  '10. Sthapathi Workshop — Experience & Project Supervision - Traditional Temple Sculptor Workshop.png': [
    'sthapathi-workshop.png'
  ]
};

const srcFiles = fs.readdirSync(srcDir);

for (const [srcName, targetNames] of Object.entries(assetMap)) {
  const match = srcFiles.find(f => f.trim() === srcName.trim());
  if (!match) {
    console.error('Could not find match for:', srcName);
    continue;
  }
  const srcPath = path.join(srcDir, match);
  const buffer = fs.readFileSync(srcPath);

  destDirs.forEach(destDir => {
    targetNames.forEach(tName => {
      fs.writeFileSync(path.join(destDir, tName), buffer);
    });
  });
  console.log(`Successfully mapped: ${match} -> ${targetNames.join(', ')}`);
}

console.log('All 11 client assets deployed across destination folders.');
