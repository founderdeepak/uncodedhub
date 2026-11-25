const fs = require('fs');
const path = require('path');

const ebooksDir = path.join(__dirname, 'ebooks');
const files = fs.readdirSync(ebooksDir).filter(f => f.endsWith('.md'));

let fixedCount = 0;
for (const file of files) {
  const filePath = path.join(ebooksDir, file);
  let text = fs.readFileSync(filePath, 'utf8');

  // Replace multiple consecutive `---` with a single `---`
  const cleaned = text.replace(/(---[\r\n\s]*){2,}/g, '---\n\n');
  if (cleaned !== text) {
    fs.writeFileSync(filePath, cleaned, 'utf8');
    fixedCount++;
  }
}

console.log(`Cleaned consecutive '---' from ${fixedCount} files in ebooks/`);
