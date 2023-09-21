export declare class IdSet<E extends number | string> {
  static readonly VERSION: string;

  private _items: { [k: string]: E };
  private _size: number;

  constructor();

  static from<T extends number | string>(o: IdSet<T> | T[] | T): IdSet<T>;

  private static _wrap<T extends number | string>(o: IdSet<T> | T[] | T): IdSet<T>;

  add(E: E): this;
  remove(e: E): this;
  contains(e: E): boolean;
  clear(): void;
  size(): number;
  allIn<T extends number | string>(c: IdSet<T> | T[] | T): boolean;
  allNotIn<T extends number | string>(c: IdSet<T> | T[] | T): boolean;
  forEach<This = this>(fn: (e: E, thisArg: This) => boolean | undefined, thisArg: This): boolean;
  filter<This = this>(fn: (e: E, thisArg: This) => boolean, thisArg: This): boolean;
  map<T extends number | string, This>(fn: (e: E, thisArg: This) => T, thisArg: This): IdSet<T>;
  reduce<T = E>(fn: (prev: T, val: E) => T, initialValue: T): T;
  every<This = this>(fn: (e: E, thisArg: This) => boolean, thisArg: This): boolean;
  some<This = this>(fn: (e: E, thisArg: This) => boolean, thisArg: This): boolean;
  intersection<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  union<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  difference<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  symmetricDifference<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  isDisjoint<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  isSubset<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  isStrictSubset<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  isSuperset<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  isStrictSuperset<T extends number | string>(c: IdSet<T> | T[] | T): IdSet<T>;
  toArray(): E[];
  clone(): IdSet<E>;
  equals(o: any): boolean;
  toString(): string;

  private _keyOf(e: any): string | null;
  private _accept(k: string | null): boolean;
  private _has(k: string): boolean;
  private _store(k: string, e: E): void;
  private _load(k: string): E;
  private _drop(k: string): void;
}