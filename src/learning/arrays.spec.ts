describe('NodeJS: Array', () => {
  describe('Create and fill array', () => {
    it('Pseudo-array to real array', async () => {
      // Есть индексы и length
      const pseudo = {
        0: 'Hello',
        1: 'World',
        length: 2,
      };

      const realArray = Array.from(pseudo);
      expect(realArray).toEqual(['Hello', 'World']);
    });
  });

  describe('Modify array', () => {
    describe('Remove value from array', () => {
      let initialArray: number[];
      let initialArrayClone: number[];
      const valueToDelete = 3;
      const expectedResult = [0, 1, 2, 4, 5];

      beforeEach(() => {
        initialArray = [0, 1, 2, 3, 4, 5];
        initialArrayClone = [...initialArray];
      });

      it('Array.slice: no mutation', () => {
        const index = initialArray.indexOf(valueToDelete);
        const p1 = initialArray.slice(0, index);
        const p2 = initialArray.slice(index + 1);
        const result = p1.concat(p2);

        // used array is NOT mutated
        expect(initialArray).toEqual(initialArrayClone);

        expect(result).toEqual(expectedResult);
      });

      it('Array.splice: with mutation', () => {
        const index = initialArray.indexOf(valueToDelete);
        const [removedElement] = initialArray.splice(index, 1);

        // array mutated
        expect(initialArray).not.toEqual(initialArrayClone);
        expect(initialArray).toEqual(expectedResult);

        expect(removedElement).toEqual(valueToDelete);
      });
    });

    it('Array.concat', () => {
      const a = [1, 2, 3];
      const b = [4, 5, 6];
      const c = a.concat(b);
      const expected = [1, 2, 3, 4, 5, 6];

      expect(c).toEqual(expected);
      expect(a).toEqual([1, 2, 3]); // No mutations
      expect(b).toEqual([4, 5, 6]); // No mutations
    });
  });

  describe('Search in array', () => {
    it('Find object in array of objects', () => {
      const a = { id: 'a', name: '' };
      const b = { id: 'b', name: '' };
      const c = { id: 'c', name: '' };
      const target = { id: 'c', name: '' };

      const arr = [a, b, c];

      const targetJSON = JSON.stringify(target);
      const index = arr.findIndex(
        (item) => JSON.stringify(item) === targetJSON,
      );
      expect(index).toEqual(2);
    });
  });

  describe('Sort array', () => {
    it('Basic (with mutation)', () => {
      const arr = ['A', 'C', 'B'];

      const result = arr.sort(); // return sorted and mutate initial
      expect(result).toEqual(['A', 'B', 'C']);
      expect(arr).toEqual(['A', 'B', 'C']);
    });

    it('No mutation: via function', () => {
      const arr = ['A', 'C', 'B'];

      function sort<T>(arr: T[]): T[] {
        return arr.concat().sort();
      }

      const result = sort(arr); // return sorted, arr is NOT mutated
      expect(result).toEqual(['A', 'B', 'C']);
      expect(arr).toEqual(['A', 'C', 'B']);
    });

    it('No mutation: via prototype', () => {
      const arr = ['A', 'C', 'B'];

      const result = Array.prototype.slice.call(arr).sort(); // return sorted, arr is NOT mutated
      expect(result).toEqual(['A', 'B', 'C']);
      expect(arr).toEqual(['A', 'C', 'B']);
    });

    it('No mutation: via spread', () => {
      const arr = ['A', 'C', 'B'];

      const result = [...arr].sort(); // return sorted, arr is NOT mutated
      expect(result).toEqual(['A', 'B', 'C']);
      expect(arr).toEqual(['A', 'C', 'B']);
    });
  });
});
