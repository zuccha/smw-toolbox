import { test } from "vitest";
import { run } from "./_run";

test.each`
  opcode   | arg         | mode          | initialProcessor  | expectedProcessor                       | expectedMemory                                                     | errors
  ${"JSR"} | ${0x1234}   | ${"addr"}     | ${{ sp: 0x1fc0 }} | ${{ sp: 0x1fbe, pb: 0x80, pc: 0x1234 }} | ${new Map([[0x7e1fbf, 0x02], [0x7e1fc0, 0x80]])}                   | ${true}
  ${"JSR"} | ${0x1234}   | ${"(addr,x)"} | ${{ sp: 0x1fc0 }} | ${{ sp: 0x1fbe, pb: 0x80, pc: 0xab10 }} | ${new Map([[0x7e1fbf, 0x02], [0x7e1fc0, 0x80]])}                   | ${false}
  ${"JSL"} | ${0x021234} | ${"long"}     | ${{ sp: 0x1fc0 }} | ${{ sp: 0x1fbd, pb: 0x02, pc: 0x1234 }} | ${new Map([[0x7e1fbe, 0x03], [0x7e1fbf, 0x80], [0x7e1fc0, 0x80]])} | ${true}
`("$opcode $mode [$initialProcessor]", (params) => {
  const expectedErrors = params.errors
    ? ["Reached the maximum amount of instructions (1)."]
    : [];
  run({ ...params, expectedErrors, considerPc: true, maxInstructions: 1 });
});
