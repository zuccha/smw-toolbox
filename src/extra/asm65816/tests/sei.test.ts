import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_i: 1 }} | ${{ flag_i: 1 }}
    ${{ flag_i: 0 }} | ${{ flag_i: 1 }}
  `(`SEI [$initialProcessor]`, (params) => {
    run({ opcode: "SEI", mode: "implied", ...params });
  });
});
