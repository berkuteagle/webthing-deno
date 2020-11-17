export default class Value<T> {
  private currentValue: T;
  private stream: ReadableStream;
  private controller: ReadableStreamDefaultController | null = null;

  constructor(value: T) {
    this.currentValue = value;
    this.stream = new ReadableStream<T>({
      start: (controller) => {
        this.controller = controller;
        controller.enqueue(value);
      },
    });
  }

  set value(val: T) {
    this.currentValue = val;
    this.controller?.enqueue(val);
  }

  get value(): T {
    return this.currentValue;
  }

  getEvents() {
    return this.stream.getIterator();
  }
}

export class ValueBoolean extends Value<boolean> {}
export class ValueNumber extends Value<number> {}
