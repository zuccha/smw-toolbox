import { minus_e } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class COP extends Instruction {
  public static mnemonic = "COP";
  public static opcode = 0x02;
  public static mode = InstructionMode.Immediate;
  public static base_cycles = 8;
  public static cycles_modifier = minus_e;

  public execute_effect(): void {
    throw new Error("COP: Unsupported instruction.");
  }
}
