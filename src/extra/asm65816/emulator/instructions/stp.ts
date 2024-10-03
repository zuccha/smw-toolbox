import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class STP extends Instruction {
  public static mnemonic = "STP";
  public static opcode = 0xdb;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 3;

  public execute_effect(): void {
    throw new Error("STP: Unsupported instruction.");
  }
}
