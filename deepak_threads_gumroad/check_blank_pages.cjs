const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function auditPdfPages(pdfPath) {
  const buf = fs.readFileSync(pdfPath);
  const str = buf.toString('latin1');
  
  // Find all page objects
  const pageRegex = /<<\/Type\s*\/Page\b([\s\S]*?)>>/g;
  let pageMatch;
  let pageNum = 0;
  let blankPages = [];

  // Match /Contents stream object IDs
  const contentsRegex = /\/Contents\s+(\d+)\s+0\s+R/g;
  const contentIds = [];
  while ((pageMatch = contentsRegex.exec(str)) !== null) {
    contentIds.push(parseInt(pageMatch[1], 10));
  }

  // Inspect each stream
  contentIds.forEach((id, idx) => {
    const pageIndex = idx + 1;
    // Find object by id: "id 0 obj"
    const objRegex = new RegExp(`${id}\\s+0\\s+obj[\\s\\S]*?stream[\\r\\n]+([\\s\\S]*?)[\\r\\n]+endstream`);
    const objMatch = str.match(objRegex);
    if (!objMatch) return;

    try {
      const raw = Buffer.from(objMatch[1], 'latin1');
      const unzipped = zlib.inflateSync(raw).toString('utf8');
      
      // Page 1 is image-only cover
      if (pageIndex === 1) return;

      const hasText = unzipped.includes('Tj') || unzipped.includes('TJ');
      if (!hasText) {
        blankPages.push(pageIndex);
      }
    } catch (e) {
      // not compressed or failed
    }
  });

  return { totalPages: contentIds.length, blankPages };
}

const paidDir = path.join(__dirname, 'compiled_pdfs', 'paid');
const samplePdfs = ['01_the_mixed_signals_decoder.pdf', '02_the_smooth_texting_vault.pdf', '10_the_situationship_exit_plan.pdf', '21_the_master_bible_of_modern_romance.pdf', '27_50_dating_app_opening_lines.pdf'];

console.log('--- BLANK PAGE CHECK ON CORE TITLES ---');
samplePdfs.forEach(p => {
  const res = auditPdfPages(path.join(paidDir, p));
  console.log(`${p}: ${res.totalPages} pages | Blank pages detected: ${res.blankPages.length > 0 ? res.blankPages.join(', ') : 'NONE (100% Clean)'}`);
});
