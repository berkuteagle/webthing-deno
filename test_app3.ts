import Value, { ValueBoolean } from "./lib/value.ts";
import Property from "./lib/property.ts";
import { MuxAsyncIterator } from "./lib/deps.ts";

const v1 = new Value<number>(0);
const v2 = new ValueBoolean(false);
const p1 = new Property(v1);
const p2 = new Property(v2);

setInterval(() => {
  v1.value++;
}, 300);

setInterval(() => {
  v2.value = !v2.value;
}, 500);

const mux = new MuxAsyncIterator<string>();
mux.add(p1.getValueChangeEvents());
mux.add(p2.getValueChangeEvents());

for await (const ev of mux) {
  console.log(ev);
}
