export const sortASC = <T = number | string>(a: T, b: T): number =>
  a < b ? -1 : a > b ? 1 : 0;

export const sortDESC = <T = number | string>(a: T, b: T): number =>
  a < b ? 1 : a > b ? -1 : 0;

export const sortByKeyASC = <T>(a: T, b: T, key: keyof T) =>
  a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;

export const sortByKeyDESC = <T>(a: T, b: T, key: keyof T) =>
  a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;

/**
 * Shuffles array in place by Fisher–Yates algorithm. ES6 version
 */
export const shuffle = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const sortByLengthASC = (a: string, b: string): number =>
  a.length < b.length ? -1 : a.length > b.length ? 1 : 0;

export const sortByLengthDESC = (a: string, b: string): number =>
  a.length < b.length ? 1 : a.length > b.length ? -1 : 0;

export const flatten = <T>(arr: T[]): T[] => {
  let flatArray = [];
  arr.forEach((item) => {
    if (item.constructor === Array) {
      flatArray = flatArray.concat(flatten(item));
    } else {
      flatArray.push(item);
    }
  });

  return flatArray;
};

/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param array The source array to search in
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
export function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean,
): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array)) return l;
  }
  return -1;
}

type moveItemInArrayCondition<T> = (v: T) => boolean;
export const moveItemToStart = <T>(
  array: T[],
  condition: moveItemInArrayCondition<T>,
  searchFromStart = true,
): T[] => {
  const index = searchFromStart
    ? array.findIndex(condition)
    : findLastIndex(array, condition);

  if (index > -1) {
    const clone = [...array];
    const [element] = clone.splice(index, 1);
    clone.unshift(element);
    return clone;
  }

  return array;
};

export const moveItemToEnd = <T>(
  array: T[],
  condition: moveItemInArrayCondition<T>,
  searchFromStart = true,
): T[] => {
  const index = searchFromStart
    ? array.findIndex(condition)
    : findLastIndex(array, condition);

  if (index > -1) {
    const clone = [...array];
    const [element] = clone.splice(index, 1);
    clone.push(element);
    return clone;
  }

  return array;
};
