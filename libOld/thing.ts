import Property from "./property.ts";
import Action from "./action.ts";
import { default as ThingJSON } from "../interface/Thing.ts";
import { 
  NoSecurityScheme,
  SecuritySchemeScheme,
} from "../interface/SecurityScheme.ts";
import DataSchema from "../interface/DataSchema.ts";

export interface ThingDescriptor {
  id: string;
  title: string;
  atType?: string;
  description?: string;
  properties?: Record<string, DataSchema>;
  actions?: Action[];
}

function buildProperties(
  thing: Thing,
  properties: Record<string, DataSchema>
): Record<string, Property> {
  const result: Record<string, Property> = {};
  for (const [name, descriptor] of Object.entries(properties)) {
    result[name] = new Property(thing, name, descriptor);
  }
  return result;
}

export default class Thing {
  protected actions: Action[];
  protected properties: Record<string, Property>;
  protected eventsQueue: Set<Event> = new Set();

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

  public getProperties(): Record<string, DataSchema> | undefined {
    return this.descriptor.properties;
  }

  public propertiesToJSON(
    path = "/"
  ): Record<string, DataSchema> | undefined {
    if (this.properties && Object.keys(this.properties).length) {
      const result: Record<string, DataSchema> = {};
      for (const [name, property] of Object.entries(this.properties)) {
        result[name] = property.toJSON();
        result[name].links = [{ href: path + "properties/" + name }];
      }
      return result;
    }
  }

  public getAtType(): string {
    return this.descriptor.atType || "Thing";
  }

  public toJSON(path = "/"): ThingJSON {
    const description = this.getDescription();
    const properties = this.propertiesToJSON(path);
    return {
      "@context": "https://www.w3.org/2019/wot/td/v1",
      "@type": this.getAtType(),
      id: this.getId(),
      title: this.getTitle(),
      description,
      properties,
      security: "somesec",
      securityDefinitions: {
        somesec: { scheme: SecuritySchemeScheme.NOSEC } as NoSecurityScheme,
      },
    };
  }
}
