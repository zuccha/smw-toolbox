import {
  minus_m,
  minus_x,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "./constants";
import InstructionMode from "./instruction-mode";
import Memory from "./memory";
import { InstructionImpl } from "./opcode-to-instruction";
import Processor from "./processor";
import { ProcessorSnapshot } from "./processor-snapshot";
import { l, ReadOnlyValue, w } from "./value";

//------------------------------------------------------------------------------
// Instruction
//------------------------------------------------------------------------------

export abstract class Instruction {
  public static cycles_modifier = 0;

  public readonly id: number;
  protected _arg: ReadOnlyValue;
  protected _processor: Processor;
  protected _snapshot_before: ProcessorSnapshot;
  protected _snapshot_after: ProcessorSnapshot | undefined;
  protected _memory: Memory;

  public constructor(
    id: number,
    arg: ReadOnlyValue,
    processor: Processor,
    memory: Memory,
  ) {
    this.id = id;
    this._arg = arg;
    this._processor = processor;
    this._snapshot_before = processor.snapshot();
    this._snapshot_after = undefined;
    this._memory = memory;
  }

  protected abstract execute_effect(): void;

  public execute() {
    this._processor.pc = w(this._processor.pc.word + this.length);
    this.execute_effect();
    this._snapshot_after = this._processor.snapshot();
  }

  public get mode(): InstructionMode {
    return (<InstructionImpl>this.constructor).mode;
  }

  public get has_addr(): boolean {
    return this.mode.has_address;
  }

  public get addr(): ReadOnlyValue {
    return this.mode.addr(this._mode_context);
  }

  public get text(): string {
    const mnemonic = (<InstructionImpl>this.constructor).mnemonic;
    const mode = (<InstructionImpl>this.constructor).mode;
    return `${mnemonic} ${mode.text}`;
  }

  public get text_with_value(): string {
    const mnemonic = (<InstructionImpl>this.constructor).mnemonic;
    const mode = (<InstructionImpl>this.constructor).mode;
    return `${mnemonic} ${mode.format(this._mode_context)}`;
  }

  public get length(): number {
    const mode = this.mode;
    let length = mode.base_length;
    if (mode.length_modifier & minus_m) length -= this._snapshot_before.flag_m;
    if (mode.length_modifier & minus_x) length -= this._snapshot_before.flag_x;
    return length;
  }

  public get cycles(): number {
    const modifier = (<InstructionImpl>this.constructor).cycles_modifier;
    let cycles = (<InstructionImpl>this.constructor).base_cycles;
    if (modifier & minus_m) cycles -= this._snapshot_before.flag_m;
    if (modifier & minus_x) cycles -= this._snapshot_before.flag_x;
    if (modifier & plus_1_if_dp_low_is_zero)
      cycles -= this._snapshot_before.dp === 0 ? 1 : 0;
    if (modifier & plus_1_if_index_x_crosses_page) {
      const x = this._snapshot_before.x;
      cycles -= this._snapshot_before.flag_x || this._cross_boundary(x);
    }
    if (modifier & plus_1_if_index_y_crosses_page) {
      const y = this._snapshot_before.y;
      cycles -= this._snapshot_before.flag_x || this._cross_boundary(y);
    }
    return cycles;
  }

  public get opcode(): number {
    return (<InstructionImpl>this.constructor).opcode;
  }

  public get bytes(): number[] {
    const bytes = [this.opcode];
    const length = this.length;
    if (length > 1) bytes.push(this._arg.byte);
    if (length > 2) bytes.push(this._arg.page);
    if (length > 3) bytes.push(this._arg.bank);
    return bytes;
  }

  public get pb(): number {
    return this._snapshot_before.pb;
  }

  public get pc(): number {
    return this._snapshot_before.pc;
  }

  public get snapshot(): ProcessorSnapshot | undefined {
    return this._snapshot_after;
  }

  public load_m(addr: ReadOnlyValue): ReadOnlyValue {
    return this._processor.flag_m
      ? this._memory.load_byte(addr)
      : this._memory.load_word(addr);
  }

  public load_x(addr: ReadOnlyValue): ReadOnlyValue {
    return this._processor.flag_x
      ? this._memory.load_byte(addr)
      : this._memory.load_word(addr);
  }

  public save_m(addr: ReadOnlyValue, value: ReadOnlyValue): void {
    this._processor.flag_m
      ? this._memory.save_byte(addr, value)
      : this._memory.save_word(addr, value);
  }

  public save_x(addr: ReadOnlyValue, value: ReadOnlyValue): void {
    this._processor.flag_x
      ? this._memory.save_byte(addr, value)
      : this._memory.save_word(addr, value);
  }

  protected get p() {
    return this._processor;
  }

  protected get m() {
    return this._memory;
  }

  private _cross_boundary(index: number): 0 | 1 {
    const addr = this.addr;
    return l(addr.long + index).page === addr.page ? 0 : 1;
  }

  private get _mode_context() {
    return {
      arg: this._arg,
      arg_size: this.length - 1,
      p: this._processor,
      m: this._memory,
      pc: this._snapshot_before.pc,
      length: this.length,
    };
  }
}
