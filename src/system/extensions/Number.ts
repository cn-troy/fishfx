export { };

declare global {
  interface Number {
    /**
     * 将数字转换为中文短数字，如 1820 -> 1千、19000 -> 1.9万
     * @param startNumber 开始转换时的数，如果没有达到该数，则返回原始值。
     */
    f_toChineseSimplify(startNumber?: number): string;

    /**
     * 转换为金额模式，千分位将使用逗号隔开。
     * @param fixed 小数点后保留位数，默认：2
     */
    f_toMoney(fixed?: number): string
  }
}


Number.prototype.f_toChineseSimplify = function (startNumber: number = 0): string {
  if (!isFinite(this))
    return "NaN";

  if (this < startNumber || this < 99) {
    return this.toString();
  }

  const resultVals: Array<string> = ['', ''];
  let size: number = 100;
  let bit: number = 2;
  while ((this / size) >= 1) {
    size *= 10;
    bit += 1;
  }

  if (bit <= 3) {
    resultVals[1] = '百';
    resultVals[0] = Math.floor(this / 100).toString();
  } else if (bit <= 4) {

    resultVals[1] = '千';
    resultVals[0] = Math.floor(this / 1000).toString();
  } else if (bit <= 8) {

    const complateVal = parseInt(`${bit - 4}`, 0) / 3 > 1 ? '千万' : '万';
    const complateBit = complateVal === '万' ? 10000 : 10000000;
    resultVals[1] = complateVal;
    resultVals[0] = complateVal === '万' ? (this / complateBit).toFixed(1) : parseInt(`${this / complateBit}`, 0).toString();
  } else if (bit <= 16) {

    let complateVal = (bit - 8) / 3 > 1 ? '千亿' : '亿';
    complateVal = (bit - 8) / 4 > 1 ? '万亿' : complateVal;
    complateVal = (bit - 8) / 7 > 1 ? '千万亿' : complateVal;

    let complateBit = 1;
    if (complateVal === '亿') {
      complateBit = 100000000;
    } else if (complateVal === '千亿') {
      complateBit = 100000000000;
    } else if (complateVal === '万亿') {
      complateBit = 1000000000000;
    } else if (complateVal === '千万亿') {
      complateBit = 1000000000000000;
    }
    resultVals[1] = complateVal;
    resultVals[0] = parseInt(`${this / complateBit}`, 0).toString();
  }
  return resultVals.join('');
};

Number.prototype.f_toMoney = function (fixed: number = 2): string {
  if (!isFinite(this))
    return "NaN";

  const numFixed = this.toFixed(fixed);

  let point = "";
  if (numFixed.indexOf(".") > 0) {
    point = numFixed.substr(numFixed.indexOf("."));
  }

  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  return (`${this}`).replace(reg, "$&,") + point;
}