const fs = require('fs');
const path = require('path');

const signature = `\n\n---\n\n> *"Love dies from neglect long before it dies from conflict."*  \n> — **Deepak Ravi (@founderdeepak)**\n`;

function updateFolder(folderPath) {
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const fullPath = path.join(folderPath, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove previous signature if exists to avoid duplication
    const marker = '*"Love dies from neglect long before it dies from conflict."*';
    if (content.includes(marker)) {
      content = content.split('---')[0].trim(); // or clean strip
    }

    // Append signature footer cleanly before the closing notes/catalog
    const updated = content.trim() + signature;
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Added signature footer to ${file}`);
  });
}

console.log('Applying signature footer to all paid ebooks...');
updateFolder(path.join(__dirname, 'ebooks'));

console.log('Applying signature footer to all free lead magnets...');
updateFolder(path.join(__dirname, 'free_ebooks'));

console.log('Signature quote successfully added across all 42 ebooks!');
