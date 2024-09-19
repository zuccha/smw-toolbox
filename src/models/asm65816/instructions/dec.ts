import {
  Instruction,
  minus_2m,
  plus_1_if_dp_low_is_zero,
} from "../instruction";

export abstract class DEC extends Instruction {
  public static mnemonic = "DEC";

  public execute_effect(): void {
    const addr = this.addr;
    this._core.save(addr, this._core.load(addr) - 1);
  }
}

export namespace DEC {
  export class Accumulator extends DEC {
    public static type = Instruction.Type.Accumulator;
    public static baseCycles = 2;
    public static baseLength = 1;

    public execute_effect(): void {
      this._core.A = this._core.A - 1;
    }
  }

  export class Direct extends DEC {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 7;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X extends DEC {
    public static type = Instruction.Type.Direct_X;
    public static baseCycles = 8;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends DEC {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 8;
    public static cyclesModifier = minus_2m;
    public static baseLength = 3;
  }

  export class Absolute_X extends DEC {
    public static type = Instruction.Type.Absolute_X;
    public static baseCycles = 9;
    public static cyclesModifier = minus_2m;
    public static baseLength = 3;
  }
}
