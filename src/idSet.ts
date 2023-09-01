type Id = string | number;
type RawCollection<T extends Id> = IdSet<T> | T[] | T;
type Nullable<T> = T | null | undefined;
type Key = string;

/**
 * A simple id set that simply simulates the native Set.
 * By default, only string and number are allowed as value,
 * but more types can be supported by overriding low-level R/W interfaces.
 */
export declare class IdSet<E extends Id> {
  /**
   * The version of IdSet.
   */
  static readonly VERSION: string;

  /**
   * The value container.
   */
  private _items: { [key: string]: E };
  /**
   * The number of valid values.
   */
  private _size: number; V

  constructor();

  /**
   * Creates a new, shallow-copied IdSet instance from an IdSet, Array or raw object.
   */
  static from<V extends Id>(o: RawCollection<V>): IdSet<V>;

  /**
   * Inserts a new element with a specified value in to this set, if there isn't an element with the same value already in this set.
   * @returns This set instance.
   */
  add(e: E): this;
  /**
   * Removes a specified value from this set, if it is in the set.
   * @returns This set instance.
   */
  remove(e: E): this;
  /**
   * Returns a boolean indicating whether an element with the specified value exists in this set or not.
   */
  contains(e: E): boolean;
  /**
   * Removes all elements from this set.
   */
  clear(): void;
  /**
   * Returns the number of (unique) elements in this set.
   */
  size(): number;
  /**
   * Returns whether this set has no data.
   */
  isEmpty(): boolean;
  /**
   * Returns a boolean indicating whether all elements in this set are contained in the specified set.
   */
  allIn(c: RawCollection<E>): boolean;
  /**
   * Returns a boolean indicating whether all elements in this set are not contained in the specified set.
   */
  allNotIn(c: RawCollection<E>): boolean;
  /**
   * Executes a provided function once for each value in this set.
   * @param fn A function to execute for each entry in the set.
   * @param thisArg A value to use as this when executing fn.
   * @returns A boolean indicating whether the traversal was executed completely.
   */
  forEach<T = this>(fn: (this: T, elem: E, thisArg: T) => Nullable<boolean>, thisArg?: T): boolean;
  /**
   * Creates and returns a shallow copy of a portion of a given set. iltered down to just the elements from the given set that pass the test implemented by the provided function.
   * @param fn A function to execute for each element in the set. It should return a truthy value to keep the element in the resulting set, and a falsy value otherwise.
   * @param thisArg A value to use as this when executing fn. The default value is this set instance.
   */
  filter<T = this>(fn: (this: T, elem: E, thisArg: T) => boolean, thisArg?: T): IdSet<E>;
  /**
   * Creates and returns a new set populated with the results of calling a provided function on every element in the calling set
   * @param fn A function to execute for each element in the set. Its return value is added as a single element in the new set.
   * @param thisArg A value to use as this when executing fn. The default value is this set instance.
   */
  map<T = this>(fn: (this: T, elem: E, thisArg: T) => E, thisArg?: T): IdSet<E>;
  /**
   * Convert this set to an array and call the reduce method of the array instance.
   * Sees {@link Array.prototype.reduce} for details.
   */
  reduce<V = E>(fn: (prev: V, value: E, index: number, array: E[]) => V, initialValue?: V): V;
  /**
   * Tests whether all elements in the set pass the test implemented by the provided function and returns a boolean value as result.
   * @param fn A function to execute for each element in the set. It should return a truthy value to indicate the element passes the test, and a falsy value otherwise.
   * @param thisArg A value to use as this when executing fn. The default value is this set instance.
   */
  every<T = this>(fn: (this: T, elem: E, thisArg: T) => boolean, thisArg?: T): boolean;
  /**
   * Tests whether at least one element in the set passes the test implemented by the provided function.
   * It returns true if, in the set, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the set.
   * @param A function to execute for each element in the set. It should return a truthy value to indicate the element passes the test, and a falsy value otherwise.
   * @param thisArg A value to use as this when executing fn. The default value is this set instance.
   */
  some<T = this>(fn: (this: T, elem: E, thisArg: T) => boolean, thisArg?: T): boolean;
  /**
   * Returns a new set containing a shallow copy of elements common to this set and the specified collection.
   */
  intersection(c: RawCollection<E>): IdSet<E>;
  /**
   * Returns a new set containing a shallow copy of all elements of this set and the specified collection
   */
  union(c: RawCollection<E>): IdSet<E>;
  /**
   * Returns a new set containing shallow copies of elements that are contained in this set but are not contained in the specified collection.
   */
  difference(c: RawCollection<E>): IdSet<E>;
  /**
   * Returns a new set containing shallow copies of elements contained only in either this set or the specified collection.
   */
  symmetricDifference(c: RawCollection<E>): IdSet<E>;
  /**
   * Returns an array containing all elements of this set.
   */
  toArray(): E[];
  /**
   * Returns a shallow copy of this set.
   */
  clone(): IdSet<E>;
  /**
   * Returns a boolean indicating whether the specified object's type and content are exactly the same as this set.
   */
  equals(o: any): boolean;
  /**
   * Returns a JSON Array string of the values of this set.
   */
  toString(): string;

  // overridable low-level R/W interfaces
  // keyOf-> accept -> has -> store / drop / load
  /**
   * Returns the key corresponding to the specified element or null if the element's type is not supported
   */
  protected _keyOf(e: E): Key;
  /**
   * Returns a boolean indicating whether the specified key can be accepted.
   */
  protected _accept(k: Key): boolean;
  /**
   * Returns a boolean indicating whether the specified key already exists in the set or not.
   */
  protected _has(k: Key): boolean;
  /**
   * Adds or updates an entry in this set with a specified key and a value without validation.
   */
  protected _store(k: Key, e: E): void;
  /**
   * Returns a specified element from this set by a specified key without validation.
   */
  protected _load(k: Key): E;
  /**
   * Removes a specified element or marks a specified element as empty from this set by a specified key without validating.
   */
  protected _drop(k: Key): void;
}