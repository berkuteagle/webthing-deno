import Thing from "./libOld/thing.ts";
import Server from "./libOld/server.ts";
import { getNumberPropertyDescriptor } from "./libOld/property.ts";
import Action from "./libOld/action.ts";

new Server(
  new Thing({
    id: "urn:iot:webthing:vendor:model:revision",
    title: "my-webthing",
    properties: {
      level: getNumberPropertyDescriptor(0, 300),
    },
    actions: [new Action(), new Action()],
  }),
)
  .setPorts(8080, 8443)
  .run();
