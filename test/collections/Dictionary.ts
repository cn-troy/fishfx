import { Dictionary } from '../../src/collections';

const l: Dictionary<number, string> = new Dictionary<number, string>(
  [
    { key: 1, value: "a" },
    { key: 2, value: "b" }
  ]
);

const keys = l.keys;

const values = l.values;

const count = l.count;

const hasKey = l.containsKey(2);

l.add(3, "c");

const hasValue = l.containsValue("c");

const removed = l.remove(1)

const got = l.tryGetValue(3);

for (let item of l) {
  console.log(item.toString());
  // l.remove(3);
}

// 模拟异常
l.forEach((key, value, index) => {
  console.log(key, value, index);
  l.remove(3);
});
