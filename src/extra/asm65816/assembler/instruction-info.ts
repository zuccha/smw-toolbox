export enum LabelType {
  None,
  Relative,
  RelativeLong,
  Absolute,
  AbsoluteLong,
}

export type InstructionInfo = {
  opcode: number;
  label_type: LabelType;
};

// prettier-ignore
export const instruction_id_to_instruction_info: Record<
  string,
  InstructionInfo
> = {
  "ADC-Absolute": /*                  */ { opcode: 0x6d, label_type: LabelType.None },
  "ADC-AbsoluteLong": /*              */ { opcode: 0x6f, label_type: LabelType.None },
  "ADC-AbsoluteLong_X": /*            */ { opcode: 0x7f, label_type: LabelType.None },
  "ADC-Absolute_X": /*                */ { opcode: 0x7d, label_type: LabelType.None },
  "ADC-Absolute_Y": /*                */ { opcode: 0x79, label_type: LabelType.None },
  "ADC-DirectPage": /*                */ { opcode: 0x65, label_type: LabelType.None },
  "ADC-DirectPage_Indirect": /*       */ { opcode: 0x72, label_type: LabelType.None },
  "ADC-DirectPage_IndirectLong": /*   */ { opcode: 0x67, label_type: LabelType.None },
  "ADC-DirectPage_IndirectLong_Y": /* */ { opcode: 0x77, label_type: LabelType.None },
  "ADC-DirectPage_Indirect_Y": /*     */ { opcode: 0x71, label_type: LabelType.None },
  "ADC-DirectPage_X": /*              */ { opcode: 0x75, label_type: LabelType.None },
  "ADC-DirectPage_X_Indirect": /*     */ { opcode: 0x61, label_type: LabelType.None },
  "ADC-Immediate_Byte": /*            */ { opcode: 0x69, label_type: LabelType.None },
  "ADC-Immediate_Label": /*           */ { opcode: 0x69, label_type: LabelType.Absolute },
  "ADC-Immediate_Word": /*            */ { opcode: 0x69, label_type: LabelType.None },
  "ADC-Label": /*                     */ { opcode: 0x6d, label_type: LabelType.Absolute },
  "ADC-Label_X": /*                   */ { opcode: 0x7d, label_type: LabelType.Absolute },
  "ADC-Label_Y": /*                   */ { opcode: 0x79, label_type: LabelType.Absolute },
  "ADC-StackRelative": /*             */ { opcode: 0x63, label_type: LabelType.None },
  "ADC-StackRelative_Indirect_Y": /*  */ { opcode: 0x73, label_type: LabelType.None },
  "AND-Absolute": /*                  */ { opcode: 0x2d, label_type: LabelType.None },
  "AND-AbsoluteLong": /*              */ { opcode: 0x2f, label_type: LabelType.None },
  "AND-AbsoluteLong_X": /*            */ { opcode: 0x3f, label_type: LabelType.None },
  "AND-Absolute_X": /*                */ { opcode: 0x3d, label_type: LabelType.None },
  "AND-Absolute_Y": /*                */ { opcode: 0x39, label_type: LabelType.None },
  "AND-DirectPage": /*                */ { opcode: 0x25, label_type: LabelType.None },
  "AND-DirectPage_Indirect": /*       */ { opcode: 0x32, label_type: LabelType.None },
  "AND-DirectPage_IndirectLong": /*   */ { opcode: 0x27, label_type: LabelType.None },
  "AND-DirectPage_IndirectLong_Y": /* */ { opcode: 0x37, label_type: LabelType.None },
  "AND-DirectPage_Indirect_Y": /*     */ { opcode: 0x31, label_type: LabelType.None },
  "AND-DirectPage_X": /*              */ { opcode: 0x35, label_type: LabelType.None },
  "AND-DirectPage_X_Indirect": /*     */ { opcode: 0x21, label_type: LabelType.None },
  "AND-Immediate_Byte": /*            */ { opcode: 0x29, label_type: LabelType.None },
  "AND-Immediate_Label": /*           */ { opcode: 0x29, label_type: LabelType.Absolute },
  "AND-Immediate_Word": /*            */ { opcode: 0x29, label_type: LabelType.None },
  "AND-Label": /*                     */ { opcode: 0x2d, label_type: LabelType.Absolute },
  "AND-Label_X": /*                   */ { opcode: 0x3d, label_type: LabelType.Absolute },
  "AND-Label_Y": /*                   */ { opcode: 0x39, label_type: LabelType.Absolute },
  "AND-StackRelative": /*             */ { opcode: 0x23, label_type: LabelType.None },
  "AND-StackRelative_Indirect_Y": /*  */ { opcode: 0x33, label_type: LabelType.None },
  "ASL-Absolute": /*                  */ { opcode: 0x0e, label_type: LabelType.None },
  "ASL-Absolute_X": /*                */ { opcode: 0x1e, label_type: LabelType.None },
  "ASL-Accumulator": /*               */ { opcode: 0x0a, label_type: LabelType.None },
  "ASL-DirectPage": /*                */ { opcode: 0x06, label_type: LabelType.None },
  "ASL-DirectPage_X": /*              */ { opcode: 0x16, label_type: LabelType.None },
  "ASL-Label": /*                     */ { opcode: 0x0e, label_type: LabelType.Absolute },
  "ASL-Label_X": /*                   */ { opcode: 0x1e, label_type: LabelType.Absolute },
  "BCC-DirectPage": /*                */ { opcode: 0x90, label_type: LabelType.None },
  "BCC-Label": /*                     */ { opcode: 0x90, label_type: LabelType.Relative },
  "BCS-DirectPage": /*                */ { opcode: 0xb0, label_type: LabelType.None },
  "BCS-Label": /*                     */ { opcode: 0xb0, label_type: LabelType.Relative },
  "BEQ-DirectPage": /*                */ { opcode: 0xf0, label_type: LabelType.None },
  "BEQ-Label": /*                     */ { opcode: 0xf0, label_type: LabelType.Relative },
  "BIT-Absolute": /*                  */ { opcode: 0x2c, label_type: LabelType.None },
  "BIT-Absolute_X": /*                */ { opcode: 0x3c, label_type: LabelType.None },
  "BIT-DirectPage": /*                */ { opcode: 0x24, label_type: LabelType.None },
  "BIT-DirectPage_X": /*              */ { opcode: 0x34, label_type: LabelType.None },
  "BIT-Immediate_Byte": /*            */ { opcode: 0x89, label_type: LabelType.None },
  "BIT-Immediate_Label": /*           */ { opcode: 0x89, label_type: LabelType.Absolute },
  "BIT-Immediate_Word": /*            */ { opcode: 0x89, label_type: LabelType.None },
  "BIT-Label": /*                     */ { opcode: 0x2c, label_type: LabelType.Absolute },
  "BIT-Label_X": /*                   */ { opcode: 0x3c, label_type: LabelType.Absolute },
  "BMI-DirectPage": /*                */ { opcode: 0x30, label_type: LabelType.None },
  "BMI-Label": /*                     */ { opcode: 0x30, label_type: LabelType.Relative },
  "BNE-DirectPage": /*                */ { opcode: 0xd0, label_type: LabelType.None },
  "BNE-Label": /*                     */ { opcode: 0xd0, label_type: LabelType.Relative },
  "BPL-DirectPage": /*                */ { opcode: 0x10, label_type: LabelType.None },
  "BPL-Label": /*                     */ { opcode: 0x10, label_type: LabelType.Relative },
  "BRA-DirectPage": /*                */ { opcode: 0x80, label_type: LabelType.None },
  "BRA-Label": /*                     */ { opcode: 0x80, label_type: LabelType.Relative },
  "BRK-Immediate_Byte": /*            */ { opcode: 0x00, label_type: LabelType.None },
  "BRL-Absolute": /*                  */ { opcode: 0x82, label_type: LabelType.None },
  "BRL-Label": /*                     */ { opcode: 0x82, label_type: LabelType.RelativeLong },
  "BVC-DirectPage": /*                */ { opcode: 0x50, label_type: LabelType.None },
  "BVC-Label": /*                     */ { opcode: 0x50, label_type: LabelType.Relative },
  "BVS-DirectPage": /*                */ { opcode: 0x70, label_type: LabelType.None },
  "BVS-Label": /*                     */ { opcode: 0x70, label_type: LabelType.Relative },
  "CLC-Implied": /*                   */ { opcode: 0x18, label_type: LabelType.None },
  "CLD-Implied": /*                   */ { opcode: 0xd8, label_type: LabelType.None },
  "CLI-Implied": /*                   */ { opcode: 0x58, label_type: LabelType.None },
  "CLV-Implied": /*                   */ { opcode: 0xb8, label_type: LabelType.None },
  "CMP-Absolute": /*                  */ { opcode: 0xcd, label_type: LabelType.None },
  "CMP-AbsoluteLong": /*              */ { opcode: 0xcf, label_type: LabelType.None },
  "CMP-AbsoluteLong_X": /*            */ { opcode: 0xdf, label_type: LabelType.None },
  "CMP-Absolute_X": /*                */ { opcode: 0xdd, label_type: LabelType.None },
  "CMP-Absolute_Y": /*                */ { opcode: 0xd9, label_type: LabelType.None },
  "CMP-DirectPage": /*                */ { opcode: 0xc5, label_type: LabelType.None },
  "CMP-DirectPage_Indirect": /*       */ { opcode: 0xd2, label_type: LabelType.None },
  "CMP-DirectPage_IndirectLong": /*   */ { opcode: 0xc7, label_type: LabelType.None },
  "CMP-DirectPage_IndirectLong_Y": /* */ { opcode: 0xd7, label_type: LabelType.None },
  "CMP-DirectPage_Indirect_Y": /*     */ { opcode: 0xd1, label_type: LabelType.None },
  "CMP-DirectPage_X": /*              */ { opcode: 0xd5, label_type: LabelType.None },
  "CMP-DirectPage_X_Indirect": /*     */ { opcode: 0xc1, label_type: LabelType.None },
  "CMP-Immediate_Byte": /*            */ { opcode: 0xc9, label_type: LabelType.None },
  "CMP-Immediate_Label": /*           */ { opcode: 0xc9, label_type: LabelType.Absolute },
  "CMP-Immediate_Word": /*            */ { opcode: 0xc9, label_type: LabelType.None },
  "CMP-Label": /*                     */ { opcode: 0xcd, label_type: LabelType.Absolute },
  "CMP-Label_X": /*                   */ { opcode: 0xdd, label_type: LabelType.Absolute },
  "CMP-Label_Y": /*                   */ { opcode: 0xd9, label_type: LabelType.Absolute },
  "CMP-StackRelative": /*             */ { opcode: 0xc3, label_type: LabelType.None },
  "CMP-StackRelative_Indirect_Y": /*  */ { opcode: 0xd3, label_type: LabelType.None },
  "COP-Immediate_Byte": /*            */ { opcode: 0x02, label_type: LabelType.None },
  "CPX-Absolute": /*                  */ { opcode: 0xec, label_type: LabelType.None },
  "CPX-DirectPage": /*                */ { opcode: 0xe4, label_type: LabelType.None },
  "CPX-Immediate_Byte": /*            */ { opcode: 0xe0, label_type: LabelType.None },
  "CPX-Immediate_Label": /*           */ { opcode: 0xe0, label_type: LabelType.Absolute },
  "CPX-Immediate_Word": /*            */ { opcode: 0xe0, label_type: LabelType.None },
  "CPX-Label": /*                     */ { opcode: 0xec, label_type: LabelType.Absolute },
  "CPY-Absolute": /*                  */ { opcode: 0xcc, label_type: LabelType.None },
  "CPY-DirectPage": /*                */ { opcode: 0xc4, label_type: LabelType.None },
  "CPY-Immediate_Byte": /*            */ { opcode: 0xc0, label_type: LabelType.None },
  "CPY-Immediate_Label": /*           */ { opcode: 0xc0, label_type: LabelType.Absolute },
  "CPY-Immediate_Word": /*            */ { opcode: 0xc0, label_type: LabelType.None },
  "CPY-Label": /*                     */ { opcode: 0xcc, label_type: LabelType.Absolute },
  "DEC-Absolute": /*                  */ { opcode: 0xce, label_type: LabelType.None },
  "DEC-Absolute_X": /*                */ { opcode: 0xde, label_type: LabelType.None },
  "DEC-Accumulator": /*               */ { opcode: 0x3a, label_type: LabelType.None },
  "DEC-DirectPage": /*                */ { opcode: 0xc6, label_type: LabelType.None },
  "DEC-DirectPage_X": /*              */ { opcode: 0xd6, label_type: LabelType.None },
  "DEC-Label": /*                     */ { opcode: 0xce, label_type: LabelType.Absolute },
  "DEC-Label_X": /*                   */ { opcode: 0xde, label_type: LabelType.Absolute },
  "DEX-Implied": /*                   */ { opcode: 0xca, label_type: LabelType.None },
  "DEY-Implied": /*                   */ { opcode: 0x88, label_type: LabelType.None },
  "EOR-Absolute": /*                  */ { opcode: 0x4d, label_type: LabelType.None },
  "EOR-AbsoluteLong": /*              */ { opcode: 0x4f, label_type: LabelType.None },
  "EOR-AbsoluteLong_X": /*            */ { opcode: 0x5f, label_type: LabelType.None },
  "EOR-Absolute_X": /*                */ { opcode: 0x5d, label_type: LabelType.None },
  "EOR-Absolute_Y": /*                */ { opcode: 0x59, label_type: LabelType.None },
  "EOR-DirectPage": /*                */ { opcode: 0x45, label_type: LabelType.None },
  "EOR-DirectPage_Indirect": /*       */ { opcode: 0x52, label_type: LabelType.None },
  "EOR-DirectPage_IndirectLong": /*   */ { opcode: 0x47, label_type: LabelType.None },
  "EOR-DirectPage_IndirectLong_Y": /* */ { opcode: 0x57, label_type: LabelType.None },
  "EOR-DirectPage_Indirect_Y": /*     */ { opcode: 0x51, label_type: LabelType.None },
  "EOR-DirectPage_X": /*              */ { opcode: 0x55, label_type: LabelType.None },
  "EOR-DirectPage_X_Indirect": /*     */ { opcode: 0x41, label_type: LabelType.None },
  "EOR-Immediate_Byte": /*            */ { opcode: 0x49, label_type: LabelType.None },
  "EOR-Immediate_Label": /*           */ { opcode: 0x49, label_type: LabelType.Absolute },
  "EOR-Immediate_Word": /*            */ { opcode: 0x49, label_type: LabelType.None },
  "EOR-Label": /*                     */ { opcode: 0x4d, label_type: LabelType.Absolute },
  "EOR-Label_X": /*                   */ { opcode: 0x5d, label_type: LabelType.Absolute },
  "EOR-Label_Y": /*                   */ { opcode: 0x59, label_type: LabelType.Absolute },
  "EOR-StackRelative": /*             */ { opcode: 0x43, label_type: LabelType.None },
  "EOR-StackRelative_Indirect_Y": /*  */ { opcode: 0x53, label_type: LabelType.None },
  "INC-Absolute": /*                  */ { opcode: 0xee, label_type: LabelType.None },
  "INC-Absolute_X": /*                */ { opcode: 0xfe, label_type: LabelType.None },
  "INC-Accumulator": /*               */ { opcode: 0x1a, label_type: LabelType.None },
  "INC-DirectPage": /*                */ { opcode: 0xe6, label_type: LabelType.None },
  "INC-DirectPage_X": /*              */ { opcode: 0xf6, label_type: LabelType.None },
  "INC-Label": /*                     */ { opcode: 0xee, label_type: LabelType.Absolute },
  "INC-Label_X": /*                   */ { opcode: 0xfe, label_type: LabelType.Absolute },
  "INX-Implied": /*                   */ { opcode: 0xe8, label_type: LabelType.None },
  "INY-Implied": /*                   */ { opcode: 0xc8, label_type: LabelType.None },
  "JML-AbsoluteLong": /*              */ { opcode: 0x5c, label_type: LabelType.None },
  "JML-Absolute_IndirectLong": /*     */ { opcode: 0xdc, label_type: LabelType.None },
  "JML-Label": /*                     */ { opcode: 0x5c, label_type: LabelType.AbsoluteLong },
  "JML-Label_IndirectLong": /*        */ { opcode: 0xdc, label_type: LabelType.Absolute },
  "JMP-Absolute": /*                  */ { opcode: 0x4c, label_type: LabelType.None },
  "JMP-Absolute_Indirect": /*         */ { opcode: 0x6c, label_type: LabelType.None },
  "JMP-Absolute_X_Indirect": /*       */ { opcode: 0x7c, label_type: LabelType.None },
  "JMP-Label": /*                     */ { opcode: 0x4c, label_type: LabelType.Absolute },
  "JMP-Label_Indirect": /*            */ { opcode: 0x6c, label_type: LabelType.Absolute },
  "JMP-Label_X_Indirect": /*          */ { opcode: 0x7c, label_type: LabelType.Absolute },
  "JSL-AbsoluteLong": /*              */ { opcode: 0x22, label_type: LabelType.None },
  "JSL-Label": /*                     */ { opcode: 0x22, label_type: LabelType.AbsoluteLong },
  "JSR-Absolute": /*                  */ { opcode: 0x20, label_type: LabelType.None },
  "JSR-Absolute_X_Indirect": /*       */ { opcode: 0xfc, label_type: LabelType.None },
  "JSR-Label": /*                     */ { opcode: 0x20, label_type: LabelType.Absolute },
  "JSR-Label_X_Indirect": /*          */ { opcode: 0xfc, label_type: LabelType.Absolute },
  "LDA-Absolute": /*                  */ { opcode: 0xad, label_type: LabelType.None },
  "LDA-AbsoluteLong": /*              */ { opcode: 0xaf, label_type: LabelType.None },
  "LDA-AbsoluteLong_X": /*            */ { opcode: 0xbf, label_type: LabelType.None },
  "LDA-Absolute_X": /*                */ { opcode: 0xbd, label_type: LabelType.None },
  "LDA-Absolute_Y": /*                */ { opcode: 0xb9, label_type: LabelType.None },
  "LDA-DirectPage": /*                */ { opcode: 0xa5, label_type: LabelType.None },
  "LDA-DirectPage_Indirect": /*       */ { opcode: 0xb2, label_type: LabelType.None },
  "LDA-DirectPage_IndirectLong": /*   */ { opcode: 0xa7, label_type: LabelType.None },
  "LDA-DirectPage_IndirectLong_Y": /* */ { opcode: 0xb7, label_type: LabelType.None },
  "LDA-DirectPage_Indirect_Y": /*     */ { opcode: 0xb1, label_type: LabelType.None },
  "LDA-DirectPage_X": /*              */ { opcode: 0xb5, label_type: LabelType.None },
  "LDA-DirectPage_X_Indirect": /*     */ { opcode: 0xa1, label_type: LabelType.None },
  "LDA-Immediate_Byte": /*            */ { opcode: 0xa9, label_type: LabelType.None },
  "LDA-Immediate_Label": /*           */ { opcode: 0xa9, label_type: LabelType.Absolute },
  "LDA-Immediate_Word": /*            */ { opcode: 0xa9, label_type: LabelType.None },
  "LDA-Label": /*                     */ { opcode: 0xad, label_type: LabelType.Absolute },
  "LDA-Label_X": /*                   */ { opcode: 0xbd, label_type: LabelType.Absolute },
  "LDA-Label_Y": /*                   */ { opcode: 0xb9, label_type: LabelType.Absolute },
  "LDA-StackRelative": /*             */ { opcode: 0xa3, label_type: LabelType.None },
  "LDA-StackRelative_Indirect_Y": /*  */ { opcode: 0xb3, label_type: LabelType.None },
  "LDX-Absolute": /*                  */ { opcode: 0xae, label_type: LabelType.None },
  "LDX-Absolute_Y": /*                */ { opcode: 0xbe, label_type: LabelType.None },
  "LDX-DirectPage": /*                */ { opcode: 0xa6, label_type: LabelType.None },
  "LDX-DirectPage_Y": /*              */ { opcode: 0xb6, label_type: LabelType.None },
  "LDX-Immediate_Byte": /*            */ { opcode: 0xa2, label_type: LabelType.None },
  "LDX-Immediate_Label": /*           */ { opcode: 0xa2, label_type: LabelType.Absolute },
  "LDX-Immediate_Word": /*            */ { opcode: 0xa2, label_type: LabelType.None },
  "LDX-Label": /*                     */ { opcode: 0xae, label_type: LabelType.Absolute },
  "LDX-Label_Y": /*                   */ { opcode: 0xbe, label_type: LabelType.Absolute },
  "LDY-Absolute": /*                  */ { opcode: 0xac, label_type: LabelType.None },
  "LDY-Absolute_X": /*                */ { opcode: 0xbc, label_type: LabelType.None },
  "LDY-DirectPage": /*                */ { opcode: 0xa4, label_type: LabelType.None },
  "LDY-DirectPage_X": /*              */ { opcode: 0xb4, label_type: LabelType.None },
  "LDY-Immediate_Byte": /*            */ { opcode: 0xa0, label_type: LabelType.None },
  "LDY-Immediate_Label": /*           */ { opcode: 0xa0, label_type: LabelType.Absolute },
  "LDY-Immediate_Word": /*            */ { opcode: 0xa0, label_type: LabelType.None },
  "LDY-Label": /*                     */ { opcode: 0xac, label_type: LabelType.Absolute },
  "LDY-Label_X": /*                   */ { opcode: 0xbc, label_type: LabelType.Absolute },
  "LSR-Absolute": /*                  */ { opcode: 0x4e, label_type: LabelType.None },
  "LSR-Absolute_X": /*                */ { opcode: 0x5e, label_type: LabelType.None },
  "LSR-Accumulator": /*               */ { opcode: 0x4a, label_type: LabelType.None },
  "LSR-DirectPage": /*                */ { opcode: 0x46, label_type: LabelType.None },
  "LSR-DirectPage_X": /*              */ { opcode: 0x56, label_type: LabelType.None },
  "LSR-Label": /*                     */ { opcode: 0x4e, label_type: LabelType.Absolute },
  "LSR-Label_X": /*                   */ { opcode: 0x5e, label_type: LabelType.Absolute },
  "MVN-BlockMove": /*                 */ { opcode: 0x54, label_type: LabelType.None },
  "MVP-BlockMove": /*                 */ { opcode: 0x44, label_type: LabelType.None },
  "NOP-Implied": /*                   */ { opcode: 0xea, label_type: LabelType.None },
  "ORA-Absolute": /*                  */ { opcode: 0x0d, label_type: LabelType.None },
  "ORA-AbsoluteLong": /*              */ { opcode: 0x0f, label_type: LabelType.None },
  "ORA-AbsoluteLong_X": /*            */ { opcode: 0x1f, label_type: LabelType.None },
  "ORA-Absolute_X": /*                */ { opcode: 0x1d, label_type: LabelType.None },
  "ORA-Absolute_Y": /*                */ { opcode: 0x19, label_type: LabelType.None },
  "ORA-DirectPage": /*                */ { opcode: 0x05, label_type: LabelType.None },
  "ORA-DirectPage_Indirect": /*       */ { opcode: 0x12, label_type: LabelType.None },
  "ORA-DirectPage_IndirectLong": /*   */ { opcode: 0x07, label_type: LabelType.None },
  "ORA-DirectPage_IndirectLong_Y": /* */ { opcode: 0x17, label_type: LabelType.None },
  "ORA-DirectPage_Indirect_Y": /*     */ { opcode: 0x11, label_type: LabelType.None },
  "ORA-DirectPage_X": /*              */ { opcode: 0x15, label_type: LabelType.None },
  "ORA-DirectPage_X_Indirect": /*     */ { opcode: 0x01, label_type: LabelType.None },
  "ORA-Immediate_Byte": /*            */ { opcode: 0x09, label_type: LabelType.None },
  "ORA-Immediate_Label": /*           */ { opcode: 0x09, label_type: LabelType.Absolute },
  "ORA-Immediate_Word": /*            */ { opcode: 0x09, label_type: LabelType.None },
  "ORA-Label": /*                     */ { opcode: 0x0d, label_type: LabelType.Absolute },
  "ORA-Label_X": /*                   */ { opcode: 0x1d, label_type: LabelType.Absolute },
  "ORA-Label_Y": /*                   */ { opcode: 0x19, label_type: LabelType.Absolute },
  "ORA-StackRelative": /*             */ { opcode: 0x03, label_type: LabelType.None },
  "ORA-StackRelative_Indirect_Y": /*  */ { opcode: 0x13, label_type: LabelType.None },
  "PEA-Absolute": /*                  */ { opcode: 0xf4, label_type: LabelType.None },
  "PEA-Label": /*                     */ { opcode: 0xf4, label_type: LabelType.Absolute },
  "PEI-DirectPage_Indirect": /*       */ { opcode: 0xd4, label_type: LabelType.None },
  "PER-Absolute": /*                  */ { opcode: 0x62, label_type: LabelType.None },
  "PER-Label": /*                     */ { opcode: 0x62, label_type: LabelType.RelativeLong },
  "PHA-Implied": /*                   */ { opcode: 0x48, label_type: LabelType.None },
  "PHB-Implied": /*                   */ { opcode: 0x8b, label_type: LabelType.None },
  "PHD-Implied": /*                   */ { opcode: 0x0b, label_type: LabelType.None },
  "PHK-Implied": /*                   */ { opcode: 0x4b, label_type: LabelType.None },
  "PHP-Implied": /*                   */ { opcode: 0x08, label_type: LabelType.None },
  "PHX-Implied": /*                   */ { opcode: 0xda, label_type: LabelType.None },
  "PHY-Implied": /*                   */ { opcode: 0x5a, label_type: LabelType.None },
  "PLA-Implied": /*                   */ { opcode: 0x68, label_type: LabelType.None },
  "PLB-Implied": /*                   */ { opcode: 0xab, label_type: LabelType.None },
  "PLD-Implied": /*                   */ { opcode: 0x2b, label_type: LabelType.None },
  "PLP-Implied": /*                   */ { opcode: 0x28, label_type: LabelType.None },
  "PLX-Implied": /*                   */ { opcode: 0xfa, label_type: LabelType.None },
  "PLY-Implied": /*                   */ { opcode: 0x7a, label_type: LabelType.None },
  "REP-Immediate_Byte": /*            */ { opcode: 0xc2, label_type: LabelType.None },
  "ROL-Absolute": /*                  */ { opcode: 0x2e, label_type: LabelType.None },
  "ROL-Absolute_X": /*                */ { opcode: 0x3e, label_type: LabelType.None },
  "ROL-Accumulator": /*               */ { opcode: 0x2a, label_type: LabelType.None },
  "ROL-DirectPage": /*                */ { opcode: 0x26, label_type: LabelType.None },
  "ROL-DirectPage_X": /*              */ { opcode: 0x36, label_type: LabelType.None },
  "ROL-Label": /*                     */ { opcode: 0x2e, label_type: LabelType.Absolute },
  "ROL-Label_X": /*                   */ { opcode: 0x3e, label_type: LabelType.Absolute },
  "ROR-Absolute": /*                  */ { opcode: 0x6e, label_type: LabelType.None },
  "ROR-Absolute_X": /*                */ { opcode: 0x7e, label_type: LabelType.None },
  "ROR-Accumulator": /*               */ { opcode: 0x6a, label_type: LabelType.None },
  "ROR-DirectPage": /*                */ { opcode: 0x66, label_type: LabelType.None },
  "ROR-DirectPage_X": /*              */ { opcode: 0x76, label_type: LabelType.None },
  "ROR-Label": /*                     */ { opcode: 0x6e, label_type: LabelType.Absolute },
  "ROR-Label_X": /*                   */ { opcode: 0x7e, label_type: LabelType.Absolute },
  "RTI-Implied": /*                   */ { opcode: 0x40, label_type: LabelType.None },
  "RTL-Implied": /*                   */ { opcode: 0x6b, label_type: LabelType.None },
  "RTS-Implied": /*                   */ { opcode: 0x60, label_type: LabelType.None },
  "SBC-Absolute": /*                  */ { opcode: 0xed, label_type: LabelType.None },
  "SBC-AbsoluteLong": /*              */ { opcode: 0xef, label_type: LabelType.None },
  "SBC-AbsoluteLong_X": /*            */ { opcode: 0xff, label_type: LabelType.None },
  "SBC-Absolute_X": /*                */ { opcode: 0xfd, label_type: LabelType.None },
  "SBC-Absolute_Y": /*                */ { opcode: 0xf9, label_type: LabelType.None },
  "SBC-DirectPage": /*                */ { opcode: 0xe5, label_type: LabelType.None },
  "SBC-DirectPage_Indirect": /*       */ { opcode: 0xf2, label_type: LabelType.None },
  "SBC-DirectPage_IndirectLong": /*   */ { opcode: 0xe7, label_type: LabelType.None },
  "SBC-DirectPage_IndirectLong_Y": /* */ { opcode: 0xf7, label_type: LabelType.None },
  "SBC-DirectPage_Indirect_Y": /*     */ { opcode: 0xf1, label_type: LabelType.None },
  "SBC-DirectPage_X": /*              */ { opcode: 0xf5, label_type: LabelType.None },
  "SBC-DirectPage_X_Indirect": /*     */ { opcode: 0xe1, label_type: LabelType.None },
  "SBC-Immediate_Byte": /*            */ { opcode: 0xe9, label_type: LabelType.None },
  "SBC-Immediate_Label": /*           */ { opcode: 0xe9, label_type: LabelType.Absolute },
  "SBC-Immediate_Word": /*            */ { opcode: 0xe9, label_type: LabelType.None },
  "SBC-Label": /*                     */ { opcode: 0xed, label_type: LabelType.Absolute },
  "SBC-Label_X": /*                   */ { opcode: 0xfd, label_type: LabelType.Absolute },
  "SBC-Label_Y": /*                   */ { opcode: 0xf9, label_type: LabelType.Absolute },
  "SBC-StackRelative": /*             */ { opcode: 0xe3, label_type: LabelType.None },
  "SBC-StackRelative_Indirect_Y": /*  */ { opcode: 0xf3, label_type: LabelType.None },
  "SEC-Implied": /*                   */ { opcode: 0x38, label_type: LabelType.None },
  "SED-Implied": /*                   */ { opcode: 0xf8, label_type: LabelType.None },
  "SEI-Implied": /*                   */ { opcode: 0x78, label_type: LabelType.None },
  "SEP-Immediate_Byte": /*            */ { opcode: 0xe2, label_type: LabelType.None },
  "STA-Absolute": /*                  */ { opcode: 0x8d, label_type: LabelType.None },
  "STA-AbsoluteLong": /*              */ { opcode: 0x8f, label_type: LabelType.None },
  "STA-AbsoluteLong_X": /*            */ { opcode: 0x9f, label_type: LabelType.None },
  "STA-Absolute_X": /*                */ { opcode: 0x9d, label_type: LabelType.None },
  "STA-Absolute_Y": /*                */ { opcode: 0x99, label_type: LabelType.None },
  "STA-DirectPage": /*                */ { opcode: 0x85, label_type: LabelType.None },
  "STA-DirectPage_Indirect": /*       */ { opcode: 0x92, label_type: LabelType.None },
  "STA-DirectPage_IndirectLong": /*   */ { opcode: 0x87, label_type: LabelType.None },
  "STA-DirectPage_IndirectLong_Y": /* */ { opcode: 0x97, label_type: LabelType.None },
  "STA-DirectPage_Indirect_Y": /*     */ { opcode: 0x91, label_type: LabelType.None },
  "STA-DirectPage_X": /*              */ { opcode: 0x95, label_type: LabelType.None },
  "STA-DirectPage_X_Indirect": /*     */ { opcode: 0x81, label_type: LabelType.None },
  "STA-Label": /*                     */ { opcode: 0x8d, label_type: LabelType.Absolute },
  "STA-Label_X": /*                   */ { opcode: 0x9d, label_type: LabelType.Absolute },
  "STA-Label_Y": /*                   */ { opcode: 0x99, label_type: LabelType.Absolute },
  "STA-StackRelative": /*             */ { opcode: 0x83, label_type: LabelType.None },
  "STA-StackRelative_Indirect_Y": /*  */ { opcode: 0x93, label_type: LabelType.None },
  "STP-Implied": /*                   */ { opcode: 0xdb, label_type: LabelType.None },
  "STX-Absolute": /*                  */ { opcode: 0x8e, label_type: LabelType.None },
  "STX-DirectPage": /*                */ { opcode: 0x86, label_type: LabelType.None },
  "STX-DirectPage_Y": /*              */ { opcode: 0x96, label_type: LabelType.None },
  "STX-Label": /*                     */ { opcode: 0x8e, label_type: LabelType.Absolute },
  "STY-Absolute": /*                  */ { opcode: 0x8c, label_type: LabelType.None },
  "STY-DirectPage": /*                */ { opcode: 0x84, label_type: LabelType.None },
  "STY-DirectPage_X": /*              */ { opcode: 0x94, label_type: LabelType.None },
  "STY-Label": /*                     */ { opcode: 0x8c, label_type: LabelType.Absolute },
  "STZ-Absolute": /*                  */ { opcode: 0x9c, label_type: LabelType.None },
  "STZ-Absolute_X": /*                */ { opcode: 0x9e, label_type: LabelType.None },
  "STZ-DirectPage": /*                */ { opcode: 0x64, label_type: LabelType.None },
  "STZ-DirectPage_X": /*              */ { opcode: 0x74, label_type: LabelType.None },
  "STZ-Label": /*                     */ { opcode: 0x9c, label_type: LabelType.Absolute },
  "STZ-Label_X": /*                   */ { opcode: 0x9e, label_type: LabelType.Absolute },
  "TAX-Implied": /*                   */ { opcode: 0xaa, label_type: LabelType.None },
  "TAY-Implied": /*                   */ { opcode: 0xa8, label_type: LabelType.None },
  "TCD-Implied": /*                   */ { opcode: 0x5b, label_type: LabelType.None },
  "TCS-Implied": /*                   */ { opcode: 0x1b, label_type: LabelType.None },
  "TDC-Implied": /*                   */ { opcode: 0x7b, label_type: LabelType.None },
  "TRB-Absolute": /*                  */ { opcode: 0x1c, label_type: LabelType.None },
  "TRB-DirectPage": /*                */ { opcode: 0x14, label_type: LabelType.None },
  "TRB-Label": /*                     */ { opcode: 0x1c, label_type: LabelType.Absolute },
  "TSB-Absolute": /*                  */ { opcode: 0x0c, label_type: LabelType.None },
  "TSB-DirectPage": /*                */ { opcode: 0x04, label_type: LabelType.None },
  "TSB-Label": /*                     */ { opcode: 0x0c, label_type: LabelType.Absolute },
  "TSC-Implied": /*                   */ { opcode: 0x3b, label_type: LabelType.None },
  "TSX-Implied": /*                   */ { opcode: 0xba, label_type: LabelType.None },
  "TXA-Implied": /*                   */ { opcode: 0x8a, label_type: LabelType.None },
  "TXS-Implied": /*                   */ { opcode: 0x9a, label_type: LabelType.None },
  "TXY-Implied": /*                   */ { opcode: 0x9b, label_type: LabelType.None },
  "TYA-Implied": /*                   */ { opcode: 0x98, label_type: LabelType.None },
  "TYX-Implied": /*                   */ { opcode: 0xbb, label_type: LabelType.None },
  "WAI-Implied": /*                   */ { opcode: 0xcb, label_type: LabelType.None },
  "WDM-Immediate_Byte": /*            */ { opcode: 0x42, label_type: LabelType.None },
  "XBA-Implied": /*                   */ { opcode: 0xeb, label_type: LabelType.None },
  "XCE-Implied": /*                   */ { opcode: 0xfb, label_type: LabelType.None },
};
