const fc = require('fast-check');

const sort = (data) => data.slice().sort((a, b) => a - b);

// BEGIN
test('test sort', () => {
  fc.assert(
    fc.property(
      fc.int8Array(),
      (arr) => {
        expect(sort(arr)).toBeSorted()
      }
    )
  );
});
// END
