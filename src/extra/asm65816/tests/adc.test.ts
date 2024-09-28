import { describe, test } from "vitest";
import { testInstruction } from "./_test";

describe("A 8-bit", () => {
  test.each`
    instruction   | input                       | output
    ${"ADC #$00"} | ${{}}                       | ${{ flag_z: 1 }}
    ${"ADC #$00"} | ${{ flag_c: 1 }}            | ${{ a: 0x0001, flag_c: 0 }}
    ${"ADC #$01"} | ${{ flag_c: 1 }}            | ${{ a: 0x0002, flag_c: 0 }}
    ${"ADC #$FF"} | ${{ a: 0x0001 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
    ${"ADC #$FF"} | ${{ a: 0x0001, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 1 }}
    ${"ADC #$10"} | ${{ a: 0x000a }}            | ${{ a: 0x001a }}
    ${"ADC #$10"} | ${{ a: 0x000a, flag_c: 1 }} | ${{ a: 0x001b, flag_c: 0 }}
    ${"ADC #$40"} | ${{}}                       | ${{ a: 0x0040, flag_v: 1 }}
    ${"ADC #$80"} | ${{}}                       | ${{ a: 0x0080, flag_n: 1 }}
    ${"ADC #$C0"} | ${{}}                       | ${{ a: 0x00c0, flag_n: 1, flag_v: 1 }}
    ${"ADC #$00"} | ${{ a: 0xc000 }}            | ${{ flag_z: 1 }}
    ${"ADC #$01"} | ${{ flag_n: 1 }}            | ${{ a: 0x0001, flag_n: 0 }}
    ${"ADC #$01"} | ${{ flag_v: 1 }}            | ${{ a: 0x0001, flag_v: 0 }}
    ${"ADC #$01"} | ${{ flag_z: 1 }}            | ${{ a: 0x0001, flag_z: 0 }}
    ${"ADC #$01"} | ${{ a: 0x90ff }}            | ${{ a: 0x9000, flag_z: 1, flag_c: 1 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(instruction, input, output);
  });
});

describe("A 8-bit (decimal)", () => {
  test.each`
    instruction   | input                       | output
    ${"ADC #$00"} | ${{}}                       | ${{ flag_z: 1 }}
    ${"ADC #$00"} | ${{ flag_c: 1 }}            | ${{ a: 0x0001, flag_c: 0 }}
    ${"ADC #$01"} | ${{ a: 0x0009 }}            | ${{ a: 0x0010 }}
    ${"ADC #$01"} | ${{ a: 0x000a }}            | ${{ a: 0x0011 }}
    ${"ADC #$01"} | ${{ a: 0x0a99 }}            | ${{ a: 0x0a00, flag_z: 1, flag_c: 1 }}
    ${"ADC #$0A"} | ${{ a: 0x0001 }}            | ${{ a: 0x0011 }}
    ${"ADC #$FF"} | ${{ a: 0x00ff }}            | ${{ a: 0x0030, flag_c: 1 }}
    ${"ADC #$01"} | ${{ a: 0x0039 }}            | ${{ a: 0x0040, flag_v: 1 }}
    ${"ADC #$00"} | ${{ a: 0x0079, flag_c: 1 }} | ${{ a: 0x0080, flag_n: 1, flag_c: 0 }}
    ${"ADC #$01"} | ${{ flag_n: 1 }}            | ${{ a: 0x0001, flag_n: 0 }}
    ${"ADC #$01"} | ${{ flag_v: 1 }}            | ${{ a: 0x0001, flag_v: 0 }}
    ${"ADC #$01"} | ${{ flag_z: 1 }}            | ${{ a: 0x0001, flag_z: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(
      instruction,
      { ...input, flag_d: 1 },
      { ...output, flag_d: 1 },
    );
  });
});

