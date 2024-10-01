import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,x", arg: 0x0000 },
];

describe("'A'", () => {
  describe("A 8-bit", () => {
    test.each`
      initialProcessor            | expectedProcessor
      ${{ a: 0x0000 }}            | ${{ flag_z: 1 }}
      ${{ a: 0x0002 }}            | ${{ a: 0x0001 }}
      ${{ a: 0x0080, flag: 1 }}   | ${{ a: 0x0040, flag_n: 0 }}
      ${{ a: 0x0081, flag: 1 }}   | ${{ a: 0x0040, flag_c: 1 }}
      ${{ a: 0x0101 }}            | ${{ a: 0x0100, flag_c: 1, flag_z: 1 }}
      ${{ a: 0x0004, flag_z: 1 }} | ${{ a: 0x0002, flag_z: 0 }}
      ${{ a: 0x0004, flag_n: 1 }} | ${{ a: 0x0002, flag_n: 0 }}
      ${{ a: 0x0004, flag_c: 1 }} | ${{ a: 0x0082, flag_c: 0 }}
    `(`ROR A [$initialProcessor]`, (params) => {
      run({ opcode: "ROR", mode: "A", ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      initialProcessor            | expectedProcessor
      ${{ a: 0x0000 }}            | ${{ flag_z: 1 }}
      ${{ a: 0x0004 }}            | ${{ a: 0x0002 }}
      ${{ a: 0x0080 }}            | ${{ a: 0x0040 }}
      ${{ a: 0x0100 }}            | ${{ a: 0x0080 }}
      ${{ a: 0x8000, flag: 1 }}   | ${{ a: 0x4000, flag_n: 0 }}
      ${{ a: 0x8111, flag: 1 }}   | ${{ a: 0x4088, flag_c: 1 }}
      ${{ a: 0x0001 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
      ${{ a: 0x0400, flag_z: 1 }} | ${{ a: 0x0200, flag_z: 0 }}
      ${{ a: 0x0400, flag_n: 1 }} | ${{ a: 0x0200, flag_n: 0 }}
      ${{ a: 0x0400, flag_c: 1 }} | ${{ a: 0x8200, flag_c: 0 }}
    `(`ROR A [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "ROR", mode: "A", ...params, initialProcessor });
    });
  });
});

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value     | initialProcessor | expectedValue | expectedProcessor
      ${0x0000} | ${{}}            | ${0x0000}     | ${{ flag_z: 1 }}
      ${0x0002} | ${{}}            | ${0x0001}     | ${{}}
      ${0x0080} | ${{}}            | ${0x0040}     | ${{ flag_n: 0 }}
      ${0x0081} | ${{}}            | ${0x0040}     | ${{ flag_c: 1 }}
      ${0x0101} | ${{}}            | ${0x0100}     | ${{ flag_c: 1, flag_z: 1 }}
      ${0x0004} | ${{ flag_z: 1 }} | ${0x0002}     | ${{ flag_z: 0 }}
      ${0x0004} | ${{ flag_n: 1 }} | ${0x0002}     | ${{ flag_n: 0 }}
      ${0x0004} | ${{ flag_c: 1 }} | ${0x0082}     | ${{ flag_c: 0 }}
    `(`ROR ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "ROR", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedValue | expectedProcessor
      ${0x0000} | ${{}}            | ${0x0000}     | ${{ flag_z: 1 }}
      ${0x0004} | ${{}}            | ${0x0002}     | ${{}}
      ${0x0080} | ${{}}            | ${0x0040}     | ${{}}
      ${0x0100} | ${{}}            | ${0x0080}     | ${{}}
      ${0x8000} | ${{ flag: 1 }}   | ${0x4000}     | ${{ flag_n: 0 }}
      ${0x8111} | ${{ flag: 1 }}   | ${0x4088}     | ${{ flag_c: 1 }}
      ${0x0001} | ${{}}            | ${0x0000}     | ${{ flag_c: 1, flag_z: 1 }}
      ${0x0400} | ${{ flag_z: 1 }} | ${0x0200}     | ${{ flag_z: 0 }}
      ${0x0400} | ${{ flag_n: 1 }} | ${0x0200}     | ${{ flag_n: 0 }}
      ${0x0400} | ${{ flag_c: 1 }} | ${0x8200}     | ${{ flag_c: 0 }}
    `(`ROR ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "ROR", arg, mode, ...params, initialProcessor });
    });
  });
});
