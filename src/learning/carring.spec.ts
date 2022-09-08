import { carrying } from './carring';

describe('Feature: Carrying', () => {
  it('Test #1', () => {
    const f = (x, y) => x + y;
    const cF = carrying(f);
    const result = cF(3)(7);
    const expected = 10;

    expect(result).toEqual(expected);
  });

  it('Test #2', () => {
    const f = (x, y, z) => x * y * z;
    const cF = carrying(f);
    const result = cF(1, 5)(2);
    const expected = 10;

    expect(result).toEqual(expected);
  });

  it('Test #3', () => {
    const f = (x, y) => x / y;
    const cF = carrying(f);
    const result = cF(16)(8, 1);
    const expected = 2;

    expect(result).toEqual(expected);
  });
});
