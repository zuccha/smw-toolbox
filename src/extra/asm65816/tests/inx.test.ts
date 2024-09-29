import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  describe("X 8-bit", () => {
    test.each`
      initialProcessor                       | expectedProcessor
      ${{ x: 0x00ff, flag_n: 1, flag_z: 0 }} | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ x: 0x00fe, flag_n: 1, flag_z: 0 }} | ${{ x: 0x00ff, flag_n: 1, flag_z: 0 }}
      ${{ x: 0x00ab, flag_n: 0, flag_z: 0 }} | ${{ x: 0x00ac, flag_n: 1, flag_z: 0 }}
      ${{ x: 0x007f, flag_n: 0, flag_z: 0 }} | ${{ x: 0x0080, flag_n: 1, flag_z: 0 }}
      ${{ x: 0x0012, flag_n: 1, flag_z: 1 }} | ${{ x: 0x0013, flag_n: 0, flag_z: 0 }}
      ${{ x: 0xffff, flag_n: 1, flag_z: 0 }} | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
    `(`INX [$initialProcessor]`, (params) => {
      run({ opcode: "INX", mode: "implied", ...params });
    });
  });

  describe("X 16-bit", () => {
    test.each`
      initialProcessor                       | expectedProcessor
      ${{ x: 0xffff, flag_n: 1, flag_z: 0 }} | ${{ x: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ x: 0xfffe, flag_n: 1, flag_z: 0 }} | ${{ x: 0xffff, flag_n: 1, flag_z: 0 }}
      ${{ x: 0x82ab, flag_n: 0, flag_z: 0 }} | ${{ x: 0x82ac, flag_n: 1, flag_z: 0 }}
      ${{ x: 0x7fff, flag_n: 0, flag_z: 0 }} | ${{ x: 0x8000, flag_n: 1, flag_z: 0 }}
      ${{ x: 0x6d12, flag_n: 1, flag_z: 1 }} | ${{ x: 0x6d13, flag_n: 0, flag_z: 0 }}
    `(`INX [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_x: 0 };
      run({ opcode: "INX", mode: "implied", ...params, initialProcessor });
    });
  });
});
