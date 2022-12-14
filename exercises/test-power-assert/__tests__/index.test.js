const assert = require('power-assert');
const { flattenDepth } = require('lodash');

// BEGIN
const array = [1, [2, [3, [4]], 5]];

assert.deepEqual(flattenDepth(array, 1), [1, 2, [3, [4]], 5]);
assert.deepEqual(flattenDepth(array, 2), [1, 2, 3, [4], 5]);
assert.deepEqual(flattenDepth(array, 3), [1, 2, 3, 4, 5]);
assert.deepEqual(flattenDepth(array, 4), [1, 2, 3, 4, 5]);
// END
