import { Instruction } from "../instruction";

export class CLI extends Instruction {
  public static mnemonic = "CLI";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute(): void {
    this._core.PC = this._core.PC + this.length;
    this._core.i = 0;
  }
}
