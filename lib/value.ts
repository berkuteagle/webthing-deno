import { MuxAsyncIterator } from "./deps.ts";

export default class Value<T> {
  private currentValue: T;
  private queue: T[];
  private callback: (event: T) => void;

  constructor(value: T) {
    this.currentValue = value;
    this.queue = [value];
    this.callback = () => {};
  }

  set value(val: T) {
    this.currentValue = val;
    this.queue.push(val);
    this.callback(val);
  }

  get value(): T {
    return this.currentValue;
  }

  getEvents() {
    const mux = new MuxAsyncIterator<T>();
    mux.add(this.getEventsInQueue());
    mux.add(this.getEventsInFuture());
    return mux;
  }

  private async *getEventsInFuture(): AsyncIterableIterator<T> {
    while (true) {
      const event = await new Promise<T>((resolve) => {
        this.callback = resolve;
      });
      yield event;
    }
  }

  private async *getEventsInQueue(): AsyncIterableIterator<T> {
    for (const ev of this.queue) {
      yield Promise.resolve(ev);
    }
  }
}

export class ValueBoolean extends Value<boolean> {}
export class ValueNumber extends Value<number> {}
