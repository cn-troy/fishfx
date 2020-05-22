import DateTime from '../DateTime';

declare global {
  interface Date {
    /**
     * 格式化输出字符串（暂时不支持12小时制输出）
     * @param format 格式化字符串，如：yyyy-MM-dd HH:mm:ss f
     */
    f_toString(format?: string): string

    /**
     * 返回DateTime对象。
     */
    f_toDateTime(): DateTime;
  }
}

Date.prototype.f_toString = function (format?: string): string {
  if (format === undefined)
    return this.toString();

  let result = format;
  const timeReplaceKey: any = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    // "h+": this.getHours(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "f+": this.getMilliseconds()
  };

  if (/(y+)/.test(result)) {
    result = result.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length));
  }

  Object.keys(timeReplaceKey).forEach(k => {
    if (new RegExp(`(${k})`).test(result)) {
      let replaceStr = "";
      if (RegExp.$1.length === 1) {
        replaceStr = timeReplaceKey[k];
      } else {
        replaceStr = `00${timeReplaceKey[k]}`.substring(timeReplaceKey[k].toString().length);
      }
      result = result.replace(RegExp.$1, replaceStr);
    }
  });

  return result;
}

Date.prototype.f_toDateTime = function (): DateTime {
  return new DateTime(this.getTime());
}