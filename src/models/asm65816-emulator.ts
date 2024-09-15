import { Context, ContextFromState } from "./asm65816-emulator/_context";
import {
  applyStateDiff,
  Emulator,
  Flag,
  Report,
  ReportFromScratch,
  State,
  StateFromScratch,
  Step,
} from "./asm65816-emulator/_types";
import { l, w } from "./asm65816-emulator/_utils";
import { adcByInstructionId } from "./asm65816-emulator/adc";
import {
  Asm65816Instruction,
  Asm65816InstructionHex,
  Asm65816InstructionId,
  Asm65816InstructionIdByHex,
  Asm65816InstructionMetaById,
  Asm65816InstructionModifier,
} from "./asm65816-instruction";

const operationNotImplemented = () => ({ state: {} });

const operationsByInstructionId: Record<
  Asm65816InstructionId,
  (
    arg: number,
    state: State,
    ctx: Context,
  ) => { state: Partial<State>; report?: Partial<Report> }
> = {
  ...adcByInstructionId,
  "AND-Absolute": operationNotImplemented,
  "AND-AbsoluteLong": operationNotImplemented,
  "AND-AbsoluteLong_X": operationNotImplemented,
  "AND-Absolute_X": operationNotImplemented,
  "AND-Absolute_Y": operationNotImplemented,
  "AND-Direct": operationNotImplemented,
  "AND-Direct_Indirect": operationNotImplemented,
  "AND-Direct_IndirectLong": operationNotImplemented,
  "AND-Direct_IndirectLong_Y": operationNotImplemented,
  "AND-Direct_Indirect_Y": operationNotImplemented,
  "AND-Direct_X": operationNotImplemented,
  "AND-Direct_X_Indirect": operationNotImplemented,
  "AND-Immediate": operationNotImplemented,
  "AND-StackRelative": operationNotImplemented,
  "AND-StackRelative_Indirect_Y": operationNotImplemented,
  "ASL-Absolute": operationNotImplemented,
  "ASL-Absolute_X": operationNotImplemented,
  "ASL-Accumulator": operationNotImplemented,
  "ASL-Direct": operationNotImplemented,
  "ASL-Direct_X": operationNotImplemented,
  "BCC-Direct": operationNotImplemented,
  "BCS-Direct": operationNotImplemented,
  "BEQ-Direct": operationNotImplemented,
  "BIT-Absolute": operationNotImplemented,
  "BIT-Absolute_X": operationNotImplemented,
  "BIT-Direct": operationNotImplemented,
  "BIT-Direct_X": operationNotImplemented,
  "BIT-Immediate": operationNotImplemented,
  "BMI-Direct": operationNotImplemented,
  "BNE-Direct": operationNotImplemented,
  "BPL-Direct": operationNotImplemented,
  "BRA-Direct": operationNotImplemented,
  "BRK-Immediate": operationNotImplemented,
  "BRL-Absolute": operationNotImplemented,
  "BVC-Direct": operationNotImplemented,
  "BVS-Direct": operationNotImplemented,
  "CLC-Implied": operationNotImplemented,
  "CLD-Implied": operationNotImplemented,
  "CLI-Implied": operationNotImplemented,
  "CLV-Implied": operationNotImplemented,
  "CMP-Absolute": operationNotImplemented,
  "CMP-AbsoluteLong": operationNotImplemented,
  "CMP-AbsoluteLong_X": operationNotImplemented,
  "CMP-Absolute_X": operationNotImplemented,
  "CMP-Absolute_Y": operationNotImplemented,
  "CMP-Direct": operationNotImplemented,
  "CMP-Direct_Indirect": operationNotImplemented,
  "CMP-Direct_IndirectLong": operationNotImplemented,
  "CMP-Direct_IndirectLong_Y": operationNotImplemented,
  "CMP-Direct_Indirect_Y": operationNotImplemented,
  "CMP-Direct_X": operationNotImplemented,
  "CMP-Direct_X_Indirect": operationNotImplemented,
  "CMP-Immediate": operationNotImplemented,
  "CMP-StackRelative": operationNotImplemented,
  "CMP-StackRelative_Indirect_Y": operationNotImplemented,
  "COP-Immediate": operationNotImplemented,
  "CPX-Absolute": operationNotImplemented,
  "CPX-Direct": operationNotImplemented,
  "CPX-Immediate": operationNotImplemented,
  "CPY-Absolute": operationNotImplemented,
  "CPY-Direct": operationNotImplemented,
  "CPY-Immediate": operationNotImplemented,
  "DEC-Absolute": operationNotImplemented,
  "DEC-Absolute_X": operationNotImplemented,
  "DEC-Accumulator": operationNotImplemented,
  "DEC-Direct": operationNotImplemented,
  "DEC-Direct_X": operationNotImplemented,
  "DEX-Implied": operationNotImplemented,
  "DEY-Implied": operationNotImplemented,
  "EOR-Absolute": operationNotImplemented,
  "EOR-AbsoluteLong": operationNotImplemented,
  "EOR-AbsoluteLong_X": operationNotImplemented,
  "EOR-Absolute_X": operationNotImplemented,
  "EOR-Absolute_Y": operationNotImplemented,
  "EOR-Direct": operationNotImplemented,
  "EOR-Direct_Indirect": operationNotImplemented,
  "EOR-Direct_IndirectLong": operationNotImplemented,
  "EOR-Direct_IndirectLong_Y": operationNotImplemented,
  "EOR-Direct_Indirect_Y": operationNotImplemented,
  "EOR-Direct_X": operationNotImplemented,
  "EOR-Direct_X_Indirect": operationNotImplemented,
  "EOR-Immediate": operationNotImplemented,
  "EOR-StackRelative": operationNotImplemented,
  "EOR-StackRelative_Indirect_Y": operationNotImplemented,
  "INC-Absolute": operationNotImplemented,
  "INC-Absolute_X": operationNotImplemented,
  "INC-Accumulator": operationNotImplemented,
  "INC-Direct": operationNotImplemented,
  "INC-Direct_X": operationNotImplemented,
  "INX-Implied": operationNotImplemented,
  "INY-Implied": operationNotImplemented,
  "JML-AbsoluteLong": operationNotImplemented,
  "JML-Absolute_IndirectLong": operationNotImplemented,
  "JMP-Absolute": operationNotImplemented,
  "JMP-AbsoluteLong": operationNotImplemented,
  "JMP-Absolute_Indirect": operationNotImplemented,
  "JMP-Absolute_IndirectLong": operationNotImplemented,
  "JMP-Absolute_X_Indirect": operationNotImplemented,
  "JSL-AbsoluteLong": operationNotImplemented,
  "JSR-Absolute": operationNotImplemented,
  "JSR-AbsoluteLong": operationNotImplemented,
  "JSR-Absolute_X_Indirect": operationNotImplemented,
  "LDA-Absolute": operationNotImplemented,
  "LDA-AbsoluteLong": operationNotImplemented,
  "LDA-AbsoluteLong_X": operationNotImplemented,
  "LDA-Absolute_X": operationNotImplemented,
  "LDA-Absolute_Y": operationNotImplemented,
  "LDA-Direct": operationNotImplemented,
  "LDA-Direct_Indirect": operationNotImplemented,
  "LDA-Direct_IndirectLong": operationNotImplemented,
  "LDA-Direct_IndirectLong_Y": operationNotImplemented,
  "LDA-Direct_Indirect_Y": operationNotImplemented,
  "LDA-Direct_X": operationNotImplemented,
  "LDA-Direct_X_Indirect": operationNotImplemented,
  "LDA-Immediate": operationNotImplemented,
  "LDA-StackRelative": operationNotImplemented,
  "LDA-StackRelative_Indirect_Y": operationNotImplemented,
  "LDX-Absolute": operationNotImplemented,
  "LDX-Absolute_Y": operationNotImplemented,
  "LDX-Direct": operationNotImplemented,
  "LDX-Direct_Y": operationNotImplemented,
  "LDX-Immediate": operationNotImplemented,
  "LDY-Absolute": operationNotImplemented,
  "LDY-Absolute_X": operationNotImplemented,
  "LDY-Direct": operationNotImplemented,
  "LDY-Direct_X": operationNotImplemented,
  "LDY-Immediate": operationNotImplemented,
  "LSR-Absolute": operationNotImplemented,
  "LSR-Absolute_X": operationNotImplemented,
  "LSR-Accumulator": operationNotImplemented,
  "LSR-Direct": operationNotImplemented,
  "LSR-Direct_X": operationNotImplemented,
  "MVN-BlockMove": operationNotImplemented,
  "MVP-BlockMove": operationNotImplemented,
  "NOP-Implied": operationNotImplemented,
  "ORA-Absolute": operationNotImplemented,
  "ORA-AbsoluteLong": operationNotImplemented,
  "ORA-AbsoluteLong_X": operationNotImplemented,
  "ORA-Absolute_X": operationNotImplemented,
  "ORA-Absolute_Y": operationNotImplemented,
  "ORA-Direct": operationNotImplemented,
  "ORA-Direct_Indirect": operationNotImplemented,
  "ORA-Direct_IndirectLong": operationNotImplemented,
  "ORA-Direct_IndirectLong_Y": operationNotImplemented,
  "ORA-Direct_Indirect_Y": operationNotImplemented,
  "ORA-Direct_X": operationNotImplemented,
  "ORA-Direct_X_Indirect": operationNotImplemented,
  "ORA-Immediate": operationNotImplemented,
  "ORA-StackRelative": operationNotImplemented,
  "ORA-StackRelative_Indirect_Y": operationNotImplemented,
  "PEA-Absolute": operationNotImplemented,
  "PEI-Direct_Indirect": operationNotImplemented,
  "PER-Absolute": operationNotImplemented,
  "PHA-Implied": operationNotImplemented,
  "PHB-Implied": operationNotImplemented,
  "PHD-Implied": operationNotImplemented,
  "PHK-Implied": operationNotImplemented,
  "PHP-Implied": operationNotImplemented,
  "PHX-Implied": operationNotImplemented,
  "PHY-Implied": operationNotImplemented,
  "PLA-Implied": operationNotImplemented,
  "PLB-Implied": operationNotImplemented,
  "PLD-Implied": operationNotImplemented,
  "PLP-Implied": operationNotImplemented,
  "PLX-Implied": operationNotImplemented,
  "PLY-Implied": operationNotImplemented,
  "REP-Immediate": operationNotImplemented,
  "ROL-Absolute": operationNotImplemented,
  "ROL-Absolute_X": operationNotImplemented,
  "ROL-Accumulator": operationNotImplemented,
  "ROL-Direct": operationNotImplemented,
  "ROL-Direct_X": operationNotImplemented,
  "ROR-Absolute": operationNotImplemented,
  "ROR-Absolute_X": operationNotImplemented,
  "ROR-Accumulator": operationNotImplemented,
  "ROR-Direct": operationNotImplemented,
  "ROR-Direct_X": operationNotImplemented,
  "RTI-Implied": operationNotImplemented,
  "RTL-Implied": operationNotImplemented,
  "RTS-Implied": operationNotImplemented,
  "SBC-Absolute": operationNotImplemented,
  "SBC-AbsoluteLong": operationNotImplemented,
  "SBC-AbsoluteLong_X": operationNotImplemented,
  "SBC-Absolute_X": operationNotImplemented,
  "SBC-Absolute_Y": operationNotImplemented,
  "SBC-Direct": operationNotImplemented,
  "SBC-Direct_Indirect": operationNotImplemented,
  "SBC-Direct_IndirectLong": operationNotImplemented,
  "SBC-Direct_IndirectLong_Y": operationNotImplemented,
  "SBC-Direct_Indirect_Y": operationNotImplemented,
  "SBC-Direct_X": operationNotImplemented,
  "SBC-Direct_X_Indirect": operationNotImplemented,
  "SBC-Immediate": operationNotImplemented,
  "SBC-StackRelative": operationNotImplemented,
  "SBC-StackRelative_Indirect_Y": operationNotImplemented,
  "SEC-Implied": operationNotImplemented,
  "SED-Implied": operationNotImplemented,
  "SEI-Implied": operationNotImplemented,
  "SEP-Immediate": operationNotImplemented,
  "STA-Absolute": operationNotImplemented,
  "STA-AbsoluteLong": operationNotImplemented,
  "STA-AbsoluteLong_X": operationNotImplemented,
  "STA-Absolute_X": operationNotImplemented,
  "STA-Absolute_Y": operationNotImplemented,
  "STA-Direct": operationNotImplemented,
  "STA-Direct_Indirect": operationNotImplemented,
  "STA-Direct_IndirectLong": operationNotImplemented,
  "STA-Direct_IndirectLong_Y": operationNotImplemented,
  "STA-Direct_Indirect_Y": operationNotImplemented,
  "STA-Direct_X": operationNotImplemented,
  "STA-Direct_X_Indirect": operationNotImplemented,
  "STA-StackRelative": operationNotImplemented,
  "STA-StackRelative_Indirect_Y": operationNotImplemented,
  "STP-Implied": operationNotImplemented,
  "STX-Absolute": operationNotImplemented,
  "STX-Direct": operationNotImplemented,
  "STX-Direct_Y": operationNotImplemented,
  "STY-Absolute": operationNotImplemented,
  "STY-Direct": operationNotImplemented,
  "STY-Direct_X": operationNotImplemented,
  "STZ-Absolute": operationNotImplemented,
  "STZ-Absolute_X": operationNotImplemented,
  "STZ-Direct": operationNotImplemented,
  "STZ-Direct_X": operationNotImplemented,
  "TAX-Implied": operationNotImplemented,
  "TAY-Implied": operationNotImplemented,
  "TCD-Implied": operationNotImplemented,
  "TCS-Implied": operationNotImplemented,
  "TDC-Implied": operationNotImplemented,
  "TRB-Absolute": operationNotImplemented,
  "TRB-Direct": operationNotImplemented,
  "TSB-Absolute": operationNotImplemented,
  "TSB-Direct": operationNotImplemented,
  "TSC-Implied": operationNotImplemented,
  "TSX-Implied": operationNotImplemented,
  "TXA-Implied": operationNotImplemented,
  "TXS-Implied": operationNotImplemented,
  "TXY-Implied": operationNotImplemented,
  "TYA-Implied": operationNotImplemented,
  "TYX-Implied": operationNotImplemented,
  "WAI-Implied": operationNotImplemented,
  "WDM-Implied": operationNotImplemented,
  "XBA-Implied": operationNotImplemented,
  "XCE-Implied": operationNotImplemented,
};

