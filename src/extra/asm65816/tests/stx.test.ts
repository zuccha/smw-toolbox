import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "dp,y", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  test.each`
    initialProcessor            | value     | expectedValue
    ${{ x: 0x1234, flag_x: 1 }} | ${0xab}   | ${0x34}
    ${{ x: 0x1234, flag_x: 0 }} | ${0xabcd} | ${0x1234}
  `(`STX ${mode} [$initialProcessor]`, (params) => {
    run({ opcode: "STX", arg, mode, ...params });
  });
});
