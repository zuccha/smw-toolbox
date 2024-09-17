import { toHex } from "../../utils";
import { Core } from "./core";
import { Integer } from "./integer";

export abstract class Instruction {
  public abstract get name(): string;
  public abstract get cycles(): number;
  public abstract get length(): number;
  public abstract get type(): Instruction.Type;

  protected _core: Core;
  protected _arg: Integer;

  public constructor(core: Core, arg: Integer) {
    this._core = core;
    this._arg = arg;
  }

  public abstract execute(): void;

  public report(): Instruction.Report {
    return new Instruction.Report(this.cycles, this.length, this.text);
  }

  protected get text(): string {
    const length = this.length - 1;
    const value = { 1: this._arg.b, 2: this._arg.w, 3: this._arg.l }[length];
    const arg = length >= 1 ? `$${toHex(value ?? 0, length * 2)}` : "";
    switch (this.type) {
      case Instruction.Type.Implied:
        return this.name;
      case Instruction.Type.Accumulator:
        return `${this.name} A`;
      case Instruction.Type.Immediate:
        return `${this.name} #${arg}`;
      case Instruction.Type.Direct:
        return `${this.name} ${arg}`;
      case Instruction.Type.Direct_X:
        return `${this.name} ${arg},x`;
      case Instruction.Type.Direct_Y:
        return `${this.name} ${arg},y`;
      case Instruction.Type.Direct_Indirect:
        return `${this.name} (${arg})`;
      case Instruction.Type.Direct_X_Indirect:
        return `${this.name} (${arg},x)`;
      case Instruction.Type.Direct_Indirect_Y:
        return `${this.name} (${arg}),y`;
      case Instruction.Type.Direct_IndirectLong:
        return `${this.name} [${arg}]`;
      case Instruction.Type.Direct_IndirectLong_Y:
        return `${this.name} [${arg}],y`;
      case Instruction.Type.Absolute:
        return `${this.name} ${arg}`;
      case Instruction.Type.Absolute_X:
        return `${this.name} ${arg},x`;
      case Instruction.Type.Absolute_Y:
        return `${this.name} ${arg},y`;
      case Instruction.Type.Absolute_X_Indirect:
        return `${this.name} (${arg},x)`;
      case Instruction.Type.Absolute_IndirectLong:
        return `${this.name} [${arg}]`;
      case Instruction.Type.AbsoluteLong:
        return `${this.name} ${arg}`;
      case Instruction.Type.AbsoluteLong_X:
        return `${this.name} ${arg},x`;
      case Instruction.Type.StackRelative:
        return `${this.name} ${arg},s`;
      case Instruction.Type.StackRelative_Indirect_Y:
        return `${this.name} (${arg},s),y`;
    }
  }
}

export namespace Instruction {
  export enum Type {
    Implied,
    Accumulator,
    Immediate,
    Direct,
    Direct_X,
    Direct_Y,
    Direct_Indirect,
    Direct_X_Indirect,
    Direct_Indirect_Y,
    Direct_IndirectLong,
    Direct_IndirectLong_Y,
    Absolute,
    Absolute_X,
    Absolute_Y,
    Absolute_X_Indirect,
    Absolute_IndirectLong,
    AbsoluteLong,
    AbsoluteLong_X,
    StackRelative,
    StackRelative_Indirect_Y,
  }

  export class Report {
    public readonly cycles: number;
    public readonly length: number;
    public readonly text: string;

    public constructor(cycles: number, length: number, text: string) {
      this.cycles = cycles;
      this.length = length;
      this.text = text;
    }
  }
}
