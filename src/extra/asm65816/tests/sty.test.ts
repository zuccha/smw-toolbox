import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  test.each`
    initialProcessor            | value     | expectedValue
    ${{ y: 0x1234, flag_x: 1 }} | ${0xab}   | ${0x34}
    ${{ y: 0x1234, flag_x: 0 }} | ${0xabcd} | ${0x1234}
  `(`STY ${mode} [$initialProcessor]`, (params) => {
    run({ opcode: "STY", arg, mode, ...params });
  });
});
