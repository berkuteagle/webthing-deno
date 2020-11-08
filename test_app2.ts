import Thing from "./lib/thing.ts";
import Property from "./lib/property.ts";
import Action from "./lib/action.ts";
import { Deferred, deferred } from "./lib/deps.ts";

const myThing = new Thing();
const myProperty = new Property<boolean>(false);
myThing.addProperty<boolean>("switch", myProperty);

class MyAction extends Action<boolean, boolean> {
  private $timeout = 0;
  $execute(): Deferred<boolean> {
    const def = deferred<boolean>();

    this.$timeout = setTimeout(() => {
      def.resolve(true);
    }, 5000);

    return def;
  }

  $cancel(): Promise<boolean> {
    if (this.$timeout) {
      clearTimeout(this.$timeout);
    }
    return Promise.resolve(false);
  }
}

const action = new MyAction();
console.log(await action.execute());

const res = await new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 15000);
  setInterval(() => {
    myProperty.value = !myProperty.value;
  }, 200);
});
