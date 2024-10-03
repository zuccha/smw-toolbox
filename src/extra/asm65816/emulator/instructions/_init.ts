import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class _Init extends Instruction {
  public static mnemonic = "<initial>";
  public static opcode = -1;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 0;

  public execute_effect(): void {}

  public get length(): number {
    return 0;
  }

  public get bytes(): number[] {
    return [];
  }
}
