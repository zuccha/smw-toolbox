import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export class PEA extends Instruction {
  public static mnemonic = "PEA";
  public static opcode = 0xf4;
  public static mode = InstructionMode.Absolute;
  public static base_cycles = 5;

  public execute_effect(): void {
    this.p.sp.sub_word(2);
    this.m.save_byte(w(this.p.sp.word + 2), b(this._arg.page));
    this.m.save_byte(w(this.p.sp.word + 1), b(this._arg.byte));
  }
}
