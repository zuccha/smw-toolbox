import {
  flag_n_mask,
  flag_z_mask,
  minus_2m,
  plus_1_if_dp_low_is_zero,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { ReadOnlyValue, w } from "../value";

export abstract class INC extends Instruction {
  public static mnemonic = "INC";
  public static affected_flags = flag_n_mask | flag_z_mask;

  protected inc(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result = w(value.byte + 1);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      return result;
    } else {
      const result = w(value.word + 1);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      return result;
    }
  }
}

export abstract class INC_Addr extends INC {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, this.inc(this.load_m(addr)));
  }
}

export namespace INC {
  export class Accumulator extends INC {
    public static opcode = 0x1a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;
    public static baseLength = 1;

    public execute_effect(): void {
      this.p.a = this.inc(this.p.a);
    }
  }

  export class DirectPage extends INC_Addr {
    public static opcode = 0xe6;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cycles_modifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class DirectPage_X extends INC_Addr {
    public static opcode = 0xf6;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 8;
    public static cycles_modifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends INC_Addr {
    public static opcode = 0xee;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cycles_modifier = minus_2m;
    public static baseLength = 3;
  }

  export class Absolute_X extends INC_Addr {
    public static opcode = 0xfe;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 9;
    public static cycles_modifier = minus_2m;
    public static baseLength = 3;
  }
}
