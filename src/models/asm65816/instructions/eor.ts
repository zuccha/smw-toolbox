import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class EOR extends Instruction {
  // prettier-ignore
  public get name(): string { return "EOR"; }

  protected eor(value: number): number {
    this._core.PC = this._core.PC + this.length;
    if (this._core.m) {
      const result = new Integer(value ^ this._core.A);
      this._core.n = result.low & Core.Flag.N;
      this._core.z = result.b === 0;
      return result.b;
    } else {
      const result = new Integer(value ^ this._core.A);
      this._core.n = result.high & Core.Flag.N;
      this._core.z = result.w === 0;
      return result.w;
    }
  }
}

export abstract class EOR_Addr extends EOR {
  public execute(): void {
    const value = this._core.m ? this._arg.b : this._arg.w;
    this._core.A = this.eor(value);
  }
}

export namespace EOR {
  export class Immediate extends EOR {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Immediate; }
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }

    public execute(): void {
      const value = this._core.m ? this._arg.b : this._arg.w;
      this._core.A = this.eor(value);
    }
  }

  export class Direct extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_Indirect extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X_Indirect extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_Indirect_Y extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect_Y; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low + this._core.Y_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_IndirectLong extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_IndirectLong_Y extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong_Y; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_Y extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Y; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.Y_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class AbsoluteLong extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
  }

  export class AbsoluteLong_X extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong_X; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
  }

  export class StackRelative extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class StackRelative_Indirect_Y extends EOR_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative_Indirect_Y; }
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
  }
}
