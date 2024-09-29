import { test } from "vitest";
import { run } from "./_run";

test.each`
  opcode   | arg         | mode          | initialProcessor | expectedProcessor           | errors
  ${"JMP"} | ${0x1234}   | ${"addr"}     | ${{}}            | ${{ pb: 0x80, pc: 0x1234 }} | ${true}
  ${"JMP"} | ${0x1234}   | ${"(addr)"}   | ${{}}            | ${{ pb: 0x80, pc: 0xab10 }} | ${false}
  ${"JMP"} | ${0x1234}   | ${"(addr,x)"} | ${{}}            | ${{ pb: 0x80, pc: 0xab10 }} | ${false}
  ${"JML"} | ${0x1234}   | ${"[addr]"}   | ${{}}            | ${{ pb: 0x7f, pc: 0xab10 }} | ${true}
  ${"JML"} | ${0x021234} | ${"long"}     | ${{}}            | ${{ pb: 0x02, pc: 0x1234 }} | ${true}
`("$opcode $mode [$initialProcessor]", (params) => {
  const expectedErrors = params.errors
    ? ["Reached the maximum amount of instructions (1)."]
    : [];
  run({ ...params, expectedErrors, considerPc: true, maxInstructions: 1 });
});
