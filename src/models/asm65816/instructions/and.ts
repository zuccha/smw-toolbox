import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class AND extends Instruction {
  public get name(): string {
    return "AND";
  }

  protected and(value: number): number {
    this._core.PC = this._core.PC + this.length;
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

export namespace AND {
  export class Immediate extends AND {
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Immediate; }

    public execute(): void {
      const value = this._core.m ? this._arg.b : this._arg.w;
      this._core.A = this.and(value);
    }
  }

  export class Direct extends AND {
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }

    public execute(): void {
      const value = this._core.load(this._core.direct(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Direct_X extends AND {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }

    public execute(): void {
      const value = this._core.load(this._core.direct_x(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Direct_Indirect extends AND {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect; }

    public execute(): void {
      const value = this._core.load(this._core.direct_indirect(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Direct_X_Indirect extends AND {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X_Indirect; }

    public execute(): void {
      const value = this._core.load(this._core.direct_x_indirect(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Direct_Indirect_Y extends AND {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low + this._core.Y_cross(this._core.direct_indirect_y(this._arg)); }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect_Y; }

    public execute(): void {
      const value = this._core.load(this._core.direct_indirect_y(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Direct_IndirectLong extends AND {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong; }

    public execute(): void {
      const value = this._core.load(this._core.direct_indirectLong(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Direct_IndirectLong_Y extends AND {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong_Y; }

    public execute(): void {
      const addr = this._core.direct_indirectLong_y(this._arg);
      const value = this._core.load(addr);
      this._core.A = this.and(value);
    }
  }

  export class Absolute extends AND {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }

    public execute(): void {
      const value = this._core.load(this._core.absolute(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Absolute_X extends AND {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this._core.absolute_x(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }

    public execute(): void {
      const value = this._core.load(this._core.absolute_x(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class Absolute_Y extends AND {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.Y_cross(this._core.absolute_y(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Y; }

    public execute(): void {
      const value = this._core.load(this._core.absolute_y(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class AbsoluteLong extends AND {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }

    public execute(): void {
      const value = this._core.load(this._core.absoluteLong(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class AbsoluteLong_X extends AND {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong_X; }

    public execute(): void {
      const value = this._core.load(this._core.absoluteLong_x(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class StackRelative extends AND {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative; }

    public execute(): void {
      const value = this._core.load(this._core.stackRelative(this._arg));
      this._core.A = this.and(value);
    }
  }

  export class StackRelative_Indirect_Y extends AND {
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative_Indirect_Y; }

    public execute(): void {
      const addr = this._core.stackRelative_indirect_y(this._arg);
      const value = this._core.load(addr);
      this._core.A = this.and(value);
    }
  }
}
