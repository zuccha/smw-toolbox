import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    opcode   | initialProcessor                        | expectedProcessor
    ${"PLA"} | ${{ sp: 0x1fbe, a: 0xabcd }}            | ${{ sp: 0x1fbf, a: 0xab34 }}
    ${"PLA"} | ${{ sp: 0x1fbe, a: 0xabcd, flag_m: 0 }} | ${{ sp: 0x1fc0, a: 0x1234 }}
    ${"PLX"} | ${{ sp: 0x1fbe, x: 0xabcd }}            | ${{ sp: 0x1fbf, x: 0x0034 }}
    ${"PLX"} | ${{ sp: 0x1fbe, x: 0xabcd, flag_x: 0 }} | ${{ sp: 0x1fc0, x: 0x1234 }}
    ${"PLY"} | ${{ sp: 0x1fbe, y: 0xabcd }}            | ${{ sp: 0x1fbf, y: 0x0034 }}
    ${"PLY"} | ${{ sp: 0x1fbe, y: 0xabcd, flag_x: 0 }} | ${{ sp: 0x1fc0, y: 0x1234 }}
    ${"PLB"} | ${{ sp: 0x1fbe, db: 0xab }}             | ${{ sp: 0x1fbf, db: 0x34 }}
    ${"PLD"} | ${{ sp: 0x1fbe, dp: 0xabcd }}           | ${{ sp: 0x1fc0, dp: 0x1234 }}
    ${"PLP"} | ${{ sp: 0x1fbe }}                       | ${{ sp: 0x1fbf, flag_n: 0, flag_v: 0, flag_m: 1, flag_x: 1, flag_d: 0, flag_i: 1, flag_z: 0, flag_c: 0 }}
  `(`$opcode [$initialProcessor] [pull normal]`, (params) => {
    const initialMemory = new Map([
      [0x7e1fbf, 0x34],
      [0x7e1fc0, 0x12],
    ]);
    run({ mode: "implied", ...params, initialMemory });
  });

  test.each`
    opcode   | initialProcessor                        | expectedProcessor
    ${"PLA"} | ${{ sp: 0x1fbe, a: 0xabcd }}            | ${{ sp: 0x1fbf, a: 0xab80, flag_n: 1 }}
    ${"PLA"} | ${{ sp: 0x1fbe, a: 0xabcd, flag_m: 0 }} | ${{ sp: 0x1fc0, a: 0xff80, flag_n: 1 }}
    ${"PLX"} | ${{ sp: 0x1fbe, x: 0xabcd }}            | ${{ sp: 0x1fbf, x: 0x0080, flag_n: 1 }}
    ${"PLX"} | ${{ sp: 0x1fbe, x: 0xabcd, flag_x: 0 }} | ${{ sp: 0x1fc0, x: 0xff80, flag_n: 1 }}
    ${"PLY"} | ${{ sp: 0x1fbe, y: 0xabcd }}            | ${{ sp: 0x1fbf, y: 0x0080, flag_n: 1 }}
    ${"PLY"} | ${{ sp: 0x1fbe, y: 0xabcd, flag_x: 0 }} | ${{ sp: 0x1fc0, y: 0xff80, flag_n: 1 }}
    ${"PLB"} | ${{ sp: 0x1fbe, db: 0xab }}             | ${{ sp: 0x1fbf, db: 0x80, flag_n: 1 }}
    ${"PLD"} | ${{ sp: 0x1fbe, dp: 0xabcd }}           | ${{ sp: 0x1fc0, dp: 0xff80, flag_n: 1 }}
    ${"PLP"} | ${{ sp: 0x1fbe }}                       | ${{ sp: 0x1fbf, flag_n: 1, flag_v: 0, flag_m: 0, flag_x: 0, flag_d: 0, flag_i: 0, flag_z: 0, flag_c: 0 }}
  `(`$opcode [$initialProcessor] [pull negative]`, (params) => {
    const initialMemory = new Map([
      [0x7e1fbf, 0x80],
      [0x7e1fc0, 0xff],
    ]);
    run({ mode: "implied", ...params, initialMemory });
  });

  test.each`
    opcode   | initialProcessor                        | expectedProcessor
    ${"PLA"} | ${{ sp: 0x1fbe, a: 0xabcd }}            | ${{ sp: 0x1fbf, a: 0xab00, flag_z: 1 }}
    ${"PLA"} | ${{ sp: 0x1fbe, a: 0xabcd, flag_m: 0 }} | ${{ sp: 0x1fc0, a: 0x0000, flag_z: 1 }}
    ${"PLX"} | ${{ sp: 0x1fbe, x: 0xabcd }}            | ${{ sp: 0x1fbf, x: 0x0000, flag_z: 1 }}
    ${"PLX"} | ${{ sp: 0x1fbe, x: 0xabcd, flag_x: 0 }} | ${{ sp: 0x1fc0, x: 0x0000, flag_z: 1 }}
    ${"PLY"} | ${{ sp: 0x1fbe, y: 0xabcd }}            | ${{ sp: 0x1fbf, y: 0x0000, flag_z: 1 }}
    ${"PLY"} | ${{ sp: 0x1fbe, y: 0xabcd, flag_x: 0 }} | ${{ sp: 0x1fc0, y: 0x0000, flag_z: 1 }}
    ${"PLB"} | ${{ sp: 0x1fbe, db: 0xab }}             | ${{ sp: 0x1fbf, db: 0x00, flag_z: 1 }}
    ${"PLD"} | ${{ sp: 0x1fbe, dp: 0xabcd }}           | ${{ sp: 0x1fc0, dp: 0x0000, flag_z: 1 }}
    ${"PLP"} | ${{ sp: 0x1fbe }}                       | ${{ sp: 0x1fbf, flag_n: 0, flag_v: 0, flag_m: 0, flag_x: 0, flag_d: 0, flag_i: 0, flag_z: 0, flag_c: 0 }}
  `(`$opcode [$initialProcessor] [pull zero]`, (params) => {
    const initialMemory = new Map([
      [0x7e1fbf, 0x00],
      [0x7e1fc0, 0x00],
    ]);
    run({ mode: "implied", ...params, initialMemory });
  });
});
