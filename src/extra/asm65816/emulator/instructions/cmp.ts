import {
  flag_c_mask,
  flag_n_mask,
  flag_z_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export abstract class CMP extends Instruction {
  public static mnemonic = "CMP";
  public static affected_flags = flag_n_mask | flag_z_mask | flag_c_mask;

  protected cmp(value: ReadOnlyValue): void {
    if (this.p.flag_m) {
      this.p.flag_n = b(this.p.a.byte - value.byte).byte & flag_n_mask;
      this.p.flag_z = this.p.a.byte === value.byte;
      this.p.flag_c = this.p.a.byte >= value.byte;
    } else {
      this.p.flag_n = w(this.p.a.word - value.word).page & flag_n_mask;
      this.p.flag_z = this.p.a.word === value.word;
      this.p.flag_c = this.p.a.word >= value.word;
    }
  }

  public execute_effect(): void {
    this.cmp(this.load_m(this.addr));
  }
}

export namespace CMP {
  export class Immediate_VariableA extends CMP {
    public static opcode = 0xc9;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cycles_modifier = minus_m;

    public execute_effect(): void {
      this.cmp(this._arg);
    }
  }

  export class DirectPage extends CMP {
    public static opcode = 0xc5;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends CMP {
    public static opcode = 0xd5;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect extends CMP {
    public static opcode = 0xd2;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X_Indirect extends CMP {
    public static opcode = 0xc1;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect_Y extends CMP {
    public static opcode = 0xd1;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cycles_modifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends CMP {
    public static opcode = 0xc7;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_IndirectLong_Y extends CMP {
    public static opcode = 0xd7;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends CMP {
    public static opcode = 0xcd;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_X extends CMP {
    public static opcode = 0xdd;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends CMP {
    public static opcode = 0xd9;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends CMP {
    public static opcode = 0xcf;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class AbsoluteLong_X extends CMP {
    public static opcode = 0xdf;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative extends CMP {
    public static opcode = 0xc3;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends CMP {
    public static opcode = 0xd3;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cycles_modifier = minus_m;
  }
}
