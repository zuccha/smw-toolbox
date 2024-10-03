import { flag_d_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class SED extends Instruction {
  public static mnemonic = "SED";
  public static opcode = 0xf8;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static affected_flags = flag_d_mask;

  public execute_effect(): void {
    this.p.flag_d = 1;
  }
}
