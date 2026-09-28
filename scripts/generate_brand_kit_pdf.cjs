const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function convertHtmlToPdf() {
  const basePath = path.join(__dirname, '..', 'CANVA_Business');
  const htmlPath = path.join(basePath, 'Uncoded_Hub_Brand_Kit_Master.html');
  const pdfPath = path.join(basePath, 'Uncoded_Hub_Brand_Kit_Master.pdf');

  console.log(`Loading HTML from: ${htmlPath}`);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load the HTML file directly using file:// protocol
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait a moment for webfonts to load
  await page.waitForTimeout(1000);

  console.log(`Generating PDF to: ${pdfPath}`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  await browser.close();
  console.log(`Successfully generated Master Brand Kit PDF at: ${pdfPath}`);
}

convertHtmlToPdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
