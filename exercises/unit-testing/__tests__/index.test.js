test('main', () => {
  const src = { k: 'v', b: 'b' };
  const target = { k: 'v2', a: 'a' };
  const result = Object.assign(target, src);

  // BEGIN
  expect(result).toEqual({ k: 'v', a: 'a', b: 'b' });
  // END
});

test('that Object.assign return ref to target', () => {
  const src = { c: 'c', d: 'd' };
  const target = { a: 'a', b: 'b' };
  const result = Object.assign(target, src);

  expect(result).toBe(target);
});

test('throw error when Object.assign overwrite readonly prop', () => {
  const src = { a: 'a2', b: 'b2' };
  const target = { a: 'a' };

  Object.defineProperty(target, 'b', {
    value: 'b',
    writable: false,
  });

  expect(() => Object.assign(target, src)).toThrow();
});
