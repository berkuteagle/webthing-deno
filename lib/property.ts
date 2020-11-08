import { Evt } from "./deps.ts";

export default class Property<TValue> {
  private $evt: Evt<TValue>;
  constructor(private $value: TValue) {
    this.$evt = new Evt<TValue>();
  }

  get value(): TValue {
    return this.$value;
  }

  set value(val: TValue) {
    this.$value = val;
    this.$evt.post(val);
  }

  onValue(callback: (data: TValue) => void): void {
    this.$evt.attach(callback);
  }
}
