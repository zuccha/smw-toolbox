//==============================================================================
// Mask
//==============================================================================

import { IntegerBoundsUnsigned, IntegerUnit } from "../integer";

export enum Mask {
  LowByte = 0b00000000_00000000_11111111,
  HighByte = 0b00000000_11111111_00000000,
  BankByte = 0b11111111_00000000_00000000,
  Word = 0b00000000_11111111_11111111,
  Long = 0b11111111_11111111_11111111,
}

export const Asm65816EmulatorMask = Mask;

//==============================================================================
// Bounds
//==============================================================================

export enum Bound {
  Byte = IntegerBoundsUnsigned[IntegerUnit.Byte].max,
  Word = IntegerBoundsUnsigned[IntegerUnit.Word].max,
  Long = IntegerBoundsUnsigned[IntegerUnit.Long].max,
}

export const Asm65816EmulatorBound = Bound;

//==============================================================================
// Flag
//==============================================================================

export enum Flag {
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

export type Memory = Record<number, number>;

export type Asm65816EmulatorMemory = Memory;

export function getAsm65816EmulatorMemoryByte(
  memory: Memory,
  addr: number,
): number {
  return memory[addr] ?? 0;
}

//==============================================================================
// State
//==============================================================================

export type State = {
  pb: number; // Program Bank
  pc: number; // Program Counter

  a: number; // A
  x: number; // X
  y: number; // Y

  db: number; // Data Bank
  dp: number; // Direct Page
  sp: number; // Stack Pointer

  flags: number; // NVMXDIZC

  memory: Record<number, number>;
};

export type Asm65816EmulatorState = State;

export function StateFromScratch(): State {
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

    memory: {},
  };
}

//==============================================================================
// Report
//==============================================================================

export type Report = {
  bytes: number;
  cycles: number;
};

export type Asm65816EmulatorReport = Report;

export function ReportFromScratch(): Report {
  return { bytes: 0, cycles: 0 };
}

//==============================================================================
// State Diff
//==============================================================================

type Diff<T> = { from: T; to: T };

type StateDiff = Partial<{
  pb: Diff<number>; // Program Bank
  pc: Diff<number>; // Program Counter

  a: Diff<number>; // A
  x: Diff<number>; // X
  y: Diff<number>; // Y

  db: Diff<number>; // Data Bank
  dp: Diff<number>; // Direct Page
  sp: Diff<number>; // Stack Pointer

  flags: Diff<number>; // NVMXDIZC

  memory: Record<number, Diff<number>>;
}>;

export function applyStateDiff(state: State, stateDiff: StateDiff): State {
  return {
    pb: stateDiff.pb ? stateDiff.pb.to : state.pb,
    pc: stateDiff.pc ? stateDiff.pc.to : state.pc,

    a: stateDiff.a ? stateDiff.a.to : state.a,
    x: stateDiff.x ? stateDiff.x.to : state.x,
    y: stateDiff.y ? stateDiff.y.to : state.y,

    db: stateDiff.db ? stateDiff.db.to : state.db,
    dp: stateDiff.dp ? stateDiff.dp.to : state.dp,
    sp: stateDiff.sp ? stateDiff.sp.to : state.sp,

    flags: stateDiff.flags ? stateDiff.flags.to : state.flags,

    memory: {
      ...state.memory,
      ...Object.fromEntries(
        Object.entries(stateDiff.memory ?? {}).map(([addr, diff]) => [
          addr,
          diff.to,
        ]),
      ),
    },
  };
}

export function revertStateDiff(state: State, stateDiff: StateDiff): State {
  return {
    pb: stateDiff.pb ? stateDiff.pb.from : state.pb,
    pc: stateDiff.pc ? stateDiff.pc.from : state.pc,

    a: stateDiff.a ? stateDiff.a.from : state.a,
    x: stateDiff.x ? stateDiff.x.from : state.x,
    y: stateDiff.y ? stateDiff.y.from : state.y,

    db: stateDiff.db ? stateDiff.db.from : state.db,
    dp: stateDiff.dp ? stateDiff.dp.from : state.dp,
    sp: stateDiff.sp ? stateDiff.sp.from : state.sp,

    flags: stateDiff.flags ? stateDiff.flags.from : state.flags,

    memory: {
      ...state.memory,
      ...Object.fromEntries(
        Object.entries(stateDiff.memory ?? {}).map(([addr, diff]) => [
          addr,
          diff.from,
        ]),
      ),
    },
  };
}

//==============================================================================
// Step
//==============================================================================

export type Step = {
  state: StateDiff;
  report: Report;
};

export type Asm65168Step = Step;

export function StepFromScratch(): Step {
  return { report: ReportFromScratch(), state: {} };
}

export const As65816EmulatorStepFromScratch = StepFromScratch;

//==============================================================================
// Emulator
//==============================================================================

export type Emulator = {
  report: Report;
  state: State;
  steps: Step[];
};

export type Asm65816Emulator = Emulator;
