import { Core } from "../core";
import { Instruction } from "../instruction";

export abstract class BXX extends Instruction {
  public static type = Instruction.Type.Immediate;

  public get addr(): number {
    return this._PB + this.addr_relative_to_bank;
  }

  public get text(): string {
    return `${this.mnemonic} ${this.formatted_arg}`;
  }

  public abstract get addr_relative_to_bank(): number;
}

export abstract class BXX_Near extends BXX {
  public static baseCycles = 2;
  public static baseLength = 2;

  public get cycles(): number {
    return this._branch_taken
      ? BXX_Near.baseCycles + 1 + this._core.e
      : BXX_Near.baseCycles;
  }

  protected abstract get _branch_taken(): boolean;

  public get addr_relative_to_bank(): number {
    const offset =
      this._arg.b & Core.Flag.N ? this._arg.b - 0x100 : this._arg.b;
    return this._PC + this.length + offset;
  }

  public execute_effect(): void {
    this._core.PC = this._branch_taken
      ? this.addr_relative_to_bank
      : this._core.PC + this.length;
  }
}

export namespace BXX {
  export class BCC extends BXX_Near {
    public static mnemonic = "BCC";

    // prettier-ignore
    protected get _branch_taken() { return this._core.c === 0; }
  }

  export class BCS extends BXX_Near {
    public static mnemonic = "BCS";

    // prettier-ignore
    protected get _branch_taken() { return this._core.c === 1; }
  }

  export class BNE extends BXX_Near {
    public static mnemonic = "BNE";

    // prettier-ignore
    protected get _branch_taken() { return this._core.z === 0; }
  }

  export class BEQ extends BXX_Near {
    public static mnemonic = "BEQ";

    // prettier-ignore
    protected get _branch_taken() { return this._core.z === 1; }
  }

  export class BPL extends BXX_Near {
    public static mnemonic = "BPL";

    // prettier-ignore
    protected get _branch_taken() { return this._core.n === 0; }
  }

  export class BMI extends BXX_Near {
    public static mnemonic = "BMI";

    // prettier-ignore
    protected get _branch_taken() { return this._core.n === 1; }
  }

  export class BVC extends BXX_Near {
    public static mnemonic = "BVC";

    // prettier-ignore
    protected get _branch_taken() { return this._core.v === 0; }
  }

  export class BVS extends BXX_Near {
    public static mnemonic = "BVS";

    // prettier-ignore
    protected get _branch_taken() { return this._core.v === 1; }
  }

  export class BRA extends BXX_Near {
    public static mnemonic = "BRA";

    // prettier-ignore
    protected get _branch_taken() { return true; }
  }

  export class BRL extends BXX {
    public static mnemonic = "BRL";
    public static baseCycles = 4;
    public static baseLength = 3;

    public get addr_relative_to_bank(): number {
      const offset =
        (this._arg.w >> 8) & Core.Flag.N ? this._arg.w - 0x10000 : this._arg.w;
      return this._PC + this.length + offset;
    }

    public execute_effect(): void {
      this._core.PC = this.addr_relative_to_bank;
    }
  }
}
