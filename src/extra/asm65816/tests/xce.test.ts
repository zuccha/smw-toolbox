import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    initialProcessor                                                                    | expectedProcessor
    ${{ flag_c: 0, flag_e: 0, flag_m: 0, flag_x: 0, sp: 0x1fc0, x: 0x1234, y: 0xabcd }} | ${{ flag_c: 0, flag_e: 0, flag_m: 0, flag_x: 0, sp: 0x1fc0, x: 0x1234, y: 0xabcd }}
    ${{ flag_c: 1, flag_e: 0, flag_m: 0, flag_x: 0, sp: 0x1fc0, x: 0x1234, y: 0xabcd }} | ${{ flag_c: 0, flag_e: 1, flag_m: 1, flag_x: 1, sp: 0x01c0, x: 0x0034, y: 0x00cd }}
    ${{ flag_c: 0, flag_e: 1, flag_m: 1, flag_x: 1, sp: 0x01c0, x: 0x0034, y: 0x00cd }} | ${{ flag_c: 1, flag_e: 0, flag_m: 1, flag_x: 1, sp: 0x01c0, x: 0x0034, y: 0x00cd }}
    ${{ flag_c: 1, flag_e: 1, flag_m: 1, flag_x: 1, sp: 0x01c0, x: 0x1234, y: 0xabcd }} | ${{ flag_c: 1, flag_e: 1, flag_m: 1, flag_x: 1, sp: 0x01c0, x: 0x0034, y: 0x00cd }}
  `(`XCE [$initialProcessor]`, (params) => {
    run({ opcode: "XCE", mode: "implied", ...params });
  });
});
