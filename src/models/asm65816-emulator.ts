import { Context, ContextFromState } from "./asm65816-emulator/_context";
import {
  applyStateDiff,
  Emulator,
  Report,
  ReportFromScratch,
  State,
  StateFromScratch,
  Step,
} from "./asm65816-emulator/_types";
import {
  b,
  h,
  incrementPc,
  l,
  produceReport,
} from "./asm65816-emulator/_utils";
import { adc_Direct_Byte, adc_Immediate } from "./asm65816-emulator/adc";
import {
  Asm65816Instruction,
  Asm65816InstructionHex,
  Asm65816InstructionId,
  Asm65816InstructionIdByHex,
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
  "ADC-Direct_Byte": adc_Direct_Byte,
  "ADC-Direct_Byte_S": operationNotImplemented,
  "ADC-Direct_Byte_X": operationNotImplemented,
  "ADC-Direct_Long": operationNotImplemented,
  "ADC-Direct_Long_X": operationNotImplemented,
  "ADC-Direct_Word": operationNotImplemented,
  "ADC-Direct_Word_X": operationNotImplemented,
  "ADC-Direct_Word_Y": operationNotImplemented,
  "ADC-Immediate": adc_Immediate,
  "ADC-Indirect_Byte": operationNotImplemented,
  "ADC-Indirect_Byte_SY": operationNotImplemented,
  "ADC-Indirect_Byte_X": operationNotImplemented,
  "ADC-Indirect_Byte_Y": operationNotImplemented,
  "ADC-IndirectLong_Byte": operationNotImplemented,
  "ADC-IndirectLong_Byte_Y": operationNotImplemented,
  "AND-Direct_Byte": operationNotImplemented,
  "AND-Direct_Byte_S": operationNotImplemented,
  "AND-Direct_Byte_X": operationNotImplemented,
  "AND-Direct_Long": operationNotImplemented,
  "AND-Direct_Long_X": operationNotImplemented,
  "AND-Direct_Word": operationNotImplemented,
  "AND-Direct_Word_X": operationNotImplemented,
  "AND-Direct_Word_Y": operationNotImplemented,
  "AND-Immediate": operationNotImplemented,
  "AND-Indirect_Byte": operationNotImplemented,
  "AND-Indirect_Byte_SY": operationNotImplemented,
  "AND-Indirect_Byte_X": operationNotImplemented,
  "AND-Indirect_Byte_Y": operationNotImplemented,
  "AND-IndirectLong_Byte": operationNotImplemented,
  "AND-IndirectLong_Byte_Y": operationNotImplemented,
  "ASL-Accumulator": operationNotImplemented,
  "ASL-Direct_Byte": operationNotImplemented,
  "ASL-Direct_Byte_X": operationNotImplemented,
  "ASL-Direct_Word": operationNotImplemented,
  "ASL-Direct_Word_X": operationNotImplemented,
  "BCC-Direct_Byte": operationNotImplemented,
  "BCS-Direct_Byte": operationNotImplemented,
  "BEQ-Direct_Byte": operationNotImplemented,
  "BIT-Direct_Byte": operationNotImplemented,
  "BIT-Direct_Byte_X": operationNotImplemented,
  "BIT-Direct_Word": operationNotImplemented,
  "BIT-Direct_Word_X": operationNotImplemented,
  "BIT-Immediate": operationNotImplemented,
  "BMI-Direct_Byte": operationNotImplemented,
  "BNE-Direct_Byte": operationNotImplemented,
  "BPL-Direct_Byte": operationNotImplemented,
  "BRA-Direct_Byte": operationNotImplemented,
  "BRK-Immediate": operationNotImplemented,
  "BRL-Direct_Word": operationNotImplemented,
  "BVC-Direct_Byte": operationNotImplemented,
  "BVS-Direct_Byte": operationNotImplemented,
  "CLC-Implied": operationNotImplemented,
  "CLD-Implied": operationNotImplemented,
  "CLI-Implied": operationNotImplemented,
  "CLV-Implied": operationNotImplemented,
  "CMP-Direct_Byte": operationNotImplemented,
  "CMP-Direct_Byte_S": operationNotImplemented,
  "CMP-Direct_Byte_X": operationNotImplemented,
  "CMP-Direct_Long": operationNotImplemented,
  "CMP-Direct_Long_X": operationNotImplemented,
  "CMP-Direct_Word": operationNotImplemented,
  "CMP-Direct_Word_X": operationNotImplemented,
  "CMP-Direct_Word_Y": operationNotImplemented,
  "CMP-Immediate": operationNotImplemented,
  "CMP-Indirect_Byte": operationNotImplemented,
  "CMP-Indirect_Byte_SY": operationNotImplemented,
  "CMP-Indirect_Byte_X": operationNotImplemented,
  "CMP-Indirect_Byte_Y": operationNotImplemented,
  "CMP-IndirectLong_Byte": operationNotImplemented,
  "CMP-IndirectLong_Byte_Y": operationNotImplemented,
  "COP-Immediate": operationNotImplemented,
  "CPX-Direct_Byte": operationNotImplemented,
  "CPX-Direct_Word": operationNotImplemented,
  "CPX-Immediate": operationNotImplemented,
  "CPY-Direct_Byte": operationNotImplemented,
  "CPY-Direct_Word": operationNotImplemented,
  "CPY-Immediate": operationNotImplemented,
  "DEC-Accumulator": operationNotImplemented,
  "DEC-Direct_Byte": operationNotImplemented,
  "DEC-Direct_Byte_X": operationNotImplemented,
  "DEC-Direct_Word": operationNotImplemented,
  "DEC-Direct_Word_X": operationNotImplemented,
  "DEX-Implied": operationNotImplemented,
  "DEY-Implied": operationNotImplemented,
  "EOR-Direct_Byte": operationNotImplemented,
  "EOR-Direct_Byte_S": operationNotImplemented,
  "EOR-Direct_Byte_X": operationNotImplemented,
  "EOR-Direct_Long": operationNotImplemented,
  "EOR-Direct_Long_X": operationNotImplemented,
  "EOR-Direct_Word": operationNotImplemented,
  "EOR-Direct_Word_X": operationNotImplemented,
  "EOR-Direct_Word_Y": operationNotImplemented,
  "EOR-Immediate": operationNotImplemented,
  "EOR-Indirect_Byte": operationNotImplemented,
  "EOR-Indirect_Byte_SY": operationNotImplemented,
  "EOR-Indirect_Byte_X": operationNotImplemented,
  "EOR-Indirect_Byte_Y": operationNotImplemented,
  "EOR-IndirectLong_Byte": operationNotImplemented,
  "EOR-IndirectLong_Byte_Y": operationNotImplemented,
  "INC-Accumulator": operationNotImplemented,
  "INC-Direct_Byte": operationNotImplemented,
  "INC-Direct_Byte_X": operationNotImplemented,
  "INC-Direct_Word": operationNotImplemented,
  "INC-Direct_Word_X": operationNotImplemented,
  "INX-Implied": operationNotImplemented,
  "INY-Implied": operationNotImplemented,
  "JML-Direct_Long": operationNotImplemented,
  "JML-IndirectLong_Word": operationNotImplemented,
  "JMP-Direct_Long": operationNotImplemented,
  "JMP-Direct_Word": operationNotImplemented,
  "JMP-Indirect_Word": operationNotImplemented,
  "JMP-Indirect_Word_X": operationNotImplemented,
  "JMP-IndirectLong_Word": operationNotImplemented,
  "JSL-Direct_Long": operationNotImplemented,
  "JSR-Direct_Long": operationNotImplemented,
  "JSR-Direct_Word": operationNotImplemented,
  "JSR-Indirect_Word_X": operationNotImplemented,
  "LDA-Direct_Byte": operationNotImplemented,
  "LDA-Direct_Byte_S": operationNotImplemented,
  "LDA-Direct_Byte_X": operationNotImplemented,
  "LDA-Direct_Long": operationNotImplemented,
  "LDA-Direct_Long_X": operationNotImplemented,
  "LDA-Direct_Word": operationNotImplemented,
  "LDA-Direct_Word_X": operationNotImplemented,
  "LDA-Direct_Word_Y": operationNotImplemented,
  "LDA-Immediate": operationNotImplemented,
  "LDA-Indirect_Byte": operationNotImplemented,
  "LDA-Indirect_Byte_SY": operationNotImplemented,
  "LDA-Indirect_Byte_X": operationNotImplemented,
  "LDA-Indirect_Byte_Y": operationNotImplemented,
  "LDA-IndirectLong_Byte": operationNotImplemented,
  "LDA-IndirectLong_Byte_Y": operationNotImplemented,
  "LDX-Direct_Byte": operationNotImplemented,
  "LDX-Direct_Byte_Y": operationNotImplemented,
  "LDX-Direct_Word": operationNotImplemented,
  "LDX-Direct_Word_Y": operationNotImplemented,
  "LDX-Immediate": operationNotImplemented,
  "LDY-Direct_Byte": operationNotImplemented,
  "LDY-Direct_Byte_X": operationNotImplemented,
  "LDY-Direct_Word": operationNotImplemented,
  "LDY-Direct_Word_X": operationNotImplemented,
  "LDY-Immediate": operationNotImplemented,
  "LSR-Accumulator": operationNotImplemented,
  "LSR-Direct_Byte": operationNotImplemented,
  "LSR-Direct_Byte_X": operationNotImplemented,
  "LSR-Direct_Word": operationNotImplemented,
  "LSR-Direct_Word_X": operationNotImplemented,
  "MVN-Move": operationNotImplemented,
  "MVP-Move": operationNotImplemented,
  "NOP-Implied": operationNotImplemented,
  "ORA-Direct_Byte": operationNotImplemented,
  "ORA-Direct_Byte_S": operationNotImplemented,
  "ORA-Direct_Byte_X": operationNotImplemented,
  "ORA-Direct_Long": operationNotImplemented,
  "ORA-Direct_Long_X": operationNotImplemented,
  "ORA-Direct_Word": operationNotImplemented,
  "ORA-Direct_Word_X": operationNotImplemented,
  "ORA-Direct_Word_Y": operationNotImplemented,
  "ORA-Immediate": operationNotImplemented,
  "ORA-Indirect_Byte": operationNotImplemented,
  "ORA-Indirect_Byte_SY": operationNotImplemented,
  "ORA-Indirect_Byte_X": operationNotImplemented,
  "ORA-Indirect_Byte_Y": operationNotImplemented,
  "ORA-IndirectLong_Byte": operationNotImplemented,
  "ORA-IndirectLong_Byte_Y": operationNotImplemented,
  "PEA-Direct_Word": operationNotImplemented,
  "PEI-Indirect_Byte": operationNotImplemented,
  "PER-Direct_Word": operationNotImplemented,
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
  "ROL-Accumulator": operationNotImplemented,
  "ROL-Direct_Byte": operationNotImplemented,
  "ROL-Direct_Byte_X": operationNotImplemented,
  "ROL-Direct_Word": operationNotImplemented,
  "ROL-Direct_Word_X": operationNotImplemented,
  "ROR-Accumulator": operationNotImplemented,
  "ROR-Direct_Byte": operationNotImplemented,
  "ROR-Direct_Byte_X": operationNotImplemented,
  "ROR-Direct_Word": operationNotImplemented,
  "ROR-Direct_Word_X": operationNotImplemented,
  "RTI-Implied": operationNotImplemented,
  "RTL-Implied": operationNotImplemented,
  "RTS-Implied": operationNotImplemented,
  "SBC-Direct_Byte": operationNotImplemented,
  "SBC-Direct_Byte_S": operationNotImplemented,
  "SBC-Direct_Byte_X": operationNotImplemented,
  "SBC-Direct_Long": operationNotImplemented,
  "SBC-Direct_Long_X": operationNotImplemented,
  "SBC-Direct_Word": operationNotImplemented,
  "SBC-Direct_Word_X": operationNotImplemented,
  "SBC-Direct_Word_Y": operationNotImplemented,
  "SBC-Immediate": operationNotImplemented,
  "SBC-Indirect_Byte": operationNotImplemented,
  "SBC-Indirect_Byte_SY": operationNotImplemented,
  "SBC-Indirect_Byte_X": operationNotImplemented,
  "SBC-Indirect_Byte_Y": operationNotImplemented,
  "SBC-IndirectLong_Byte": operationNotImplemented,
  "SBC-IndirectLong_Byte_Y": operationNotImplemented,
  "SEC-Implied": operationNotImplemented,
  "SED-Implied": operationNotImplemented,
  "SEI-Implied": operationNotImplemented,
  "SEP-Immediate": operationNotImplemented,
  "STA-Direct_Byte": operationNotImplemented,
  "STA-Direct_Byte_S": operationNotImplemented,
  "STA-Direct_Byte_X": operationNotImplemented,
  "STA-Direct_Long": operationNotImplemented,
  "STA-Direct_Long_X": operationNotImplemented,
  "STA-Direct_Word": operationNotImplemented,
  "STA-Direct_Word_X": operationNotImplemented,
  "STA-Direct_Word_Y": operationNotImplemented,
  "STA-Indirect_Byte": operationNotImplemented,
  "STA-Indirect_Byte_SY": operationNotImplemented,
  "STA-Indirect_Byte_X": operationNotImplemented,
  "STA-Indirect_Byte_Y": operationNotImplemented,
  "STA-IndirectLong_Byte": operationNotImplemented,
  "STA-IndirectLong_Byte_Y": operationNotImplemented,
  "STP-Implied": operationNotImplemented,
  "STX-Direct_Byte": operationNotImplemented,
  "STX-Direct_Byte_Y": operationNotImplemented,
  "STX-Direct_Word": operationNotImplemented,
  "STY-Direct_Byte": operationNotImplemented,
  "STY-Direct_Byte_X": operationNotImplemented,
  "STY-Direct_Word": operationNotImplemented,
  "STZ-Direct_Byte": operationNotImplemented,
  "STZ-Direct_Byte_X": operationNotImplemented,
  "STZ-Direct_Word": operationNotImplemented,
  "STZ-Direct_Word_X": operationNotImplemented,
  "TAX-Implied": operationNotImplemented,
  "TAY-Implied": operationNotImplemented,
  "TCD-Implied": operationNotImplemented,
  "TCS-Implied": operationNotImplemented,
  "TDC-Implied": operationNotImplemented,
  "TRB-Direct_Byte": operationNotImplemented,
  "TRB-Direct_Word": operationNotImplemented,
  "TSB-Direct_Byte": operationNotImplemented,
  "TSB-Direct_Word": operationNotImplemented,
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
  if (arg.h !== -1) value |= h(arg.h);
  if (arg.b !== -1) value |= b(arg.b);

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
      h: (bytes[i + 2] ?? 0) << 8,
      b: (bytes[i + 3] ?? 0) << 16,
    };

    const step = executeInstruction(state, id, arg);
    state = applyStateDiff(state, step.state);
    report.bytes += step.report.bytes;
    report.cycles += step.report.cycles;

    i += report.bytes;

    const { pb, pc } = incrementPc(state.pb, state.pc, report.bytes);
    state.pb = pb;
    state.pc = pc;

    steps.push(step);
  }

  return { report, state, steps };
}

export const Asm65816EmulatorFromScratch = EmulatorFromScratch;
export const Asm65816EmulatorFromInstructions = EmulatorFromInstructions;
export const Asm65816EmulatorFromBytes = EmulatorFromBytes;
