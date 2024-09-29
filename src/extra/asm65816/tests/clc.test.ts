import { describe, test } from "vitest";
import { run } from "./_run";

describe("'immediate'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_c: 1 }} | ${{ flag_c: 0 }}
    ${{ flag_c: 0 }} | ${{ flag_c: 0 }}
  `(`CLC [$initialProcessor]`, (params) => {
    run({ opcode: "CLC", arg: 0, value: 0, mode: "immediate", ...params });
  });
});
