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
  test('main', async () => {
    await page.goto(appUrl);
    expect(await page.$('#title')).toBeTruthy();

    await page.click('a.nav-link');
    expect(await page.$eval('h3', (el) => el.textContent)).toEqual('Articles');

    await page.click('.container.mt-3 > a');
    expect(await page.$eval('h3', (el) => el.textContent)).toEqual('Create article');

    // let a = await page.content();
    await page.type('#name', 'new post');
    await page.type('#content', 'super post');
    // let b = await page.content();

    await page.click('[type="submit"]');

    // let c = await page.content();
    /* expect(await page.$$eval(
      'tbody > tr > td',
      (els) => els.find((el) => el.textContent === 'new post'))
    ).toBeTruthy(); */
  });
  // END
  afterAll(async () => {
    await browser.close();
    await app.close();
  });
});
