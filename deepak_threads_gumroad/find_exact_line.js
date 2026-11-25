const fs = require('fs');
const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (l.includes('6ac1fd') || l.includes('— Deepak') || l.includes('Deepak"')) {
    console.log(`Line ${idx}:`);
    for (let j = Math.max(0, idx - 10); j <= Math.min(lines.length - 1, idx + 5); j++) {
      console.log(`${j}: ${lines[j]}`);
    }
  }
});
