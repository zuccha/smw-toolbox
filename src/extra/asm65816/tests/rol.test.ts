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
      ${{ a: 0x0001 }}            | ${{ a: 0x0002 }}
      ${{ a: 0x0040 }}            | ${{ a: 0x0080, flag_n: 1 }}
      ${{ a: 0x0081 }}            | ${{ a: 0x0002, flag_c: 1 }}
      ${{ a: 0x0180 }}            | ${{ a: 0x0100, flag_c: 1, flag_z: 1 }}
      ${{ a: 0x0001, flag_z: 1 }} | ${{ a: 0x0002, flag_z: 0 }}
      ${{ a: 0x0001, flag_n: 1 }} | ${{ a: 0x0002, flag_n: 0 }}
      ${{ a: 0x0001, flag_c: 1 }} | ${{ a: 0x0003, flag_c: 0 }}
    `(`ROL A [$initialProcessor]`, (params) => {
      run({ opcode: "ROL", mode: "A", ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      initialProcessor            | expectedProcessor
      ${{ a: 0x0000 }}            | ${{ flag_z: 1 }}
      ${{ a: 0x0001 }}            | ${{ a: 0x0002 }}
      ${{ a: 0x0040 }}            | ${{ a: 0x0080 }}
      ${{ a: 0x0080 }}            | ${{ a: 0x0100 }}
      ${{ a: 0x4000 }}            | ${{ a: 0x8000, flag_n: 1 }}
      ${{ a: 0x8101 }}            | ${{ a: 0x0202, flag_c: 1 }}
      ${{ a: 0x0081 }}            | ${{ a: 0x0102 }}
      ${{ a: 0x8000 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
      ${{ a: 0x0100, flag_z: 1 }} | ${{ a: 0x0200, flag_z: 0 }}
      ${{ a: 0x0100, flag_n: 1 }} | ${{ a: 0x0200, flag_n: 0 }}
      ${{ a: 0x0100, flag_c: 1 }} | ${{ a: 0x0201, flag_c: 0 }}
    `(`ROL A [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "ROL", mode: "A", ...params, initialProcessor });
    });
  });
});

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value     | initialProcessor | expectedValue | expectedProcessor
      ${0x0000} | ${{}}            | ${0x0000}     | ${{ flag_z: 1 }}
      ${0x0001} | ${{}}            | ${0x0002}     | ${{}}
      ${0x0040} | ${{}}            | ${0x0080}     | ${{ flag_n: 1 }}
      ${0x0081} | ${{}}            | ${0x0002}     | ${{ flag_c: 1 }}
      ${0x0180} | ${{}}            | ${0x0100}     | ${{ flag_c: 1, flag_z: 1 }}
      ${0x0001} | ${{ flag_z: 1 }} | ${0x0002}     | ${{ flag_z: 0 }}
      ${0x0001} | ${{ flag_n: 1 }} | ${0x0002}     | ${{ flag_n: 0 }}
      ${0x0001} | ${{ flag_c: 1 }} | ${0x0003}     | ${{ flag_c: 0 }}
    `(`ROL ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "ROL", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedValue | expectedProcessor
      ${0x0000} | ${{}}            | ${0x0000}     | ${{ flag_z: 1 }}
      ${0x0001} | ${{}}            | ${0x0002}     | ${{}}
      ${0x0040} | ${{}}            | ${0x0080}     | ${{}}
      ${0x0080} | ${{}}            | ${0x0100}     | ${{}}
      ${0x4000} | ${{}}            | ${0x8000}     | ${{ flag_n: 1 }}
      ${0x8101} | ${{}}            | ${0x0202}     | ${{ flag_c: 1 }}
      ${0x0081} | ${{}}            | ${0x0102}     | ${{}}
      ${0x8000} | ${{}}            | ${0x0000}     | ${{ flag_c: 1, flag_z: 1 }}
      ${0x0100} | ${{ flag_z: 1 }} | ${0x0200}     | ${{ flag_z: 0 }}
      ${0x0100} | ${{ flag_n: 1 }} | ${0x0200}     | ${{ flag_n: 0 }}
      ${0x0100} | ${{ flag_c: 1 }} | ${0x0201}     | ${{ flag_c: 0 }}
    `(`ROL ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "ROL", arg, mode, ...params, initialProcessor });
    });
  });
});
