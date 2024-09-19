import { Core } from "../core";
import {
  Instruction,
  minus_2m,
  plus_1_if_dp_low_is_zero,
} from "../instruction";
import { Integer } from "../integer";

export abstract class ASL extends Instruction {
  public static mnemonic = "ASL";

  protected asl(value: number): number {
    if (this._core.m) {
      const result = new Integer(value << 1);
      this._core.n = result.low & Core.Flag.N;
      this._core.z = result.b === 0;
      this._core.c = value & Core.Flag.N; // N is correct.
      return result.b;
    } else {
      const result = new Integer(value << 1);
      this._core.n = result.high & Core.Flag.N;
      this._core.z = result.w === 0;
      this._core.c = (value >> 8) & Core.Flag.N; // N is correct.
      return result.w;
    }
  }
}

export abstract class ASL_Addr extends ASL {
  public execute_effect(): void {
    const addr = this.addr;
    const value = this._core.load(addr);
    this._core.save(addr, this.asl(value));
  }
}

export namespace ASL {
  export class Accumulator extends ASL {
    public static type = Instruction.Type.Accumulator;
    public static baseCycles = 2;
    public static baseLength = 1;

    public execute_effect(): void {
      const value = this._core.A;
      this._core.A = this.asl(value);
    }
  }

  export class Direct extends ASL_Addr {
    public static type = Instruction.Type.Direct;
    public static baseCycles = 7;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Direct_X extends ASL_Addr {
    public static type = Instruction.Type.Direct_X;
    public static baseCycles = 8;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
    public static baseLength = 2;
  }

  export class Absolute extends ASL_Addr {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 8;
    public static cyclesModifier = minus_2m;
    public static baseLength = 3;
  }

  export class Absolute_X extends ASL_Addr {
    public static type = Instruction.Type.Absolute_X;
    public static baseCycles = 9;
    public static cyclesModifier = minus_2m;
    public static baseLength = 3;
  }
}
