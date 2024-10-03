import { describe, test } from "vitest";
import { run } from "./_run";

describe("'implied'", () => {
  test.each`
    value         | initialFlags  | expectedProcessor
    ${0b00000000} | ${0b00000000} | ${{ flag_n: 0, flag_v: 0, flag_m: 0, flag_x: 0, flag_d: 0, flag_i: 0, flag_z: 0, flag_c: 0 }}
    ${0b11111111} | ${0b00000000} | ${{ flag_n: 1, flag_v: 1, flag_m: 1, flag_x: 1, flag_d: 1, flag_i: 1, flag_z: 1, flag_c: 1 }}
    ${0b00000000} | ${0b11111111} | ${{ flag_n: 1, flag_v: 1, flag_m: 1, flag_x: 1, flag_d: 1, flag_i: 1, flag_z: 1, flag_c: 1 }}
    ${0b00100001} | ${0b00101110} | ${{ flag_n: 0, flag_v: 0, flag_m: 1, flag_x: 0, flag_d: 1, flag_i: 1, flag_z: 1, flag_c: 1 }}
    ${0b00100001} | ${0b11111111} | ${{ flag_n: 1, flag_v: 1, flag_m: 1, flag_x: 1, flag_d: 1, flag_i: 1, flag_z: 1, flag_c: 1 }}
    ${0b11111111} | ${0b11111111} | ${{ flag_n: 1, flag_v: 1, flag_m: 1, flag_x: 1, flag_d: 1, flag_i: 1, flag_z: 1, flag_c: 1 }}
  `(`SEP $value [$initialFlags]`, (params) => {
    run({ opcode: "SEP", mode: "#const", initialProcessor: {}, ...params });
  });
});
