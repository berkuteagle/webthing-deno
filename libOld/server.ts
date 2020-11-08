import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import Thing from "./thing.ts";

function createRouter(thing: Thing): Router {
  const router = new Router();

  router.get("/", (context) => {
    context.response.body = JSON.stringify(thing.toJSON()) + "\n";
  });

  return router;
}

export default class Server {
  private http_port = 80;
  private https_port = 443;

  constructor(private thing: Thing) {}

  public setPorts(http = 80, https = 443): Server {
    this.http_port = http;
    this.https_port = https;
    return this;
  }

  public async run(): Promise<void> {
    const app = new Application();
    const router = createRouter(this.thing);
    app.use(router.routes());
    app.use(router.allowedMethods());

    await app.listen({ port: this.http_port });
  }
}
