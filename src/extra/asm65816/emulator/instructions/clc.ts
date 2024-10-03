import { flag_c_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLC extends Instruction {
  public static mnemonic = "CLC";
  public static opcode = 0x18;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static affected_flags = flag_c_mask;

  public execute_effect(): void {
    this.p.flag_c = 0;
  }
}
