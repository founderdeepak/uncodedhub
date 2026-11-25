const fs = require('fs');
const path = require('path');

const buf = fs.readFileSync(path.join(__dirname, 'test_page_margins.pdf'));
const str = buf.toString('latin1');

// Match all MediaBox and CropBox
const matches = str.match(/\/MediaBox\s*\[\s*[\d\.\s]+\s*\]/g);
console.log('MediaBoxes:', matches);

// Check if there are /CropBox or page objects
const pages = str.match(/\/Type\s*\/Page\b/g);
console.log('Total pages in test_page_margins.pdf:', pages ? pages.length : 0);
