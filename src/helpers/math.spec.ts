import { calcAverage } from './math';

describe('Helpers: Math', () => {
  describe('calcAverage', () => {
    it('Test #1: basic', () => {
      const input = [1, 2, 3];

      expect(calcAverage(input)).toStrictEqual(2);
    });

    it('Test #2: with negative numbers', () => {
      const input = [-4, -1, 0, 1];

      expect(calcAverage(input)).toStrictEqual(-1);
    });

    it('Test #3: with strings', () => {
      const input = ['-4', '-1', 0, 1];

      expect(calcAverage(input)).toStrictEqual(-1);
    });

    it('Test #3: with float numbers', () => {
      const input = [1, 1.5, 2];

      expect(calcAverage(input)).toStrictEqual(1.5);
    });

    it('Test #4: with negative float numbers', () => {
      const input = [-1, -1.5, -2];

      expect(calcAverage(input)).toStrictEqual(-1.5);
    });

    it('Test #5: with negative float numbers as strings', () => {
      const input = [-1, '-1.5', '-2.0'];

      expect(calcAverage(input)).toStrictEqual(-1.5);
    });
  });
});
