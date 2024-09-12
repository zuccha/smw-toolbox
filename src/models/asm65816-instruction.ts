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
  "Implied", "Accumulator", "Direct_Byte", "Direct_Byte_S", "Direct_Byte_X",
  "Direct_Byte_Y", "Direct_Long", "Direct_Long_X", "Direct_Word",
  "Direct_Word_X", "Direct_Word_Y", "Immediate_Byte", "Immediate_Word",
  "IndirectLong_Byte", "IndirectLong_Byte_Y", "IndirectLong_Word",
  "Indirect_Byte", "Indirect_Byte_SY", "Indirect_Byte_X", "Indirect_Byte_Y",
  "Indirect_Word", "Indirect_Word_X", "Move"
]);

type Mode = z.infer<typeof ModeSchema>;

export const Asm65816InstructionOpcodeMode = ModeSchema;
export type Asm65816InstructionMode = Mode;

//==============================================================================
// Instruction Id
//==============================================================================

// prettier-ignore
const TypeSchema = z.discriminatedUnion("id", [
  z.object({ id: z.literal("ADC-Direct_Byte"),         opcode: z.literal("ADC"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("ADC-Direct_Byte_S"),       opcode: z.literal("ADC"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("ADC-Direct_Byte_X"),       opcode: z.literal("ADC"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("ADC-Direct_Long"),         opcode: z.literal("ADC"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("ADC-Direct_Long_X"),       opcode: z.literal("ADC"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("ADC-Direct_Word"),         opcode: z.literal("ADC"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("ADC-Direct_Word_X"),       opcode: z.literal("ADC"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("ADC-Direct_Word_Y"),       opcode: z.literal("ADC"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("ADC-Immediate_Byte"),      opcode: z.literal("ADC"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("ADC-Immediate_Word"),      opcode: z.literal("ADC"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("ADC-Indirect_Byte"),       opcode: z.literal("ADC"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("ADC-Indirect_Byte_SY"),    opcode: z.literal("ADC"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("ADC-Indirect_Byte_X"),     opcode: z.literal("ADC"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("ADC-Indirect_Byte_Y"),     opcode: z.literal("ADC"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("ADC-IndirectLong_Byte"),   opcode: z.literal("ADC"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("ADC-IndirectLong_Byte_Y"), opcode: z.literal("ADC"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("AND-Direct_Byte"),         opcode: z.literal("AND"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("AND-Direct_Byte_S"),       opcode: z.literal("AND"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("AND-Direct_Byte_X"),       opcode: z.literal("AND"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("AND-Direct_Long"),         opcode: z.literal("AND"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("AND-Direct_Long_X"),       opcode: z.literal("AND"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("AND-Direct_Word"),         opcode: z.literal("AND"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("AND-Direct_Word_X"),       opcode: z.literal("AND"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("AND-Direct_Word_Y"),       opcode: z.literal("AND"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("AND-Immediate_Byte"),      opcode: z.literal("AND"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("AND-Immediate_Word"),      opcode: z.literal("AND"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("AND-Indirect_Byte"),       opcode: z.literal("AND"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("AND-Indirect_Byte_SY"),    opcode: z.literal("AND"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("AND-Indirect_Byte_X"),     opcode: z.literal("AND"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("AND-Indirect_Byte_Y"),     opcode: z.literal("AND"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("AND-IndirectLong_Byte"),   opcode: z.literal("AND"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("AND-IndirectLong_Byte_Y"), opcode: z.literal("AND"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("ASL-Accumulator"),         opcode: z.literal("ASL"), mode: z.literal("Accumulator")          }),
  z.object({ id: z.literal("ASL-Direct_Byte"),         opcode: z.literal("ASL"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("ASL-Direct_Byte_X"),       opcode: z.literal("ASL"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("ASL-Direct_Word"),         opcode: z.literal("ASL"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("ASL-Direct_Word_X"),       opcode: z.literal("ASL"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("BCC-Direct_Byte"),         opcode: z.literal("BCC"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BCS-Direct_Byte"),         opcode: z.literal("BCS"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BEQ-Direct_Byte"),         opcode: z.literal("BEQ"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BIT-Direct_Byte"),         opcode: z.literal("BIT"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BIT-Direct_Byte_X"),       opcode: z.literal("BIT"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("BIT-Direct_Word"),         opcode: z.literal("BIT"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("BIT-Direct_Word_X"),       opcode: z.literal("BIT"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("BIT-Immediate_Byte"),      opcode: z.literal("BIT"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("BIT-Immediate_Word"),      opcode: z.literal("BIT"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("BMI-Direct_Byte"),         opcode: z.literal("BMI"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BNE-Direct_Byte"),         opcode: z.literal("BNE"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BPL-Direct_Byte"),         opcode: z.literal("BPL"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BRA-Direct_Byte"),         opcode: z.literal("BRA"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BRK-Direct_Byte"),         opcode: z.literal("BRK"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BRL-Direct_Word"),         opcode: z.literal("BRL"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("BVC-Direct_Byte"),         opcode: z.literal("BVC"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BVS-Direct_Byte"),         opcode: z.literal("BVS"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("CLC-Implied"),             opcode: z.literal("CLC"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("CLD-Implied"),             opcode: z.literal("CLD"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("CLI-Implied"),             opcode: z.literal("CLI"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("CLV-Implied"),             opcode: z.literal("CLV"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("CMP-Direct_Byte"),         opcode: z.literal("CMP"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("CMP-Direct_Byte_S"),       opcode: z.literal("CMP"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("CMP-Direct_Byte_X"),       opcode: z.literal("CMP"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("CMP-Direct_Long"),         opcode: z.literal("CMP"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("CMP-Direct_Long_X"),       opcode: z.literal("CMP"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("CMP-Direct_Word"),         opcode: z.literal("CMP"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("CMP-Direct_Word_X"),       opcode: z.literal("CMP"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("CMP-Direct_Word_Y"),       opcode: z.literal("CMP"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("CMP-Immediate_Byte"),      opcode: z.literal("CMP"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("CMP-Immediate_Word"),      opcode: z.literal("CMP"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("CMP-Indirect_Byte"),       opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("CMP-Indirect_Byte_SY"),    opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("CMP-Indirect_Byte_X"),     opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("CMP-Indirect_Byte_Y"),     opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("CMP-IndirectLong_Byte"),   opcode: z.literal("CMP"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("CMP-IndirectLong_Byte_Y"), opcode: z.literal("CMP"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("COP-Immediate_Byte"),      opcode: z.literal("COP"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("CPX-Direct_Byte"),         opcode: z.literal("CPX"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("CPX-Direct_Word"),         opcode: z.literal("CPX"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("CPX-Immediate_Byte"),      opcode: z.literal("CPX"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("CPX-Immediate_Word"),      opcode: z.literal("CPX"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("CPY-Direct_Byte"),         opcode: z.literal("CPY"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("CPY-Direct_Word"),         opcode: z.literal("CPY"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("CPY-Immediate_Byte"),      opcode: z.literal("CPY"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("CPY-Immediate_Word"),      opcode: z.literal("CPY"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("DEC-Accumulator"),         opcode: z.literal("DEC"), mode: z.literal("Accumulator")          }),
  z.object({ id: z.literal("DEC-Direct_Byte"),         opcode: z.literal("DEC"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("DEC-Direct_Byte_X"),       opcode: z.literal("DEC"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("DEC-Direct_Word"),         opcode: z.literal("DEC"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("DEC-Direct_Word_X"),       opcode: z.literal("DEC"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("DEX-Implied"),             opcode: z.literal("DEX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("DEY-Implied"),             opcode: z.literal("DEY"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("EOR-Direct_Byte"),         opcode: z.literal("EOR"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("EOR-Direct_Byte_S"),       opcode: z.literal("EOR"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("EOR-Direct_Byte_X"),       opcode: z.literal("EOR"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("EOR-Direct_Long"),         opcode: z.literal("EOR"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("EOR-Direct_Long_X"),       opcode: z.literal("EOR"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("EOR-Direct_Word"),         opcode: z.literal("EOR"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("EOR-Direct_Word_X"),       opcode: z.literal("EOR"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("EOR-Direct_Word_Y"),       opcode: z.literal("EOR"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("EOR-Immediate_Byte"),      opcode: z.literal("EOR"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("EOR-Immediate_Word"),      opcode: z.literal("EOR"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("EOR-Indirect_Byte"),       opcode: z.literal("EOR"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("EOR-Indirect_Byte_SY"),    opcode: z.literal("EOR"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("EOR-Indirect_Byte_X"),     opcode: z.literal("EOR"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("EOR-Indirect_Byte_Y"),     opcode: z.literal("EOR"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("EOR-IndirectLong_Byte"),   opcode: z.literal("EOR"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("EOR-IndirectLong_Byte_Y"), opcode: z.literal("EOR"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("INC-Accumulator"),         opcode: z.literal("INC"), mode: z.literal("Accumulator")          }),
  z.object({ id: z.literal("INC-Direct_Byte"),         opcode: z.literal("INC"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("INC-Direct_Byte_X"),       opcode: z.literal("INC"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("INC-Direct_Word"),         opcode: z.literal("INC"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("INC-Direct_Word_X"),       opcode: z.literal("INC"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("INX-Implied"),             opcode: z.literal("INX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("INY-Implied"),             opcode: z.literal("INY"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("JML-Direct_Long"),         opcode: z.literal("JML"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("JML-IndirectLong_Word"),   opcode: z.literal("JML"), mode: z.literal("IndirectLong_Word")    }),
  z.object({ id: z.literal("JMP-Direct_Long"),         opcode: z.literal("JMP"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("JMP-Direct_Word"),         opcode: z.literal("JMP"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("JMP-Indirect_Word"),       opcode: z.literal("JMP"), mode: z.literal("Indirect_Word")        }),
  z.object({ id: z.literal("JMP-Indirect_Word_X"),     opcode: z.literal("JMP"), mode: z.literal("Indirect_Word_X")      }),
  z.object({ id: z.literal("JMP-IndirectLong_Word"),   opcode: z.literal("JMP"), mode: z.literal("IndirectLong_Word")    }),
  z.object({ id: z.literal("JSL-Implied"),             opcode: z.literal("JSL"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("JSR-Direct_Long"),         opcode: z.literal("JSR"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("JSR-Direct_Word"),         opcode: z.literal("JSR"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("JSR-Indirect_Word_X"),     opcode: z.literal("JSR"), mode: z.literal("Indirect_Word_X")      }),
  z.object({ id: z.literal("LDA-Direct_Byte"),         opcode: z.literal("LDA"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("LDA-Direct_Byte_S"),       opcode: z.literal("LDA"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("LDA-Direct_Byte_X"),       opcode: z.literal("LDA"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("LDA-Direct_Long"),         opcode: z.literal("LDA"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("LDA-Direct_Long_X"),       opcode: z.literal("LDA"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("LDA-Direct_Word"),         opcode: z.literal("LDA"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("LDA-Direct_Word_X"),       opcode: z.literal("LDA"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("LDA-Direct_Word_Y"),       opcode: z.literal("LDA"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("LDA-Immediate_Byte"),      opcode: z.literal("LDA"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("LDA-Immediate_Word"),      opcode: z.literal("LDA"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("LDA-Indirect_Byte"),       opcode: z.literal("LDA"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("LDA-Indirect_Byte_SY"),    opcode: z.literal("LDA"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("LDA-Indirect_Byte_X"),     opcode: z.literal("LDA"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("LDA-Indirect_Byte_Y"),     opcode: z.literal("LDA"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("LDA-IndirectLong_Byte"),   opcode: z.literal("LDA"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("LDA-IndirectLong_Byte_Y"), opcode: z.literal("LDA"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("LDX-Direct_Byte"),         opcode: z.literal("LDX"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("LDX-Direct_Byte_Y"),       opcode: z.literal("LDX"), mode: z.literal("Direct_Byte_Y")        }),
  z.object({ id: z.literal("LDX-Direct_Word"),         opcode: z.literal("LDX"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("LDX-Direct_Word_Y"),       opcode: z.literal("LDX"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("LDX-Immediate_Byte"),      opcode: z.literal("LDX"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("LDX-Immediate_Word"),      opcode: z.literal("LDX"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("LDY-Direct_Byte"),         opcode: z.literal("LDY"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("LDY-Direct_Byte_X"),       opcode: z.literal("LDY"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("LDY-Direct_Word"),         opcode: z.literal("LDY"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("LDY-Direct_Word_X"),       opcode: z.literal("LDY"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("LDY-Immediate_Byte"),      opcode: z.literal("LDY"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("LDY-Immediate_Word"),      opcode: z.literal("LDY"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("LSR-Accumulator"),         opcode: z.literal("LSR"), mode: z.literal("Accumulator")          }),
  z.object({ id: z.literal("LSR-Direct_Byte"),         opcode: z.literal("LSR"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("LSR-Direct_Byte_X"),       opcode: z.literal("LSR"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("LSR-Direct_Word"),         opcode: z.literal("LSR"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("LSR-Direct_Word_X"),       opcode: z.literal("LSR"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("MVN-Move"),                opcode: z.literal("MVN"), mode: z.literal("Move")                 }),
  z.object({ id: z.literal("MVP-Move"),                opcode: z.literal("MVP"), mode: z.literal("Move")                 }),
  z.object({ id: z.literal("NOP-Implied"),             opcode: z.literal("NOP"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("ORA-Direct_Byte"),         opcode: z.literal("ORA"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("ORA-Direct_Byte_S"),       opcode: z.literal("ORA"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("ORA-Direct_Byte_X"),       opcode: z.literal("ORA"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("ORA-Direct_Long"),         opcode: z.literal("ORA"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("ORA-Direct_Long_X"),       opcode: z.literal("ORA"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("ORA-Direct_Word"),         opcode: z.literal("ORA"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("ORA-Direct_Word_X"),       opcode: z.literal("ORA"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("ORA-Direct_Word_Y"),       opcode: z.literal("ORA"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("ORA-Immediate_Byte"),      opcode: z.literal("ORA"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("ORA-Immediate_Word"),      opcode: z.literal("ORA"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("ORA-Indirect_Byte"),       opcode: z.literal("ORA"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("ORA-Indirect_Byte_SY"),    opcode: z.literal("ORA"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("ORA-Indirect_Byte_X"),     opcode: z.literal("ORA"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("ORA-Indirect_Byte_Y"),     opcode: z.literal("ORA"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("ORA-IndirectLong_Byte"),   opcode: z.literal("ORA"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("ORA-IndirectLong_Byte_Y"), opcode: z.literal("ORA"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("PEA-Direct_Word"),         opcode: z.literal("PEA"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("PEI-Indirect_Byte"),       opcode: z.literal("PEI"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("PER-Direct_Word"),         opcode: z.literal("PER"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("PHA-Implied"),             opcode: z.literal("PHA"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PHB-Implied"),             opcode: z.literal("PHB"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PHD-Implied"),             opcode: z.literal("PHD"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PHK-Implied"),             opcode: z.literal("PHK"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PHP-Implied"),             opcode: z.literal("PHP"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PHX-Implied"),             opcode: z.literal("PHX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PHY-Implied"),             opcode: z.literal("PHY"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PLA-Implied"),             opcode: z.literal("PLA"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PLB-Implied"),             opcode: z.literal("PLB"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PLD-Implied"),             opcode: z.literal("PLD"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PLP-Implied"),             opcode: z.literal("PLP"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PLX-Implied"),             opcode: z.literal("PLX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("PLY-Implied"),             opcode: z.literal("PLY"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("REP-Immediate_Byte"),      opcode: z.literal("REP"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("ROL-Accumulator"),         opcode: z.literal("ROL"), mode: z.literal("Accumulator")          }),
  z.object({ id: z.literal("ROL-Direct_Byte"),         opcode: z.literal("ROL"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("ROL-Direct_Byte_X"),       opcode: z.literal("ROL"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("ROL-Direct_Word"),         opcode: z.literal("ROL"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("ROL-Direct_Word_X"),       opcode: z.literal("ROL"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("ROR-Accumulator"),         opcode: z.literal("ROR"), mode: z.literal("Accumulator")          }),
  z.object({ id: z.literal("ROR-Direct_Byte"),         opcode: z.literal("ROR"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("ROR-Direct_Byte_X"),       opcode: z.literal("ROR"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("ROR-Direct_Word"),         opcode: z.literal("ROR"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("ROR-Direct_Word_X"),       opcode: z.literal("ROR"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("RTI-Implied"),             opcode: z.literal("RTI"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("RTL-Implied"),             opcode: z.literal("RTL"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("RTS-Implied"),             opcode: z.literal("RTS"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SBC-Direct_Byte"),         opcode: z.literal("SBC"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("SBC-Direct_Byte_S"),       opcode: z.literal("SBC"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("SBC-Direct_Byte_X"),       opcode: z.literal("SBC"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("SBC-Direct_Long"),         opcode: z.literal("SBC"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("SBC-Direct_Long_X"),       opcode: z.literal("SBC"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("SBC-Direct_Word"),         opcode: z.literal("SBC"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("SBC-Direct_Word_X"),       opcode: z.literal("SBC"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("SBC-Direct_Word_Y"),       opcode: z.literal("SBC"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("SBC-Immediate_Byte"),      opcode: z.literal("SBC"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("SBC-Immediate_Word"),      opcode: z.literal("SBC"), mode: z.literal("Immediate_Word")       }),
  z.object({ id: z.literal("SBC-Indirect_Byte"),       opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("SBC-Indirect_Byte_SY"),    opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("SBC-Indirect_Byte_X"),     opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("SBC-Indirect_Byte_Y"),     opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("SBC-IndirectLong_Byte"),   opcode: z.literal("SBC"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("SBC-IndirectLong_Byte_Y"), opcode: z.literal("SBC"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("SEC-Implied"),             opcode: z.literal("SEC"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SED-Implied"),             opcode: z.literal("SED"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SEI-Implied"),             opcode: z.literal("SEI"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SEP-Immediate_Byte"),      opcode: z.literal("SEP"), mode: z.literal("Immediate_Byte")       }),
  z.object({ id: z.literal("STA-Direct_Byte"),         opcode: z.literal("STA"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("STA-Direct_Byte_S"),       opcode: z.literal("STA"), mode: z.literal("Direct_Byte_S")        }),
  z.object({ id: z.literal("STA-Direct_Byte_X"),       opcode: z.literal("STA"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("STA-Direct_Long"),         opcode: z.literal("STA"), mode: z.literal("Direct_Long")          }),
  z.object({ id: z.literal("STA-Direct_Long_X"),       opcode: z.literal("STA"), mode: z.literal("Direct_Long_X")        }),
  z.object({ id: z.literal("STA-Direct_Word"),         opcode: z.literal("STA"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("STA-Direct_Word_X"),       opcode: z.literal("STA"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("STA-Direct_Word_Y"),       opcode: z.literal("STA"), mode: z.literal("Direct_Word_Y")        }),
  z.object({ id: z.literal("STA-Indirect_Byte"),       opcode: z.literal("STA"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("STA-Indirect_Byte_SY"),    opcode: z.literal("STA"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("STA-Indirect_Byte_X"),     opcode: z.literal("STA"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("STA-Indirect_Byte_Y"),     opcode: z.literal("STA"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("STA-IndirectLong_Byte"),   opcode: z.literal("STA"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("STA-IndirectLong_Byte_Y"), opcode: z.literal("STA"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("STP-Implied"),             opcode: z.literal("STP"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("STX-Direct_Byte"),         opcode: z.literal("STX"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("STX-Direct_Byte_Y"),       opcode: z.literal("STX"), mode: z.literal("Direct_Byte_Y")        }),
  z.object({ id: z.literal("STX-Direct_Word"),         opcode: z.literal("STX"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("STY-Direct_Byte"),         opcode: z.literal("STY"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("STY-Direct_Byte_X"),       opcode: z.literal("STY"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("STY-Direct_Word"),         opcode: z.literal("STY"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("STZ-Direct_Byte"),         opcode: z.literal("STZ"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("STZ-Direct_Byte_X"),       opcode: z.literal("STZ"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("STZ-Direct_Word"),         opcode: z.literal("STZ"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("STZ-Direct_Word_X"),       opcode: z.literal("STZ"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("TAX-Implied"),             opcode: z.literal("TAX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TAY-Implied"),             opcode: z.literal("TAY"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TCD-Implied"),             opcode: z.literal("TCD"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TCS-Implied"),             opcode: z.literal("TCS"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TDC-Implied"),             opcode: z.literal("TDC"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TRB-Direct_Byte"),         opcode: z.literal("TRB"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("TRB-Direct_Word"),         opcode: z.literal("TRB"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("TSB-Direct_Byte"),         opcode: z.literal("TSB"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("TSB-Direct_Word"),         opcode: z.literal("TSB"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("TSC-Implied"),             opcode: z.literal("TSC"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TSX-Implied"),             opcode: z.literal("TSX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TXA-Implied"),             opcode: z.literal("TXA"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TXS-Implied"),             opcode: z.literal("TXS"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TXY-Implied"),             opcode: z.literal("TXY"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TYA-Implied"),             opcode: z.literal("TYA"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("TYX-Implied"),             opcode: z.literal("TYX"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("WAI-Implied"),             opcode: z.literal("WAI"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("WDM-Implied"),             opcode: z.literal("WDM"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("XBA-Implied"),             opcode: z.literal("XBA"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("XCE-Implied"),             opcode: z.literal("XCE"), mode: z.literal("Implied")              }),
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

//==============================================================================
// Instruction Mode Meta
//==============================================================================

type ModeMeta = { argsType: ArgsType; label: string };

// prettier-ignore
const ModeMetaByMode = {
  Implied:             { argsType: ArgsType.None, label: "" },
  Accumulator:         { argsType: ArgsType.None, label: "A" },
  Direct_Byte:         { argsType: ArgsType.Byte, label: "dp" },
  Direct_Byte_S:       { argsType: ArgsType.Byte, label: "dp,s" },
  Direct_Byte_X:       { argsType: ArgsType.Byte, label: "dp,x" },
  Direct_Byte_Y:       { argsType: ArgsType.Byte, label: "dp,y" },
  Direct_Long:         { argsType: ArgsType.Long, label: "long" },
  Direct_Long_X:       { argsType: ArgsType.Long, label: "long,x" },
  Direct_Word:         { argsType: ArgsType.Word, label: "addr" },
  Direct_Word_X:       { argsType: ArgsType.Word, label: "addr,x" },
  Direct_Word_Y:       { argsType: ArgsType.Word, label: "addr,y" },
  Immediate_Byte:      { argsType: ArgsType.Byte, label: "#const" },
  Immediate_Word:      { argsType: ArgsType.Word, label: "#const" },
  IndirectLong_Byte:   { argsType: ArgsType.Byte, label: "[dp]" },
  IndirectLong_Byte_Y: { argsType: ArgsType.Byte, label: "[dp],y" },
  IndirectLong_Word:   { argsType: ArgsType.Word, label: "[addr]" },
  Indirect_Byte:       { argsType: ArgsType.Byte, label: "(dp)" },
  Indirect_Byte_SY:    { argsType: ArgsType.Byte, label: "(sr,s),y" },
  Indirect_Byte_X:     { argsType: ArgsType.Byte, label: "(dp,x)" },
  Indirect_Byte_Y:     { argsType: ArgsType.Byte, label: "(dp),y" },
  Indirect_Word:       { argsType: ArgsType.Word, label: "(addr)" },
  Indirect_Word_X:     { argsType: ArgsType.Word, label: "(addr,x)" },
  Move:                { argsType: ArgsType.Move, label: "srcBank,destBank" },
} as const satisfies Record<Mode, ModeMeta>;

export type Asm65816InstructionModeMeta = ModeMeta;
export const Asm65816InstructionModeMetaByMode = ModeMetaByMode;

//==============================================================================
// Instruction Cycles Modifiers
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

enum CyclesModifiers {
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

export const Asm65816InstructionCyclesModifiers = CyclesModifiers;

//==============================================================================
// Instruction Meta
//==============================================================================

type Meta = {
  hex: string;
  flags: string;
  bytes: number;
  cycles: number;
  cyclesModifiers: number;
};

// prettier-ignore
const MetaById = {
  "ADC-Direct_Byte":         { hex: "65", flags: "NV----ZC", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "ADC-Direct_Byte_S":       { hex: "63", flags: "NV----ZC", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "ADC-Direct_Byte_X":       { hex: "75", flags: "NV----ZC", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "ADC-Direct_Long":         { hex: "6F", flags: "NV----ZC", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "ADC-Direct_Long_X":       { hex: "7F", flags: "NV----ZC", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "ADC-Direct_Word":         { hex: "6D", flags: "NV----ZC", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "ADC-Direct_Word_X":       { hex: "7D", flags: "NV----ZC", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "ADC-Direct_Word_Y":       { hex: "79", flags: "NV----ZC", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "ADC-Immediate_Byte":      { hex: "69", flags: "NV----ZC", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "ADC-Immediate_Word":      { hex: "69", flags: "NV----ZC", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "ADC-Indirect_Byte":       { hex: "72", flags: "NV----ZC", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "ADC-Indirect_Byte_SY":    { hex: "73", flags: "NV----ZC", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "ADC-Indirect_Byte_X":     { hex: "61", flags: "NV----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "ADC-Indirect_Byte_Y":     { hex: "71", flags: "NV----ZC", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "ADC-IndirectLong_Byte":   { hex: "67", flags: "NV----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "ADC-IndirectLong_Byte_Y": { hex: "77", flags: "NV----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "AND-Direct_Byte":         { hex: "25", flags: "N-----Z-", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "AND-Direct_Byte_S":       { hex: "23", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "AND-Direct_Byte_X":       { hex: "35", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "AND-Direct_Long":         { hex: "2F", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "AND-Direct_Long_X":       { hex: "3F", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "AND-Direct_Word":         { hex: "2D", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "AND-Direct_Word_X":       { hex: "3D", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "AND-Direct_Word_Y":       { hex: "39", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "AND-Immediate_Byte":      { hex: "29", flags: "N-----Z-", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "AND-Immediate_Word":      { hex: "29", flags: "N-----Z-", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "AND-Indirect_Byte":       { hex: "32", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "AND-Indirect_Byte_SY":    { hex: "33", flags: "N-----Z-", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "AND-Indirect_Byte_X":     { hex: "21", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "AND-Indirect_Byte_Y":     { hex: "31", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "AND-IndirectLong_Byte":   { hex: "27", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "AND-IndirectLong_Byte_Y": { hex: "37", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "ASL-Accumulator":         { hex: "0A", flags: "N-----ZC", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "ASL-Direct_Byte":         { hex: "06", flags: "N-----ZC", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "ASL-Direct_Byte_X":       { hex: "16", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: D | N     },
  "ASL-Direct_Word":         { hex: "0E", flags: "N-----ZC", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "ASL-Direct_Word_X":       { hex: "1E", flags: "N-----ZC", bytes: 3, cycles: 7, cyclesModifiers: N         },
  "BCC-Direct_Byte":         { hex: "90", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BCS-Direct_Byte":         { hex: "B0", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BEQ-Direct_Byte":         { hex: "F0", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BIT-Direct_Byte":         { hex: "24", flags: "NV----Z-", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "BIT-Direct_Byte_X":       { hex: "34", flags: "NV----Z-", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "BIT-Direct_Word":         { hex: "2C", flags: "NV----Z-", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "BIT-Direct_Word_X":       { hex: "3C", flags: "NV----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "BIT-Immediate_Byte":      { hex: "89", flags: "------Z-", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "BIT-Immediate_Word":      { hex: "89", flags: "------Z-", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "BMI-Direct_Byte":         { hex: "30", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BNE-Direct_Byte":         { hex: "D0", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BPL-Direct_Byte":         { hex: "10", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BRA-Direct_Byte":         { hex: "80", flags: "--------", bytes: 2, cycles: 3, cyclesModifiers: B         },
  "BRK-Direct_Byte":         { hex: "00", flags: "----DI--", bytes: 2, cycles: 7, cyclesModifiers: E         },
  "BRL-Direct_Word":         { hex: "82", flags: "--------", bytes: 3, cycles: 4, cyclesModifiers: 0         },
  "BVC-Direct_Byte":         { hex: "50", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "BVS-Direct_Byte":         { hex: "70", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: B         },
  "CLC-Implied":             { hex: "18", flags: "-------C", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "CLD-Implied":             { hex: "D8", flags: "----D---", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "CLI-Implied":             { hex: "58", flags: "-----I--", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "CLV-Implied":             { hex: "B8", flags: "-V------", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "CMP-Direct_Byte":         { hex: "C5", flags: "N-----ZC", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "CMP-Direct_Byte_S":       { hex: "C3", flags: "N-----ZC", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "CMP-Direct_Byte_X":       { hex: "D5", flags: "N-----ZC", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "CMP-Direct_Long":         { hex: "CF", flags: "N-----ZC", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "CMP-Direct_Long_X":       { hex: "DF", flags: "N-----ZC", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "CMP-Direct_Word":         { hex: "CD", flags: "N-----ZC", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "CMP-Direct_Word_X":       { hex: "DD", flags: "N-----ZC", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "CMP-Direct_Word_Y":       { hex: "D9", flags: "N-----ZC", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "CMP-Immediate_Byte":      { hex: "C9", flags: "N-----ZC", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "CMP-Immediate_Word":      { hex: "C9", flags: "N-----ZC", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "CMP-Indirect_Byte":       { hex: "D2", flags: "N-----ZC", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "CMP-Indirect_Byte_SY":    { hex: "D3", flags: "N-----ZC", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "CMP-Indirect_Byte_X":     { hex: "C1", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "CMP-Indirect_Byte_Y":     { hex: "D1", flags: "N-----ZC", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "CMP-IndirectLong_Byte":   { hex: "C7", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "CMP-IndirectLong_Byte_Y": { hex: "D7", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "COP-Immediate_Byte":      { hex: "02", flags: "----DI--", bytes: 2, cycles: 7, cyclesModifiers: E         },
  "CPX-Direct_Byte":         { hex: "E4", flags: "N-----ZC", bytes: 2, cycles: 3, cyclesModifiers: X | D     },
  "CPX-Direct_Word":         { hex: "EC", flags: "N-----ZC", bytes: 3, cycles: 4, cyclesModifiers: X         },
  "CPX-Immediate_Byte":      { hex: "E0", flags: "N-----ZC", bytes: 2, cycles: 2, cyclesModifiers: X         },
  "CPX-Immediate_Word":      { hex: "E0", flags: "N-----ZC", bytes: 3, cycles: 2, cyclesModifiers: X         },
  "CPY-Direct_Byte":         { hex: "C4", flags: "N-----ZC", bytes: 2, cycles: 3, cyclesModifiers: X | D     },
  "CPY-Direct_Word":         { hex: "CC", flags: "N-----ZC", bytes: 3, cycles: 4, cyclesModifiers: X         },
  "CPY-Immediate_Byte":      { hex: "C0", flags: "N-----ZC", bytes: 2, cycles: 2, cyclesModifiers: X         },
  "CPY-Immediate_Word":      { hex: "C0", flags: "N-----ZC", bytes: 3, cycles: 2, cyclesModifiers: X         },
  "DEC-Accumulator":         { hex: "3A", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "DEC-Direct_Byte":         { hex: "C6", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "DEC-Direct_Byte_X":       { hex: "D6", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: D | N     },
  "DEC-Direct_Word":         { hex: "CE", flags: "N-----Z-", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "DEC-Direct_Word_X":       { hex: "DE", flags: "N-----Z-", bytes: 3, cycles: 7, cyclesModifiers: N         },
  "DEX-Implied":             { hex: "CA", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "DEY-Implied":             { hex: "88", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "EOR-Direct_Byte":         { hex: "45", flags: "N-----Z-", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "EOR-Direct_Byte_S":       { hex: "43", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "EOR-Direct_Byte_X":       { hex: "55", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "EOR-Direct_Long":         { hex: "4F", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "EOR-Direct_Long_X":       { hex: "5F", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "EOR-Direct_Word":         { hex: "4D", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "EOR-Direct_Word_X":       { hex: "5D", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "EOR-Direct_Word_Y":       { hex: "59", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "EOR-Immediate_Byte":      { hex: "49", flags: "N-----Z-", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "EOR-Immediate_Word":      { hex: "49", flags: "N-----Z-", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "EOR-Indirect_Byte":       { hex: "52", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "EOR-Indirect_Byte_SY":    { hex: "53", flags: "N-----Z-", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "EOR-Indirect_Byte_X":     { hex: "41", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "EOR-Indirect_Byte_Y":     { hex: "51", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "EOR-IndirectLong_Byte":   { hex: "47", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "EOR-IndirectLong_Byte_Y": { hex: "57", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "INC-Accumulator":         { hex: "1A", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "INC-Direct_Byte":         { hex: "E6", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "INC-Direct_Byte_X":       { hex: "F6", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: D | N     },
  "INC-Direct_Word":         { hex: "EE", flags: "N-----Z-", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "INC-Direct_Word_X":       { hex: "FE", flags: "N-----Z-", bytes: 3, cycles: 7, cyclesModifiers: N         },
  "INX-Implied":             { hex: "E8", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "INY-Implied":             { hex: "C8", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "JML-Direct_Long":         { hex: "5C", flags: "--------", bytes: 4, cycles: 4, cyclesModifiers: 0         },
  "JML-IndirectLong_Word":   { hex: "DC", flags: "--------", bytes: 3, cycles: 6, cyclesModifiers: 0         },
  "JMP-Direct_Long":         { hex: "5C", flags: "--------", bytes: 4, cycles: 4, cyclesModifiers: 0         },
  "JMP-Direct_Word":         { hex: "4C", flags: "--------", bytes: 3, cycles: 3, cyclesModifiers: 0         },
  "JMP-Indirect_Word":       { hex: "6C", flags: "--------", bytes: 3, cycles: 5, cyclesModifiers: 0         },
  "JMP-Indirect_Word_X":     { hex: "7C", flags: "--------", bytes: 3, cycles: 6, cyclesModifiers: 0         },
  "JMP-IndirectLong_Word":   { hex: "DC", flags: "--------", bytes: 3, cycles: 6, cyclesModifiers: 0         },
  "JSL-Implied":             { hex: "22", flags: "--------", bytes: 4, cycles: 8, cyclesModifiers: 0         },
  "JSR-Direct_Long":         { hex: "22", flags: "--------", bytes: 4, cycles: 8, cyclesModifiers: 0         },
  "JSR-Direct_Word":         { hex: "20", flags: "--------", bytes: 3, cycles: 6, cyclesModifiers: 0         },
  "JSR-Indirect_Word_X":     { hex: "FC", flags: "--------", bytes: 3, cycles: 8, cyclesModifiers: 0         },
  "LDA-Direct_Byte":         { hex: "A5", flags: "N-----Z-", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "LDA-Direct_Byte_S":       { hex: "A3", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "LDA-Direct_Byte_X":       { hex: "B5", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "LDA-Direct_Long":         { hex: "AF", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "LDA-Direct_Long_X":       { hex: "BF", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "LDA-Direct_Word":         { hex: "AD", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "LDA-Direct_Word_X":       { hex: "BD", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "LDA-Direct_Word_Y":       { hex: "B9", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "LDA-Immediate_Byte":      { hex: "A9", flags: "N-----Z-", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "LDA-Immediate_Word":      { hex: "A9", flags: "N-----Z-", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "LDA-Indirect_Byte":       { hex: "B2", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "LDA-Indirect_Byte_SY":    { hex: "B3", flags: "N-----Z-", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "LDA-Indirect_Byte_X":     { hex: "A1", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "LDA-Indirect_Byte_Y":     { hex: "B1", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "LDA-IndirectLong_Byte":   { hex: "A7", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "LDA-IndirectLong_Byte_Y": { hex: "B7", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "LDX-Direct_Byte":         { hex: "A6", flags: "N-----Z-", bytes: 2, cycles: 3, cyclesModifiers: X | D     },
  "LDX-Direct_Byte_Y":       { hex: "B6", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: X | D     },
  "LDX-Direct_Word":         { hex: "AE", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: X         },
  "LDX-Direct_Word_Y":       { hex: "BE", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: X | P     },
  "LDX-Immediate_Byte":      { hex: "A2", flags: "N-----Z-", bytes: 2, cycles: 2, cyclesModifiers: X         },
  "LDX-Immediate_Word":      { hex: "A2", flags: "N-----Z-", bytes: 3, cycles: 2, cyclesModifiers: X         },
  "LDY-Direct_Byte":         { hex: "A4", flags: "N-----Z-", bytes: 2, cycles: 3, cyclesModifiers: X | D     },
  "LDY-Direct_Byte_X":       { hex: "B4", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: X | D     },
  "LDY-Direct_Word":         { hex: "AC", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: X         },
  "LDY-Direct_Word_X":       { hex: "BC", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: X | P     },
  "LDY-Immediate_Byte":      { hex: "A0", flags: "N-----Z-", bytes: 2, cycles: 2, cyclesModifiers: X         },
  "LDY-Immediate_Word":      { hex: "A0", flags: "N-----Z-", bytes: 3, cycles: 2, cyclesModifiers: X         },
  "LSR-Accumulator":         { hex: "4A", flags: "N-----ZC", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "LSR-Direct_Byte":         { hex: "46", flags: "N-----ZC", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "LSR-Direct_Byte_X":       { hex: "56", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: D | N     },
  "LSR-Direct_Word":         { hex: "4E", flags: "N-----ZC", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "LSR-Direct_Word_X":       { hex: "5E", flags: "N-----ZC", bytes: 3, cycles: 7, cyclesModifiers: N         },
  "MVN-Move":                { hex: "54", flags: "--------", bytes: 3, cycles: 0, cyclesModifiers: V         },
  "MVP-Move":                { hex: "44", flags: "--------", bytes: 3, cycles: 0, cyclesModifiers: V         },
  "NOP-Implied":             { hex: "EA", flags: "--------", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "ORA-Direct_Byte":         { hex: "05", flags: "N-----Z-", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "ORA-Direct_Byte_S":       { hex: "03", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "ORA-Direct_Byte_X":       { hex: "15", flags: "N-----Z-", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "ORA-Direct_Long":         { hex: "0F", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "ORA-Direct_Long_X":       { hex: "1F", flags: "N-----Z-", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "ORA-Direct_Word":         { hex: "0D", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "ORA-Direct_Word_X":       { hex: "1D", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "ORA-Direct_Word_Y":       { hex: "19", flags: "N-----Z-", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "ORA-Immediate_Byte":      { hex: "09", flags: "N-----Z-", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "ORA-Immediate_Word":      { hex: "09", flags: "N-----Z-", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "ORA-Indirect_Byte":       { hex: "12", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "ORA-Indirect_Byte_SY":    { hex: "13", flags: "N-----Z-", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "ORA-Indirect_Byte_X":     { hex: "01", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "ORA-Indirect_Byte_Y":     { hex: "11", flags: "N-----Z-", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "ORA-IndirectLong_Byte":   { hex: "07", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "ORA-IndirectLong_Byte_Y": { hex: "17", flags: "N-----Z-", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "PEA-Direct_Word":         { hex: "F4", flags: "--------", bytes: 3, cycles: 5, cyclesModifiers: 0         },
  "PEI-Indirect_Byte":       { hex: "D4", flags: "--------", bytes: 2, cycles: 6, cyclesModifiers: D         },
  "PER-Direct_Word":         { hex: "62", flags: "--------", bytes: 3, cycles: 6, cyclesModifiers: 0         },
  "PHA-Implied":             { hex: "48", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: M         },
  "PHB-Implied":             { hex: "8B", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: 0         },
  "PHD-Implied":             { hex: "0B", flags: "--------", bytes: 1, cycles: 4, cyclesModifiers: 0         },
  "PHK-Implied":             { hex: "4B", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: 0         },
  "PHP-Implied":             { hex: "08", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: 0         },
  "PHX-Implied":             { hex: "DA", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: X         },
  "PHY-Implied":             { hex: "5A", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: X         },
  "PLA-Implied":             { hex: "68", flags: "N-----Z-", bytes: 1, cycles: 4, cyclesModifiers: M         },
  "PLB-Implied":             { hex: "AB", flags: "N-----Z-", bytes: 1, cycles: 4, cyclesModifiers: 0         },
  "PLD-Implied":             { hex: "2B", flags: "N-----Z-", bytes: 1, cycles: 5, cyclesModifiers: 0         },
  "PLP-Implied":             { hex: "28", flags: "NVMXDIZC", bytes: 1, cycles: 4, cyclesModifiers: 0         },
  "PLX-Implied":             { hex: "FA", flags: "N-----Z-", bytes: 1, cycles: 4, cyclesModifiers: X         },
  "PLY-Implied":             { hex: "7A", flags: "N-----Z-", bytes: 1, cycles: 4, cyclesModifiers: X         },
  "REP-Immediate_Byte":      { hex: "C2", flags: "NVMXDIZC", bytes: 2, cycles: 3, cyclesModifiers: 0         },
  "ROL-Accumulator":         { hex: "2A", flags: "N-----ZC", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "ROL-Direct_Byte":         { hex: "26", flags: "N-----ZC", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "ROL-Direct_Byte_X":       { hex: "36", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: D | N     },
  "ROL-Direct_Word":         { hex: "2E", flags: "N-----ZC", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "ROL-Direct_Word_X":       { hex: "3E", flags: "N-----ZC", bytes: 3, cycles: 7, cyclesModifiers: N         },
  "ROR-Accumulator":         { hex: "6A", flags: "N-----ZC", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "ROR-Direct_Byte":         { hex: "66", flags: "N-----ZC", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "ROR-Direct_Byte_X":       { hex: "76", flags: "N-----ZC", bytes: 2, cycles: 6, cyclesModifiers: D | N     },
  "ROR-Direct_Word":         { hex: "6E", flags: "N-----ZC", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "ROR-Direct_Word_X":       { hex: "7E", flags: "N-----ZC", bytes: 3, cycles: 7, cyclesModifiers: N         },
  "RTI-Implied":             { hex: "40", flags: "NVMXDIZC", bytes: 1, cycles: 6, cyclesModifiers: E         },
  "RTL-Implied":             { hex: "6B", flags: "--------", bytes: 1, cycles: 6, cyclesModifiers: 0         },
  "RTS-Implied":             { hex: "60", flags: "--------", bytes: 1, cycles: 6, cyclesModifiers: 0         },
  "SBC-Direct_Byte":         { hex: "E5", flags: "NV----ZC", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "SBC-Direct_Byte_S":       { hex: "E3", flags: "NV----ZC", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "SBC-Direct_Byte_X":       { hex: "F5", flags: "NV----ZC", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "SBC-Direct_Long":         { hex: "EF", flags: "NV----ZC", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "SBC-Direct_Long_X":       { hex: "FF", flags: "NV----ZC", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "SBC-Direct_Word":         { hex: "ED", flags: "NV----ZC", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "SBC-Direct_Word_X":       { hex: "FD", flags: "NV----ZC", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "SBC-Direct_Word_Y":       { hex: "F9", flags: "NV----ZC", bytes: 3, cycles: 4, cyclesModifiers: M | P     },
  "SBC-Immediate_Byte":      { hex: "E9", flags: "NV----ZC", bytes: 2, cycles: 2, cyclesModifiers: M         },
  "SBC-Immediate_Word":      { hex: "E9", flags: "NV----ZC", bytes: 3, cycles: 2, cyclesModifiers: M         },
  "SBC-Indirect_Byte":       { hex: "F2", flags: "NV----ZC", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "SBC-Indirect_Byte_SY":    { hex: "F3", flags: "NV----ZC", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "SBC-Indirect_Byte_X":     { hex: "E1", flags: "NV----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "SBC-Indirect_Byte_Y":     { hex: "F1", flags: "NV----ZC", bytes: 2, cycles: 5, cyclesModifiers: M | D | P },
  "SBC-IndirectLong_Byte":   { hex: "E7", flags: "NV----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "SBC-IndirectLong_Byte_Y": { hex: "F7", flags: "NV----ZC", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "SEC-Implied":             { hex: "38", flags: "-------C", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "SED-Implied":             { hex: "F8", flags: "----D---", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "SEI-Implied":             { hex: "78", flags: "-----I--", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "SEP-Immediate_Byte":      { hex: "E2", flags: "NVMXDIZC", bytes: 2, cycles: 3, cyclesModifiers: 0         },
  "STA-Direct_Byte":         { hex: "85", flags: "--------", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "STA-Direct_Byte_S":       { hex: "83", flags: "--------", bytes: 2, cycles: 4, cyclesModifiers: M         },
  "STA-Direct_Byte_X":       { hex: "95", flags: "--------", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "STA-Direct_Long":         { hex: "8F", flags: "--------", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "STA-Direct_Long_X":       { hex: "9F", flags: "--------", bytes: 4, cycles: 5, cyclesModifiers: M         },
  "STA-Direct_Word":         { hex: "8D", flags: "--------", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "STA-Direct_Word_X":       { hex: "9D", flags: "--------", bytes: 3, cycles: 5, cyclesModifiers: M         },
  "STA-Direct_Word_Y":       { hex: "99", flags: "--------", bytes: 3, cycles: 5, cyclesModifiers: M         },
  "STA-Indirect_Byte":       { hex: "92", flags: "--------", bytes: 2, cycles: 5, cyclesModifiers: M | D     },
  "STA-Indirect_Byte_SY":    { hex: "93", flags: "--------", bytes: 2, cycles: 7, cyclesModifiers: M         },
  "STA-Indirect_Byte_X":     { hex: "81", flags: "--------", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "STA-Indirect_Byte_Y":     { hex: "91", flags: "--------", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "STA-IndirectLong_Byte":   { hex: "87", flags: "--------", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "STA-IndirectLong_Byte_Y": { hex: "97", flags: "--------", bytes: 2, cycles: 6, cyclesModifiers: M | D     },
  "STP-Implied":             { hex: "DB", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: A         },
  "STX-Direct_Byte":         { hex: "86", flags: "--------", bytes: 2, cycles: 3, cyclesModifiers: X | D     },
  "STX-Direct_Byte_Y":       { hex: "96", flags: "--------", bytes: 2, cycles: 4, cyclesModifiers: X | D     },
  "STX-Direct_Word":         { hex: "8E", flags: "--------", bytes: 3, cycles: 4, cyclesModifiers: X         },
  "STY-Direct_Byte":         { hex: "84", flags: "--------", bytes: 2, cycles: 3, cyclesModifiers: X | D     },
  "STY-Direct_Byte_X":       { hex: "94", flags: "--------", bytes: 2, cycles: 4, cyclesModifiers: X | D     },
  "STY-Direct_Word":         { hex: "8C", flags: "--------", bytes: 3, cycles: 4, cyclesModifiers: X         },
  "STZ-Direct_Byte":         { hex: "64", flags: "--------", bytes: 2, cycles: 3, cyclesModifiers: M | D     },
  "STZ-Direct_Byte_X":       { hex: "74", flags: "--------", bytes: 2, cycles: 4, cyclesModifiers: M | D     },
  "STZ-Direct_Word":         { hex: "9C", flags: "--------", bytes: 3, cycles: 4, cyclesModifiers: M         },
  "STZ-Direct_Word_X":       { hex: "9E", flags: "--------", bytes: 3, cycles: 5, cyclesModifiers: M         },
  "TAX-Implied":             { hex: "AA", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TAY-Implied":             { hex: "A8", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TCD-Implied":             { hex: "5B", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TCS-Implied":             { hex: "1B", flags: "--------", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TDC-Implied":             { hex: "7B", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TRB-Direct_Byte":         { hex: "14", flags: "------Z-", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "TRB-Direct_Word":         { hex: "1C", flags: "------Z-", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "TSB-Direct_Byte":         { hex: "04", flags: "------Z-", bytes: 2, cycles: 5, cyclesModifiers: D | N     },
  "TSB-Direct_Word":         { hex: "0C", flags: "------Z-", bytes: 3, cycles: 6, cyclesModifiers: N         },
  "TSC-Implied":             { hex: "3B", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TSX-Implied":             { hex: "BA", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TXA-Implied":             { hex: "8A", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TXS-Implied":             { hex: "9A", flags: "--------", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TXY-Implied":             { hex: "9B", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TYA-Implied":             { hex: "98", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "TYX-Implied":             { hex: "BB", flags: "N-----Z-", bytes: 1, cycles: 2, cyclesModifiers: 0         },
  "WAI-Implied":             { hex: "CB", flags: "--------", bytes: 1, cycles: 3, cyclesModifiers: A         },
  "WDM-Implied":             { hex: "42", flags: "--------", bytes: 2, cycles: 2, cyclesModifiers: 0         },
  "XBA-Implied":             { hex: "EB", flags: "N-----Z-", bytes: 1, cycles: 3, cyclesModifiers: 0         },
  "XCE-Implied":             { hex: "FB", flags: "--MX---C", bytes: 1, cycles: 2, cyclesModifiers: 0         },
 } as const satisfies Record<Id, Meta>;

export const Asm65816InstructionMetaById = MetaById;

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

    let arg = -1;

    const modeMeta = ModeMetaByMode[instruction.mode];
    switch (modeMeta.argsType) {
      case ArgsType.None: {
        const args = ArgsNoneSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.None);
        arg = -1;
        break;
      }
      case ArgsType.Byte: {
        const args = ArgsByteSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Byte);
        const byteContext = { unit: IntegerUnit.Byte };
        const integer = IntegerFromString(args.data[0].value, byteContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg = integer.value;
        break;
      }
      case ArgsType.Word: {
        const args = ArgsWordSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Word);
        const wordContext = { unit: IntegerUnit.Word };
        const integer = IntegerFromString(args.data[0].value, wordContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg = integer.value;
        break;
      }
      case ArgsType.Long: {
        const args = ArgsLongSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Long);
        const longContext = { unit: IntegerUnit.Long };
        const integer = IntegerFromString(args.data[0].value, longContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg = integer.value;
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
        arg = (integer2.value << 8) | integer1.value;
        break;
      }
    }

    return { ...instruction, arg };
  });

type Instruction = z.infer<typeof InstructionSchema>;

export const Asm65816InstructionSchema = InstructionSchema;
export type Asm65816Instruction = Instruction;
