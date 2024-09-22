import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class RTL extends Instruction {
  public static mnemonic = "RTL";
  public static opcode = 0x6b;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 6;

  public execute_effect(): void {
    this.p.pc.byte = this.m.load_byte(w(this.p.sp.word + 1)).byte;
    this.p.pc.page = this.m.load_byte(w(this.p.sp.word + 2)).byte;
    this.p.pb.byte = this.m.load_byte(w(this.p.sp.word + 3)).byte;
    this.p.sp.word = this.p.sp.word + 3;
    this.p.pc.word = this.p.pc.word + 1;
  }
}
