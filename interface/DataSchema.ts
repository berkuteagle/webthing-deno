import Link from "./Link.ts";
import MultiLanguage from "./MultiLanguage.ts";

export enum DataSchemaType {
  OBJECT = "object",
  ARRAY = "array",
  STRING = "string",
  NUMBER = "number",
  INTEGER = "integer",
  BOOLEAN = "boolean",
  NULL = "null",
}

export default interface DataSchema {
  "@type"?: string | string[];
  title?: string;
  titles?: MultiLanguage;
  description?: string;
  descriptions?: MultiLanguage;
  type?: DataSchemaType;
  const?: any;
  unit?: string;
  oneOf?: DataSchema[];
  enum?: any[];
  readOnly?: boolean;
  writeOnly?: boolean;
  format?: string;
  links?: Link[];
}

export interface ArraySchema extends DataSchema {
  items?: DataSchema | DataSchema[];
  minItems?: number;
  maxItems?: number;
  type: DataSchemaType.ARRAY;
}

export interface BooleanSchema extends DataSchema {
  type: DataSchemaType.BOOLEAN;
}

export interface NumberSchema extends DataSchema {
  type: DataSchemaType.NUMBER;
  minimum?: number;
  maximum?: number;
}

export interface IntegerSchema extends DataSchema {
  type: DataSchemaType.INTEGER;
  minimum?: number;
  maximum?: number;
}

export interface ObjectSchema extends DataSchema {
  type: DataSchemaType.OBJECT;
  properties?: Record<string, DataSchema>;
  required?: string[];
}

export interface StringSchema extends DataSchema {
  type: DataSchemaType.STRING;
}

export interface NullSchema extends DataSchema {
  type: DataSchemaType.NULL;
}
