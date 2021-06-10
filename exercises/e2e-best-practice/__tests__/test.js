// @ts-check
// BEGIN
beforeEach(async () => {
  await page.goto('http://0.0.0.0:8080');
});

test('see main page', async () => {
  await expect(page).toMatchElement('[data-testid="task-name-input"]');
  await expect(page).toMatchElement('[data-testid="add-task-button"]');
});

test('can add task and delete it', async () => {
  const text1 = 'text1';
  const text2 = 'text2';
  await expect(page).toFillForm('form', { text: text1 });
  await page.click('[data-testid=add-task-button]');
  await expect(page).toFillForm('form', { text: text2 });
  await page.click('[data-testid=add-task-button]');
  await expect(page).toMatch(text1);
  await expect(page).toMatch(text2);

  await page.click('[data-testid=remove-task-1]');
  await expect(page).toMatch(text2);
  await expect(page).not.toMatch(text1);
});
// END
