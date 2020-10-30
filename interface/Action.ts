import DataSchema from "./DataSchema.ts";
import Interaction from "./Interaction.ts";

export default interface Action extends Interaction {
  input?: DataSchema;
  output?: DataSchema;
  safe?: boolean;
  idempotent?: boolean;
}
