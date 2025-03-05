import {
  flag_n_mask,
  flag_z_mask,
  minus_x,
  plus_1_if_dp_low_is_not_zero,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { ReadOnlyValue } from "../value";

export abstract class LDY extends Instruction {
  public static mnemonic = "LDY";
  public static affected_flags = flag_n_mask | flag_z_mask;

  protected ldy(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_x) {
      this.p.flag_n = value.byte & flag_n_mask;
      this.p.flag_z = value.byte === 0;
    } else {
      this.p.flag_n = value.page & flag_n_mask;
      this.p.flag_z = value.word === 0;
    }
    return value;
  }
}

class LDY_Addr extends LDY {
  public execute_effect(): void {
    this.p.y = this.ldy(this.load_x(this.addr));
  }
}

export namespace LDY {
  export class Immediate_VariableX extends LDY {
    public static opcode = 0xa0;
    public static mode = InstructionMode.Immediate_VariableX;
    public static base_cycles = 3;
    public static cycles_modifier = minus_x;

    public execute_effect(): void {
      this.p.y = this.ldy(this._arg);
    }
  }

  export class DirectPage extends LDY_Addr {
    public static opcode = 0xa4;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_X extends LDY_Addr {
    public static opcode = 0xb4;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_not_zero;
  }

  export class Absolute extends LDY_Addr {
    public static opcode = 0xac;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x;
  }

  export class Absolute_X extends LDY_Addr {
    public static opcode = 0xbc;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x + plus_1_if_index_y_crosses_page;
  }
}
