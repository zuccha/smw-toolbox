import { Core } from "./core";
import { Instruction } from "./instruction";
import { Integer } from "./integer";
import { Opcode, opcodeToInstruction } from "./opcode-to-instruction";
import { format_addr } from "./utils";

const max_instructions = 100;
const PC_offset = 0x8000;

export class Emulator {
  private _bytes: number[] = [];
  private _core = new Core([]);
  private _instructions: Instruction[] = [];
  private _errors: string[] = [];

  public clear() {
    this._bytes = [];
    this._core = new Core([]);
    this._instructions = [];
    this._errors = [];
  }

  public run(bytes: number[]) {
    this._bytes = bytes.map((byte) => byte & 0xff);
    this._core = new Core(this._bytes);
    this._instructions = [];
    this._errors = [];

    try {
      while (
        PC_offset <= this._core.PC &&
        this._core.PC < PC_offset + this._bytes.length &&
        this._instructions.length < max_instructions
      ) {
        const arg = this._arg();
        const opcode = this._get(this._core.PC - PC_offset) as Opcode;
        const instruction = new opcodeToInstruction[opcode](this._core, arg);
        this._instructions.push(instruction);
        instruction.executeAndSnapshot();
      }
    } catch (e) {
      if (e instanceof Error) {
        this._errors.push(e.message);
      } else {
        this._errors.push("Execution failed: unknown error");
      }
    }

    const PC = format_addr((this._core.PB << 16) | this._core.PC);

    if (this._core.PC < PC_offset)
      this._errors.push(
        `Program Counter out of bounds ${PC}: Only ROM ([XX:8000-XX:FFFF]) can be executed.`,
      );

    if (this._core.PB > 0) {
      this._errors.push(
        `Program Counter out of bounds ${PC}: Only bank 00 is available.`,
      );
    }

    if (this._instructions.length > max_instructions) {
      this._errors.push(
        `Reached the maximum amount of instructions (${max_instructions}).`,
      );
    }
  }

  public get instructions(): readonly Instruction[] {
    return this._instructions;
  }

  public get errors(): readonly string[] {
    return this._errors;
  }

  public get cycles(): number {
    return this._instructions.reduce((sum, i) => sum + i.cycles, 0);
  }

  public get length(): number {
    return this._bytes.length;
  }

  public snapshot(): Core.Snapshot {
    return this._core.snapshot();
  }

  public log(): string {
    const cycles = this.cycles;
    return [
      this._instructions.map((instruction) => instruction.format()).join("\n"),
      this._errors.map((error) => `ERROR > ${error}`).join("\n"),
      this._errors.length === 0
        ? `${cycles} cycles, ${this._bytes.length} bytes`
        : "Execution interrupted.",
    ]
      .filter((line) => line)
      .join("\n");
  }

  public get_byte(addr: number): number {
    return this._core.load_byte(addr);
  }

  private _get(index: number) {
    return this._bytes[index] ?? 0;
  }

  private _arg() {
    const pc = this._core.PC - PC_offset;
    const l = this._get(pc + 1);
    const h = this._get(pc + 2) << 8;
    const b = this._get(pc + 3) << 16;
    return new Integer(b + h + l);
  }
}
