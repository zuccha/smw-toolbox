import { flag_c_mask, minus_m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, Value, w } from "../value";

export abstract class ROR extends Instruction {
  public static mnemonic = "ROR";

  protected ror(value: Value): Value {
    if (this.p.flag_m) {
      const result = b((value.byte >> 1) | (this.p.flag_c << 7));
      this.p.flag_n = 0;
      this.p.flag_z = result.byte === 0;
      this.p.flag_c = value.byte & flag_c_mask;
      return result;
    } else {
      const result = w((value.word >> 1) | (this.p.flag_c << 15));
      this.p.flag_n = 0;
      this.p.flag_z = result.word === 0;
      this.p.flag_c = value.page & flag_c_mask;
      return result;
    }
  }
}

export abstract class ROR_Addr extends ROR {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, this.ror(this.load_m(addr)));
  }
}

export namespace ROR {
  export class Accumulator extends ROR {
    public static opcode = 0x6a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;

    public execute_effect(): void {
      this.p.set_a(this.ror(this.p.a).word);
    }
  }

  export class DirectPage extends ROR_Addr {
    public static opcode = 0x66;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends ROR_Addr {
    public static opcode = 0x76;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends ROR_Addr {
    public static opcode = 0x6e;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends ROR_Addr {
    public static opcode = 0x7e;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 8;
    public static cyclesModifier = minus_m;
  }
}