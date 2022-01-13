import {
  flatten,
  moveItemToEnd,
  moveItemToStart,
  sortASC,
  sortByLengthASC,
  sortByLengthDESC,
  sortDESC,
} from './array';

describe('Helpers: Array', () => {
  describe('Simple sort by value', () => {
    describe('sortASC', () => {
      it('Array of numbers', () => {
        const input: number[] = [0, 2, 4, 3, 1];
        const expected: number[] = [0, 1, 2, 3, 4];

        expect<number[]>(input.sort(sortASC)).toEqual(expected);
      });

      it('Array of strings', () => {
        const input: string[] = ['0', '2', '4', '3', '1', '10'];
        const expected: string[] = ['0', '1', '10', '2', '3', '4'];

        expect<string[]>(input.sort(sortASC)).toEqual(expected);
      });
    });

    describe('sortDESC', () => {
      it('Array of numbers', () => {
        const input: number[] = [0, 2, 4, 3, 1];
        const expected: number[] = [4, 3, 2, 1, 0];

        expect<number[]>(input.sort(sortDESC)).toEqual(expected);
      });

      it('Array of strings', () => {
        const input: string[] = ['0', '2', '4', '3', '1', '10'];
        const expected: string[] = ['4', '3', '2', '10', '1', '0'];

        expect<string[]>(input.sort(sortDESC)).toEqual(expected);
      });
    });
  });

  describe('Sort by length', () => {
    describe('Sort by length ASC', () => {
      const arr: string[] = ['a', 'aaa', 'aa'];
      const result = arr.sort(sortByLengthASC);

      expect(result).toEqual(['a', 'aa', 'aaa']);
    });

    describe('Sort by length DESC', () => {
      const arr: string[] = ['a', 'aaa', 'aa'];
      const result = arr.sort(sortByLengthDESC);

      expect(result).toEqual(['aaa', 'aa', 'a']);
    });
  });

  it('flatten', () => {
    const result = flatten([
      [
        [1, 2, 3],
        [3, 4, 5],
      ],
      [12, 13],
    ]);
    const expected = [1, 2, 3, 3, 4, 5, 12, 13];

    expect(result).toEqual(expected);
  });

  it('moveItemToStart', () => {
    interface Item {
      isTarget: boolean;
      id: number;
    }
    const initialArray: Item[] = [
      { id: 1, isTarget: false },
      { id: 2, isTarget: false },
      { id: 3, isTarget: true },
      { id: 4, isTarget: false },
    ];
    const initialArrayClone = [...initialArray];

    const result = moveItemToStart<Item>(
      initialArray,
      ({ isTarget }) => isTarget,
    );

    expect(initialArray).toEqual(initialArrayClone); // Must not mutate
    expect(result[0]).toEqual({ id: 3, isTarget: true });
  });

  it('moveItemToEnd', () => {
    interface Item {
      isTarget: boolean;
      id: number;
    }
    const initialArray: Item[] = [
      { id: 1, isTarget: false },
      { id: 2, isTarget: false },
      { id: 3, isTarget: true },
      { id: 4, isTarget: false },
    ];
    const initialArrayClone = [...initialArray];

    const result = moveItemToEnd<Item>(
      initialArray,
      ({ isTarget }) => isTarget,
    );

    expect(initialArray).toEqual(initialArrayClone); // Must not mutate
    expect(result[result.length - 1]).toEqual({ id: 3, isTarget: true });
  });
});
