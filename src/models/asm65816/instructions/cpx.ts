import { Instruction } from "../instruction";

export abstract class CPX extends Instruction {
  // prettier-ignore
  public get name(): string { return "CPX"; }

  protected cpx(value: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.n = this._core.X < value;
    this._core.z = this._core.X === value;
    this._core.c = this._core.X >= value;
  }

  public execute(): void {
    this.cpx(this._core.load_x(this.addr));
  }
}

export namespace CPX {
  export class Immediate extends CPX {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Implied; }
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.x; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.x; }

    public execute(): void {
      this.cpx(this._core.x ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CPX {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.x + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends CPX {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.x; }
    // prettier-ignore
    public get length(): number { return 3; }
  }
}
