/* eslint-disable */

/**
 * GetNames тип для извлечения набора ключей
 * @template FromType тип - источник ключей
 * @template KeepType критерий фильтрации
 * @template Include  признак для указания как интерпретировать критерий фильтрации. В случае false - инвертировать результат для KeepType
 */
type GetNames<FromType, KeepType = any, Include = true> = {
  [K in keyof FromType]: FromType[K] extends KeepType
    ? Include extends true ? K : never
    : Include extends true ? never : K;
}[keyof FromType];

/* eslint-enable */

// Пример использования
class SomeClass {
  firstName: string;
  lastName: string;
  age: number;
  count: number;

  getData(): string {
    return 'dummy';
  }
}

// be: "firstName" | "lastName"
type StringKeys = GetNames<SomeClass, string>;

// be: "age" | "count"
type NumberKeys = GetNames<SomeClass, number>;

// be: "getData"
// eslint-disable-next-line @typescript-eslint/ban-types
type FunctionKeys = GetNames<SomeClass, Function>;

// be: "firstName" | "lastName" | "age" | "count"
// eslint-disable-next-line @typescript-eslint/ban-types
type NonFunctionKeys = GetNames<SomeClass, Function, false>;

/* -------------------------------------------------------------------------- */

const animals = ['cat', 'dog', 'mouse'] as const;
type Animal = typeof animals[number];

// type Animal = 'cat' | 'dog' | 'mouse'

/* -------------------------------------------------------------------------- */

type TypeObjAB = {
  a: string;
  b: number;
};

type TypeObjBC = {
  b: number;
  c: boolean;
};

type TypeORJoin<T1, T2> = T1 | T2;
let orJoin: TypeORJoin<TypeObjAB, TypeObjBC>;
orJoin = { a: 'string', b: 12345 };
orJoin = { b: 12345, c: true };
orJoin = { a: 'string', b: 12345, c: true };

type TypeANDJoin<T1, T2> = T1 & T2;
const andJoin: TypeANDJoin<TypeObjAB, TypeObjBC> = {
  a: 'string',
  b: 12345,
  c: true,
};

type TypeInnerJoin<T1, T2> = Pick<T1, keyof T1 & keyof T2>;
const innerJoin: TypeInnerJoin<TypeObjAB, TypeObjBC> = {
  b: 12345,
};

type TypeOuterJoin<T1, T2> = Omit<T1, keyof T2> | Omit<T2, keyof T1>;
const outerJoin: TypeOuterJoin<TypeObjAB, TypeObjBC> = {
  a: 'string',
  c: true,
};
