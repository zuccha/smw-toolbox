import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLI extends Instruction {
  public static mnemonic = "CLI";
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.flag_i = 0;
  }
}
