import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "#const", arg: 0x00 },
  { mode: "dp", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("X 8-bit", () => {
    test.each`
      value   | initialProcessor | expectedProcessor
      ${0x00} | ${{ x: 0x0000 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x00} | ${{ x: 0x0001 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0x01} | ${{ x: 0x0000 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0xa1} | ${{ x: 0x0045 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x01} | ${{ x: 0x00ff }} | ${{ flag_n: 1, flag_c: 1, flag_z: 0 }}
      ${0xff} | ${{ x: 0x0001 }} | ${{ flag_n: 0, flag_c: 0, flag_z: 0 }}
      ${0x56} | ${{ x: 0x0056 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
    `(`CPX ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "CPX", arg, mode, ...params });
    });
  });

  describe("X 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedProcessor
      ${0x0000} | ${{ x: 0x0000 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x0000} | ${{ x: 0x0001 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0x0001} | ${{ x: 0x0000 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x00a1} | ${{ x: 0x0045 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x0001} | ${{ x: 0x00ff }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0xff00} | ${{ x: 0x0001 }} | ${{ flag_n: 0, flag_c: 0, flag_z: 0 }}
      ${0xff56} | ${{ x: 0xff56 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x2345} | ${{ x: 0x1234 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
    `(`CPX ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_x: 0 };
      run({ opcode: "CPX", arg, mode, ...params, initialProcessor });
    });
  });
});
