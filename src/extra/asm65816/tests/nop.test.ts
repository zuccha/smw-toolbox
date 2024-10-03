import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test(`NOP`, () => {
    run({
      opcode: "NOP",
      arg: 0,
      value: 0,
      mode: "implied",
      initialProcessor: {},
      expectedProcessor: {},
    });
  });
});
