import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function convertImage(inputPath, outputPath, quality = 0.88) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    userDataDir: path.join(os.tmpdir(), 'chrome_webp_' + Date.now()),
    args: ['--no-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  const fileData = fs.readFileSync(inputPath);
  const dataUri = `data:image/png;base64,${fileData.toString('base64')}`;

  const base64Webp = await page.evaluate(async (uri, q) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/webp', q);
        resolve(dataUrl.split(',')[1]);
      };
      img.onerror = (e) => reject(new Error('Image failed to load: ' + e));
      img.src = uri;
    });
  }, dataUri, quality);

  fs.writeFileSync(outputPath, Buffer.from(base64Webp, 'base64'));
  const oldSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
  const newSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`Converted ${path.basename(inputPath)} (${oldSize} KB) -> ${path.basename(outputPath)} (${newSize} KB)`);

  await browser.close();
}

async function run() {
  await convertImage('public/Photo one.png', 'public/Photo one.webp', 0.88);
  await convertImage('public/HP.png', 'public/HP.webp', 0.88);
  console.log('Conversion completed successfully!');
}

run().catch(console.error);
