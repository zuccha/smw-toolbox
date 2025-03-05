import {
  flag_n_mask,
  minus_m,
  plus_1_if_dp_low_is_not_zero,
  plus_1_if_index_y_crosses_page,
  plus_1_if_index_x_crosses_page,
  flag_z_mask,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export abstract class ORA extends Instruction {
  public static mnemonic = "ORA";
  public static affected_flags = flag_n_mask | flag_z_mask;

  protected ora(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result = b(value.byte | this.p.a.byte);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      return result;
    } else {
      const result = w(value.word | this.p.a.word);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      return result;
    }
  }
}

export abstract class ORA_Addr extends ORA {
  public execute_effect(): void {
    this.p.a = this.ora(this.load_m(this.addr));
  }
}

export namespace ORA {
  export class Immediate_VariableA extends ORA {
    public static opcode = 0x09;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cycles_modifier = minus_m;

    public execute_effect(): void {
      this.p.a = this.ora(this._arg);
    }
  }

  export class DirectPage extends ORA_Addr {
    public static opcode = 0x05;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_X extends ORA_Addr {
    public static opcode = 0x15;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_Indirect extends ORA_Addr {
    public static opcode = 0x12;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_X_Indirect extends ORA_Addr {
    public static opcode = 0x01;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_Indirect_Y extends ORA_Addr {
    public static opcode = 0x11;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cycles_modifier =
      minus_m | plus_1_if_dp_low_is_not_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends ORA_Addr {
    public static opcode = 0x07;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_IndirectLong_Y extends ORA_Addr {
    public static opcode = 0x17;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class Absolute extends ORA_Addr {
    public static opcode = 0x0d;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_X extends ORA_Addr {
    public static opcode = 0x1d;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends ORA_Addr {
    public static opcode = 0x19;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends ORA_Addr {
    public static opcode = 0x0f;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class AbsoluteLong_X extends ORA_Addr {
    public static opcode = 0x1f;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative extends ORA_Addr {
    public static opcode = 0x03;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends ORA_Addr {
    public static opcode = 0x13;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cycles_modifier = minus_m;
  }
}
