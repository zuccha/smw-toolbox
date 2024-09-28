import {
  flag_c_mask,
  flag_d_mask,
  flag_i_mask,
  flag_m_mask,
  flag_n_mask,
  flag_v_mask,
  flag_x_mask,
  flag_z_mask,
} from "./constants";
import { Instruction } from "./instruction";
import { _Init } from "./instructions/_init";
import Memory from "./memory";
import MemoryMapping from "./memory-mapping";
import { Opcode, opcode_to_instruction } from "./opcode-to-instruction";
import Processor from "./processor";
import { ProcessorSnapshot } from "./processor-snapshot";
import { b, l, ReadOnlyValue, w } from "./value";

export default class Emulator {
  private _bytes: number[] = [];
  private _processor: Processor = new Processor();
  private _memory: Memory = new Memory(MemoryMapping.LoROM);
  private _instructions: Instruction[] = [];
  private _errors: string[] = [];
  private _initial_snapshot: ProcessorSnapshot | undefined;

  private _max_instructions = 100;

  private _memory_mapping = MemoryMapping.LoROM;

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

  public get initial_snapshot(): ProcessorSnapshot | undefined {
    return this._initial_snapshot;
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
    return this._memory.load_byte_raw(l(addr));
  }

  public set_bytes(bytes: number[]) {
    this._bytes = bytes.map((byte) => b(byte).byte);
  }

  public set_max_instructions = (max_instructions: number) => {
    this._max_instructions = Math.max(max_instructions, 1);
  };

  public run() {
    this._reset_processor(true);
    this._reset_memory();
    this._initial_snapshot = this._processor.snapshot();
    this._instructions = [this._initial_instruction()];
    this._errors = [];

    try {
      while (true) {
        const id = this._instructions.length;
        const pc = l((this._processor.pb.byte << 16) | this._processor.pc.word);
        const instruction = this._next_instruction(id, pc);
        if (!instruction) break;

        if (this._instructions.length - 1 >= this._max_instructions) {
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
    this._reset_processor(false);
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

  private _reset_processor(hard: boolean) {
    if (hard) {
      this._soft_initial_a = this.initial_a;
      this._soft_initial_x = this.initial_x;
      this._soft_initial_y = this.initial_y;
      this._soft_initial_db = this.initial_db;
      this._soft_initial_dp = this.initial_dp;
      this._soft_initial_sp = this.initial_sp;
      this._soft_initial_flags = this.initial_flags;
    }

    this._processor.reset({
      a: this._soft_initial_a,
      x: this._soft_initial_x,
      y: this._soft_initial_y,
      db: this._soft_initial_db,
      dp: this._soft_initial_dp,
      sp: this._soft_initial_sp,
      flags: this._soft_initial_flags,
      pb: this._memory_mapping.rom_initial_address.bank,
      pc: this._memory_mapping.rom_initial_address.word,
    });
  }

  private _reset_memory(): void {
    const pb = this._processor.pb.byte << 16;
    const pc = this._processor.pc.word;
    this._memory.reset(this._memory_mapping);
    for (let i = 0; i < this._bytes.length; ++i) {
      const addr = l(pb + w(pc + i).word);
      this._memory.save_byte(addr, b(this._bytes[i]!), true);
    }
  }

  private _opcode(addr: ReadOnlyValue): Opcode | undefined {
    return this._memory.load_byte_raw(addr) as Opcode | undefined;
  }

  private _arg(addr: ReadOnlyValue): ReadOnlyValue {
    const bank = this._memory.load_byte_raw(l(addr.long + 1)) ?? 0;
    const page = (this._memory.load_byte_raw(l(addr.long + 2)) ?? 0) << 8;
    const byte = (this._memory.load_byte_raw(l(addr.long + 3)) ?? 0) << 16;
    return l(bank + page + byte);
  }

  private _initial_instruction(): Instruction {
    const initial = new _Init(0, l(0), this._processor, this._memory);
    initial.execute();
    return initial;
  }

  private _next_instruction(
    id: number,
    addr: ReadOnlyValue,
  ): Instruction | undefined {
    const opcode = this._opcode(addr);
    if (opcode === undefined) return undefined;
    const impl = opcode_to_instruction[opcode];
    return new impl(id, this._arg(addr), this._processor, this._memory);
  }

  public initial_a = 0;
  public initial_x = 0;
  public initial_y = 0;
  public initial_sp = 0x01fc;
  public initial_dp = 0;
  public initial_db = 0;
  public initial_flags = 0b00110000;

  private _soft_initial_a = 0;
  private _soft_initial_x = 0;
  private _soft_initial_y = 0;
  private _soft_initial_sp = 0x01fc;
  private _soft_initial_dp = 0;
  private _soft_initial_db = 0;
  private _soft_initial_flags = 0b00110000;

  public set initial_flag_n(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_n_mask) | (flag << 7);
  }

  public set initial_flag_v(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_v_mask) | (flag << 6);
  }

  public set initial_flag_m(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_m_mask) | (flag << 5);
  }

  public set initial_flag_x(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_x_mask) | (flag << 4);
  }

  public set initial_flag_d(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_d_mask) | (flag << 3);
  }

  public set initial_flag_i(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_i_mask) | (flag << 2);
  }

  public set initial_flag_z(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_z_mask) | (flag << 1);
  }

  public set initial_flag_c(flag: 0 | 1) {
    this.initial_flags = (this.initial_flags & ~flag_c_mask) | flag;
  }
}
