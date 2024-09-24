import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class INX extends Instruction {
  public static mnemonic = "INX";
  public static opcode = 0xe8;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this.p.x = w(this.p.x.word + 1);
  }
}
