const puppeteer = require('C:/Users/b1285/AppData/Roaming/npm/node_modules/puppeteer');
const path = require('path');
const { pathToFileURL } = require('url');

const HTML = pathToFileURL(path.resolve(__dirname, 'index.html')).href;
const OUT = 'C:/Users/b1285/.ductor/agents/claude5/workspace/output_to_user';

const sections = [
  { name: 'letter', selector: 'section.letter' },
  { name: 'snapshot', selector: 'section.snapshot' },
  { name: 'products', selector: 'section.products' },
  { name: 'masterbook', selector: 'section.masterbook' },
  { name: 'nurture', selector: 'section.nurture' },
  { name: 'pact', selector: 'section.pact' },
  { name: 'questions', selector: 'section.questions' },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // iPhone 12/13/14 寬 = 390 CSS px，這裡用 deviceScaleFactor 1.0 截實際 CSS 寬
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1.0, isMobile: true, hasTouch: true });
  await page.goto(HTML, { waitUntil: 'networkidle0' });

  for (const { name, selector } of sections) {
    const el = await page.$(selector);
    if (!el) { console.log(`MISSING ${selector}`); continue; }
    await el.scrollIntoView();
    await new Promise(r => setTimeout(r, 300));
    await el.screenshot({ path: `${OUT}/proposal-v8-mobile-${name}.png` });
    console.log(`OK proposal-v8-mobile-${name}.png`);
  }

  await browser.close();
})();
