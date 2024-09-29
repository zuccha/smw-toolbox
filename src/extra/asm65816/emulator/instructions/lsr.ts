import {
  flag_c_mask,
  flag_n_mask,
  flag_z_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export abstract class LSR extends Instruction {
  public static mnemonic = "LSR";
  public static affected_flags = flag_n_mask | flag_z_mask | flag_c_mask;

  protected lsr(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result = b(value.byte >> 1);
      this.p.flag_n = 0;
      this.p.flag_z = result.byte === 0;
      this.p.flag_c = value.byte & flag_c_mask;
      return result;
    } else {
      const result = w(value.word >> 1);
      this.p.flag_n = 0;
      this.p.flag_z = result.word === 0;
      this.p.flag_c = value.byte & flag_c_mask;
      return result;
    }
  }
}

export abstract class LSR_Addr extends LSR {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, this.lsr(this.load_m(addr)));
  }
}

export namespace LSR {
  export class Accumulator extends LSR {
    public static opcode = 0x4a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;

    public execute_effect(): void {
      this.p.a = this.lsr(this.p.a);
    }
  }

  export class DirectPage extends LSR_Addr {
    public static opcode = 0x46;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 6;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends LSR_Addr {
    public static opcode = 0x56;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends LSR_Addr {
    public static opcode = 0x4e;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 7;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_X extends LSR_Addr {
    public static opcode = 0x5e;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 8;
    public static cycles_modifier = minus_m;
  }
}
