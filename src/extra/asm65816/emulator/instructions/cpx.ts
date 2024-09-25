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

export abstract class CPX extends Instruction {
  public static mnemonic = "CPX";
  public static affected_flags = flag_n_mask | flag_z_mask | flag_c_mask;

  protected cpx(value: ReadOnlyValue): void {
    if (this.p.flag_x) {
      this.p.flag_n = this.p.x.byte < value.byte;
      this.p.flag_z = this.p.x.byte === value.byte;
      this.p.flag_c = this.p.x.byte >= value.byte;
    } else {
      this.p.flag_n = this.p.x.word < value.word;
      this.p.flag_z = this.p.x.word === value.word;
      this.p.flag_c = this.p.x.word >= value.word;
    }
  }

  public execute_effect(): void {
    this.cpx(this.load_x(this.addr));
  }
}

export namespace CPX {
  export class Immediate_VariableX extends CPX {
    public static opcode = 0xe0;
    public static mode = InstructionMode.Immediate_VariableX;
    public static base_cycles = 3;
    public static cycles_modifier = minus_x;

    public execute_effect(): void {
      this.cpx(this._arg);
    }
  }

  export class DirectPage extends CPX {
    public static opcode = 0xe4;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends CPX {
    public static opcode = 0xec;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x;
  }
}
