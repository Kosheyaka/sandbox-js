import fs = require('fs');

describe('NodeJS: Promises, Async, Event loop', () => {
  it('Simple Promise with await', async () => {
    const f = async () => null;
    const r = await f();

    expect(r).toEqual(null);
  });

  it('Promise.all', async () => {
    //TODO Just do it
  });

  it('Promise.race', async () => {
    //TODO Just do it
  });

  describe('New promise, then, catch, chains, exceptions', () => {
    interface IFlag {
      wasResolved: boolean;
      wasRejected: boolean;
    }
    const called = {} as { [key: string]: IFlag };

    it('Resolving promise', async () => {
      interface IResolved {
        message: string;
        code: number;
      }
      const resolved = 'Resolved';
      called.good = {
        wasResolved: false,
        wasRejected: false,
      };

      const goodPromise = new Promise(
        // Тип возвращаемого значения можно указать в качестве типа для value
        (resolve: (value: IResolved) => void, reject: (value: any) => void) =>
          resolve({ message: resolved, code: 200 }),
      );

      goodPromise.then((value) => {
        called.good.wasResolved = true;
        expect(value).toEqual({ message: resolved, code: 200 });
      });

      // Везде false потому что мы не можем дожидаться результата синхронно
      expect(called.good.wasResolved).toEqual(false);
      expect(called.good.wasRejected).toEqual(false);
    });

    it('Rejecting promise', async () => {
      interface IRejected {
        message: string;
        code: number;
      }
      const rejected = 'Rejected';
      called.bad = {
        wasResolved: false,
        wasRejected: false,
      };

      const badPromise = new Promise(
        // Тип значения для reject задать не удается, но его можно указать в catch
        (
          resolve: (value: string) => void,
          reject: (value: IRejected) => void,
        ) => reject({ message: rejected, code: 200 }),
      );

      badPromise.catch((value: IRejected) => {
        called.bad.wasRejected = true;
        expect(value.message).toEqual(rejected);
      });

      // Везде false потому что мы не можем дожидаться результата синхронно
      expect(called.bad.wasResolved).toEqual(false);
      expect(called.bad.wasRejected).toEqual(false);
    });

    it('Chains', async () => {
      // https://basarat.gitbook.io/typescript/future-javascript/promise#chain-ability-of-promises
      // TODO Just do it
    });

    it('Convert sync function into async', async () => {
      const readFileAsync = (filename: string): Promise<Buffer> =>
        new Promise((resolve: (v: Buffer) => void, reject) => {
          fs.readFile(filename, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    });
  });
});
