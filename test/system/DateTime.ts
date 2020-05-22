import { DateTime, TimeSpan } from '../../src/system'

const time1 = new DateTime("2020-4-18 16:40:06.520");
console.log("time1 toString", time1.toString());
console.log("year", time1.year);
console.log("month", time1.month);
console.log("day", time1.day);
console.log("hour", time1.hour);
console.log("minute", time1.minute);
console.log("second", time1.second);
console.log("millisecond", time1.millisecond);

const addMillisTime = time1.addMilliseconds(1000);
console.log("addMillisTime", addMillisTime.toString("yyyy-MM-dd HH:mm:ss f"));

const addSecondTime = time1.addSeconds(61);
console.log("addSecondTime", addSecondTime.toString("yyyy-MM-dd HH:mm:ss f"));

const addMinutesTime = time1.addMinutes(1);
console.log("addMinutesTime", addMinutesTime.toString("yyyy-MM-dd HH:mm:ss f"));

const time2 = new DateTime("2019-12-5 12:12:12");
console.log("addMonths", time2.addMonths(2).toString("yyyy-MM-dd HH:mm:ss f"));

const time3 = new DateTime("2019-12-5 12:12:12");
console.log("addYear", time3.addYear(2).toString("yyyy-MM-dd HH:mm:ss f"));

const time4 = new DateTime("2020-4-18 16:40:07.000");
console.log("time -", (time4 as any) - (time1 as any));

const time5 = new DateTime("2020-1-1 16:40:07.520");
console.log("dayOfYear", time5.dayOfYear);