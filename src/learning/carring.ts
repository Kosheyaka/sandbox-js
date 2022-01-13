/**
 * Каррирование - это трансформация, которая превращает вызов f(a, b, c) в f(a)(b)(c)
 */
export const carrying = (func) =>
  function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
