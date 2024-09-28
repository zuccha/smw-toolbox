import { describe, test } from "vitest";
import { testInstruction } from "./_test";

describe("No branch", () => {
  test.each`
    instruction  | input            | output
    ${"BCC $10"} | ${{ flag_c: 1 }} | ${{ pc: 0x8002 }}
    ${"BCS $10"} | ${{ flag_c: 0 }} | ${{ pc: 0x8002 }}
    ${"BNE $10"} | ${{ flag_z: 1 }} | ${{ pc: 0x8002 }}
    ${"BEQ $10"} | ${{ flag_z: 0 }} | ${{ pc: 0x8002 }}
    ${"BPL $10"} | ${{ flag_n: 1 }} | ${{ pc: 0x8002 }}
    ${"BMI $10"} | ${{ flag_n: 0 }} | ${{ pc: 0x8002 }}
    ${"BVC $10"} | ${{ flag_v: 1 }} | ${{ pc: 0x8002 }}
    ${"BVS $10"} | ${{ flag_v: 0 }} | ${{ pc: 0x8002 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(instruction, input, output);
  });
});

describe("Branch forward", () => {
  test.each`
    instruction    | input              | output
    ${"BCC $10"}   | ${{ flag_c: 0 }}   | ${{ pc: 0x8012 }}
    ${"BCS $10"}   | ${{ flag_c: 1 }}   | ${{ pc: 0x8012 }}
    ${"BNE $10"}   | ${{ flag_z: 0 }}   | ${{ pc: 0x8012 }}
    ${"BEQ $10"}   | ${{ flag_z: 1 }}   | ${{ pc: 0x8012 }}
    ${"BPL $10"}   | ${{ flag_n: 0 }}   | ${{ pc: 0x8012 }}
    ${"BMI $10"}   | ${{ flag_n: 1 }}   | ${{ pc: 0x8012 }}
    ${"BVC $10"}   | ${{ flag_v: 0 }}   | ${{ pc: 0x8012 }}
    ${"BVS $10"}   | ${{ flag_v: 1 }}   | ${{ pc: 0x8012 }}
    ${"BRA $10"}   | ${{ flags: 0 }}    | ${{ pc: 0x8012 }}
    ${"BRA $10"}   | ${{ flags: 0xff }} | ${{ pc: 0x8012 }}
    ${"BRL $1000"} | ${{ flags: 0 }}    | ${{ pc: 0x9003 }}
    ${"BRL $1000"} | ${{ flags: 0xff }} | ${{ pc: 0x9003 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(instruction, input, output);
  });
});

describe("Branch backwards", () => {
  test.each`
    instruction    | input            | output
    ${"BCC $FE"}   | ${{ flag_c: 0 }} | ${{ pc: 0x8000 }}
    ${"BCS $FE"}   | ${{ flag_c: 1 }} | ${{ pc: 0x8000 }}
    ${"BNE $FE"}   | ${{ flag_z: 0 }} | ${{ pc: 0x8000 }}
    ${"BEQ $FE"}   | ${{ flag_z: 1 }} | ${{ pc: 0x8000 }}
    ${"BPL $FE"}   | ${{ flag_n: 0 }} | ${{ pc: 0x8000 }}
    ${"BMI $FE"}   | ${{ flag_n: 1 }} | ${{ pc: 0x8000 }}
    ${"BVC $FE"}   | ${{ flag_v: 0 }} | ${{ pc: 0x8000 }}
    ${"BVS $FE"}   | ${{ flag_v: 1 }} | ${{ pc: 0x8000 }}
    ${"BRA $FE"}   | ${{}}            | ${{ pc: 0x8000 }}
    ${"BRL $FFFD"} | ${{}}            | ${{ pc: 0x8000 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    const errors = ["Reached the maximum amount of instructions (1)."];
    testInstruction(instruction, input, output, errors, 1);
  });
});
