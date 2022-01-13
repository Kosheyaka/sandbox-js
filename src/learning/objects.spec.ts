describe('NodeJS: Objects', () => {
  describe('Object.method()', () => {
    it.todo('Object.keys()');
  });

  it('Expanding (spread)', () => {
    const obj1 = { id: 'id1', fName: 'fn' };
    const obj2 = { id: 'id2', lName: 'ln' };

    const act = {
      ...obj1,
      ...obj2,
    };
    const expected = {
      id: 'id2',
      fName: 'fn',
      lName: 'ln',
    };

    expect(act).toEqual(expected);
  });

  describe('Cycles / loops', () => {
    it('for...in (keys)', () => {
      const obj = {
        prop1: 'a',
        prop2: 'b',
        propNumber: 123,
      };
      const r = [];

      for (const objKey in obj) {
        r.push(objKey);
      }

      expect(r).toEqual(['prop1', 'prop2', 'propNumber']); // this is KEY, not INDEX
    });

    it('for...of (values)', () => {
      // for...of is ONLY for iterable (Array, Map, Set and "arguments")
      // but you can make object iterable

      interface IterableNextResponse {
        done: boolean;
        value: any;
      }

      const parent = {
        prop1: 'a',
        prop2: 'b',
        propNumber: 123,

        [Symbol.iterator]() {
          return {
            current: 0,
            next(): IterableNextResponse {
              // There is no way to get parent object in child
              // so you must use real parent name ("parent")
              const parentKeys = [];
              for (const objKey in parent) {
                parentKeys.push(objKey);
              }

              if (this.current < parentKeys.length) {
                // short way:
                // return { done: true, value: parent[parentKeys[this.current++]] };
                const result = {
                  done: false,
                  value: parent[parentKeys[this.current]],
                };
                this.current++;
                return result;
              } else {
                return { done: true, value: parent[parentKeys[this.current]] };
              }
            },
          };
        },
      };

      const result = [];
      for (const parentPropValue of parent) {
        result.push(parentPropValue);
      }

      expect(result).toEqual(['a', 'b', 123]);
    });
  });

  describe('Freeze', () => {
    // strict mode required!
    // otherwise there will be no error

    it('Adding property EMIT error', () => {
      const obj: any = {
        flag: true,
      };

      let isErrorOccurred = false;
      let errorText = '';

      Object.freeze(obj);

      try {
        obj.newProp = 1;
      } catch ({ message }) {
        isErrorOccurred = true;
        errorText = message;
      }

      expect(Object.isFrozen(obj)).toEqual(true);
      expect(isErrorOccurred).toEqual(true);
      expect(errorText).toEqual(
        'Cannot add property newProp, object is not extensible',
      );
    });

    it('Changing of property value EMIT cause error', () => {
      const obj: any = {
        flag: true,
      };

      let isErrorOccurred = false;
      let errorText = '';

      Object.freeze(obj);

      try {
        obj.flag = false;
      } catch ({ message }) {
        isErrorOccurred = true;
        errorText = message;
      }

      expect(Object.isFrozen(obj)).toEqual(true);
      expect(isErrorOccurred).toEqual(true);
      expect(errorText).toEqual(
        `Cannot assign to read only property 'flag' of object '#<Object>'`,
      );
    });
  });

  describe('Seal', () => {
    it('Adding property EMIT error', () => {
      const obj: any = {
        flag: true,
      };

      let newPropError = false;

      Object.seal(obj);

      try {
        obj.newProp = 1;
      } catch (err) {
        newPropError = true;
      }
      expect(newPropError).toEqual(true);
    });

    it('Changing of property value DO NOT EMIT error', () => {
      const obj: any = {
        flag: true,
      };

      let propChangeError = false;

      Object.seal(obj);

      try {
        obj.flag = false;
      } catch (err) {
        propChangeError = true;
      }

      expect(propChangeError).toEqual(false);
    });
  });

  describe('Iterable', () => {
    it('Make object iterable', async () => {
      const range = {
        from: 0,
        to: 5,

        [Symbol.iterator]() {
          return {
            current: this.from,
            max: this.to,

            next() {
              if (this.current < this.max) {
                // next MUST return object with { done: boolean; value: any }
                const result = { done: false, value: this.current + 1 };
                this.current = this.current + 1;
                return result;
              } else {
                // next MUST return object with { done: boolean; value: any }
                return { done: true, value: this.current };
              }
            },
          };
        },
      };

      const items = [];
      for (const rangeElement of range) {
        items.push(rangeElement);
      }

      expect(items).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
