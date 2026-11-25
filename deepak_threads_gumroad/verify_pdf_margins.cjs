const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testMargins() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // HTML with @page margins and @page:first 0
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      @page {
        size: A4 portrait;
        margin-top: 24mm;
        margin-bottom: 24mm;
        margin-left: 20mm;
        margin-right: 20mm;
      }
      @page :first {
        margin: 0;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: sans-serif; font-size: 11pt; line-height: 1.6; }
      
      .cover {
        width: 100vw;
        height: 100vh;
        background: #000;
        color: #D4AF37;
        display: flex;
        align-items: center;
        justify-content: center;
        break-after: page;
        page-break-after: always;
      }
      
      .page-content {
        break-after: page;
        page-break-after: always;
      }
      
      .box {
        border: 2px solid #D4AF37;
        background: #FAFAFA;
        padding: 15px;
      }
    </style>
  </head>
  <body>
    <div class="cover">
      <h1>COVER IMAGE 100% EDGE TO EDGE</h1>
    </div>
    
    <div class="page-content">
      <div class="box">
        <h2>Page 2 - Title / TOC</h2>
        <p>This text must sit exactly inside the 24mm top margin and 20mm side margins.</p>
      </div>
    </div>
    
    <div class="page-content">
      <div class="box">
        <h2>Page 3 - Chapter 1</h2>
        <p>This page also has the exact same 24mm top margin and 24mm bottom margin!</p>
      </div>
    </div>
  </body>
  </html>`;

  await page.setContent(html);
  
  // Notice: margin in page.pdf is NOT set or set to 0 so CSS @page governs it!
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  const outPath = path.join(__dirname, 'test_page_margins.pdf');
  fs.writeFileSync(outPath, pdfBuffer);
  console.log('Written test_page_margins.pdf');
  await browser.close();
}

testMargins();
