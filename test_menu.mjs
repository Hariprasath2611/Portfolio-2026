import puppeteer from 'puppeteer-core';
import os from 'os';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: path.join(os.tmpdir(), 'chrome_menu_test_' + Date.now()),
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667, hasTouch: true });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });

  // 1. Check initial state
  const initialText = await page.evaluate(() => document.body.innerText.includes('Hire me directly'));
  console.log('1. Initial drawer open?', initialText);

  // 2. Click Hamburger
  const btn = await page.$('button[aria-label="Open navigation menu"]');
  console.log('2. Hamburger button found?', !!btn);
  if (btn) {
    await btn.click();
    await new Promise((r) => setTimeout(r, 400));
  }

  const openedText = await page.evaluate(() => document.body.innerText.includes('Hire me directly'));
  console.log('3. After click, drawer open?', openedText);

  // 3. Press Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  const afterEscapeText = await page.evaluate(() => document.body.innerText.includes('Hire me directly'));
  console.log('4. After Escape key, drawer open?', afterEscapeText);

  // 4. Click Hamburger again and click a link
  const btn2 = await page.$('button[aria-label="Open navigation menu"]');
  if (btn2) {
    await btn2.click();
    await new Promise((r) => setTimeout(r, 400));
  }
  const openedAgain = await page.evaluate(() => document.body.innerText.includes('Hire me directly'));
  console.log('5. Reopened drawer?', openedAgain);

  // Click Skills link
  const link = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('a')).find((a) => a.innerText.trim() === 'Skills');
  });
  if (link) {
    await link.click();
    await new Promise((r) => setTimeout(r, 400));
  }
  const afterLinkClick = await page.evaluate(() => document.body.innerText.includes('Hire me directly'));
  console.log('6. After link click, drawer open?', afterLinkClick);

  await browser.close();
}

run().catch(console.error);
