import { minus_x, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { Value } from "../value";

export abstract class CPY extends Instruction {
  public static mnemonic = "CPY";

  protected cpy(value: Value): void {
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
    public static cyclesModifier = minus_x;

    public execute_effect(): void {
      this.cpy(this._arg);
    }
  }

  export class DirectPage extends CPY {
    public static opcode = 0xc4;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_x | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends CPY {
    public static opcode = 0xcc;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_x;
    public static baseLength = 3;
  }
}
