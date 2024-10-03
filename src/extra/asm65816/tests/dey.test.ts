import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  describe("Y 8-bit", () => {
    test.each`
      initialProcessor                       | expectedProcessor
      ${{ y: 0x0000, flag_n: 0, flag_z: 0 }} | ${{ y: 0x00ff, flag_n: 1, flag_z: 0 }}
      ${{ y: 0x0001, flag_n: 0, flag_z: 0 }} | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ y: 0x00ab, flag_n: 0, flag_z: 0 }} | ${{ y: 0x00aa, flag_n: 1, flag_z: 0 }}
      ${{ y: 0x0080, flag_n: 1, flag_z: 0 }} | ${{ y: 0x007f, flag_n: 0, flag_z: 0 }}
      ${{ y: 0x0012, flag_n: 1, flag_z: 1 }} | ${{ y: 0x0011, flag_n: 0, flag_z: 0 }}
      ${{ y: 0xff00, flag_n: 0, flag_z: 0 }} | ${{ y: 0x00ff, flag_n: 1, flag_z: 0 }}
    `(`DEY [$initialProcessor]`, (params) => {
      run({ opcode: "DEY", mode: "implied", ...params });
    });
  });

  describe("Y 16-bit", () => {
    test.each`
      initialProcessor                       | expectedProcessor
      ${{ y: 0x0000, flag_n: 0, flag_z: 0 }} | ${{ y: 0xffff, flag_n: 1, flag_z: 0 }}
      ${{ y: 0x0001, flag_n: 0, flag_z: 0 }} | ${{ y: 0x0000, flag_n: 0, flag_z: 1 }}
      ${{ y: 0x9000, flag_n: 0, flag_z: 0 }} | ${{ y: 0x8fff, flag_n: 1, flag_z: 0 }}
      ${{ y: 0x8000, flag_n: 1, flag_z: 0 }} | ${{ y: 0x7fff, flag_n: 0, flag_z: 0 }}
      ${{ y: 0x1112, flag_n: 1, flag_z: 1 }} | ${{ y: 0x1111, flag_n: 0, flag_z: 0 }}
    `(`DEY [$initialProcessor]`, (params) => {
      const initialProcessor = { ...params.initialProcessor, flag_x: 0 };
      run({ opcode: "DEY", mode: "implied", ...params, initialProcessor });
    });
  });
});
