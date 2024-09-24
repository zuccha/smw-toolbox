import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class DEX extends Instruction {
  public static mnemonic = "DEX";
  public static opcode = 0xca;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.x = w(this.p.x.word - 1);
  }
}
