import { Instruction, minus_x, plus_1_if_dp_low_is_zero } from "../instruction";

export abstract class CPY extends Instruction {
  public static mnemonic = "CPY";

  protected cpy(value: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.n = this._core.Y < value;
    this._core.z = this._core.Y === value;
    this._core.c = this._core.Y >= value;
  }

  public execute(): void {
    this.cpy(this._core.load_x(this.addr));
  }
}

export namespace CPY {
  export class Immediate extends CPY {
    public static type = Instruction.Type.Immediate;
    public static baseCycles = 3;
    public static cyclesModifier = minus_x;
    public static baseLength = 3;
    public static lengthModifier = minus_x;

    public execute(): void {
      this.cpy(this._core.x ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CPY {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 4;
    public static cyclesModifier = minus_x | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends CPY {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 5;
    public static cyclesModifier = minus_x;
    public static baseLength = 3;
  }
}
