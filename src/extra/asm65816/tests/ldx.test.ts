import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "#const", arg: 0x00 },
  { mode: "dp", arg: 0x00 },
  { mode: "dp,y", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,y", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("X 8-bit", () => {
    test.each`
      value   | initialProcessor            | expectedProcessor
      ${0x00} | ${{ x: 0x0000 }}            | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x00} | ${{ x: 0x00ff }}            | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x80} | ${{ x: 0x0000 }}            | ${{ x: 0x0080, flag_n: 1, flag_z: 0 }}
      ${0xaa} | ${{ x: 0x00ff }}            | ${{ x: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${0xaa} | ${{ x: 0x0000, flag_z: 1 }} | ${{ x: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${0x0a} | ${{ x: 0x00ff, flag_n: 1 }} | ${{ x: 0x000a, flag_n: 0, flag_z: 0 }}
      ${0x00} | ${{ x: 0xff00 }}            | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0xaa} | ${{ x: 0xffff }}            | ${{ x: 0x00aa, flag_n: 1, flag_z: 0 }}
    `(`LDX ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "LDX", arg, mode, ...params });
    });
  });

  describe("X 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{ x: 0x0000 }}            | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x0000} | ${{ x: 0x00ff }}            | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x8000} | ${{ x: 0x0000 }}            | ${{ x: 0x8000, flag_n: 1, flag_z: 0 }}
      ${0xabcd} | ${{ x: 0xffff }}            | ${{ x: 0xabcd, flag_n: 1, flag_z: 0 }}
      ${0x1234} | ${{ x: 0x0000, flag_z: 1 }} | ${{ x: 0x1234, flag_n: 0, flag_z: 0 }}
      ${0x1234} | ${{ x: 0xffff, flag_n: 1 }} | ${{ x: 0x1234, flag_n: 0, flag_z: 0 }}
    `(`LDX ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_x: 0 };
      run({ opcode: "LDX", arg, mode, ...params, initialProcessor });
    });
  });
});
