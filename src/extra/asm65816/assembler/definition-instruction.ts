import Definition from "./definition";
import Instruction, {
  Instruction_Value_Implied,
  Instruction_Label_Absolute,
  Instruction_Label_AbsoluteLong,
  Instruction_Label_Relative,
  Instruction_Label_RelativeLong,
  Instruction_Value_Byte,
  Instruction_Value_Long,
  Instruction_Value_Word,
} from "./instruction";
import {
  instruction_id_to_instruction_info as instruction_info,
  LabelType,
} from "./instruction-info";
import { instruction_mode_to_instruction_mode_info as instruction_mode_info } from "./instruction-mode-info";
import { Range } from "./range";

export default class Definition_Instruction extends Definition {
  public mnemonic: string | undefined;
  public mode: string | undefined;
  public arg: number | undefined;
  public label: string | undefined;

  public constructor(range: Range) {
    super(range);
  }

  public build(pc: number): Instruction | string {
    if (!this.mnemonic)
      return `Invalid instruction: you must specify an opcode.`;

    if (!this.mode) this.mode = "Implied";

    const mode_info = instruction_mode_info[this.mode];
    if (!mode_info) return `Instruction mode "${this.mode}" doesn't exist.`;

    const info = instruction_info[`${this.mnemonic}-${this.mode}`];
    if (!info)
      return `Instruction "${this.mnemonic} ${mode_info.label}" doesn't exist.`;

    const opcode = info.opcode;
    const range = this.range;

    if (info.label_type === LabelType.None) {
      if (mode_info.size > 0 && this.arg === undefined)
        return `Instruction doesn't have the required parameter.`;

      switch (mode_info.size) {
        case 0:
          return new Instruction_Value_Implied(opcode, range);
        case 1:
          return new Instruction_Value_Byte(opcode, range, this.arg!);
        case 2:
          return new Instruction_Value_Word(opcode, range, this.arg!);
        case 3:
          return new Instruction_Value_Long(opcode, range, this.arg!);
      }

      return `Instruction has invalid size ${mode_info.size + 1}.`;
    }

    const label = this.label;
    if (label === undefined)
      return `Instruction doesn't have the required label.`;

    switch (info.label_type) {
      case LabelType.Relative:
        return new Instruction_Label_Relative(opcode, range, label, pc);
      case LabelType.RelativeLong:
        return new Instruction_Label_RelativeLong(opcode, range, label, pc);
      case LabelType.Absolute:
        return new Instruction_Label_Absolute(opcode, range, label);
      case LabelType.AbsoluteLong:
        return new Instruction_Label_AbsoluteLong(opcode, range, label);
    }
  }
}
