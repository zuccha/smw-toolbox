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
      ${0x00} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_z: 1 }}
      ${0x00} | ${{ a: 0x0000, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 0 }}
      ${0x01} | ${{ a: 0x0000, flag_c: 1 }} | ${{ a: 0x0002, flag_c: 0 }}
      ${0xff} | ${{ a: 0x0001 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
      ${0xff} | ${{ a: 0x0001, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 1 }}
      ${0x10} | ${{ a: 0x000a }}            | ${{ a: 0x001a }}
      ${0x10} | ${{ a: 0x000a, flag_c: 1 }} | ${{ a: 0x001b, flag_c: 0 }}
      ${0x40} | ${{ a: 0x0000 }}            | ${{ a: 0x0040, flag_v: 1 }}
      ${0x80} | ${{ a: 0x0000 }}            | ${{ a: 0x0080, flag_n: 1 }}
      ${0xc0} | ${{ a: 0x0000 }}            | ${{ a: 0x00c0, flag_n: 1, flag_v: 1 }}
      ${0x00} | ${{ a: 0xc000 }}            | ${{ a: 0xc000, flag_z: 1 }}
      ${0x01} | ${{ a: 0x0000, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
      ${0x01} | ${{ a: 0x0000, flag_v: 1 }} | ${{ a: 0x0001, flag_v: 0 }}
      ${0x01} | ${{ a: 0x0000, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
      ${0x01} | ${{ a: 0x90ff }}            | ${{ a: 0x9000, flag_z: 1, flag_c: 1 }}
    `(`ADC ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "ADC", arg, mode, ...params });
    });
  });

  describe("A 8-bit (decimal)", () => {
    test.each`
      value   | initialProcessor            | expectedProcessor
      ${0x00} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_z: 1 }}
      ${0x00} | ${{ a: 0x0000, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 0 }}
      ${0x01} | ${{ a: 0x0009 }}            | ${{ a: 0x0010 }}
      ${0x01} | ${{ a: 0x000a }}            | ${{ a: 0x0011 }}
      ${0x01} | ${{ a: 0x0a99 }}            | ${{ a: 0x0a00, flag_z: 1, flag_c: 1 }}
      ${0x0a} | ${{ a: 0x0001 }}            | ${{ a: 0x0011 }}
      ${0xff} | ${{ a: 0x00ff }}            | ${{ a: 0x0030, flag_c: 1 }}
      ${0x01} | ${{ a: 0x0039 }}            | ${{ a: 0x0040, flag_v: 1 }}
      ${0x00} | ${{ a: 0x0079, flag_c: 1 }} | ${{ a: 0x0080, flag_n: 1, flag_c: 0 }}
      ${0x01} | ${{ a: 0x0000, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
      ${0x01} | ${{ a: 0x0000, flag_v: 1 }} | ${{ a: 0x0001, flag_v: 0 }}
      ${0x01} | ${{ a: 0x0000, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
    `(`ADC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_d: 1 };
      run({ opcode: "ADC", arg, mode, ...params, initialProcessor });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x0000, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 0 }}
      ${0x0001} | ${{ a: 0x0000, flag_c: 1 }} | ${{ a: 0x0002, flag_c: 0 }}
      ${0xffff} | ${{ a: 0x0001 }}            | ${{ a: 0x0000, flag_c: 1, flag_z: 1 }}
      ${0xffff} | ${{ a: 0x0001, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 1 }}
      ${0x9c10} | ${{ a: 0x140a }}            | ${{ a: 0xb01a, flag_n: 1 }}
      ${0x0010} | ${{ a: 0x000a, flag_c: 1 }} | ${{ a: 0x001b, flag_c: 0 }}
      ${0x4000} | ${{ a: 0x0000 }}            | ${{ a: 0x4000, flag_v: 1 }}
      ${0x8000} | ${{ a: 0x0000 }}            | ${{ a: 0x8000, flag_n: 1 }}
      ${0xc000} | ${{ a: 0x0000 }}            | ${{ a: 0xc000, flag_n: 1, flag_v: 1 }}
      ${0x0000} | ${{ a: 0x00c0 }}            | ${{ a: 0x00c0 }}
      ${0x0001} | ${{ a: 0x0000, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
      ${0x0001} | ${{ a: 0x0000, flag_v: 1 }} | ${{ a: 0x0001, flag_v: 0 }}
      ${0x0001} | ${{ a: 0x0000, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
    `(`ADC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "ADC", arg, mode, ...params, initialProcessor });
    });
  });

  describe("A 16-bit (decimal)", () => {
    test.each`
      value     | initialProcessor            | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }}            | ${{ a: 0x0000, flag_z: 1 }}
      ${0x0000} | ${{ a: 0x0000, flag_c: 1 }} | ${{ a: 0x0001, flag_c: 0 }}
      ${0x0001} | ${{ a: 0x0009 }}            | ${{ a: 0x0010 }}
      ${0x0001} | ${{ a: 0x000a }}            | ${{ a: 0x0011 }}
      ${0x0001} | ${{ a: 0x0a99 }}            | ${{ a: 0x1100 }}
      ${0x0001} | ${{ a: 0x9999 }}            | ${{ a: 0x0000, flag_z: 1, flag_c: 1 }}
      ${0x0b0a} | ${{ a: 0x0001 }}            | ${{ a: 0x1111 }}
      ${0x1337} | ${{ a: 0x0a69 }}            | ${{ a: 0x2406 }}
      ${0x00ff} | ${{ a: 0x00ff }}            | ${{ a: 0x0330 }}
      ${0xffff} | ${{ a: 0xffff }}            | ${{ a: 0x3330, flag_c: 1 }}
      ${0x0100} | ${{ a: 0x3900 }}            | ${{ a: 0x4000, flag_v: 1 }}
      ${0x0000} | ${{ a: 0x7999, flag_c: 1 }} | ${{ a: 0x8000, flag_n: 1, flag_c: 0 }}
      ${0x0001} | ${{ a: 0x0000, flag_n: 1 }} | ${{ a: 0x0001, flag_n: 0 }}
      ${0x0001} | ${{ a: 0x0000, flag_v: 1 }} | ${{ a: 0x0001, flag_v: 0 }}
      ${0x0001} | ${{ a: 0x0000, flag_z: 1 }} | ${{ a: 0x0001, flag_z: 0 }}
    `(`ADC ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = {
        ...params.initialProcessor,
        flag_m: 0,
        flag_d: 1,
      };
      run({ opcode: "ADC", arg, mode, ...params, initialProcessor });
    });
  });
});
