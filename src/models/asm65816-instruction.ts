import { z } from "zod";
import { IntegerFromString, IntegerUnit } from "./integer";

//==============================================================================
// Instruction Opcode
//==============================================================================

// prettier-ignore
const OpcodeSchema = z.enum([
  "ADC", "AND", "ASL", "BCC", "BCS", "BEQ", "BIT", "BMI", "BNE", "BPL", "BRA",
  "BRK", "BRL", "BVC", "BVS", "CLC", "CLD", "CLI", "CLV", "CMP", "COP", "CPX",
  "CPY", "DEC", "DEX", "DEY", "EOR", "INC", "INX", "INY", "JMP", "JML", "JSL",
  "JSR", "LDA", "LDX", "LDY", "LSR", "MVN", "MVP", "NOP", "ORA", "PEA", "PEI",
  "PER", "PHA", "PHB", "PHD", "PHK", "PHP", "PHX", "PHY", "PLA", "PLB", "PLD",
  "PLP", "PLX", "PLY", "REP", "ROL", "ROR", "RTI", "RTL", "RTS", "SBC", "SEC",
  "SED", "SEI", "SEP", "STA", "STP", "STX", "STY", "STZ", "TAX", "TAY", "TCD",
  "TCS", "TDC", "TRB", "TSB", "TSC", "TSX", "TXA", "TXS", "TXY", "TYA", "TYX",
  "WAI", "WDM", "XBA", "XCE"
]);

type Opcode = z.infer<typeof OpcodeSchema>;

export const Asm65816InstructionOpcodeSchema = OpcodeSchema;
export type Asm65816InstructionOpcode = Opcode;

//==============================================================================
// Instruction Mode
//==============================================================================

// prettier-ignore
const ModeSchema = z.enum([
  "Absolute", "AbsoluteLong", "AbsoluteLong_X", "Absolute_Indirect",
  "Absolute_IndirectLong", "Absolute_X_Indirect", "Absolute_X", "Absolute_Y",
  "Accumulator", "BlockMove", "Direct", "Direct_Indirect",
  "Direct_IndirectLong", "Direct_IndirectLong_Y", "Direct_Indirect_Y",
  "Direct_X", "Direct_X_Indirect", "Direct_Y", "Immediate", "Implied",
  "StackRelative", "StackRelative_Indirect_Y",
]);

type Mode = z.infer<typeof ModeSchema>;

export const Asm65816InstructionOpcodeMode = ModeSchema;
export type Asm65816InstructionMode = Mode;

//==============================================================================
// Instruction Id
//==============================================================================

