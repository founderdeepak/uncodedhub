const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') && f !== 'README.md');
const dates = {};
const niches = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const mDate = content.match(/date:\s*["']?([^"'\r\n]+)/);
  const mNiche = content.match(/niche:\s*["']?([^"'\r\n]+)/);
  if (mDate) {
    const d = mDate[1].split('T')[0];
    dates[d] = (dates[d] || 0) + 1;
  }
  if (mNiche) {
    const n = mNiche[1];
    niches[n] = (niches[n] || 0) + 1;
  }
});

console.log('Total blogs:', files.length);
console.log('Niches breakdown:', JSON.stringify(niches, null, 2));
console.log('Unique days with posts:', Object.keys(dates).length);
const counts = Object.values(dates);
console.log('Max posts on any single day:', Math.max(...counts));
console.log('Min posts on any populated day:', Math.min(...counts));
const daysWith1 = counts.filter(c => c === 1).length;
const daysWith2 = counts.filter(c => c === 2).length;
const daysWith3Plus = counts.filter(c => c >= 3).length;
console.log(`Days distribution: 1 post: ${daysWith1}, 2 posts: ${daysWith2}, 3+ posts: ${daysWith3Plus}`);
