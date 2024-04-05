import { concatStrings } from '.';

test('Should concat two strings', () => {
  expect(concatStrings('Test', 'One')).toBe('TestOne');
});
