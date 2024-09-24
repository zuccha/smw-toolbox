import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class DEY extends Instruction {
  public static mnemonic = "DEY";
  public static opcode = 0x88;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.y = w(this.p.y.word - 1);
  }
}
