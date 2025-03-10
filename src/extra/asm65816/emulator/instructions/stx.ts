import { minus_x, plus_1_if_dp_low_is_not_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export abstract class STX extends Instruction {
  public static mnemonic = "STX";

  public execute_effect(): void {
    this.save_x(this.addr, this.p.x);
  }
}

export namespace STX {
  export class DirectPage extends STX {
    public static opcode = 0x86;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_Y extends STX {
    public static opcode = 0x96;
    public static mode = InstructionMode.DirectPage_Y;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_not_zero;
  }

  export class Absolute extends STX {
    public static opcode = 0x8e;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x;
  }
}
