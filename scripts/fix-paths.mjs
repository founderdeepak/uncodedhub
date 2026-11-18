import fs from 'fs';
import path from 'path';

let html = fs.readFileSync('public/demos/ayyanar-sirpa-kalai.html', 'utf8');

// Replace all /demos/ayyanar/ with ayyanar/
html = html.replaceAll('/demos/ayyanar/', 'ayyanar/');

// Also ensure openLightbox uses relative path
html = html.replaceAll("openLightbox('/demos/ayyanar/", "openLightbox('ayyanar/");

fs.writeFileSync('public/demos/ayyanar-sirpa-kalai.html', html);
console.log('Updated public/demos/ayyanar-sirpa-kalai.html with relative paths');

// Also update dist/demos/ayyanar-sirpa-kalai.html
if (fs.existsSync('dist/demos')) {
  fs.writeFileSync('dist/demos/ayyanar-sirpa-kalai.html', html);
  console.log('Updated dist/demos/ayyanar-sirpa-kalai.html with relative paths');
}

// Ensure ayyanar folder exists in public/ayyanar and dist/ayyanar just in case
const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    fs.copyFileSync(path.join(src, file), path.join(dest, file));
  });
};

copyDir('public/demos/ayyanar', 'public/ayyanar');
if (fs.existsSync('dist')) {
  copyDir('public/demos/ayyanar', 'dist/ayyanar');
  copyDir('public/demos/ayyanar', 'dist/demos/ayyanar');
}
console.log('All image aliases and folders synced.');
