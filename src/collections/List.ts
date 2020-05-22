import IList from './IList';
import { TypeInitializationException, ArgumentException, InvalidOperationException } from '../system/Exception';

export default class List<T> implements IList<T> {
  *[Symbol.iterator]() {
    const beginIteratorVersion = this._version
    for (let i = 0; i < this.length; i++) {
      if (this._version !== beginIteratorVersion)
        throw new InvalidOperationException("list 已经被修改，无法完成枚举操作。")
      yield this._items[i];
    }
  }
  private _items: Array<T>;

  private _version: number = 0;

  /**
   * 根据容量初始化
   * @param capacity 集合的容量
   */
  constructor(capacity: number)
  /**
   * 根据已有数组初始化(开启引用模式后, list实例改变数据,items数据也会改变)
   * @param items 初始化的Array
   * @param ref 是否使用引用模式
   */
  constructor(items: Array<T>, ref?: boolean)
  constructor(capacityOrItems?: number | Array<T>, ref?: boolean) {
    if (Array.isArray(capacityOrItems)) {
      if (typeof ref === "boolean" && ref)
        this._items = capacityOrItems;
      else {
        this._items = [];
        this._items = this._items.concat(capacityOrItems);
      }
    } else if (typeof capacityOrItems === "number") {
      this._items = new Array<T>(capacityOrItems);
    } else {
      throw new TypeInitializationException("初始化 list<T> 时发生参数类型错误，构造函数仅支持 number, Array<T>");
    }
  }

  public get length(): number {
    return this._items.length;
  }

  public indexOf(item: T): number {
    return this._items.indexOf(item);
  }

  public insert(index: number, item: T): void {
    this._version++;
    this._items.splice(index, 0, item);
  }

  public removeAt(index: number): void {
    this._version++;
    this._items.splice(index, 1);
  }

  public add(item: T): void {
    this._version++;
    this._items.push(item);
  }

  public addRange(collection: Array<T>): void {
    this._version++;
    this._items.splice(this._items.length, 0, ...collection);
  }

  public clear(): void {
    this._version++;
    this._items.length = 0;
  }

  public contains(item: T) {
    return this._items.length !== 0 && this.indexOf(item) !== -1;
  }

  public getRange(index: number, count: number) {
    return this._items.slice(index, index + count);
  }

  public insertRange(index: number, collection: Array<T>) {
    this._version++;
    this._items.splice(index, 0, ...collection);
  }

  public lastIndexOf(item: T, index?: number): number {
    return this._items.lastIndexOf(item, index);
  }

  public remove(item: T) {
    this._version++;
    const index = this.indexOf(item);
    this.removeAt(index);
  }

  public get(index: number): T {
    return this._items[index] as T;
  }

  public toArray(): Array<T> {
    return [...this._items];
  }

  public forEach(predicate: (item: T, index: number) => void): void {
    if (typeof predicate !== "function")
      throw new ArgumentException('使用lambda表达式，必须传递表达式。');

    const beginIteratorVersion = this._version
    for (let i = 0; i < this.length; i++) {
      if (this._version !== beginIteratorVersion)
        throw new InvalidOperationException("list 已经被修改，无法完成枚举操作。")
      predicate(this._items[i], i);
    }
  }
}