import { describe, test } from "vitest";
import { testInstruction } from "./_test";

describe("A 8-bit", () => {
  test.each`
    instruction   | input                       | output
    ${"AND #$00"} | ${{}}                       | ${{ flag_z: 1 }}
    ${"AND #$00"} | ${{ a: 0x00ff }}            | ${{ a: 0x0000, flag_z: 1 }}
    ${"AND #$00"} | ${{ a: 0xffff }}            | ${{ a: 0xff00, flag_z: 1 }}
    ${"AND #$F0"} | ${{ a: 0xffff }}            | ${{ a: 0xfff0, flag_n: 1 }}
    ${"AND #$FF"} | ${{ a: 0x004a }}            | ${{ a: 0x004a }}
    ${"AND #$40"} | ${{ a: 0x00ff }}            | ${{ a: 0x0040 }}
    ${"AND #$80"} | ${{ a: 0x00ff }}            | ${{ a: 0x0080, flag_n: 1 }}
    ${"AND #$C0"} | ${{ a: 0x00ff }}            | ${{ a: 0x00c0, flag_n: 1 }}
    ${"AND #$40"} | ${{ a: 0x4000 }}            | ${{ a: 0x4000, flag_z: 1 }}
    ${"AND #$80"} | ${{ a: 0x8000 }}            | ${{ a: 0x8000, flag_z: 1 }}
    ${"AND #$C0"} | ${{ a: 0xc000 }}            | ${{ a: 0xc000, flag_z: 1 }}
    ${"AND #$01"} | ${{ a: 0x0001, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
    ${"AND #$01"} | ${{ a: 0x0001, flag_v: 1 }} | ${{ a: 0x0001 }}
    ${"AND #$01"} | ${{ a: 0x0001, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(instruction, input, output);
  });
});

describe("A 16-bit", () => {
  test.each`
    instruction     | input                       | output
    ${"AND #$0000"} | ${{}}                       | ${{ flag_z: 1 }}
    ${"AND #$0000"} | ${{ a: 0xffff }}            | ${{ a: 0x0000, flag_z: 1 }}
    ${"AND #$10F0"} | ${{ a: 0xfff0 }}            | ${{ a: 0x10f0 }}
    ${"AND #$FFFF"} | ${{ a: 0x004a }}            | ${{ a: 0x004a }}
    ${"AND #$4000"} | ${{ a: 0xffff }}            | ${{ a: 0x4000 }}
    ${"AND #$8000"} | ${{ a: 0xffff }}            | ${{ a: 0x8000, flag_n: 1 }}
    ${"AND #$C000"} | ${{ a: 0xffff }}            | ${{ a: 0xc000, flag_n: 1 }}
    ${"AND #$0001"} | ${{ a: 0x0001, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
    ${"AND #$0001"} | ${{ a: 0x0001, flag_v: 1 }} | ${{ a: 0x0001 }}
    ${"AND #$0001"} | ${{ a: 0x0001, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(
      instruction,
      { ...input, flag_m: 0 },
      { ...output, flag_m: 0 },
    );
  });
});
