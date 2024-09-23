import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class WDM extends Instruction {
  public static mnemonic = "WDM";
  public static opcode = 0x42;
  public static mode = InstructionMode.Immediate;
  public static base_cycles = 2;

  public execute_effect(): void {}
}
