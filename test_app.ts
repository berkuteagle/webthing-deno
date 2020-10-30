import Thing from "./lib/thing.ts";
import Server from "./lib/server.ts";
import { getNumberPropertyDescriptor } from "./lib/property.ts";
import Action from "./lib/action.ts";

new Server(
  new Thing({
    id: "urn:iot:webthing:vendor:model:revision",
    title: "my-webthing",
    properties: {
      level: getNumberPropertyDescriptor(0, 300),
    },
    actions: [new Action()],
  })
)
  .setPorts(8080, 8443)
  .run();
