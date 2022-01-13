export const getRandomNumber = (max: number, min = 0): number =>
  Math.floor(min + Math.random() * (max + 1 - min));

type StringOrNumber = string | number;
export function calcAverage(values: StringOrNumber[], p = 2): number {
  if (values.length === 0) {
    throw new Error('Empty array');
  }

  let sum = 0;
  values.forEach((v) => {
    sum += parseFloat(parseFloat(v.toString()).toFixed(p));
  });

  return +parseFloat((sum / values.length).toString()).toFixed(p);
}
