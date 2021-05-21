const fs = require('fs');
const path = require('path');
const { upVersion } = require('../src/index.js');

// BEGIN
const pathToFile = path.join(__dirname, '..', '__fixtures__', 'package.json');
afterEach(() => {
  fs.writeFileSync(pathToFile, '{"version":"1.3.2"}');
});

test.each([
  ['default', undefined, { version: '1.3.3' }],
  ['patch', 'patch', { version: '1.3.3' }],
  ['minor', 'minor', { version: '1.4.0' }],
  ['major', 'major', { version: '2.0.0' }],
])('%s', (name, to, expected) => {
  upVersion(pathToFile, to);
  const data = fs.readFileSync(pathToFile, 'utf-8');

  expect(JSON.parse(data)).toEqual(expected);
});
// END
