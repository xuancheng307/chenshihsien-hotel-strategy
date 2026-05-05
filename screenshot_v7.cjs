const puppeteer = require('C:/Users/b1285/AppData/Roaming/npm/node_modules/puppeteer');
const path = require('path');
const { pathToFileURL } = require('url');

const HTML = pathToFileURL(path.resolve(__dirname, 'index.html')).href;
const OUT = 'C:/Users/b1285/.ductor/agents/claude5/workspace/output_to_user';

const sections = [
  { name: 'assumptions', selector: 'section.assumptions' },
  { name: 'nurture', selector: 'section.nurture' },
  { name: 'brake', selector: 'section.brake' },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.0 });
  await page.goto(HTML, { waitUntil: 'networkidle0' });

  for (const { name, selector } of sections) {
    const el = await page.$(selector);
    if (!el) { console.log(`MISSING ${selector}`); continue; }
    await el.scrollIntoView();
    await new Promise(r => setTimeout(r, 300));
    await el.screenshot({ path: `${OUT}/proposal-v8-${name}.png` });
    console.log(`OK proposal-v8-${name}.png`);
  }

  await browser.close();
})();
