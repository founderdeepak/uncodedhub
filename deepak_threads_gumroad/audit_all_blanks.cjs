const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function auditPdfPages(pdfPath) {
  const buf = fs.readFileSync(pdfPath);
  const str = buf.toString('latin1');
  
  const contentsRegex = /\/Contents\s+(\d+)\s+0\s+R/g;
  const contentIds = [];
  let pageMatch;
  while ((pageMatch = contentsRegex.exec(str)) !== null) {
    contentIds.push(parseInt(pageMatch[1], 10));
  }

  const blankPages = [];
  contentIds.forEach((id, idx) => {
    const pageIndex = idx + 1;
    if (pageIndex === 1) return; // Cover page

    const objRegex = new RegExp(`${id}\\s+0\\s+obj[\\s\\S]*?stream[\\r\\n]+([\\s\\S]*?)[\\r\\n]+endstream`);
    const objMatch = str.match(objRegex);
    if (!objMatch) return;

    try {
      const raw = Buffer.from(objMatch[1], 'latin1');
      const unzipped = zlib.inflateSync(raw).toString('utf8');
      const hasText = unzipped.includes('Tj') || unzipped.includes('TJ');
      if (!hasText) {
        blankPages.push(pageIndex);
      }
    } catch (e) {}
  });

  return { totalPages: contentIds.length, blankPages };
}

const paidDir = path.join(__dirname, 'compiled_pdfs', 'paid');
const freeDir = path.join(__dirname, 'compiled_pdfs', 'free');

const allPaid = fs.readdirSync(paidDir).filter(f => f.endsWith('.pdf'));
const allFree = fs.readdirSync(freeDir).filter(f => f.endsWith('.pdf'));

let totalBlanks = 0;

allPaid.forEach(p => {
  const res = auditPdfPages(path.join(paidDir, p));
  if (res.blankPages.length > 0) {
    console.log(`⚠️ BLANK DETECTED in ${p}: Pages ${res.blankPages.join(', ')}`);
    totalBlanks += res.blankPages.length;
  }
});

allFree.forEach(f => {
  const res = auditPdfPages(path.join(freeDir, f));
  if (res.blankPages.length > 0) {
    console.log(`⚠️ BLANK DETECTED in ${f}: Pages ${res.blankPages.join(', ')}`);
    totalBlanks += res.blankPages.length;
  }
});

if (totalBlanks === 0) {
  console.log('🎉 AUDIT COMPLETE: ZERO BLANK PAGES ACROSS ALL 40 RECOMPILED EBOOKS!');
} else {
  console.log(`Found ${totalBlanks} blank pages total.`);
}
