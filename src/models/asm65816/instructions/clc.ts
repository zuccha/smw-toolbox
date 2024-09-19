import { Instruction } from "../instruction";

export class CLC extends Instruction {
  public static mnemonic = "CLC";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this._core.c = 0;
  }
}
