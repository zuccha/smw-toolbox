import { ADC } from "./instructions/adc";
import { AND } from "./instructions/and";
import { ASL } from "./instructions/asl";
import {
  BCC,
  BCS,
  BNE,
  BEQ,
  BPL,
  BMI,
  BVC,
  BVS,
  BRA,
  BRL,
} from "./instructions/b__";
import { BIT } from "./instructions/bit";
import { BRK } from "./instructions/brk";
import { CLC } from "./instructions/clc";
import { CLD } from "./instructions/cld";
import { CLI } from "./instructions/cli";
import { CLV } from "./instructions/clv";
import { CMP } from "./instructions/cmp";
import { COP } from "./instructions/cop";
import { CPX } from "./instructions/cpx";
import { CPY } from "./instructions/cpy";
import { DEC } from "./instructions/dec";
import { DEX } from "./instructions/dex";
import { DEY } from "./instructions/dey";
import { EOR } from "./instructions/eor";
import { INC } from "./instructions/inc";
import { INX } from "./instructions/inx";
import { INY } from "./instructions/iny";
import { JMP } from "./instructions/jmp";
import { JSR } from "./instructions/jsr";
import { LDA } from "./instructions/lda";
import { LDX } from "./instructions/ldx";
import { LDY } from "./instructions/ldy";
import { LSR } from "./instructions/lsr";
import { MVN } from "./instructions/mvn";
import { MVP } from "./instructions/mvp";
import { NOP } from "./instructions/nop";
import { ORA } from "./instructions/ora";
import { PEA } from "./instructions/pea";
import { PEI } from "./instructions/pei";
import { PER } from "./instructions/per";
import { PHA, PHX, PHY, PHB, PHD, PHP, PHK } from "./instructions/ph_";
import { PLA, PLX, PLY, PLB, PLD, PLP } from "./instructions/pl_";
import { REP } from "./instructions/rep";
import { ROL } from "./instructions/rol";
import { ROR } from "./instructions/ror";
import { RTI } from "./instructions/rti";
import { RTL } from "./instructions/rtl";
import { RTS } from "./instructions/rts";
import { SBC } from "./instructions/sbc";
import { SEC } from "./instructions/sec";
import { SED } from "./instructions/sed";
import { SEI } from "./instructions/sei";
import { SEP } from "./instructions/sep";
import { STA } from "./instructions/sta";
import { STP } from "./instructions/stp";
import { STX } from "./instructions/stx";
import { STY } from "./instructions/sty";
import { STZ } from "./instructions/stz";
import {
  TAX,
  TAY,
  TCD,
  TCS,
  TDC,
  TSC,
  TSX,
  TXA,
  TXS,
  TXY,
  TYA,
  TYX,
} from "./instructions/t__";
import { TRB } from "./instructions/trb";
import { TSB } from "./instructions/tsb";
import { WAI } from "./instructions/wai";
import { WDM } from "./instructions/wdm";
import { XBA } from "./instructions/xba";
import { XCE } from "./instructions/xce";

