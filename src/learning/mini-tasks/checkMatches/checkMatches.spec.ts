import { checkMatches } from './checkMatches';

describe('Mini-tasks: Check if arrays have matching values', () => {
  it('Test #1', () => {
    const input1 = [1, 2, 3, 4, 5];
    const input2 = [4, 5, 6, 7, 8];

    expect(checkMatches(input1, input2)).toStrictEqual(true);
  });

  it('Test #2', () => {
    const input1 = [1, 2, 3, 4, 5];
    const input2 = [7, 8, 9, 10, 11];

    expect(checkMatches(input1, input2)).toStrictEqual(false);
  });

  it('Test #3', () => {
    const input1 = [0, 1, 2, 3, 4, 5, 6];
    const input2 = [7, 8, 9, 10, null];

    expect(checkMatches(input1, input2)).toStrictEqual(false);
  });

  it('Test #4', () => {
    const input1 = [];
    const input2 = [];

    expect(checkMatches(input1, input2)).toStrictEqual(false);
  });
});
