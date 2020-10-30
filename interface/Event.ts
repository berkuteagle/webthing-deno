import DataSchema from "./DataSchema.ts";
import Interaction from "./Interaction.ts";

export default interface Event extends Interaction {
  subscription?: DataSchema;
  data?: DataSchema;
  cancellation?: DataSchema;
}
