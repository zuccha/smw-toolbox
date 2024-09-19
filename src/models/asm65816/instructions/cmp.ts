import {
  Instruction,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../instruction";

export abstract class CMP extends Instruction {
  public static mnemonic = "CMP";

  protected cmp(value: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.n = this._core.A < value;
    this._core.z = this._core.A === value;
    this._core.c = this._core.A >= value;
  }

  public execute(): void {
    this.cmp(this._core.load(this.addr));
  }
}

export namespace CMP {
  export class Immediate extends CMP {
    public static type = Instruction.Type.Immediate;
    public static baseCycles = 3;
    public static cyclesModifier = minus_m;
    public static baseLength = 3;
    public static lengthModifier = minus_m;

    public execute(): void {
      this.cmp(this._core.m ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CMP {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X extends CMP {
    public static type = Instruction.Type.Direct_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_Indirect extends CMP {
    public static type = Instruction.Type.Direct_Indirect;
    public static baseCycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X_Indirect extends CMP {
    public static type = Instruction.Type.Direct_X_Indirect;
    public static baseCycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_Indirect_Y extends CMP {
    public static type = Instruction.Type.Direct_Indirect_Y;
    public static baseCycles = 6;
    public static cyclesModifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
    public static baseLength = 2;
  }

  export class Direct_IndirectLong extends CMP {
    public static type = Instruction.Type.Direct_IndirectLong;
    public static baseCycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_IndirectLong_Y extends CMP {
    public static type = Instruction.Type.Direct_IndirectLong_Y;
    public static baseCycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends CMP {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m;
    public static baseLength = 3;
  }

  export class Absolute_X extends CMP {
    public static type = Instruction.Type.Absolute_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
    public static baseLength = 3;
  }

  export class Absolute_Y extends CMP {
    public static type = Instruction.Type.Absolute_Y;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_y_crosses_page;
    public static baseLength = 3;
  }

  export class AbsoluteLong extends CMP {
    public static type = Instruction.Type.AbsoluteLong;
    public static baseCycles = 6;
    public static cyclesModifier = minus_m;
    public static baseLength = 4;
  }

  export class AbsoluteLong_X extends CMP {
    public static type = Instruction.Type.AbsoluteLong_X;
    public static baseCycles = 6;
    public static cyclesModifier = minus_m;
    public static baseLength = 4;
  }

  export class StackRelative extends CMP {
    public static type = Instruction.Type.StackRelative;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m;
    public static baseLength = 2;
  }

  export class StackRelative_Indirect_Y extends CMP {
    public static type = Instruction.Type.StackRelative_Indirect_Y;
    public static baseCycles = 8;
    public static cyclesModifier = minus_m;
    public static baseLength = 2;
  }
}
