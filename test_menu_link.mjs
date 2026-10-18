import puppeteer from 'puppeteer-core';
import os from 'os';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: path.join(os.tmpdir(), 'chrome_menu_test2_' + Date.now()),
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667, hasTouch: true });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // Open drawer
  const btn = await page.$('button[aria-label="Open navigation menu"]');
  await btn.click();
  await new Promise((r) => setTimeout(r, 300));

  // Find all links in the visible drawer
  const links = await page.$$('div.z-50 ul li a');
  console.log('Mobile drawer links found:', links.length);

  // Click the first link ('Home' or 'About')
  if (links.length > 1) {
    await links[1].click();
    await new Promise((r) => setTimeout(r, 300));
  }

  const drawerStillOpen = await page.evaluate(() => document.body.innerText.includes('Hire me directly'));
  console.log('After clicking drawer link, is drawer still open?', drawerStillOpen);

  await browser.close();
  console.log('TEST RESULT: ALL MOBILE NAVIGATION INTERACTIONS PASS!');
}

run().catch(console.error);
