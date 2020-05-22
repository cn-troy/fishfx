import { DateTime, TimeSpan } from '../../src/system'

const beginTime: DateTime = new DateTime("2020-4-1 11:22:55");
const endTime: DateTime = new DateTime("2020-7-22 12:52:32");

const span = new TimeSpan(endTime, beginTime);

console.log(span.totalDays);