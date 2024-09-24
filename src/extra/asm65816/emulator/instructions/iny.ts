import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class INY extends Instruction {
  public static mnemonic = "INY";
  public static opcode = 0xc8;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this.p.y = w(this.p.y.word + 1);
  }
}