describe("A 16-bit", () => {
  test.each`
    instruction     | input                       | output
    ${"ADC #$0000"} | ${{}}                       | ${{ flag_z: 1 }}
    ${"ADC #$0000"} | ${{ flag_c: 1 }}            | ${{ a: 0x0001, flag_c: 0 }}
    ${"ADC #$0001"} | ${{ flag_c: 1 }}            | ${{ a: 0x0002, flag_c: 0 }}
    ${"ADC #$FFFF"} | ${{ a: 0x0001 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
    ${"ADC #$FFFF"} | ${{ a: 0x0001, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 1 }}
    ${"ADC #$9C10"} | ${{ a: 0x140a }}            | ${{ a: 0xb01a, flag_n: 1 }}
    ${"ADC #$0010"} | ${{ a: 0x000a, flag_c: 1 }} | ${{ a: 0x001b, flag_c: 0 }}
    ${"ADC #$4000"} | ${{}}                       | ${{ a: 0x4000, flag_v: 1 }}
    ${"ADC #$8000"} | ${{}}                       | ${{ a: 0x8000, flag_n: 1 }}
    ${"ADC #$C000"} | ${{}}                       | ${{ a: 0xc000, flag_n: 1, flag_v: 1 }}
    ${"ADC #$0000"} | ${{ a: 0x00c0 }}            | ${{}}
    ${"ADC #$0001"} | ${{ flag_n: 1 }}            | ${{ a: 0x0001, flag_n: 0 }}
    ${"ADC #$0001"} | ${{ flag_v: 1 }}            | ${{ a: 0x0001, flag_v: 0 }}
    ${"ADC #$0001"} | ${{ flag_z: 1 }}            | ${{ a: 0x0001, flag_z: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(
      instruction,
      { ...input, flag_m: 0 },
      { ...output, flag_m: 0 },
    );
  });
});

describe("A 16-bit (decimal)", () => {
  test.each`
    instruction     | input                       | output
    ${"ADC #$0000"} | ${{}}                       | ${{ flag_z: 1 }}
    ${"ADC #$0000"} | ${{ flag_c: 1 }}            | ${{ a: 0x0001, flag_c: 0 }}
    ${"ADC #$0001"} | ${{ a: 0x0009 }}            | ${{ a: 0x0010 }}
    ${"ADC #$0001"} | ${{ a: 0x000a }}            | ${{ a: 0x0011 }}
    ${"ADC #$0001"} | ${{ a: 0x0a99 }}            | ${{ a: 0x1100 }}
    ${"ADC #$0001"} | ${{ a: 0x9999 }}            | ${{ a: 0x0000, flag_z: 1, flag_c: 1 }}
    ${"ADC #$0B0A"} | ${{ a: 0x0001 }}            | ${{ a: 0x1111 }}
    ${"ADC #$1337"} | ${{ a: 0x0a69 }}            | ${{ a: 0x2406 }}
    ${"ADC #$00FF"} | ${{ a: 0x00ff }}            | ${{ a: 0x0330 }}
    ${"ADC #$FFFF"} | ${{ a: 0xffff }}            | ${{ a: 0x3330, flag_c: 1 }}
    ${"ADC #$0100"} | ${{ a: 0x3900 }}            | ${{ a: 0x4000, flag_v: 1 }}
    ${"ADC #$0000"} | ${{ a: 0x7999, flag_c: 1 }} | ${{ a: 0x8000, flag_n: 1, flag_c: 0 }}
    ${"ADC #00$01"} | ${{ flag_n: 1 }}            | ${{ a: 0x0001, flag_n: 0 }}
    ${"ADC #$0001"} | ${{ flag_v: 1 }}            | ${{ a: 0x0001, flag_v: 0 }}
    ${"ADC #$0001"} | ${{ flag_z: 1 }}            | ${{ a: 0x0001, flag_z: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(
      instruction,
      { ...input, flag_m: 0, flag_d: 1 },
      { ...output, flag_m: 0, flag_d: 1 },
    );
  });
});