//==============================================================================
// Produce Report
//==============================================================================

export function produceReport(id: Asm65816InstructionId, state: State): Report {
  const meta = Asm65816InstructionMetaById[id];
  let bytes = meta.bytes;
  let cycles = meta.cycles;

  const CyclesModifiers = Asm65816InstructionModifier;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus1IfMIsZero &&
    state.flags & Flag.M
  )
    cycles += 1;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus2IfMIsZero &&
    (state.flags & Flag.M) === 0
  )
    cycles += 2;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus1IfXIsZero &&
    (state.flags & Flag.X) === 0
  )
    cycles += 1;

  // if (
  //   meta.cyclesModifiers & CyclesModifiers.Plus1IfEIsZero &&
  //   state.flags & Flag.E
  // )
  //   cycles += 1;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus1IfDirectPageLowByteIsNonZero &&
    l(state.dp) > 0
  )
    cycles += 1;

  // if (
  //   meta.cyclesModifiers & CyclesModifiers.Plus1IfIndexCrossesPageBoundary &&
  //   ?
  // )
  //   cycles += 1;

  if (
    meta.bytesModifiers & CyclesModifiers.Plus1IfMIsZero &&
    (state.flags & Flag.M) === 0
  )
    bytes += 1;

  if (
    meta.bytesModifiers & CyclesModifiers.Plus1IfXIsZero &&
    (state.flags & Flag.X) === 0
  )
    bytes += 1;

  return { bytes, cycles };
}

