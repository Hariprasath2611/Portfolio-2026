import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  const imgDetails = await page.evaluate(() => {
    const img = document.querySelector('img[alt="D Hariprasath"]');
    if (!img) return null;
    const r = img.getBoundingClientRect();
    const parent = img.parentElement;
    const frame = parent.parentElement;
    const frameR = frame.getBoundingClientRect();
    const computed = window.getComputedStyle(img);
    const picComputed = window.getComputedStyle(parent);
    return {
      frame: { width: frameR.width, height: frameR.height },
      img: { width: r.width, height: r.height, top: r.top, left: r.left },
      imgHeightStyle: computed.height,
      imgObjectFit: computed.objectFit,
      picDisplay: picComputed.display,
      picHeight: picComputed.height,
      src: img.currentSrc
    };
  });
  console.log('Result:', JSON.stringify(imgDetails, null, 2));

  const arch = await page.$('div.relative.z-10.rounded-t-\\[120px\\]');
  if (arch) {
    await arch.screenshot({ path: 'arch_debug.png' });
    console.log('Screenshot saved to arch_debug.png');
  }

  await page.setViewport({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle0' });
  const archMobile = await page.$('div.relative.z-10.rounded-t-\\[120px\\]');
  if (archMobile) {
    await archMobile.screenshot({ path: 'arch_mobile_debug.png' });
    console.log('Mobile screenshot saved to arch_mobile_debug.png');
  }

  await browser.close();
}
test().catch(console.error);
