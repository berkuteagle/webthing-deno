import Property, { PropertyDescriptor } from "./property.ts";
import Action from "./action.ts";

export interface ThingDescriptor {
  id: string;
  title: string;
  atType?: string;
  description?: string;
  properties?: Record<string, PropertyDescriptor>;
  actions?: Action[];
}

export interface ThingJSON {
  "@context": string;
  "@type": string;
  id: string;
  title: string;
  titles?: string[];
  description?: string;
  descriptions?: string[];
}

function buildProperties(
  thing: Thing,
  properties: Record<string, PropertyDescriptor>,
): Record<string, Property> {
  const result: Record<string, Property> = {};
  for (let [name, descriptor] of Object.entries(properties)) {
    result[name] = new Property(thing, name, descriptor);
  }
  return result;
}

export default class Thing {
  protected actions: Action[];
  protected properties: Record<string, Property>;

  constructor(protected descriptor: ThingDescriptor) {
    this.properties = descriptor.properties
      ? buildProperties(this, descriptor.properties)
      : {};
    this.actions = descriptor.actions || [];
  }

  public getId(): string {
    return this.descriptor.id;
  }

  public getTitle(): string {
    return this.descriptor.title;
  }

  public getDescription(): string | undefined {
    return this.descriptor.description;
  }

  public getAtType(): string {
    return this.descriptor.atType || "Thing";
  }

  public toJSON(): ThingJSON {
    const description = this.getDescription();
    return {
      "@context": "https://www.w3.org/2019/wot/td/v1",
      "@type": this.getAtType(),
      id: this.getId(),
      title: this.getTitle(),
      description,
    };
  }
}
