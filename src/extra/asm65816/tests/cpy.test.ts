import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "#const", arg: 0x00 },
  { mode: "dp", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("Y 8-bit", () => {
    test.each`
      value   | initialProcessor | expectedProcessor
      ${0x00} | ${{ y: 0x0000 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x00} | ${{ y: 0x0001 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0x01} | ${{ y: 0x0000 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0xa1} | ${{ y: 0x0045 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x01} | ${{ y: 0x00ff }} | ${{ flag_n: 1, flag_c: 1, flag_z: 0 }}
      ${0xff} | ${{ y: 0x0001 }} | ${{ flag_n: 0, flag_c: 0, flag_z: 0 }}
      ${0x56} | ${{ y: 0x0056 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
    `(`CPY ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "CPY", arg, mode, ...params });
    });
  });

  describe("Y 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedProcessor
      ${0x0000} | ${{ y: 0x0000 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x0000} | ${{ y: 0x0001 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0x0001} | ${{ y: 0x0000 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x00a1} | ${{ y: 0x0045 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
      ${0x0001} | ${{ y: 0x00ff }} | ${{ flag_n: 0, flag_c: 1, flag_z: 0 }}
      ${0xff00} | ${{ y: 0x0001 }} | ${{ flag_n: 0, flag_c: 0, flag_z: 0 }}
      ${0xff56} | ${{ y: 0xff56 }} | ${{ flag_n: 0, flag_c: 1, flag_z: 1 }}
      ${0x2345} | ${{ y: 0x1234 }} | ${{ flag_n: 1, flag_c: 0, flag_z: 0 }}
    `(`CPY ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_x: 0 };
      run({ opcode: "CPY", arg, mode, ...params, initialProcessor });
    });
  });
});
