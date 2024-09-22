import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLD extends Instruction {
  public static mnemonic = "CLD";
  public static opcode = 0xd8;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.flag_d = 0;
  }
}
