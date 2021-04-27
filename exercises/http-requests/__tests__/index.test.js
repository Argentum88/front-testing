const nock = require('nock');
const axios = require('axios');
const { get, post } = require('../src/index.js');

axios.defaults.adapter = require('axios/lib/adapters/http');

// BEGIN
const user = {
  firstname: 'Fedor',
  lastname: 'Sumkin',
  age: 33,
};

test('get', async () => {
  nock('https://example.com').get('/users').reply(200, user);
  expect(await get('https://example.com/users')).toEqual(user);
});

test('post', async () => {
  nock('https://example.com').post('/users', user).reply(201);
  await post('https://example.com/users', user);
  expect(nock.isDone()).toBeTruthy();
});
// END
