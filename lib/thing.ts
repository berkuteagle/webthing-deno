import Property from "./property.ts";
import Action from "./action.ts";

export default class Thing {
  private $properties: Set<Property<any>>;
  private $propNames: WeakMap<Property<any>, string>;
  private $actions: Map<string, typeof Action>;

  constructor() {
    this.$properties = new Set();
    this.$propNames = new WeakMap();
    this.$actions = new Map();
  }

  addProperty<TValue>(name: string, property: Property<TValue>): void {
    this.$properties.add(property);
    this.$propNames.set(property, name);
    property.onValue((value) => {
      console.log(`from thing event listener ${value}`);
    });
  }

  addAction(name: string, ctor: typeof Action): void {
    this.$actions.set(name, ctor);
  }

  async executeAction<TAction>(name: string): Promise<void> {
    const Ctor = this.$actions.get(name);
    if (Ctor) {
      return new Ctor().execute();
    }
    return Promise.reject();
  }
}
