import { Instruction } from "../instruction";

export abstract class CMP extends Instruction {
  // prettier-ignore
  public get name(): string { return "CMP"; }

  protected cmp(value: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.n = this._core.A < value;
    this._core.z = this._core.A === value;
    this._core.c = this._core.A >= value;
  }
}

export namespace CMP {
  export class Immediate extends CMP {
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Implied; }

    public execute(): void {
      this.cmp(this._core.m ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CMP {
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }

    public execute(): void {
      const addr = this._core.direct(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Direct_X extends CMP {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }

    public execute(): void {
      const addr = this._core.direct_x(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Direct_Indirect extends CMP {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect; }

    public execute(): void {
      const addr = this._core.direct_indirect(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Direct_X_Indirect extends CMP {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X_Indirect; }

    public execute(): void {
      const addr = this._core.direct_x_indirect(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Direct_Indirect_Y extends CMP {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low + this._core.Y_cross(this._core.direct_indirect_y(this._arg)); }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect_Y; }

    public execute(): void {
      const addr = this._core.direct_indirect_y(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Direct_IndirectLong extends CMP {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong; }

    public execute(): void {
      const addr = this._core.direct_indirectLong(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Direct_IndirectLong_Y extends CMP {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong_Y; }

    public execute(): void {
      const addr = this._core.direct_indirectLong_y(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Absolute extends CMP {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }

    public execute(): void {
      const addr = this._core.absolute(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Absolute_X extends CMP {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this._core.absolute_x(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }

    public execute(): void {
      const addr = this._core.absolute_x(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class Absolute_Y extends CMP {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.Y_cross(this._core.absolute_y(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Y; }

    public execute(): void {
      const addr = this._core.absolute_y(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class AbsoluteLong extends CMP {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }

    public execute(): void {
      const addr = this._core.absoluteLong(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class AbsoluteLong_X extends CMP {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong_X; }

    public execute(): void {
      const addr = this._core.absoluteLong_x(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class StackRelative extends CMP {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative; }

    public execute(): void {
      const addr = this._core.stackRelative(this._arg);
      this.cmp(this._core.load(addr));
    }
  }

  export class StackRelative_Indirect_Y extends CMP {
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative_Indirect_Y; }

    public execute(): void {
      const addr = this._core.stackRelative_indirect_y(this._arg);
      this.cmp(this._core.load(addr));
    }
  }
}
