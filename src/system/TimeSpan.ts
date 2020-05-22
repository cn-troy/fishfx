import { DateTime } from '.';
import { TypeInitializationException } from './Exception';

/**
 * timeSpan表示持续时间。
 */
export default class timeSpan {
  /**
   * 使用毫秒数(时间戳)进行初始化
   * @param tickes 持续的毫秒数
   */
  constructor(tickes: number)
  /**
   * 使用dateTime进行初始化
   * @param biggerTime 较大的时间
   * @param smallerTime 较小的时间
   */
  constructor(biggerTime: DateTime, smallerTime: DateTime)
  /**
   * 使用Date进行初始化
   * @param biggerTime 较大的时间
   * @param smallerTime 较小的时间
   */
  constructor(biggerTime: Date, smallerTime: Date)
  constructor(biggerTimeOrTickes: DateTime | number | Date, smallerTime?: DateTime | Date) {
    if (typeof biggerTimeOrTickes === "number") {
      this._ticks = biggerTimeOrTickes;
    } else if (biggerTimeOrTickes instanceof DateTime && smallerTime instanceof DateTime) {
      this._ticks = biggerTimeOrTickes.tickes - smallerTime.tickes;
    } else if (biggerTimeOrTickes instanceof Date && smallerTime instanceof Date) {
      this._ticks = biggerTimeOrTickes.getTime() - smallerTime.getTime();
    } else {
      throw new TypeInitializationException("初始化 timeSpan 时发生参数类型错误，构造函数仅支持 number, dateTime, Date");
    }
  }

  private _ticks: number;

  /**
   * js中，ticks实质上就是毫秒数。
   */
  public get ticks(): number {
    return this._ticks;
  }

  /**
   * 持续总天数
   */
  public get days(): number {
    return Math.round(this._ticks / 1000 / 60 / 60 / 24);
  }

  /**
   * 持续的小时数，注意：不是总的小时数。
   */
  public get hours(): number {
    return Math.round((this._ticks / 1000 / 60 / 60) % 24);
  }

  /**
   * 持续的分钟，注意：不是总的分钟数。
   */
  public get minutes(): number {
    return Math.round((this._ticks / 1000 / 60) % 60);
  }

  /**
   * 持续的秒，注意：不是总的秒数。
   */
  public get seconds(): number {
    return Math.round((this._ticks / 1000) % 60);
  }

  /**
   * 持续的毫秒数，注意：不是总的毫秒时数。
   */
  public get milliseconds(): number {
    return Math.round(this._ticks % 1000);
  }


  /**
   * 持续的总天数
   */
  public get totalDays(): number {
    return Math.round(this._ticks / 1000 / 60 / 60 / 24);
  }

  /**
   * 持续的总小时数
   */
  public get totalHours(): number {
    return Math.round(this._ticks / 1000 / 60 / 60);
  }

  /**
   * 持续的总分钟数
   */
  public get totalMinutes(): number {
    return Math.round(this._ticks / 1000 / 60);
  }

  /**
   * 持续的总秒数
   */
  public get totalSeconds(): number {
    return Math.round(this._ticks / 1000);
  }

  /**
   * 持续的总毫秒数
   */
  public get totalMilliseconds(): number {
    if (this._ticks > Number.MAX_VALUE)
      return Number.MAX_VALUE;

    if (this._ticks < Number.MIN_VALUE)
      return Number.MIN_VALUE;

    return this._ticks;
  }

}