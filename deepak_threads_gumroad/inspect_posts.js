const fs = require('fs');

const content = fs.readFileSync('zernio_top_500_engagement_posts.csv', 'utf8');

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let inQuotes = false;
  let currentToken = '';

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        currentToken += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      currentRow.push(currentToken);
      currentToken = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      currentRow.push(currentToken);
      currentToken = '';
      if (currentRow.length > 1) rows.push(currentRow);
      currentRow = [];
    } else {
      currentToken += c;
    }
  }
  if (currentToken || currentRow.length) {
    currentRow.push(currentToken);
    rows.push(currentRow);
  }
  return rows;
}

const rows = parseCSV(content);
console.log('Headers:', rows[0]);
console.log('\n--- Full Post 1 ---');
console.log(rows[1]);
console.log('\n--- Full Post 2 ---');
console.log(rows[2]);
console.log('\n--- Full Post 3 ---');
console.log(rows[3]);
console.log('\n--- Full Post 4 ---');
console.log(rows[4]);
console.log('\n--- Full Post 5 ---');
console.log(rows[5]);
