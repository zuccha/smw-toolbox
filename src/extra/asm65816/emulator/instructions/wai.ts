import { plus_x_to_restart_processor } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class WAI extends Instruction {
  public static mnemonic = "WAI";
  public static opcode = 0xcb;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 3;
  public static cycles_modifier = plus_x_to_restart_processor;

  public execute_effect(): void {
    throw new Error("WAI: Unsupported instruction.");
  }
}
