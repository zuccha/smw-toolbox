import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    initialProcessor | expectedProcessor
    ${{ flag_v: 1 }} | ${{ flag_v: 0 }}
    ${{ flag_v: 0 }} | ${{ flag_v: 0 }}
  `(`CLV [$initialProcessor]`, (params) => {
    run({ opcode: "CLV", mode: "implied", ...params });
  });
});
