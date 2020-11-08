import Thing from "./thing.ts";
import DataSchema, {
  DataSchemaType,
  NumberSchema,
} from "../interface/DataSchema.ts";

export default class Property {
  constructor(
    protected thing: Thing,
    protected name: string,
    protected descriptor: DataSchema
  ) {}

  public getName(): string {
    return this.name;
  }

  public toJSON(): DataSchema {
    return this.descriptor;
  }
}

export function getNumberPropertyDescriptor(
  minimum?: number,
  maximum?: number
): NumberSchema {
  return {
    type: DataSchemaType.NUMBER,
    minimum,
    maximum,
  };
}
