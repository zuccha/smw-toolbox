import { minus_m, plus_1_if_dp_low_is_not_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export abstract class STA extends Instruction {
  public static mnemonic = "STA";

  public execute_effect(): void {
    this.save_m(this.addr, this.p.a);
  }
}

export namespace STA {
  export class DirectPage extends STA {
    public static opcode = 0x85;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_X extends STA {
    public static opcode = 0x95;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_Indirect extends STA {
    public static opcode = 0x92;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_X_Indirect extends STA {
    public static opcode = 0x81;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_Indirect_Y extends STA {
    public static opcode = 0x91;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_IndirectLong extends STA {
    public static opcode = 0x87;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_IndirectLong_Y extends STA {
    public static opcode = 0x97;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_not_zero;
  }

  export class Absolute extends STA {
    public static opcode = 0x8d;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_X extends STA {
    public static opcode = 0x9d;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_Y extends STA {
    public static opcode = 0x99;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class AbsoluteLong extends STA {
    public static opcode = 0x8f;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class AbsoluteLong_X extends STA {
    public static opcode = 0x9f;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative extends STA {
    public static opcode = 0x83;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends STA {
    public static opcode = 0x93;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cycles_modifier = minus_m;
  }
}
