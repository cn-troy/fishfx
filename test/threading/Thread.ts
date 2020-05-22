import { Thread, ThreadStatus } from '../../src/threading';
import { DateTime } from '../../src/system';

(async function () {
  console.log("sleep begin", DateTime.now.toString("yyyy-MM-dd HH:mm:ss f"));
  await Thread.sleep(1000)
  console.log("sleep end", DateTime.now.toString("yyyy-MM-dd HH:mm:ss f"));
}());


