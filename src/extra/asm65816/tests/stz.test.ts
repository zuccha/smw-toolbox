import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,x", arg: 0x0000 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  test.each`
    initialProcessor | value     | expectedValue
    ${{ flag_m: 1 }} | ${0xab}   | ${0x00}
    ${{ flag_m: 0 }} | ${0xabcd} | ${0x0000}
  `(`STZ ${mode} [$initialProcessor]`, (params) => {
    run({ opcode: "STZ", arg, mode, ...params });
  });
});
