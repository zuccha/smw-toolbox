import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class SEC extends Instruction {
  public static mnemonic = "SEC";
  public static opcode = 0x38;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.flag_c = 1;
  }
}
