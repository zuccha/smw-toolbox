import { describe, test } from "vitest";
import { run } from "./_run";

describe("'#const'", () => {
  test(`WDM`, () => {
    run({
      opcode: "WDM",
      arg: 0,
      value: 0,
      mode: "#const",
      initialProcessor: {},
      expectedProcessor: {},
    });
  });
});
