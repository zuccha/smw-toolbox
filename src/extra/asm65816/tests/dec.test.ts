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
      ${{ a: 0x0000, flag_n: 0, flag_z: 0 }} | ${{ a: 0x00ff, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x0001, flag_n: 0, flag_z: 0 }} | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ a: 0x00ab, flag_n: 0, flag_z: 0 }} | ${{ a: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x0080, flag_n: 1, flag_z: 0 }} | ${{ a: 0x007f, flag_n: 0, flag_z: 0 }}
      ${{ a: 0x0012, flag_n: 1, flag_z: 1 }} | ${{ a: 0x0011, flag_n: 0, flag_z: 0 }}
      ${{ a: 0xff00, flag_n: 0, flag_z: 1 }} | ${{ a: 0xffff, flag_n: 1, flag_z: 0 }}
    `(`DEC A [$initialProcessor]`, (params) => {
      run({ opcode: "DEC", mode: "A", ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      initialProcessor                       | expectedProcessor
      ${{ a: 0x0000, flag_n: 0, flag_z: 0 }} | ${{ a: 0xffff, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x0001, flag_n: 0, flag_z: 0 }} | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ a: 0x9000, flag_n: 0, flag_z: 0 }} | ${{ a: 0x8fff, flag_n: 1, flag_z: 0 }}
      ${{ a: 0x8000, flag_n: 1, flag_z: 0 }} | ${{ a: 0x7fff, flag_n: 0, flag_z: 0 }}
      ${{ a: 0x1112, flag_n: 1, flag_z: 1 }} | ${{ a: 0x1111, flag_n: 0, flag_z: 0 }}
    `(`DEC A [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "DEC", mode: "A", ...params, initialProcessor });
    });
  });
});

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value     | initialProcessor            | expectedValue | expectedProcessor
      ${0x0000} | ${{ flag_n: 0, flag_z: 0 }} | ${0x00ff}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x0001} | ${{ flag_n: 0, flag_z: 0 }} | ${0x0000}     | ${{ flag_n: 0, flag_z: 1 }}
      ${0x00ab} | ${{ flag_n: 0, flag_z: 0 }} | ${0x00aa}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x0080} | ${{ flag_n: 1, flag_z: 0 }} | ${0x007f}     | ${{ flag_n: 0, flag_z: 0 }}
      ${0x0012} | ${{ flag_n: 1, flag_z: 1 }} | ${0x0011}     | ${{ flag_n: 0, flag_z: 0 }}
      ${0xff00} | ${{ flag_n: 0, flag_z: 1 }} | ${0xffff}     | ${{ flag_n: 1, flag_z: 0 }}
    `(`DEC ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "DEC", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedValue | expectedProcessor
      ${0x0000} | ${{ flag_n: 0, flag_z: 0 }} | ${0xffff}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x0001} | ${{ flag_n: 0, flag_z: 0 }} | ${0x0000}     | ${{ flag_n: 0, flag_z: 1 }}
      ${0x9000} | ${{ flag_n: 0, flag_z: 0 }} | ${0x8fff}     | ${{ flag_n: 1, flag_z: 0 }}
      ${0x8000} | ${{ flag_n: 1, flag_z: 0 }} | ${0x7fff}     | ${{ flag_n: 0, flag_z: 0 }}
      ${0x1112} | ${{ flag_n: 1, flag_z: 1 }} | ${0x1111}     | ${{ flag_n: 0, flag_z: 0 }}
    `(`DEC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "DEC", arg, mode, ...params, initialProcessor });
    });
  });
});
