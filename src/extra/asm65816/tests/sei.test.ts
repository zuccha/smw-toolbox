import { describe, test } from "vitest";
import { run } from "./_run";

describe("'immediate'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_i: 1 }} | ${{ flag_i: 1 }}
    ${{ flag_i: 0 }} | ${{ flag_i: 1 }}
  `(`SEI [$initialProcessor]`, (params) => {
    run({ opcode: "SEI", arg: 0, value: 0, mode: "immediate", ...params });
  });
});
