import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLI extends Instruction {
  public static mnemonic = "CLI";
  public static opcode = 0x58;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.flag_i = 0;
  }
}
