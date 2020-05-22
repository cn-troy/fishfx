export default class KeyValuePair<TKey, TValue> {
  private readonly _key: TKey;
  private readonly _value: TValue;

  constructor(key: TKey, value: TValue) {
    this._key = key;
    this._value = value;
  }

  public get key(): TKey {
    return this._key;
  }

  public get value(): TValue {
    return this._value;
  }

  public toString(): string {
    return `[${this._key}, ${this._value}]`;
  }

  public toObject(): DictionaryItem<TKey, TValue> {
    return { key: this._key, value: this._value };
  }
}
