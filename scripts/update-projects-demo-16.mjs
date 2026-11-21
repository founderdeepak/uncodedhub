import fs from 'fs';

const filePath = 'src/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace thumbnail for clinic-polyclinic
content = content.replace(
  /image:\s*['"]\/demos\/thumbnails\/clinic-polyclinic-theme1\.webp['"]/g,
  "image: '/demos/assets/demo-16-clinic-polyclinic/01_Hero_Showcase.png'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated projects.ts for Demo 16');
