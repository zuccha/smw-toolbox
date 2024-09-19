import { ADC } from "./instructions/adc";
import { AND } from "./instructions/and";
import { ASL } from "./instructions/asl";
import { BIT } from "./instructions/bit";
import { BXX } from "./instructions/bxx";
import { CLC } from "./instructions/clc";
import { CLD } from "./instructions/cld";
import { CLI } from "./instructions/cli";
import { CLV } from "./instructions/clv";
import { CMP } from "./instructions/cmp";
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
import { NOP } from "./instructions/nop";
import { ORA } from "./instructions/ora";
import { REP } from "./instructions/rep";
import { SEP } from "./instructions/sep";

export const opcodeToInstruction = {
  [0x69]: ADC.Immediate, // ADC #const
  [0x65]: ADC.Direct, // ADC dp
  [0x75]: ADC.Direct_X, // ADC dp,x
  [0x72]: ADC.Direct_Indirect, // ADC (dp)
  [0x61]: ADC.Direct_X_Indirect, // ADC (dp,x)
  [0x71]: ADC.Direct_Indirect_Y, // ADC (dp),y
  [0x67]: ADC.Direct_IndirectLong, // ADC [dp]
  [0x77]: ADC.Direct_IndirectLong_Y, // ADC [dp],y
  [0x6d]: ADC.Absolute, // ADC addr
  [0x7d]: ADC.Absolute_X, // ADC addr,x
  [0x79]: ADC.Absolute_Y, // ADC addr,y
  [0x6f]: ADC.AbsoluteLong, // ADC long
  [0x7f]: ADC.AbsoluteLong_X, // ADC long,x
  [0x63]: ADC.StackRelative, // ADC sr,s
  [0x73]: ADC.StackRelative_Indirect_Y, // ADC (sr,s),y

  [0x29]: AND.Immediate, // AND #const
  [0x25]: AND.Direct, // AND dp
  [0x35]: AND.Direct_X, // AND dp,x
  [0x32]: AND.Direct_Indirect, // AND (dp)
  [0x21]: AND.Direct_X_Indirect, // AND (dp,x)
  [0x31]: AND.Direct_Indirect_Y, // AND (dp),y
  [0x27]: AND.Direct_IndirectLong, // AND [dp]
  [0x37]: AND.Direct_IndirectLong_Y, // AND [dp],y
  [0x2d]: AND.Absolute, // AND addr
  [0x3d]: AND.Absolute_X, // AND addr,x
  [0x39]: AND.Absolute_Y, // AND addr,y
  [0x2f]: AND.AbsoluteLong, // AND long
  [0x3f]: AND.AbsoluteLong_X, // AND long,x
  [0x23]: AND.StackRelative, // AND sr,s
  [0x33]: AND.StackRelative_Indirect_Y, // AND (sr,s),y

  [0x0a]: ASL.Accumulator, // ASL A
  [0x06]: ASL.Direct, // ASL dp
  [0x16]: ASL.Direct_X, // ASL dp,x
  [0x0e]: ASL.Absolute, // ASL addr
  [0x1e]: ASL.Absolute_X, // ASL addr,x

  [0x90]: BXX.BCC, // BCC nearlabel
  [0xb0]: BXX.BCS, // BCS nearlabel
  [0xd0]: BXX.BNE, // BNE nearlabel
  [0xf0]: BXX.BEQ, // BEQ nearlabel
  [0x10]: BXX.BPL, // BPL nearlabel
  [0x30]: BXX.BMI, // BMI nearlabel
  [0x50]: BXX.BVC, // BVC nearlabel
  [0x70]: BXX.BVS, // BVS nearlabel
  [0x80]: BXX.BRA, // BRA nearlabel
  [0x82]: BXX.BRL, // BRL label

  [0x89]: BIT.Immediate, // BIT #const
  [0x24]: BIT.Direct, // BIT dp
  [0x34]: BIT.Direct_X, // BIT dp,
  [0x2c]: BIT.Absolute, // BIT addr
  [0x3c]: BIT.Absolute_X, // BIT addr,x

  [0x00]: NOP, // BRK #const
  [0x02]: NOP, // COP #const

  [0x18]: CLC, // CLC
  [0x58]: CLI, // CLI
  [0xd8]: CLD, // CLD
  [0xb8]: CLV, // CLV

  [0xc9]: CMP.Immediate, // CMP #const
  [0xc5]: CMP.Direct, // CMP dp
  [0xd5]: CMP.Direct_X, // CMP dp,x
  [0xd2]: CMP.Direct_Indirect, // CMP (dp)
  [0xc1]: CMP.Direct_X_Indirect, // CMP (dp,x)
  [0xd1]: CMP.Direct_Indirect_Y, // CMP (dp),y
  [0xc7]: CMP.Direct_IndirectLong, // CMP [dp]
  [0xd7]: CMP.Direct_IndirectLong_Y, // CMP [dp],y
  [0xcd]: CMP.Absolute, // CMP addr
  [0xdd]: CMP.Absolute_X, // CMP addr,x
  [0xd9]: CMP.Absolute_Y, // CMP addr,y
  [0xcf]: CMP.AbsoluteLong, // CMP long
  [0xdf]: CMP.AbsoluteLong_X, // CMP long,x
  [0xc3]: CMP.StackRelative, // CMP sr,s
  [0xd3]: CMP.StackRelative_Indirect_Y, // CMP (sr,s),y

  [0xe0]: CPX.Immediate, // CPX #const
  [0xe4]: CPX.Direct, // CPX dp
  [0xec]: CPX.Absolute, // CPX addr

  [0xc0]: CPY.Immediate, // CPY #const
  [0xc4]: CPY.Direct, // CPY dp
  [0xcc]: CPY.Absolute, // CPY addr

  [0x3a]: DEC.Implied, // DEC A
  [0xc6]: DEC.Direct, // DEC dp
  [0xd6]: DEC.Direct_X, // DEC dp,x
  [0xce]: DEC.Absolute, // DEC addr
  [0xde]: DEC.Absolute_X, // DEC addr,x

  [0xca]: DEX, // DEX
  [0x88]: DEY, // DEY

  [0x49]: EOR.Immediate, // EOR #const
  [0x45]: EOR.Direct, // EOR dp
  [0x55]: EOR.Direct_X, // EOR dp,x
  [0x52]: EOR.Direct_Indirect, // EOR (dp)
  [0x41]: EOR.Direct_X_Indirect, // EOR (dp,x)
  [0x51]: EOR.Direct_Indirect_Y, // EOR (dp),y
  [0x47]: EOR.Direct_IndirectLong, // EOR [dp]
  [0x57]: EOR.Direct_IndirectLong_Y, // EOR [dp],y
  [0x4d]: EOR.Absolute, // EOR addr
  [0x5d]: EOR.Absolute_X, // EOR addr,x
  [0x59]: EOR.Absolute_Y, // EOR addr,y
  [0x4f]: EOR.AbsoluteLong, // EOR long
  [0x5f]: EOR.AbsoluteLong_X, // EOR long,x
  [0x43]: EOR.StackRelative, // EOR sr,s
  [0x53]: EOR.StackRelative_Indirect_Y, // EOR (sr,s),y

  [0x1a]: INC.Implied, // INC A
  [0xe6]: INC.Direct, // INC dp
  [0xf6]: INC.Direct_X, // INC dp,x
  [0xee]: INC.Absolute, // INC addr
  [0xfe]: INC.Absolute_X, // INC addr,x

  [0xe8]: INX, // INX
  [0xc8]: INY, // INY

  [0x4c]: JMP.Absolute, // JMP addr
  [0x6c]: JMP.Absolute_Indirect, // JMP (addr)
  [0x7c]: JMP.Absolute_X_Indirect, // JMP (addr,x)
  [0xdc]: JMP.Absolute_IndirectLong, // JML [addr]
  [0x5c]: JMP.AbsoluteLong, // JML long

  [0x20]: NOP, // JSR addr
  [0xfc]: NOP, // JSR (addr,x))
  [0x22]: NOP, // JSL long

  [0xa9]: NOP, // LDA #const
  [0xa5]: NOP, // LDA dp
  [0xb5]: NOP, // LDA dp,x
  [0xb2]: NOP, // LDA (dp)
  [0xa1]: NOP, // LDA (dp,x)
  [0xb1]: NOP, // LDA (dp),y
  [0xa7]: NOP, // LDA [dp]
  [0xb7]: NOP, // LDA [dp],y
  [0xad]: NOP, // LDA addr
  [0xbd]: NOP, // LDA addr,x
  [0xb9]: NOP, // LDA addr,y
  [0xaf]: NOP, // LDA long
  [0xbf]: NOP, // LDA long,x
  [0xa3]: NOP, // LDA sr,s
  [0xb3]: NOP, // LDA (sr,s),y

  [0xa2]: NOP, // LDX #const
  [0xa6]: NOP, // LDX dp
  [0xb6]: NOP, // LDX dp,y
  [0xae]: NOP, // LDX addr
  [0xbe]: NOP, // LDX addr,y

  [0xa0]: NOP, // LDY #const
  [0xa4]: NOP, // LDY dp
  [0xb4]: NOP, // LDY dp,x
  [0xac]: NOP, // LDY addr
  [0xbc]: NOP, // LDY addr,x

  [0x4a]: NOP, // LSR A
  [0x46]: NOP, // LSR dp
  [0x56]: NOP, // LSR dp,x
  [0x4e]: NOP, // LSR addr
  [0x5e]: NOP, // LSR addr,x

  [0x54]: NOP, // MVN srcbk,destbk
  [0x44]: NOP, // MVP srcbk,destbk

  [0xea]: NOP, // NOP

  [0x09]: ORA.Immediate, // ORA #const
  [0x05]: ORA.Direct, // ORA dp
  [0x15]: ORA.Direct_X, // ORA dp,x
  [0x12]: ORA.Direct_Indirect, // ORA (dp)
  [0x01]: ORA.Direct_X_Indirect, // ORA (dp,x)
  [0x11]: ORA.Direct_Indirect_Y, // ORA (dp),y
  [0x07]: ORA.Direct_IndirectLong, // ORA [dp]
  [0x17]: ORA.Direct_IndirectLong_Y, // ORA [dp],y
  [0x0d]: ORA.Absolute, // ORA addr
  [0x1d]: ORA.Absolute_X, // ORA addr,x
  [0x19]: ORA.Absolute_Y, // ORA addr,y
  [0x0f]: ORA.AbsoluteLong, // ORA long
  [0x1f]: ORA.AbsoluteLong_X, // ORA long,x
  [0x03]: ORA.StackRelative, // ORA sr,s
  [0x13]: ORA.StackRelative_Indirect_Y, // ORA (sr,s),y

  [0xf4]: NOP, // PEA addr
  [0xd4]: NOP, // PEI (dp)
  [0x62]: NOP, // PER label

  [0x48]: NOP, // PHA
  [0xda]: NOP, // PHX
  [0x5a]: NOP, // PHY
  [0x8b]: NOP, // PHB
  [0x0b]: NOP, // PHD
  [0x4b]: NOP, // PHK
  [0x08]: NOP, // PHP

  [0x68]: NOP, // PLA
  [0xfa]: NOP, // PLX
  [0x7a]: NOP, // PLY
  [0xab]: NOP, // PLB
  [0x2b]: NOP, // PLD
  [0x28]: NOP, // PLP

  [0xc2]: REP, // REP #const
  [0xe2]: SEP, // SEP #const

  [0x2a]: NOP, // ROL A
  [0x26]: NOP, // ROL dp
  [0x36]: NOP, // ROL dp,x
  [0x2e]: NOP, // ROL addr
  [0x3e]: NOP, // ROL addr,x

  [0x6a]: NOP, // ROR A
  [0x66]: NOP, // ROR dp
  [0x76]: NOP, // ROR dp,x
  [0x6e]: NOP, // ROR addr
  [0x7e]: NOP, // ROR addr,x

  [0x60]: NOP, // RTS
  [0x6b]: NOP, // RTL
  [0x40]: NOP, // RTI

  [0xe9]: NOP, // SBC #const
  [0xe5]: NOP, // SBC dp
  [0xf5]: NOP, // SBC dp,x
  [0xf2]: NOP, // SBC (dp)
  [0xe1]: NOP, // SBC (dp,x)
  [0xf1]: NOP, // SBC (dp),y
  [0xe7]: NOP, // SBC [dp]
  [0xf7]: NOP, // SBC [dp],y
  [0xed]: NOP, // SBC addr
  [0xfd]: NOP, // SBC addr,x
  [0xf9]: NOP, // SBC addr,y
  [0xef]: NOP, // SBC long
  [0xff]: NOP, // SBC long,x
  [0xe3]: NOP, // SBC sr,s
  [0xf3]: NOP, // SBC (sr,s),y

  [0x38]: NOP, // SEC
  [0x78]: NOP, // SEI
  [0xf8]: NOP, // SED

  [0x85]: NOP, // STA dp
  [0x95]: NOP, // STA dp,x
  [0x92]: NOP, // STA (dp)
  [0x81]: NOP, // STA (dp,x)
  [0x91]: NOP, // STA (dp),y
  [0x87]: NOP, // STA [dp]
  [0x97]: NOP, // STA [dp],y
  [0x8d]: NOP, // STA addr
  [0x9d]: NOP, // STA addr,x
  [0x99]: NOP, // STA addr,y
  [0x8f]: NOP, // STA long
  [0x9f]: NOP, // STA long,x
  [0x83]: NOP, // STA sr,s
  [0x93]: NOP, // STA (sr,s),y

  [0xdb]: NOP, // STP

  [0x86]: NOP, // STX dp
  [0x96]: NOP, // STX dp,y
  [0x8e]: NOP, // STX addr

  [0x84]: NOP, // STY dp
  [0x94]: NOP, // STY dp,x
  [0x8c]: NOP, // STY addr

  [0x64]: NOP, // STZ dp
  [0x74]: NOP, // STZ dp,x
  [0x9c]: NOP, // STZ addr
  [0x9e]: NOP, // STZ addr,x

  [0xaa]: NOP, // TAX
  [0xa8]: NOP, // TAY
  [0x5b]: NOP, // TCD
  [0x1b]: NOP, // TCS
  [0x7b]: NOP, // TDC
  [0x3b]: NOP, // TSC
  [0xba]: NOP, // TSX
  [0x8a]: NOP, // TXA
  [0x9a]: NOP, // TXS
  [0x9b]: NOP, // TXY
  [0x98]: NOP, // TYA
  [0xbb]: NOP, // TYX

  [0x14]: NOP, // TRB dp
  [0x1c]: NOP, // TRB addr

  [0x04]: NOP, // TSB dp
  [0x0c]: NOP, // TSB addr

  [0xcb]: NOP, // WAI

  [0x42]: NOP, // WDM

  [0xeb]: NOP, // XBA

  [0xfb]: NOP, // XCE
};

export type Opcode = keyof typeof opcodeToInstruction;