export const opcode_to_instruction = {
  [0x69]: ADC.Immediate_VariableA, // ADC #const
  [0x65]: ADC.DirectPage, // ADC dp
  [0x75]: ADC.DirectPage_X, // ADC dp,x
  [0x72]: ADC.DirectPage_Indirect, // ADC (dp)
  [0x61]: ADC.DirectPage_X_Indirect, // ADC (dp,x)
  [0x71]: ADC.DirectPage_Indirect_Y, // ADC (dp),y
  [0x67]: ADC.DirectPage_IndirectLong, // ADC [dp]
  [0x77]: ADC.DirectPage_IndirectLong_Y, // ADC [dp],y
  [0x6d]: ADC.Absolute, // ADC addr
  [0x7d]: ADC.Absolute_X, // ADC addr,x
  [0x79]: ADC.Absolute_Y, // ADC addr,y
  [0x6f]: ADC.AbsoluteLong, // ADC long
  [0x7f]: ADC.AbsoluteLong_X, // ADC long,x
  [0x63]: ADC.StackRelative, // ADC sr,s
  [0x73]: ADC.StackRelative_Indirect_Y, // ADC (sr,s),y

  [0x29]: AND.Immediate_VariableA, // AND #const
  [0x25]: AND.DirectPage, // AND dp
  [0x35]: AND.DirectPage_X, // AND dp,x
  [0x32]: AND.DirectPage_Indirect, // AND (dp)
  [0x21]: AND.DirectPage_X_Indirect, // AND (dp,x)
  [0x31]: AND.DirectPage_Indirect_Y, // AND (dp),y
  [0x27]: AND.DirectPage_IndirectLong, // AND [dp]
  [0x37]: AND.DirectPage_IndirectLong_Y, // AND [dp],y
  [0x2d]: AND.Absolute, // AND addr
  [0x3d]: AND.Absolute_X, // AND addr,x
  [0x39]: AND.Absolute_Y, // AND addr,y
  [0x2f]: AND.AbsoluteLong, // AND long
  [0x3f]: AND.AbsoluteLong_X, // AND long,x
  [0x23]: AND.StackRelative, // AND sr,s
  [0x33]: AND.StackRelative_Indirect_Y, // AND (sr,s),y

  [0x0a]: ASL.Accumulator, // ASL A
  [0x06]: ASL.DirectPage, // ASL dp
  [0x16]: ASL.DirectPage_X, // ASL dp,x
  [0x0e]: ASL.Absolute, // ASL addr
  [0x1e]: ASL.Absolute_X, // ASL addr,x

  [0x90]: BCC, // BCC nearlabel
  [0xb0]: BCS, // BCS nearlabel
  [0xd0]: BNE, // BNE nearlabel
  [0xf0]: BEQ, // BEQ nearlabel
  [0x10]: BPL, // BPL nearlabel
  [0x30]: BMI, // BMI nearlabel
  [0x50]: BVC, // BVC nearlabel
  [0x70]: BVS, // BVS nearlabel
  [0x80]: BRA, // BRA nearlabel
  [0x82]: BRL, // BRL label

  [0x89]: BIT.Immediate_VariableA, // BIT #const
  [0x24]: BIT.DirectPage, // BIT dp
  [0x34]: BIT.DirectPage_X, // BIT dp,
  [0x2c]: BIT.Absolute, // BIT addr
  [0x3c]: BIT.Absolute_X, // BIT addr,x

  [0x00]: BRK, // BRK #const
  [0x02]: COP, // COP #const

  [0x18]: CLC, // CLC
  [0x58]: CLI, // CLI
  [0xd8]: CLD, // CLD
  [0xb8]: CLV, // CLV

  [0xc9]: CMP.Immediate_VariableA, // CMP #const
  [0xc5]: CMP.DirectPage, // CMP dp
  [0xd5]: CMP.DirectPage_X, // CMP dp,x
  [0xd2]: CMP.DirectPage_Indirect, // CMP (dp)
  [0xc1]: CMP.DirectPage_X_Indirect, // CMP (dp,x)
  [0xd1]: CMP.DirectPage_Indirect_Y, // CMP (dp),y
  [0xc7]: CMP.DirectPage_IndirectLong, // CMP [dp]
  [0xd7]: CMP.DirectPage_IndirectLong_Y, // CMP [dp],y
  [0xcd]: CMP.Absolute, // CMP addr
  [0xdd]: CMP.Absolute_X, // CMP addr,x
  [0xd9]: CMP.Absolute_Y, // CMP addr,y
  [0xcf]: CMP.AbsoluteLong, // CMP long
  [0xdf]: CMP.AbsoluteLong_X, // CMP long,x
  [0xc3]: CMP.StackRelative, // CMP sr,s
  [0xd3]: CMP.StackRelative_Indirect_Y, // CMP (sr,s),y

  [0xe0]: CPX.Immediate_VariableX, // CPX #const
  [0xe4]: CPX.DirectPage, // CPX dp
  [0xec]: CPX.Absolute, // CPX addr

  [0xc0]: CPY.Immediate_VariableX, // CPY #const
  [0xc4]: CPY.DirectPage, // CPY dp
  [0xcc]: CPY.Absolute, // CPY addr

  [0x3a]: DEC.Accumulator, // DEC A
  [0xc6]: DEC.DirectPage, // DEC dp
  [0xd6]: DEC.DirectPage_X, // DEC dp,x
  [0xce]: DEC.Absolute, // DEC addr
  [0xde]: DEC.Absolute_X, // DEC addr,x

  [0xca]: DEX, // DEX
  [0x88]: DEY, // DEY

  [0x49]: EOR.Immediate_VariableA, // EOR #const
  [0x45]: EOR.DirectPage, // EOR dp
  [0x55]: EOR.DirectPage_X, // EOR dp,x
  [0x52]: EOR.DirectPage_Indirect, // EOR (dp)
  [0x41]: EOR.DirectPage_X_Indirect, // EOR (dp,x)
  [0x51]: EOR.DirectPage_Indirect_Y, // EOR (dp),y
  [0x47]: EOR.DirectPage_IndirectLong, // EOR [dp]
  [0x57]: EOR.DirectPage_IndirectLong_Y, // EOR [dp],y
  [0x4d]: EOR.Absolute, // EOR addr
  [0x5d]: EOR.Absolute_X, // EOR addr,x
  [0x59]: EOR.Absolute_Y, // EOR addr,y
  [0x4f]: EOR.AbsoluteLong, // EOR long
  [0x5f]: EOR.AbsoluteLong_X, // EOR long,x
  [0x43]: EOR.StackRelative, // EOR sr,s
  [0x53]: EOR.StackRelative_Indirect_Y, // EOR (sr,s),y

  [0x1a]: INC.Accumulator, // INC A
  [0xe6]: INC.DirectPage, // INC dp
  [0xf6]: INC.DirectPage_X, // INC dp,x
  [0xee]: INC.Absolute, // INC addr
  [0xfe]: INC.Absolute_X, // INC addr,x

  [0xe8]: INX, // INX
  [0xc8]: INY, // INY

  [0x4c]: JMP.Absolute, // JMP addr
  [0x6c]: JMP.Absolute_Indirect, // JMP (addr)
  [0x7c]: JMP.Absolute_X_Indirect, // JMP (addr,x)
  [0xdc]: JMP.Absolute_IndirectLong, // JML [addr]
  [0x5c]: JMP.AbsoluteLong, // JML long

  [0x20]: JSR.Absolute, // JSR addr
  [0xfc]: JSR.Absolute_X_Indirect, // JSR (addr,x))
  [0x22]: JSR.AbsoluteLong, // JSL long

  [0xa9]: LDA.Immediate_VariableA, // LDA #const
  [0xa5]: LDA.DirectPage, // LDA dp
  [0xb5]: LDA.DirectPage_X, // LDA dp,x
  [0xb2]: LDA.DirectPage_Indirect, // LDA (dp)
  [0xa1]: LDA.DirectPage_X_Indirect, // LDA (dp,x)
  [0xb1]: LDA.DirectPage_Indirect_Y, // LDA (dp),y
  [0xa7]: LDA.DirectPage_IndirectLong, // LDA [dp]
  [0xb7]: LDA.DirectPage_IndirectLong_Y, // LDA [dp],y
  [0xad]: LDA.Absolute, // LDA addr
  [0xbd]: LDA.Absolute_X, // LDA addr,x
  [0xb9]: LDA.Absolute_Y, // LDA addr,y
  [0xaf]: LDA.AbsoluteLong, // LDA long
  [0xbf]: LDA.AbsoluteLong_X, // LDA long,x
  [0xa3]: LDA.StackRelative, // LDA sr,s
  [0xb3]: LDA.StackRelative_Indirect_Y, // LDA (sr,s),y

  [0xa2]: LDX.Immediate_VariableX, // LDX #const
  [0xa6]: LDX.DirectPage, // LDX dp
  [0xb6]: LDX.DirectPage_Y, // LDX dp,y
  [0xae]: LDX.Absolute, // LDX addr
  [0xbe]: LDX.Absolute_Y, // LDX addr,y

  [0xa0]: LDY.Immediate_VariableX, // LDY #const
  [0xa4]: LDY.DirectPage, // LDY dp
  [0xb4]: LDY.DirectPage_X, // LDY dp,x
  [0xac]: LDY.Absolute, // LDY addr
  [0xbc]: LDY.Absolute_X, // LDY addr,x

  [0x4a]: LSR.Accumulator, // LSR A
  [0x46]: LSR.DirectPage, // LSR dp
  [0x56]: LSR.DirectPage_X, // LSR dp,x
  [0x4e]: LSR.Absolute, // LSR addr
  [0x5e]: LSR.Absolute_X, // LSR addr,x

  [0x54]: MVN, // MVN srcBank,destBank
  [0x44]: MVP, // MVP srcBank,destBank

  [0xea]: NOP, // NOP

  [0x09]: ORA.Immediate_VariableA, // ORA #const
  [0x05]: ORA.DirectPage, // ORA dp
  [0x15]: ORA.DirectPage_X, // ORA dp,x
  [0x12]: ORA.DirectPage_Indirect, // ORA (dp)
  [0x01]: ORA.DirectPage_X_Indirect, // ORA (dp,x)
  [0x11]: ORA.DirectPage_Indirect_Y, // ORA (dp),y
  [0x07]: ORA.DirectPage_IndirectLong, // ORA [dp]
  [0x17]: ORA.DirectPage_IndirectLong_Y, // ORA [dp],y
  [0x0d]: ORA.Absolute, // ORA addr
  [0x1d]: ORA.Absolute_X, // ORA addr,x
  [0x19]: ORA.Absolute_Y, // ORA addr,y
  [0x0f]: ORA.AbsoluteLong, // ORA long
  [0x1f]: ORA.AbsoluteLong_X, // ORA long,x
  [0x03]: ORA.StackRelative, // ORA sr,s
  [0x13]: ORA.StackRelative_Indirect_Y, // ORA (sr,s),y

  [0xf4]: PEA, // PEA addr
  [0xd4]: PEI, // PEI (dp)
  [0x62]: PER, // PER label

  [0x48]: PHA, // PHA
  [0xda]: PHX, // PHX
  [0x5a]: PHY, // PHY
  [0x8b]: PHB, // PHB
  [0x0b]: PHD, // PHD
  [0x4b]: PHK, // PHK
  [0x08]: PHP, // PHP

  [0x68]: PLA, // PLA
  [0xfa]: PLX, // PLX
  [0x7a]: PLY, // PLY
  [0xab]: PLB, // PLB
  [0x2b]: PLD, // PLD
  [0x28]: PLP, // PLP

  [0xc2]: REP, // REP #const
  [0xe2]: SEP, // SEP #const

  [0x2a]: ROL.Accumulator, // ROL A
  [0x26]: ROL.DirectPage, // ROL dp
  [0x36]: ROL.DirectPage_X, // ROL dp,x
  [0x2e]: ROL.Absolute, // ROL addr
  [0x3e]: ROL.Absolute_X, // ROL addr,x

  [0x6a]: ROR.Accumulator, // ROR A
  [0x66]: ROR.DirectPage, // ROR dp
  [0x76]: ROR.DirectPage_X, // ROR dp,x
  [0x6e]: ROR.Absolute, // ROR addr
  [0x7e]: ROR.Absolute_X, // ROR addr,x

  [0x60]: RTS, // RTS
  [0x6b]: RTL, // RTL
  [0x40]: RTI, // RTI

  [0xe9]: SBC.Immediate_VariableA, // SBC #const
  [0xe5]: SBC.DirectPage, // SBC dp
  [0xf5]: SBC.DirectPage_X, // SBC dp,x
  [0xf2]: SBC.DirectPage_Indirect, // SBC (dp)
  [0xe1]: SBC.DirectPage_X_Indirect, // SBC (dp,x)
  [0xf1]: SBC.DirectPage_Indirect_Y, // SBC (dp),y
  [0xe7]: SBC.DirectPage_IndirectLong, // SBC [dp]
  [0xf7]: SBC.DirectPage_IndirectLong_Y, // SBC [dp],y
  [0xed]: SBC.Absolute, // SBC addr
  [0xfd]: SBC.Absolute_X, // SBC addr,x
  [0xf9]: SBC.Absolute_Y, // SBC addr,y
  [0xef]: SBC.AbsoluteLong, // SBC long
  [0xff]: SBC.AbsoluteLong_X, // SBC long,x
  [0xe3]: SBC.StackRelative, // SBC sr,s
  [0xf3]: SBC.StackRelative_Indirect_Y, // SBC (sr,s),y

  [0x38]: SEC, // SEC
  [0x78]: SEI, // SEI
  [0xf8]: SED, // SED

  [0x85]: STA.DirectPage, // STA dp
  [0x95]: STA.DirectPage_X, // STA dp,x
  [0x92]: STA.DirectPage_Indirect, // STA (dp)
  [0x81]: STA.DirectPage_X_Indirect, // STA (dp,x)
  [0x91]: STA.DirectPage_Indirect_Y, // STA (dp),y
  [0x87]: STA.DirectPage_IndirectLong, // STA [dp]
  [0x97]: STA.DirectPage_IndirectLong_Y, // STA [dp],y
  [0x8d]: STA.Absolute, // STA addr
  [0x9d]: STA.Absolute_X, // STA addr,x
  [0x99]: STA.Absolute_Y, // STA addr,y
  [0x8f]: STA.AbsoluteLong, // STA long
  [0x9f]: STA.AbsoluteLong_X, // STA long,x
  [0x83]: STA.StackRelative, // STA sr,s
  [0x93]: STA.StackRelative_Indirect_Y, // STA (sr,s),y

  [0xdb]: STP, // STP

  [0x86]: STX.DirectPage, // STX dp
  [0x96]: STX.DirectPage_Y, // STX dp,y
  [0x8e]: STX.Absolute, // STX addr

  [0x84]: STY.DirectPage, // STY dp
  [0x94]: STY.DirectPage_X, // STY dp,x
  [0x8c]: STY.Absolute, // STY addr

  [0x64]: STZ.DirectPage, // STZ dp
  [0x74]: STZ.DirectPage_X, // STZ dp,x
  [0x9c]: STZ.Absolute, // STZ addr
  [0x9e]: STZ.Absolute_X, // STZ addr,x

  [0xaa]: TAX, // TAX
  [0xa8]: TAY, // TAY
  [0x5b]: TCD, // TCD
  [0x1b]: TCS, // TCS
  [0x7b]: TDC, // TDC
  [0x3b]: TSC, // TSC
  [0xba]: TSX, // TSX
  [0x8a]: TXA, // TXA
  [0x9a]: TXS, // TXS
  [0x9b]: TXY, // TXY
  [0x98]: TYA, // TYA
  [0xbb]: TYX, // TYX

  [0x14]: TRB.DirectPage, // TRB dp
  [0x1c]: TRB.Absolute, // TRB addr

  [0x04]: TSB.DirectPage, // TSB dp
  [0x0c]: TSB.Absolute, // TSB addr

  [0xcb]: WAI, // WAI

  [0x42]: WDM, // WDM #const

  [0xeb]: XBA, // XBA

  [0xfb]: XCE, // XCE
};

export type Opcode = keyof typeof opcode_to_instruction;

export type InstructionImpl =
  (typeof opcode_to_instruction)[keyof typeof opcode_to_instruction];
