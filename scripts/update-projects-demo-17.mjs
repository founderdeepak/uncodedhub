import fs from 'fs';

const filePath = 'src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace thumbnail for doctor-specialist
content = content.replace(
  /image:\s*['"]\/demos\/thumbnails\/doctor-specialist-theme1\.webp['"]/g,
  "image: '/demos/assets/demo-17-doctor-specialist/01_Hero_Showcase.png'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated projects.ts for Demo 17');
