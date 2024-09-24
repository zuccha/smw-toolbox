import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PER extends Instruction {
  public static mnemonic = "PER";
  public static opcode = 0x62;
  public static mode = InstructionMode.OffsetLong;
  public static base_cycles = 6;

  public execute_effect(): void {
    this.p.sp = w(this.p.sp.word - 2);
    const addr = this.addr;
    this.m.save_byte(w(this.p.sp.word + 2), b(addr.page));
    this.m.save_byte(w(this.p.sp.word + 1), b(addr.byte));
  }
}
