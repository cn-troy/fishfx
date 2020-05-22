import { NotImplementedException, ArgumentOutOfRangeException } from "./Exception";

export default class DateTime {
  private _tickes: number = 0;
  private _date: Date;

  private _ticksPerMillisecond: number = 1;
  private _ticksPerSecond: number = this._ticksPerMillisecond * 1000;
  private _ticksPerMinute: number = this._ticksPerSecond * 60;
  private _ticksPerHour: number = this._ticksPerMinute * 60;
  private _ticksPerDay: number = this._ticksPerHour * 24;


  private _millisPerSecond = 1000;
  private _millisPerMinute = this._millisPerSecond * 60;
  private _millisPerHour = this._millisPerMinute * 60;
  private _millisPerDay = this._millisPerHour * 24;

  private static readonly _s_daysToMonth365: Array<number> = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  private static readonly _s_daysToMonth366: Array<number> = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

  constructor(time: string)
  constructor(ticks?: number)
  constructor(time: any, ticks?: any) {
    if (typeof ticks === "undefined") {
      this._date = new Date(time);
      this._tickes = this._date.getTime();
    } else {
      this._tickes = ticks;
      this._date = new Date(ticks);
    }
  }

  public static get now(): DateTime {
    return new DateTime(new Date().getTime());
  }

  public get tickes(): number {
    return this._tickes;
  }

  public get year(): number {
    return this._date.getFullYear();
  }

  public get month(): number {
    return this._date.getMonth() + 1;
  }

  public get day(): number {
    return this._date.getDate();
  }

  public get hour(): number {
    return this._date.getHours();
  }

  public get minute(): number {
    return this._date.getMinutes();
  }

  public get second(): number {
    return this._date.getSeconds();
  }

  public get millisecond(): number {
    return this._date.getMilliseconds();
  }

  public get dayOfYear(): number {
    const days = DateTime.isLeapYear(this.year) ? DateTime._s_daysToMonth366 : DateTime._s_daysToMonth365;
    return days[this.month - 1] + this.day;
  }

  public get dayOfWeek(): number {
    return this._date.getDay();
  }

  public addYear(value: number): DateTime {
    return this.addMonths(value * 12);
  }

  public addMonths(value: number): DateTime {
    // 该算法需要进一步优化
    let date = new DateTime(this._tickes);
    for (let i = 0; i < value; i++) {
      const days = DateTime.isLeapYear(date.year) ? DateTime._s_daysToMonth366 : DateTime._s_daysToMonth365;
      date = date.addDays(days[date.month] - days[date.month - 1]);
    }
    return date;
  }

  public addDays(value: number): DateTime {
    return this._add(value, this._millisPerDay);
  }

  public addHours(value: number): DateTime {
    return this._add(value, this._millisPerHour);
  }

  public addMinutes(value: number): DateTime {
    return this._add(value, this._millisPerMinute);
  }

  public addSeconds(value: number): DateTime {
    return this._add(value, this._millisPerSecond);
  }

  public addMilliseconds(value: number): DateTime {
    return this._add(value, 1);
  }

  public addTicks(value: number): DateTime {
    return this.addMilliseconds(value);
  }

  public addYears(value: number): DateTime {
    throw new NotImplementedException();
  }

  public static isLeapYear(year: number): boolean {
    if (year < 1970 || year > 9999) {
      throw new ArgumentOutOfRangeException();
    }
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  }


  public isLeapYear(): boolean {
    return DateTime.isLeapYear(this.year);
  }

  private _add(value: number, scale: number): DateTime {
    const millis = parseInt(value.toString()) * scale;
    return new DateTime(this._tickes + millis);
  }


  /**
   * 当使用 >, <, >=, <= 等关系运算符时，js自动调用toString，并使用返回值进行运算
   */
  toString(format: string): string
  toString(): number
  toString(format?: string): any {
    if (typeof format === "string") {
      return this._date.f_toString(format);
    } else {
      return this._tickes;
    }

  }
}
