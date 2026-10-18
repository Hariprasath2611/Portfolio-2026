import puppeteer from 'puppeteer-core';
import os from 'os';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const viewports = [
  { name: 'Small Android / 320px', width: 320, height: 640, isLandscape: false },
  { name: 'Standard Android / 360px', width: 360, height: 740, isLandscape: false },
  { name: 'iPhone SE / 375px', width: 375, height: 667, isLandscape: false },
  { name: 'iPhone 12/13/14 / 390px', width: 390, height: 844, isLandscape: false },
  { name: 'Android Large / 412px', width: 412, height: 915, isLandscape: false },
  { name: 'iPhone Pro Max / 430px', width: 430, height: 932, isLandscape: false },
  { name: 'Small Tablet / 600px', width: 600, height: 960, isLandscape: false },
  { name: 'iPad Portrait / 768px', width: 768, height: 1024, isLandscape: false },
  { name: 'iPad Landscape / 1024px', width: 1024, height: 768, isLandscape: true },
  { name: 'Desktop Large / 1440px', width: 1440, height: 900, isLandscape: true },
  { name: 'iPhone Landscape (375h)', width: 667, height: 375, isLandscape: true },
  { name: 'iPhone 14 Landscape (390h)', width: 844, height: 390, isLandscape: true },
  { name: 'Android Landscape (412h)', width: 915, height: 412, isLandscape: true },
];

async function run() {
  const tmpDir = path.join(os.tmpdir(), 'chrome_test_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: tmpDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'],
  });

  const page = await browser.newPage();
  const results = [];

  for (const vp of viewports) {
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isLandscape: vp.isLandscape,
      hasTouch: vp.width < 1024,
    });

    await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 200));

    const metrics = await page.evaluate(() => {
      const docScrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      const innerWidth = window.innerWidth;
      const hasHorizontalScroll = docScrollWidth > innerWidth || bodyScrollWidth > innerWidth;

      return {
        docScrollWidth,
        bodyScrollWidth,
        innerWidth,
        hasHorizontalScroll,
      };
    });

    let menuPass = 'N/A (Desktop)';
    if (vp.width < 1024) {
      try {
        const hamburger = await page.$('button[aria-label*="navigation menu"]');
        if (hamburger) {
          await hamburger.click();
          await new Promise((r) => setTimeout(r, 150));
          const drawerOpen = await page.evaluate(() => {
            return !!document.querySelector('div[aria-hidden="true"]');
          });
          await page.keyboard.press('Escape');
          await new Promise((r) => setTimeout(r, 150));
          const drawerClosed = await page.evaluate(() => {
            return !document.querySelector('div[aria-hidden="true"]');
          });
          menuPass = drawerOpen && drawerClosed ? 'PASS' : 'FAIL';
        } else {
          menuPass = 'FAIL (Button missing)';
        }
      } catch (e) {
        menuPass = `ERROR: ${e.message}`;
      }
    }

    results.push({
      viewport: `${vp.width}x${vp.height}`,
      device: vp.name,
      horizontalScroll: metrics.hasHorizontalScroll ? 'FAIL (Overflow)' : 'PASS (No scroll)',
      docWidth: metrics.docScrollWidth,
      windowWidth: metrics.innerWidth,
      menu: menuPass,
    });
  }

  // Also test /resume page
  const resumeWidths = [320, 360, 375, 390, 412, 430, 600, 768, 1024, 1440];
  const resumeResults = [];
  for (const w of resumeWidths) {
    await page.setViewport({ width: w, height: 800 });
    await page.goto('http://localhost:5174/resume', { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 200));

    const resMetrics = await page.evaluate(() => {
      const docScrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      return {
        docScrollWidth,
        innerWidth,
        hasHorizontalScroll: docScrollWidth > innerWidth,
      };
    });

    resumeResults.push({
      page: '/resume',
      width: `${w}px`,
      horizontalScroll: resMetrics.hasHorizontalScroll ? 'FAIL (Overflow)' : 'PASS (No scroll)',
      docWidth: resMetrics.docScrollWidth,
      windowWidth: resMetrics.innerWidth,
    });
  }

  console.log('--- HOMEPAGE TEST MATRIX ---');
  console.table(results);
  console.log('--- RESUME PAGE TEST MATRIX ---');
  console.table(resumeResults);

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
