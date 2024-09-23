import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class SEI extends Instruction {
  public static mnemonic = "SEI";
  public static opcode = 0x78;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.flag_i = 1;
  }
}
