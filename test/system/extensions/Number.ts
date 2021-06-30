import "../../../src/system/extensions";

const num1 = 19000;
console.log("f_toChineseSimplify", num1.f_toChineseSimplify());

const num2 = 19000;
console.log("f_toMoney 0", num2.f_toMoney());

const num3: unknown = 0;
console.log(Number.f_equals(num3, 2));

let num4: number = 1;
console.log(num4.f_toPercent());

num4 = 0.1;
console.log(num4.f_toPercent());

num4 = 0.1111;
console.log(num4.f_toPercent());

const number5 = 2.5;
console.log(number5.f_toMoney());
console.log((1234562.536).f_toMoney());
