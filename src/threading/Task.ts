import { ThreadStatus } from "./ThreadStatus";

export default class Task {
  private _action: Function;
  private _handle: number;
  private _status: ThreadStatus = ThreadStatus.Stopped;
  constructor(action?: Function) {
    if (typeof action === "function") {
      this._action = action;
    }
  }

  public get status(): ThreadStatus {
    return this._status;
  }

  public static run(action: (task: Task, param: any) => void, param?: any): void {
    const t: Task = new Task(action);
    t.start(param);
  }

  public start(param?: any) {
    if (this._status === ThreadStatus.Running) return;

    this._handle = setTimeout(this._action, 0, ...[this, param]);
    this._status = ThreadStatus.Running;
  }

  public stop() {
    if (this._status === ThreadStatus.Stopped) return;

    clearTimeout(this._handle);
    this._status = ThreadStatus.Stopped;
  }
}