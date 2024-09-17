import { Instruction } from "../instruction";

export abstract class CPY extends Instruction {
  // prettier-ignore
  public get name(): string { return "CPY"; }

  protected cpy(value: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.n = this._core.Y < value;
    this._core.z = this._core.Y === value;
    this._core.c = this._core.Y >= value;
  }
}

export namespace CPY {
  export class Immediate extends CPY {
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.x; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.x; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Implied; }

    public execute(): void {
      this.cpy(this._core.x ? this._arg.b : this._arg.w);
    }
  }

  export class Direct extends CPY {
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.x + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }

    public execute(): void {
      const addr = this._core.direct(this._arg);
      this.cpy(this._core.load_x(addr));
    }
  }

  export class Absolute extends CPY {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.x; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }

    public execute(): void {
      const addr = this._core.absolute(this._arg);
      this.cpy(this._core.load_x(addr));
    }
  }
}
