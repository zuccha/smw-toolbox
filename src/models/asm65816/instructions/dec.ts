import { Instruction } from "../instruction";

export abstract class DEC extends Instruction {
  // prettier-ignore
  public get name(): string { return "DEC"; }

  public execute(): void {
    const addr = this.addr;
    this._core.PC = this._core.PC + this.length;
    this._core.save(addr, this._core.load(addr) - 1);
  }
}

export namespace DEC {
  export class Implied extends DEC {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Implied; }
    // prettier-ignore
    public get cycles(): number { return 2; }
    // prettier-ignore
    public get length(): number { return 1; }

    public execute(): void {
      this._core.PC = this._core.PC + this.length;
      this._core.A = this._core.A - 1;
    }
  }

  export class Direct extends DEC {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 7 - 2 * this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X extends DEC {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }
    // prettier-ignore
    public get cycles(): number { return 8 - 2 * this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends DEC {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 8 - 2 * this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X extends DEC {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }
    // prettier-ignore
    public get cycles(): number { return 9 - 2 * this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
  }
}