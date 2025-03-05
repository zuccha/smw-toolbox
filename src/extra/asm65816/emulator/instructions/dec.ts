import {
  flag_n_mask,
  flag_z_mask,
  minus_2m,
  plus_1_if_dp_low_is_not_zero,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { ReadOnlyValue, w } from "../value";

export abstract class DEC extends Instruction {
  public static mnemonic = "DEC";
  public static affected_flags = flag_n_mask | flag_z_mask;

  protected dec(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result = w(value.byte - 1);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      return result;
    } else {
      const result = w(value.word - 1);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      return result;
    }
  }
}

export abstract class DEC_Addr extends DEC {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, this.dec(this.load_m(addr)));
  }
}

export namespace DEC {
  export class Accumulator extends DEC {
    public static opcode = 0x3a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;

    public execute_effect(): void {
      this.p.a = this.dec(this.p.a);
    }
  }

  export class DirectPage extends DEC_Addr {
    public static opcode = 0xc6;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cycles_modifier = minus_2m | plus_1_if_dp_low_is_not_zero;
  }

  export class DirectPage_X extends DEC_Addr {
    public static opcode = 0xd6;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 8;
    public static cycles_modifier = minus_2m | plus_1_if_dp_low_is_not_zero;
  }

  export class Absolute extends DEC_Addr {
    public static opcode = 0xce;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cycles_modifier = minus_2m;
  }

  export class Absolute_X extends DEC_Addr {
    public static opcode = 0xde;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 9;
    public static cycles_modifier = minus_2m;
  }
}
