import { describe, test } from "vitest";
import { testInstruction } from "./_test";

describe("A 8-bit", () => {
  test.each`
    instruction | input                       | output
    ${"ASL A"}  | ${{ a: 0x0000 }}            | ${{ flag_z: 1 }}
    ${"ASL A"}  | ${{ a: 0x0001 }}            | ${{ a: 0x0002 }}
    ${"ASL A"}  | ${{ a: 0x0040 }}            | ${{ a: 0x0080, flag_n: 1 }}
    ${"ASL A"}  | ${{ a: 0x0081 }}            | ${{ a: 0x0002, flag_c: 1 }}
    ${"ASL A"}  | ${{ a: 0x0180 }}            | ${{ a: 0x0100, flag_c: 1, flag_z: 1 }}
    ${"ASL A"}  | ${{ a: 0x0001, flag_z: 1 }} | ${{ a: 0x0002, flag_z: 0 }}
    ${"ASL A"}  | ${{ a: 0x0001, flag_n: 1 }} | ${{ a: 0x0002, flag_n: 0 }}
    ${"ASL A"}  | ${{ a: 0x0001, flag_c: 1 }} | ${{ a: 0x0002, flag_c: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(instruction, input, output);
  });
});

describe("A 16-bit", () => {
  test.each`
    instruction | input                       | output
    ${"ASL A"}  | ${{ a: 0x0000 }}            | ${{ flag_z: 1 }}
    ${"ASL A"}  | ${{ a: 0x0001 }}            | ${{ a: 0x0002 }}
    ${"ASL A"}  | ${{ a: 0x0040 }}            | ${{ a: 0x0080 }}
    ${"ASL A"}  | ${{ a: 0x0080 }}            | ${{ a: 0x0100 }}
    ${"ASL A"}  | ${{ a: 0x4000 }}            | ${{ a: 0x8000, flag_n: 1 }}
    ${"ASL A"}  | ${{ a: 0x8101 }}            | ${{ a: 0x0202, flag_c: 1 }}
    ${"ASL A"}  | ${{ a: 0x0081 }}            | ${{ a: 0x0102 }}
    ${"ASL A"}  | ${{ a: 0x8000 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
    ${"ASL A"}  | ${{ a: 0x0100, flag_z: 1 }} | ${{ a: 0x0200, flag_z: 0 }}
    ${"ASL A"}  | ${{ a: 0x0100, flag_n: 1 }} | ${{ a: 0x0200, flag_n: 0 }}
    ${"ASL A"}  | ${{ a: 0x0100, flag_c: 1 }} | ${{ a: 0x0200, flag_c: 0 }}
  `("$instruction [$input]", ({ instruction, input, output }) => {
    testInstruction(
      instruction,
      { ...input, flag_m: 0 },
      { ...output, flag_m: 0 },
    );
  });
});
