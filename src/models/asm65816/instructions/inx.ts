import { Instruction } from "../instruction";

export class INX extends Instruction {
  public static mnemonic = "INX";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this._core.X = this._core.X + 1;
  }
}
