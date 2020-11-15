import { Deferred, deferred } from "./deps.ts";

export enum ActionStatus {
  created,
  pending,
  finished,
  cancelled,
  error,
}

export default abstract class Action<TExecute, TCancel> {
  private $status: ActionStatus = ActionStatus.created;
  private $pending: Deferred<void>;
  private callback: (status: ActionStatus) => void;

  constructor() {
    this.$pending = deferred<void>();
    this.$pending.then(() => {
      this.status = ActionStatus.finished;
    }).catch((e) => {
      if (e) {
        this.status = ActionStatus.error;
      } else {
        this.status = ActionStatus.cancelled;
      }
    });
    this.callback = () => {};
  }

  async execute(data: TExecute): Promise<void> {
    if (this.status === ActionStatus.created) {
      this.status = ActionStatus.pending;
      try {
        const result = await this.$execute(data);
        this.$pending.resolve();
        return result;
      } catch (e) {
        this.$pending.reject(e);
      }
    }
    return Promise.reject();
  }

  async cancel(data: TCancel): Promise<void> {
    if (this.status === ActionStatus.pending) {
      const result = await this.$cancel(data);
      this.$pending.reject();
      return result;
    } else {
      this.$pending.reject();
    }
  }

  get status(): ActionStatus {
    return this.$status;
  }

  set status(stat: ActionStatus) {
    this.$status = stat;
    this.callback(stat);
  }

  protected abstract async $execute(data: TExecute): Promise<void>;
  protected abstract async $cancel(data: TCancel): Promise<void>;

  async *getActionStatusEvents(): AsyncIterableIterator<string> {
    while (true) {
      const status = await new Promise<ActionStatus>((resolve) => {
        this.callback = resolve;
      });
      yield JSON.stringify({ type: "ActionStatusChanged", data: status });
    }
  }
}
