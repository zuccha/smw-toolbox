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
  "Direct_Word_X", "Direct_Word_Y", "Immediate", "IndirectLong_Byte",
  "IndirectLong_Byte_Y", "IndirectLong_Word", "Indirect_Byte",
  "Indirect_Byte_SY", "Indirect_Byte_X", "Indirect_Byte_Y", "Indirect_Word",
  "Indirect_Word_X", "Move"
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
  z.object({ id: z.literal("ADC-Immediate"),           opcode: z.literal("ADC"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("AND-Immediate"),           opcode: z.literal("AND"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("BIT-Immediate"),           opcode: z.literal("BIT"), mode: z.literal("Immediate")            }),
  z.object({ id: z.literal("BMI-Direct_Byte"),         opcode: z.literal("BMI"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BNE-Direct_Byte"),         opcode: z.literal("BNE"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BPL-Direct_Byte"),         opcode: z.literal("BPL"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BRA-Direct_Byte"),         opcode: z.literal("BRA"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("BRK-Immediate"),           opcode: z.literal("BRK"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("CMP-Immediate"),           opcode: z.literal("CMP"), mode: z.literal("Immediate")            }),
  z.object({ id: z.literal("CMP-Indirect_Byte"),       opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("CMP-Indirect_Byte_SY"),    opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("CMP-Indirect_Byte_X"),     opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("CMP-Indirect_Byte_Y"),     opcode: z.literal("CMP"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("CMP-IndirectLong_Byte"),   opcode: z.literal("CMP"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("CMP-IndirectLong_Byte_Y"), opcode: z.literal("CMP"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("COP-Immediate"),           opcode: z.literal("COP"), mode: z.literal("Immediate")            }),
  z.object({ id: z.literal("CPX-Direct_Byte"),         opcode: z.literal("CPX"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("CPX-Direct_Word"),         opcode: z.literal("CPX"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("CPX-Immediate"),           opcode: z.literal("CPX"), mode: z.literal("Immediate")            }),
  z.object({ id: z.literal("CPY-Direct_Byte"),         opcode: z.literal("CPY"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("CPY-Direct_Word"),         opcode: z.literal("CPY"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("CPY-Immediate"),           opcode: z.literal("CPY"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("EOR-Immediate"),           opcode: z.literal("EOR"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("JSL-Direct_Long"),         opcode: z.literal("JSL"), mode: z.literal("Direct_Long")          }),
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
  z.object({ id: z.literal("LDA-Immediate"),           opcode: z.literal("LDA"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("LDX-Immediate"),           opcode: z.literal("LDX"), mode: z.literal("Immediate")            }),
  z.object({ id: z.literal("LDY-Direct_Byte"),         opcode: z.literal("LDY"), mode: z.literal("Direct_Byte")          }),
  z.object({ id: z.literal("LDY-Direct_Byte_X"),       opcode: z.literal("LDY"), mode: z.literal("Direct_Byte_X")        }),
  z.object({ id: z.literal("LDY-Direct_Word"),         opcode: z.literal("LDY"), mode: z.literal("Direct_Word")          }),
  z.object({ id: z.literal("LDY-Direct_Word_X"),       opcode: z.literal("LDY"), mode: z.literal("Direct_Word_X")        }),
  z.object({ id: z.literal("LDY-Immediate"),           opcode: z.literal("LDY"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("ORA-Immediate"),           opcode: z.literal("ORA"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("REP-Immediate"),           opcode: z.literal("REP"), mode: z.literal("Immediate")            }),
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
  z.object({ id: z.literal("SBC-Immediate"),           opcode: z.literal("SBC"), mode: z.literal("Immediate")            }),
  z.object({ id: z.literal("SBC-Indirect_Byte"),       opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte")        }),
  z.object({ id: z.literal("SBC-Indirect_Byte_SY"),    opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte_SY")     }),
  z.object({ id: z.literal("SBC-Indirect_Byte_X"),     opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte_X")      }),
  z.object({ id: z.literal("SBC-Indirect_Byte_Y"),     opcode: z.literal("SBC"), mode: z.literal("Indirect_Byte_Y")      }),
  z.object({ id: z.literal("SBC-IndirectLong_Byte"),   opcode: z.literal("SBC"), mode: z.literal("IndirectLong_Byte")    }),
  z.object({ id: z.literal("SBC-IndirectLong_Byte_Y"), opcode: z.literal("SBC"), mode: z.literal("IndirectLong_Byte_Y")  }),
  z.object({ id: z.literal("SEC-Implied"),             opcode: z.literal("SEC"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SED-Implied"),             opcode: z.literal("SED"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SEI-Implied"),             opcode: z.literal("SEI"), mode: z.literal("Implied")              }),
  z.object({ id: z.literal("SEP-Immediate"),           opcode: z.literal("SEP"), mode: z.literal("Immediate")            }),
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
  Immediate:           { argsType: ArgsType.ByteOrWord, label: "#const" },
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
  "ADC-Direct_Byte":         { opcode: "ADC", mode: "Direct_Byte",          hex: 0x65, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "ADC-Direct_Byte_S":       { opcode: "ADC", mode: "Direct_Byte_S",        hex: 0x63, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ADC-Direct_Byte_X":       { opcode: "ADC", mode: "Direct_Byte_X",        hex: 0x75, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "ADC-Direct_Long":         { opcode: "ADC", mode: "Direct_Long",          hex: 0x6F, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ADC-Direct_Long_X":       { opcode: "ADC", mode: "Direct_Long_X",        hex: 0x7F, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ADC-Direct_Word":         { opcode: "ADC", mode: "Direct_Word",          hex: 0x6D, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ADC-Direct_Word_X":       { opcode: "ADC", mode: "Direct_Word_X",        hex: 0x7D, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ADC-Direct_Word_Y":       { opcode: "ADC", mode: "Direct_Word_Y",        hex: 0x79, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ADC-Immediate":           { opcode: "ADC", mode: "Immediate",            hex: 0x69, flags: "NV----ZC", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "ADC-Indirect_Byte":       { opcode: "ADC", mode: "Indirect_Byte",        hex: 0x72, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "ADC-Indirect_Byte_SY":    { opcode: "ADC", mode: "Indirect_Byte_SY",     hex: 0x73, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "ADC-Indirect_Byte_X":     { opcode: "ADC", mode: "Indirect_Byte_X",      hex: 0x61, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ADC-Indirect_Byte_Y":     { opcode: "ADC", mode: "Indirect_Byte_Y",      hex: 0x71, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "ADC-IndirectLong_Byte":   { opcode: "ADC", mode: "IndirectLong_Byte",    hex: 0x67, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ADC-IndirectLong_Byte_Y": { opcode: "ADC", mode: "IndirectLong_Byte_Y",  hex: 0x77, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "AND-Direct_Byte":         { opcode: "AND", mode: "Direct_Byte",          hex: 0x25, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "AND-Direct_Byte_S":       { opcode: "AND", mode: "Direct_Byte_S",        hex: 0x23, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "AND-Direct_Byte_X":       { opcode: "AND", mode: "Direct_Byte_X",        hex: 0x35, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "AND-Direct_Long":         { opcode: "AND", mode: "Direct_Long",          hex: 0x2F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "AND-Direct_Long_X":       { opcode: "AND", mode: "Direct_Long_X",        hex: 0x3F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "AND-Direct_Word":         { opcode: "AND", mode: "Direct_Word",          hex: 0x2D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "AND-Direct_Word_X":       { opcode: "AND", mode: "Direct_Word_X",        hex: 0x3D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "AND-Direct_Word_Y":       { opcode: "AND", mode: "Direct_Word_Y",        hex: 0x39, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "AND-Immediate":           { opcode: "AND", mode: "Immediate",            hex: 0x29, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "AND-Indirect_Byte":       { opcode: "AND", mode: "Indirect_Byte",        hex: 0x32, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "AND-Indirect_Byte_SY":    { opcode: "AND", mode: "Indirect_Byte_SY",     hex: 0x33, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "AND-Indirect_Byte_X":     { opcode: "AND", mode: "Indirect_Byte_X",      hex: 0x21, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "AND-Indirect_Byte_Y":     { opcode: "AND", mode: "Indirect_Byte_Y",      hex: 0x31, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "AND-IndirectLong_Byte":   { opcode: "AND", mode: "IndirectLong_Byte",    hex: 0x27, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "AND-IndirectLong_Byte_Y": { opcode: "AND", mode: "IndirectLong_Byte_Y",  hex: 0x37, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ASL-Accumulator":         { opcode: "ASL", mode: "Accumulator",          hex: 0x0A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ASL-Direct_Byte":         { opcode: "ASL", mode: "Direct_Byte",          hex: 0x06, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "ASL-Direct_Byte_X":       { opcode: "ASL", mode: "Direct_Byte_X",        hex: 0x16, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "ASL-Direct_Word":         { opcode: "ASL", mode: "Direct_Word",          hex: 0x0E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "ASL-Direct_Word_X":       { opcode: "ASL", mode: "Direct_Word_X",        hex: 0x1E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "BCC-Direct_Byte":         { opcode: "BCC", mode: "Direct_Byte",          hex: 0x90, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BCS-Direct_Byte":         { opcode: "BCS", mode: "Direct_Byte",          hex: 0xB0, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BEQ-Direct_Byte":         { opcode: "BEQ", mode: "Direct_Byte",          hex: 0xF0, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BIT-Direct_Byte":         { opcode: "BIT", mode: "Direct_Byte",          hex: 0x24, flags: "NV----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "BIT-Direct_Byte_X":       { opcode: "BIT", mode: "Direct_Byte_X",        hex: 0x34, flags: "NV----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "BIT-Direct_Word":         { opcode: "BIT", mode: "Direct_Word",          hex: 0x2C, flags: "NV----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "BIT-Direct_Word_X":       { opcode: "BIT", mode: "Direct_Word_X",        hex: 0x3C, flags: "NV----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "BIT-Immediate":           { opcode: "BIT", mode: "Immediate",            hex: 0x89, flags: "------Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "BMI-Direct_Byte":         { opcode: "BMI", mode: "Direct_Byte",          hex: 0x30, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BNE-Direct_Byte":         { opcode: "BNE", mode: "Direct_Byte",          hex: 0xD0, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BPL-Direct_Byte":         { opcode: "BPL", mode: "Direct_Byte",          hex: 0x10, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BRA-Direct_Byte":         { opcode: "BRA", mode: "Direct_Byte",          hex: 0x80, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: B         },
  "BRK-Immediate":           { opcode: "BRK", mode: "Immediate",            hex: 0x00, flags: "----DI--", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: E         },
  "BRL-Direct_Word":         { opcode: "BRL", mode: "Direct_Word",          hex: 0x82, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "BVC-Direct_Byte":         { opcode: "BVC", mode: "Direct_Byte",          hex: 0x50, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "BVS-Direct_Byte":         { opcode: "BVS", mode: "Direct_Byte",          hex: 0x70, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: B         },
  "CLC-Implied":             { opcode: "CLC", mode: "Implied",              hex: 0x18, flags: "-------C", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CLD-Implied":             { opcode: "CLD", mode: "Implied",              hex: 0xD8, flags: "----D---", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CLI-Implied":             { opcode: "CLI", mode: "Implied",              hex: 0x58, flags: "-----I--", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CLV-Implied":             { opcode: "CLV", mode: "Implied",              hex: 0xB8, flags: "-V------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "CMP-Direct_Byte":         { opcode: "CMP", mode: "Direct_Byte",          hex: 0xC5, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "CMP-Direct_Byte_S":       { opcode: "CMP", mode: "Direct_Byte_S",        hex: 0xC3, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "CMP-Direct_Byte_X":       { opcode: "CMP", mode: "Direct_Byte_X",        hex: 0xD5, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "CMP-Direct_Long":         { opcode: "CMP", mode: "Direct_Long",          hex: 0xCF, flags: "N-----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "CMP-Direct_Long_X":       { opcode: "CMP", mode: "Direct_Long_X",        hex: 0xDF, flags: "N-----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "CMP-Direct_Word":         { opcode: "CMP", mode: "Direct_Word",          hex: 0xCD, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "CMP-Direct_Word_X":       { opcode: "CMP", mode: "Direct_Word_X",        hex: 0xDD, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "CMP-Direct_Word_Y":       { opcode: "CMP", mode: "Direct_Word_Y",        hex: 0xD9, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "CMP-Immediate":           { opcode: "CMP", mode: "Immediate",            hex: 0xC9, flags: "N-----ZC", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "CMP-Indirect_Byte":       { opcode: "CMP", mode: "Indirect_Byte",        hex: 0xD2, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "CMP-Indirect_Byte_SY":    { opcode: "CMP", mode: "Indirect_Byte_SY",     hex: 0xD3, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "CMP-Indirect_Byte_X":     { opcode: "CMP", mode: "Indirect_Byte_X",      hex: 0xC1, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "CMP-Indirect_Byte_Y":     { opcode: "CMP", mode: "Indirect_Byte_Y",      hex: 0xD1, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "CMP-IndirectLong_Byte":   { opcode: "CMP", mode: "IndirectLong_Byte",    hex: 0xC7, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "CMP-IndirectLong_Byte_Y": { opcode: "CMP", mode: "IndirectLong_Byte_Y",  hex: 0xD7, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "COP-Immediate":           { opcode: "COP", mode: "Immediate",            hex: 0x02, flags: "----DI--", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: E         },
  "CPX-Direct_Byte":         { opcode: "CPX", mode: "Direct_Byte",          hex: 0xE4, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "CPX-Direct_Word":         { opcode: "CPX", mode: "Direct_Word",          hex: 0xEC, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "CPX-Immediate":           { opcode: "CPX", mode: "Immediate",            hex: 0xE0, flags: "N-----ZC", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "CPY-Direct_Byte":         { opcode: "CPY", mode: "Direct_Byte",          hex: 0xC4, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "CPY-Direct_Word":         { opcode: "CPY", mode: "Direct_Word",          hex: 0xCC, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "CPY-Immediate":           { opcode: "CPY", mode: "Immediate",            hex: 0xC0, flags: "N-----ZC", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "DEC-Accumulator":         { opcode: "DEC", mode: "Accumulator",          hex: 0x3A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "DEC-Direct_Byte":         { opcode: "DEC", mode: "Direct_Byte",          hex: 0xC6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "DEC-Direct_Byte_X":       { opcode: "DEC", mode: "Direct_Byte_X",        hex: 0xD6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "DEC-Direct_Word":         { opcode: "DEC", mode: "Direct_Word",          hex: 0xCE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "DEC-Direct_Word_X":       { opcode: "DEC", mode: "Direct_Word_X",        hex: 0xDE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "DEX-Implied":             { opcode: "DEX", mode: "Implied",              hex: 0xCA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "DEY-Implied":             { opcode: "DEY", mode: "Implied",              hex: 0x88, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "EOR-Direct_Byte":         { opcode: "EOR", mode: "Direct_Byte",          hex: 0x45, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "EOR-Direct_Byte_S":       { opcode: "EOR", mode: "Direct_Byte_S",        hex: 0x43, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "EOR-Direct_Byte_X":       { opcode: "EOR", mode: "Direct_Byte_X",        hex: 0x55, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "EOR-Direct_Long":         { opcode: "EOR", mode: "Direct_Long",          hex: 0x4F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "EOR-Direct_Long_X":       { opcode: "EOR", mode: "Direct_Long_X",        hex: 0x5F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "EOR-Direct_Word":         { opcode: "EOR", mode: "Direct_Word",          hex: 0x4D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "EOR-Direct_Word_X":       { opcode: "EOR", mode: "Direct_Word_X",        hex: 0x5D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "EOR-Direct_Word_Y":       { opcode: "EOR", mode: "Direct_Word_Y",        hex: 0x59, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "EOR-Immediate":           { opcode: "EOR", mode: "Immediate",            hex: 0x49, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "EOR-Indirect_Byte":       { opcode: "EOR", mode: "Indirect_Byte",        hex: 0x52, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "EOR-Indirect_Byte_SY":    { opcode: "EOR", mode: "Indirect_Byte_SY",     hex: 0x53, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "EOR-Indirect_Byte_X":     { opcode: "EOR", mode: "Indirect_Byte_X",      hex: 0x41, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "EOR-Indirect_Byte_Y":     { opcode: "EOR", mode: "Indirect_Byte_Y",      hex: 0x51, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "EOR-IndirectLong_Byte":   { opcode: "EOR", mode: "IndirectLong_Byte",    hex: 0x47, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "EOR-IndirectLong_Byte_Y": { opcode: "EOR", mode: "IndirectLong_Byte_Y",  hex: 0x57, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "INC-Accumulator":         { opcode: "INC", mode: "Accumulator",          hex: 0x1A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "INC-Direct_Byte":         { opcode: "INC", mode: "Direct_Byte",          hex: 0xE6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "INC-Direct_Byte_X":       { opcode: "INC", mode: "Direct_Byte_X",        hex: 0xF6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "INC-Direct_Word":         { opcode: "INC", mode: "Direct_Word",          hex: 0xEE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "INC-Direct_Word_X":       { opcode: "INC", mode: "Direct_Word_X",        hex: 0xFE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "INX-Implied":             { opcode: "INX", mode: "Implied",              hex: 0xE8, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "INY-Implied":             { opcode: "INY", mode: "Implied",              hex: 0xC8, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "JML-Direct_Long":         { opcode: "JML", mode: "Direct_Long",          hex: 0x5C, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "JML-IndirectLong_Word":   { opcode: "JML", mode: "IndirectLong_Word",    hex: 0xDC, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JMP-Direct_Long":         { opcode: "JMP", mode: "Direct_Long",          hex: 0x5C, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "JMP-Direct_Word":         { opcode: "JMP", mode: "Direct_Word",          hex: 0x4C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "JMP-Indirect_Word":       { opcode: "JMP", mode: "Indirect_Word",        hex: 0x6C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: 0         },
  "JMP-Indirect_Word_X":     { opcode: "JMP", mode: "Indirect_Word_X",      hex: 0x7C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JMP-IndirectLong_Word":   { opcode: "JMP", mode: "IndirectLong_Word",    hex: 0xDC, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JSL-Direct_Long":         { opcode: "JSL", mode: "Direct_Long",          hex: 0x22, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 8, cyclesModifiers: 0         },
  "JSR-Direct_Long":         { opcode: "JSR", mode: "Direct_Long",          hex: 0x22, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 8, cyclesModifiers: 0         },
  "JSR-Direct_Word":         { opcode: "JSR", mode: "Direct_Word",          hex: 0x20, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "JSR-Indirect_Word_X":     { opcode: "JSR", mode: "Indirect_Word_X",      hex: 0xFC, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 8, cyclesModifiers: 0         },
  "LDA-Direct_Byte":         { opcode: "LDA", mode: "Direct_Byte",          hex: 0xA5, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "LDA-Direct_Byte_S":       { opcode: "LDA", mode: "Direct_Byte_S",        hex: 0xA3, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "LDA-Direct_Byte_X":       { opcode: "LDA", mode: "Direct_Byte_X",        hex: 0xB5, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "LDA-Direct_Long":         { opcode: "LDA", mode: "Direct_Long",          hex: 0xAF, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "LDA-Direct_Long_X":       { opcode: "LDA", mode: "Direct_Long_X",        hex: 0xBF, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "LDA-Direct_Word":         { opcode: "LDA", mode: "Direct_Word",          hex: 0xAD, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "LDA-Direct_Word_X":       { opcode: "LDA", mode: "Direct_Word_X",        hex: 0xBD, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "LDA-Direct_Word_Y":       { opcode: "LDA", mode: "Direct_Word_Y",        hex: 0xB9, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "LDA-Immediate":           { opcode: "LDA", mode: "Immediate",            hex: 0xA9, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "LDA-Indirect_Byte":       { opcode: "LDA", mode: "Indirect_Byte",        hex: 0xB2, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "LDA-Indirect_Byte_SY":    { opcode: "LDA", mode: "Indirect_Byte_SY",     hex: 0xB3, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "LDA-Indirect_Byte_X":     { opcode: "LDA", mode: "Indirect_Byte_X",      hex: 0xA1, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "LDA-Indirect_Byte_Y":     { opcode: "LDA", mode: "Indirect_Byte_Y",      hex: 0xB1, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "LDA-IndirectLong_Byte":   { opcode: "LDA", mode: "IndirectLong_Byte",    hex: 0xA7, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "LDA-IndirectLong_Byte_Y": { opcode: "LDA", mode: "IndirectLong_Byte_Y",  hex: 0xB7, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "LDX-Direct_Byte":         { opcode: "LDX", mode: "Direct_Byte",          hex: 0xA6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "LDX-Direct_Byte_Y":       { opcode: "LDX", mode: "Direct_Byte_Y",        hex: 0xB6, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "LDX-Direct_Word":         { opcode: "LDX", mode: "Direct_Word",          hex: 0xAE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "LDX-Direct_Word_Y":       { opcode: "LDX", mode: "Direct_Word_Y",        hex: 0xBE, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | P     },
  "LDX-Immediate":           { opcode: "LDX", mode: "Immediate",            hex: 0xA2, flags: "N-----Z-", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "LDY-Direct_Byte":         { opcode: "LDY", mode: "Direct_Byte",          hex: 0xA4, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "LDY-Direct_Byte_X":       { opcode: "LDY", mode: "Direct_Byte_X",        hex: 0xB4, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "LDY-Direct_Word":         { opcode: "LDY", mode: "Direct_Word",          hex: 0xAC, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "LDY-Direct_Word_X":       { opcode: "LDY", mode: "Direct_Word_X",        hex: 0xBC, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | P     },
  "LDY-Immediate":           { opcode: "LDY", mode: "Immediate",            hex: 0xA0, flags: "N-----Z-", bytes: 2, bytesModifiers: X, cycles: 2, cyclesModifiers: X         },
  "LSR-Accumulator":         { opcode: "LSR", mode: "Accumulator",          hex: 0x4A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "LSR-Direct_Byte":         { opcode: "LSR", mode: "Direct_Byte",          hex: 0x46, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "LSR-Direct_Byte_X":       { opcode: "LSR", mode: "Direct_Byte_X",        hex: 0x56, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "LSR-Direct_Word":         { opcode: "LSR", mode: "Direct_Word",          hex: 0x4E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "LSR-Direct_Word_X":       { opcode: "LSR", mode: "Direct_Word_X",        hex: 0x5E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "MVN-Move":                { opcode: "MVN", mode: "Move",                 hex: 0x54, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 0, cyclesModifiers: V         },
  "MVP-Move":                { opcode: "MVP", mode: "Move",                 hex: 0x44, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 0, cyclesModifiers: V         },
  "NOP-Implied":             { opcode: "NOP", mode: "Implied",              hex: 0xEA, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ORA-Direct_Byte":         { opcode: "ORA", mode: "Direct_Byte",          hex: 0x05, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "ORA-Direct_Byte_S":       { opcode: "ORA", mode: "Direct_Byte_S",        hex: 0x03, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ORA-Direct_Byte_X":       { opcode: "ORA", mode: "Direct_Byte_X",        hex: 0x15, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "ORA-Direct_Long":         { opcode: "ORA", mode: "Direct_Long",          hex: 0x0F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ORA-Direct_Long_X":       { opcode: "ORA", mode: "Direct_Long_X",        hex: 0x1F, flags: "N-----Z-", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "ORA-Direct_Word":         { opcode: "ORA", mode: "Direct_Word",          hex: 0x0D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "ORA-Direct_Word_X":       { opcode: "ORA", mode: "Direct_Word_X",        hex: 0x1D, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ORA-Direct_Word_Y":       { opcode: "ORA", mode: "Direct_Word_Y",        hex: 0x19, flags: "N-----Z-", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "ORA-Immediate":           { opcode: "ORA", mode: "Immediate",            hex: 0x09, flags: "N-----Z-", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "ORA-Indirect_Byte":       { opcode: "ORA", mode: "Indirect_Byte",        hex: 0x12, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "ORA-Indirect_Byte_SY":    { opcode: "ORA", mode: "Indirect_Byte_SY",     hex: 0x13, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "ORA-Indirect_Byte_X":     { opcode: "ORA", mode: "Indirect_Byte_X",      hex: 0x01, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ORA-Indirect_Byte_Y":     { opcode: "ORA", mode: "Indirect_Byte_Y",      hex: 0x11, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "ORA-IndirectLong_Byte":   { opcode: "ORA", mode: "IndirectLong_Byte",    hex: 0x07, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "ORA-IndirectLong_Byte_Y": { opcode: "ORA", mode: "IndirectLong_Byte_Y",  hex: 0x17, flags: "N-----Z-", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "PEA-Direct_Word":         { opcode: "PEA", mode: "Direct_Word",          hex: 0xF4, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: 0         },
  "PEI-Indirect_Byte":       { opcode: "PEI", mode: "Indirect_Byte",        hex: 0xD4, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D         },
  "PER-Direct_Word":         { opcode: "PER", mode: "Direct_Word",          hex: 0x62, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "PHA-Implied":             { opcode: "PHA", mode: "Implied",              hex: 0x48, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: M         },
  "PHB-Implied":             { opcode: "PHB", mode: "Implied",              hex: 0x8B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "PHD-Implied":             { opcode: "PHD", mode: "Implied",              hex: 0x0B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "PHK-Implied":             { opcode: "PHK", mode: "Implied",              hex: 0x4B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "PHP-Implied":             { opcode: "PHP", mode: "Implied",              hex: 0x08, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "PHX-Implied":             { opcode: "PHX", mode: "Implied",              hex: 0xDA, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: X         },
  "PHY-Implied":             { opcode: "PHY", mode: "Implied",              hex: 0x5A, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: X         },
  "PLA-Implied":             { opcode: "PLA", mode: "Implied",              hex: 0x68, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "PLB-Implied":             { opcode: "PLB", mode: "Implied",              hex: 0xAB, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "PLD-Implied":             { opcode: "PLD", mode: "Implied",              hex: 0x2B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 5, cyclesModifiers: 0         },
  "PLP-Implied":             { opcode: "PLP", mode: "Implied",              hex: 0x28, flags: "NVMXDIZC", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: 0         },
  "PLX-Implied":             { opcode: "PLX", mode: "Implied",              hex: 0xFA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "PLY-Implied":             { opcode: "PLY", mode: "Implied",              hex: 0x7A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "REP-Immediate":           { opcode: "REP", mode: "Immediate",            hex: 0xC2, flags: "NVMXDIZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "ROL-Accumulator":         { opcode: "ROL", mode: "Accumulator",          hex: 0x2A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ROL-Direct_Byte":         { opcode: "ROL", mode: "Direct_Byte",          hex: 0x26, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "ROL-Direct_Byte_X":       { opcode: "ROL", mode: "Direct_Byte_X",        hex: 0x36, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "ROL-Direct_Word":         { opcode: "ROL", mode: "Direct_Word",          hex: 0x2E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "ROL-Direct_Word_X":       { opcode: "ROL", mode: "Direct_Word_X",        hex: 0x3E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "ROR-Accumulator":         { opcode: "ROR", mode: "Accumulator",          hex: 0x6A, flags: "N-----ZC", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "ROR-Direct_Byte":         { opcode: "ROR", mode: "Direct_Byte",          hex: 0x66, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "ROR-Direct_Byte_X":       { opcode: "ROR", mode: "Direct_Byte_X",        hex: 0x76, flags: "N-----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: D | N     },
  "ROR-Direct_Word":         { opcode: "ROR", mode: "Direct_Word",          hex: 0x6E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "ROR-Direct_Word_X":       { opcode: "ROR", mode: "Direct_Word_X",        hex: 0x7E, flags: "N-----ZC", bytes: 3, bytesModifiers: 0, cycles: 7, cyclesModifiers: N         },
  "RTI-Implied":             { opcode: "RTI", mode: "Implied",              hex: 0x40, flags: "NVMXDIZC", bytes: 1, bytesModifiers: 0, cycles: 6, cyclesModifiers: E         },
  "RTL-Implied":             { opcode: "RTL", mode: "Implied",              hex: 0x6B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "RTS-Implied":             { opcode: "RTS", mode: "Implied",              hex: 0x60, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 6, cyclesModifiers: 0         },
  "SBC-Direct_Byte":         { opcode: "SBC", mode: "Direct_Byte",          hex: 0xE5, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "SBC-Direct_Byte_S":       { opcode: "SBC", mode: "Direct_Byte_S",        hex: 0xE3, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "SBC-Direct_Byte_X":       { opcode: "SBC", mode: "Direct_Byte_X",        hex: 0xF5, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "SBC-Direct_Long":         { opcode: "SBC", mode: "Direct_Long",          hex: 0xEF, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "SBC-Direct_Long_X":       { opcode: "SBC", mode: "Direct_Long_X",        hex: 0xFF, flags: "NV----ZC", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "SBC-Direct_Word":         { opcode: "SBC", mode: "Direct_Word",          hex: 0xED, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "SBC-Direct_Word_X":       { opcode: "SBC", mode: "Direct_Word_X",        hex: 0xFD, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "SBC-Direct_Word_Y":       { opcode: "SBC", mode: "Direct_Word_Y",        hex: 0xF9, flags: "NV----ZC", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | P     },
  "SBC-Immediate":           { opcode: "SBC", mode: "Immediate",            hex: 0xE9, flags: "NV----ZC", bytes: 2, bytesModifiers: M, cycles: 2, cyclesModifiers: M         },
  "SBC-Indirect_Byte":       { opcode: "SBC", mode: "Indirect_Byte",        hex: 0xF2, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "SBC-Indirect_Byte_SY":    { opcode: "SBC", mode: "Indirect_Byte_SY",     hex: 0xF3, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "SBC-Indirect_Byte_X":     { opcode: "SBC", mode: "Indirect_Byte_X",      hex: 0xE1, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "SBC-Indirect_Byte_Y":     { opcode: "SBC", mode: "Indirect_Byte_Y",      hex: 0xF1, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D | P },
  "SBC-IndirectLong_Byte":   { opcode: "SBC", mode: "IndirectLong_Byte",    hex: 0xE7, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "SBC-IndirectLong_Byte_Y": { opcode: "SBC", mode: "IndirectLong_Byte_Y",  hex: 0xF7, flags: "NV----ZC", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "SEC-Implied":             { opcode: "SEC", mode: "Implied",              hex: 0x38, flags: "-------C", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "SED-Implied":             { opcode: "SED", mode: "Implied",              hex: 0xF8, flags: "----D---", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "SEI-Implied":             { opcode: "SEI", mode: "Implied",              hex: 0x78, flags: "-----I--", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "SEP-Immediate":           { opcode: "SEP", mode: "Immediate",            hex: 0xE2, flags: "NVMXDIZC", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "STA-Direct_Byte":         { opcode: "STA", mode: "Direct_Byte",          hex: 0x85, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "STA-Direct_Byte_S":       { opcode: "STA", mode: "Direct_Byte_S",        hex: 0x83, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "STA-Direct_Byte_X":       { opcode: "STA", mode: "Direct_Byte_X",        hex: 0x95, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "STA-Direct_Long":         { opcode: "STA", mode: "Direct_Long",          hex: 0x8F, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Direct_Long_X":       { opcode: "STA", mode: "Direct_Long_X",        hex: 0x9F, flags: "--------", bytes: 4, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Direct_Word":         { opcode: "STA", mode: "Direct_Word",          hex: 0x8D, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "STA-Direct_Word_X":       { opcode: "STA", mode: "Direct_Word_X",        hex: 0x9D, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Direct_Word_Y":       { opcode: "STA", mode: "Direct_Word_Y",        hex: 0x99, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "STA-Indirect_Byte":       { opcode: "STA", mode: "Indirect_Byte",        hex: 0x92, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: M | D     },
  "STA-Indirect_Byte_SY":    { opcode: "STA", mode: "Indirect_Byte_SY",     hex: 0x93, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 7, cyclesModifiers: M         },
  "STA-Indirect_Byte_X":     { opcode: "STA", mode: "Indirect_Byte_X",      hex: 0x81, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-Indirect_Byte_Y":     { opcode: "STA", mode: "Indirect_Byte_Y",      hex: 0x91, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-IndirectLong_Byte":   { opcode: "STA", mode: "IndirectLong_Byte",    hex: 0x87, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STA-IndirectLong_Byte_Y": { opcode: "STA", mode: "IndirectLong_Byte_Y",  hex: 0x97, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 6, cyclesModifiers: M | D     },
  "STP-Implied":             { opcode: "STP", mode: "Implied",              hex: 0xDB, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: A         },
  "STX-Direct_Byte":         { opcode: "STX", mode: "Direct_Byte",          hex: 0x86, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "STX-Direct_Byte_Y":       { opcode: "STX", mode: "Direct_Byte_Y",        hex: 0x96, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "STX-Direct_Word":         { opcode: "STX", mode: "Direct_Word",          hex: 0x8E, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "STY-Direct_Byte":         { opcode: "STY", mode: "Direct_Byte",          hex: 0x84, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: X | D     },
  "STY-Direct_Byte_X":       { opcode: "STY", mode: "Direct_Byte_X",        hex: 0x94, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: X | D     },
  "STY-Direct_Word":         { opcode: "STY", mode: "Direct_Word",          hex: 0x8C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: X         },
  "STZ-Direct_Byte":         { opcode: "STZ", mode: "Direct_Byte",          hex: 0x64, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 3, cyclesModifiers: M | D     },
  "STZ-Direct_Byte_X":       { opcode: "STZ", mode: "Direct_Byte_X",        hex: 0x74, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 4, cyclesModifiers: M | D     },
  "STZ-Direct_Word":         { opcode: "STZ", mode: "Direct_Word",          hex: 0x9C, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 4, cyclesModifiers: M         },
  "STZ-Direct_Word_X":       { opcode: "STZ", mode: "Direct_Word_X",        hex: 0x9E, flags: "--------", bytes: 3, bytesModifiers: 0, cycles: 5, cyclesModifiers: M         },
  "TAX-Implied":             { opcode: "TAX", mode: "Implied",              hex: 0xAA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TAY-Implied":             { opcode: "TAY", mode: "Implied",              hex: 0xA8, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TCD-Implied":             { opcode: "TCD", mode: "Implied",              hex: 0x5B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TCS-Implied":             { opcode: "TCS", mode: "Implied",              hex: 0x1B, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TDC-Implied":             { opcode: "TDC", mode: "Implied",              hex: 0x7B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TRB-Direct_Byte":         { opcode: "TRB", mode: "Direct_Byte",          hex: 0x14, flags: "------Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "TRB-Direct_Word":         { opcode: "TRB", mode: "Direct_Word",          hex: 0x1C, flags: "------Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "TSB-Direct_Byte":         { opcode: "TSB", mode: "Direct_Byte",          hex: 0x04, flags: "------Z-", bytes: 2, bytesModifiers: 0, cycles: 5, cyclesModifiers: D | N     },
  "TSB-Direct_Word":         { opcode: "TSB", mode: "Direct_Word",          hex: 0x0C, flags: "------Z-", bytes: 3, bytesModifiers: 0, cycles: 6, cyclesModifiers: N         },
  "TSC-Implied":             { opcode: "TSC", mode: "Implied",              hex: 0x3B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TSX-Implied":             { opcode: "TSX", mode: "Implied",              hex: 0xBA, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TXA-Implied":             { opcode: "TXA", mode: "Implied",              hex: 0x8A, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TXS-Implied":             { opcode: "TXS", mode: "Implied",              hex: 0x9A, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TXY-Implied":             { opcode: "TXY", mode: "Implied",              hex: 0x9B, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TYA-Implied":             { opcode: "TYA", mode: "Implied",              hex: 0x98, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "TYX-Implied":             { opcode: "TYX", mode: "Implied",              hex: 0xBB, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "WAI-Implied":             { opcode: "WAI", mode: "Implied",              hex: 0xCB, flags: "--------", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: A         },
  "WDM-Implied":             { opcode: "WDM", mode: "Implied",              hex: 0x42, flags: "--------", bytes: 2, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
  "XBA-Implied":             { opcode: "XBA", mode: "Implied",              hex: 0xEB, flags: "N-----Z-", bytes: 1, bytesModifiers: 0, cycles: 3, cyclesModifiers: 0         },
  "XCE-Implied":             { opcode: "XCE", mode: "Implied",              hex: 0xFB, flags: "--MX---C", bytes: 1, bytesModifiers: 0, cycles: 2, cyclesModifiers: 0         },
 } as const satisfies Record<Id, Meta>;

export const Asm65816InstructionMetaById = MetaById;

//==============================================================================
// Instruction Hex
//==============================================================================

type Hex = (typeof MetaById)[keyof typeof MetaById]["hex"];

export type Asm65816InstructionHex = Hex;

const IdByHex = {
  0x65: "ADC-Direct_Byte",
  0x63: "ADC-Direct_Byte_S",
  0x75: "ADC-Direct_Byte_X",
  0x6f: "ADC-Direct_Long",
  0x7f: "ADC-Direct_Long_X",
  0x6d: "ADC-Direct_Word",
  0x7d: "ADC-Direct_Word_X",
  0x79: "ADC-Direct_Word_Y",
  0x69: "ADC-Immediate",
  0x72: "ADC-Indirect_Byte",
  0x73: "ADC-Indirect_Byte_SY",
  0x61: "ADC-Indirect_Byte_X",
  0x71: "ADC-Indirect_Byte_Y",
  0x67: "ADC-IndirectLong_Byte",
  0x77: "ADC-IndirectLong_Byte_Y",
  0x25: "AND-Direct_Byte",
  0x23: "AND-Direct_Byte_S",
  0x35: "AND-Direct_Byte_X",
  0x2f: "AND-Direct_Long",
  0x3f: "AND-Direct_Long_X",
  0x2d: "AND-Direct_Word",
  0x3d: "AND-Direct_Word_X",
  0x39: "AND-Direct_Word_Y",
  0x29: "AND-Immediate",
  0x32: "AND-Indirect_Byte",
  0x33: "AND-Indirect_Byte_SY",
  0x21: "AND-Indirect_Byte_X",
  0x31: "AND-Indirect_Byte_Y",
  0x27: "AND-IndirectLong_Byte",
  0x37: "AND-IndirectLong_Byte_Y",
  0x0a: "ASL-Accumulator",
  0x06: "ASL-Direct_Byte",
  0x16: "ASL-Direct_Byte_X",
  0x0e: "ASL-Direct_Word",
  0x1e: "ASL-Direct_Word_X",
  0x90: "BCC-Direct_Byte",
  0xb0: "BCS-Direct_Byte",
  0xf0: "BEQ-Direct_Byte",
  0x24: "BIT-Direct_Byte",
  0x34: "BIT-Direct_Byte_X",
  0x2c: "BIT-Direct_Word",
  0x3c: "BIT-Direct_Word_X",
  0x89: "BIT-Immediate",
  0x30: "BMI-Direct_Byte",
  0xd0: "BNE-Direct_Byte",
  0x10: "BPL-Direct_Byte",
  0x80: "BRA-Direct_Byte",
  0x00: "BRK-Immediate",
  0x82: "BRL-Direct_Word",
  0x50: "BVC-Direct_Byte",
  0x70: "BVS-Direct_Byte",
  0x18: "CLC-Implied",
  0xd8: "CLD-Implied",
  0x58: "CLI-Implied",
  0xb8: "CLV-Implied",
  0xc5: "CMP-Direct_Byte",
  0xc3: "CMP-Direct_Byte_S",
  0xd5: "CMP-Direct_Byte_X",
  0xcf: "CMP-Direct_Long",
  0xdf: "CMP-Direct_Long_X",
  0xcd: "CMP-Direct_Word",
  0xdd: "CMP-Direct_Word_X",
  0xd9: "CMP-Direct_Word_Y",
  0xc9: "CMP-Immediate",
  0xd2: "CMP-Indirect_Byte",
  0xd3: "CMP-Indirect_Byte_SY",
  0xc1: "CMP-Indirect_Byte_X",
  0xd1: "CMP-Indirect_Byte_Y",
  0xc7: "CMP-IndirectLong_Byte",
  0xd7: "CMP-IndirectLong_Byte_Y",
  0x02: "COP-Immediate",
  0xe4: "CPX-Direct_Byte",
  0xec: "CPX-Direct_Word",
  0xe0: "CPX-Immediate",
  0xc4: "CPY-Direct_Byte",
  0xcc: "CPY-Direct_Word",
  0xc0: "CPY-Immediate",
  0x3a: "DEC-Accumulator",
  0xc6: "DEC-Direct_Byte",
  0xd6: "DEC-Direct_Byte_X",
  0xce: "DEC-Direct_Word",
  0xde: "DEC-Direct_Word_X",
  0xca: "DEX-Implied",
  0x88: "DEY-Implied",
  0x45: "EOR-Direct_Byte",
  0x43: "EOR-Direct_Byte_S",
  0x55: "EOR-Direct_Byte_X",
  0x4f: "EOR-Direct_Long",
  0x5f: "EOR-Direct_Long_X",
  0x4d: "EOR-Direct_Word",
  0x5d: "EOR-Direct_Word_X",
  0x59: "EOR-Direct_Word_Y",
  0x49: "EOR-Immediate",
  0x52: "EOR-Indirect_Byte",
  0x53: "EOR-Indirect_Byte_SY",
  0x41: "EOR-Indirect_Byte_X",
  0x51: "EOR-Indirect_Byte_Y",
  0x47: "EOR-IndirectLong_Byte",
  0x57: "EOR-IndirectLong_Byte_Y",
  0x1a: "INC-Accumulator",
  0xe6: "INC-Direct_Byte",
  0xf6: "INC-Direct_Byte_X",
  0xee: "INC-Direct_Word",
  0xfe: "INC-Direct_Word_X",
  0xe8: "INX-Implied",
  0xc8: "INY-Implied",
  0x5c: "JML-Direct_Long",
  0xdc: "JML-IndirectLong_Word",
  0x4c: "JMP-Direct_Word",
  0x6c: "JMP-Indirect_Word",
  0x7c: "JMP-Indirect_Word_X",
  0x22: "JSL-Direct_Long",
  0x20: "JSR-Direct_Word",
  0xfc: "JSR-Indirect_Word_X",
  0xa5: "LDA-Direct_Byte",
  0xa3: "LDA-Direct_Byte_S",
  0xb5: "LDA-Direct_Byte_X",
  0xaf: "LDA-Direct_Long",
  0xbf: "LDA-Direct_Long_X",
  0xad: "LDA-Direct_Word",
  0xbd: "LDA-Direct_Word_X",
  0xb9: "LDA-Direct_Word_Y",
  0xa9: "LDA-Immediate",
  0xb2: "LDA-Indirect_Byte",
  0xb3: "LDA-Indirect_Byte_SY",
  0xa1: "LDA-Indirect_Byte_X",
  0xb1: "LDA-Indirect_Byte_Y",
  0xa7: "LDA-IndirectLong_Byte",
  0xb7: "LDA-IndirectLong_Byte_Y",
  0xa6: "LDX-Direct_Byte",
  0xb6: "LDX-Direct_Byte_Y",
  0xae: "LDX-Direct_Word",
  0xbe: "LDX-Direct_Word_Y",
  0xa2: "LDX-Immediate",
  0xa4: "LDY-Direct_Byte",
  0xb4: "LDY-Direct_Byte_X",
  0xac: "LDY-Direct_Word",
  0xbc: "LDY-Direct_Word_X",
  0xa0: "LDY-Immediate",
  0x4a: "LSR-Accumulator",
  0x46: "LSR-Direct_Byte",
  0x56: "LSR-Direct_Byte_X",
  0x4e: "LSR-Direct_Word",
  0x5e: "LSR-Direct_Word_X",
  0x54: "MVN-Move",
  0x44: "MVP-Move",
  0xea: "NOP-Implied",
  0x05: "ORA-Direct_Byte",
  0x03: "ORA-Direct_Byte_S",
  0x15: "ORA-Direct_Byte_X",
  0x0f: "ORA-Direct_Long",
  0x1f: "ORA-Direct_Long_X",
  0x0d: "ORA-Direct_Word",
  0x1d: "ORA-Direct_Word_X",
  0x19: "ORA-Direct_Word_Y",
  0x09: "ORA-Immediate",
  0x12: "ORA-Indirect_Byte",
  0x13: "ORA-Indirect_Byte_SY",
  0x01: "ORA-Indirect_Byte_X",
  0x11: "ORA-Indirect_Byte_Y",
  0x07: "ORA-IndirectLong_Byte",
  0x17: "ORA-IndirectLong_Byte_Y",
  0xf4: "PEA-Direct_Word",
  0xd4: "PEI-Indirect_Byte",
  0x62: "PER-Direct_Word",
  0x48: "PHA-Implied",
  0x8b: "PHB-Implied",
  0x0b: "PHD-Implied",
  0x4b: "PHK-Implied",
  0x08: "PHP-Implied",
  0xda: "PHX-Implied",
  0x5a: "PHY-Implied",
  0x68: "PLA-Implied",
  0xab: "PLB-Implied",
  0x2b: "PLD-Implied",
  0x28: "PLP-Implied",
  0xfa: "PLX-Implied",
  0x7a: "PLY-Implied",
  0xc2: "REP-Immediate",
  0x2a: "ROL-Accumulator",
  0x26: "ROL-Direct_Byte",
  0x36: "ROL-Direct_Byte_X",
  0x2e: "ROL-Direct_Word",
  0x3e: "ROL-Direct_Word_X",
  0x6a: "ROR-Accumulator",
  0x66: "ROR-Direct_Byte",
  0x76: "ROR-Direct_Byte_X",
  0x6e: "ROR-Direct_Word",
  0x7e: "ROR-Direct_Word_X",
  0x40: "RTI-Implied",
  0x6b: "RTL-Implied",
  0x60: "RTS-Implied",
  0xe5: "SBC-Direct_Byte",
  0xe3: "SBC-Direct_Byte_S",
  0xf5: "SBC-Direct_Byte_X",
  0xef: "SBC-Direct_Long",
  0xff: "SBC-Direct_Long_X",
  0xed: "SBC-Direct_Word",
  0xfd: "SBC-Direct_Word_X",
  0xf9: "SBC-Direct_Word_Y",
  0xe9: "SBC-Immediate",
  0xf2: "SBC-Indirect_Byte",
  0xf3: "SBC-Indirect_Byte_SY",
  0xe1: "SBC-Indirect_Byte_X",
  0xf1: "SBC-Indirect_Byte_Y",
  0xe7: "SBC-IndirectLong_Byte",
  0xf7: "SBC-IndirectLong_Byte_Y",
  0x38: "SEC-Implied",
  0xf8: "SED-Implied",
  0x78: "SEI-Implied",
  0xe2: "SEP-Immediate",
  0x85: "STA-Direct_Byte",
  0x83: "STA-Direct_Byte_S",
  0x95: "STA-Direct_Byte_X",
  0x8f: "STA-Direct_Long",
  0x9f: "STA-Direct_Long_X",
  0x8d: "STA-Direct_Word",
  0x9d: "STA-Direct_Word_X",
  0x99: "STA-Direct_Word_Y",
  0x92: "STA-Indirect_Byte",
  0x93: "STA-Indirect_Byte_SY",
  0x81: "STA-Indirect_Byte_X",
  0x91: "STA-Indirect_Byte_Y",
  0x87: "STA-IndirectLong_Byte",
  0x97: "STA-IndirectLong_Byte_Y",
  0xdb: "STP-Implied",
  0x86: "STX-Direct_Byte",
  0x96: "STX-Direct_Byte_Y",
  0x8e: "STX-Direct_Word",
  0x84: "STY-Direct_Byte",
  0x94: "STY-Direct_Byte_X",
  0x8c: "STY-Direct_Word",
  0x64: "STZ-Direct_Byte",
  0x74: "STZ-Direct_Byte_X",
  0x9c: "STZ-Direct_Word",
  0x9e: "STZ-Direct_Word_X",
  0xaa: "TAX-Implied",
  0xa8: "TAY-Implied",
  0x5b: "TCD-Implied",
  0x1b: "TCS-Implied",
  0x7b: "TDC-Implied",
  0x14: "TRB-Direct_Byte",
  0x1c: "TRB-Direct_Word",
  0x04: "TSB-Direct_Byte",
  0x0c: "TSB-Direct_Word",
  0x3b: "TSC-Implied",
  0xba: "TSX-Implied",
  0x8a: "TXA-Implied",
  0x9a: "TXS-Implied",
  0x9b: "TXY-Implied",
  0x98: "TYA-Implied",
  0xbb: "TYX-Implied",
  0xcb: "WAI-Implied",
  0x42: "WDM-Implied",
  0xeb: "XBA-Implied",
  0xfb: "XCE-Implied",
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
        arg.h = integer.value & 0x00ff00;
        arg.value = (arg.h << 8) | arg.l;
        break;
      }
      case ArgsType.Long: {
        const args = ArgsLongSchema.safeParse(instruction.args);
        if (!args.success) return issueMismatch(ArgsType.Long);
        const longContext = { unit: IntegerUnit.Long };
        const integer = IntegerFromString(args.data[0].value, longContext);
        if (!integer) return issueInvalid(args.data[0].value);
        arg.l = integer.value & 0x0000ff;
        arg.h = integer.value & 0x00ff00;
        arg.b = integer.value & 0xff0000;
        arg.value = (arg.b << 16) | (arg.h << 8) | arg.l;
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
        arg.h = (integer2.value << 8) & 0x00ff00;
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
            arg.h = integer.value & 0x00ff00;
            arg.value = (arg.h << 8) | arg.l;
          }
        } else {
          const args = ArgsByteSchema.safeParse(instruction.args);
          if (!args.success) return issueMismatch(ArgsType.ByteOrWord);
          const byteContext = { unit: IntegerUnit.Byte };
          const integer = IntegerFromString(args.data[0].value, byteContext);
          if (!integer) return issueInvalid(args.data[0].value);
          arg.l = integer.value & 0x0000ff;
        }
        break;
      }
    }

    return { ...instruction, arg };
  });

type Instruction = z.infer<typeof InstructionSchema>;

export const Asm65816InstructionSchema = InstructionSchema;
export type Asm65816Instruction = Instruction;
