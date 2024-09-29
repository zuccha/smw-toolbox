import { describe, test } from "vitest";
import { run } from "./_run";

describe("'immediate'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_d: 1 }} | ${{ flag_d: 0 }}
    ${{ flag_d: 0 }} | ${{ flag_d: 0 }}
  `(`CLD [$initialProcessor]`, (params) => {
    run({ opcode: "CLD", arg: 0, value: 0, mode: "immediate", ...params });
  });
});
