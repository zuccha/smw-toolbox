import { Instruction } from "../instruction";
import { b, l } from "../utils";

export abstract class JSR extends Instruction {
  public static mnemonic = "JSR";

  public execute_effect(): void {
    this._core.PC = this._core.PC - 1;
    this._core.SP = this._core.SP - 2;
    this._core.save_byte(l(this._core.SP + 2), b(this._core.PC >> 8));
    this._core.save_byte(l(this._core.SP + 1), b(this._core.PC));
    this._core.PC = this._arg.w;
  }
}

export abstract class JSL extends Instruction {
  public static mnemonic = "JSL";

  public execute_effect(): void {
    this._core.PC = this._core.PC - 1;
    this._core.SP = this._core.SP - 3;
    this._core.save_byte(l(this._core.SP + 3), this._core.PB);
    this._core.save_byte(l(this._core.SP + 2), b(this._core.PC >> 8));
    this._core.save_byte(l(this._core.SP + 1), b(this._core.PC));
    this._core.PB = this._arg.bank;
    this._core.PC = this._arg.w;
  }
}

export namespace JSR {
  export class Absolute extends JSR {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 6;
    public static baseLength = 3;
  }

  export class Absolute_X_Indirect extends JSR {
    public static type = Instruction.Type.Absolute_X_Indirect;
    public static baseCycles = 8;
    public static baseLength = 3;
  }

  export class AbsoluteLong extends JSL {
    public static type = Instruction.Type.AbsoluteLong;
    public static baseCycles = 8;
    public static baseLength = 4;
  }
}