//==============================================================================
// Increment Program Counter
//==============================================================================

export function incrementPc(
  pb: number,
  pc: number,
  increment: number,
): { pb: number; pc: number } {
  const counter = ((l(pb) << 16) | w(pc)) + increment;
  return { pb: l(counter) >> 16, pc: w(counter) };
}

//==============================================================================
// Execute Instruction
//==============================================================================

function executeInstruction(
  state: State,
  id: Asm65816InstructionId,
  arg: { l: number; h: number; b: number },
): Step {
  const ctx = ContextFromState(state);
  const operation = operationsByInstructionId[id];

  const report = produceReport(id, state);

  let value = 0;
  if (arg.l !== -1) value |= l(arg.l);
  if (arg.h !== -1) value |= l(arg.h) << 8;
  if (arg.b !== -1) value |= l(arg.b) << 16;

  const step = operation(value, state, ctx);

  const changes: Step["state"] = {};

  if (step.state.pb) changes.pb = { from: state.pb, to: step.state.pb };
  if (step.state.pc) changes.pc = { from: state.pc, to: step.state.pc };

  if (step.state.a) changes.a = { from: state.a, to: step.state.a };
  if (step.state.x) changes.x = { from: state.x, to: step.state.x };
  if (step.state.y) changes.y = { from: state.y, to: step.state.y };

  if (step.state.db) changes.db = { from: state.db, to: step.state.db };
  if (step.state.dp) changes.dp = { from: state.dp, to: step.state.dp };
  if (step.state.sp) changes.sp = { from: state.sp, to: step.state.sp };

  if (step.state.flags)
    changes.flags = { from: state.flags, to: step.state.flags };

  if (step.state.memory) {
    changes.memory = Object.fromEntries(
      Object.entries(step.state.memory ?? {}).map(([addr, byte]) => [
        addr,
        { from: state.memory[addr as unknown as number] ?? 0, to: byte },
      ]),
    );
  }

  return {
    state: changes,
    report: step.report
      ? {
          bytes: report.bytes + (step.report.bytes ?? 0),
          cycles: report.cycles + (step.report.cycles ?? 0),
        }
      : report,
  };
}

