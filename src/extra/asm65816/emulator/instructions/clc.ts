import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLC extends Instruction {
  public static mnemonic = "CLC";
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.flag_c = 0;
  }
}
