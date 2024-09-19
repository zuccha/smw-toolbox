import { Instruction } from "../instruction";

export class NOP extends Instruction {
  public static mnemonic = "NOP";
  public static type = Instruction.Type.Implied;
  public static baseCycles = 2;
  public static baseLength = 1;

  public execute_effect(): void {}
}
