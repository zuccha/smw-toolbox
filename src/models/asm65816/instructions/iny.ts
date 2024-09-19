import { Instruction } from "../instruction";

export class INY extends Instruction {
  public static mnemonic = "INY";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this._core.Y = this._core.Y + 1;
  }
}
