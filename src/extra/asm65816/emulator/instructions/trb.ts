import {
  flag_z_mask,
  minus_2m,
  plus_1_if_dp_low_is_not_zero,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export abstract class TRB extends Instruction {
  public static mnemonic = "TRB";
  public static affected_flags = flag_z_mask;

  public execute_effect(): void {
    const addr = this.addr;
    if (this.p.flag_m) {
      const value = this.m.load_byte(addr);
      const result = value.byte & ~this.p.a.byte;
      this.p.flag_z = (value.byte & this.p.a.byte) === 0;
      this.m.save_byte(addr, b(result));
    } else {
      const value = this.m.load_word(addr);
      const result = value.word & ~this.p.a.word;
      this.p.flag_z = (value.word & this.p.a.word) === 0;
      this.m.save_word(addr, w(result));
    }
  }
}

export namespace TRB {
  export class DirectPage extends TRB {
    public static opcode = 0x14;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cycles_modifier = minus_2m | plus_1_if_dp_low_is_not_zero;
  }

  export class Absolute extends TRB {
    public static opcode = 0x1c;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cycles_modifier = minus_2m;
  }
}
