const faker = require('faker');

// BEGIN
test('complex data', () => {
  const transaction = faker.helpers.createTransaction();
  expect(transaction).toMatchObject({
    amount: expect.any(String),
    date: expect.any(Date),
    business: expect.any(String),
    name: expect.any(String),
    type: expect.any(String),
    account: expect.any(String),
  });
});

test('uniq', () => {
  const transaction1 = faker.helpers.createTransaction();
  const transaction2 = faker.helpers.createTransaction();

  expect(transaction1).not.toMatchObject(transaction2);
  expect(transaction1).not.toBe(transaction2);
});
// END
