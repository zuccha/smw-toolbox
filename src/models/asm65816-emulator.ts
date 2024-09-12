import { Asm65816Instruction } from "./asm65816-instruction";
import { IntegerBoundsUnsigned, IntegerUnit } from "./integer";

//==============================================================================
// Mask
//==============================================================================

enum Mask {
  LowByte = 0b00000000_00000000_11111111,
  HighByte = 0b00000000_11111111_00000000,
  Word = 0b00000000_11111111_11111111,
  Long = 0b11111111_11111111_11111111,
}

export const Asm65816EmulatorMask = Mask;

//==============================================================================
// Bounds
//==============================================================================

enum Bound {
  Byte = IntegerBoundsUnsigned[IntegerUnit.Byte].max,
  Word = IntegerBoundsUnsigned[IntegerUnit.Word].max,
  Long = IntegerBoundsUnsigned[IntegerUnit.Long].max,
}

export const Asm65816EmulatorBound = Bound;

//==============================================================================
// Flag
//==============================================================================

enum Flag {
  C = 0b00000001,
  Z = 0b00000010,
  I = 0b00000100,
  D = 0b00001000,
  X = 0b00010000,
  M = 0b00100000,
  V = 0b01000000,
  N = 0b10000000,
}

export const Asm65816EmulatorFlag = Flag;

//==============================================================================
// Memory
//==============================================================================

type Memory = Map<number, number>;

export type Asm65816EmulatorMemory = Memory;

export function getAsm65816EmulatorMemoryValue(
  memory: Memory,
  addr: number,
): number {
  return memory.get(addr) ?? 0;
}

//==============================================================================
// State
//==============================================================================

type State = {
  pb: number; // Program Bank
  pc: number; // Program Counter

  a: number; // A
  x: number; // X
  y: number; // Y

  db: number; // Data Bank
  dp: number; // Direct Page
  sp: number; // Stack Pointer

  flags: number; // NVMXDIZC

  memory: Map<number, number>;
};

export type Asm65816EmulatorState = State;

function StateFromScratch(): State {
  return {
    pb: 0,
    pc: 0,

    a: 0,
    x: 0,
    y: 0,

    db: 0,
    dp: 0,
    sp: 0,

    flags: 0,

    memory: new Map(),
  };
}

//==============================================================================
// Report
//==============================================================================

type Report = {
  bytes: number;
  cycles: number;
};

export type Asm65816EmulatorReport = Report;

function ReportFromScratch(): Report {
  return { bytes: 0, cycles: 0 };
}

//==============================================================================
// Step
//==============================================================================

type Step = { state: State; report: Report };

export type Asm65168Step = Step;

function StepFromScratch(): Step {
  return { report: ReportFromScratch(), state: StateFromScratch() };
}

export const As65816EmulatorStepFromScratch = StepFromScratch;

//==============================================================================
// Emulator
//==============================================================================

type Emulator = {
  report: Report;
  state: State;
  steps: Step[];
};

export type Asm65816Emulator = Emulator;

//==============================================================================
// Utils
//==============================================================================

// Get only the desired bytes of a number.
const l = (val: number) => val & Mask.LowByte;
const h = (val: number) => val & Mask.HighByte;
const w = (val: number) => val & Bound.Word;

// Compose bytes into little endian format.
const littleEndian = (low: number, high: number, long: number = 0): number =>
  l(long << 16) | l(high << 8) | l(low);

// Set/unset new flags.
const applyFlags = (
  resetFlags: number,
  oldFlags: number,
  newFlags: number,
): number => l((oldFlags & ~resetFlags) | newFlags);

//==============================================================================
// Operations
//==============================================================================

const operation = {
  adc8Bit: (
    value: number,
    a: number,
    flags: number,
  ): { a: number; flags: number } => {
    const result = l(value) + l(a) + (flags & Flag.C);
    const newFlags =
      (l(result) & (Flag.N | Flag.V)) |
      (l(result) === 0 ? Flag.Z : 0) |
      (result > Bound.Byte ? Flag.C : 0);
    return {
      a: h(a) | l(result),
      flags: applyFlags(Flag.N | Flag.V | Flag.Z | Flag.C, flags, newFlags),
    };
  },
  adc16Bit: (
    value: number,
    a: number,
    flags: number,
  ): { a: number; flags: number } => {
    const result = w(value) + w(a) + (flags & Flag.C);
    const newFlags =
      ((w(result) & ((Flag.N | Flag.V) << 8)) >> 8) |
      (w(result) === 0 ? Flag.Z : 0) |
      (result > Bound.Word ? Flag.C : 0);
    return {
      a: w(result),
      flags: applyFlags(Flag.N | Flag.V | Flag.Z | Flag.C, flags, newFlags),
    };
  },
};

