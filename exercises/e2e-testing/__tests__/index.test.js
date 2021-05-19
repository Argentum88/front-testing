// BEGIN
const selectors = require('../selectors');

const appUrl = 'http://localhost:5000';

test('main page', async () => {
  await page.goto(appUrl);
  expect(await page.$(selectors['articles-index-link'])).toBeTruthy();
});

test('index page', async () => {
  await page.goto(`${appUrl}/articles`);
  expect(await page.$(selectors['article-row'])).toBeTruthy();
});

test('new page', async () => {
  await page.goto(`${appUrl}/articles/new`);
  await page.type('#name', 'new post');
  await page.select('select', '1');
  await page.type('#content', 'super post');
  await page.click(selectors['article-create-button']);
  await page.waitForSelector(selectors['article-row']);
  const articleFields = await page.$$eval(
    selectors['article-field'],
    (fields) => fields.map((el) => el.textContent),
  );
  expect(articleFields).toContain('new post');
});

test('edit page', async () => {
  await page.goto(`${appUrl}/articles/4/edit`);
  const input = await page.$('#name');
  await input.click({ clickCount: 3 });
  await input.type('edited');
  await page.click(selectors['article-update-button']);
  await page.waitForSelector(selectors['article-row']);
  const articleFields = await page.$$eval(
    selectors['article-field'],
    (fields) => fields.map((el) => el.textContent),
  );
  expect(articleFields).toContain('edited');
});
// END