//==============================================================================
// Execute
//==============================================================================

function EmulatorFromScratch(): Emulator {
  return { report: ReportFromScratch(), state: StateFromScratch(), steps: [] };
}

function EmulatorFromInstructions(
  instructions: Asm65816Instruction[],
): Emulator {
  let state = StateFromScratch();
  const report = ReportFromScratch();
  const steps = instructions.map((instruction) => {
    const step = executeInstruction(state, instruction.id, instruction.arg);
    state = applyStateDiff(state, step.state);
    report.bytes += step.report.bytes;
    report.cycles += step.report.cycles;

    const { pb, pc } = incrementPc(state.pb, state.pc, report.bytes);
    state.pb = pb;
    state.pc = pc;

    return step;
  });

  return { report, state, steps };
}

function EmulatorFromBytes(bytes: number[]): Emulator {
  let state = StateFromScratch();
  const report = ReportFromScratch();
  const steps: Step[] = [];
  let i = 0;
  while (i < bytes.length) {
    const hex = l(bytes[i]!);
    const id = Asm65816InstructionIdByHex[hex as Asm65816InstructionHex];

    const arg = {
      l: bytes[i + 1] ?? 0,
      h: bytes[i + 2] ?? 0,
      b: bytes[i + 3] ?? 0,
    };

    const step = executeInstruction(state, id, arg);
    state = applyStateDiff(state, step.state);
    report.bytes += step.report.bytes;
    report.cycles += step.report.cycles;

    i += step.report.bytes;

    const { pb, pc } = incrementPc(state.pb, state.pc, step.report.bytes);
    state.pb = pb;
    state.pc = pc;

    steps.push(step);
  }

  return { report, state, steps };
}

export const Asm65816EmulatorFromScratch = EmulatorFromScratch;
export const Asm65816EmulatorFromInstructions = EmulatorFromInstructions;
export const Asm65816EmulatorFromBytes = EmulatorFromBytes;
