import { Task, Thread } from "../../src/threading";

interface tester {
  id: number;
  name: string;
}

const a: tester = {
  id: 1,
  name: "troy"
}

Task.run(async (t: Task, param: tester) => {
  for (let i = 0; i < 10; i++) {
    await Thread.sleep(500);
    console.log("task running", i);
  }
  console.log(a);
  console.log(param);
}, { id: 11, name: "troy11" });
