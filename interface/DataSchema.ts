import MultiLanguage from "./MultiLanguage.ts";

export enum DataSchemeType {
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
  type?: DataSchemeType;
  const?: any;
  unit?: string;
  oneOf?: DataSchema[];
  enum?: any[];
  readOnly?: boolean;
  writeOnly?: boolean;
  format?: string;
}

export interface ArraySchema extends DataSchema {
  items?: DataSchema | DataSchema[];
  minItems?: number;
  maxItems?: number;
  type: DataSchemeType.ARRAY;
}

export interface BooleanSchema extends DataSchema {
  type: DataSchemeType.BOOLEAN;
}

export interface NumberSchema extends DataSchema {
  type: DataSchemeType.NUMBER;
  minimum?: number;
  maximum?: number;
}

export interface IntegerSchema extends DataSchema {
  type: DataSchemeType.INTEGER;
  minimum?: number;
  maximum?: number;
}

export interface ObjectSchema extends DataSchema {
  type: DataSchemeType.OBJECT;
  properties?: Record<string, DataSchema>;
  required?: string[];
}

export interface StringSchema extends DataSchema {
  type: DataSchemeType.STRING;
}

export interface NullSchema extends DataSchema {
  type: DataSchemeType.NULL;
}
