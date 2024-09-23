import { minus_m } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PHA extends Instruction {
  public static mnemonic = "PHA";
  public static opcode = 0x48;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 4;
  public static cycles_modifier = minus_m;

  public execute_effect(): void {
    if (this.p.flag_m) {
      this.p.sp.sub_word(1);
      this.m.save_byte(w(this.p.sp.word + 1), b(this.p.a.byte));
    } else {
      this.p.sp.sub_word(2);
      this.m.save_word(w(this.p.sp.word + 1), w(this.p.a.word));
    }
  }
}
