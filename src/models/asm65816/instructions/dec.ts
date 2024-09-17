import { Instruction } from "../instruction";

export abstract class DEC extends Instruction {
  // prettier-ignore
  public get name(): string { return "DEC"; }

  protected dec(addr: number): void {
    this._core.PC = this._core.PC + this.length;
    this._core.save(addr, this._core.load(addr) - 1);
  }
}

export namespace DEC {
  export class Implied extends DEC {
    // prettier-ignore
    public get cycles(): number { return 2; }
    // prettier-ignore
    public get length(): number { return 1; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Implied; }

    public execute(): void {
      this._core.PC = this._core.PC + this.length;
      this._core.A = this._core.A - 1;
    }
  }

  export class Direct extends DEC {
    // prettier-ignore
    public get cycles(): number { return 7 - 2 * this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }

    public execute(): void {
      const addr = this._core.direct(this._arg);
      this.dec(addr);
    }
  }

  export class Direct_X extends DEC {
    // prettier-ignore
    public get cycles(): number { return 8 - 2 * this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }

    public execute(): void {
      const addr = this._core.direct_x(this._arg);
      this.dec(addr);
    }
  }

  export class Absolute extends DEC {
    // prettier-ignore
    public get cycles(): number { return 8 - 2 * this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }

    public execute(): void {
      const addr = this._core.absolute(this._arg);
      this.dec(addr);
    }
  }

  export class Absolute_X extends DEC {
    // prettier-ignore
    public get cycles(): number { return 9 - 2 * this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }

    public execute(): void {
      const addr = this._core.absolute_x(this._arg);
      this.dec(addr);
    }
  }
}
