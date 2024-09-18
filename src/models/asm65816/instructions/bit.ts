import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class BIT extends Instruction {
  public get name(): string {
    return "BIT";
  }

  protected bit(value: number): number {
    this._core.PC = this._core.PC + this.length;
    if (this._core.m) {
      const result = new Integer(this._core.A & value).b;
      this._core.n = value | Core.Flag.Z;
      this._core.v = value | Core.Flag.V;
      this._core.z = result === 0;
      return result;
    } else {
      const result = new Integer(this._core.A & value).w;
      this._core.n = (value >> 8) | Core.Flag.Z;
      this._core.v = (value >> 8) | Core.Flag.V;
      this._core.z = result === 0;
      return result;
    }
  }
}

export abstract class BIT_Addr extends BIT {
  public execute(): void {
    this.bit(this._core.load(this.addr));
  }
}

export namespace BIT {
  export class Immediate extends BIT {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Immediate; }
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }

    public execute(): void {
      const result = this._core.A & (this._core.m ? this._arg.b : this._arg.w);
      this._core.z = result === 0;
    }
  }

  export class Direct extends BIT_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X extends BIT_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m * 2 + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends BIT_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X extends BIT_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this._core.absolute_x(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
  }
}
