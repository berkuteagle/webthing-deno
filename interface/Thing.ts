import Action from "./Action.ts";
import Property from "./Property.ts";
import Event from "./Event.ts";
import MultiLanguage from "./MultiLanguage.ts";
import Link from "./Link.ts";
import Form from "./Form.ts";
import SecurityScheme from "./SecurityScheme.ts";

export interface VersionInfo {
  instance: string;
}

export default interface Thing {
  "@context": string;
  "@type"?: string;
  id?: string;
  title: string;
  titles?: MultiLanguage;
  description?: string;
  descriptions?: MultiLanguage;
  version?: VersionInfo;
  created?: Date;
  modified?: Date;
  support?: string;
  base?: string;
  properties?: Record<string, Property>;
  actions?: Record<string, Action>;
  events?: Record<string, Event>;
  links?: Link[];
  forms?: Form[];
  security: string|string[];
  securityDefinitions: Record<string, SecurityScheme>;
}
