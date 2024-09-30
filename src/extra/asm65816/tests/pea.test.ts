import { describe, test } from "vitest";
import { run } from "./_run";

describe("'addr'", () => {
  test.each`
    arg       | expectedMemory
    ${0x0000} | ${new Map([[0x7e1fbf, 0x00], [0x7e1fc0, 0x00]])}
    ${0x1234} | ${new Map([[0x7e1fbf, 0x34], [0x7e1fc0, 0x12]])}
    ${0xffff} | ${new Map([[0x7e1fbf, 0xff], [0x7e1fc0, 0xff]])}
  `(`PEA $arg`, (params) => {
    const initialProcessor = { sp: 0x1fc0 };
    const expectedProcessor = { sp: 0x1fbe };
    run({
      opcode: "PEA",
      mode: "addr",
      ...params,
      initialProcessor,
      expectedProcessor,
    });
  });
});
