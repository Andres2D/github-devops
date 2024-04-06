import { concatStrings } from '.';

test('Should concat two strings', () => {
  expect(concatStrings('Test', 'One')).toBe('✅ TestOne');
});

test('Should concat two strings with separator', () => {
  expect(concatStrings('Test', 'Two', '-')).toBe('✅ Test-Two');
});
