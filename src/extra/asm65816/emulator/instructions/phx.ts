import { minus_x } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PHX extends Instruction {
  public static mnemonic = "PHX";
  public static opcode = 0xda;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 4;
  public static cycles_modifier = minus_x;

  public execute_effect(): void {
    if (this.p.flag_x) {
      this.p.sp.sub_word(1);
      this.m.save_byte(w(this.p.sp.word + 1), b(this.p.x.byte));
    } else {
      this.p.sp.sub_word(2);
      this.m.save_word(w(this.p.sp.word + 1), w(this.p.x.word));
    }
  }
}
