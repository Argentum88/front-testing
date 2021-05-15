const puppeteer = require('puppeteer');
const getApp = require('../server/index.js');

const port = 5001;
const appUrl = `http://localhost:${port}`;

let browser;
let page;

const app = getApp();

describe('it works', () => {
  beforeAll(async () => {
    await app.listen(port, '0.0.0.0');
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
      // slowMo: 250
    });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
    });
  });
  // BEGIN
  
  // END
  afterAll(async () => {
    await browser.close();
    await app.close();
  });
});
