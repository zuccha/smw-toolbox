import { Instruction, minus_x, plus_1_if_dp_low_is_zero } from "../instruction";

export abstract class CPX extends Instruction {
  public static mnemonic = "CPX";

  protected cpx(value: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.n = this._core.X < value;
    this._core.z = this._core.X === value;
    this._core.c = this._core.X >= value;
  }

  public execute(): void {
    this.cpx(this._core.load_x(this.addr));
  }
}

export namespace CPX {
  export class Immediate extends CPX {
    public static type = Instruction.Type.Immediate;
    public static baseCycles = 3;
    public static cyclesModifier = minus_x;
    public static baseLength = 3;
    public static lengthModifier = minus_x;

    public execute(): void {
      this.cpx(this._core.x ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CPX {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 4;
    public static cyclesModifier = minus_x | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends CPX {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 5;
    public static cyclesModifier = minus_x;
    public static baseLength = 3;
  }
}
