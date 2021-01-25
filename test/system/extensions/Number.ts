import "../../../src/system/extensions";

const num1 = 19000;
console.log("f_toChineseSimplify", num1.f_toChineseSimplify());

const num2 = 19000;
console.log("f_toMoney 0", num2.f_toMoney());

const num3: unknown = 0;
console.log(Number.f_equals(num3, 2));
