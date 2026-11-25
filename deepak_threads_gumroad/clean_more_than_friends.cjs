const fs = require('fs');
const path = require('path');

const ebooksDir = path.join(__dirname, 'ebooks');
const files = fs.readdirSync(ebooksDir).filter(f => f.endsWith('.md'));

let modifiedCount = 0;
for (const file of files) {
  const filePath = path.join(ebooksDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it contains More Than Friends
  if (content.toLowerCase().includes('more than friends')) {
    const lines = content.split(/\r?\n/);
    const filtered = lines.filter(line => !line.toLowerCase().includes('more than friends') && !line.toLowerCase().includes('more-than-friends'));
    fs.writeFileSync(filePath, filtered.join('\n'), 'utf8');
    modifiedCount++;
  }
}

console.log(`Cleaned 'More Than Friends' from ${modifiedCount} files in ebooks/`);
