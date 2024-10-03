import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class NOP extends Instruction {
  public static mnemonic = "NOP";
  public static opcode = 0xea;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {}
}
