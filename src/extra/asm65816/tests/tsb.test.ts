import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  describe("A 8-bit", () => {
    test.each`
      value   | initialProcessor | expectedValue | expectedProcessor
      ${0x00} | ${{ a: 0xff00 }} | ${0x00}       | ${{ flag_z: 1 }}
      ${0x00} | ${{ a: 0xffff }} | ${0xff}       | ${{ flag_z: 1 }}
      ${0xff} | ${{ a: 0xff00 }} | ${0xff}       | ${{ flag_z: 1 }}
      ${0xff} | ${{ a: 0xffff }} | ${0xff}       | ${{ flag_z: 0 }}
      ${0xf0} | ${{ a: 0xff0f }} | ${0xff}       | ${{ flag_z: 1 }}
    `(`TSB ${mode} [$initialProcessor]`, (params) => {
      run({ opcode: "TSB", arg, mode, ...params });
    });
  });

  describe("A 16-bit", () => {
    test.each`
      value     | initialProcessor | expectedValue | expectedProcessor
      ${0x0000} | ${{ a: 0x0000 }} | ${0x0000}     | ${{ flag_z: 1 }}
      ${0x0000} | ${{ a: 0xeeff }} | ${0xeeff}     | ${{ flag_z: 1 }}
      ${0xeeff} | ${{ a: 0x0000 }} | ${0xeeff}     | ${{ flag_z: 1 }}
      ${0xeeff} | ${{ a: 0xeeff }} | ${0xeeff}     | ${{ flag_z: 0 }}
      ${0xee00} | ${{ a: 0x00ff }} | ${0xeeff}     | ${{ flag_z: 1 }}
    `(`TSB ${mode} [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_m: 0 };
      run({ opcode: "TSB", arg, mode, ...params, initialProcessor });
    });
  });
});
