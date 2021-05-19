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
    await page.waitForSelector('h3');
    expect(await page.$eval('h3', (el) => el.textContent)).toEqual('Articles');

    await page.click('.container.mt-3 > a');
    await page.waitForSelector('form');
    expect(await page.$eval('h3', (el) => el.textContent)).toEqual('Create article');

    await page.type('#name', 'new post');
    await page.select('select', '1');
    await page.type('#content', 'super post');
    await page.click('[type="submit"]');
    await page.waitForSelector('tbody');
    let tds = await page.$$eval('tbody > tr > td', (els) => els.map((el) => el.textContent));
    expect(tds).toContain('new post');

    await page.click('td > a');
    await page.waitForSelector('form');
    const input = await page.$('#name');
    await input.click({ clickCount: 3 });
    await input.type('edited');
    await page.click('[type="submit"]');
    await page.waitForSelector('tbody');
    tds = await page.$$eval('tbody > tr > td', (els) => els.map((el) => el.textContent));
    expect(tds).toContain('edited');
  });
  // END
  afterAll(async () => {
    await browser.close();
    await app.close();
  });
});
