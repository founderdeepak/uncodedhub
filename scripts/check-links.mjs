import fs from 'fs';
import path from 'path';

const searchDirs = [
  'src',
  'public',
  'Demo Website Template for 6 NIches',
  'Demo Website Template for New Niches'
];

let missingTrailingSlash = [];

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build', 'temp', '.agents', '.claude'].includes(e.name)) {
        scan(full);
      }
    } else if (/\.(html|jsx|tsx|js|ts|json|md)$/.test(e.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const hrefRegex = /href=["'](https?:\/\/uncodedhub\.com)?(\/[a-zA-Z0-9_\-\/]+)["']/g;
      let match;
      while ((match = hrefRegex.exec(content)) !== null) {
        const url = match[2];
        if (!url.endsWith('/') && !/\.[a-z0-9]{1,5}$/i.test(url) && url !== '/') {
          missingTrailingSlash.push({
            file: path.relative(process.cwd(), full),
            url: url
          });
        }
      }
    }
  }
}

searchDirs.forEach(scan);

// Also check root index.html
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf8');
  const hrefRegex = /href=["'](https?:\/\/uncodedhub\.com)?(\/[a-zA-Z0-9_\-\/]+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[2];
    if (!url.endsWith('/') && !/\.[a-z0-9]{1,5}$/i.test(url) && url !== '/') {
      missingTrailingSlash.push({
        file: 'index.html',
        url: url
      });
    }
  }
}

console.log(`Found ${missingTrailingSlash.length} links missing trailing slash:`);
const uniqueUrls = new Set();
missingTrailingSlash.forEach(item => {
  uniqueUrls.add(item.url);
  console.log(`  ${item.file}: href="${item.url}"`);
});

console.log(`\nUnique URLs without trailing slash:`, Array.from(uniqueUrls));
