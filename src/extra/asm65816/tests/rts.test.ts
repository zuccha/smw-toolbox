import { test } from "vitest";
import { run } from "./_run";

test.each`
  opcode   | initialProcessor  | expectedProcessor                       | initialMemory
  ${"RTS"} | ${{ sp: 0x1fbe }} | ${{ sp: 0x1fc0, pb: 0x80, pc: 0x9a11 }} | ${new Map([[0x7e1fbf, 0x10], [0x7e1fc0, 0x9a]])}
  ${"RTL"} | ${{ sp: 0x1fbd }} | ${{ sp: 0x1fc0, pb: 0xbc, pc: 0x9a11 }} | ${new Map([[0x7e1fbe, 0x10], [0x7e1fbf, 0x9a], [0x7e1fc0, 0xbc]])}
`("$opcode [$initialProcessor] [$initialMemory]", (params) => {
  run({ ...params, mode: "implied", considerPc: true });
});
