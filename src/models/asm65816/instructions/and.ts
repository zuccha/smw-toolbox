import { Core } from "../core";
import {
  Instruction,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../instruction";
import { Integer } from "../integer";

export abstract class AND extends Instruction {
  public static mnemonic = "AND";

  protected and(value: number): number {
    if (this._core.m) {
      const result = new Integer(value & this._core.A);
      this._core.n = result.low & Core.Flag.N;
      this._core.z = result.b === 0;
      return result.b;
    } else {
      const result = new Integer(value & this._core.A);
      this._core.n = result.high & Core.Flag.N;
      this._core.z = result.w === 0;
      return result.w;
    }
  }
}

export abstract class AND_Addr extends AND {
  public execute_effect(): void {
    const value = this._core.load(this.addr);
    this._core.A = this.and(value);
  }
}

export namespace AND {
  export class Immediate extends AND {
    public static type = Instruction.Type.Immediate;
    public static baseCycles = 3;
    public static cyclesModifier = minus_m;
    public static baseLength = 3;
    public static lengthModifier = minus_m;

    public execute_effect(): void {
      const value = this._core.m ? this._arg.b : this._arg.w;
      this._core.A = this.and(value);
    }
  }

  export class Direct extends AND_Addr {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X extends AND_Addr {
    public static type = Instruction.Type.Direct_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_Indirect extends AND_Addr {
    public static type = Instruction.Type.Direct_Indirect;
    public static baseCycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X_Indirect extends AND_Addr {
    public static type = Instruction.Type.Direct_X_Indirect;
    public static baseCycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_Indirect_Y extends AND_Addr {
    public static type = Instruction.Type.Direct_Indirect_Y;
    public static baseCycles = 6;
    public static cyclesModifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
    public static baseLength = 2;
  }

  export class Direct_IndirectLong extends AND_Addr {
    public static type = Instruction.Type.Direct_IndirectLong;
    public static baseCycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_IndirectLong_Y extends AND_Addr {
    public static type = Instruction.Type.Direct_IndirectLong_Y;
    public static baseCycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends AND_Addr {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m;
    public static baseLength = 3;
  }

  export class Absolute_X extends AND_Addr {
    public static type = Instruction.Type.Absolute_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
    public static baseLength = 3;
  }

  export class Absolute_Y extends AND_Addr {
    public static type = Instruction.Type.Absolute_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_y_crosses_page;
    public static baseLength = 3;
  }

  export class AbsoluteLong extends AND_Addr {
    public static type = Instruction.Type.AbsoluteLong;
    public static baseCycles = 6;
    public static cyclesModifier = minus_m;
    public static baseLength = 4;
  }

  export class AbsoluteLong_X extends AND_Addr {
    public static type = Instruction.Type.AbsoluteLong;
    public static baseCycles = 6;
    public static cyclesModifier = minus_m;
    public static baseLength = 4;
  }

  export class StackRelative extends AND_Addr {
    public static type = Instruction.Type.StackRelative;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m;
    public static baseLength = 2;
  }

  export class StackRelative_Indirect_Y extends AND_Addr {
    public static type = Instruction.Type.StackRelative_Indirect_Y;
    public static baseCycles = 8;
    public static cyclesModifier = minus_m;
    public static baseLength = 2;
  }
}
