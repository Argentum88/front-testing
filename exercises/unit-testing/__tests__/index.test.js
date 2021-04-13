test('main', () => {
  const src = { k: 'v', b: 'b' };
  const target = { k: 'v2', a: 'a' };
  const result = Object.assign(target, src);

  // BEGIN
  expect(result).toEqual({k: 'v', a: 'a', b: 'b'})
  // END
});
