import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class ADC extends Instruction {
  public get name(): string {
    return "ADC";
  }

  protected adc(value: number): number {
    this._core.PC = this._core.PC + this.length;
    if (this._core.m) {
      const result = new Integer(value + this._core.A + this._core.c);
      this._core.n = result.low & Core.Flag.N;
      this._core.v = result.low & Core.Flag.V;
      this._core.z = result.b === 0;
      this._core.c = result.w > Integer.Byte;
      return result.b;
    } else {
      const result = new Integer(value + this._core.A + this._core.c);
      this._core.n = result.high & Core.Flag.N;
      this._core.v = result.high & Core.Flag.V;
      this._core.z = result.w === 0;
      this._core.c = result.l > Integer.Word;
      return result.w;
    }
  }
}

export abstract class ADC_Addr extends ADC {
  public execute(): void {
    const value = this._core.load(this.addr);
    this._core.A = this.adc(value);
  }
}

export namespace ADC {
  export class Immediate extends ADC {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Immediate; }
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }

    public execute(): void {
      const value = this._core.m ? this._arg.b : this._arg.w;
      this._core.A = this.adc(value);
    }
  }

  export class Direct extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_Indirect extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_X_Indirect extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_Indirect_Y extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect_Y; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low + this._core.Y_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_IndirectLong extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Direct_IndirectLong_Y extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong_Y; }
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class Absolute extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_Y extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Y; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.Y_cross(this.addr); }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class AbsoluteLong extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
  }

  export class AbsoluteLong_X extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong_X; }
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
  }

  export class StackRelative extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative; }
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
  }

  export class StackRelative_Indirect_Y extends ADC_Addr {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative_Indirect_Y; }
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
  }
}
