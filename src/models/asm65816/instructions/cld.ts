import { Instruction } from "../instruction";

export class CLD extends Instruction {
  public static mnemonic = "CLD";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute(): void {
    this._core.PC = this._core.PC + this.length;
    this._core.d = 0;
  }
}
