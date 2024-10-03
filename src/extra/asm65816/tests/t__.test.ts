import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    opcode   | initialProcessor                                  | expectedProcessor
    ${"TAX"} | ${{ a: 0x1234, x: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ x: 0x0034 }}
    ${"TAX"} | ${{ a: 0x1234, x: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ x: 0x0034 }}
    ${"TAX"} | ${{ a: 0x1234, x: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ x: 0x1234 }}
    ${"TAX"} | ${{ a: 0x1234, x: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ x: 0x1234 }}
    ${"TAY"} | ${{ a: 0x1234, y: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ y: 0x0034 }}
    ${"TAY"} | ${{ a: 0x1234, y: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ y: 0x0034 }}
    ${"TAY"} | ${{ a: 0x1234, y: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ y: 0x1234 }}
    ${"TAY"} | ${{ a: 0x1234, y: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ y: 0x1234 }}
    ${"TCD"} | ${{ a: 0x1234, dp: 0x5678, flag_m: 1 }}           | ${{ dp: 0x1234 }}
    ${"TCD"} | ${{ a: 0x1234, dp: 0x5678, flag_m: 0 }}           | ${{ dp: 0x1234 }}
    ${"TCS"} | ${{ a: 0x1234, sp: 0x5678, flag_m: 1 }}           | ${{ sp: 0x1234 }}
    ${"TCS"} | ${{ a: 0x1234, sp: 0x5678, flag_m: 0 }}           | ${{ sp: 0x1234 }}
    ${"TDC"} | ${{ a: 0x1234, dp: 0x5678, flag_m: 1 }}           | ${{ a: 0x5678 }}
    ${"TDC"} | ${{ a: 0x1234, dp: 0x5678, flag_m: 0 }}           | ${{ a: 0x5678 }}
    ${"TSC"} | ${{ a: 0x1234, sp: 0x5678, flag_m: 1 }}           | ${{ a: 0x5678 }}
    ${"TSC"} | ${{ a: 0x1234, sp: 0x5678, flag_m: 0 }}           | ${{ a: 0x5678 }}
    ${"TSX"} | ${{ x: 0x1234, sp: 0x5678, flag_x: 1 }}           | ${{ x: 0x0078 }}
    ${"TSX"} | ${{ x: 0x1234, sp: 0x5678, flag_x: 0 }}           | ${{ x: 0x5678 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ a: 0x1278 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ a: 0x0078 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ a: 0x1278 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ a: 0x5678 }}
    ${"TXS"} | ${{ x: 0x1234, sp: 0x5678, flag_x: 1 }}           | ${{ sp: 0x0034 }}
    ${"TXS"} | ${{ x: 0x1234, sp: 0x5678, flag_x: 0 }}           | ${{ sp: 0x1234 }}
    ${"TXY"} | ${{ x: 0x1234, y: 0x5678, flag_x: 1 }}            | ${{ y: 0x0034 }}
    ${"TXY"} | ${{ x: 0x1234, y: 0x5678, flag_x: 0 }}            | ${{ y: 0x1234 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ a: 0x1278 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ a: 0x0078 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ a: 0x1278 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ a: 0x5678 }}
    ${"TYX"} | ${{ x: 0x1234, y: 0x5678, flag_x: 1 }}            | ${{ x: 0x0078 }}
    ${"TYX"} | ${{ x: 0x1234, y: 0x5678, flag_x: 0 }}            | ${{ x: 0x5678 }}
  `(`$opcode [$initialProcessor] [positive]`, (params) => {
    run({ mode: "implied", ...params });
  });

  test.each`
    opcode   | initialProcessor                                  | expectedProcessor
    ${"TAX"} | ${{ a: 0xeeff, x: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ x: 0x00ff, flag_n: 1 }}
    ${"TAX"} | ${{ a: 0xeeff, x: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ x: 0x00ff, flag_n: 1 }}
    ${"TAX"} | ${{ a: 0xeeff, x: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ x: 0xeeff, flag_n: 1 }}
    ${"TAX"} | ${{ a: 0xeeff, x: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ x: 0xeeff, flag_n: 1 }}
    ${"TAY"} | ${{ a: 0xeeff, y: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ y: 0x00ff, flag_n: 1 }}
    ${"TAY"} | ${{ a: 0xeeff, y: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ y: 0x00ff, flag_n: 1 }}
    ${"TAY"} | ${{ a: 0xeeff, y: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ y: 0xeeff, flag_n: 1 }}
    ${"TAY"} | ${{ a: 0xeeff, y: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ y: 0xeeff, flag_n: 1 }}
    ${"TCD"} | ${{ a: 0xeeff, dp: 0x5678, flag_m: 1 }}           | ${{ dp: 0xeeff, flag_n: 1 }}
    ${"TCD"} | ${{ a: 0xeeff, dp: 0x5678, flag_m: 0 }}           | ${{ dp: 0xeeff, flag_n: 1 }}
    ${"TCS"} | ${{ a: 0xeeff, sp: 0x5678, flag_m: 1 }}           | ${{ sp: 0xeeff, flag_n: 1 }}
    ${"TCS"} | ${{ a: 0xeeff, sp: 0x5678, flag_m: 0 }}           | ${{ sp: 0xeeff, flag_n: 1 }}
    ${"TDC"} | ${{ a: 0x1234, dp: 0xeeff, flag_m: 1 }}           | ${{ a: 0xeeff, flag_n: 1 }}
    ${"TDC"} | ${{ a: 0x1234, dp: 0xeeff, flag_m: 0 }}           | ${{ a: 0xeeff, flag_n: 1 }}
    ${"TSC"} | ${{ a: 0x1234, sp: 0xeeff, flag_m: 1 }}           | ${{ a: 0xeeff, flag_n: 1 }}
    ${"TSC"} | ${{ a: 0x1234, sp: 0xeeff, flag_m: 0 }}           | ${{ a: 0xeeff, flag_n: 1 }}
    ${"TSX"} | ${{ x: 0x1234, sp: 0x56ff, flag_x: 1 }}           | ${{ x: 0x00ff, flag_n: 1 }}
    ${"TSX"} | ${{ x: 0x1234, sp: 0xeeff, flag_x: 0 }}           | ${{ x: 0xeeff, flag_n: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0xeeff, flag_m: 1, flag_x: 1 }} | ${{ a: 0x12ff, flag_n: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0xeeff, flag_m: 0, flag_x: 1 }} | ${{ a: 0x00ff, flag_n: 0 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0xeeff, flag_m: 1, flag_x: 0 }} | ${{ a: 0x12ff, flag_n: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0xeeff, flag_m: 0, flag_x: 0 }} | ${{ a: 0xeeff, flag_n: 1 }}
    ${"TXS"} | ${{ x: 0xeeff, sp: 0x5678, flag_x: 1 }}           | ${{ sp: 0x00ff, flag_n: 0 }}
    ${"TXS"} | ${{ x: 0xeeff, sp: 0x5678, flag_x: 0 }}           | ${{ sp: 0xeeff, flag_n: 1 }}
    ${"TXY"} | ${{ x: 0xeeff, y: 0x5678, flag_x: 1 }}            | ${{ y: 0x00ff, flag_n: 1 }}
    ${"TXY"} | ${{ x: 0xeeff, y: 0x5678, flag_x: 0 }}            | ${{ y: 0xeeff, flag_n: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0xeeff, flag_m: 1, flag_x: 1 }} | ${{ a: 0x12ff, flag_n: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0xeeff, flag_m: 0, flag_x: 1 }} | ${{ a: 0x00ff, flag_n: 0 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0xeeff, flag_m: 1, flag_x: 0 }} | ${{ a: 0x12ff, flag_n: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0xeeff, flag_m: 0, flag_x: 0 }} | ${{ a: 0xeeff, flag_n: 1 }}
    ${"TYX"} | ${{ x: 0x1234, y: 0xeeff, flag_x: 1 }}            | ${{ x: 0x00ff, flag_n: 1 }}
    ${"TYX"} | ${{ x: 0x1234, y: 0xeeff, flag_x: 0 }}            | ${{ x: 0xeeff, flag_n: 1 }}
  `(`$opcode [$initialProcessor] [negative]`, (params) => {
    run({ mode: "implied", ...params });
  });

  test.each`
    opcode   | initialProcessor                                  | expectedProcessor
    ${"TAX"} | ${{ a: 0x0000, x: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ x: 0x0000, flag_z: 1 }}
    ${"TAX"} | ${{ a: 0x0000, x: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ x: 0x0000, flag_z: 1 }}
    ${"TAX"} | ${{ a: 0x0000, x: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ x: 0x0000, flag_z: 1 }}
    ${"TAX"} | ${{ a: 0x0000, x: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ x: 0x0000, flag_z: 1 }}
    ${"TAY"} | ${{ a: 0x0000, y: 0x5678, flag_m: 1, flag_x: 1 }} | ${{ y: 0x0000, flag_z: 1 }}
    ${"TAY"} | ${{ a: 0x0000, y: 0x5678, flag_m: 0, flag_x: 1 }} | ${{ y: 0x0000, flag_z: 1 }}
    ${"TAY"} | ${{ a: 0x0000, y: 0x5678, flag_m: 1, flag_x: 0 }} | ${{ y: 0x0000, flag_z: 1 }}
    ${"TAY"} | ${{ a: 0x0000, y: 0x5678, flag_m: 0, flag_x: 0 }} | ${{ y: 0x0000, flag_z: 1 }}
    ${"TCD"} | ${{ a: 0x0000, dp: 0x5678, flag_m: 1 }}           | ${{ dp: 0x0000, flag_z: 1 }}
    ${"TCD"} | ${{ a: 0x0000, dp: 0x5678, flag_m: 0 }}           | ${{ dp: 0x0000, flag_z: 1 }}
    ${"TCS"} | ${{ a: 0x0000, sp: 0x5678, flag_m: 1 }}           | ${{ sp: 0x0000, flag_z: 1 }}
    ${"TCS"} | ${{ a: 0x0000, sp: 0x5678, flag_m: 0 }}           | ${{ sp: 0x0000, flag_z: 1 }}
    ${"TDC"} | ${{ a: 0x1234, dp: 0x0000, flag_m: 1 }}           | ${{ a: 0x0000, flag_z: 1 }}
    ${"TDC"} | ${{ a: 0x1234, dp: 0x0000, flag_m: 0 }}           | ${{ a: 0x0000, flag_z: 1 }}
    ${"TSC"} | ${{ a: 0x1234, sp: 0x0000, flag_m: 1 }}           | ${{ a: 0x0000, flag_z: 1 }}
    ${"TSC"} | ${{ a: 0x1234, sp: 0x0000, flag_m: 0 }}           | ${{ a: 0x0000, flag_z: 1 }}
    ${"TSX"} | ${{ x: 0x1234, sp: 0x5600, flag_x: 1 }}           | ${{ x: 0x0000, flag_z: 1 }}
    ${"TSX"} | ${{ x: 0x1234, sp: 0x0000, flag_x: 0 }}           | ${{ x: 0x0000, flag_z: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x0000, flag_m: 1, flag_x: 1 }} | ${{ a: 0x1200, flag_z: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x0000, flag_m: 0, flag_x: 1 }} | ${{ a: 0x0000, flag_z: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x0000, flag_m: 1, flag_x: 0 }} | ${{ a: 0x1200, flag_z: 1 }}
    ${"TXA"} | ${{ a: 0x1234, x: 0x0000, flag_m: 0, flag_x: 0 }} | ${{ a: 0x0000, flag_z: 1 }}
    ${"TXS"} | ${{ x: 0x0000, sp: 0x5678, flag_x: 1 }}           | ${{ sp: 0x0000, flag_z: 1 }}
    ${"TXS"} | ${{ x: 0x0000, sp: 0x5678, flag_x: 0 }}           | ${{ sp: 0x0000, flag_z: 1 }}
    ${"TXY"} | ${{ x: 0x0000, y: 0x5678, flag_x: 1 }}            | ${{ y: 0x0000, flag_z: 1 }}
    ${"TXY"} | ${{ x: 0x0000, y: 0x5678, flag_x: 0 }}            | ${{ y: 0x0000, flag_z: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x0000, flag_m: 1, flag_x: 1 }} | ${{ a: 0x1200, flag_z: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x0000, flag_m: 0, flag_x: 1 }} | ${{ a: 0x0000, flag_z: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x0000, flag_m: 1, flag_x: 0 }} | ${{ a: 0x1200, flag_z: 1 }}
    ${"TYA"} | ${{ a: 0x1234, y: 0x0000, flag_m: 0, flag_x: 0 }} | ${{ a: 0x0000, flag_z: 1 }}
    ${"TYX"} | ${{ x: 0x1234, y: 0x0000, flag_x: 1 }}            | ${{ x: 0x0000, flag_z: 1 }}
    ${"TYX"} | ${{ x: 0x1234, y: 0x0000, flag_x: 0 }}            | ${{ x: 0x0000, flag_z: 1 }}
  `(`$opcode [$initialProcessor] [zero]`, (params) => {
    run({ mode: "implied", ...params });
  });
});
