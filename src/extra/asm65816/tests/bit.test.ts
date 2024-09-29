import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,x", arg: 0x0000 },
];

describe("'#const'", () => {
  describe("A 8-bit", () => {
    test.each`
      value   | initialProcessor | expectedProcessor
      ${0x00} | ${{ a: 0x0000 }} | ${{ flag_z: 1 }}
      ${0x55} | ${{ a: 0x00aa }} | ${{ flag_z: 1 }}
      ${0x01} | ${{ a: 0xff10 }} | ${{ flag_z: 1 }}
      ${0xfe} | ${{ a: 0x0001 }} | ${{ flag_z: 1 }}
      ${0x01} | ${{ a: 0x0001 }} | ${{ flag_z: 0 }}
      ${0xff} | ${{ a: 0xffff }} | ${{ flag_z: 0 }}
    `(`BIT A [$initialProcessor]`, (params) => {
      run({ opcode: "BIT", arg: 0, mode: "#const", ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }} | ${{ flag_z: 1 }}
      ${0x5555} | ${{ a: 0xaaaa }} | ${{ flag_z: 1 }}
      ${0x0001} | ${{ a: 0xff10 }} | ${{ flag_z: 1 }}
      ${0xfffe} | ${{ a: 0x0001 }} | ${{ flag_z: 1 }}
      ${0x0001} | ${{ a: 0x0001 }} | ${{ flag_z: 0 }}
      ${0xffff} | ${{ a: 0xffff }} | ${{ flag_z: 0 }}
    `(`BIT A [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({
        opcode: "BIT",
        arg: 0,
        mode: "#const",
        ...params,
        initialProcessor,
      });
    });
  });
});

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value   | initialProcessor                       | expectedProcessor
      ${0x00} | ${{ a: 0x0000 }}                       | ${{ flag_z: 1 }}
      ${0x55} | ${{ a: 0x00aa }}                       | ${{ flag_v: 1, flag_z: 1 }}
      ${0x01} | ${{ a: 0xff10 }}                       | ${{ flag_z: 1 }}
      ${0x01} | ${{ a: 0x0001 }}                       | ${{ flag_z: 0 }}
      ${0xfe} | ${{ a: 0x0001 }}                       | ${{ flag_n: 1, flag_v: 1, flag_z: 1 }}
      ${0x01} | ${{ a: 0x0001, flag_n: 1, flag_v: 1 }} | ${{ flag_n: 0, flag_v: 0, flag_z: 0 }}
      ${0x40} | ${{ a: 0x0000 }}                       | ${{ flag_v: 1, flag_z: 1 }}
      ${0x80} | ${{ a: 0x0000 }}                       | ${{ flag_n: 1, flag_z: 1 }}
      ${0xff} | ${{ a: 0xffff }}                       | ${{ flag_n: 1, flag_v: 1, flag_z: 0 }}
    `(`BIT ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "BIT", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor                       | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }}                       | ${{ flag_z: 1 }}
      ${0x5555} | ${{ a: 0xaaaa }}                       | ${{ flag_v: 1, flag_z: 1 }}
      ${0x0001} | ${{ a: 0xff10 }}                       | ${{ flag_z: 1 }}
      ${0x0001} | ${{ a: 0x0001 }}                       | ${{ flag_z: 0 }}
      ${0xfffe} | ${{ a: 0x0001 }}                       | ${{ flag_n: 1, flag_v: 1, flag_z: 1 }}
      ${0x0001} | ${{ a: 0x0001, flag_n: 1, flag_v: 1 }} | ${{ flag_n: 0, flag_v: 0, flag_z: 0 }}
      ${0x4000} | ${{ a: 0x0000 }}                       | ${{ flag_v: 1, flag_z: 1 }}
      ${0x8000} | ${{ a: 0x0000 }}                       | ${{ flag_n: 1, flag_z: 1 }}
      ${0xffff} | ${{ a: 0xffff }}                       | ${{ flag_n: 1, flag_v: 1, flag_z: 0 }}
    `(`BIT ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "BIT", arg, mode, ...params, initialProcessor });
    });
  });
});
