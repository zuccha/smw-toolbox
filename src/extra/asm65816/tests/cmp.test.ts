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
      value   | initialProcessor | expectedProcessor
      ${0x00} | ${{ a: 0x0000 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x00} | ${{ a: 0x0001 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0x01} | ${{ a: 0x0000 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0xa1} | ${{ a: 0x0045 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x01} | ${{ a: 0x00ff }} | ${{ flag_n: 1, flag_c: 1, flag_z: 0 }}
      ${0xff} | ${{ a: 0x0001 }} | ${{ flag_n: 0, flag_c: 0, flag_z: 0 }}
      ${0x56} | ${{ a: 0xff56 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x01} | ${{ a: 0xff00 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
    `(`CMP ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "CMP", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x0001 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0x0001} | ${{ a: 0x0000 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x00a1} | ${{ a: 0x0045 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x0001} | ${{ a: 0x00ff }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0xff00} | ${{ a: 0x0001 }} | ${{ flag_n: 0, flag_c: 0, flag_z: 0 }}
      ${0xff56} | ${{ a: 0xff56 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x2345} | ${{ a: 0x1234 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
    `(`CMP ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "CMP", arg, mode, ...params, initialProcessor });
    });
  });
});
