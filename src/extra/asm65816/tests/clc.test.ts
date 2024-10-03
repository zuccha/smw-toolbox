import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_c: 1 }} | ${{ flag_c: 0 }}
    ${{ flag_c: 0 }} | ${{ flag_c: 0 }}
  `(`CLC [$initialProcessor]`, (params) => {
    run({ opcode: "CLC", mode: "implied", ...params });
  });
});
