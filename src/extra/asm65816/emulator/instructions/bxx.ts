import { flag_n_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { v, Value, word_mask } from "../value";

export abstract class BXX extends Instruction {
  public get addr(): Value {
    return v(this._pb.byte + this.addr_relative_to_bank.word);
  }

  public abstract get addr_relative_to_bank(): Value;
}

export abstract class BXX_Near extends BXX {
  public static mode = InstructionMode.Offset;

  public static base_cycles = 2;
  public static baseLength = 2;

  public get cycles(): number {
    return this._branch_taken()
      ? BXX_Near.base_cycles + 1 + this.p.flag_e
      : BXX_Near.base_cycles;
  }

  protected abstract _branch_taken(): boolean;

  public get addr_relative_to_bank(): Value {
    const byte = this._arg.byte;
    const offset = byte & flag_n_mask ? byte - 0x100 : byte;
    return v(this._pc.word + this.length + offset, word_mask);
  }

  public execute_effect(): void {
    if (this._branch_taken()) this.p.pc = this.addr_relative_to_bank;
  }
}

export namespace BXX {
  export class BCC extends BXX_Near {
    public static mnemonic = "BCC";
    protected _branch_taken = () => this.p.flag_c === 0;
  }

  export class BCS extends BXX_Near {
    public static mnemonic = "BCS";
    protected _branch_taken = () => this.p.flag_c === 1;
  }

  export class BNE extends BXX_Near {
    public static mnemonic = "BNE";
    protected _branch_taken = () => this.p.flag_z === 0;
  }

  export class BEQ extends BXX_Near {
    public static mnemonic = "BEQ";
    protected _branch_taken = () => this.p.flag_z === 1;
  }

  export class BPL extends BXX_Near {
    public static mnemonic = "BPL";
    protected _branch_taken = () => this.p.flag_n === 0;
  }

  export class BMI extends BXX_Near {
    public static mnemonic = "BMI";
    protected _branch_taken = () => this.p.flag_n === 1;
  }

  export class BVC extends BXX_Near {
    public static mnemonic = "BVC";
    protected _branch_taken = () => this.p.flag_v === 0;
  }

  export class BVS extends BXX_Near {
    public static mnemonic = "BVS";
    protected _branch_taken = () => this.p.flag_v === 1;
  }

  export class BRA extends BXX_Near {
    public static mnemonic = "BRA";
    protected _branch_taken = () => true;
  }

  export class BRL extends BXX {
    public static mnemonic = "BRL";
    public static mode = InstructionMode.OffsetLong;
    public static base_cycles = 4;

    public get addr_relative_to_bank(): Value {
      const word = this._arg.word;
      const offset = this._arg.page & flag_n_mask ? word - 0x10000 : word;
      return v(this._pc.word + this.length + offset, word_mask);
    }

    public execute_effect(): void {
      this.p.pc.word = this.addr_relative_to_bank.word;
    }
  }
}
