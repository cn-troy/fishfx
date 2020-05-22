export default interface IDictionary<TKey, TValue> {
  readonly keys: Array<TKey>;
  readonly values: Array<TValue>;
  containsKey(key: TKey): boolean;
  add(key: TKey, value: TValue): void;
  remove(key: TKey): boolean;
  tryGetValue(key: TKey): TValue | null;
}