// prettier-ignore
const TypeSchema = z.discriminatedUnion("id", [
  z.object({ id: z.literal("ADC-Absolute"),                 opcode: z.literal("ADC"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("ADC-AbsoluteLong"),             opcode: z.literal("ADC"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("ADC-AbsoluteLong_X"),           opcode: z.literal("ADC"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("ADC-Absolute_X"),               opcode: z.literal("ADC"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("ADC-Absolute_Y"),               opcode: z.literal("ADC"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("ADC-Direct"),                   opcode: z.literal("ADC"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("ADC-Direct_Indirect"),          opcode: z.literal("ADC"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("ADC-Direct_IndirectLong"),      opcode: z.literal("ADC"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("ADC-Direct_IndirectLong_Y"),    opcode: z.literal("ADC"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("ADC-Direct_Indirect_Y"),        opcode: z.literal("ADC"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("ADC-Direct_X"),                 opcode: z.literal("ADC"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("ADC-Direct_X_Indirect"),        opcode: z.literal("ADC"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("ADC-Immediate"),                opcode: z.literal("ADC"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("ADC-StackRelative"),            opcode: z.literal("ADC"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("ADC-StackRelative_Indirect_Y"), opcode: z.literal("ADC"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("AND-Absolute"),                 opcode: z.literal("AND"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("AND-AbsoluteLong"),             opcode: z.literal("AND"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("AND-AbsoluteLong_X"),           opcode: z.literal("AND"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("AND-Absolute_X"),               opcode: z.literal("AND"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("AND-Absolute_Y"),               opcode: z.literal("AND"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("AND-Direct"),                   opcode: z.literal("AND"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("AND-Direct_Indirect"),          opcode: z.literal("AND"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("AND-Direct_IndirectLong"),      opcode: z.literal("AND"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("AND-Direct_IndirectLong_Y"),    opcode: z.literal("AND"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("AND-Direct_Indirect_Y"),        opcode: z.literal("AND"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("AND-Direct_X"),                 opcode: z.literal("AND"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("AND-Direct_X_Indirect"),        opcode: z.literal("AND"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("AND-Immediate"),                opcode: z.literal("AND"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("AND-StackRelative"),            opcode: z.literal("AND"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("AND-StackRelative_Indirect_Y"), opcode: z.literal("AND"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("ASL-Absolute"),                 opcode: z.literal("ASL"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("ASL-Absolute_X"),               opcode: z.literal("ASL"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("ASL-Accumulator"),              opcode: z.literal("ASL"), mode: z.literal("Accumulator"),              }),
  z.object({ id: z.literal("ASL-Direct"),                   opcode: z.literal("ASL"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("ASL-Direct_X"),                 opcode: z.literal("ASL"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("BCC-Direct"),                   opcode: z.literal("BCC"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BCS-Direct"),                   opcode: z.literal("BCS"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BEQ-Direct"),                   opcode: z.literal("BEQ"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BIT-Absolute"),                 opcode: z.literal("BIT"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("BIT-Absolute_X"),               opcode: z.literal("BIT"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("BIT-Direct"),                   opcode: z.literal("BIT"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BIT-Direct_X"),                 opcode: z.literal("BIT"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("BIT-Immediate"),                opcode: z.literal("BIT"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("BMI-Direct"),                   opcode: z.literal("BMI"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BNE-Direct"),                   opcode: z.literal("BNE"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BPL-Direct"),                   opcode: z.literal("BPL"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BRA-Direct"),                   opcode: z.literal("BRA"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BRK-Immediate"),                opcode: z.literal("BRK"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("BRL-Absolute"),                 opcode: z.literal("BRL"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("BVC-Direct"),                   opcode: z.literal("BVC"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("BVS-Direct"),                   opcode: z.literal("BVS"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("CLC-Implied"),                  opcode: z.literal("CLC"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("CLD-Implied"),                  opcode: z.literal("CLD"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("CLI-Implied"),                  opcode: z.literal("CLI"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("CLV-Implied"),                  opcode: z.literal("CLV"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("CMP-Absolute"),                 opcode: z.literal("CMP"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("CMP-AbsoluteLong"),             opcode: z.literal("CMP"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("CMP-AbsoluteLong_X"),           opcode: z.literal("CMP"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("CMP-Absolute_X"),               opcode: z.literal("CMP"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("CMP-Absolute_Y"),               opcode: z.literal("CMP"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("CMP-Direct"),                   opcode: z.literal("CMP"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("CMP-Direct_Indirect"),          opcode: z.literal("CMP"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("CMP-Direct_IndirectLong"),      opcode: z.literal("CMP"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("CMP-Direct_IndirectLong_Y"),    opcode: z.literal("CMP"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("CMP-Direct_Indirect_Y"),        opcode: z.literal("CMP"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("CMP-Direct_X"),                 opcode: z.literal("CMP"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("CMP-Direct_X_Indirect"),        opcode: z.literal("CMP"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("CMP-Immediate"),                opcode: z.literal("CMP"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("CMP-StackRelative"),            opcode: z.literal("CMP"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("CMP-StackRelative_Indirect_Y"), opcode: z.literal("CMP"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("COP-Immediate"),                opcode: z.literal("COP"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("CPX-Absolute"),                 opcode: z.literal("CPX"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("CPX-Direct"),                   opcode: z.literal("CPX"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("CPX-Immediate"),                opcode: z.literal("CPX"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("CPY-Absolute"),                 opcode: z.literal("CPY"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("CPY-Direct"),                   opcode: z.literal("CPY"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("CPY-Immediate"),                opcode: z.literal("CPY"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("DEC-Absolute"),                 opcode: z.literal("DEC"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("DEC-Absolute_X"),               opcode: z.literal("DEC"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("DEC-Accumulator"),              opcode: z.literal("DEC"), mode: z.literal("Accumulator"),              }),
  z.object({ id: z.literal("DEC-Direct"),                   opcode: z.literal("DEC"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("DEC-Direct_X"),                 opcode: z.literal("DEC"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("DEX-Implied"),                  opcode: z.literal("DEX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("DEY-Implied"),                  opcode: z.literal("DEY"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("EOR-Absolute"),                 opcode: z.literal("EOR"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("EOR-AbsoluteLong"),             opcode: z.literal("EOR"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("EOR-AbsoluteLong_X"),           opcode: z.literal("EOR"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("EOR-Absolute_X"),               opcode: z.literal("EOR"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("EOR-Absolute_Y"),               opcode: z.literal("EOR"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("EOR-Direct"),                   opcode: z.literal("EOR"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("EOR-Direct_Indirect"),          opcode: z.literal("EOR"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("EOR-Direct_IndirectLong"),      opcode: z.literal("EOR"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("EOR-Direct_IndirectLong_Y"),    opcode: z.literal("EOR"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("EOR-Direct_Indirect_Y"),        opcode: z.literal("EOR"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("EOR-Direct_X"),                 opcode: z.literal("EOR"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("EOR-Direct_X_Indirect"),        opcode: z.literal("EOR"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("EOR-Immediate"),                opcode: z.literal("EOR"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("EOR-StackRelative"),            opcode: z.literal("EOR"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("EOR-StackRelative_Indirect_Y"), opcode: z.literal("EOR"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("INC-Absolute"),                 opcode: z.literal("INC"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("INC-Absolute_X"),               opcode: z.literal("INC"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("INC-Accumulator"),              opcode: z.literal("INC"), mode: z.literal("Accumulator"),              }),
  z.object({ id: z.literal("INC-Direct"),                   opcode: z.literal("INC"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("INC-Direct_X"),                 opcode: z.literal("INC"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("INX-Implied"),                  opcode: z.literal("INX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("INY-Implied"),                  opcode: z.literal("INY"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("JML-AbsoluteLong"),             opcode: z.literal("JML"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("JML-Absolute_IndirectLong"),    opcode: z.literal("JML"), mode: z.literal("Absolute_IndirectLong"),    }),
  z.object({ id: z.literal("JMP-Absolute"),                 opcode: z.literal("JMP"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("JMP-AbsoluteLong"),             opcode: z.literal("JMP"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("JMP-Absolute_Indirect"),        opcode: z.literal("JMP"), mode: z.literal("Absolute_Indirect"),        }),
  z.object({ id: z.literal("JMP-Absolute_IndirectLong"),    opcode: z.literal("JMP"), mode: z.literal("Absolute_IndirectLong"),    }),
  z.object({ id: z.literal("JMP-Absolute_X_Indirect"),      opcode: z.literal("JMP"), mode: z.literal("Absolute_X_Indirect"),      }),
  z.object({ id: z.literal("JSL-AbsoluteLong"),             opcode: z.literal("JSL"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("JSR-Absolute"),                 opcode: z.literal("JSR"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("JSR-AbsoluteLong"),             opcode: z.literal("JSR"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("JSR-Absolute_X_Indirect"),      opcode: z.literal("JSR"), mode: z.literal("Absolute_X_Indirect"),      }),
  z.object({ id: z.literal("LDA-Absolute"),                 opcode: z.literal("LDA"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("LDA-AbsoluteLong"),             opcode: z.literal("LDA"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("LDA-AbsoluteLong_X"),           opcode: z.literal("LDA"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("LDA-Absolute_X"),               opcode: z.literal("LDA"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("LDA-Absolute_Y"),               opcode: z.literal("LDA"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("LDA-Direct"),                   opcode: z.literal("LDA"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("LDA-Direct_Indirect"),          opcode: z.literal("LDA"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("LDA-Direct_IndirectLong"),      opcode: z.literal("LDA"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("LDA-Direct_IndirectLong_Y"),    opcode: z.literal("LDA"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("LDA-Direct_Indirect_Y"),        opcode: z.literal("LDA"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("LDA-Direct_X"),                 opcode: z.literal("LDA"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("LDA-Direct_X_Indirect"),        opcode: z.literal("LDA"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("LDA-Immediate"),                opcode: z.literal("LDA"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("LDA-StackRelative"),            opcode: z.literal("LDA"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("LDA-StackRelative_Indirect_Y"), opcode: z.literal("LDA"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("LDX-Absolute"),                 opcode: z.literal("LDX"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("LDX-Absolute_Y"),               opcode: z.literal("LDX"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("LDX-Direct"),                   opcode: z.literal("LDX"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("LDX-Direct_Y"),                 opcode: z.literal("LDX"), mode: z.literal("Direct_Y"),                 }),
  z.object({ id: z.literal("LDX-Immediate"),                opcode: z.literal("LDX"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("LDY-Absolute"),                 opcode: z.literal("LDY"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("LDY-Absolute_X"),               opcode: z.literal("LDY"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("LDY-Direct"),                   opcode: z.literal("LDY"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("LDY-Direct_X"),                 opcode: z.literal("LDY"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("LDY-Immediate"),                opcode: z.literal("LDY"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("LSR-Absolute"),                 opcode: z.literal("LSR"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("LSR-Absolute_X"),               opcode: z.literal("LSR"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("LSR-Accumulator"),              opcode: z.literal("LSR"), mode: z.literal("Accumulator"),              }),
  z.object({ id: z.literal("LSR-Direct"),                   opcode: z.literal("LSR"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("LSR-Direct_X"),                 opcode: z.literal("LSR"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("MVN-BlockMove"),                opcode: z.literal("MVN"), mode: z.literal("BlockMove"),                }),
  z.object({ id: z.literal("MVP-BlockMove"),                opcode: z.literal("MVP"), mode: z.literal("BlockMove"),                }),
  z.object({ id: z.literal("NOP-Implied"),                  opcode: z.literal("NOP"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("ORA-Absolute"),                 opcode: z.literal("ORA"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("ORA-AbsoluteLong"),             opcode: z.literal("ORA"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("ORA-AbsoluteLong_X"),           opcode: z.literal("ORA"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("ORA-Absolute_X"),               opcode: z.literal("ORA"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("ORA-Absolute_Y"),               opcode: z.literal("ORA"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("ORA-Direct"),                   opcode: z.literal("ORA"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("ORA-Direct_Indirect"),          opcode: z.literal("ORA"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("ORA-Direct_IndirectLong"),      opcode: z.literal("ORA"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("ORA-Direct_IndirectLong_Y"),    opcode: z.literal("ORA"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("ORA-Direct_Indirect_Y"),        opcode: z.literal("ORA"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("ORA-Direct_X"),                 opcode: z.literal("ORA"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("ORA-Direct_X_Indirect"),        opcode: z.literal("ORA"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("ORA-Immediate"),                opcode: z.literal("ORA"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("ORA-StackRelative"),            opcode: z.literal("ORA"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("ORA-StackRelative_Indirect_Y"), opcode: z.literal("ORA"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("PEA-Absolute"),                 opcode: z.literal("PEA"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("PEI-Direct_Indirect"),          opcode: z.literal("PEI"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("PER-Absolute"),                 opcode: z.literal("PER"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("PHA-Implied"),                  opcode: z.literal("PHA"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PHB-Implied"),                  opcode: z.literal("PHB"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PHD-Implied"),                  opcode: z.literal("PHD"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PHK-Implied"),                  opcode: z.literal("PHK"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PHP-Implied"),                  opcode: z.literal("PHP"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PHX-Implied"),                  opcode: z.literal("PHX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PHY-Implied"),                  opcode: z.literal("PHY"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PLA-Implied"),                  opcode: z.literal("PLA"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PLB-Implied"),                  opcode: z.literal("PLB"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PLD-Implied"),                  opcode: z.literal("PLD"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PLP-Implied"),                  opcode: z.literal("PLP"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PLX-Implied"),                  opcode: z.literal("PLX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("PLY-Implied"),                  opcode: z.literal("PLY"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("REP-Immediate"),                opcode: z.literal("REP"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("ROL-Absolute"),                 opcode: z.literal("ROL"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("ROL-Absolute_X"),               opcode: z.literal("ROL"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("ROL-Accumulator"),              opcode: z.literal("ROL"), mode: z.literal("Accumulator"),              }),
  z.object({ id: z.literal("ROL-Direct"),                   opcode: z.literal("ROL"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("ROL-Direct_X"),                 opcode: z.literal("ROL"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("ROR-Absolute"),                 opcode: z.literal("ROR"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("ROR-Absolute_X"),               opcode: z.literal("ROR"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("ROR-Accumulator"),              opcode: z.literal("ROR"), mode: z.literal("Accumulator"),              }),
  z.object({ id: z.literal("ROR-Direct"),                   opcode: z.literal("ROR"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("ROR-Direct_X"),                 opcode: z.literal("ROR"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("RTI-Implied"),                  opcode: z.literal("RTI"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("RTL-Implied"),                  opcode: z.literal("RTL"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("RTS-Implied"),                  opcode: z.literal("RTS"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("SBC-Absolute"),                 opcode: z.literal("SBC"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("SBC-AbsoluteLong"),             opcode: z.literal("SBC"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("SBC-AbsoluteLong_X"),           opcode: z.literal("SBC"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("SBC-Absolute_X"),               opcode: z.literal("SBC"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("SBC-Absolute_Y"),               opcode: z.literal("SBC"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("SBC-Direct"),                   opcode: z.literal("SBC"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("SBC-Direct_Indirect"),          opcode: z.literal("SBC"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("SBC-Direct_IndirectLong"),      opcode: z.literal("SBC"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("SBC-Direct_IndirectLong_Y"),    opcode: z.literal("SBC"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("SBC-Direct_Indirect_Y"),        opcode: z.literal("SBC"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("SBC-Direct_X"),                 opcode: z.literal("SBC"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("SBC-Direct_X_Indirect"),        opcode: z.literal("SBC"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("SBC-Immediate"),                opcode: z.literal("SBC"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("SBC-StackRelative"),            opcode: z.literal("SBC"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("SBC-StackRelative_Indirect_Y"), opcode: z.literal("SBC"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("SEC-Implied"),                  opcode: z.literal("SEC"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("SED-Implied"),                  opcode: z.literal("SED"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("SEI-Implied"),                  opcode: z.literal("SEI"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("SEP-Immediate"),                opcode: z.literal("SEP"), mode: z.literal("Immediate"),                }),
  z.object({ id: z.literal("STA-Absolute"),                 opcode: z.literal("STA"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("STA-AbsoluteLong"),             opcode: z.literal("STA"), mode: z.literal("AbsoluteLong"),             }),
  z.object({ id: z.literal("STA-AbsoluteLong_X"),           opcode: z.literal("STA"), mode: z.literal("AbsoluteLong_X"),           }),
  z.object({ id: z.literal("STA-Absolute_X"),               opcode: z.literal("STA"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("STA-Absolute_Y"),               opcode: z.literal("STA"), mode: z.literal("Absolute_Y"),               }),
  z.object({ id: z.literal("STA-Direct"),                   opcode: z.literal("STA"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("STA-Direct_Indirect"),          opcode: z.literal("STA"), mode: z.literal("Direct_Indirect"),          }),
  z.object({ id: z.literal("STA-Direct_IndirectLong"),      opcode: z.literal("STA"), mode: z.literal("Direct_IndirectLong"),      }),
  z.object({ id: z.literal("STA-Direct_IndirectLong_Y"),    opcode: z.literal("STA"), mode: z.literal("Direct_IndirectLong_Y"),    }),
  z.object({ id: z.literal("STA-Direct_Indirect_Y"),        opcode: z.literal("STA"), mode: z.literal("Direct_Indirect_Y"),        }),
  z.object({ id: z.literal("STA-Direct_X"),                 opcode: z.literal("STA"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("STA-Direct_X_Indirect"),        opcode: z.literal("STA"), mode: z.literal("Direct_X_Indirect"),        }),
  z.object({ id: z.literal("STA-StackRelative"),            opcode: z.literal("STA"), mode: z.literal("StackRelative"),            }),
  z.object({ id: z.literal("STA-StackRelative_Indirect_Y"), opcode: z.literal("STA"), mode: z.literal("StackRelative_Indirect_Y"), }),
  z.object({ id: z.literal("STP-Implied"),                  opcode: z.literal("STP"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("STX-Absolute"),                 opcode: z.literal("STX"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("STX-Direct"),                   opcode: z.literal("STX"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("STX-Direct_Y"),                 opcode: z.literal("STX"), mode: z.literal("Direct_Y"),                 }),
  z.object({ id: z.literal("STY-Absolute"),                 opcode: z.literal("STY"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("STY-Direct"),                   opcode: z.literal("STY"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("STY-Direct_X"),                 opcode: z.literal("STY"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("STZ-Absolute"),                 opcode: z.literal("STZ"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("STZ-Absolute_X"),               opcode: z.literal("STZ"), mode: z.literal("Absolute_X"),               }),
  z.object({ id: z.literal("STZ-Direct"),                   opcode: z.literal("STZ"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("STZ-Direct_X"),                 opcode: z.literal("STZ"), mode: z.literal("Direct_X"),                 }),
  z.object({ id: z.literal("TAX-Implied"),                  opcode: z.literal("TAX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TAY-Implied"),                  opcode: z.literal("TAY"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TCD-Implied"),                  opcode: z.literal("TCD"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TCS-Implied"),                  opcode: z.literal("TCS"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TDC-Implied"),                  opcode: z.literal("TDC"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TRB-Absolute"),                 opcode: z.literal("TRB"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("TRB-Direct"),                   opcode: z.literal("TRB"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("TSB-Absolute"),                 opcode: z.literal("TSB"), mode: z.literal("Absolute"),                 }),
  z.object({ id: z.literal("TSB-Direct"),                   opcode: z.literal("TSB"), mode: z.literal("Direct"),                   }),
  z.object({ id: z.literal("TSC-Implied"),                  opcode: z.literal("TSC"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TSX-Implied"),                  opcode: z.literal("TSX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TXA-Implied"),                  opcode: z.literal("TXA"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TXS-Implied"),                  opcode: z.literal("TXS"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TXY-Implied"),                  opcode: z.literal("TXY"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TYA-Implied"),                  opcode: z.literal("TYA"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("TYX-Implied"),                  opcode: z.literal("TYX"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("WAI-Implied"),                  opcode: z.literal("WAI"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("WDM-Implied"),                  opcode: z.literal("WDM"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("XBA-Implied"),                  opcode: z.literal("XBA"), mode: z.literal("Implied"),                  }),
  z.object({ id: z.literal("XCE-Implied"),                  opcode: z.literal("XCE"), mode: z.literal("Implied"),                  }),
]);

type Type = z.infer<typeof TypeSchema>;

export const Asm65816InstructionTypeSchema = TypeSchema;
export type Asm65816InstructionType = Type;

//==============================================================================
// Instruction Key
//==============================================================================

type Id = Type extends infer I
  ? I extends { id: `${Opcode}-${Mode}`; opcode: Opcode; mode: Mode }
    ? `${I["id"]}`
    : never
  : never;

export type Asm65816InstructionId = Id;

//==============================================================================
// Instruction Args Type
//==============================================================================

enum ArgsType {
  None,
  Byte,
  Word,
  Long,
  Move,
  ByteOrWord,
}

export const Asm65816InstructionArgsType = ArgsType;

//==============================================================================
// Instruction Arg Unit
//==============================================================================

type ArgUnit = "Byte" | "Word" | "Long";

export type Asm65816InstructionArgUnit = ArgUnit;

//==============================================================================
// Instruction Arg
//==============================================================================

const ArgByteSchema = z.object({ unit: z.literal("Byte"), value: z.string() });
const ArgWordSchema = z.object({ unit: z.literal("Word"), value: z.string() });
const ArgLongSchema = z.object({ unit: z.literal("Long"), value: z.string() });

type ArgByte = z.infer<typeof ArgByteSchema>;
type ArgWord = z.infer<typeof ArgWordSchema>;
type ArgLong = z.infer<typeof ArgLongSchema>;

type Arg = ArgByte | ArgWord | ArgLong;

export type Asm65168InstructionArg = Arg;

const ArgsNoneSchema = z.tuple([]);
const ArgsByteSchema = z.tuple([ArgByteSchema]);
const ArgsWordSchema = z.tuple([ArgWordSchema]);
const ArgsLongSchema = z.tuple([ArgLongSchema]);
const ArgsMoveSchema = z.tuple([ArgByteSchema, ArgByteSchema]);
const ArgsByteOrWordSchema = z.union([ArgsByteSchema, ArgsWordSchema]);

//==============================================================================
// Instruction Mode Meta
//==============================================================================

type ModeMeta = { argsType: ArgsType; label: string };

// prettier-ignore
const ModeMetaByMode = {
  Absolute:                 { argsType: ArgsType.Word, label: "addr" },
  AbsoluteLong:             { argsType: ArgsType.Long, label: "long" },
  AbsoluteLong_X:           { argsType: ArgsType.Long, label: "long,x" },
  Absolute_Indirect:        { argsType: ArgsType.Word, label: "(addr)" },
  Absolute_IndirectLong:    { argsType: ArgsType.Word, label: "[addr]" },
  Absolute_X:               { argsType: ArgsType.Word, label: "addr,x" },
  Absolute_X_Indirect:      { argsType: ArgsType.Word, label: "(addr,x)" },
  Absolute_Y:               { argsType: ArgsType.Word, label: "addr,y" },
  Accumulator:              { argsType: ArgsType.None, label: "A" },
  BlockMove:                { argsType: ArgsType.Move, label: "srcBank,destBank" },
  Direct:                   { argsType: ArgsType.Byte, label: "dp" },
  Direct_Indirect:          { argsType: ArgsType.Byte, label: "(dp)" },
  Direct_IndirectLong:      { argsType: ArgsType.Byte, label: "[dp]" },
  Direct_IndirectLong_Y:    { argsType: ArgsType.Byte, label: "[dp],y" },
  Direct_Indirect_Y:        { argsType: ArgsType.Byte, label: "(dp),y" },
  Direct_X:                 { argsType: ArgsType.Byte, label: "dp,x" },
  Direct_X_Indirect:        { argsType: ArgsType.Byte, label: "(dp,x)" },
  Direct_Y:                 { argsType: ArgsType.Byte, label: "dp,y" },
  Immediate:                { argsType: ArgsType.ByteOrWord, label: "#const" },
  Implied:                  { argsType: ArgsType.None, label: "" },
  StackRelative:            { argsType: ArgsType.Byte, label: "sr,s" },
  StackRelative_Indirect_Y: { argsType: ArgsType.Byte, label: "(sr,s),y" },
} as const satisfies Record<Mode, ModeMeta>;

export type Asm65816InstructionModeMeta = ModeMeta;
export const Asm65816InstructionModeMetaByMode = ModeMetaByMode;

//==============================================================================
// Instruction Bytes/Cycles Modifiers
//==============================================================================

const M = 0b000000001; // +1 if m=0
const N = 0b000000010; // +2 if m=0
const X = 0b000000100; // +1 if x=0
const E = 0b000001000; // +1 if e=0
const D = 0b000010000; // +1 if DP.l != 0
const P = 0b000100000; // +1 if index crosses page boundary
const B = 0b001000000; // +1 if branch is taken, +2 if branch is taken and e=1
const V = 0b010000000; // +7 per byte moved
const A = 0b100000000; // +? during restart

enum Modifier {
  Plus1IfMIsZero = M,
  Plus2IfMIsZero = N,
  Plus1IfXIsZero = X,
  Plus1IfEIsZero = E,
  Plus1IfDirectPageLowByteIsNonZero = D,
  Plus1IfIndexCrossesPageBoundary = P,
  Plus1IfBranchTaken = B,
  Plus7PerByteMoved = V,
  PlusVariableAmountDueToRestart = A,
}

export const Asm65816InstructionModifier = Modifier;

//==============================================================================
// Instruction Meta
//==============================================================================

type Meta = {
  opcode: Opcode;
  mode: Mode;
  hex: number;
  flags: string;
  bytes: number;
  bytesModifiers: number;
  cycles: number;
  cyclesModifiers: number;
};

// prettier-ignore
const MetaById = {
  "ADC-Absolute":                 { opcode: "ADC", mode: "Absolute",                 hex: 0x6D, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ADC-AbsoluteLong":             { opcode: "ADC", mode: "AbsoluteLong",             hex: 0x6F, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ADC-AbsoluteLong_X":           { opcode: "ADC", mode: "AbsoluteLong_X",           hex: 0x7F, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ADC-Absolute_X":               { opcode: "ADC", mode: "Absolute_X",               hex: 0x7D, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ADC-Absolute_Y":               { opcode: "ADC", mode: "Absolute_Y",               hex: 0x79, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ADC-Direct":                   { opcode: "ADC", mode: "Direct",                   hex: 0x65, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "ADC-Direct_Indirect":          { opcode: "ADC", mode: "Direct_Indirect",          hex: 0x72, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "ADC-Direct_IndirectLong":      { opcode: "ADC", mode: "Direct_IndirectLong",      hex: 0x67, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ADC-Direct_IndirectLong_Y":    { opcode: "ADC", mode: "Direct_IndirectLong_Y",    hex: 0x77, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ADC-Direct_Indirect_Y":        { opcode: "ADC", mode: "Direct_Indirect_Y",        hex: 0x71, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "ADC-Direct_X":                 { opcode: "ADC", mode: "Direct_X",                 hex: 0x75, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "ADC-Direct_X_Indirect":        { opcode: "ADC", mode: "Direct_X_Indirect",        hex: 0x61, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ADC-Immediate":                { opcode: "ADC", mode: "Immediate",                hex: 0x69, flags: "NV----ZC", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "ADC-StackRelative":            { opcode: "ADC", mode: "StackRelative",            hex: 0x63, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ADC-StackRelative_Indirect_Y": { opcode: "ADC", mode: "StackRelative_Indirect_Y", hex: 0x73, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "AND-Absolute":                 { opcode: "AND", mode: "Absolute",                 hex: 0x2D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "AND-AbsoluteLong":             { opcode: "AND", mode: "AbsoluteLong",             hex: 0x2F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "AND-AbsoluteLong_X":           { opcode: "AND", mode: "AbsoluteLong_X",           hex: 0x3F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "AND-Absolute_X":               { opcode: "AND", mode: "Absolute_X",               hex: 0x3D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "AND-Absolute_Y":               { opcode: "AND", mode: "Absolute_Y",               hex: 0x39, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "AND-Direct":                   { opcode: "AND", mode: "Direct",                   hex: 0x25, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "AND-Direct_Indirect":          { opcode: "AND", mode: "Direct_Indirect",          hex: 0x32, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "AND-Direct_IndirectLong":      { opcode: "AND", mode: "Direct_IndirectLong",      hex: 0x27, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "AND-Direct_IndirectLong_Y":    { opcode: "AND", mode: "Direct_IndirectLong_Y",    hex: 0x37, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "AND-Direct_Indirect_Y":        { opcode: "AND", mode: "Direct_Indirect_Y",        hex: 0x31, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "AND-Direct_X":                 { opcode: "AND", mode: "Direct_X",                 hex: 0x35, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "AND-Direct_X_Indirect":        { opcode: "AND", mode: "Direct_X_Indirect",        hex: 0x21, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "AND-Immediate":                { opcode: "AND", mode: "Immediate",                hex: 0x29, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "AND-StackRelative":            { opcode: "AND", mode: "StackRelative",            hex: 0x23, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "AND-StackRelative_Indirect_Y": { opcode: "AND", mode: "StackRelative_Indirect_Y", hex: 0x33, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "ASL-Absolute":                 { opcode: "ASL", mode: "Absolute",                 hex: 0x0E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "ASL-Absolute_X":               { opcode: "ASL", mode: "Absolute_X",               hex: 0x1E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "ASL-Accumulator":              { opcode: "ASL", mode: "Accumulator",              hex: 0x0A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ASL-Direct":                   { opcode: "ASL", mode: "Direct",                   hex: 0x06, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "ASL-Direct_X":                 { opcode: "ASL", mode: "Direct_X",                 hex: 0x16, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "BCC-Direct":                   { opcode: "BCC", mode: "Direct",                   hex: 0x90, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BCS-Direct":                   { opcode: "BCS", mode: "Direct",                   hex: 0xB0, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BEQ-Direct":                   { opcode: "BEQ", mode: "Direct",                   hex: 0xF0, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BIT-Absolute":                 { opcode: "BIT", mode: "Absolute",                 hex: 0x2C, flags: "NV----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "BIT-Absolute_X":               { opcode: "BIT", mode: "Absolute_X",               hex: 0x3C, flags: "NV----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "BIT-Direct":                   { opcode: "BIT", mode: "Direct",                   hex: 0x24, flags: "NV----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "BIT-Direct_X":                 { opcode: "BIT", mode: "Direct_X",                 hex: 0x34, flags: "NV----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "BIT-Immediate":                { opcode: "BIT", mode: "Immediate",                hex: 0x89, flags: "------Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "BMI-Direct":                   { opcode: "BMI", mode: "Direct",                   hex: 0x30, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BNE-Direct":                   { opcode: "BNE", mode: "Direct",                   hex: 0xD0, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BPL-Direct":                   { opcode: "BPL", mode: "Direct",                   hex: 0x10, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BRA-Direct":                   { opcode: "BRA", mode: "Direct",                   hex: 0x80, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: B         },
  "BRK-Immediate":                { opcode: "BRK", mode: "Immediate",                hex: 0x00, flags: "----DI--", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: E         },
  "BRL-Absolute":                 { opcode: "BRL", mode: "Absolute",                 hex: 0x82, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "BVC-Direct":                   { opcode: "BVC", mode: "Direct",                   hex: 0x50, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BVS-Direct":                   { opcode: "BVS", mode: "Direct",                   hex: 0x70, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "CLC-Implied":                  { opcode: "CLC", mode: "Implied",                  hex: 0x18, flags: "-------C", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CLD-Implied":                  { opcode: "CLD", mode: "Implied",                  hex: 0xD8, flags: "----D---", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CLI-Implied":                  { opcode: "CLI", mode: "Implied",                  hex: 0x58, flags: "-----I--", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CLV-Implied":                  { opcode: "CLV", mode: "Implied",                  hex: 0xB8, flags: "-V------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CMP-Absolute":                 { opcode: "CMP", mode: "Absolute",                 hex: 0xCD, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "CMP-AbsoluteLong":             { opcode: "CMP", mode: "AbsoluteLong",             hex: 0xCF, flags: "N-----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "CMP-AbsoluteLong_X":           { opcode: "CMP", mode: "AbsoluteLong_X",           hex: 0xDF, flags: "N-----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "CMP-Absolute_X":               { opcode: "CMP", mode: "Absolute_X",               hex: 0xDD, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "CMP-Absolute_Y":               { opcode: "CMP", mode: "Absolute_Y",               hex: 0xD9, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "CMP-Direct":                   { opcode: "CMP", mode: "Direct",                   hex: 0xC5, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "CMP-Direct_Indirect":          { opcode: "CMP", mode: "Direct_Indirect",          hex: 0xD2, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "CMP-Direct_IndirectLong":      { opcode: "CMP", mode: "Direct_IndirectLong",      hex: 0xC7, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "CMP-Direct_IndirectLong_Y":    { opcode: "CMP", mode: "Direct_IndirectLong_Y",    hex: 0xD7, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "CMP-Direct_Indirect_Y":        { opcode: "CMP", mode: "Direct_Indirect_Y",        hex: 0xD1, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "CMP-Direct_X":                 { opcode: "CMP", mode: "Direct_X",                 hex: 0xD5, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "CMP-Direct_X_Indirect":        { opcode: "CMP", mode: "Direct_X_Indirect",        hex: 0xC1, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "CMP-Immediate":                { opcode: "CMP", mode: "Immediate",                hex: 0xC9, flags: "N-----ZC", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "CMP-StackRelative":            { opcode: "CMP", mode: "StackRelative",            hex: 0xC3, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "CMP-StackRelative_Indirect_Y": { opcode: "CMP", mode: "StackRelative_Indirect_Y", hex: 0xD3, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "COP-Immediate":                { opcode: "COP", mode: "Immediate",                hex: 0x02, flags: "----DI--", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: E         },
  "CPX-Absolute":                 { opcode: "CPX", mode: "Absolute",                 hex: 0xEC, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "CPX-Direct":                   { opcode: "CPX", mode: "Direct",                   hex: 0xE4, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "CPX-Immediate":                { opcode: "CPX", mode: "Immediate",                hex: 0xE0, flags: "N-----ZC", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "CPY-Absolute":                 { opcode: "CPY", mode: "Absolute",                 hex: 0xCC, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "CPY-Direct":                   { opcode: "CPY", mode: "Direct",                   hex: 0xC4, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "CPY-Immediate":                { opcode: "CPY", mode: "Immediate",                hex: 0xC0, flags: "N-----ZC", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "DEC-Absolute":                 { opcode: "DEC", mode: "Absolute",                 hex: 0xCE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "DEC-Absolute_X":               { opcode: "DEC", mode: "Absolute_X",               hex: 0xDE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "DEC-Accumulator":              { opcode: "DEC", mode: "Accumulator",              hex: 0x3A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "DEC-Direct":                   { opcode: "DEC", mode: "Direct",                   hex: 0xC6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "DEC-Direct_X":                 { opcode: "DEC", mode: "Direct_X",                 hex: 0xD6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "DEX-Implied":                  { opcode: "DEX", mode: "Implied",                  hex: 0xCA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "DEY-Implied":                  { opcode: "DEY", mode: "Implied",                  hex: 0x88, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "EOR-Absolute":                 { opcode: "EOR", mode: "Absolute",                 hex: 0x4D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "EOR-AbsoluteLong":             { opcode: "EOR", mode: "AbsoluteLong",             hex: 0x4F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "EOR-AbsoluteLong_X":           { opcode: "EOR", mode: "AbsoluteLong_X",           hex: 0x5F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "EOR-Absolute_X":               { opcode: "EOR", mode: "Absolute_X",               hex: 0x5D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "EOR-Absolute_Y":               { opcode: "EOR", mode: "Absolute_Y",               hex: 0x59, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "EOR-Direct":                   { opcode: "EOR", mode: "Direct",                   hex: 0x45, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "EOR-Direct_Indirect":          { opcode: "EOR", mode: "Direct_Indirect",          hex: 0x52, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "EOR-Direct_IndirectLong":      { opcode: "EOR", mode: "Direct_IndirectLong",      hex: 0x47, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "EOR-Direct_IndirectLong_Y":    { opcode: "EOR", mode: "Direct_IndirectLong_Y",    hex: 0x57, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "EOR-Direct_Indirect_Y":        { opcode: "EOR", mode: "Direct_Indirect_Y",        hex: 0x51, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "EOR-Direct_X":                 { opcode: "EOR", mode: "Direct_X",                 hex: 0x55, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "EOR-Direct_X_Indirect":        { opcode: "EOR", mode: "Direct_X_Indirect",        hex: 0x41, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "EOR-Immediate":                { opcode: "EOR", mode: "Immediate",                hex: 0x49, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "EOR-StackRelative":            { opcode: "EOR", mode: "StackRelative",            hex: 0x43, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "EOR-StackRelative_Indirect_Y": { opcode: "EOR", mode: "StackRelative_Indirect_Y", hex: 0x53, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "INC-Absolute":                 { opcode: "INC", mode: "Absolute",                 hex: 0xEE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "INC-Absolute_X":               { opcode: "INC", mode: "Absolute_X",               hex: 0xFE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "INC-Accumulator":              { opcode: "INC", mode: "Accumulator",              hex: 0x1A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "INC-Direct":                   { opcode: "INC", mode: "Direct",                   hex: 0xE6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "INC-Direct_X":                 { opcode: "INC", mode: "Direct_X",                 hex: 0xF6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "INX-Implied":                  { opcode: "INX", mode: "Implied",                  hex: 0xE8, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "INY-Implied":                  { opcode: "INY", mode: "Implied",                  hex: 0xC8, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "JML-AbsoluteLong":             { opcode: "JML", mode: "AbsoluteLong",             hex: 0x5C, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "JML-Absolute_IndirectLong":    { opcode: "JML", mode: "Absolute_IndirectLong",    hex: 0xDC, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JMP-Absolute":                 { opcode: "JMP", mode: "Absolute",                 hex: 0x4C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "JMP-AbsoluteLong":             { opcode: "JMP", mode: "AbsoluteLong",             hex: 0x5C, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "JMP-Absolute_Indirect":        { opcode: "JMP", mode: "Absolute_Indirect",        hex: 0x6C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: 0         },
  "JMP-Absolute_IndirectLong":    { opcode: "JMP", mode: "Absolute_IndirectLong",    hex: 0xDC, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JMP-Absolute_X_Indirect":      { opcode: "JMP", mode: "Absolute_X_Indirect",      hex: 0x7C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JSL-AbsoluteLong":             { opcode: "JSL", mode: "AbsoluteLong",             hex: 0x22, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 8, cyclesModifiers: 0         },
  "JSR-Absolute":                 { opcode: "JSR", mode: "Absolute",                 hex: 0x20, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JSR-AbsoluteLong":             { opcode: "JSR", mode: "AbsoluteLong",             hex: 0x22, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 8, cyclesModifiers: 0         },
  "JSR-Absolute_X_Indirect":      { opcode: "JSR", mode: "Absolute_X_Indirect",      hex: 0xFC, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 8, cyclesModifiers: 0         },
  "LDA-Absolute":                 { opcode: "LDA", mode: "Absolute",                 hex: 0xAD, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "LDA-AbsoluteLong":             { opcode: "LDA", mode: "AbsoluteLong",             hex: 0xAF, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "LDA-AbsoluteLong_X":           { opcode: "LDA", mode: "AbsoluteLong_X",           hex: 0xBF, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "LDA-Absolute_X":               { opcode: "LDA", mode: "Absolute_X",               hex: 0xBD, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "LDA-Absolute_Y":               { opcode: "LDA", mode: "Absolute_Y",               hex: 0xB9, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "LDA-Direct":                   { opcode: "LDA", mode: "Direct",                   hex: 0xA5, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "LDA-Direct_Indirect":          { opcode: "LDA", mode: "Direct_Indirect",          hex: 0xB2, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "LDA-Direct_IndirectLong":      { opcode: "LDA", mode: "Direct_IndirectLong",      hex: 0xA7, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "LDA-Direct_IndirectLong_Y":    { opcode: "LDA", mode: "Direct_IndirectLong_Y",    hex: 0xB7, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "LDA-Direct_Indirect_Y":        { opcode: "LDA", mode: "Direct_Indirect_Y",        hex: 0xB1, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "LDA-Direct_X":                 { opcode: "LDA", mode: "Direct_X",                 hex: 0xB5, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "LDA-Direct_X_Indirect":        { opcode: "LDA", mode: "Direct_X_Indirect",        hex: 0xA1, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "LDA-Immediate":                { opcode: "LDA", mode: "Immediate",                hex: 0xA9, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "LDA-StackRelative":            { opcode: "LDA", mode: "StackRelative",            hex: 0xA3, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "LDA-StackRelative_Indirect_Y": { opcode: "LDA", mode: "StackRelative_Indirect_Y", hex: 0xB3, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "LDX-Absolute":                 { opcode: "LDX", mode: "Absolute",                 hex: 0xAE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "LDX-Absolute_Y":               { opcode: "LDX", mode: "Absolute_Y",               hex: 0xBE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | P     },
  "LDX-Direct":                   { opcode: "LDX", mode: "Direct",                   hex: 0xA6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "LDX-Direct_Y":                 { opcode: "LDX", mode: "Direct_Y",                 hex: 0xB6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "LDX-Immediate":                { opcode: "LDX", mode: "Immediate",                hex: 0xA2, flags: "N-----Z-", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "LDY-Absolute":                 { opcode: "LDY", mode: "Absolute",                 hex: 0xAC, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "LDY-Absolute_X":               { opcode: "LDY", mode: "Absolute_X",               hex: 0xBC, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | P     },
  "LDY-Direct":                   { opcode: "LDY", mode: "Direct",                   hex: 0xA4, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "LDY-Direct_X":                 { opcode: "LDY", mode: "Direct_X",                 hex: 0xB4, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "LDY-Immediate":                { opcode: "LDY", mode: "Immediate",                hex: 0xA0, flags: "N-----Z-", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "LSR-Absolute":                 { opcode: "LSR", mode: "Absolute",                 hex: 0x4E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "LSR-Absolute_X":               { opcode: "LSR", mode: "Absolute_X",               hex: 0x5E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "LSR-Accumulator":              { opcode: "LSR", mode: "Accumulator",              hex: 0x4A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "LSR-Direct":                   { opcode: "LSR", mode: "Direct",                   hex: 0x46, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "LSR-Direct_X":                 { opcode: "LSR", mode: "Direct_X",                 hex: 0x56, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "MVN-BlockMove":                { opcode: "MVN", mode: "BlockMove",                hex: 0x54, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 0, cyclesModifiers: V         },
  "MVP-BlockMove":                { opcode: "MVP", mode: "BlockMove",                hex: 0x44, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 0, cyclesModifiers: V         },
  "NOP-Implied":                  { opcode: "NOP", mode: "Implied",                  hex: 0xEA, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ORA-Absolute":                 { opcode: "ORA", mode: "Absolute",                 hex: 0x0D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ORA-AbsoluteLong":             { opcode: "ORA", mode: "AbsoluteLong",             hex: 0x0F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ORA-AbsoluteLong_X":           { opcode: "ORA", mode: "AbsoluteLong_X",           hex: 0x1F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ORA-Absolute_X":               { opcode: "ORA", mode: "Absolute_X",               hex: 0x1D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ORA-Absolute_Y":               { opcode: "ORA", mode: "Absolute_Y",               hex: 0x19, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ORA-Direct":                   { opcode: "ORA", mode: "Direct",                   hex: 0x05, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "ORA-Direct_Indirect":          { opcode: "ORA", mode: "Direct_Indirect",          hex: 0x12, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "ORA-Direct_IndirectLong":      { opcode: "ORA", mode: "Direct_IndirectLong",      hex: 0x07, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ORA-Direct_IndirectLong_Y":    { opcode: "ORA", mode: "Direct_IndirectLong_Y",    hex: 0x17, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ORA-Direct_Indirect_Y":        { opcode: "ORA", mode: "Direct_Indirect_Y",        hex: 0x11, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "ORA-Direct_X":                 { opcode: "ORA", mode: "Direct_X",                 hex: 0x15, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "ORA-Direct_X_Indirect":        { opcode: "ORA", mode: "Direct_X_Indirect",        hex: 0x01, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ORA-Immediate":                { opcode: "ORA", mode: "Immediate",                hex: 0x09, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "ORA-StackRelative":            { opcode: "ORA", mode: "StackRelative",            hex: 0x03, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ORA-StackRelative_Indirect_Y": { opcode: "ORA", mode: "StackRelative_Indirect_Y", hex: 0x13, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "PEA-Absolute":                 { opcode: "PEA", mode: "Absolute",                 hex: 0xF4, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: 0         },
  "PEI-Direct_Indirect":          { opcode: "PEI", mode: "Direct_Indirect",          hex: 0xD4, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D         },
  "PER-Absolute":                 { opcode: "PER", mode: "Absolute",                 hex: 0x62, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "PHA-Implied":                  { opcode: "PHA", mode: "Implied",                  hex: 0x48, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: M         },
  "PHB-Implied":                  { opcode: "PHB", mode: "Implied",                  hex: 0x8B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "PHD-Implied":                  { opcode: "PHD", mode: "Implied",                  hex: 0x0B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "PHK-Implied":                  { opcode: "PHK", mode: "Implied",                  hex: 0x4B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "PHP-Implied":                  { opcode: "PHP", mode: "Implied",                  hex: 0x08, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "PHX-Implied":                  { opcode: "PHX", mode: "Implied",                  hex: 0xDA, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: X         },
  "PHY-Implied":                  { opcode: "PHY", mode: "Implied",                  hex: 0x5A, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: X         },
  "PLA-Implied":                  { opcode: "PLA", mode: "Implied",                  hex: 0x68, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "PLB-Implied":                  { opcode: "PLB", mode: "Implied",                  hex: 0xAB, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "PLD-Implied":                  { opcode: "PLD", mode: "Implied",                  hex: 0x2B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 5, cyclesModifiers: 0         },
  "PLP-Implied":                  { opcode: "PLP", mode: "Implied",                  hex: 0x28, flags: "NVMXDIZC", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "PLX-Implied":                  { opcode: "PLX", mode: "Implied",                  hex: 0xFA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "PLY-Implied":                  { opcode: "PLY", mode: "Implied",                  hex: 0x7A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "REP-Immediate":                { opcode: "REP", mode: "Immediate",                hex: 0xC2, flags: "NVMXDIZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "ROL-Absolute":                 { opcode: "ROL", mode: "Absolute",                 hex: 0x2E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "ROL-Absolute_X":               { opcode: "ROL", mode: "Absolute_X",               hex: 0x3E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "ROL-Accumulator":              { opcode: "ROL", mode: "Accumulator",              hex: 0x2A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ROL-Direct":                   { opcode: "ROL", mode: "Direct",                   hex: 0x26, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "ROL-Direct_X":                 { opcode: "ROL", mode: "Direct_X",                 hex: 0x36, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "ROR-Absolute":                 { opcode: "ROR", mode: "Absolute",                 hex: 0x6E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "ROR-Absolute_X":               { opcode: "ROR", mode: "Absolute_X",               hex: 0x7E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "ROR-Accumulator":              { opcode: "ROR", mode: "Accumulator",              hex: 0x6A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ROR-Direct":                   { opcode: "ROR", mode: "Direct",                   hex: 0x66, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "ROR-Direct_X":                 { opcode: "ROR", mode: "Direct_X",                 hex: 0x76, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "RTI-Implied":                  { opcode: "RTI", mode: "Implied",                  hex: 0x40, flags: "NVMXDIZC", bytes: 1, bytesModifiers: 0, cycles: 6, cyclesModifiers: E         },
  "RTL-Implied":                  { opcode: "RTL", mode: "Implied",                  hex: 0x6B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "RTS-Implied":                  { opcode: "RTS", mode: "Implied",                  hex: 0x60, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "SBC-Absolute":                 { opcode: "SBC", mode: "Absolute",                 hex: 0xED, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "SBC-AbsoluteLong":             { opcode: "SBC", mode: "AbsoluteLong",             hex: 0xEF, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "SBC-AbsoluteLong_X":           { opcode: "SBC", mode: "AbsoluteLong_X",           hex: 0xFF, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "SBC-Absolute_X":               { opcode: "SBC", mode: "Absolute_X",               hex: 0xFD, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "SBC-Absolute_Y":               { opcode: "SBC", mode: "Absolute_Y",               hex: 0xF9, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "SBC-Direct":                   { opcode: "SBC", mode: "Direct",                   hex: 0xE5, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "SBC-Direct_Indirect":          { opcode: "SBC", mode: "Direct_Indirect",          hex: 0xF2, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "SBC-Direct_IndirectLong":      { opcode: "SBC", mode: "Direct_IndirectLong",      hex: 0xE7, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "SBC-Direct_IndirectLong_Y":    { opcode: "SBC", mode: "Direct_IndirectLong_Y",    hex: 0xF7, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "SBC-Direct_Indirect_Y":        { opcode: "SBC", mode: "Direct_Indirect_Y",        hex: 0xF1, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "SBC-Direct_X":                 { opcode: "SBC", mode: "Direct_X",                 hex: 0xF5, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "SBC-Direct_X_Indirect":        { opcode: "SBC", mode: "Direct_X_Indirect",        hex: 0xE1, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "SBC-Immediate":                { opcode: "SBC", mode: "Immediate",                hex: 0xE9, flags: "NV----ZC", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "SBC-StackRelative":            { opcode: "SBC", mode: "StackRelative",            hex: 0xE3, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "SBC-StackRelative_Indirect_Y": { opcode: "SBC", mode: "StackRelative_Indirect_Y", hex: 0xF3, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "SEC-Implied":                  { opcode: "SEC", mode: "Implied",                  hex: 0x38, flags: "-------C", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "SED-Implied":                  { opcode: "SED", mode: "Implied",                  hex: 0xF8, flags: "----D---", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "SEI-Implied":                  { opcode: "SEI", mode: "Implied",                  hex: 0x78, flags: "-----I--", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "SEP-Immediate":                { opcode: "SEP", mode: "Immediate",                hex: 0xE2, flags: "NVMXDIZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "STA-Absolute":                 { opcode: "STA", mode: "Absolute",                 hex: 0x8D, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "STA-AbsoluteLong":             { opcode: "STA", mode: "AbsoluteLong",             hex: 0x8F, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-AbsoluteLong_X":           { opcode: "STA", mode: "AbsoluteLong_X",           hex: 0x9F, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Absolute_X":               { opcode: "STA", mode: "Absolute_X",               hex: 0x9D, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Absolute_Y":               { opcode: "STA", mode: "Absolute_Y",               hex: 0x99, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Direct":                   { opcode: "STA", mode: "Direct",                   hex: 0x85, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "STA-Direct_Indirect":          { opcode: "STA", mode: "Direct_Indirect",          hex: 0x92, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "STA-Direct_IndirectLong":      { opcode: "STA", mode: "Direct_IndirectLong",      hex: 0x87, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-Direct_IndirectLong_Y":    { opcode: "STA", mode: "Direct_IndirectLong_Y",    hex: 0x97, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-Direct_Indirect_Y":        { opcode: "STA", mode: "Direct_Indirect_Y",        hex: 0x91, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-Direct_X":                 { opcode: "STA", mode: "Direct_X",                 hex: 0x95, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "STA-Direct_X_Indirect":        { opcode: "STA", mode: "Direct_X_Indirect",        hex: 0x81, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-StackRelative":            { opcode: "STA", mode: "StackRelative",            hex: 0x83, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "STA-StackRelative_Indirect_Y": { opcode: "STA", mode: "StackRelative_Indirect_Y", hex: 0x93, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "STP-Implied":                  { opcode: "STP", mode: "Implied",                  hex: 0xDB, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: A         },
  "STX-Absolute":                 { opcode: "STX", mode: "Absolute",                 hex: 0x8E, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "STX-Direct":                   { opcode: "STX", mode: "Direct",                   hex: 0x86, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "STX-Direct_Y":                 { opcode: "STX", mode: "Direct_Y",                 hex: 0x96, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "STY-Absolute":                 { opcode: "STY", mode: "Absolute",                 hex: 0x8C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "STY-Direct":                   { opcode: "STY", mode: "Direct",                   hex: 0x84, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "STY-Direct_X":                 { opcode: "STY", mode: "Direct_X",                 hex: 0x94, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "STZ-Absolute":                 { opcode: "STZ", mode: "Absolute",                 hex: 0x9C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "STZ-Absolute_X":               { opcode: "STZ", mode: "Absolute_X",               hex: 0x9E, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STZ-Direct":                   { opcode: "STZ", mode: "Direct",                   hex: 0x64, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "STZ-Direct_X":                 { opcode: "STZ", mode: "Direct_X",                 hex: 0x74, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "TAX-Implied":                  { opcode: "TAX", mode: "Implied",                  hex: 0xAA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TAY-Implied":                  { opcode: "TAY", mode: "Implied",                  hex: 0xA8, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TCD-Implied":                  { opcode: "TCD", mode: "Implied",                  hex: 0x5B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TCS-Implied":                  { opcode: "TCS", mode: "Implied",                  hex: 0x1B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TDC-Implied":                  { opcode: "TDC", mode: "Implied",                  hex: 0x7B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TRB-Absolute":                 { opcode: "TRB", mode: "Absolute",                 hex: 0x1C, flags: "------Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "TRB-Direct":                   { opcode: "TRB", mode: "Direct",                   hex: 0x14, flags: "------Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "TSB-Absolute":                 { opcode: "TSB", mode: "Absolute",                 hex: 0x0C, flags: "------Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "TSB-Direct":                   { opcode: "TSB", mode: "Direct",                   hex: 0x04, flags: "------Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "TSC-Implied":                  { opcode: "TSC", mode: "Implied",                  hex: 0x3B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TSX-Implied":                  { opcode: "TSX", mode: "Implied",                  hex: 0xBA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TXA-Implied":                  { opcode: "TXA", mode: "Implied",                  hex: 0x8A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TXS-Implied":                  { opcode: "TXS", mode: "Implied",                  hex: 0x9A, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TXY-Implied":                  { opcode: "TXY", mode: "Implied",                  hex: 0x9B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TYA-Implied":                  { opcode: "TYA", mode: "Implied",                  hex: 0x98, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TYX-Implied":                  { opcode: "TYX", mode: "Implied",                  hex: 0xBB, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "WAI-Implied":                  { opcode: "WAI", mode: "Implied",                  hex: 0xCB, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: A         },
  "WDM-Implied":                  { opcode: "WDM", mode: "Implied",                  hex: 0x42, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "XBA-Implied":                  { opcode: "XBA", mode: "Implied",                  hex: 0xEB, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "XCE-Implied":                  { opcode: "XCE", mode: "Implied",                  hex: 0xFB, flags: "--MX---C", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
 } as const satisfies Record<Id, Meta>;

export const Asm65816InstructionMetaById = MetaById;

//==============================================================================
// Instruction Hex
//==============================================================================

type Hex = (typeof MetaById)[keyof typeof MetaById]["hex"];

export type Asm65816InstructionHex = Hex;

const IdByHex = {
  0x00: "BRK-Immediate",
  0x01: "ORA-Direct_X_Indirect",
  0x02: "COP-Immediate",
  0x03: "ORA-StackRelative",
  0x04: "TSB-Direct",
  0x05: "ORA-Direct",
  0x06: "ASL-Direct",
  0x07: "ORA-Direct_IndirectLong",
  0x08: "PHP-Implied",
  0x09: "ORA-Immediate",
  0x0a: "ASL-Accumulator",
  0x0b: "PHD-Implied",
  0x0c: "TSB-Absolute",
  0x0d: "ORA-Absolute",
  0x0e: "ASL-Absolute",
  0x0f: "ORA-AbsoluteLong",
  0x10: "BPL-Direct",
  0x11: "ORA-Direct_Indirect_Y",
  0x12: "ORA-Direct_Indirect",
  0x13: "ORA-StackRelative_Indirect_Y",
  0x14: "TRB-Direct",
  0x15: "ORA-Direct_X",
  0x16: "ASL-Direct_X",
  0x17: "ORA-Direct_IndirectLong_Y",
  0x18: "CLC-Implied",
  0x19: "ORA-Absolute_Y",
  0x1a: "INC-Accumulator",
  0x1b: "TCS-Implied",
  0x1c: "TRB-Absolute",
  0x1d: "ORA-Absolute_X",
  0x1e: "ASL-Absolute_X",
  0x1f: "ORA-AbsoluteLong_X",
  0x20: "JSR-Absolute",
  0x21: "AND-Direct_X_Indirect",
  0x22: "JSL-AbsoluteLong",
  0x23: "AND-StackRelative",
  0x24: "BIT-Direct",
  0x25: "AND-Direct",
  0x26: "ROL-Direct",
  0x27: "AND-Direct_IndirectLong",
  0x28: "PLP-Implied",
  0x29: "AND-Immediate",
  0x2a: "ROL-Accumulator",
  0x2b: "PLD-Implied",
  0x2c: "BIT-Absolute",
  0x2d: "AND-Absolute",
  0x2e: "ROL-Absolute",
  0x2f: "AND-AbsoluteLong",
  0x30: "BMI-Direct",
  0x31: "AND-Direct_Indirect_Y",
  0x32: "AND-Direct_Indirect",
  0x33: "AND-StackRelative_Indirect_Y",
  0x34: "BIT-Direct_X",
  0x35: "AND-Direct_X",
  0x36: "ROL-Direct_X",
  0x37: "AND-Direct_IndirectLong_Y",
  0x38: "SEC-Implied",
  0x39: "AND-Absolute_Y",
  0x3a: "DEC-Accumulator",
  0x3b: "TSC-Implied",
  0x3c: "BIT-Absolute_X",
  0x3d: "AND-Absolute_X",
  0x3e: "ROL-Absolute_X",
  0x3f: "AND-AbsoluteLong_X",
  0x40: "RTI-Implied",
  0x41: "EOR-Direct_X_Indirect",
  0x42: "WDM-Implied",
  0x43: "EOR-StackRelative",
  0x44: "MVP-BlockMove",
  0x45: "EOR-Direct",
  0x46: "LSR-Direct",
  0x47: "EOR-Direct_IndirectLong",
  0x48: "PHA-Implied",
  0x49: "EOR-Immediate",
  0x4a: "LSR-Accumulator",
  0x4b: "PHK-Implied",
  0x4c: "JMP-Absolute",
  0x4d: "EOR-Absolute",
  0x4e: "LSR-Absolute",
  0x4f: "EOR-AbsoluteLong",
  0x50: "BVC-Direct",
  0x51: "EOR-Direct_Indirect_Y",
  0x52: "EOR-Direct_Indirect",
  0x53: "EOR-StackRelative_Indirect_Y",
  0x54: "MVN-BlockMove",
  0x55: "EOR-Direct_X",
  0x56: "LSR-Direct_X",
  0x57: "EOR-Direct_IndirectLong_Y",
  0x58: "CLI-Implied",
  0x59: "EOR-Absolute_Y",
  0x5a: "PHY-Implied",
  0x5b: "TCD-Implied",
  0x5c: "JML-AbsoluteLong",
  0x5d: "EOR-Absolute_X",
  0x5e: "LSR-Absolute_X",
  0x5f: "EOR-AbsoluteLong_X",
  0x60: "RTS-Implied",
  0x61: "ADC-Direct_X_Indirect",
  0x62: "PER-Absolute",
  0x63: "ADC-StackRelative",
  0x64: "STZ-Direct",
  0x65: "ADC-Direct",
  0x66: "ROR-Direct",
  0x67: "ADC-Direct_IndirectLong",
  0x68: "PLA-Implied",
  0x69: "ADC-Immediate",
  0x6a: "ROR-Accumulator",
  0x6b: "RTL-Implied",
  0x6c: "JMP-Absolute_Indirect",
  0x6d: "ADC-Absolute",
  0x6e: "ROR-Absolute",
  0x6f: "ADC-AbsoluteLong",
  0x70: "BVS-Direct",
  0x71: "ADC-Direct_Indirect_Y",
  0x72: "ADC-Direct_Indirect",
  0x73: "ADC-StackRelative_Indirect_Y",
  0x74: "STZ-Direct_X",
  0x75: "ADC-Direct_X",
  0x76: "ROR-Direct_X",
  0x77: "ADC-Direct_IndirectLong_Y",
  0x78: "SEI-Implied",
  0x79: "ADC-Absolute_Y",
  0x7a: "PLY-Implied",
  0x7b: "TDC-Implied",
  0x7c: "JMP-Absolute_X_Indirect",
  0x7d: "ADC-Absolute_X",
  0x7e: "ROR-Absolute_X",
  0x7f: "ADC-AbsoluteLong_X",
  0x80: "BRA-Direct",
  0x81: "STA-Direct_X_Indirect",
  0x82: "BRL-Absolute",
  0x83: "STA-StackRelative",
  0x84: "STY-Direct",
  0x85: "STA-Direct",
  0x86: "STX-Direct",
  0x87: "STA-Direct_IndirectLong",
  0x88: "DEY-Implied",
  0x89: "BIT-Immediate",
  0x8a: "TXA-Implied",
  0x8b: "PHB-Implied",
  0x8c: "STY-Absolute",
  0x8d: "STA-Absolute",
  0x8e: "STX-Absolute",
  0x8f: "STA-AbsoluteLong",
  0x90: "BCC-Direct",
  0x91: "STA-Direct_Indirect_Y",
  0x92: "STA-Direct_Indirect",
  0x93: "STA-StackRelative_Indirect_Y",
  0x94: "STY-Direct_X",
  0x95: "STA-Direct_X",
  0x96: "STX-Direct_Y",
  0x97: "STA-Direct_IndirectLong_Y",
  0x98: "TYA-Implied",
  0x99: "STA-Absolute_Y",
  0x9a: "TXS-Implied",
  0x9b: "TXY-Implied",
  0x9c: "STZ-Absolute",
  0x9d: "STA-Absolute_X",
  0x9e: "STZ-Absolute_X",
  0x9f: "STA-AbsoluteLong_X",
  0xa0: "LDY-Immediate",
  0xa1: "LDA-Direct_X_Indirect",
  0xa2: "LDX-Immediate",
  0xa3: "LDA-StackRelative",
  0xa4: "LDY-Direct",
  0xa5: "LDA-Direct",
  0xa6: "LDX-Direct",
  0xa7: "LDA-Direct_IndirectLong",
  0xa8: "TAY-Implied",
  0xa9: "LDA-Immediate",
  0xaa: "TAX-Implied",
  0xab: "PLB-Implied",
  0xac: "LDY-Absolute",
  0xad: "LDA-Absolute",
  0xae: "LDX-Absolute",
  0xaf: "LDA-AbsoluteLong",
  0xb0: "BCS-Direct",
  0xb1: "LDA-Direct_Indirect_Y",
  0xb2: "LDA-Direct_Indirect",
  0xb3: "LDA-StackRelative_Indirect_Y",
  0xb4: "LDY-Direct_X",
  0xb5: "LDA-Direct_X",
  0xb6: "LDX-Direct_Y",
  0xb7: "LDA-Direct_IndirectLong_Y",
  0xb8: "CLV-Implied",
  0xb9: "LDA-Absolute_Y",
  0xba: "TSX-Implied",
  0xbb: "TYX-Implied",
  0xbc: "LDY-Absolute_X",
  0xbd: "LDA-Absolute_X",
  0xbe: "LDX-Absolute_Y",
  0xbf: "LDA-AbsoluteLong_X",
  0xc0: "CPY-Immediate",
  0xc1: "CMP-Direct_X_Indirect",
  0xc2: "REP-Immediate",
  0xc3: "CMP-StackRelative",
  0xc4: "CPY-Direct",
  0xc5: "CMP-Direct",
  0xc6: "DEC-Direct",
  0xc7: "CMP-Direct_IndirectLong",
  0xc8: "INY-Implied",
  0xc9: "CMP-Immediate",
  0xca: "DEX-Implied",
  0xcb: "WAI-Implied",
  0xcc: "CPY-Absolute",
  0xcd: "CMP-Absolute",
  0xce: "DEC-Absolute",
  0xcf: "CMP-AbsoluteLong",
  0xd0: "BNE-Direct",
  0xd1: "CMP-Direct_Indirect_Y",
  0xd2: "CMP-Direct_Indirect",
  0xd3: "CMP-StackRelative_Indirect_Y",
  0xd4: "PEI-Direct_Indirect",
  0xd5: "CMP-Direct_X",
  0xd6: "DEC-Direct_X",
  0xd7: "CMP-Direct_IndirectLong_Y",
  0xd8: "CLD-Implied",
  0xd9: "CMP-Absolute_Y",
  0xda: "PHX-Implied",
  0xdb: "STP-Implied",
  0xdc: "JML-Absolute_IndirectLong",
  0xdd: "CMP-Absolute_X",
  0xde: "DEC-Absolute_X",
  0xdf: "CMP-AbsoluteLong_X",
  0xe0: "CPX-Immediate",
  0xe1: "SBC-Direct_X_Indirect",
  0xe2: "SEP-Immediate",
  0xe3: "SBC-StackRelative",
  0xe4: "CPX-Direct",
  0xe5: "SBC-Direct",
  0xe6: "INC-Direct",
  0xe7: "SBC-Direct_IndirectLong",
  0xe8: "INX-Implied",
  0xe9: "SBC-Immediate",
  0xea: "NOP-Implied",
  0xeb: "XBA-Implied",
  0xec: "CPX-Absolute",
  0xed: "SBC-Absolute",
  0xee: "INC-Absolute",
  0xef: "SBC-AbsoluteLong",
  0xf0: "BEQ-Direct",
  0xf1: "SBC-Direct_Indirect_Y",
  0xf2: "SBC-Direct_Indirect",
  0xf3: "SBC-StackRelative_Indirect_Y",
  0xf4: "PEA-Absolute",
  0xf5: "SBC-Direct_X",
  0xf6: "INC-Direct_X",
  0xf7: "SBC-Direct_IndirectLong_Y",
  0xf8: "SED-Implied",
  0xf9: "SBC-Absolute_Y",
  0xfa: "PLX-Implied",
  0xfb: "XCE-Implied",
  0xfc: "JSR-Absolute_X_Indirect",
  0xfd: "SBC-Absolute_X",
  0xfe: "INC-Absolute_X",
  0xff: "SBC-AbsoluteLong_X",
} as const satisfies Record<Hex, Id>;

export const Asm65816InstructionIdByHex = IdByHex;

//==============================================================================
// Instruction
//==============================================================================

const InstructionSchema = z
  .intersection(TypeSchema, z.object({ args: z.any(), line: z.number() }))
  .transform((instruction, ctx) => {
    const code = z.ZodIssueCode.custom;

    const issueMismatch = (expectedArgsType: ArgsType) => {
      const args = JSON.stringify(instruction.args);
      ctx.addIssue({
        code,
        message: `Mismatching args: expected "${expectedArgsType}" but received "${args}"`,
      });
      return z.NEVER;
    };

    const issueInvalid = (arg: string) => {
      ctx.addIssue({
        code,
        message: `Invalid args: "${arg}" is not a valid value`,
      });
      return z.NEVER;
    };

    const arg = { value: -1, l: -1, h: -1, b: -1 };

    const modeMeta = ModeMetaByMode[instruction.mode];
    switch (modeMeta.argsType) {
      case ArgsType.None: {
        const args = ArgsNoneSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.None);
        break;
      }
      case ArgsType.Byte: {
        const args = ArgsByteSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Byte);
        const byteContext = { unit: IntegerUnit.Byte };
        const integer = IntegerFromString(args.data[0].value, byteContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg.l = integer.value & 0x00ff;
        arg.value = arg.l;
        break;
      }
      case ArgsType.Word: {
        const args = ArgsWordSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Word);
        const wordContext = { unit: IntegerUnit.Word };
        const integer = IntegerFromString(args.data[0].value, wordContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg.l = integer.value & 0x0000ff;
        arg.h = (integer.value & 0x00ff00) >> 8;
        arg.value = integer.value & 0x00ffff;
        break;
      }
      case ArgsType.Long: {
        const args = ArgsLongSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Long);
        const longContext = { unit: IntegerUnit.Long };
        const integer = IntegerFromString(args.data[0].value, longContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg.l = integer.value & 0x0000ff;
        arg.h = (integer.value & 0x00ff00) >> 8;
        arg.b = (integer.value & 0xff0000) >> 16;
        arg.value = integer.value & 0xffffff;
        break;
      }
      case ArgsType.Move: {
        const args = ArgsMoveSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Move);
        const byteContext = { unit: IntegerUnit.Byte };
        const integer1 = IntegerFromString(args.data[0].value, byteContext);
        const integer2 = IntegerFromString(args.data[1].value, byteContext);
        if (!integer1) return issueInvalid(args.data[0].value);
        if (!integer2) return issueInvalid(args.data[1].value);
        arg.l = integer1.value & 0x0000ff;
        arg.h = integer2.value & 0x0000ff;
        arg.value = (arg.h << 8) | arg.l;
        break;
      }
      case ArgsType.ByteOrWord: {
        const meta = MetaById[instruction.id];
        if (meta.bytesModifiers & M || meta.bytesModifiers & X) {
          const args = ArgsByteOrWordSchema.safeParse(instruction.args);
          if (!args.success) return issueMismatch(ArgsType.ByteOrWord);
          if (args.data[0].unit === "Byte") {
            const context = { unit: IntegerUnit.Byte };
            const integer = IntegerFromString(args.data[0].value, context);
            if (!integer) return issueInvalid(args.data[0].value);
            arg.l = integer.value & 0x0000ff;
            arg.value = arg.l;
          } else {
            const context = { unit: IntegerUnit.Word };
            const integer = IntegerFromString(args.data[0].value, context);
            if (!integer) return issueInvalid(args.data[0].value);
            arg.l = integer.value & 0x0000ff;
            arg.h = (integer.value & 0x00ff00) >> 8;
            arg.value = integer.value & 0x00ffff;
          }
        } else {
          const args = ArgsByteSchema.safeParse(instruction.args);
          if (!args.success) return issueMismatch(ArgsType.ByteOrWord);
          const byteContext = { unit: IntegerUnit.Byte };
          const integer = IntegerFromString(args.data[0].value, byteContext);
          if (!integer) return issueInvalid(args.data[0].value);
          arg.l = integer.value & 0x0000ff;
          arg.value = arg.l;
        }
        break;
      }
    }

    return { ...instruction, arg };
  });

type Instruction = z.infer<typeof InstructionSchema>;

export const Asm65816InstructionSchema = InstructionSchema;
export type Asm65816Instruction = Instruction;
