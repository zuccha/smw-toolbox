import { Core } from "./core";
import { Integer } from "./integer";

export abstract class Instruction {
  public abstract get name(): string;
  public abstract get cycles(): number;
  public abstract get length(): number;
  public abstract get type(): Instruction.Type;

  protected _core: Core;
  protected _arg: Integer;
  protected _PC: number;

  public constructor(core: Core, arg: Integer) {
    this._core = core;
    this._arg = arg;
    this._PC = core.PC;
  }

  public abstract execute(): void;

  public report(): Instruction.Report {
    return new Instruction.Report(
      this.cycles,
      this.length,
      this.text,
      this._core.snapshot(),
      this._PC,
    );
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
    public readonly snapshot: Core.Snapshot;
    public readonly PC: number;

    public constructor(
      cycles: number,
      length: number,
      text: string,
      snapshot: Core.Snapshot,
      PC: number,
    ) {
      this.cycles = cycles;
      this.length = length;
      this.text = text;
      this.snapshot = snapshot;
      this.PC = PC;
    }

    public format(): string {
      const pc = `${toHex(this.PC, 6)}`;
      const text = `${padR(this.text, 13, " ")}`;
      const a = `A:${toHex(this.snapshot.A, 4)}`;
      const x = `X:${toHex(this.snapshot.X, 4)}`;
      const y = `Y:${toHex(this.snapshot.Y, 4)}`;
      const sp = `SP:${toHex(this.snapshot.SP, 4)}`;
      const dp = `DP:${toHex(this.snapshot.DP, 4)}`;
      const db = `DB:${toHex(this.snapshot.DB, 2)}`;

      const capitalize = (flag: string, i: number) =>
        this.snapshot.flags & (1 << (7 - i)) ? flag.toUpperCase() : flag;
      const flags = this.snapshot.flag.e
        ? ["n", "v", "-", "b", "d", "i", "z", "c"].map(capitalize).join("")
        : ["n", "v", "m", "x", "d", "i", "z", "c"].map(capitalize).join("");

      const cycles = `${this.cycles} cycles`;
      const length = `${this.length} bytes`;

      return [pc, text, a, x, y, sp, dp, db, flags, cycles, length].join(" ");
    }
  }
}

function padL(text: string, length: number, fill: string): string {
  return `${fill.repeat(length - text.length)}${text}`;
}

function padR(text: string, length: number, fill: string): string {
  return `${text}${fill.repeat(length - text.length)}`;
}

function toHex(n: number, minLength: number): string {
  const hex = n.toString(16).toUpperCase();
  return padL(hex, minLength, "0");
}
