import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PHK extends Instruction {
  public static mnemonic = "PHK";
  public static opcode = 0x4b;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 3;

  public execute_effect(): void {
    this.p.sp.sub_byte(1);
    this.m.save_byte(w(this.p.sp.word + 1), b(this.p.pb.byte));
  }
}
