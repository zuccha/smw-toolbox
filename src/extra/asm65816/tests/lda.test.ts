import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "#const", arg: 0x00 },
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "(dp)", arg: 0x00 },
  { mode: "(dp,x)", arg: 0x00 },
  { mode: "(dp),y", arg: 0x00 },
  { mode: "[dp]", arg: 0x00 },
  { mode: "[dp],y", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,x", arg: 0x0000 },
  { mode: "addr,y", arg: 0x0000 },
  { mode: "long", arg: 0x000000 },
  { mode: "long,x", arg: 0x000000 },
  { mode: "sr,s", arg: 0x00 },
  { mode: "(sr,s),y", arg: 0x00 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value   | initialProcessor            | expectedProcessor
      ${0x00} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x00} | ${{ a: 0x00ff }}            | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x80} | ${{ a: 0x0000 }}            | ${{ a: 0x0080, flag_n: 1, flag_z: 0 }}
      ${0xaa} | ${{ a: 0x00ff }}            | ${{ a: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${0xaa} | ${{ a: 0x0000, flag_z: 1 }} | ${{ a: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${0x0a} | ${{ a: 0x00ff, flag_n: 1 }} | ${{ a: 0x000a, flag_n: 0, flag_z: 0 }}
      ${0x00} | ${{ a: 0xff00 }}            | ${{ a: 0xff00, flag_n: 0, flag_z: 1 }}
      ${0xaa} | ${{ a: 0xffff }}            | ${{ a: 0xffaa, flag_n: 1, flag_z: 0 }}
    `(`LDA ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "LDA", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x00ff }}            | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x8000} | ${{ a: 0x0000 }}            | ${{ a: 0x8000, flag_n: 1, flag_z: 0 }}
      ${0xabcd} | ${{ a: 0xffff }}            | ${{ a: 0xabcd, flag_n: 1, flag_z: 0 }}
      ${0x1234} | ${{ a: 0x0000, flag_z: 1 }} | ${{ a: 0x1234, flag_n: 0, flag_z: 0 }}
      ${0x1234} | ${{ a: 0xffff, flag_n: 1 }} | ${{ a: 0x1234, flag_n: 0, flag_z: 0 }}
    `(`LDA ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "LDA", arg, mode, ...params, initialProcessor });
    });
  });
});
