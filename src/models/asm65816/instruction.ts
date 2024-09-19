import { Core } from "./core";
import { Integer } from "./integer";
import { InstructionImpl } from "./opcode-to-instruction";
import { format_addr, pad_r, to_hex } from "./utils";

export abstract class Instruction {
  public static cyclesModifier = 0;
  public static lengthModifier = 0;

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

  public get PC(): number {
    return this._PC;
  }

  public get snapshot(): Core.Snapshot | undefined {
    return this._snapshot;
  }

  public get mnemonic(): string {
    return (<InstructionImpl>this.constructor).mnemonic;
  }

  public get type(): Instruction.Type {
    return (<InstructionImpl>this.constructor).type;
  }

  public get cycles(): number {
    const modifier: number = (<InstructionImpl>this.constructor).cyclesModifier;
    let cycles: number = (<InstructionImpl>this.constructor).baseCycles;
    if (modifier & minus_m) cycles -= this._core.m;
    if (modifier & minus_2m) cycles -= 2 * this._core.m;
    if (modifier & minus_x) cycles -= this._core.x;
    if (modifier & plus_1_if_dp_low_is_zero) cycles += this._core.DP_low;
    if (modifier & plus_1_if_index_x_crosses_page)
      cycles += this._core.X_cross(this.addr);
    if (modifier & plus_1_if_index_y_crosses_page)
      cycles += this._core.Y_cross(this.addr);
    return cycles;
  }

  public get length(): number {
    const modifier: number = (<InstructionImpl>this.constructor).lengthModifier;
    let length: number = (<InstructionImpl>this.constructor).baseLength;
    if (modifier & minus_m) length -= this._core.m;
    if (modifier & minus_x) length -= this._core.x;
    return length;
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
        return this.mnemonic;
      case Instruction.Type.Accumulator:
        return `${this.mnemonic} A`;
      case Instruction.Type.Immediate:
        return `${this.mnemonic} #${this.formatted_arg}`;
      case Instruction.Type.Direct:
        return `${this.mnemonic} ${this.formatted_arg}`;
      case Instruction.Type.Direct_X:
        return `${this.mnemonic} ${this.formatted_arg},x`;
      case Instruction.Type.Direct_Y:
        return `${this.mnemonic} ${this.formatted_arg},y`;
      case Instruction.Type.Direct_Indirect:
        return `${this.mnemonic} (${this.formatted_arg})`;
      case Instruction.Type.Direct_X_Indirect:
        return `${this.mnemonic} (${this.formatted_arg},x)`;
      case Instruction.Type.Direct_Indirect_Y:
        return `${this.mnemonic} (${this.formatted_arg}),y`;
      case Instruction.Type.Direct_IndirectLong:
        return `${this.mnemonic} [${this.formatted_arg}]`;
      case Instruction.Type.Direct_IndirectLong_Y:
        return `${this.mnemonic} [${this.formatted_arg}],y`;
      case Instruction.Type.Absolute:
        return `${this.mnemonic} ${this.formatted_arg}`;
      case Instruction.Type.Absolute_X:
        return `${this.mnemonic} ${this.formatted_arg},x`;
      case Instruction.Type.Absolute_Y:
        return `${this.mnemonic} ${this.formatted_arg},y`;
      case Instruction.Type.Absolute_Indirect:
        return `${this.mnemonic} (${this.formatted_arg})`;
      case Instruction.Type.Absolute_X_Indirect:
        return `${this.mnemonic} (${this.formatted_arg},x)`;
      case Instruction.Type.Absolute_IndirectLong:
        return `${this.mnemonic} [${this.formatted_arg}]`;
      case Instruction.Type.AbsoluteLong:
        return `${this.mnemonic} ${this.formatted_arg}`;
      case Instruction.Type.AbsoluteLong_X:
        return `${this.mnemonic} ${this.formatted_arg},x`;
      case Instruction.Type.StackRelative:
        return `${this.mnemonic} ${this.formatted_arg},s`;
      case Instruction.Type.StackRelative_Indirect_Y:
        return `${this.mnemonic} (${this.formatted_arg},s),y`;
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

    const flags = this.format_flags();

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

  public format_flags(): string {
    if (!this._snapshot) return "";

    const capitalize = (flag: string, i: number) =>
      this._snapshot!.flags & (1 << (7 - i)) ? flag.toUpperCase() : flag;
    return this._snapshot.flag.e
      ? ["n", "v", "-", "b", "d", "i", "z", "c"].map(capitalize).join("")
      : ["n", "v", "m", "x", "d", "i", "z", "c"].map(capitalize).join("");
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

export const minus_m = 1;
export const minus_2m = 2;
export const minus_x = 4;
export const plus_1_if_dp_low_is_zero = 8;
export const plus_1_if_index_x_crosses_page = 16;
export const plus_1_if_index_y_crosses_page = 32;
