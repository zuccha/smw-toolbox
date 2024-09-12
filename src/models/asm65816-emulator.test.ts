import { describe, expect, test } from "vitest";
import {
  As65816EmulatorStepFromScratch,
  Asm65816EmulatorFlag,
  executeAsm65816EmulatorInstruction,
} from "./asm65816-emulator";
import {
  Asm65816Instruction,
  Asm65816InstructionMode,
  Asm65816InstructionOpcode,
} from "./asm65816-instruction";

const i = (
  opcode: Asm65816InstructionOpcode,
  mode: Asm65816InstructionMode,
  arg: number,
): Asm65816Instruction =>
  ({
    id: `${opcode}-${mode}`,
    opcode,
    mode,
    line: 1,
    arg,
  } as Asm65816Instruction);

const executeInstruction = executeAsm65816EmulatorInstruction;
const Flag = Asm65816EmulatorFlag;

describe("ADC Direct_Byte", () => {
  test("addition add a byte when A is 8-bit", () => {
    const instruction = i("ADC", "Direct_Byte", 0x0a);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xf0ff;
    input.state.flags = Flag.M;
    input.state.memory.set(0x0a, 0x05);
    input.state.memory.set(0x0b, 0x06);
    output.state.a = 0xf004;
    output.state.flags = Flag.M | Flag.C;
    output.state.memory.set(0x0a, 0x05);
    output.state.memory.set(0x0b, 0x06);
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition add a word when A is 16-bit", () => {
    const instruction = i("ADC", "Direct_Byte", 0x0a);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xf0ff;
    input.state.memory.set(0x00000a, 0x05);
    input.state.memory.set(0x00000b, 0x06);
    output.state.a = 0xf104;
    output.state.memory.set(0x00000a, 0x05);
    output.state.memory.set(0x00000b, 0x06);
    output.state.flags = Flag.N | Flag.V;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition with direct page set", () => {
    const instruction = i("ADC", "Direct_Byte", 0x0a);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xf0ff;
    input.state.dp = 0x1234;
    input.state.memory.set(0x00123e, 0x05);
    input.state.memory.set(0x00123f, 0x06);
    output.state.a = 0xf104;
    output.state.dp = 0x1234;
    output.state.memory.set(0x00123e, 0x05);
    output.state.memory.set(0x00123f, 0x06);
    output.state.flags = Flag.N | Flag.V;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });
});

describe("ADC Immediate_Byte", () => {
  test("addition setting no flag", () => {
    const instruction = i("ADC", "Immediate_Byte", 0x01);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.flags = Flag.M;
    output.state.a = 1;
    output.state.flags = Flag.M;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting carry flag", () => {
    const instruction = i("ADC", "Immediate_Byte", 0x03);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.flags = Flag.M;
    input.state.a = 0xff;
    output.state.a = 0x02;
    output.state.flags = Flag.M | Flag.C;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition with carry", () => {
    const instruction = i("ADC", "Immediate_Byte", 0x03);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0x02;
    input.state.flags = Flag.M | Flag.C;
    output.state.a = 0x06;
    output.state.flags = Flag.M;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition with carry carrying again", () => {
    const instruction = i("ADC", "Immediate_Byte", 0x01);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xff;
    input.state.flags = Flag.M | Flag.C;
    output.state.a = 0x01;
    output.state.flags = Flag.M | Flag.C;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting overflow flag", () => {
    const instruction = i("ADC", "Immediate_Byte", 0b01111111);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.flags = Flag.M;
    output.state.a = 0b01111111;
    output.state.flags = Flag.M | Flag.V;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting negative flag", () => {
    const instruction = i("ADC", "Immediate_Byte", 0b10111111);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.flags = Flag.M;
    output.state.a = 0b10111111;
    output.state.flags = Flag.M | Flag.N;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting overflow and negative flag", () => {
    const instruction = i("ADC", "Immediate_Byte", 0b11111111);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.flags = Flag.M;
    output.state.a = 0b11111111;
    output.state.flags = Flag.M | Flag.V | Flag.N;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting zero flag", () => {
    const instruction = i("ADC", "Immediate_Byte", 0x01);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xff;
    input.state.flags = Flag.M;
    output.state.a = 0x00;
    output.state.flags = Flag.M | Flag.Z | Flag.C;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition not overriding high byte of A", () => {
    const instruction = i("ADC", "Immediate_Byte", 0x02);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xf0ff;
    input.state.flags = Flag.M;
    output.state.a = 0xf001;
    output.state.flags = Flag.M | Flag.C;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });
});

describe("ADC Immediate_Word", () => {
  test("addition setting no flag", () => {
    const instruction = i("ADC", "Immediate_Word", 0x01);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    output.state.a = 0x01;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting carry flag", () => {
    const instruction = i("ADC", "Immediate_Word", 0x03);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xffff;
    output.state.a = 0x02;
    output.state.flags = Flag.C;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition with carry", () => {
    const instruction = i("ADC", "Immediate_Word", 0x03);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0x02;
    input.state.flags = Flag.C;
    output.state.a = 0x06;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition with carry carrying again", () => {
    const instruction = i("ADC", "Immediate_Word", 0x01);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xffff;
    input.state.flags = Flag.C;
    output.state.a = 0x01;
    output.state.flags = Flag.C;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting overflow flag", () => {
    const instruction = i("ADC", "Immediate_Word", 0b01111111_11111111);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    output.state.a = 0b01111111_11111111;
    output.state.flags = Flag.V;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting negative flag", () => {
    const instruction = i("ADC", "Immediate_Word", 0b10111111_11111111);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    output.state.a = 0b10111111_11111111;
    output.state.flags = Flag.N;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting overflow and negative flag", () => {
    const instruction = i("ADC", "Immediate_Word", 0b11111111_11111111);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    output.state.a = 0b11111111_11111111;
    output.state.flags = Flag.V | Flag.N;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });

  test("addition setting zero flag", () => {
    const instruction = i("ADC", "Immediate_Word", 0x01);
    const input = As65816EmulatorStepFromScratch();
    const output = As65816EmulatorStepFromScratch();
    input.state.a = 0xffff;
    output.state.flags = Flag.Z | Flag.C;
    output.state.a = 0x00;
    expect(executeInstruction(input, instruction)).toStrictEqual(output);
  });
});
