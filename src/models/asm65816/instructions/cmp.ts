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

  public execute(): void {
    this.cmp(this._core.load(this.addr));
  }
}

export namespace CMP {
  export class Immediate extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Implied; }
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }

    public execute(): void {
      this.cmp(this._core.m ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_Indirect extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X_Indirect extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_Indirect_Y extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect_Y; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low + this._core.Y_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_IndirectLong extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_IndirectLong_Y extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong_Y; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_Y extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Y; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.Y_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class AbsoluteLong extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
  }

  export class AbsoluteLong_X extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong_X; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
  }

  export class StackRelative extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class StackRelative_Indirect_Y extends CMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative_Indirect_Y; }
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
  }
}
