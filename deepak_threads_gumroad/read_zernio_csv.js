const fs = require('fs');
const content = fs.readFileSync('zernio_posts.csv', 'utf8');
const lines = content.split('\n');
console.log('Total lines in zernio_posts.csv:', lines.length);
console.log('First 5 lines:');
lines.slice(0, 5).forEach(l => console.log(l));
