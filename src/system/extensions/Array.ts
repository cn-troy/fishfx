import { ArgumentException, ArgumentOutOfRangeException } from "../Exception";
import { Dictionary } from "../../collections";

declare global {
  interface Array<T> {
    /**
     * 查找数组,返回满足指定条件的第一个元素
     * @param predicate lambda表达式, 表达式必须返回boolean
     */
    f_first(predicate: (item: T, index: number) => boolean): T | null;

    /**
     * 查找数组,返回满足指定条件的最后一个元素
     * @param predicate lambda表达式, 表达式必须返回boolean
     */
    f_last(predicate: (item: T, index: number) => boolean): T | null;

    /**
     * 检查数组,是否每一项都满足指定条件
     * @param predicate lambda表达式, 表达式必须返回boolean
     */
    f_all(predicate: (item: T, index: number) => boolean): boolean;

    /**
     * 检查数组,是否有满足指定条件的元素
     * @param predicate lambda表达式, 表达式必须返回boolean
     */
    f_any(predicate: (item: T, index: number) => boolean): boolean;

    /**
     * 查找所有符合条件的元素
     * @param predicate lambda表达式, 表达式必须返回boolean
     */
    f_where(predicate: (item: T, index: number) => boolean): Array<T>;

    /**
     * 查找所有符合条件的元素数量
     * @param predicate predicate lambda表达式, 表达式必须返回boolean
     */
    f_count(predicate: (item: T, index: number) => boolean): number;

    /**
     * 枚举每个元素,并重新分配新元素
     * @param predicate lambda表达式
     */
    f_select(predicate: (item: T, index: number) => any): Array<any>;

    /**
     * 检查数组,移除满足指定条件的元素
     * @param predicate lambda表达式, 表达式必须返回boolean
     */
    f_remove(predicate: (item: T, index: number) => boolean): number;

    /**
     * 枚举每个元素, 计算lambda返回的10进制数值之合
     * @param predicate lambda表达式, 表达式必须返回number
     */
    f_sum(predicate: (item: T, index: number) => number): number;

    /**
     * 枚举每个元素, 计算lambda返回的10进制数值的平均数
     * @param predicate lambda表达式, 表达式必须返回number
     */
    f_avg(predicate: (item: T, index: number) => number): number;

    /**
     * 枚举每个元素, 获得lambda返回的10进制数值的最小值
     * @param predicate lambda表达式, 表达式必须返回number. Array<number>可以不传递该参数.
     */
    f_min(predicate?: (item: T, index: number) => number): number;

    /**
     * 枚举每个元素, 获得lambda返回的10进制数值的最大值
     * @param predicate lambda表达式, 表达式必须返回number. Array<number>可以不传递该参数.
     */
    f_max(predicate?: (item: T, index: number) => number): number;

    /**
     * 根据条件对数组的元素进行升序排序
     * @param predicate lambda表达式
     */
    f_orderBy(predicate?: (item: T) => any): Array<T>;

    /**
     * 根据条件对数组的元素进行降序排序
     * @param predicate lambda表达式
     */
    f_orderByDescending(predicate?: (item: T) => any): Array<T>;

    /**
     * 根据条件继续对数组的元素进行升序排序
     * @param predicate lambda表达式
     */
    f_thenBy(predicate: (item: T) => any): Array<T>;

    /**
     * 根据条件继续对数组的元素进行降序排序
     * @param predicate lambda表达式
     */
    f_thenByDescending(predicate: (item: T) => any): Array<T>;

    /**
     * 根据条件对数组进行分组
     * @param predicate lambda表达式
     */
    f_groupBy(predicate: (item: T, index: number) => any): Dictionary<string, Array<T>>;

    /**
     * 跳过指定数量的元素, 返回剩余元素
     * @param count 跳过的数量
     */
    f_skip(count: number): Array<T>;

    /**
     * 从数组开头获取指定数量元素
     * @param count 获取的数量
     */
    f_take(count: number): Array<T>;

    /**
     * 清空数组
     */
    f_clear(): void;

    /**
     * 根据条件返回数组元素的索引
     * @param predicate lambda表达式
     */
    f_indexOf(predicate: (item: T, index: number) => boolean): number;

    /**
     * 根据条件对每项数组元素进行转换
     * @param model 目标对象的实例
     * @param predicate lambda表达式
     */
    f_convert<U>(model: U, predicate?: (item: T, index: number) => any): Array<U>;

    /**
     * 排序规则
     */
    sortRule?: Function
  }
}

