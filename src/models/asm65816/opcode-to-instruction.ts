import { ADC } from "./instructions/adc";
import { AND } from "./instructions/and";
import { ASL } from "./instructions/asl";
import { BIT } from "./instructions/bit";
import { BXX } from "./instructions/bxx";
import { CLC } from "./instructions/clc";
import { CLD } from "./instructions/cld";
import { CLI } from "./instructions/cli";
import { CLV } from "./instructions/clv";
import { NOP } from "./instructions/nop";
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

  [0xc9]: NOP, // CMP #const
  [0xc5]: NOP, // CMP dp
  [0xd5]: NOP, // CMP dp,x
  [0xd2]: NOP, // CMP (dp)
  [0xc1]: NOP, // CMP (dp,x)
  [0xd1]: NOP, // CMP (dp),y
  [0xc7]: NOP, // CMP [dp]
  [0xd7]: NOP, // CMP [dp],y
  [0xcd]: NOP, // CMP addr
  [0xdd]: NOP, // CMP addr,x
  [0xd9]: NOP, // CMP addr,y
  [0xcf]: NOP, // CMP long
  [0xdf]: NOP, // CMP long,x
  [0xc3]: NOP, // CMP sr,s
  [0xd3]: NOP, // CMP (sr,s),y

  [0xe0]: NOP, // CPX #const
  [0xe4]: NOP, // CPX dp
  [0xec]: NOP, // CPX addr

  [0xc0]: NOP, // CPY #const
  [0xc4]: NOP, // CPY dp
  [0xcc]: NOP, // CPY addr

  [0x3a]: NOP, // DEC A
  [0xc6]: NOP, // DEC dp
  [0xd6]: NOP, // DEC dp,x
  [0xce]: NOP, // DEC addr
  [0xde]: NOP, // DEC addr,x

  [0xca]: NOP, // DEX
  [0x88]: NOP, // DEY

  [0x49]: NOP, // EOR #const
  [0x45]: NOP, // EOR dp
  [0x55]: NOP, // EOR dp,x
  [0x52]: NOP, // EOR (dp)
  [0x41]: NOP, // EOR (dp,x)
  [0x51]: NOP, // EOR (dp),y
  [0x47]: NOP, // EOR [dp]
  [0x57]: NOP, // EOR [dp],y
  [0x4d]: NOP, // EOR addr
  [0x5d]: NOP, // EOR addr,x
  [0x59]: NOP, // EOR addr,y
  [0x4f]: NOP, // EOR long
  [0x5f]: NOP, // EOR long,x
  [0x43]: NOP, // EOR sr,s
  [0x53]: NOP, // EOR (sr,s),y

  [0x1a]: NOP, // INC A
  [0xe6]: NOP, // INC dp
  [0xf6]: NOP, // INC dp,x
  [0xee]: NOP, // INC addr
  [0xfe]: NOP, // INC addr,x

  [0xe8]: NOP, // INX
  [0xc8]: NOP, // INY

  [0x4c]: NOP, // JMP addr
  [0x6c]: NOP, // JMP (addr)
  [0x7c]: NOP, // JMP (addr,x)
  [0x5c]: NOP, // JML long
  [0xdc]: NOP, // JML [addr]

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

  [0x09]: NOP, // ORA #const
  [0x05]: NOP, // ORA dp
  [0x15]: NOP, // ORA dp,x
  [0x12]: NOP, // ORA (dp)
  [0x01]: NOP, // ORA (dp,x)
  [0x11]: NOP, // ORA (dp),y
  [0x07]: NOP, // ORA [dp]
  [0x17]: NOP, // ORA [dp],y
  [0x0d]: NOP, // ORA addr
  [0x1d]: NOP, // ORA addr,x
  [0x19]: NOP, // ORA addr,y
  [0x0f]: NOP, // ORA long
  [0x1f]: NOP, // ORA long,x
  [0x03]: NOP, // ORA sr,s
  [0x13]: NOP, // ORA (sr,s),y

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
