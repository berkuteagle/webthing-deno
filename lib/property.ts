import Thing from "./thing.ts";

export interface PropertyDescriptor {
  type: string;
}

export default class Property {
  constructor(
    protected thing: Thing,
    protected name: string,
    protected descriptor: PropertyDescriptor,
  ) {}

  public getName(): string {
    return this.name;
  }
}
