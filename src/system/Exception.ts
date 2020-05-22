export class IndexOutOfRangeException extends Error {
  constructor(message?: string) {
    super(`IndexOutOfRangeException：${(message ?? "索引超出了数组界限。")}`);
  }
}

export class NullReferenceException extends Error {
  constructor(message?: string) {
    super(`NullReferenceException：${(message ?? "未将对象引用到实例。")}`);
  }
}

export class FormatException extends Error {
  constructor(message?: string) {
    super(`FormatException：${(message ?? "输入字符串的格式不正确。")}`);
  }
}

export class OverflowException extends Error {
  constructor(message?: string) {
    super(`OverflowException：${(message ?? "检查上下文中的算术、强制转换或转换操作导致溢出。")}`);
  }
}

export class ArgumentOutOfRangeException extends Error {
  constructor(message?: string) {
    super(`ArgumentOutOfRangeException：${(message ?? "指定的参数已超出有效值的范围。")}`);
  }
}

export class NotImplementedException extends Error {
  constructor(message?: string) {
    super(`NotImplementedException：${(message ?? "未实现该方法或操作。")}`);
  }
}

export class TypeInitializationException extends Error {
  constructor(message?: string) {
    super(`TypeInitializationException：${(message ?? "类型初始化错误。")}`);
  }
}

export class ArgumentException extends Error {
  constructor(message?: string) {
    super(`ArgumentException：${(message ?? "指定的参数是非法的。")}`);
  }
}

export class InvalidOperationException extends Error {
  constructor(message?: string) {
    super(`InvalidOperationException：${(message ?? "无效的方法调用。")}`);
  }
}

