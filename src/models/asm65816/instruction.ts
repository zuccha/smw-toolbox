import { Core } from "./core";
import { Integer } from "./integer";
import { format_addr, pad_r, to_hex } from "./utils";

export abstract class Instruction {
  public abstract get name(): string;
  public abstract get cycles(): number;
  public abstract get length(): number;
  public abstract get type(): Instruction.Type;

  protected _core: Core;
  protected _arg: Integer;
  protected _PB: number;
  protected _PC: number;

  private _snapshot: Core.Snapshot | undefined;

  public constructor(core: Core, arg: Integer) {
    this._core = core;
    this._arg = arg;
    this._PB = core.PB;
    this._PC = core.PC;
  }

  public abstract execute(): void;

  public executeAndSnapshot() {
    this.execute();
    this._snapshot = this._core.snapshot();
  }

  public get addr(): number {
    switch (this.type) {
      case Instruction.Type.Implied:
        return -1;
      case Instruction.Type.Accumulator:
        return -1;
      case Instruction.Type.Immediate:
        return -1;
      case Instruction.Type.Direct:
        return this._core.direct(this._arg);
      case Instruction.Type.Direct_X:
        return this._core.direct_x(this._arg);
      case Instruction.Type.Direct_Y:
        return this._core.direct_y(this._arg);
      case Instruction.Type.Direct_Indirect:
        return this._core.direct_indirect(this._arg);
      case Instruction.Type.Direct_X_Indirect:
        return this._core.direct_x_indirect(this._arg);
      case Instruction.Type.Direct_Indirect_Y:
        return this._core.direct_indirect_y(this._arg);
      case Instruction.Type.Direct_IndirectLong:
        return this._core.direct_indirectLong(this._arg);
      case Instruction.Type.Direct_IndirectLong_Y:
        return this._core.direct_indirectLong_y(this._arg);
      case Instruction.Type.Absolute:
        return this._core.absolute(this._arg);
      case Instruction.Type.Absolute_X:
        return this._core.absolute_x(this._arg);
      case Instruction.Type.Absolute_Y:
        return this._core.absolute_y(this._arg);
      case Instruction.Type.Absolute_Indirect:
        return this._core.absolute_indirect(this._arg);
      case Instruction.Type.Absolute_X_Indirect:
        return this._core.absolute_x_indirect(this._arg);
      case Instruction.Type.Absolute_IndirectLong:
        return this._core.absolute_indirectLong(this._arg);
      case Instruction.Type.AbsoluteLong:
        return this._core.absoluteLong(this._arg);
      case Instruction.Type.AbsoluteLong_X:
        return this._core.absoluteLong_x(this._arg);
      case Instruction.Type.StackRelative:
        return this._core.stackRelative(this._arg);
      case Instruction.Type.StackRelative_Indirect_Y:
        return this._core.stackRelative_indirect_y(this._arg);
    }
  }

  public get text(): string {
    switch (this.type) {
      case Instruction.Type.Implied:
        return this.name;
      case Instruction.Type.Accumulator:
        return `${this.name} A`;
      case Instruction.Type.Immediate:
        return `${this.name} #${this.formatted_arg}`;
      case Instruction.Type.Direct:
        return `${this.name} ${this.formatted_arg}`;
      case Instruction.Type.Direct_X:
        return `${this.name} ${this.formatted_arg},x`;
      case Instruction.Type.Direct_Y:
        return `${this.name} ${this.formatted_arg},y`;
      case Instruction.Type.Direct_Indirect:
        return `${this.name} (${this.formatted_arg})`;
      case Instruction.Type.Direct_X_Indirect:
        return `${this.name} (${this.formatted_arg},x)`;
      case Instruction.Type.Direct_Indirect_Y:
        return `${this.name} (${this.formatted_arg}),y`;
      case Instruction.Type.Direct_IndirectLong:
        return `${this.name} [${this.formatted_arg}]`;
      case Instruction.Type.Direct_IndirectLong_Y:
        return `${this.name} [${this.formatted_arg}],y`;
      case Instruction.Type.Absolute:
        return `${this.name} ${this.formatted_arg}`;
      case Instruction.Type.Absolute_X:
        return `${this.name} ${this.formatted_arg},x`;
      case Instruction.Type.Absolute_Y:
        return `${this.name} ${this.formatted_arg},y`;
      case Instruction.Type.Absolute_Indirect:
        return `${this.name} (${this.formatted_arg})`;
      case Instruction.Type.Absolute_X_Indirect:
        return `${this.name} (${this.formatted_arg},x)`;
      case Instruction.Type.Absolute_IndirectLong:
        return `${this.name} [${this.formatted_arg}]`;
      case Instruction.Type.AbsoluteLong:
        return `${this.name} ${this.formatted_arg}`;
      case Instruction.Type.AbsoluteLong_X:
        return `${this.name} ${this.formatted_arg},x`;
      case Instruction.Type.StackRelative:
        return `${this.name} ${this.formatted_arg},s`;
      case Instruction.Type.StackRelative_Indirect_Y:
        return `${this.name} (${this.formatted_arg},s),y`;
    }
  }

  public format(): string {
    const prefix = this.format_partial();

    if (!this._snapshot) return prefix;

    const a = `A:${to_hex(this._snapshot.A, 4)}`;
    const x = `X:${to_hex(this._snapshot.X, 4)}`;
    const y = `Y:${to_hex(this._snapshot.Y, 4)}`;
    const sp = `SP:${to_hex(this._snapshot.SP, 4)}`;
    const dp = `DP:${to_hex(this._snapshot.DP, 4)}`;
    const db = `DB:${to_hex(this._snapshot.DB, 2)}`;

    const capitalize = (flag: string, i: number) =>
      this._snapshot!.flags & (1 << (7 - i)) ? flag.toUpperCase() : flag;
    const flags = this._snapshot.flag.e
      ? ["n", "v", "-", "b", "d", "i", "z", "c"].map(capitalize).join("")
      : ["n", "v", "m", "x", "d", "i", "z", "c"].map(capitalize).join("");

    const cycles = `${this.cycles} cycles`;
    const length = `${this.length} bytes`;

    return [prefix, a, x, y, sp, dp, db, flags, cycles, length].join(" ");
  }

  public format_partial(): string {
    const pc = format_addr((this._PB << 16) | this._PC);
    const text = `${pad_r(this.text, 13, " ")}`;
    const addr = this.addr === -1 ? "         " : format_addr(this.addr);

    return `${pc} ${text} ${addr}`;
  }

  public get formatted_arg(): string {
    const length = this.length - 1;
    if (length === 3) return `$${to_hex(this._arg.l, 6)}`;
    if (length === 2) return `$${to_hex(this._arg.w, 4)}`;
    if (length === 1) return `$${to_hex(this._arg.b, 2)}`;
    return "";
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
    Absolute_Indirect,
    Absolute_X_Indirect,
    Absolute_IndirectLong,
    AbsoluteLong,
    AbsoluteLong_X,
    StackRelative,
    StackRelative_Indirect_Y,
  }
}
