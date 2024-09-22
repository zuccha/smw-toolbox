import { Instruction } from "./instruction";
import Memory from "./memory";
import MemoryMapping from "./memory-mapping";
import { Opcode, opcode_to_instruction } from "./opcode-to-instruction";
import Processor from "./processor";
import { ProcessorSnapshot } from "./processor-snapshot";
import { v, Value } from "./value";

export default class Emulator {
  private _bytes: number[] = [];
  private _processor: Processor = new Processor(0, 0, 0);
  private _memory: Memory = new Memory(MemoryMapping.LoROM);
  private _instructions: Instruction[] = [];
  private _errors: string[] = [];

  private _max_instructions = 100;

  private _memory_mapping = MemoryMapping.LoROM;

  private _initial_sp = 0x1fc;

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

  public get initial_ram_address(): number {
    return this._memory_mapping.ram_initial_address.long;
  }

  public get initial_rom_address(): number {
    return this._memory_mapping.rom_initial_address.long;
  }

  public get sp(): number {
    return this._processor.sp.word;
  }

  public read_byte(addr: number): number | undefined {
    return this._memory.load_byte_raw(v(addr));
  }

  public set_bytes(bytes: number[]) {
    this._bytes = bytes.map((byte) => v(byte).byte);
  }

  public set_max_instructions = (max_instructions: number) => {
    this._max_instructions = Math.max(max_instructions, 1);
  };

  public run() {
    this._reset_processor();
    this._reset_memory();
    this._instructions = [];
    this._errors = [];

    try {
      while (true) {
        const id = this._instructions.length + 1;
        const pc = v((this._processor.pb.byte << 16) | this._processor.pc.word);
        const instruction = this._next_instruction(id, pc);
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

  public run_until(id: number) {
    this._reset_processor();
    this._reset_memory();
    try {
      for (const instruction of this._instructions) {
        instruction.execute();
        if (instruction.id === id) break;
      }
    } catch {
      // Ignore.
    }
  }

  private _reset_processor() {
    const pb = this._memory_mapping.rom_initial_address.bank;
    const pc = this._memory_mapping.rom_initial_address.word;
    this._processor.reset(pb, pc, this._initial_sp);
  }

  private _reset_memory(): void {
    const pb = this._processor.pb.byte << 16;
    const pc = this._processor.pc.word;
    this._memory.reset(this._memory_mapping);
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

  private _next_instruction(id: number, addr: Value): Instruction | undefined {
    const opcode = this._opcode(addr);
    if (opcode === undefined) return undefined;
    const impl = opcode_to_instruction[opcode];
    return new impl(id, this._arg(addr), this._processor, this._memory);
  }
}
