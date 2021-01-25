export {};

declare global {
  interface BooleanConstructor {
    /**
     * 检查是否有值, null、undefined等将返回false
     * @param arg 需要验证参数
     */
    f_hasValue(arg: any): boolean;
  }
}

Boolean.f_hasValue = function (arg: any): boolean {
  if (Object.prototype.toString.call(arg) != "[object Boolean]") return false;

  return true;
};
