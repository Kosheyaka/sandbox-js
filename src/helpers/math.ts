export const getRandomInteger = (max: number, min = 0): number =>
  Math.floor(min + Math.random() * (max + 1 - min));

const isNumber = (x: any): boolean => Number(x) === x;

const toNumber = (x: string | number, p = 2): number => {
  return isNumber(x) && typeof x === 'number'
    ? x
    : parseFloat(parseFloat(x as string).toFixed(p));
};

/**
 * @todo Переписать на reduce
 * @param values
 * @param options
 */
export function calcAverage(
  values: (string | number)[],
  options?: {
    fractionDigits?: number;
    convert?: boolean;
  },
): number {
  if (values.length === 0) {
    throw new Error('Empty array');
  }

  let sum = 0;
  values.forEach((v) => {
    sum += toNumber(v);
  });

  return +parseFloat((sum / values.length).toString()).toFixed(
    options.fractionDigits ?? 2,
  );
}

/**
 * @todo Переписать на reduce
 * @param values
 * @param options
 */
export function getMax(
  values: (string | number)[],
  options?: {
    fractionDigits?: number;
    convert?: boolean;
  },
): number {
  let max = -Infinity;
  values.forEach((v) => {
    const n = toNumber(v, options.fractionDigits ?? 2);
    if (n > max) {
      max = n;
    }
  });

  return max;
}

/**
 * @todo Переписать на reduce
 * @param values
 * @param options
 */
export function getMin(
  values: (string | number)[],
  options?: {
    fractionDigits?: number;
    convert?: boolean;
  },
): number {
  if (values.length === 0) {
    throw new Error('Empty array');
  }

  let max = Infinity;
  values.forEach((v) => {
    const n = toNumber(v, options.fractionDigits ?? 2);
    if (n < max) {
      max = n;
    }
  });

  return max;
}
