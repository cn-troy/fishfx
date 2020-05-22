import "./extensions/String";
import { FormatException, OverflowException } from "./Exception";
export default class Convert {
  /**
   * 将字符串转换为Number类型
   * @param value 需要转换的字符串
   * @param fromBase 数值进制基数，必须是：2,8,10,16（当前仅支持10进制）
   */
  public static toNumber(value: string, fromBase: number = 10): number {
    if (!value.f_isNumber())
      throw new FormatException();

    switch (fromBase) {
      case 10:
        return Number(value);
      default:
        throw new OverflowException("转换为Number时，fromBase仅支持：2,8,10,16");
    }

  }

  /**
   * 将字符串转为Date类型
   * @param value 需要转换的字符串、时间戳
   */
  public static toDateTime(value: string | number): Date {
    if (typeof value === "number")
      return new Date(value);

    if (!value.f_isDateTime())
      throw new FormatException();

    return new Date(value);
  }
}