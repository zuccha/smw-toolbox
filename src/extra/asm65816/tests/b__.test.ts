import { describe, test } from "vitest";
import { run } from "./_run";

describe("No branch", () => {
  test.each`
    opcode   | arg     | initialProcessor | expectedProcessor
    ${"BCC"} | ${0x10} | ${{ flag_c: 1 }} | ${{ pc: 0x8002 }}
    ${"BCS"} | ${0x10} | ${{ flag_c: 0 }} | ${{ pc: 0x8002 }}
    ${"BNE"} | ${0x10} | ${{ flag_z: 1 }} | ${{ pc: 0x8002 }}
    ${"BEQ"} | ${0x10} | ${{ flag_z: 0 }} | ${{ pc: 0x8002 }}
    ${"BPL"} | ${0x10} | ${{ flag_n: 1 }} | ${{ pc: 0x8002 }}
    ${"BMI"} | ${0x10} | ${{ flag_n: 0 }} | ${{ pc: 0x8002 }}
    ${"BVC"} | ${0x10} | ${{ flag_v: 1 }} | ${{ pc: 0x8002 }}
    ${"BVS"} | ${0x10} | ${{ flag_v: 0 }} | ${{ pc: 0x8002 }}
  `("$opcode offset [$initialProcessor]", (params) => {
    run({ ...params, mode: "offset", value: 0, considerPc: true });
  });
});

describe("Branch forward", () => {
  test.each`
    opcode   | arg       | initialProcessor   | expectedProcessor
    ${"BCC"} | ${0x10}   | ${{ flag_c: 0 }}   | ${{ pc: 0x8012 }}
    ${"BCS"} | ${0x10}   | ${{ flag_c: 1 }}   | ${{ pc: 0x8012 }}
    ${"BNE"} | ${0x10}   | ${{ flag_z: 0 }}   | ${{ pc: 0x8012 }}
    ${"BEQ"} | ${0x10}   | ${{ flag_z: 1 }}   | ${{ pc: 0x8012 }}
    ${"BPL"} | ${0x10}   | ${{ flag_n: 0 }}   | ${{ pc: 0x8012 }}
    ${"BMI"} | ${0x10}   | ${{ flag_n: 1 }}   | ${{ pc: 0x8012 }}
    ${"BVC"} | ${0x10}   | ${{ flag_v: 0 }}   | ${{ pc: 0x8012 }}
    ${"BVS"} | ${0x10}   | ${{ flag_v: 1 }}   | ${{ pc: 0x8012 }}
    ${"BRA"} | ${0x10}   | ${{ flags: 0 }}    | ${{ pc: 0x8012 }}
    ${"BRA"} | ${0x10}   | ${{ flags: 0xff }} | ${{ pc: 0x8012 }}
    ${"BRL"} | ${0x1000} | ${{ flags: 0 }}    | ${{ pc: 0x9003 }}
    ${"BRL"} | ${0x1000} | ${{ flags: 0xff }} | ${{ pc: 0x9003 }}
  `("$opcode offset [$initialProcessor]", (params) => {
    run({ ...params, mode: "offset", value: 0, considerPc: true });
  });
});

describe("Branch backwards", () => {
  test.each`
    opcode   | arg       | initialProcessor | expectedProcessor
    ${"BCC"} | ${0xfe}   | ${{ flag_c: 0 }} | ${{ pc: 0x8000 }}
    ${"BCS"} | ${0xfe}   | ${{ flag_c: 1 }} | ${{ pc: 0x8000 }}
    ${"BNE"} | ${0xfe}   | ${{ flag_z: 0 }} | ${{ pc: 0x8000 }}
    ${"BEQ"} | ${0xfe}   | ${{ flag_z: 1 }} | ${{ pc: 0x8000 }}
    ${"BPL"} | ${0xfe}   | ${{ flag_n: 0 }} | ${{ pc: 0x8000 }}
    ${"BMI"} | ${0xfe}   | ${{ flag_n: 1 }} | ${{ pc: 0x8000 }}
    ${"BVC"} | ${0xfe}   | ${{ flag_v: 0 }} | ${{ pc: 0x8000 }}
    ${"BVS"} | ${0xfe}   | ${{ flag_v: 1 }} | ${{ pc: 0x8000 }}
    ${"BRA"} | ${0xfe}   | ${{}}            | ${{ pc: 0x8000 }}
    ${"BRL"} | ${0xfffd} | ${{}}            | ${{ pc: 0x8000 }}
  `("$opcode offset [$initialProcessor]", (params) => {
    const expectedErrors = ["Reached the maximum amount of instructions (3)."];
    run({
      ...params,
      mode: "offset",
      value: 0,
      considerPc: true,
      expectedErrors,
    });
  });
});
