describe('NodeJS: Native features', () => {
  describe('Classes', () => {
    it('getter & setter', () => {
      class TestClass {
        private theValue = 1;

        get value(): string {
          return this.theValue.toString();
        }

        set value(v: string) {
          this.theValue = parseInt(v);
        }
      }

      const c = new TestClass();
      expect(c.value).toEqual('1');

      c.value = '2';
      expect(c.value).toEqual('2');
    });
  });

  describe('Class: Map', () => {
    describe('Modifying saved objects', () => {
      const map = new Map();
      const someObject: any = {};

      it('Delete source: no changes', () => {
        someObject.simple1 = { id: 1 };
        map.set(1, someObject.simple1);

        delete someObject.simple1;
        const value = map.get(1);
        expect(value).toEqual({ id: 1 });
      });

      it('Rewrite source: no changes', () => {
        someObject.simple2 = { id: 2 };
        map.set(2, someObject.simple2);

        someObject.simple2 = { id: 999 };
        const value = map.get(2);
        expect(value).toEqual({ id: 2 });
      });

      it('Rewrite source (with let): no changes', () => {
        let letValue = { id: 3 };
        someObject.prop3 = letValue;
        map.set(3, someObject.prop3);

        letValue = { id: 999 };
        expect(letValue.id).toEqual(999);

        const value = map.get(3);
        expect(value).toEqual({ id: 3 });
      });

      it('Modify source: result changed', () => {
        const constValue = { id: 4 };
        someObject.prop4 = constValue;
        map.set(4, someObject.prop4);

        constValue.id = 999;
        expect(constValue.id).toEqual(999);

        const value = map.get(4);
        expect(value).toEqual({ id: 999 });
      });

      it('Usage for basic distinct filter', () => {
        const map: Map<number, string> = new Map();
        const array = [
          { id: 1, name: 'One' },
          { id: 1, name: 'One2' },
          { id: 2, name: 'Two' },
          { id: 3, name: 'Three' },
          { id: 0, name: 'Zero' },
          { id: 0, name: 'Zero2' },
        ];
        array.forEach((v, i) => map.set(array[i].id, array[i].name));
        const extract = [...map.values()];
        expect(extract).toEqual(['One2', 'Two', 'Three', 'Zero2']);
      });
    });
  });

  describe('Class: Set', () => {
    it('Usage for basic distinct filter', () => {
      const set: Set<string> = new Set();
      const array = [
        { id: 1, name: 'One' },
        { id: 2, name: 'One' },
        { id: 3, name: 'Two' },
        { id: 4, name: 'Three' },
        { id: 5, name: 'Zero' },
        { id: 6, name: 'Zero' },
      ];
      array.forEach((v, i) => {
        set.add(array[i].name);
      });
      const extract = [...set.values()];
      expect(extract).toEqual(['One', 'Two', 'Three', 'Zero']);
    });

    it('Usage for object distinct filter', () => {
      const set: Set<any> = new Set();
      const array = [
        { id: 1, name: 'One' },
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' },
      ];
      array.forEach((v) => {
        set.add(JSON.stringify(v));
      });
      const extract = [...set.values()];
      const result = extract.map((v) => JSON.parse(v));
      expect(result).toEqual([
        { id: 1, name: 'One' },
        { id: 2, name: 'Two' },
        { id: 3, name: 'Three' },
      ]);
    });
  });

  describe('Type: Boolean', () => {
    it('Usage in array filter', () => {
      const array = [
        // Boolean
        true, // true
        false, // false

        // Strings
        'true', // string => true
        'false', // string => true
        '', // empty string => false

        // For numbers: if it is equal 0, then false, otherwise true
        -1, // -1 != 0 => true
        -0, // -0 == 0 => false
        0, // 0 == 0 => false
        1, // 1 != 0 => true

        // Various
        [], // array => true
        {}, // object => true
        NaN, // NaN => false
        Infinity, // Infinity => true
        null, // null => false
      ];
      const result = array.filter(Boolean);
      const expected = [true, 'true', 'false', -1, 1, [], {}, Infinity];
      expect(result).toEqual(expected);
    });
  });

  describe('Various', () => {
    describe('X++ and ++X', () => {
      const v0 = '0';
      const v1 = '1';
      const arr = [v0, v1];

      it('Post-increment X++', () => {
        // Post-increment
        // remember the original value, then increment the variable;
        // the value of the expression is the original value
        let index = 0;
        const value = arr[index++]; // value = arr[0]; index = index + 1;

        expect(value).toEqual(v0);
        expect(index).toEqual(1);
      });

      it('Pre-increment ++X', () => {
        // Pre-increment
        // increment the variable;
        // the value of the expression is the final value
        let index = 0;
        const value = arr[++index]; // value = arr[index + 1]; index = index + 1

        expect(value).toEqual(v1);
        expect(index).toEqual(1);
      });
    });
  });

  describe('Cycles / loops', () => {
    it('for...in', () => {
      const arr = ['a', 'b', 'c'];
      const r = [];

      for (const arrKey in arr) {
        r.push(arrKey);
      }

      expect(r).toEqual(['0', '1', '2']); // this is KEYS, not INDEXES
    });

    it('for...of', () => {
      const arr: string[] = ['a', 'b', 'c'];
      const r = [];

      for (const arrKey of arr) {
        r.push(arrKey);
      }

      expect(r).toEqual(arr);
    });

    it.todo('.reduce()');
  });
});
