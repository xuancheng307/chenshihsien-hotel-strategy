const puppeteer = require('C:/Users/b1285/AppData/Roaming/npm/node_modules/puppeteer');
const path = require('path');
const { pathToFileURL } = require('url');

const HTML = pathToFileURL(path.resolve(__dirname, 'index.html')).href;
const OUT = 'C:/Users/b1285/.ductor/agents/claude5/workspace/output_to_user/proposal-v8.pdf';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.0 });
  await page.goto(HTML, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', right: '10mm', bottom: '12mm', left: '10mm' },
  });
  await browser.close();
  console.log(`OK ${OUT}`);
})();
