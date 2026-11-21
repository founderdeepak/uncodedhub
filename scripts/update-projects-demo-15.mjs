import fs from 'fs';

const filePath = 'src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace thumbnail for healthcare-diagnostics
content = content.replace(
  /image:\s*['"]\/demos\/thumbnails\/healthcare-diagnostics-theme1\.webp['"]/g,
  "image: '/demos/assets/demo-15-healthcare-diagnostics/01_Hero_Showcase.png'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated projects.ts for Demo 15');
