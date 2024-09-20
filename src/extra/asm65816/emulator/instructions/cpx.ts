import { minus_x, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { Value } from "../value";

export abstract class CPX extends Instruction {
  public static mnemonic = "CPX";

  protected cpx(value: Value): void {
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
    public static mode = InstructionMode.Immediate_VariableX;
    public static base_cycles = 3;
    public static cyclesModifier = minus_x;

    public execute_effect(): void {
      this.cpx(this._arg);
    }
  }

  export class DirectPage extends CPX {
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_x | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends CPX {
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_x;
  }
}
