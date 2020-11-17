import Value, { ValueBoolean, ValueNumber } from "./lib/value.ts";
import Property from "./lib/property.ts";
import { MuxAsyncIterator } from "./lib/deps.ts";
import Action from "./lib/action.ts";

const v1 = new Value<number>(0);
const v2 = new ValueBoolean(false);
const p1 = new Property(v1);
const p2 = new Property(v2);

class FadeAction extends Action<number, number> {
  private $timer = 0;
  private $prop: Property<ValueNumber>;

  constructor(prop: Property<ValueNumber>) {
    super();
    this.$prop = prop;
  }
  protected async $execute(data: number): Promise<void> {
    return new Promise((resolve) => {
      this.$timer = setTimeout(() => {
        console.log("action_done_with_" + data);
        this.$prop.setValue(data);
        resolve();
      }, data);
    });
  }
  protected async $cancel(data: number): Promise<void> {
    if (this.$timer) {
      clearTimeout(this.$timer);
      this.$timer = 0;
      console.log("action_cancelled_with_" + data);
    }
  }
}

const a1 = new FadeAction(p1);

setInterval(() => {
  v1.value++;
}, 300);

setInterval(() => {
  v2.value = !v2.value;
}, 500);

const mux = new MuxAsyncIterator<string>();
mux.add(p1.getValueChangeEvents());
mux.add(p2.getValueChangeEvents());
mux.add(a1.getActionStatusEvents());

setTimeout(() => {
  a1.execute(1000);
}, 1000);

for await (const ev of mux) {
  console.log(ev);
}
