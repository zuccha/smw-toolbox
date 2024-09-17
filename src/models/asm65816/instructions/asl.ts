import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class ASL extends Instruction {
  public get name(): string {
    return "ASL";
  }

  protected asl(value: number): number {
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

export namespace ASL {
  export class Accumulator extends ASL {
    // prettier-ignore
    public get cycles(): number { return 2; }
    // prettier-ignore
    public get length(): number { return 1; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Accumulator; }

    public execute(): void {
      const value = this._core.A;
      this._core.A = this.asl(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct extends ASL {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m * 2 + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }

    public execute(): void {
      const addr = this._core.direct(this._arg);
      this._core.save(addr, this.asl(this._core.load(addr)));
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_X extends ASL {
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m * 2 + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }

    public execute(): void {
      const addr = this._core.direct_x(this._arg);
      this._core.save(addr, this.asl(this._core.load(addr)));
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Absolute extends ASL {
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m * 2; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }

    public execute(): void {
      const addr = this._core.absolute(this._arg);
      this._core.save(addr, this.asl(this._core.load(addr)));
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Absolute_X extends ASL {
    // prettier-ignore
    public get cycles(): number { return 9 - this._core.m * 2; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }

    public execute(): void {
      const addr = this._core.absolute_x(this._arg);
      this._core.save(addr, this.asl(this._core.load(addr)));
      this._core.PC = this._core.PC + this.length;
    }
  }
}