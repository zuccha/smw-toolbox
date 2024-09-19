import { Instruction } from "../instruction";

export class CLV extends Instruction {
  public static mnemonic = "CLV";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {
    this._core.v = 0;
  }
}
