import { flag_n_mask, minus_m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export abstract class ROL extends Instruction {
  public static mnemonic = "ROL";

  protected rol(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result = b((value.byte << 1) + this.p.flag_c);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      this.p.flag_c = value.byte & flag_n_mask; // N is correct.
      return result;
    } else {
      const result = w((value.word << 1) + this.p.flag_c);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      this.p.flag_c = value.page & flag_n_mask; // N is correct.
      return result;
    }
  }
}

export abstract class ROL_Addr extends ROL {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, this.rol(this.load_m(addr)));
  }
}

export namespace ROL {
  export class Accumulator extends ROL {
    public static opcode = 0x2a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;

    public execute_effect(): void {
      this.p.a = this.rol(this.p.a);
    }
  }

  export class DirectPage extends ROL_Addr {
    public static opcode = 0x26;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends ROL_Addr {
    public static opcode = 0x36;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends ROL_Addr {
    public static opcode = 0x2e;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends ROL_Addr {
    public static opcode = 0x3e;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 8;
    public static cyclesModifier = minus_m;
  }
}
