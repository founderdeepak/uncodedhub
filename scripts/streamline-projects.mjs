import fs from 'node:fs';
import path from 'node:path';

const projectsFilePath = path.resolve('src/data/projects.ts');
let content = fs.readFileSync(projectsFilePath, 'utf8');

// Hero assets mapping for the first 5 completed demos
const heroAssets = {
  'interior-design': '/demos/assets/demo-01-interior/01_Hero_Showcase.png',
  'real-estate': '/demos/assets/demo-02-real-estate/01_Hero_Showcase.png',
  'dental-clinic': '/demos/assets/demo-03-dental-clinic/01_Hero_Showcase.png',
  'wedding-photography': '/demos/assets/demo-04-wedding-photography/01_Hero_Showcase.png',
  'home-renovation': '/demos/assets/demo-05-home-renovation/01_Hero_Showcase.png',
};

// Also let's update summaries that mention "3-style visual theme switcher" or similar
content = content.replace(
  'and an interactive 3-style visual theme switcher.',
  'and a single signature warm heritage architectural aesthetic.'
);

// We can read and parse PROJECTS or do a safe regex replacement so each project keeps only its first theme in themes: [ ... ]
// Let's use a regex to replace each themes: [\s\S]*?] block with only the first theme item inside it!
const updatedContent = content.replace(/themes:\s*\[\s*\{([\s\S]*?)\},[\s\S]*?\](?=,\s*\n\s*nicheSlug)/g, (match, firstThemeBody) => {
  return `themes: [\n      {${firstThemeBody}},\n    ]`;
});

fs.writeFileSync(projectsFilePath, updatedContent, 'utf8');
console.log('Streamlined themes in projects.ts');

// Now let's update the image paths for the first 5 projects
let projectsCode = fs.readFileSync(projectsFilePath, 'utf8');

for (const [id, imagePath] of Object.entries(heroAssets)) {
  const projectRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?themes:\\s*\\[\\s*\\{[\\s\\S]*?image:\\s*')[^']+(')`, 'g');
  projectsCode = projectsCode.replace(projectRegex, `$1${imagePath}$2`);
  console.log(`Updated thumbnail image for ${id} -> ${imagePath}`);
}

fs.writeFileSync(projectsFilePath, projectsCode, 'utf8');
console.log('Successfully updated src/data/projects.ts with single signature themes and real hero thumbnails!');
