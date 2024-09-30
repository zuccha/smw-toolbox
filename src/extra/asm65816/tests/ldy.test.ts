import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "#const", arg: 0x00 },
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,x", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("Y 8-bit", () => {
    test.each`
      value   | initialProcessor            | expectedProcessor
      ${0x00} | ${{ y: 0x0000 }}            | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x00} | ${{ y: 0x00ff }}            | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x80} | ${{ y: 0x0000 }}            | ${{ y: 0x0080, flag_n: 1, flag_z: 0 }}
      ${0xaa} | ${{ y: 0x00ff }}            | ${{ y: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${0xaa} | ${{ y: 0x0000, flag_z: 1 }} | ${{ y: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${0x0a} | ${{ y: 0x00ff, flag_n: 1 }} | ${{ y: 0x000a, flag_n: 0, flag_z: 0 }}
      ${0x00} | ${{ y: 0xff00 }}            | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0xaa} | ${{ y: 0xffff }}            | ${{ y: 0x00aa, flag_n: 1, flag_z: 0 }}
    `(`LDY ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "LDY", arg, mode, ...params });
    });
  });

  describe("Y 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{ y: 0x0000 }}            | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x0000} | ${{ y: 0x00ff }}            | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x8000} | ${{ y: 0x0000 }}            | ${{ y: 0x8000, flag_n: 1, flag_z: 0 }}
      ${0xabcd} | ${{ y: 0xffff }}            | ${{ y: 0xabcd, flag_n: 1, flag_z: 0 }}
      ${0x1234} | ${{ y: 0x0000, flag_z: 1 }} | ${{ y: 0x1234, flag_n: 0, flag_z: 0 }}
      ${0x1234} | ${{ y: 0xffff, flag_n: 1 }} | ${{ y: 0x1234, flag_n: 0, flag_z: 0 }}
    `(`LDY ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_x: 0 };
      run({ opcode: "LDY", arg, mode, ...params, initialProcessor });
    });
  });
});
