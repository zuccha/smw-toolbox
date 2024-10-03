import { describe, test } from "vitest";
import { run } from "./_run";

describe("'srcBank:destBank'", () => {
  const initialProcessor = {
    a: 0x0003,
    x: 0x3003,
    y: 0x4013,
    flag_x: 0,
  } as const;

  const expectedProcessor = {
    a: 0xffff,
    x: 0x2fff,
    y: 0x400f,
    db: 0x7f,
  };

  const initialMemory = new Map([
    [0x7e3000, 0xaa],
    [0x7e3001, 0xab],
    [0x7e3002, 0xac],
    [0x7e3003, 0xad],
  ]);

  const expectedMemory = new Map([
    [0x7f4010, 0xaa],
    [0x7f4011, 0xab],
    [0x7f4012, 0xac],
    [0x7f4013, 0xad],
  ]);

  test(`MVP $7E,$7F [${JSON.stringify(initialProcessor)}]`, () => {
    const arg = 0x7f7e;
    const value = 0;
    const mode = "srcBank,destBank";
    run({
      opcode: "MVP",
      arg,
      value,
      mode,
      initialProcessor,
      initialMemory,
      expectedProcessor,
      expectedMemory,
    });
  });
});
