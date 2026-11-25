const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const OUT_DIR = path.join(__dirname, 'compiled_pdfs');
const PAID_OUT = path.join(OUT_DIR, 'paid');
const FREE_OUT = path.join(OUT_DIR, 'free');

[OUT_DIR, PAID_OUT, FREE_OUT].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Color Palette
const COLORS = {
  obsidian: '#111215',
  gold: '#D4AF37',
  goldDark: '#AA8828',
  softGold: '#E6CA65',
  textMain: '#1F2937',
  textMuted: '#4B5563',
  lightGray: '#F3F4F6',
  borderGold: '#C5A028',
  white: '#FFFFFF',
  signatureQuote: '#6B7280'
};

function parseMarkdown(mdContent) {
  const lines = mdContent.split(/\r?\n/);
  let title = 'Relationship Guide';
  let subtitle = 'Tactical Frameworks for Modern Romance';
  const tokens = [];

  let titleFound = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      tokens.push({ type: 'spacer' });
      continue;
    }

    // Skip the signature footer line in body since we render it in the running footer
    if (line.includes('Love dies from neglect long before it dies from conflict.')) {
      continue;
    }

    if (!titleFound && line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').replace(/\*\*/g, '').trim();
      titleFound = true;
      // Check next non-empty line for subtitle
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && !lines[j].trim().startsWith('#') && lines[j].trim().length < 140) {
        subtitle = lines[j].trim().replace(/\*\*/g, '');
        i = j;
      }
      continue;
    }

    if (line.startsWith('### ')) {
      tokens.push({ type: 'h3', text: line.replace(/^###\s+/, '').replace(/\*\*/g, '').trim() });
    } else if (line.startsWith('## ')) {
      tokens.push({ type: 'h2', text: line.replace(/^##\s+/, '').replace(/\*\*/g, '').trim() });
    } else if (line.startsWith('# ')) {
      tokens.push({ type: 'h1', text: line.replace(/^#\s+/, '').replace(/\*\*/g, '').trim() });
    } else if (line.startsWith('> ')) {
      tokens.push({ type: 'quote', text: line.replace(/^>\s+/, '').trim() });
    } else if (/^[-*]\s+/.test(line)) {
      tokens.push({ type: 'bullet', text: line.replace(/^[-*]\s+/, '').trim() });
    } else if (/^\d+\.\s+/.test(line)) {
      tokens.push({ type: 'number', text: line.trim() });
    } else if (line.startsWith('---') || line.startsWith('***')) {
      tokens.push({ type: 'divider' });
    } else {
      tokens.push({ type: 'p', text: line });
    }
  }

  return { title, subtitle, tokens };
}

function generatePDF(mdPath, outPdfPath, tierLabel) {
  return new Promise((resolve, reject) => {
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const { title, subtitle, tokens } = parseMarkdown(mdContent);

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 54, bottom: 64, left: 54, right: 54 },
      bufferPages: true
    });

    const stream = fs.createWriteStream(outPdfPath);
    doc.pipe(stream);

    const PAGE_WIDTH = doc.page.width;
    const PAGE_HEIGHT = doc.page.height;

    // ==========================================
    // 1. LUXURY COVER PAGE
    // ==========================================
    doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill(COLORS.obsidian);

    // Elegant Outer & Inner Gold Frames
    doc.rect(28, 28, PAGE_WIDTH - 56, PAGE_HEIGHT - 56)
       .lineWidth(1.5)
       .stroke(COLORS.gold);

    doc.rect(34, 34, PAGE_WIDTH - 68, PAGE_HEIGHT - 68)
       .lineWidth(0.5)
       .stroke(COLORS.goldDark);

    // Top Brand Crest
    doc.fillColor(COLORS.gold)
       .fontSize(10)
       .font('Helvetica-Bold')
       .text('DEEPAK RAVI  •  OFFICIAL EDITIONS', 0, 140, { align: 'center', characterSpacing: 2 });

    if (tierLabel) {
      doc.fillColor(COLORS.softGold)
         .fontSize(9)
         .font('Helvetica')
         .text(tierLabel.toUpperCase(), 0, 158, { align: 'center', characterSpacing: 1.5 });
    }

    // Title Box
    let titleFontSize = 24;
    if (title.length > 35) titleFontSize = 20;
    if (title.length > 55) titleFontSize = 17;

    doc.fillColor(COLORS.white)
       .fontSize(titleFontSize)
       .font('Helvetica-Bold')
       .text(title.toUpperCase(), 50, 240, {
         align: 'center',
         lineGap: 6,
         width: PAGE_WIDTH - 100
       });

    // Subtitle
    doc.fillColor('#CCCCCC')
       .fontSize(12)
       .font('Helvetica-Oblique')
       .text(subtitle, 60, doc.y + 16, {
         align: 'center',
         lineGap: 4,
         width: PAGE_WIDTH - 120
       });

    // Decorative Gold Line
    const lineY = doc.y + 24;
    doc.moveTo(PAGE_WIDTH / 2 - 40, lineY)
       .lineTo(PAGE_WIDTH / 2 + 40, lineY)
       .lineWidth(1)
       .stroke(COLORS.gold);

    // Bottom Author & Credibility
    doc.fillColor(COLORS.gold)
       .fontSize(13)
       .font('Helvetica-Bold')
       .text('DEEPAK RAVI', 0, PAGE_HEIGHT - 170, { align: 'center', characterSpacing: 2 });

    doc.fillColor('#9CA3AF')
       .fontSize(10)
       .font('Helvetica')
       .text('@founderdeepak  •  Threads Creator & Relationship Analyst', 0, PAGE_HEIGHT - 150, { align: 'center' });

    doc.fillColor(COLORS.softGold)
       .fontSize(10)
       .font('Helvetica-Oblique')
       .text('"Love dies from neglect long before it dies from conflict."', 40, PAGE_HEIGHT - 100, {
         align: 'center',
         width: PAGE_WIDTH - 80
       });

    // ==========================================
    // 2. INTERIOR PAGES
    // ==========================================
    doc.addPage();
    doc.fillColor(COLORS.textMain);

    // Helper to render running header
    function drawHeader() {
      doc.save();
      doc.fillColor(COLORS.goldDark)
         .fontSize(8)
         .font('Helvetica-Bold')
         .text(title.toUpperCase(), 54, 30, { characterSpacing: 0.8 });
      
      doc.moveTo(54, 42).lineTo(PAGE_WIDTH - 54, 42).lineWidth(0.5).stroke('#E5E7EB');
      doc.restore();
    }

    // Process tokens
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // Page break check
      if (doc.y > PAGE_HEIGHT - 90) {
        doc.addPage();
        drawHeader();
        doc.y = 58;
      }

      switch (token.type) {
        case 'h1':
        case 'h2':
          if (doc.y > PAGE_HEIGHT - 130) {
            doc.addPage();
            drawHeader();
            doc.y = 58;
          } else {
            doc.moveDown(0.8);
          }
          doc.fillColor('#111827')
             .fontSize(15)
             .font('Helvetica-Bold')
             .text(token.text, 54, doc.y, { lineGap: 3 });
          doc.moveDown(0.4);
          break;

        case 'h3':
          if (doc.y > PAGE_HEIGHT - 100) {
            doc.addPage();
            drawHeader();
            doc.y = 58;
          } else {
            doc.moveDown(0.5);
          }
          doc.fillColor('#374151')
             .fontSize(12)
             .font('Helvetica-Bold')
             .text(token.text, 54, doc.y);
          doc.moveDown(0.3);
          break;

        case 'quote':
          doc.moveDown(0.4);
          const quoteY = doc.y;
          doc.rect(54, quoteY, PAGE_WIDTH - 108, 0); // placeholder
          doc.fillColor('#4B5563')
             .fontSize(10)
             .font('Helvetica-Oblique')
             .text(token.text, 68, quoteY + 6, {
               width: PAGE_WIDTH - 136,
               lineGap: 3
             });
          const quoteHeight = doc.y - quoteY;
          doc.rect(54, quoteY, 3, quoteHeight).fill(COLORS.gold);
          doc.moveDown(0.5);
          break;

        case 'bullet':
          doc.fillColor('#374151')
             .fontSize(10.5)
             .font('Helvetica')
             .text(`•  ${token.text.replace(/\*\*/g, '')}`, 66, doc.y, {
               width: PAGE_WIDTH - 120,
               lineGap: 3
             });
          doc.moveDown(0.25);
          break;

        case 'number':
          doc.fillColor('#374151')
             .fontSize(10.5)
             .font('Helvetica')
             .text(token.text.replace(/\*\*/g, ''), 64, doc.y, {
               width: PAGE_WIDTH - 118,
               lineGap: 3
             });
          doc.moveDown(0.25);
          break;

        case 'divider':
          doc.moveDown(0.5);
          doc.moveTo(54, doc.y).lineTo(PAGE_WIDTH - 54, doc.y).lineWidth(0.5).stroke('#D1D5DB');
          doc.moveDown(0.5);
          break;

        case 'spacer':
          doc.moveDown(0.35);
          break;

        case 'p':
        default:
          doc.fillColor('#1F2937')
             .fontSize(10.5)
             .font('Helvetica')
             .text(token.text.replace(/\*\*/g, ''), 54, doc.y, {
               width: PAGE_WIDTH - 108,
               lineGap: 3.5,
               align: 'justify'
             });
          doc.moveDown(0.4);
          break;
      }
    }

    // ==========================================
    // 3. RUNNING FOOTERS & HEADERS
    // ==========================================
    const range = doc.bufferedPageRange();
    for (let p = 1; p < range.count; p++) {
      doc.switchToPage(p);

      // Running Header
      doc.save();
      doc.fillColor('#6B7280')
         .fontSize(8)
         .font('Helvetica-Bold')
         .text(title.toUpperCase(), 54, 28, { characterSpacing: 0.5 });
      doc.moveTo(54, 38).lineTo(PAGE_WIDTH - 54, 38).lineWidth(0.5).stroke('#E5E7EB');

      // Running Footer
      doc.moveTo(54, PAGE_HEIGHT - 48).lineTo(PAGE_WIDTH - 54, PAGE_HEIGHT - 48).lineWidth(0.5).stroke('#E5E7EB');

      // Author Signature Quote on Left
      doc.fillColor('#6B7280')
         .fontSize(7.5)
         .font('Helvetica-Oblique')
         .text('"Love dies from neglect long before it dies from conflict." — Deepak Ravi', 54, PAGE_HEIGHT - 38);

      // Page Number on Right
      doc.font('Helvetica')
         .fontSize(8)
         .text(`Page ${p} of ${range.count - 1}`, PAGE_WIDTH - 120, PAGE_HEIGHT - 38, { align: 'right', width: 66 });
      doc.restore();
    }

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', (err) => reject(err));
  });
}

async function run() {
  console.log('🚀 Starting Compilation of all Ebooks into Luxury PDFs...');

  const paidFiles = fs.readdirSync(path.join(__dirname, 'ebooks')).filter(f => f.endsWith('.md'));
  const freeFiles = fs.readdirSync(path.join(__dirname, 'free_ebooks')).filter(f => f.endsWith('.md'));

  console.log(`Found ${paidFiles.length} Paid Ebooks and ${freeFiles.length} Free Ebooks.`);

  // Compile Paid Ebooks
  for (let i = 0; i < paidFiles.length; i++) {
    const file = paidFiles[i];
    const src = path.join(__dirname, 'ebooks', file);
    const dest = path.join(PAID_OUT, file.replace(/\.md$/, '.pdf'));

    // Determine tier label
    let tier = 'Premium Edition';
    if (file.startsWith('27_') || file.startsWith('28_') || file.startsWith('29_') || file.startsWith('30_') || file.startsWith('31_') || file.startsWith('32_')) {
      tier = 'Quick-Action Field Guide • $5 Edition';
    } else if (file.startsWith('01_') || file.startsWith('02_') || file.startsWith('03_') || file.startsWith('04_') || file.startsWith('05_') || file.startsWith('06_') || file.startsWith('07_') || file.startsWith('08_') || file.startsWith('09_') || file.startsWith('10_')) {
      tier = 'Foundational Guide • $7 Edition';
    } else if (file.startsWith('11_') || file.startsWith('12_') || file.startsWith('13_') || file.startsWith('14_') || file.startsWith('15_')) {
      tier = 'Tactical Framework • $9 Edition';
    } else if (file.startsWith('16_') || file.startsWith('17_') || file.startsWith('18_') || file.startsWith('19_') || file.startsWith('20_')) {
      tier = 'In-Depth Deep-Dive • $14 Edition';
    } else if (file.startsWith('21_') || file.startsWith('22_') || file.startsWith('26_')) {
      tier = 'Master Bible • $19 Edition';
    } else if (file.startsWith('24_') || file.startsWith('25_')) {
      tier = 'Executive Blueprint • $24 Edition';
    } else if (file.startsWith('23_')) {
      tier = 'The Flagship Opus • $29 Edition';
    }

    process.stdout.write(`[${i + 1}/${paidFiles.length}] Compiling Paid: ${file}... `);
    await generatePDF(src, dest, tier);
    console.log('✅ Done');
  }

  // Compile Free Ebooks
  for (let i = 0; i < freeFiles.length; i++) {
    const file = freeFiles[i];
    const src = path.join(__dirname, 'free_ebooks', file);
    const dest = path.join(FREE_OUT, file.replace(/\.md$/, '.pdf'));

    process.stdout.write(`[${i + 1}/${freeFiles.length}] Compiling Free: ${file}... `);
    await generatePDF(src, dest, 'Complimentary Starter Guide • $0 Edition');
    console.log('✅ Done');
  }

  console.log('\n🎉 ALL 42 EBOOKS COMPILED INTO LUXURY PDFS WITH COVERS & SIGNATURE FOOTERS!');
  console.log(`Saved in: ${OUT_DIR}`);
}

run().catch(err => {
  console.error('Error during PDF build:', err);
});
