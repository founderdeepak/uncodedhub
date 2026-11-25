const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 54, bottom: 54, left: 54, right: 54 }
});

const outPath = path.join(__dirname, 'test_pdfkit.pdf');
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

// Cover Page
// Background
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#121214');

// Gold border
doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50)
   .lineWidth(2)
   .stroke('#D4AF37');

doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
   .lineWidth(0.5)
   .stroke('#D4AF37');

// Cover text
doc.fillColor('#D4AF37')
   .fontSize(11)
   .font('Helvetica-Bold')
   .text('DEEPAK RAVI  •  OFFICIAL EDITIONS', 0, 160, { align: 'center', characterSpacing: 2 });

doc.fillColor('#FFFFFF')
   .fontSize(28)
   .font('Helvetica-Bold')
   .text('THE MIXED SIGNALS DECODER', 50, 240, { align: 'center', lineGap: 6 });

doc.fillColor('#A3A3A3')
   .fontSize(13)
   .font('Helvetica')
   .text('How to Read Silence, Inconsistency, and Hesitation in Modern Dating', 60, 310, { align: 'center', lineGap: 4 });

// Author section
doc.fillColor('#D4AF37')
   .fontSize(12)
   .font('Helvetica-Bold')
   .text('DEEPAK RAVI', 0, 620, { align: 'center', characterSpacing: 1.5 });

doc.fillColor('#737373')
   .fontSize(10)
   .font('Helvetica')
   .text('@founderdeepak  •  Threads Creator', 0, 640, { align: 'center' });

doc.fillColor('#E5E5E5')
   .fontSize(9.5)
   .font('Helvetica-Oblique')
   .text('"Love dies from neglect long before it dies from conflict."', 0, 700, { align: 'center' });

// Page 2
doc.addPage();
doc.fillColor('#111827')
   .fontSize(20)
   .font('Helvetica-Bold')
   .text('Introduction: The Anatomy of Mixed Signals', 54, 60);

doc.moveDown(1);
doc.fontSize(11)
   .font('Helvetica')
   .lineGap(4)
   .text('In modern dating, ambiguity is rarely an accident. It is almost always a decision. When someone gives you mixed signals, they are giving you a clear signal: they are weighing their options, testing your tolerance for inconsistency, or protecting themselves from commitment.');

doc.end();

stream.on('finish', () => {
  console.log('PDF successfully created at:', outPath);
});
