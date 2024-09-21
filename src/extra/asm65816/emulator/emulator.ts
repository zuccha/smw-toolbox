import { Instruction } from "./instruction";
import Memory from "./memory";
import MemoryMapping from "./memory-mapping";
import { Opcode, opcode_to_instruction } from "./opcode-to-instruction";
import Processor from "./processor";
import { ProcessorSnapshot } from "./processor-snapshot";
import { v, Value } from "./value";

export default class Emulator {
  private _bytes: number[] = [];
  private _processor: Processor = new Processor();
  private _memory: Memory = new Memory(MemoryMapping.LoROM);
  private _instructions: Instruction[] = [];
  private _errors: string[] = [];

  private _pc_offset = 0x8000;
  private _max_instructions = 100;

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

  public get snapshot(): ProcessorSnapshot {
    return this._processor.snapshot();
  }

  public read_byte(addr: number): number | undefined {
    return this._memory.load_byte_raw(v(addr));
  }

  public set_bytes(bytes: number[]) {
    this._bytes = bytes.map((byte) => v(byte).byte);
  }

  public run() {
    this._processor.reset();
    this._reset_memory();
    this._instructions = [];
    this._errors = [];

    try {
      while (true) {
        const pc = v((this._processor.pb.byte << 16) | this._processor.pc.word);
        const instruction = this._next_instruction(pc);
        if (!instruction) break;

        if (this._instructions.length >= this._max_instructions) {
          const message = `Reached the maximum amount of instructions (${this._max_instructions}).`;
          this._errors.push(message);
          break;
        }

        this._instructions.push(instruction);
        instruction.execute();
      }
    } catch (e) {
      if (e instanceof Error) {
        this._errors.push(e.message);
      } else {
        this._errors.push("Execution failed: unknown error.");
      }
    }
  }

  public run_until(index: number) {
    this._processor.reset();
    this._reset_memory();
    try {
      for (let i = 0; i < this._instructions.length && i <= index; ++i)
        this._instructions[i]?.execute();
    } catch {
      // Ignore.
    }
  }

  private _reset_memory(): void {
    const pb = this._processor.pb.byte << 16;
    const pc = this._processor.pc.word;
    this._memory.reset();
    for (let i = 0; i < this._bytes.length; ++i) {
      const addr = v(pb + v(pc + i).word);
      this._memory.save_byte(addr, v(this._bytes[i]!), true);
    }
  }

  private _opcode(addr: Value): Opcode | undefined {
    return this._memory.load_byte_raw(addr) as Opcode | undefined;
  }

  private _arg(addr: Value): Value {
    const l = this._memory.load_byte_raw(v(addr.long + 1)) ?? 0;
    const h = (this._memory.load_byte_raw(v(addr.long + 2)) ?? 0) << 8;
    const b = (this._memory.load_byte_raw(v(addr.long + 3)) ?? 0) << 16;
    return v(b + h + l);
  }

  private _next_instruction(addr: Value): Instruction | undefined {
    const opcode = this._opcode(addr);
    if (opcode === undefined) return undefined;
    const instruction_impl = opcode_to_instruction[opcode];
    return new instruction_impl(this._arg(addr), this._processor, this._memory);
  }
}
