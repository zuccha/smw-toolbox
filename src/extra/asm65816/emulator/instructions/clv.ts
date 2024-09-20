import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLV extends Instruction {
  public static mnemonic = "CLV";
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this.p.flag_v = 0;
  }
}
