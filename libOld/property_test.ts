import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import Property from "./property.ts";
import Thing from "./thing.ts";
import { DataSchemaType } from "./../interface/DataSchema.ts";

Deno.test({
  name: "Property create",
  fn() {
    const testName = "testName";
    const testType = DataSchemaType.BOOLEAN;
    const t = new Thing({ id: "testId", title: "testTitle" });
    const p = new Property(t, testName, { type: testType });

    assertEquals(p.getName(), testName);
  },
});
