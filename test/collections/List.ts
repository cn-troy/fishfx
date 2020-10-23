import { List } from '../../src/collections';



const arr = [1, 2, 3, 4];

const l: List<number> = new List<number>(arr);
l.addRange([5, 6, 7])
l.insertRange(2, [9, 9, 9])

console.log(arr);
console.log(l);
const first = l[0];
// for (let i = 0; i < l.length; i++) {
//   l.removeAt(i);
//   console.log("for", l.get(i));
// }

// console.log(l.items);

// for (let item of l) {
//   l.remove(item)
//   console.log("for of", item)
// }

l.forEach((item, index) => {
  console.log(item)
})