import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

abstract class B___Near extends Instruction {
  public static mode = InstructionMode.Offset;

  public static base_cycles = 2;

  public get cycles(): number {
    return this._branch_taken()
      ? B___Near.base_cycles + 1 + this.p.flag_e // TODO: Add e only if branch crossed page boundary.
      : B___Near.base_cycles;
  }

  protected abstract _branch_taken(): boolean;

  public execute_effect(): void {
    if (this._branch_taken()) this.p.pc = this.addr;
  }
}

export class BCC extends B___Near {
  public static mnemonic = "BCC";
  public static opcode = 0x90;
  protected _branch_taken = () => this.p.flag_c === 0;
}

export class BCS extends B___Near {
  public static mnemonic = "BCS";
  public static opcode = 0xb0;
  protected _branch_taken = () => this.p.flag_c === 1;
}

export class BNE extends B___Near {
  public static mnemonic = "BNE";
  public static opcode = 0xd0;
  protected _branch_taken = () => this.p.flag_z === 0;
}

export class BEQ extends B___Near {
  public static mnemonic = "BEQ";
  public static opcode = 0xf0;
  protected _branch_taken = () => this.p.flag_z === 1;
}

export class BPL extends B___Near {
  public static mnemonic = "BPL";
  public static opcode = 0x10;
  protected _branch_taken = () => this.p.flag_n === 0;
}

export class BMI extends B___Near {
  public static mnemonic = "BMI";
  public static opcode = 0x30;
  protected _branch_taken = () => this.p.flag_n === 1;
}

export class BVC extends B___Near {
  public static mnemonic = "BVC";
  public static opcode = 0x50;
  protected _branch_taken = () => this.p.flag_v === 0;
}

export class BVS extends B___Near {
  public static mnemonic = "BVS";
  public static opcode = 0x70;
  protected _branch_taken = () => this.p.flag_v === 1;
}

export class BRA extends B___Near {
  public static mnemonic = "BRA";
  public static opcode = 0x80;
  protected _branch_taken = () => true;
}

export class BRL extends Instruction {
  public static mnemonic = "BRL";
  public static opcode = 0x82;
  public static mode = InstructionMode.OffsetLong;
  public static base_cycles = 4;

  public execute_effect(): void {
    this.p.pc = this.addr;
  }
}
