import { Range } from "./range";

//------------------------------------------------------------------------------
// Instruction
//------------------------------------------------------------------------------

export default abstract class Instruction {
  public readonly opcode: number;
  public readonly size: number;
  public readonly range: Range;

  public constructor(opcode: number, size: number, range: Range) {
    this.opcode = opcode & 0xff;
    this.size = size;
    this.range = range;
  }
}

//------------------------------------------------------------------------------
// Value
//------------------------------------------------------------------------------

export abstract class Instruction_Value extends Instruction {
  protected _arg: number;

  constructor(opcode: number, size: number, range: Range, arg: number) {
    super(opcode, size, range);
    this._arg = arg;
  }

  public abstract bytes(): number[];
}

//------------------------------------------------------------------------------
// Value - Implied
//------------------------------------------------------------------------------

export class Instruction_Value_Implied extends Instruction_Value {
  constructor(opcode: number, range: Range) {
    super(opcode, 1, range, 0);
  }

  public bytes = () => [this.opcode];
}

//------------------------------------------------------------------------------
// Value - Byte
//------------------------------------------------------------------------------

export class Instruction_Value_Byte extends Instruction_Value {
  constructor(opcode: number, range: Range, arg: number) {
    super(opcode, 2, range, arg & 0xff);
  }

  public bytes = () => [this.opcode, l(this._arg)];
}

//------------------------------------------------------------------------------
// Value - Word
//------------------------------------------------------------------------------

export class Instruction_Value_Word extends Instruction_Value {
  constructor(opcode: number, range: Range, arg: number) {
    super(opcode, 3, range, arg & 0xffff);
  }

  public bytes = () => [this.opcode, l(this._arg), h(this._arg)];
}

//------------------------------------------------------------------------------
// Value - Long
//------------------------------------------------------------------------------

export class Instruction_Value_Long extends Instruction_Value {
  constructor(opcode: number, range: Range, arg: number) {
    super(opcode, 4, range, arg & 0xffffff);
  }

  public bytes = () => [this.opcode, l(this._arg), h(this._arg), b(this._arg)];
}

//------------------------------------------------------------------------------
// Label
//------------------------------------------------------------------------------

export abstract class Instruction_Label extends Instruction {
  protected _label: string;
  protected _pc: number;

  constructor(
    opcode: number,
    size: number,
    range: Range,
    label: string,
    pc: number,
  ) {
    super(opcode, size, range);
    this._label = label;
    this._pc = pc;
  }

  public abstract bytes(labels: Map<string, number>): number[] | string;
}

//------------------------------------------------------------------------------
// Label - Relative
//------------------------------------------------------------------------------

export class Instruction_Label_Relative extends Instruction_Label {
  constructor(opcode: number, range: Range, label: string, pc: number) {
    super(opcode, 2, range, label, pc);
  }

  public bytes = (labels: Map<string, number>): number[] | string => {
    const addr = labels.get(this._label);
    if (addr === undefined) return `Label "${this._label}" is not defined.`;
    const offset = addr - this._pc + 2;
    if (offset < -128 || 127 < offset)
      return `Label "${this._label}" is out of reach.`;
    return [this.opcode, l(offset)];
  };
}

//------------------------------------------------------------------------------
// Label - Relative Long
//------------------------------------------------------------------------------

export class Instruction_Label_RelativeLong extends Instruction_Label {
  constructor(opcode: number, range: Range, label: string, pc: number) {
    super(opcode, 3, range, label, pc);
  }

  public bytes = (labels: Map<string, number>): number[] | string => {
    const addr = labels.get(this._label);
    if (addr === undefined) return `Label "${this._label}" is not defined.`;
    const offset = addr - this._pc + 3;
    if (offset < -32768 || 32767 < offset)
      return `Label "${this._label}" is out of reach.`;
    return [this.opcode, l(offset & 0xffff), h(offset & 0xffff)];
  };
}

//------------------------------------------------------------------------------
// Label - Abstract
//------------------------------------------------------------------------------

export class Instruction_Label_Absolute extends Instruction_Label {
  constructor(opcode: number, range: Range, label: string) {
    super(opcode, 3, range, label, 0);
  }

  public bytes = (labels: Map<string, number>): number[] | string => {
    const addr = labels.get(this._label);
    if (addr === undefined) return `Label "${this._label}" is not defined.`;
    return [this.opcode, l(addr), h(addr)];
  };
}

//------------------------------------------------------------------------------
// Label - Abstract Long
//------------------------------------------------------------------------------

export class Instruction_Label_AbsoluteLong extends Instruction_Label {
  constructor(opcode: number, range: Range, label: string) {
    super(opcode, 4, range, label, 0);
  }

  public bytes = (labels: Map<string, number>): number[] | string => {
    const addr = labels.get(this._label);
    if (addr === undefined) return `Label "${this._label}" is not defined.`;
    return [this.opcode, l(addr), h(addr), b(addr)];
  };
}

//------------------------------------------------------------------------------
// Utils
//------------------------------------------------------------------------------

const b = (value: number): number => (value >> 16) & 0xff;
const h = (value: number): number => (value >> 8) & 0xff;
const l = (value: number): number => value & 0xff;
