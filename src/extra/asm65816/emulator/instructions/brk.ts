import { minus_e } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class BRK extends Instruction {
  public static mnemonic = "BRK";
  public static opcode = 0x00;
  public static mode = InstructionMode.Immediate;
  public static base_cycles = 8;
  public static cycles_modifier = minus_e;

  public execute_effect(): void {
    throw new Error("BRK: Unsupported instruction.");
  }
}
