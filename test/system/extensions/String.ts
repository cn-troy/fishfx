import "../../../src/system/extensions/index";

console.log("f_toLower", "CN.Troy&鱼摆摆".f_toLower() === "cn.troy&鱼摆摆");

console.log("f_toUpper", "cn.troy&鱼摆摆".f_toUpper() === "CN.TROY&鱼摆摆");

console.log("f_isEmpty", !"鱼摆摆".f_isEmpty());

console.log("f_isEmpty", "".f_isEmpty());

console.log("f_insert", "鱼摆摆".f_insert("cn.troy", 2) === "鱼摆cn.troy摆");

console.log("f_contains", !"鱼摆摆,cn.troy".f_contains("BrendanEich"));
console.log("f_contains", "鱼摆摆,cn.troy".f_contains("摆摆"));

console.log("f_remove", "鱼摆摆,cn.troy".f_remove(3) === "鱼摆摆");
console.log("f_remove", "鱼摆摆,cn.troy".f_remove(3, 1) === "鱼摆摆cn.troy");

console.log(
  "f_trim",
  "cn.troy 鱼摆摆 cn.troy".f_trim("cn.troy") === " 鱼摆摆 "
);
console.log("f_trim", "   鱼摆摆 ".f_trim() === "鱼摆摆");
console.log("f_trim", "###鱼摆摆#".f_trim("#") === "鱼摆摆");

console.log(
  "f_trimLeft",
  "cn.troy 鱼摆摆 cn.troy".f_trimLeft("cn.troy") === " 鱼摆摆 cn.troy"
);
console.log("f_trimLeft", "   鱼摆摆 ".f_trimLeft() === "鱼摆摆 ");
console.log("f_trimLeft", "###鱼摆摆#".f_trimLeft("#") === "鱼摆摆#");

console.log(
  "f_trimRight",
  "cn.troy 鱼摆摆 cn.troy".f_trimRight("cn.troy") === "cn.troy 鱼摆摆 "
);
console.log("f_trimRight", "   鱼摆摆 ".f_trimRight() === "   鱼摆摆");
console.log("f_trimRight", "###鱼摆摆#".f_trimRight("#") === "###鱼摆摆");

console.log(
  "f_replace",
  "鱼摆摆,cn.troy,鱼摆摆".f_replace(",", "&") === "鱼摆摆&cn.troy&鱼摆摆"
);

console.log("f_startsWith", "鱼摆摆,cn.troy".f_startsWith("鱼摆摆"));
console.log("f_startsWith", !"鱼摆摆,cn.troy".f_startsWith("cn.troy"));

console.log("f_endsWith", !"鱼摆摆,cn.troy".f_endsWith("鱼摆摆"));
console.log("f_endsWith", "鱼摆摆,cn.troy".f_endsWith("cn.troy"));

console.log("f_padLeft", "鱼摆摆".f_padLeft(5, "troy") === "tr鱼摆摆");
console.log("f_padLeft", "鱼摆摆".f_padLeft(9, "troy") === "troytr鱼摆摆");
console.log("f_padLeft", "鱼摆摆".f_padLeft(2, "troy") === "鱼摆摆");

console.log("f_padRight", "鱼摆摆".f_padRight(5, "troy") === "鱼摆摆tr");
console.log("f_padRight", "鱼摆摆".f_padRight(9, "troy") === "鱼摆摆troytr");
console.log("f_padRight", "鱼摆摆".f_padRight(2, "troy") === "鱼摆摆");

console.log("f_isNumber", "1.00".f_isNumber());
console.log("f_isNumber", "+1.00".f_isNumber());
console.log("f_isNumber", "-1.00".f_isNumber());
console.log("f_isNumber", !"鱼摆摆".f_isNumber());

console.log("f_isDateTime", "2020-4-12".f_isDateTime());
console.log("f_isDateTime", "2020-4-12 12:15".f_isDateTime());
console.log("f_isDateTime", "2020/4/12 12:15:05".f_isDateTime());
console.log("f_isDateTime", !"2020-4-12 12".f_isDateTime());
console.log("f_isDateTime", !"鱼摆摆".f_isDateTime());

console.log("isNullOrEmpty", String.f_isNullOrEmpty(null));

console.log("f_toCamelCase", "ABC".f_toCamelCase());
