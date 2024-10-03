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
      initialProcessor                       | expectedProcessor
      ${{ a: 0x00ff, flag_n: 1, flag_z: 0 }} | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ a: 0x00fe, flag_n: 1, flag_z: 0 }} | ${{ a: 0x00ff, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x00ab, flag_n: 0, flag_z: 0 }} | ${{ a: 0x00ac, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x007f, flag_n: 0, flag_z: 0 }} | ${{ a: 0x0080, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x0012, flag_n: 1, flag_z: 1 }} | ${{ a: 0x0013, flag_n: 0, flag_z: 0 }}
      ${{ a: 0xffff, flag_n: 1, flag_z: 0 }} | ${{ a: 0xff00, flag_n: 0, flag_z: 1 }}
    `(`INC A [$initialProcessor]`, (params) => {
      run({ opcode: "INC", mode: "A", ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      initialProcessor                       | expectedProcessor
      ${{ a: 0xffff, flag_n: 1, flag_z: 0 }} | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ a: 0xfffe, flag_n: 1, flag_z: 0 }} | ${{ a: 0xffff, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x82ab, flag_n: 0, flag_z: 0 }} | ${{ a: 0x82ac, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x7fff, flag_n: 0, flag_z: 0 }} | ${{ a: 0x8000, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x6d12, flag_n: 1, flag_z: 1 }} | ${{ a: 0x6d13, flag_n: 0, flag_z: 0 }}
    `(`INC A [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "INC", mode: "A", ...params, initialProcessor });
    });
  });
});

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value     | initialProcessor            | expectedValue | expectedProcessor
      ${0x00ff} | ${{ flag_n: 1, flag_z: 0 }} | ${0x0000}     | ${{ flag_n: 0, flag_z: 1 }}
      ${0x00fe} | ${{ flag_n: 1, flag_z: 0 }} | ${0x00ff}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x00ab} | ${{ flag_n: 0, flag_z: 0 }} | ${0x00ac}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x007f} | ${{ flag_n: 0, flag_z: 0 }} | ${0x0080}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x0012} | ${{ flag_n: 1, flag_z: 1 }} | ${0x0013}     | ${{ flag_n: 0, flag_z: 0 }}
      ${0xffff} | ${{ flag_n: 1, flag_z: 0 }} | ${0xff00}     | ${{ flag_n: 0, flag_z: 1 }}
    `(`INC ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "INC", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedValue | expectedProcessor
      ${0xffff} | ${{ flag_n: 1, flag_z: 0 }} | ${0x0000}     | ${{ flag_n: 0, flag_z: 1 }}
      ${0xfffe} | ${{ flag_n: 1, flag_z: 0 }} | ${0xffff}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x82ab} | ${{ flag_n: 0, flag_z: 0 }} | ${0x82ac}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x7fff} | ${{ flag_n: 0, flag_z: 0 }} | ${0x8000}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x6d12} | ${{ flag_n: 1, flag_z: 1 }} | ${0x6d13}     | ${{ flag_n: 0, flag_z: 0 }}
    `(`INC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "INC", arg, mode, ...params, initialProcessor });
    });
  });
});
