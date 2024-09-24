import { minus_2m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export abstract class INC extends Instruction {
  public static mnemonic = "INC";
}

export abstract class INC_Addr extends INC {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, w(this.load_m(addr).word + 1));
  }
}

export namespace INC {
  export class Accumulator extends INC {
    public static opcode = 0x1a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;
    public static baseLength = 1;

    public execute_effect(): void {
      this.p.a = w(this.p.a.word + 1);
    }
  }

  export class DirectPage extends INC_Addr {
    public static opcode = 0xe6;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class DirectPage_X extends INC_Addr {
    public static opcode = 0xf6;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 8;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends INC_Addr {
    public static opcode = 0xee;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cyclesModifier = minus_2m;
    public static baseLength = 3;
  }

  export class Absolute_X extends INC_Addr {
    public static opcode = 0xfe;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 9;
    public static cyclesModifier = minus_2m;
    public static baseLength = 3;
  }
}
