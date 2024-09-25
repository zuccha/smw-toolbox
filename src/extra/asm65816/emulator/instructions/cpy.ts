import {
  flag_c_mask,
  flag_n_mask,
  flag_z_mask,
  minus_x,
  plus_1_if_dp_low_is_zero,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { ReadOnlyValue } from "../value";

export abstract class CPY extends Instruction {
  public static mnemonic = "CPY";
  public static affected_flags = flag_n_mask | flag_z_mask | flag_c_mask;

  protected cpy(value: ReadOnlyValue): void {
    if (this.p.flag_x) {
      this.p.flag_n = this.p.y.byte < value.byte;
      this.p.flag_z = this.p.y.byte === value.byte;
      this.p.flag_c = this.p.y.byte >= value.byte;
    } else {
      this.p.flag_n = this.p.y.word < value.word;
      this.p.flag_z = this.p.y.word === value.word;
      this.p.flag_c = this.p.y.word >= value.word;
    }
  }

  public execute_effect(): void {
    this.cpy(this.load_x(this.addr));
  }
}

export namespace CPY {
  export class Immediate_VariableX extends CPY {
    public static opcode = 0xc0;
    public static mode = InstructionMode.Immediate_VariableX;
    public static base_cycles = 3;
    public static cycles_modifier = minus_x;

    public execute_effect(): void {
      this.cpy(this._arg);
    }
  }

  export class DirectPage extends CPY {
    public static opcode = 0xc4;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends CPY {
    public static opcode = 0xcc;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x;
    public static baseLength = 3;
  }
}
