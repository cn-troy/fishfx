import '../../../src/system/extensions';
import { TimeSpan } from '../../../src/system';


const time1: Date = new Date("2019-5-22 18:50:12.520");
console.log("time1 f_toString", time1.f_toString());
console.log("time1 f_toString('yyyy-MM-dd HH:mm:ss')", time1.f_toString('yyyy-MM-dd HH:mm:ss'));