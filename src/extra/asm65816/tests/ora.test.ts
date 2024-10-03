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
      ${0x00} | ${{ a: 0x00ff }}            | ${{ a: 0x00ff, flag_n: 1, flag_z: 0 }}
      ${0x00} | ${{ a: 0xffff }}            | ${{ a: 0xffff, flag_n: 1, flag_z: 0 }}
      ${0xf0} | ${{ a: 0xfff0 }}            | ${{ a: 0xfff0, flag_n: 1, flag_z: 0 }}
      ${0x00} | ${{ a: 0xff0f }}            | ${{ a: 0xff0f, flag_n: 0, flag_z: 0 }}
      ${0x0f} | ${{ a: 0xff0f }}            | ${{ a: 0xff0f, flag_n: 0, flag_z: 0 }}
      ${0x01} | ${{ a: 0x0010, flag_n: 1 }} | ${{ a: 0x0011, flag_n: 0 }}
      ${0x01} | ${{ a: 0x0010, flag_z: 1 }} | ${{ a: 0x0011, flag_z: 0 }}
    `(`ORA ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "ORA", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_n: 0, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x00ff }}            | ${{ a: 0x00ff, flag_n: 0, flag_z: 0 }}
      ${0x0000} | ${{ a: 0xffff }}            | ${{ a: 0xffff, flag_n: 1, flag_z: 0 }}
      ${0xf000} | ${{ a: 0xfff0 }}            | ${{ a: 0xfff0, flag_n: 1, flag_z: 0 }}
      ${0x0000} | ${{ a: 0xff0f }}            | ${{ a: 0xff0f, flag_n: 1, flag_z: 0 }}
      ${0x00f0} | ${{ a: 0x0f0f }}            | ${{ a: 0x0fff, flag_n: 0, flag_z: 0 }}
      ${0x0001} | ${{ a: 0x0010, flag_n: 1 }} | ${{ a: 0x0011, flag_n: 0 }}
      ${0x0001} | ${{ a: 0x0010, flag_z: 1 }} | ${{ a: 0x0011, flag_z: 0 }}
    `(`ORA ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "ORA", arg, mode, ...params, initialProcessor });
    });
  });
});
