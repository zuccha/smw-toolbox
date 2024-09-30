import { describe, test } from "vitest";
import { run } from "./_run";

describe("'(dp)'", () => {
  test.each`
    initialMemory                                                                        | expectedMemory
    ${new Map([[0x7e001a, 0x20], [0x7e001b, 0xab], [0x7eab20, 0x00], [0x7eab21, 0x00]])} | ${new Map([[0x7e1fbf, 0x00], [0x7e1fc0, 0x00]])}
    ${new Map([[0x7e001a, 0x20], [0x7e001b, 0xab], [0x7eab20, 0x34], [0x7eab21, 0x12]])} | ${new Map([[0x7e1fbf, 0x34], [0x7e1fc0, 0x12]])}
    ${new Map([[0x7e001a, 0x20], [0x7e001b, 0xab], [0x7eab20, 0xff], [0x7eab21, 0xff]])} | ${new Map([[0x7e1fbf, 0xff], [0x7e1fc0, 0xff]])}
  `(`PEI (dp) [$expectedMemory]`, (params) => {
    const arg = 0x0a;
    const initialProcessor = { dp: 0x0010, sp: 0x1fc0 };
    const expectedProcessor = { sp: 0x1fbe };
    run({
      opcode: "PEI",
      arg,
      mode: "(dp)",
      ...params,
      initialProcessor,
      expectedProcessor,
    });
  });
});
