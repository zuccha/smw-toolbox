import { describe, test } from "vitest";
import { run } from "./_run";

describe("'addr'", () => {
  test.each`
    opcode   | initialProcessor                        | expectedProcessor | expectedMemory
    ${"PHA"} | ${{ a: 0x1234, sp: 0x1fc0 }}            | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0x34]])}
    ${"PHA"} | ${{ a: 0x1234, sp: 0x1fc0, flag_m: 0 }} | ${{ sp: 0x1fbe }} | ${new Map([[0x7e1fbf, 0x34], [0x7e1fc0, 0x12]])}
    ${"PHX"} | ${{ x: 0x1234, sp: 0x1fc0 }}            | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0x34]])}
    ${"PHX"} | ${{ x: 0x1234, sp: 0x1fc0, flag_x: 0 }} | ${{ sp: 0x1fbe }} | ${new Map([[0x7e1fbf, 0x34], [0x7e1fc0, 0x12]])}
    ${"PHY"} | ${{ y: 0x0034, sp: 0x1fc0 }}            | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0x34]])}
    ${"PHY"} | ${{ y: 0x1234, sp: 0x1fc0, flag_x: 0 }} | ${{ sp: 0x1fbe }} | ${new Map([[0x7e1fbf, 0x34], [0x7e1fc0, 0x12]])}
    ${"PHB"} | ${{ db: 0xab, sp: 0x1fc0 }}             | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0xab]])}
    ${"PHD"} | ${{ dp: 0x0310, sp: 0x1fc0 }}           | ${{ sp: 0x1fbe }} | ${new Map([[0x7e1fbf, 0x10], [0x7e1fc0, 0x03]])}
    ${"PHK"} | ${{ sp: 0x1fc0 }}                       | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0x80]])}
    ${"PHP"} | ${{ sp: 0x1fc0 }}                       | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0b00110000]])}
    ${"PHP"} | ${{ sp: 0x1fc0, flag_n: 1, flag_x: 0 }} | ${{ sp: 0x1fbf }} | ${new Map([[0x7e1fc0, 0b10100000]])}
  `(`$opcode [$initialProcessor]`, (params) => {
    run({ mode: "implied", ...params });
  });
});
