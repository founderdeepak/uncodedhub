import fs from 'node:fs';
import path from 'node:path';

const demosDir = path.resolve('public/demos');
const files = fs.readdirSync(demosDir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(demosDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // 1. Remove floating theme controller HTML block (with or without comments)
  html = html.replace(/<!--[\s\S]*?(?:Theme Switcher|Theme Controller|3 Layout Styles|3-Theme Controller)[\s\S]*?-->\s*<div class="theme-controller"[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<div class="theme-controller"[\s\S]*?<\/div>/gi, '');

  // 2. Remove script block for switchTheme
  html = html.replace(/<script>\s*\/\/\s*Theme Switcher Logic[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script>\s*function switchTheme[\s\S]*?<\/script>/gi, '');

  // 3. Remove switchTheme function if inside a larger script block
  html = html.replace(/function switchTheme\s*\([^)]*\)\s*\{[\s\S]*?try\s*\{[\s\S]*?localStorage\.getItem[\s\S]*?\}\s*\}\s*catch\s*\([^)]*\)\s*\{\s*\}/gi, '');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    modifiedCount++;
    console.log(`Cleaned theme switcher from: ${file}`);
  }
}

console.log(`\nTotal files cleaned: ${modifiedCount}`);
