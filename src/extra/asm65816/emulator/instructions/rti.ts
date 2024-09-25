import { minus_e } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class RTI extends Instruction {
  public static mnemonic = "RTI";
  public static opcode = 0x40;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 7;
  public static cycles_modifier = minus_e;

  public execute_effect(): void {
    throw new Error("RTI: Unsupported instruction.");
  }
}
