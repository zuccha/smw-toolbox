import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class RTL extends Instruction {
  public static mnemonic = "RTL";
  public static opcode = 0x6b;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 6;

  public execute_effect(): void {
    const pc_byte = this.m.load_byte(w(this.p.sp.word + 1)).byte;
    const pc_page = this.m.load_byte(w(this.p.sp.word + 2)).byte;
    this.p.pc = w((pc_page << 8) | pc_byte);
    this.p.pb = this.m.load_byte(w(this.p.sp.word + 3));
    this.p.sp = w(this.p.sp.word + 3);
    this.p.pc = w(this.p.pc.word + 1);
  }
}
