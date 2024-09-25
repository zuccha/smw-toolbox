import {
  flag_n_mask,
  flag_z_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { ReadOnlyValue } from "../value";

export abstract class LDA extends Instruction {
  public static mnemonic = "LDA";
  public static affected_flags = flag_n_mask | flag_z_mask;

  protected lda(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      this.p.flag_n = value.byte & flag_n_mask;
      this.p.flag_z = value.byte === 0;
    } else {
      this.p.flag_n = value.page & flag_n_mask;
      this.p.flag_z = value.word === 0;
    }
    return value;
  }
}

class LDA_Addr extends LDA {
  public execute_effect(): void {
    this.p.a = this.lda(this.load_m(this.addr));
  }
}

export namespace LDA {
  export class Immediate_VariableA extends LDA {
    public static opcode = 0xa9;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cycles_modifier = minus_m;

    public execute_effect(): void {
      this.p.a = this.lda(this._arg);
    }
  }

  export class DirectPage extends LDA_Addr {
    public static opcode = 0xa5;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends LDA_Addr {
    public static opcode = 0xb5;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect extends LDA_Addr {
    public static opcode = 0xb2;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X_Indirect extends LDA_Addr {
    public static opcode = 0xa1;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect_Y extends LDA_Addr {
    public static opcode = 0xb1;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cycles_modifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends LDA_Addr {
    public static opcode = 0xa7;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_IndirectLong_Y extends LDA_Addr {
    public static opcode = 0xb7;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends LDA_Addr {
    public static opcode = 0xad;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_X extends LDA_Addr {
    public static opcode = 0xbd;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m + plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends LDA_Addr {
    public static opcode = 0xb9;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m + plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends LDA_Addr {
    public static opcode = 0xaf;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class AbsoluteLong_X extends LDA_Addr {
    public static opcode = 0xbf;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative extends LDA_Addr {
    public static opcode = 0xa3;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends LDA_Addr {
    public static opcode = 0xb3;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cycles_modifier = minus_m;
  }
}
