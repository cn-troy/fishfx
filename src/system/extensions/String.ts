export {};

declare global {
  interface StringConstructor {
    /**
     * 检查字符串是否是空字符串，PS：undefined、null、""、Function、Object等都会返回true
     * @param arg 需要检查的字符串
     */
    f_isNullOrEmpty(arg: any): boolean;
  }

  interface String {
    /**
     * 转换为小写 */
    f_toLower(): string;

    /**
     * 转换为大写 */
    f_toUpper(): string;

    /**
     * 验证字符串是 "" 空字符串（由于TS中，string无法为null，所以不需要isNullOrEmpty）*/
    f_isEmpty(): boolean;

    /**
     * 向字符串中插入新的字符串
     * @param value 需要插入的字符串
     * @param startIndex 插入字符串的下标
     */
    f_insert(value: string, startIndex: number): string;

    /**
     * 检测value字符串是否在此字符串中
     * @param value 需要检测的字符串
     */
    f_contains(value: string): boolean;

    /**
     * 删除字符串中的字符
     * @param startIndex 开始删除字符串的位置，包含该位置。
     * @param count 需要删除的长度，如果超过字符串的长度，则删除到字符串结尾。
     */
    f_remove(startIndex: number, count?: number): string;

    /**
     * 对字符串首尾进行裁减
     * @param trimString 当前字符串中需要裁减的部分，默认：空字符串
     */
    f_trim(trimString?: string): string;

    /**
     * 对字符串左侧进行裁减
     * @param trimString 当前字符串中需要裁减的部分，默认：空字符串
     */
    f_trimLeft(trimString?: string): string;

    /**
     * 对字符串左侧进行裁减
     * @param trimString 当前字符串中需要裁减的部分
     */
    f_trimRight(trimString?: string): string;

    /**
     * 替换字符串中的字符
     * @param oldValue 需要替换的字符串
     * @param newValue 替换成的字符串
     */
    f_replace(oldValue: string, newValue: string): string;

    /**
     * 验证字符串开头
     * @param value 需要检查的字符串
     * @param startIndex 开始查找的下标，默认：0
     * @param ignoreCase 是否区分大小写
     */
    f_startsWith(
      value: string,
      startIndex?: number,
      ignoreCase?: boolean
    ): boolean;

    /**
     * 验证字符串结尾
     * @param value 需要检查的字符串
     * @param length 字符串的长度，默认：length
     * @param ignoreCase 是否区分大小写
     */
    f_endsWith(value: string, length?: number, ignoreCase?: boolean): boolean;

    /**
     * 在字符串开头进行填充
     * @param totalWidth 填充后字符串的总长度
     * @param paddingValue 填充的字符串
     */
    f_padLeft(totalWidth: number, paddingValue?: string): string;

    /**
     * 在字符串结尾进行填充
     * @param totalWidth 填充后字符串的总长度
     * @param paddingValue 填充的字符串
     */
    f_padRight(totalWidth: number, paddingValue?: string): string;

    /**
     * 检查当前字符串是否是数字
     */
    f_isNumber(): boolean;

    /**
     * 检查字符串是否是日期
     */
    f_isDateTime(): boolean;
  }
}

String.f_isNullOrEmpty = function (arg: any): boolean {
  if (Object.prototype.toString.call(arg) != "[object String]") return true;

  return arg.length <= 0;
};

String.prototype.f_toLower = function (): string {
  return this.toLowerCase();
};

String.prototype.f_toUpper = function (): string {
  return this.toUpperCase();
};

String.prototype.f_isEmpty = function (): boolean {
  return this.length <= 0;
};

String.prototype.f_insert = function (
  value: string,
  startIndex: number
): string {
  return `${this.slice(0, startIndex)}${value}${this.slice(startIndex)}`;
};

String.prototype.f_contains = function (value: string): boolean {
  return this.indexOf(value) >= 0;
};

String.prototype.f_remove = function (
  startIndex: number,
  count?: number
): string {
  let endIndex = count === undefined ? this.length - 1 : startIndex + count - 1;

  if (endIndex > this.length) endIndex = this.length - 1;

  const chars = this.split("");
  const resultCahrs = [];
  for (let i = 0; i < chars.length; i++) {
    if (i >= startIndex && i <= endIndex) continue;

    resultCahrs.push(chars[i]);
  }

  return resultCahrs.join("");
};

String.prototype.f_trim = function (trimString?: string): string {
  if (trimString === undefined) return this.trim();

  return this.f_trimLeft(trimString).f_trimRight(trimString);
};

String.prototype.f_trimLeft = function (trimString?: string): string {
  if (trimString === undefined) return this.trimLeft();

  let trimmedString = this.toString();
  while (trimmedString.indexOf(trimString) === 0)
    trimmedString = trimmedString.f_remove(0, trimString.length);

  return trimmedString;
};

String.prototype.f_trimRight = function (trimString?: string): string {
  if (trimString === undefined) return this.trimRight();

  let trimmedString = this.toString();
  while (
    trimmedString.lastIndexOf(trimString) ===
    trimmedString.length - trimString.length
  )
    trimmedString = trimmedString.f_remove(
      trimmedString.length - trimString.length
    );

  return trimmedString;
};

String.prototype.f_replace = function (
  oldValue: string,
  newValue: string
): string {
  return this.replace(new RegExp(oldValue, "g"), newValue);
};

String.prototype.f_startsWith = function (
  value: string,
  startIndex?: number,
  ignoreCase?: boolean
): boolean {
  const start = startIndex ?? 0;

  if (ignoreCase === undefined || !ignoreCase)
    return (
      this.substring(start, start + value.length).f_toLower() ===
      value.f_toLower()
    );
  else {
    return this.substring(start, start + value.length) === value;
  }
};

String.prototype.f_endsWith = function (
  value: string,
  length?: number,
  ignoreCase?: boolean
): boolean {
  let len = length ?? this.length;
  return this.substring(len - value.length, len) === value;
};

String.prototype.f_padLeft = function (
  totalWidth: number,
  paddingValue?: string
): string {
  if (this.length >= totalWidth) return this.toString();

  const needPaddingWidth = totalWidth - this.length;
  const value = paddingValue ?? " ";
  if (needPaddingWidth <= value.length) {
    return `${value.substring(0, needPaddingWidth)}${this}`;
  }

  let needPaddingValue = value.repeat(
    Math.ceil(needPaddingWidth / value.length)
  );
  return `${needPaddingValue.f_remove(
    needPaddingWidth,
    needPaddingValue.length - needPaddingWidth
  )}${this}`;
};

String.prototype.f_padRight = function (
  totalWidth: number,
  paddingValue?: string
): string {
  if (this.length >= totalWidth) return this.toString();

  const needPaddingWidth = totalWidth - this.length;
  const value = paddingValue ?? " ";
  if (needPaddingWidth <= value.length) {
    return `${this}${value.substring(0, needPaddingWidth)}`;
  }

  let needPaddingValue = value.repeat(
    Math.ceil(needPaddingWidth / value.length)
  );
  return `${this}${needPaddingValue.f_remove(
    needPaddingWidth,
    needPaddingValue.length - needPaddingWidth
  )}`;
};

String.prototype.f_isNumber = function (): boolean {
  return !isNaN(Number(this));
};

String.prototype.f_isDateTime = function (): boolean {
  if (this.f_isNumber()) return false;

  const dateTime = new Date(this.toString());
  return dateTime instanceof Date && !isNaN(dateTime.getTime());
};
