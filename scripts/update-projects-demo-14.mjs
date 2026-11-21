import fs from 'fs';

const filePath = 'src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace thumbnail for creative-portfolio
content = content.replace(
  /image:\s*['"]\/demos\/thumbnails\/creative-portfolio-theme1\.webp['"]/g,
  "image: '/demos/assets/demo-14-creative-portfolio/01_Hero_Showcase.png'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated projects.ts for Demo 14');
