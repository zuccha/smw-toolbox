import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class ASL extends Instruction {
  // prettier-ignore
  public get name(): string { return "ASL"; }

  protected asl(value: number): number {
    this._core.PC = this._core.PC + this.length;
    if (this._core.m) {
      const result = new Integer(value << 1);
      this._core.n = result.low & Core.Flag.N;
      this._core.z = result.b === 0;
      this._core.c = value & Core.Flag.N; // N is correct.
      return result.b;
    } else {
      const result = new Integer(value << 1);
      this._core.n = result.high & Core.Flag.N;
      this._core.z = result.w === 0;
      this._core.c = (value >> 8) & Core.Flag.N; // N is correct.
      return result.w;
    }
  }
}

export abstract class ASL_Addr extends ASL {
  public execute(): void {
    const addr = this.addr;
    const value = this._core.load(addr);
    this._core.save(addr, this.asl(value));
  }
}

export namespace ASL {
  export class Accumulator extends ASL {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Accumulator; }
    // prettier-ignore
    public get cycles(): number { return 2; }
    // prettier-ignore
    public get length(): number { return 1; }

    public execute(): void {
      const value = this._core.A;
      this._core.A = this.asl(value);
    }
  }

  export class Direct extends ASL_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m * 2 + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X extends ASL_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m * 2 + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends ASL_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m * 2; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X extends ASL_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }
    // prettier-ignore
    public get cycles(): number { return 9 - this._core.m * 2; }
    // prettier-ignore
    public get length(): number { return 3; }
  }
}
