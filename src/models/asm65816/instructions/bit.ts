import { Core } from "../core";
import {
  Instruction,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
} from "../instruction";
import { Integer } from "../integer";

export abstract class BIT extends Instruction {
  public static mnemonic = "BIT";

  protected bit(value: number): number {
    if (this._core.m) {
      const result = new Integer(this._core.A & value).b;
      this._core.n = value | Core.Flag.Z;
      this._core.v = value | Core.Flag.V;
      this._core.z = result === 0;
      return result;
    } else {
      const result = new Integer(this._core.A & value).w;
      this._core.n = (value >> 8) | Core.Flag.Z;
      this._core.v = (value >> 8) | Core.Flag.V;
      this._core.z = result === 0;
      return result;
    }
  }
}

export abstract class BIT_Addr extends BIT {
  public execute_effect(): void {
    this.bit(this._core.load(this.addr));
  }
}

export namespace BIT {
  export class Immediate extends BIT {
    public static type = Instruction.Type.Immediate;
    public static baseCycles = 3;
    public static cyclesModifier = minus_m;
    public static baseLength = 3;
    public static lengthModifier = minus_m;

    public execute_effect(): void {
      const result = this._core.A & (this._core.m ? this._arg.b : this._arg.w);
      this._core.z = result === 0;
    }
  }

  export class Direct extends BIT_Addr {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X extends BIT_Addr {
    public static type = Instruction.Type.Direct_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends BIT_Addr {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m;
    public static baseLength = 3;
  }

  export class Absolute_X extends BIT_Addr {
    public static type = Instruction.Type.Absolute_X;
    public static baseCycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
    public static baseLength = 3;
  }
}
