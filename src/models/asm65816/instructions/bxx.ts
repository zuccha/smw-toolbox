import { Core } from "../core";
import { Instruction } from "../instruction";

export abstract class BXX extends Instruction {
  // prettier-ignore
  public get cycles(): number { return this._branch_taken ? 3 + this._core.e : 2; }
  // prettier-ignore
  public get length(): number { return 2; }
  // prettier-ignore
  public get type(): Instruction.Type { return Instruction.Type.Immediate; }
  // prettier-ignore
  protected abstract get _branch_taken(): boolean;

  public execute(): void {
    this._core.PC = this._core.PC + this.length;
    if (this._branch_taken) {
      const offset =
        this._arg.b & Core.Flag.N ? this._arg.b - 0x100 : this._arg.b;
      this._core.PC = this._core.PC + offset;
    }
  }
}

export namespace BXX {
  export class BCC extends BXX {
    // prettier-ignore
    public get name(): string { return "BCC"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.c === 0; }
  }

  export class BCS extends BXX {
    // prettier-ignore
    public get name(): string { return "BCS"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.c === 1; }
  }

  export class BNE extends BXX {
    // prettier-ignore
    public get name(): string { return "BNE"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.z === 0; }
  }

  export class BEQ extends BXX {
    // prettier-ignore
    public get name(): string { return "BEQ"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.z === 1; }
  }

  export class BPL extends BXX {
    // prettier-ignore
    public get name(): string { return "BPL"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.n === 0; }
  }

  export class BMI extends BXX {
    // prettier-ignore
    public get name(): string { return "BMI"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.n === 1; }
  }

  export class BVC extends BXX {
    // prettier-ignore
    public get name(): string { return "BVC"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.v === 0; }
  }

  export class BVS extends BXX {
    // prettier-ignore
    public get name(): string { return "BVS"; }
    // prettier-ignore
    protected get _branch_taken() { return this._core.v === 1; }
  }

  export class BRA extends BXX {
    // prettier-ignore
    public get name(): string { return "BRA"; }
    // prettier-ignore
    protected get _branch_taken() { return true; }
  }

  export class BRL extends Instruction {
    // prettier-ignore
    public get name(): string { return "BRL"; }
    // prettier-ignore
    public get cycles(): number { return 4; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Immediate; }

    public execute(): void {
      this._core.PC = this._core.PC + this.length;
      const offset =
        (this._arg.w >> 8) & Core.Flag.N ? this._arg.w - 0x10000 : this._arg.w;
      this._core.PC = this._core.PC + offset;
    }
  }
}
