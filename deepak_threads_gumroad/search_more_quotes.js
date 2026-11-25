const fs = require('fs');
const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (l.toLowerCase().includes('nobody tells you') || l.toLowerCase().includes('love dies') || l.toLowerCase().includes('neglect') || l.toLowerCase().includes('signature')) {
    console.log(`Found around line ${idx}:`, l);
  }
});
