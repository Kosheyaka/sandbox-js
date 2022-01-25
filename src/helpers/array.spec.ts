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

  describe('flatten', () => {
    it('Should make flat array from array of 2 levels', () => {
      const result = flatten([
        [
          [1, 2, 3],
          [4, 5, 6],
        ],
        [7, 8],
      ]);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8];

      expect(result).toEqual(expected);
    });
    it('Should make flat array from array of 2+ levels', () => {
      const result = flatten([
        [
          [1, 2],
          [3, [4, 5]],
        ],
        [12, 13],
      ]);
      const expected = [1, 2, 3, 4, 5, 12, 13];

      expect(result).toEqual(expected);
    });
    it('Should not mutate input', () => {
      const input = [
        [
          [1, 2],
          [3, [4, 5]],
        ],
        [12, 13],
      ];
      const clone = [...input];
      flatten([
        [
          [1, 2],
          [3, [4, 5]],
        ],
        [12, 13],
      ]);

      expect(input).toEqual(clone);
    });
  });

  describe('moveItemToStart', () => {
    interface Item {
      isTarget: boolean;
      id: number;
    }

    it('Item found and moved to index 0, input not mutated', () => {
      const initialArray: Item[] = [
        { id: 0, isTarget: false },
        { id: 1, isTarget: false },
        { id: 2, isTarget: false },
        { id: 3, isTarget: true },
        { id: 4, isTarget: false },
        { id: 5, isTarget: false },
      ];
      const initialArrayClone = [...initialArray];

      const result = moveItemToStart<Item>(
        initialArray,
        ({ isTarget }) => isTarget,
      );

      expect(initialArray).toEqual(initialArrayClone);
      expect(result[0]).toEqual({ id: 3, isTarget: true });
    });
    it('Item not found, result equals original, input not mutated', () => {
      const initialArray: Item[] = [
        { id: 5, isTarget: false },
        { id: 4, isTarget: false },
        { id: 3, isTarget: false },
        { id: 2, isTarget: false },
        { id: 1, isTarget: false },
        { id: 0, isTarget: false },
      ];
      const initialArrayClone = [...initialArray];

      const result = moveItemToStart<Item>(
        initialArray,
        ({ isTarget }) => isTarget,
      );

      expect(initialArray).toEqual(initialArrayClone);
      expect(result[0]).toEqual({ id: 5, isTarget: false });
    });
    it('Few item found, first of them moved to start, input not mutated', () => {
      const initialArray: Item[] = [
        { id: 0, isTarget: false },
        { id: 1, isTarget: true },
        { id: 2, isTarget: true },
        { id: 3, isTarget: false },
        { id: 4, isTarget: false },
        { id: 5, isTarget: false },
      ];
      const initialArrayClone = [...initialArray];

      const result = moveItemToStart<Item>(
        initialArray,
        ({ isTarget }) => isTarget,
        true,
      );

      expect(initialArray).toEqual(initialArrayClone);
      expect(result[0]).toEqual({ id: 1, isTarget: true });
      expect(result[2]).toEqual({ id: 2, isTarget: true });
    });

    describe('Item found at start and end', () => {
      it('searchFromStart = true, means last item should stay', () => {
        const initialArray: Item[] = [
          { id: 0, isTarget: true },
          { id: 1, isTarget: false },
          { id: 2, isTarget: false },
          { id: 3, isTarget: false },
          { id: 4, isTarget: false },
          { id: 5, isTarget: true },
        ];
        const initialArrayClone = [...initialArray];

        const result = moveItemToStart<Item>(
          initialArray,
          ({ isTarget }) => isTarget,
          true,
        );

        expect(initialArray).toEqual(initialArrayClone);
        expect(result[0]).toEqual({ id: 0, isTarget: true });
        expect(result[result.length - 1]).toEqual({ id: 5, isTarget: true });
      });
      it('searchFromStart = false, means last item should move', () => {
        const initialArray: Item[] = [
          { id: 0, isTarget: true },
          { id: 1, isTarget: false },
          { id: 2, isTarget: false },
          { id: 3, isTarget: false },
          { id: 4, isTarget: false },
          { id: 5, isTarget: true },
        ];
        const initialArrayClone = [...initialArray];

        const result = moveItemToStart<Item>(
          initialArray,
          ({ isTarget }) => isTarget,
          false,
        );

        expect(initialArray).toEqual(initialArrayClone);
        expect(result[0]).toEqual({ id: 5, isTarget: true });
        expect(result[1]).toEqual({ id: 0, isTarget: true });
      });
    });
  });

  describe('moveItemToEnd', () => {
    interface Item {
      isTarget: boolean;
      id: number;
    }

    it('Item found and moved to index 0, input not mutated', () => {
      const initialArray: Item[] = [
        { id: 0, isTarget: false },
        { id: 1, isTarget: false },
        { id: 2, isTarget: false },
        { id: 3, isTarget: true },
        { id: 4, isTarget: false },
        { id: 5, isTarget: false },
      ];
      const initialArrayClone = [...initialArray];

      const result = moveItemToEnd<Item>(
        initialArray,
        ({ isTarget }) => isTarget,
      );

      expect(initialArray).toEqual(initialArrayClone);
      expect(result[result.length - 1]).toEqual({ id: 3, isTarget: true });
    });
    it('Item not found, result equals original, input not mutated', () => {
      const initialArray: Item[] = [
        { id: 5, isTarget: false },
        { id: 4, isTarget: false },
        { id: 3, isTarget: false },
        { id: 2, isTarget: false },
        { id: 1, isTarget: false },
        { id: 0, isTarget: false },
      ];
      const initialArrayClone = [...initialArray];

      const result = moveItemToEnd<Item>(
        initialArray,
        ({ isTarget }) => isTarget,
      );

      expect(initialArray).toEqual(initialArrayClone);
      expect(result[0]).toEqual({ id: 5, isTarget: false });
    });
    it('Few item found, first of them moved to start, input not mutated', () => {
      const initialArray: Item[] = [
        { id: 0, isTarget: false },
        { id: 1, isTarget: true },
        { id: 2, isTarget: true },
        { id: 3, isTarget: false },
        { id: 4, isTarget: false },
        { id: 5, isTarget: false },
      ];
      const initialArrayClone = [...initialArray];

      const result = moveItemToEnd<Item>(
        initialArray,
        ({ isTarget }) => isTarget,
        true,
      );

      expect(initialArray).toEqual(initialArrayClone);
      expect(result[result.length - 1]).toEqual({ id: 1, isTarget: true });
      expect(result[1]).toEqual({ id: 2, isTarget: true });
    });

    describe('Item found at start and end', () => {
      it('searchFromStart = true, means last item should move', () => {
        const initialArray: Item[] = [
          { id: 0, isTarget: true },
          { id: 1, isTarget: false },
          { id: 2, isTarget: false },
          { id: 3, isTarget: false },
          { id: 4, isTarget: false },
          { id: 5, isTarget: true },
        ];
        const initialArrayClone = [...initialArray];

        const result = moveItemToEnd<Item>(
          initialArray,
          ({ isTarget }) => isTarget,
          true,
        );

        expect(initialArray).toEqual(initialArrayClone);
        expect(result[0]).toEqual({ id: 1, isTarget: false });
        expect(result[result.length - 1]).toEqual({ id: 0, isTarget: true });
        expect(result[result.length - 2]).toEqual({ id: 5, isTarget: true });
      });
      it('searchFromStart = false, means last item should stay', () => {
        const initialArray: Item[] = [
          { id: 0, isTarget: true },
          { id: 1, isTarget: false },
          { id: 2, isTarget: false },
          { id: 3, isTarget: false },
          { id: 4, isTarget: false },
          { id: 5, isTarget: true },
        ];
        const initialArrayClone = [...initialArray];

        const result = moveItemToEnd<Item>(
          initialArray,
          ({ isTarget }) => isTarget,
          false,
        );

        expect(initialArray).toEqual(initialArrayClone);
        expect(result[0]).toEqual({ id: 0, isTarget: true });
        expect(result[result.length - 1]).toEqual({ id: 5, isTarget: true });
      });
    });
  });
});
