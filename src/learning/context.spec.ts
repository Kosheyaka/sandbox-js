describe('NodeJS: Context', () => {
  describe('Context functions', () => {
    it.todo('.bind()');
    it.todo('.call()');
    it.todo('.apply()');
  });

  describe('Function Expression (regular) VS Function Declaration (arrow)', () => {
    // Arrow function can not be used as constructors (with "new" operator)
    // Arrow function do not have "arguments"

    it('Example #1: Visibility of FE', async () => {
      const value = 1;

      // Вызов до объявления
      const var1 = fn();
      expect(var1).toEqual(value);

      function fn() {
        return value;
      }

      // Вызов после объявления
      const var2 = fn();
      expect(var2).toEqual(value);
    });
    it('Example #2: Visibility of FD', async () => {
      const value = 1;

      // Вызов до объявления
      // const var1 = fn();
      // expect(var1).toEqual(value); // <- ERROR: Block-scoped variable 'fn' used before its declaration.

      const fn = () => {
        return value;
      };

      // Вызов после объявления
      const var2 = fn();
      expect(var2).toEqual(value);
    });
  });
});
