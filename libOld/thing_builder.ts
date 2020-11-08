import Action from "./action.ts";
import Thing from "./thing.ts";

export default class ThingBuilder {
  private _action: Map<string, Action>;

  constructor() {
    this._action = new Map();
  }

  public addAction(name: string, action: Action): ThingBuilder {
    this._action.set(name, action);
    return this;
  }

  public build(): Thing {
    return new Thing({ actions: Object.fromEntries(this._action) });
  }
}
