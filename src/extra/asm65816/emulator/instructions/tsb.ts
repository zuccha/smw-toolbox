import { minus_2m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export abstract class TSB extends Instruction {
  public static mnemonic = "TSB";

  public execute_effect(): void {
    const addr = this.addr;
    if (this.p.flag_m) {
      const value = this.m.load_byte(addr);
      const result = value.byte | this.p.a.byte;
      this.p.flag_z = (value.byte & this.p.a.byte) === 0;
      this.m.save_byte(addr, b(result));
    } else {
      const value = this.m.load_byte(addr);
      const result = value.word | this.p.a.word;
      this.p.flag_z = (value.word & this.p.a.word) === 0;
      this.m.save_word(addr, w(result));
    }
  }
}

export namespace TSB {
  export class DirectPage extends TSB {
    public static opcode = 0x04;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cycles_modifier = minus_2m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends TSB {
    public static opcode = 0x0c;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cycles_modifier = minus_2m;
  }
}