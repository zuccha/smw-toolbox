import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    initialProcessor                                  | expectedProcessor
    ${{ a: 0x12cd, flag_n: 1, flag_m: 1, flag_z: 0 }} | ${{ a: 0xcd12, flag_n: 0, flag_z: 0 }}
    ${{ a: 0x12cd, flag_n: 1, flag_m: 0, flag_z: 0 }} | ${{ a: 0xcd12, flag_n: 0, flag_z: 0 }}
    ${{ a: 0xcd12, flag_n: 0, flag_m: 1, flag_z: 0 }} | ${{ a: 0x12cd, flag_n: 1, flag_z: 0 }}
    ${{ a: 0xcd12, flag_n: 0, flag_m: 0, flag_z: 0 }} | ${{ a: 0x12cd, flag_n: 1, flag_z: 0 }}
    ${{ a: 0x34ab, flag_n: 1, flag_m: 1, flag_z: 0 }} | ${{ a: 0xab34, flag_n: 0, flag_z: 0 }}
    ${{ a: 0x34ab, flag_n: 1, flag_m: 0, flag_z: 0 }} | ${{ a: 0xab34, flag_n: 0, flag_z: 0 }}
    ${{ a: 0xab34, flag_n: 0, flag_m: 1, flag_z: 0 }} | ${{ a: 0x34ab, flag_n: 1, flag_z: 0 }}
    ${{ a: 0xab34, flag_n: 0, flag_m: 0, flag_z: 0 }} | ${{ a: 0x34ab, flag_n: 1, flag_z: 0 }}
    ${{ a: 0x0034, flag_n: 0, flag_m: 1, flag_z: 0 }} | ${{ a: 0x3400, flag_n: 0, flag_z: 1 }}
    ${{ a: 0x0034, flag_n: 0, flag_m: 0, flag_z: 0 }} | ${{ a: 0x3400, flag_n: 0, flag_z: 1 }}
    ${{ a: 0x1200, flag_n: 0, flag_m: 1, flag_z: 0 }} | ${{ a: 0x0012, flag_n: 0, flag_z: 0 }}
    ${{ a: 0x1200, flag_n: 0, flag_m: 0, flag_z: 0 }} | ${{ a: 0x0012, flag_n: 0, flag_z: 0 }}
    ${{ a: 0x0000, flag_n: 0, flag_m: 1, flag_z: 0 }} | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
    ${{ a: 0x0000, flag_n: 0, flag_m: 0, flag_z: 0 }} | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
  `(`XBA [$initialProcessor]`, (params) => {
    run({ opcode: "XBA", mode: "implied", ...params });
  });
});
