// @ts-check
// BEGIN
beforeEach(async () => {
  await page.goto('http://0.0.0.0:8080');
});

test('see button Add', async () => {
  await expect(page).toMatchElement('input[value=Add]');
});

test('can add task and delete it', async () => {
  await expect(page).toFillForm('form', { text: 'тыц' });
  await page.click('[data-testid=add-task-button]');
  await expect(page).toMatch('тыц');

  await page.click('[data-testid=remove-task-1]');
  await expect(page).not.toMatch('тыц');
});
// END
