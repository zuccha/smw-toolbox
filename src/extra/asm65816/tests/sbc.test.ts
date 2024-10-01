import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "#const", arg: 0x00 },
  // { mode: "dp", arg: 0x00 },
  // { mode: "dp,x", arg: 0x00 },
  // { mode: "(dp)", arg: 0x00 },
  // { mode: "(dp,x)", arg: 0x00 },
  // { mode: "(dp),y", arg: 0x00 },
  // { mode: "[dp]", arg: 0x00 },
  // { mode: "[dp],y", arg: 0x00 },
  // { mode: "addr", arg: 0x0000 },
  // { mode: "addr,x", arg: 0x0000 },
  // { mode: "addr,y", arg: 0x0000 },
  // { mode: "long", arg: 0x000000 },
  // { mode: "long,x", arg: 0x000000 },
  // { mode: "sr,s", arg: 0x00 },
  // { mode: "(sr,s),y", arg: 0x00 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value   | initialProcessor                                  | expectedProcessor
      ${0x00} | ${{ a: 0x0000, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x01} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x00} | ${{ a: 0x0000, flag_c: 0 }}                       | ${{ a: 0x00ff, flag_n: 1, flag_v: 1, flag_c: 0 }}
      ${0xff} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0002, flag_c: 0 }}
      ${0x01} | ${{ a: 0x00ff, flag_c: 1 }}                       | ${{ a: 0x00fe, flag_n: 1, flag_v: 1 }}
      ${0x01} | ${{ a: 0x0010, flag_c: 1 }}                       | ${{ a: 0x000f }}
      ${0x01} | ${{ a: 0x00c0, flag_c: 1, flag_n: 1, flag_v: 1 }} | ${{ a: 0x00bf, flag_n: 1, flag_v: 0 }}
      ${0x01} | ${{ a: 0x0080, flag_c: 1, flag_n: 1, flag_v: 0 }} | ${{ a: 0x007f, flag_n: 0, flag_v: 1 }}
      ${0x01} | ${{ a: 0x0040, flag_c: 1, flag_n: 0, flag_v: 1 }} | ${{ a: 0x003f, flag_n: 0, flag_v: 0 }}
      ${0x00} | ${{ a: 0xff00, flag_c: 0 }}                       | ${{ a: 0xffff, flag_n: 1, flag_v: 1, flag_c: 0 }}
    `(`SBC ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "SBC", arg, mode, ...params });
    });
  });

  describe("A 8-bit (decimal)", () => {
    test.each`
      value   | initialProcessor                                  | expectedProcessor
      ${0x00} | ${{ a: 0x0000, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x01} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x00} | ${{ a: 0x0000, flag_c: 0 }}                       | ${{ a: 0x0099, flag_n: 1, flag_v: 0, flag_c: 1 }}
      ${0xff} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0036, flag_c: 1 }}
      ${0x01} | ${{ a: 0x00ff, flag_c: 1 }}                       | ${{ a: 0x0064, flag_n: 0, flag_v: 1 }}
      ${0x01} | ${{ a: 0x0010, flag_c: 1 }}                       | ${{ a: 0x0009, flag_n: 0, flag_v: 0 }}
      ${0x01} | ${{ a: 0x00c0, flag_c: 1, flag_n: 1, flag_v: 1 }} | ${{ a: 0x0019, flag_n: 0, flag_v: 0 }}
      ${0x01} | ${{ a: 0x0080, flag_c: 1, flag_n: 1, flag_v: 0 }} | ${{ a: 0x0079, flag_n: 0, flag_v: 1 }}
      ${0x01} | ${{ a: 0x0040, flag_c: 1, flag_n: 0, flag_v: 1 }} | ${{ a: 0x0039, flag_n: 0, flag_v: 0 }}
      ${0x00} | ${{ a: 0xff00, flag_c: 0 }}                       | ${{ a: 0xff99, flag_n: 1, flag_v: 0, flag_c: 1 }}
    `(`SBC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_d: 1 };
      run({ opcode: "SBC", arg, mode, ...params, initialProcessor });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor                                  | expectedProcessor
      ${0x0000} | ${{ a: 0x0000, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x0001} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x0000, flag_c: 0 }}                       | ${{ a: 0xffff, flag_n: 1, flag_v: 1, flag_c: 0 }}
      ${0xffff} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0002, flag_c: 0 }}
      ${0x0001} | ${{ a: 0xffff, flag_c: 1 }}                       | ${{ a: 0xfffe, flag_n: 1, flag_v: 1 }}
      ${0x0001} | ${{ a: 0x0010, flag_c: 1 }}                       | ${{ a: 0x000f }}
      ${0x0001} | ${{ a: 0xc000, flag_c: 1, flag_n: 1, flag_v: 1 }} | ${{ a: 0xbfff, flag_n: 1, flag_v: 0 }}
      ${0x0001} | ${{ a: 0x8000, flag_c: 1, flag_n: 1, flag_v: 0 }} | ${{ a: 0x7fff, flag_n: 0, flag_v: 1 }}
      ${0x0001} | ${{ a: 0x4000, flag_c: 1, flag_n: 0, flag_v: 1 }} | ${{ a: 0x3fff, flag_n: 0, flag_v: 0 }}
    `(`SBC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "SBC", arg, mode, ...params, initialProcessor });
    });
  });

  describe("A 16-bit (decimal)", () => {
    test.each`
      value     | initialProcessor                                  | expectedProcessor
      ${0x0000} | ${{ a: 0x0000, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x0001} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x0000, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x0000, flag_c: 0 }}                       | ${{ a: 0x9999, flag_n: 1, flag_v: 0, flag_c: 1 }}
      ${0xffff} | ${{ a: 0x0001, flag_c: 1 }}                       | ${{ a: 0x3336, flag_c: 1 }}
      ${0x0001} | ${{ a: 0xffff, flag_c: 1 }}                       | ${{ a: 0x6664, flag_n: 0, flag_v: 1 }}
      ${0x0001} | ${{ a: 0x0010, flag_c: 1 }}                       | ${{ a: 0x0009, flag_n: 0, flag_v: 0 }}
      ${0x0001} | ${{ a: 0xc000, flag_c: 1, flag_n: 1, flag_v: 1 }} | ${{ a: 0x1999, flag_n: 0, flag_v: 0 }}
      ${0x0001} | ${{ a: 0x8000, flag_c: 1, flag_n: 1, flag_v: 0 }} | ${{ a: 0x7999, flag_n: 0, flag_v: 1 }}
      ${0x0001} | ${{ a: 0x4000, flag_c: 1, flag_n: 0, flag_v: 1 }} | ${{ a: 0x3999, flag_n: 0, flag_v: 0 }}
    `(`SBC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = {
        ...params.initialProcessor,
        flag_m: 0,
        flag_d: 1,
      };
      run({ opcode: "SBC", arg, mode, ...params, initialProcessor });
    });
  });
});
