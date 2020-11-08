import { Deferred, deferred } from "./deps.ts";

export enum ActionStatus {
  created,
  pending,
  finished,
  cancelled,
}

export default abstract class Action<TExecute, TCancel> {
  private $status: ActionStatus = ActionStatus.created;
  private $pending: Deferred<TExecute>;

  constructor() {
    this.$pending = deferred<TExecute>();
    this.$pending.then(() => {
      this.$status = ActionStatus.finished;
    }).catch(() => {
      this.$status = ActionStatus.cancelled;
    });
  }

  async execute(): Promise<TExecute> {
    if (this.$status === ActionStatus.created) {
      this.$status = ActionStatus.pending;
      const result = await this.$execute();
      this.$pending.resolve();
      return result;
    }
    return Promise.reject();
  }

  async cancel(): Promise<TCancel | void> {
    if (this.$status === ActionStatus.pending) {
      const result: TCancel = await this.$cancel();
      this.$pending.reject();
      return result;
    }
    return Promise.reject();
  }

  protected abstract async $execute(): Promise<TExecute>;
  protected abstract async $cancel(): Promise<TCancel>;
}
