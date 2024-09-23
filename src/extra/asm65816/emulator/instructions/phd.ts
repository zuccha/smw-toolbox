import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PHD extends Instruction {
  public static mnemonic = "PHD";
  public static opcode = 0x0b;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 4;

  public execute_effect(): void {
    this.p.sp.sub_byte(2);
    this.m.save_byte(w(this.p.sp.word + 2), b(this.p.dp.page));
    this.m.save_byte(w(this.p.sp.word + 1), b(this.p.dp.byte));
  }
}
