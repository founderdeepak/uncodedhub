const fs = require('fs');
const path = require('path');

const paidDir = path.join(__dirname, 'compiled_pdfs', 'paid');
const freeDir = path.join(__dirname, 'compiled_pdfs', 'free');

const paidPdfs = fs.readdirSync(paidDir).filter(f => f.endsWith('.pdf'));
const freePdfs = fs.readdirSync(freeDir).filter(f => f.endsWith('.pdf'));

console.log('Paid PDFs count:', paidPdfs.length);
console.log('Free PDFs count:', freePdfs.length);

function getPageCount(filePath) {
  const buf = fs.readFileSync(filePath);
  const str = buf.toString('latin1');
  const pages = str.match(/\/Type\s*\/Page\b/g);
  return pages ? pages.length : 0;
}

console.log('\n--- PAID PDF PAGE AUDIT ---');
let totalPaidPages = 0;
paidPdfs.forEach(p => {
  const count = getPageCount(path.join(paidDir, p));
  totalPaidPages += count;
  console.log(p.padEnd(52) + ' : ' + count + ' pages');
});

console.log('\n--- FREE PDF PAGE AUDIT ---');
freePdfs.forEach(f => {
  const count = getPageCount(path.join(freeDir, f));
  console.log(f.padEnd(52) + ' : ' + count + ' pages');
});

console.log('\nTotal Paid Pages:', totalPaidPages);
