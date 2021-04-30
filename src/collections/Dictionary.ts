import {
  InvalidOperationException,
  ArgumentException,
} from "../system/Exception";
import KeyValuePair from "./KeyValuePair";
import IDictionary from "./IDictionary";

export {};
declare global {
  interface Entries<TKey, TValue> {
    [key: number]: KeyValuePair<TKey, TValue>;
  }

  interface DictionaryItem<TKey, TValue> {
    key: TKey;
    value: TValue;
  }
}

export default class Dictionary<TKey, TValue>
  implements IDictionary<TKey, TValue> {
  private _entries: Entries<TKey, TValue> = {};
  private _count: number = 0;
  private _version: number = 0;

  *[Symbol.iterator]() {
    const version = this._version;

    const collection: Array<KeyValuePair<TKey, TValue>> = [];
    Object.keys(this._entries).forEach((hash: any) => {
      const entry = this._entries[hash];
      const pair = new KeyValuePair<TKey, TValue>(entry.key, entry.value);
      collection.push(pair);
    });

    for (let i = 0; i < collection.length; i++) {
      if (version !== this._version) {
        throw new InvalidOperationException(
          "字典被修改，枚举操作可能无法执行。"
        );
      }

      yield collection[i];
    }
  }

  /**
   * 构造函数
   */
  constructor();
  constructor(collection: Array<KeyValuePair<TKey, TValue>>);
  constructor(collection: Array<DictionaryItem<TKey, TValue>>);
  constructor(
    collection?: Array<
      KeyValuePair<TKey, TValue> | DictionaryItem<TKey, TValue>
    >
  ) {
    if (collection === undefined) return;

    collection.forEach(
      (pair: KeyValuePair<TKey, TValue> | DictionaryItem<TKey, TValue>) => {
        this.add(pair.key, pair.value);
      }
    );
  }

  /**
   * 获取Dictionary中键/值对的长度
   */
  public get count(): number {
    return this._count;
  }

  /**
   * 获取Dictionary中键的集合
   */
  public get keys(): Array<TKey> {
    const keys: Array<TKey> = [];
    Object.keys(this._entries).forEach((hash: any) => {
      keys.push(this._entries[hash].key);
    });
    return keys;
  }

  /**
   * 获取Dictionary中值的集合
   */
  public get values(): Array<TValue> {
    const keys: Array<TValue> = [];
    Object.keys(this._entries).forEach((hash: any) => {
      keys.push(this._entries[hash].value);
    });
    return keys;
  }

  /**
   * 确定Dictionary是否包含指定的键
   * @param key 键
   */
  public containsKey(key: TKey): boolean {
    return Object.prototype.hasOwnProperty.call(
      this._entries,
      this._getHashCode(key)
    );
  }

  /**
   * 确定Dictionary是否包含特定值
   * @param value 值
   */
  public containsValue(value: TValue): boolean {
    let flag: boolean = false;
    Object.keys(this._entries).forEach((hash: any) => {
      if (this._entries[hash].value === value) flag = true;
    });
    return flag;
  }

  /**
   * 添加项
   * @param key 键
   * @param value 值
   */
  public add(key: TKey, value: TValue): void {
    const hashCode = this._getHashCode(key);
    if (Object.prototype.hasOwnProperty.call(this._entries, hashCode)) {
      throw new ArgumentException(`已存在具有相同键的项。键：${key}`);
    }

    this._entries[hashCode] = new KeyValuePair(key, value);
    this._count++;
    this._version++;
  }

  /**
   * 从Dictionary中移除所指定键的项
   * @param key 键
   * @returns 是否移除成功
   */
  public remove(key: TKey): boolean {
    const entry = this._findEntry(key);
    if (entry !== undefined) {
      delete this._entries[this._getHashCode(key)];
      this._count--;
      this._version++;
      return true;
    }
    return false;
  }

  /**
   * 从Dictionary中移除所有的键和值
   */
  public clear() {
    this._count = 0;
    this._entries = {};
  }

  /**
   * 获取与指定的键相关联的值
   * @param key 键
   * @returns 值
   */
  public tryGetValue(key: TKey): TValue | null {
    const entry = this._findEntry(key);
    if (entry !== undefined) {
      return entry.value;
    }

    return null;
  }

  /**
   * 获取与指定的键相关联的值
   * @param key 键
   * @returns 值
   */
  public getValue(key: TKey): TValue {
    const entry = this._findEntry(key);
    return entry!.value;
  }

  /**
   * 遍历Dictionary
   * @param predicate lambda表达式
   */
  public forEach(
    predicate: (key: TKey, value: TValue, index: number) => void
  ): void {
    if (typeof predicate !== "function")
      throw new ArgumentException("使用lambda表达式，必须传递表达式。");

    const version = this._version;

    const collection: Array<KeyValuePair<TKey, TValue>> = [];
    Object.keys(this._entries).forEach((hash: any) => {
      const entry = this._entries[hash];
      const pair = new KeyValuePair<TKey, TValue>(entry.key, entry.value);
      collection.push(pair);
    });

    for (let i = 0; i < collection.length; i++) {
      if (version !== this._version) {
        throw new InvalidOperationException(
          "字典被修改，枚举操作可能无法执行。"
        );
      }

      predicate(collection[i].key, collection[i].value, i);
    }
  }

  private _findEntry(key: TKey): KeyValuePair<TKey, TValue> | undefined {
    const hashCode = this._getHashCode(key);
    return this._entries[hashCode];
  }

  private _getHashCode(key: TKey): number {
    const str = JSON.stringify(key);
    let hash = 0;
    let chr;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i += 1) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}
