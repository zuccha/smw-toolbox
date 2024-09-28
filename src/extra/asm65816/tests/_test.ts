import { expect } from "vitest";
import Assembler from "../assembler/assembler";
import Emulator from "../emulator/emulator";

function run(
  instruction: string,
  input: any,
  output: any,
  maxInstructions: number,
): { errors: readonly string[]; result: any; expected: any } {
  const assembler = new Assembler();
  const emulator = new Emulator();
  assembler.code = instruction;
  assembler.assemble();
  emulator.set_bytes(assembler.bytes);
  emulator.set_max_instructions(maxInstructions);
  if (input.a !== undefined) emulator.initial_a = input.a;
  if (input.x !== undefined) emulator.initial_x = input.x;
  if (input.y !== undefined) emulator.initial_y = input.y;
  if (input.sp !== undefined) emulator.initial_sp = input.sp;
  if (input.dp !== undefined) emulator.initial_dp = input.dp;
  if (input.db !== undefined) emulator.initial_db = input.db;
  if (input.flag_n !== undefined) emulator.initial_flag_n = input.flag_n;
  if (input.flag_v !== undefined) emulator.initial_flag_v = input.flag_v;
  if (input.flag_m !== undefined) emulator.initial_flag_m = input.flag_m;
  if (input.flag_x !== undefined) emulator.initial_flag_x = input.flag_x;
  if (input.flag_d !== undefined) emulator.initial_flag_d = input.flag_d;
  if (input.flag_i !== undefined) emulator.initial_flag_i = input.flag_i;
  if (input.flag_z !== undefined) emulator.initial_flag_z = input.flag_z;
  if (input.flag_c !== undefined) emulator.initial_flag_c = input.flag_c;
  if (input.flags !== undefined) emulator.initial_flags = input.flags;
  emulator.run();
  const result = { ...emulator.snapshot };
  const expected = { ...emulator.initial_snapshot, ...output };
  const errors = emulator.errors;
  return { errors, expected, result };
}

export function testIsolatedInstruction(
  instruction: string,
  input: any,
  output: any,
  errors: string[] = [],
  maxInstructions = 5,
) {
  const emulator = run(instruction, input, output, maxInstructions);
  expect({ ...emulator.result, pc: 0 }).toEqual({
    ...emulator.expected,
    pc: 0,
  });
  expect(emulator.errors).toEqual(errors);
}

export function testInstruction(
  instruction: string,
  input: any,
  output: any,
  errors: string[] = [],
  maxInstructions = 5,
) {
  const emulator = run(instruction, input, output, maxInstructions);
  expect(emulator.result).toEqual(emulator.expected);
  expect(emulator.errors).toEqual(errors);
}
