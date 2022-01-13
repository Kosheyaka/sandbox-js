/* ---- When type is for objects ---- */

type TypeAB = {
  a: string;
  b: number;
  x?: any;
};

const tuple: [string, number] = ['string', 12345];

const testPartial = (v: Partial<TypeAB>): void => undefined;
testPartial({}); // all props are optional

const testRequired = (v: Required<TypeAB>): void => undefined;
testRequired({ a: 'abc', b: 123, x: [] }); // all props are required

const testReadOnly = (v: Readonly<TypeAB>): void => {
  // TS Error: Attempt to assign to const or readonly variable
  // v.a = '';
};
testReadOnly({ a: 'abc', b: 123 });

/* ---- When type is for basic values ---- */

const testPick = (v: Pick<TypeAB, 'x'>): void => undefined;
testPick({});
testPick({ x: [] });

const testOmit = (v: Omit<TypeAB, 'a' | 'x'>): void => undefined;
testOmit({ b: 123 });

type TypeStringsABC = 'A' | 'B' | 'C';
type TypeStringsCDE = 'C' | 'D' | 'E';
const testExclude = (v: Exclude<TypeStringsABC, TypeStringsCDE>): void =>
  undefined;
testExclude('A');
testExclude('B');

type TypeStringsRest = string | number | null | undefined;
const testNonNullable = (v: NonNullable<TypeStringsRest>): void => undefined;
testNonNullable('string');
testNonNullable(12345);

type TypeFunctionWithoutParams = () => void;
const testParametersA = (v: Parameters<TypeFunctionWithoutParams>): void =>
  undefined;
testParametersA([]);

type TypeFunctionWithParams = (v1: string, v2: number) => void;
const testParametersB = (v: Parameters<TypeFunctionWithParams>): void =>
  undefined;
testParametersB(['string', 12345]);

const testConstructorParameters = (
  v: ConstructorParameters<ErrorConstructor>,
): void => undefined;
testConstructorParameters(['error message']);

type TypeFunctionWithReturn = () => number;
const testReturnType = (v: ReturnType<TypeFunctionWithReturn>): void =>
  undefined;
testReturnType(12345);

class Cls {
  x: number;
}
const clsInstance = new Cls();
const testInstanceType = (v: InstanceType<typeof Cls>): void => undefined;
testInstanceType(clsInstance);

/* ---- Various cases ---- */

type CatName = 'catName1' | 'catName2' | 'catName3';
interface CatInfo {
  age: number;
  breed: string;
}
const cats: Record<CatName, CatInfo> = {
  catName1: { age: 10, breed: 'Persian' },
  catName2: { age: 5, breed: 'Maine Coon' },
  catName3: { age: 16, breed: 'British Shorthair' },
};

const testLowercase = (v: Lowercase<CatName>): void => undefined;
testLowercase('catname1');

const testUppercase = (v: Uppercase<CatName>): void => undefined;
testUppercase('CATNAME1');

const testCapitalize = (v: Capitalize<CatName>): void => undefined;
testCapitalize('CatName1');

const testUncapitalize = (v: Uncapitalize<CatName>): void => undefined;
testUncapitalize('catName1');