const _checkPredicate = function _checkPredicate(predicate: Function) {
  if (typeof predicate !== "function")
    throw new ArgumentException('使用lambda表达式，必须传递表达式。');
};

Array.prototype.f_first = function <T>(predicate: (item: T, index: number) => boolean): T | null {
  _checkPredicate(predicate);

  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    if (predicate(element, index)) {
      return element;
    }
  }

  return null;
};

Array.prototype.f_last = function <T>(predicate: (item: T, index: number) => boolean): T | null {
  _checkPredicate(predicate);
  const beginIndex = this.length - 1;
  for (let index = beginIndex; index >= 0; index -= 1) {
    const element = this[index] as T;
    if (predicate(element, index)) {
      return element;
    }
  }
  return null;
};

Array.prototype.f_all = function <T>(predicate: (item: T, index: number) => boolean): boolean {
  _checkPredicate(predicate);

  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    if (!predicate(element, index)) {
      return false;
    }
  }
  return true;
};

Array.prototype.f_any = function <T>(predicate: (item: T, index: number) => boolean): boolean {
  _checkPredicate(predicate);

  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    if (predicate(element, index)) {
      return true;
    }
  }
  return false;
};

Array.prototype.f_where = function <T>(predicate: (item: T, index: number) => boolean): Array<T> {
  _checkPredicate(predicate);

  const findArray = Array<T>();
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    if (predicate(element, index)) {
      findArray.push(element);
    }
  }

  return findArray;
};

Array.prototype.f_count = function <T>(predicate: (item: T, index: number) => boolean): number {
  _checkPredicate(predicate);

  let count = 0;
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    if (predicate(element, index)) {
      count += 1;
    }
  }

  return count;
};

Array.prototype.f_select = function <T>(predicate: (item: T, index: number) => any): Array<any> {
  _checkPredicate(predicate);

  const defineArray = new Array<T>();
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    defineArray.push(predicate(element, index));
  }

  return defineArray;
};

Array.prototype.f_remove = function <T>(predicate: (item: T, index: number) => boolean): number {
  _checkPredicate(predicate);

  // 这里按倒叙循环，是为了解决删除数组项后索引错乱的问题
  let removeCount = 0;
  for (let len = this.length, index = len - 1; index >= 0; index -= 1) {
    const element = this[index];
    if (predicate(element, index)) {
      this.splice(index, 1);
      removeCount += 1;
    }
  }
  return removeCount;
};

Array.prototype.f_sum = function <T>(predicate: (item: T, index: number) => number): number {
  _checkPredicate(predicate);

  let sum = 0;
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    sum += predicate(element, index);
  }
  return sum;
};

Array.prototype.f_avg = function <T>(predicate: (item: T, index: number) => number): number {
  _checkPredicate(predicate);

  let average = 0;
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    average += predicate(element, index);
  }

  return average / this.length;
};

Array.prototype.f_min = function <T>(predicate?: (item: T, index: number) => number): number {
  if (!predicate) {
    return Math.min.apply(Math, [...this]);
  }

  _checkPredicate(predicate);

  let min = NaN;
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    const excuteValue = predicate(element, index);
    if (excuteValue < min || Number.isNaN(min))
      min = excuteValue;
  }

  return min;
};

Array.prototype.f_max = function <T>(predicate?: (item: T, index: number) => number): number {
  if (!predicate) {
    return Math.max.apply(Math, [...this]);
  }
  _checkPredicate(predicate);

  let max = NaN;
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    const excuteValue = predicate(element, index);
    if (excuteValue > max || Number.isNaN(max))
      max = excuteValue;
  }

  return max;
};

