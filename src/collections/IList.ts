export default interface IList<T> {
  indexOf(item: T): number;
  insert(index: number, item: T): void;
  removeAt(index: number): void;
  toArray(): Array<T>;
}
