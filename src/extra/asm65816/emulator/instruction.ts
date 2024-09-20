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
import { v, Value } from "./value";

//------------------------------------------------------------------------------
// Instruction
//------------------------------------------------------------------------------

export abstract class Instruction {
  public static cycles_modifier = 0;

  protected _arg: Value;
  protected _processor: Processor;
  protected _processor_snapshot: ProcessorSnapshot | undefined;
  protected _memory: Memory;
  protected _pb: Value;
  protected _pc: Value;

  public constructor(arg: Value, processor: Processor, memory: Memory) {
    this._arg = arg;
    this._processor = processor;
    this._processor_snapshot = undefined;
    this._memory = memory;
    this._pb = v(processor.pb.byte);
    this._pc = v(processor.pc.word);
  }

  protected abstract execute_effect(): void;

  public execute() {
    this._processor.pc.add_word(this.length);
    this.execute_effect();
    this._processor_snapshot = this._processor.snapshot();
  }

  public get mode(): InstructionMode {
    return (<InstructionImpl>this.constructor).mode;
  }

  public get addr(): Value {
    return this.mode.addr(this._arg, this._processor, this._memory);
  }

  public indexed_addr_crosses_boundary(index: Value): boolean {
    const addr = this.addr;
    return addr ? v(addr.long + index.word).page !== addr.page : false;
  }

  public get text(): string {
    const mnemonic = (<InstructionImpl>this.constructor).mnemonic;
    const mode = (<InstructionImpl>this.constructor).mode;
    return `${mnemonic} ${mode.text}`;
  }

  public get text_with_value(): string {
    const mnemonic = (<InstructionImpl>this.constructor).mnemonic;
    const mode = (<InstructionImpl>this.constructor).mode;
    return `${mnemonic} ${mode.format(this._arg, this.length - 1)}`;
  }

  public get formatted_flags(): string {
    if (!this._processor_snapshot) return "";

    const capitalize = (flag: string, i: number) =>
      this._processor_snapshot!.flags & (1 << (7 - i))
        ? flag.toUpperCase()
        : flag;
    return this._processor_snapshot.flag_e
      ? ["n", "v", "-", "b", "d", "i", "z", "c"].map(capitalize).join("")
      : ["n", "v", "m", "x", "d", "i", "z", "c"].map(capitalize).join("");
  }

  public get length(): number {
    const mode = this.mode;
    let length = mode.base_length;
    if (mode.length_modifier & minus_m) length -= this._processor.flag_m;
    if (mode.length_modifier & minus_x) length -= this._processor.flag_x;
    return length;
  }

  public get cycles(): number {
    const modifier = (<InstructionImpl>this.constructor).cycles_modifier;
    let cycles = (<InstructionImpl>this.constructor).base_cycles;
    if (modifier & minus_m) cycles -= this._processor.flag_m;
    if (modifier & minus_x) cycles -= this._processor.flag_x;
    if (modifier & plus_1_if_dp_low_is_zero)
      cycles -= bool_to_number(this._processor.dp.byte === 0);
    if (modifier & plus_1_if_index_x_crosses_page)
      cycles -=
        this._processor.flag_x ||
        bool_to_number(this.indexed_addr_crosses_boundary(this._processor.x));
    if (modifier & plus_1_if_index_y_crosses_page)
      cycles -=
        this._processor.flag_x ||
        bool_to_number(this.indexed_addr_crosses_boundary(this._processor.y));
    return cycles;
  }

  public get pc(): number {
    return (this._pb.byte << 16) + this._pc.word;
  }

  public get snapshot(): ProcessorSnapshot | undefined {
    return this._processor_snapshot;
  }

  public load_m(addr: Value): Value {
    return this._processor.flag_m
      ? this._memory.load_byte(addr)
      : this._memory.load_word(addr);
  }

  public load_x(addr: Value): Value {
    return this._processor.flag_x
      ? this._memory.load_byte(addr)
      : this._memory.load_word(addr);
  }

  public save_m(addr: Value, value: Value): void {
    this._processor.flag_m
      ? this._memory.save_byte(addr, value)
      : this._memory.save_word(addr, value);
  }

  public save_x(addr: Value, value: Value): void {
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
}

//------------------------------------------------------------------------------
// Utils
//------------------------------------------------------------------------------

const bool_to_number = (value: boolean): 0 | 1 => (value ? 1 : 0);
