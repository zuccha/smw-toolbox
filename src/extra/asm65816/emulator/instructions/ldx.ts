import {
  flag_n_mask,
  minus_x,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { Value } from "../value";

export abstract class LDX extends Instruction {
  public static mnemonic = "LDX";

  protected ldx(value: Value): Value {
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

class LDX_Addr extends LDX {
  public execute_effect(): void {
    this.p.set_x(this.ldx(this.load_x(this.addr)).word);
  }
}

export namespace LDX {
  export class Immediate_VariableX extends LDX {
    public static opcode = 0xa2;
    public static mode = InstructionMode.Immediate_VariableX;
    public static base_cycles = 3;
    public static cyclesModifier = minus_x;

    public execute_effect(): void {
      this.p.set_x(this.ldx(this._arg).word);
    }
  }

  export class DirectPage extends LDX_Addr {
    public static opcode = 0xa6;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_x | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Y extends LDX_Addr {
    public static opcode = 0xb6;
    public static mode = InstructionMode.DirectPage_Y;
    public static base_cycles = 5;
    public static cyclesModifier = minus_x | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends LDX_Addr {
    public static opcode = 0xae;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_x;
  }

  export class Absolute_Y extends LDX_Addr {
    public static opcode = 0xbe;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cyclesModifier = minus_x + plus_1_if_index_y_crosses_page;
  }
}