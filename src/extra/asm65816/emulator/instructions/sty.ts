import { minus_x, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export abstract class STY extends Instruction {
  public static mnemonic = "STY";

  public execute_effect(): void {
    this.save_x(this.addr, this.p.y);
  }
}

export namespace STY {
  export class DirectPage extends STY {
    public static opcode = 0x84;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends STY {
    public static opcode = 0x94;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends STY {
    public static opcode = 0x8c;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_x;
  }
}
