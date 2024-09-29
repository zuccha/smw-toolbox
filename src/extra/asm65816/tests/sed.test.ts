import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_d: 1 }} | ${{ flag_d: 1 }}
    ${{ flag_d: 0 }} | ${{ flag_d: 1 }}
  `(`SED [$initialProcessor]`, (params) => {
    run({ opcode: "SED", mode: "implied", ...params });
  });
});
