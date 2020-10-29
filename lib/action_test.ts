import Action from "./action.ts";

Deno.test({
  name: "Action create",
  fn() {
    const action = new Action();
    if (!action) {
      throw Error("Action create failed");
    }
  },
});
