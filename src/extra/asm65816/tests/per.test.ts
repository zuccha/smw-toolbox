import { describe, test } from "vitest";
import { run } from "./_run";

describe("'offset'", () => {
  test.each`
    arg       | expectedMemory
    ${0x0000} | ${new Map([[0x7e1fbf, 0x03], [0x7e1fc0, 0x80]])}
    ${0x1234} | ${new Map([[0x7e1fbf, 0x37], [0x7e1fc0, 0x92]])}
    ${0xffff} | ${new Map([[0x7e1fbf, 0x02], [0x7e1fc0, 0x80]])}
  `(`PER $arg`, (params) => {
    const initialProcessor = { sp: 0x1fc0 };
    const expectedProcessor = { sp: 0x1fbe };
    run({
      opcode: "PER",
      mode: "addr",
      ...params,
      initialProcessor,
      expectedProcessor,
    });
  });
});
