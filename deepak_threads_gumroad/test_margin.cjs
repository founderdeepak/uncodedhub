const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @page {
        size: A4;
        margin: 25mm 22mm 25mm 22mm;
      }
      @page :first {
        margin: 0;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: sans-serif; font-size: 11pt; }
      .cover {
        width: 100vw;
        height: 100vh;
        background: #111;
        color: gold;
        display: flex;
        align-items: center;
        justify-content: center;
        page-break-after: always;
        break-after: page;
      }
      .content { line-height: 1.6; }
      .box { border: 2px solid red; padding: 10px; margin-bottom: 20px; }
    </style>
  </head>
  <body>
    <div class="cover"><h1>COVER PAGE FULL BLEED</h1></div>
    <div class="content">
      <div class="box"><h1>Page 2 (Inside 25mm top margin)</h1><p>Notice the top margin is 25mm!</p></div>
      <div style="page-break-after: always; break-after: page;"></div>
      <div class="box"><h1>Page 3 (Inside 25mm top margin)</h1><p>Every subsequent page has exact 25mm top and bottom margins!</p></div>
    </div>
  </body>
  </html>
  `;
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  fs.writeFileSync(path.join(__dirname, 'test_out.pdf'), pdfBuffer);
  console.log('PDF rendered successfully, size:', pdfBuffer.length);
  await browser.close();
}
test();
