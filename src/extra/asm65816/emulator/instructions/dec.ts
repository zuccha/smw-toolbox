import { minus_2m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export abstract class DEC extends Instruction {
  public static mnemonic = "DEC";
}

export abstract class DEC_Addr extends DEC {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, w(this.load_m(addr).word - 1));
  }
}

export namespace DEC {
  export class Accumulator extends DEC {
    public static opcode = 0x3a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;

    public execute_effect(): void {
      this.p.a = w(this.p.a.word - 1);
    }
  }

  export class DirectPage extends DEC_Addr {
    public static opcode = 0xc6;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends DEC_Addr {
    public static opcode = 0xd6;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 8;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends DEC_Addr {
    public static opcode = 0xce;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cyclesModifier = minus_2m;
  }

  export class Absolute_X extends DEC_Addr {
    public static opcode = 0xde;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 9;
    public static cyclesModifier = minus_2m;
  }
}
