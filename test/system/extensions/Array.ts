import "../../../src/system/extensions";

var arr = [1];

const a = arr.f_skip(0);
console.log("f_skip 2 ", a);

console.log("f_page", arr.f_page(3, 4));

const arr1: Array<{ name: string; age: number }> = [
  {
    age: 1,
    name: "111",
  },
  {
    age: 2,
    name: "222",
  },
];

arr1.f_select<string>((k) => k.age.toString());

const defaultv = arr1.f_first((k) => k.age == 5);
console.log("f_first", defaultv);

var b = Array.f_isNullOrEmpty({});
console.log(b);

var range = ["a", "b", "c", "d", "e", "f", "g"];
console.log("getRange", range.f_getRange(5, 2));

range.f_insertRange(["1", "2", "3"], 1);
console.log("insertRange", range);

console.log("first", range.f_first());
console.log("firstOrDefault", range.f_firstOrDefault());
