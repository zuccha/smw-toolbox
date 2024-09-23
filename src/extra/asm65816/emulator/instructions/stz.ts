import { minus_m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export abstract class STZ extends Instruction {
  public static mnemonic = "STZ";

  public execute_effect(): void {
    this.save_m(this.addr, w(0));
  }
}

export namespace STZ {
  export class DirectPage extends STZ {
    public static opcode = 0x64;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends STZ {
    public static opcode = 0x74;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends STZ {
    public static opcode = 0x9c;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends STZ {
    public static opcode = 0x9e;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }
}