Array.prototype.f_orderBy = function <T>(predicate?: (item: T) => any): Array<T> {
  if (!predicate) {
    this.sort();
    return this;
  }
  _checkPredicate(predicate);

  this.sort((a: T, b: T) => {
    if (predicate(a) > predicate(b)) return 1;
    if (predicate(a) < predicate(b)) return -1;
    return 0;
  });
  this.sortRule = predicate;

  return this;
};

Array.prototype.f_orderByDescending = function <T>(predicate?: (item: T) => any): Array<T> {
  if (!predicate) {
    this.sort().reverse();
    return this;
  }
  _checkPredicate(predicate);

  this.sort((a: T, b: T) => {
    if (predicate(a) < predicate(b)) return 1;
    if (predicate(a) > predicate(b)) return -1;
    return 0;
  });
  this.sortRule = predicate;

  return this;
};

Array.prototype.f_thenBy = function <T>(predicateB: (item: T) => any): Array<T> {
  _checkPredicate(predicateB);

  const predicateA = this.sortRule === undefined ? () => { } : this.sortRule;
  _checkPredicate(predicateA);

  this.sort((a: T, b: T) => {
    if (predicateA(a) === predicateA(b)) {
      if (predicateB(a) > predicateB(b)) return 1;
      if (predicateB(a) < predicateB(b)) return -1;
      return 0;
    }
    return 0;
  });
  this.sortRule = predicateB;

  return this;
};

Array.prototype.f_thenByDescending = function <T>(predicateB: (item: T) => any): Array<T> {
  _checkPredicate(predicateB);

  const predicateA = this.sortRule === undefined ? () => { } : this.sortRule;
  _checkPredicate(predicateA);

  this.sort((a: T, b: T) => {
    if (predicateA(a) === predicateA(b)) {
      if (predicateB(a) < predicateB(b)) return 1;
      if (predicateB(a) > predicateB(b)) return -1;
      return 0;
    }
    return 0;
  });
  this.sortRule = predicateB;

  return this;
};

Array.prototype.f_groupBy = function <T>(predicate: (item: T, index: number) => any) {
  _checkPredicate(predicate);

  const dictionaryObj: Dictionary<string, Array<any>> = new Dictionary();
  for (let index = 0; index < this.length; index += 1) {
    const element = this[index];
    const key = predicate(element, index);

    if (!dictionaryObj.containsKey(key)) {
      dictionaryObj.add(key, [element]);
    } else {
      const findArray = dictionaryObj.tryGetValue(key);
      if (findArray !== null) findArray.push(element);
    }
  }
  return dictionaryObj;
};

Array.prototype.f_skip = function <T>(count: number): Array<T> {
  if (count >= this.length) {
    throw new ArgumentOutOfRangeException('count 超过数组最大长度.');
  }

  const skipped = new Array<T>();
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    if (index > count) {
      skipped.push(element);
    }
  }
  return skipped;
};

Array.prototype.f_take = function <T>(count: number): Array<T> {
  if (count >= this.length)
    return this;

  const taken = new Array<T>();
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index] as T;
    taken.push(element);
    if (index >= count - 1) {
      return taken;
    }
  }
  return taken;
};

Array.prototype.f_clear = function (): void {
  this.length = 0;
};

Array.prototype.f_indexOf = function (predicate: Function): number {
  _checkPredicate(predicate);

  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index];
    if (predicate(element)) {
      return index;
    }
  }
  return -1;
};

Array.prototype.f_convert = function <U>(model: U, predicate?: Function): Array<U> {
  if (predicate) {
    _checkPredicate(predicate);
  }

  const array: Array<U> = [];
  for (let index = 0, len = this.length; index < len; index += 1) {
    const element = this[index];
    const convertObj = predicate ? predicate(element) : {};

    const keys = Object.keys(model);
    keys.forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(convertObj, key)) {
        convertObj[key] = element[key] === undefined ? (model as any)[key] : element[key];
      }
    });
    array.push(convertObj);
  }

  return array;
};
