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
      ${0x00} | ${{}}                       | ${{ flag_z: 1 }}
      ${0x00} | ${{ a: 0x00ff }}            | ${{ a: 0x0000, flag_z: 1 }}
      ${0x00} | ${{ a: 0xffff }}            | ${{ a: 0xff00, flag_z: 1 }}
      ${0xf0} | ${{ a: 0xffff }}            | ${{ a: 0xfff0, flag_n: 1 }}
      ${0xff} | ${{ a: 0x004a }}            | ${{ a: 0x004a }}
      ${0x40} | ${{ a: 0x00ff }}            | ${{ a: 0x0040 }}
      ${0x80} | ${{ a: 0x00ff }}            | ${{ a: 0x0080, flag_n: 1 }}
      ${0xc0} | ${{ a: 0x00ff }}            | ${{ a: 0x00c0, flag_n: 1 }}
      ${0x40} | ${{ a: 0x4000 }}            | ${{ a: 0x4000, flag_z: 1 }}
      ${0x80} | ${{ a: 0x8000 }}            | ${{ a: 0x8000, flag_z: 1 }}
      ${0xc0} | ${{ a: 0xc000 }}            | ${{ a: 0xc000, flag_z: 1 }}
      ${0x01} | ${{ a: 0x0001, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
      ${0x01} | ${{ a: 0x0001, flag_v: 1 }} | ${{ a: 0x0001 }}
      ${0x01} | ${{ a: 0x0001, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
    `(`AND ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "AND", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{}}                       | ${{ flag_z: 1 }}
      ${0x0000} | ${{ a: 0xffff }}            | ${{ a: 0x0000, flag_z: 1 }}
      ${0x10f0} | ${{ a: 0xfff0 }}            | ${{ a: 0x10f0 }}
      ${0xffff} | ${{ a: 0x004a }}            | ${{ a: 0x004a }}
      ${0x4000} | ${{ a: 0xffff }}            | ${{ a: 0x4000 }}
      ${0x8000} | ${{ a: 0xffff }}            | ${{ a: 0x8000, flag_n: 1 }}
      ${0xc000} | ${{ a: 0xffff }}            | ${{ a: 0xc000, flag_n: 1 }}
      ${0x0001} | ${{ a: 0x0001, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
      ${0x0001} | ${{ a: 0x0001, flag_v: 1 }} | ${{ a: 0x0001 }}
      ${0x0001} | ${{ a: 0x0001, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
    `(`AND ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "AND", arg, mode, ...params, initialProcessor });
    });
  });
});
