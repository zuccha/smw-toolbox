import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class DEY extends Instruction {
  public static mnemonic = "DEY";
  public static opcode = 0x88;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.y.byte = this.p.y.byte - 1;
    else this.p.y.word = this.p.y.word - 1;
  }
}
