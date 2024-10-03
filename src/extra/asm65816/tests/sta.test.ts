import { describe, test } from "vitest";
import { run } from "./_run";

const modes = [
  { mode: "dp", arg: 0x00 },
  { mode: "dp,x", arg: 0x00 },
  { mode: "(dp)", arg: 0x00 },
  { mode: "(dp,x)", arg: 0x00 },
  { mode: "(dp),y", arg: 0x00 },
  { mode: "[dp]", arg: 0x00 },
  { mode: "[dp],y", arg: 0x00 },
  { mode: "addr", arg: 0x0000 },
  { mode: "addr,x", arg: 0x0000 },
  { mode: "addr,y", arg: 0x0000 },
  { mode: "long", arg: 0x7e0000 },
  { mode: "long,x", arg: 0x7e0000 },
  { mode: "sr,s", arg: 0x00 },
  { mode: "(sr,s),y", arg: 0x00 },
];

describe.each(modes)("$mode", ({ mode, arg }) => {
  test.each`
    initialProcessor            | value     | expectedValue
    ${{ a: 0x1234, flag_m: 1 }} | ${0xab}   | ${0x34}
    ${{ a: 0x1234, flag_m: 0 }} | ${0xabcd} | ${0x1234}
  `(`STA ${mode} [$initialProcessor]`, (params) => {
    run({ opcode: "STA", arg, mode, ...params });
  });
});
