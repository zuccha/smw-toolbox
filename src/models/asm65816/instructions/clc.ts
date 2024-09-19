import { Instruction } from "../instruction";

export class CLC extends Instruction {
  public static mnemonic = "CLC";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute(): void {
    this._core.PC = this._core.PC + this.length;
    this._core.c = 0;
  }
}
