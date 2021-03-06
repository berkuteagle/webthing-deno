import Value from "./value.ts";

type TValueType = number | string | boolean;

export default class Property<
  TValue extends Value<number> | Value<string> | Value<boolean>,
> {
  constructor(private value: TValue) {
  }

  setValue(value: TValueType): void {
    this.value.value = value;
  }

  async *getValueChangeEvents(): AsyncIterableIterator<string> {
    for await (const ev of this.value.getEvents()) {
      yield JSON.stringify({ type: "ValueChanged", data: ev });
    }
  }
}
