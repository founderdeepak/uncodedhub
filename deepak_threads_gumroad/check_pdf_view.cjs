const { chromium } = require('playwright');
const path = require('path');

async function testPdfView() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('deepak_threads_gumroad/test_page_margins.pdf').replace(/\\/g, '/');
  
  await page.goto(filePath);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'deepak_threads_gumroad/pdf_page1.png', fullPage: true });
  console.log('Screenshot taken!');
  await browser.close();
}

testPdfView().catch(e => console.error(e));
