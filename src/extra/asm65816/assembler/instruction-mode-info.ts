export type InstructionModeInfo = {
  label: string;
  size: number;
};

export const instruction_mode_to_instruction_mode_info: Record<
  string,
  InstructionModeInfo
> = {
  Implied: /*                    */ { size: 0, label: "" /*          */ },
  Accumulator: /*                */ { size: 0, label: "A" /*         */ },
  Immediate_Byte: /*             */ { size: 1, label: "#const" /*    */ },
  Immediate_Word: /*             */ { size: 2, label: "#const" /*    */ },
  DirectPage: /*                 */ { size: 1, label: "dp" /*        */ },
  DirectPage_X: /*               */ { size: 1, label: "dp,x" /*      */ },
  DirectPage_Y: /*               */ { size: 1, label: "dp,y" /*      */ },
  DirectPage_Indirect: /*        */ { size: 1, label: "(dp)" /*      */ },
  DirectPage_X_Indirect: /*      */ { size: 1, label: "(dp,x)" /*    */ },
  DirectPage_Indirect_Y: /*      */ { size: 1, label: "(dp),y" /*    */ },
  DirectPage_IndirectLong: /*    */ { size: 1, label: "[dp]" /*      */ },
  DirectPage_IndirectLong_Y: /*  */ { size: 1, label: "[dp],y" /*    */ },
  Absolute: /*                   */ { size: 2, label: "addr" /*      */ },
  Absolute_X: /*                 */ { size: 2, label: "addr,x" /*    */ },
  Absolute_Y: /*                 */ { size: 2, label: "addr,y" /*    */ },
  Absolute_Indirect: /*          */ { size: 2, label: "(addr)" /*    */ },
  Absolute_X_Indirect: /*        */ { size: 2, label: "(addr,x)" /*  */ },
  Absolute_IndirectLong: /*      */ { size: 2, label: "[addr]" /*    */ },
  AbsoluteLong: /*               */ { size: 3, label: "long" /*      */ },
  AbsoluteLong_X: /*             */ { size: 3, label: "long,x" /*    */ },
  StackRelative: /*              */ { size: 1, label: "sr,s" /*      */ },
  StackRelative_Indirect_Y: /*   */ { size: 1, label: "(sr,s),y" /*  */ },
  BlockMove: /*                  */ { size: 2, label: "src:dest" /*  */ },
  Label: /*                      */ { size: 0, label: "label" /*     */ },
  Label_X: /*                    */ { size: 0, label: "label,x" /*   */ },
  Label_Y: /*                    */ { size: 0, label: "label,y" /*   */ },
  Label_Indirect: /*             */ { size: 0, label: "(label)" /*   */ },
  Label_X_Indirect: /*           */ { size: 0, label: "(label,x)" /* */ },
  Label_Indirect_Y: /*           */ { size: 0, label: "(label),y" /* */ },
  Label_IndirectLong: /*         */ { size: 0, label: "[label]" /*   */ },
  Label_IndirectLong_Y: /*       */ { size: 0, label: "[label],y" /* */ },
};
