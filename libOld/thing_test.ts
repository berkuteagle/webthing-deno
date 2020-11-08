import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import Thing from "./thing.ts";

Deno.test({
  name: "Thing create",
  fn() {
    const testUrn = "urn:test:urn";
    const testTitle = "Test title";
    const t = new Thing({
      id: testUrn,
      title: testTitle,
    });
    assertEquals(t.getId(), testUrn);
  },
});
