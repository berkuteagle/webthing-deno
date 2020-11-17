import { Deferred, deferred } from "./deps.ts";

export enum ActionStatus {
  created,
  pending,
  finished,
  cancelled,
  error,
}

export default abstract class Action<TExecute, TCancel> {
  private $pending: Deferred<void>;
  private currentStatus: ActionStatus = ActionStatus.created;
  private stream: ReadableStream<ActionStatus>;
  private controller: ReadableStreamDefaultController | null = null;

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
    this.stream = new ReadableStream<ActionStatus>({
      start: (controller) => {
        this.controller = controller;
        controller.enqueue(this.currentStatus);
      },
      cancel: () => {
        this.controller = null;
      },
    });
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
    return this.currentStatus;
  }

  set status(stat: ActionStatus) {
    this.currentStatus = stat;
    this.controller?.enqueue(stat);
    if (
      stat === ActionStatus.finished ||
      stat === ActionStatus.cancelled ||
      stat === ActionStatus.error
    ) {
      this.controller?.close();
    }
  }

  protected abstract async $execute(data: TExecute): Promise<void>;
  protected abstract async $cancel(data: TCancel): Promise<void>;

  async *getActionStatusEvents(): AsyncIterableIterator<string> {
    for await (const ev of this.stream.getIterator()) {
      yield JSON.stringify({ type: "ActionStatusChanged", data: ev });
    }
  }
}
