import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class DEX extends Instruction {
  public static mnemonic = "DEX";
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.x.byte = this.p.x.byte - 1;
    else this.p.x.word = this.p.x.word - 1;
  }
}