//==============================================================================
// Execute Instruction
//==============================================================================

function executeInstruction(
  prevStep: Step,
  instruction: Asm65816Instruction,
): Step {
  const step = { state: { ...prevStep.state }, report: ReportFromScratch() };
  const state = step.state;
  const report = step.report;

  const isA8Bit = Boolean(state.flags & Flag.M);
  const isX8Bit = Boolean(state.flags & Flag.X);

  // Use value as an address.
  const addrDp = (value: number) => w(w(state.dp) | l(value));
  const addrAbs = (value: number) => (l(state.db) << 16) | w(value);
  const addrLong = (value: number) => value & Mask.Long;

  // Access direct memory
  const loadDirectByte = (addr: number): number =>
    l(state.memory.get(addr) ?? 0);
  const saveDirectByte = (addr: number, byte: number) =>
    state.memory.set(addr, l(byte));

  const loadDirectWord = (addr: number): number =>
    littleEndian(loadDirectByte(addr), loadDirectByte(addr + 1));
  const saveDirectWord = (addr: number, word: number) =>
    state.memory.set(addr, l(word));

  // Access indirect memory
  const indirect = (addr: number): number =>
    addrAbs(littleEndian(loadDirectByte(addr), loadDirectByte(addr + 1)));

  const loadIndirectByte = (addr: number): number =>
    loadDirectByte(indirect(addr));
  const saveIndirectByte = (addr: number, byte: number) =>
    saveDirectByte(indirect(addr), byte);

  const loadIndirectWord = (addr: number): number =>
    loadDirectWord(indirect(addr));
  const saveIndirectWord = (addr: number, word: number) =>
    saveDirectWord(indirect(addr), word);

  // Access indirect long memory
  const indirectLong = (addr: number): number =>
    littleEndian(
      loadDirectByte(addr),
      loadDirectByte(addr + 1),
      loadDirectByte(addr + 2),
    );

  const loadIndirectLongByte = (addr: number): number =>
    loadDirectByte(indirectLong(addr));
  const saveIndirectLongByte = (addr: number, byte: number) =>
    saveDirectByte(indirectLong(addr), byte);

  const loadIndirectLongWord = (addr: number): number =>
    loadDirectWord(indirectLong(addr));
  const saveIndirectLongWord = (addr: number, word: number) =>
    saveDirectWord(indirectLong(addr), word);

  switch (instruction.id) {
    case "ADC-Direct_Byte": {
      const addr = addrDp(instruction.arg);
      const result = isA8Bit
        ? operation.adc8Bit(loadDirectByte(addr), state.a, state.flags)
        : operation.adc16Bit(loadDirectWord(addr), state.a, state.flags);
      state.a = result.a;
      state.flags = result.flags;
      break;
    }
    case "ADC-Immediate_Byte": {
      if (!isA8Bit) console.error("Invalid instruction with A 16-bit");
      const immediate = instruction.arg;
      const result = isA8Bit
        ? operation.adc8Bit(immediate, state.a, state.flags)
        : operation.adc16Bit(immediate, state.a, state.flags);
      state.a = result.a;
      state.flags = result.flags;
      break;
    }
    case "ADC-Immediate_Word": {
      if (isA8Bit) console.error("Invalid instruction with A 8-bit");
      const immediate = instruction.arg;
      const result = isA8Bit
        ? operation.adc8Bit(immediate, state.a, state.flags)
        : operation.adc16Bit(immediate, state.a, state.flags);
      state.a = result.a;
      state.flags = result.flags;
      break;
    }
  }

  return step;
}

export const executeAsm65816EmulatorInstruction = executeInstruction;

//==============================================================================
// Execute
//==============================================================================

function EmulatorFromScratch(): Emulator {
  return { report: ReportFromScratch(), state: StateFromScratch(), steps: [] };
}

function EmulatorFromInstructions(
  instructions: Asm65816Instruction[],
): Emulator {
  if (instructions.length === 0) return EmulatorFromScratch();

  const steps = [executeInstruction(StepFromScratch(), instructions[0]!)];
  const report = steps[0]!.report;
  let state = steps[0]!.state;
  for (let i = 1; i < instructions.length; ++i) {
    const step = executeInstruction(steps[i - 1]!, instructions[i]!);
    steps.push(step);
    state = step.state;
    report.bytes += step.report.bytes;
    report.cycles += step.report.cycles;
  }

  return { report, state, steps };
}

export const Asm65816EmulatorFromScratch = EmulatorFromScratch;
export const Asm65816EmulatorFromInstructions = EmulatorFromInstructions;
