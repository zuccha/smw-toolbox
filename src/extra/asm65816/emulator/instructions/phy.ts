import { minus_x } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PHY extends Instruction {
  public static mnemonic = "PHY";
  public static opcode = 0x5a;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 4;
  public static cycles_modifier = minus_x;

  public execute_effect(): void {
    if (this.p.flag_x) {
      this.p.sp.sub_byte(1);
      this.m.save_byte(w(this.p.sp.word + 1), b(this.p.y.byte));
    } else {
      this.p.sp.sub_byte(2);
      this.m.save_byte(w(this.p.sp.word + 2), b(this.p.y.page));
      this.m.save_byte(w(this.p.sp.word + 1), b(this.p.y.byte));
    }
  }
}
