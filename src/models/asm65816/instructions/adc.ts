import { Core } from "../core";
import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class ADC extends Instruction {
  public get name(): string {
    return "ADC";
  }

  protected adc(value: number): number {
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

export namespace ADC {
  export class Immediate extends ADC {
    // prettier-ignore
    public get cycles(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3 - this._core.m; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Immediate; }

    public execute(): void {
      const value = this._core.m ? this._arg.b : this._arg.w;
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct extends ADC {
    // prettier-ignore
    public get cycles(): number { return 4 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct; }

    public execute(): void {
      const value = this._core.load(this._core.direct(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_X extends ADC {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X; }

    public execute(): void {
      const value = this._core.load(this._core.direct_x(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_Indirect extends ADC {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect; }

    public execute(): void {
      const value = this._core.load(this._core.direct_indirect(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_X_Indirect extends ADC {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_X_Indirect; }

    public execute(): void {
      const value = this._core.load(this._core.direct_x_indirect(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_Indirect_Y extends ADC {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m + this._core.DP_low + this._core.Y_cross(this._core.direct_indirect_y(this._arg)); }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_Indirect_Y; }

    public execute(): void {
      const value = this._core.load(this._core.direct_indirect_y(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_IndirectLong extends ADC {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong; }

    public execute(): void {
      const value = this._core.load(this._core.direct_indirectLong(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Direct_IndirectLong_Y extends ADC {
    // prettier-ignore
    public get cycles(): number { return 7 - this._core.m + this._core.DP_low; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Direct_IndirectLong_Y; }

    public execute(): void {
      const addr = this._core.direct_indirectLong_y(this._arg);
      const value = this._core.load(addr);
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Absolute extends ADC {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }

    public execute(): void {
      const value = this._core.load(this._core.absolute(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Absolute_X extends ADC {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.X_cross(this._core.absolute_x(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X; }

    public execute(): void {
      const value = this._core.load(this._core.absolute_x(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class Absolute_Y extends ADC {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m + this._core.Y_cross(this._core.absolute_y(this._arg)); }
    // prettier-ignore
    public get length(): number { return 3; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Y; }

    public execute(): void {
      const value = this._core.load(this._core.absolute_y(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class AbsoluteLong extends ADC {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }

    public execute(): void {
      const value = this._core.load(this._core.absoluteLong(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class AbsoluteLong_X extends ADC {
    // prettier-ignore
    public get cycles(): number { return 6 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 4; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong_X; }

    public execute(): void {
      const value = this._core.load(this._core.absoluteLong_x(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class StackRelative extends ADC {
    // prettier-ignore
    public get cycles(): number { return 5 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative; }

    public execute(): void {
      const value = this._core.load(this._core.stackRelative(this._arg));
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }

  export class StackRelative_Indirect_Y extends ADC {
    // prettier-ignore
    public get cycles(): number { return 8 - this._core.m; }
    // prettier-ignore
    public get length(): number { return 2; }
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.StackRelative_Indirect_Y; }

    public execute(): void {
      const addr = this._core.stackRelative_indirect_y(this._arg);
      const value = this._core.load(addr);
      this._core.A = this.adc(value);
      this._core.PC = this._core.PC + this.length;
    }
  }
}
