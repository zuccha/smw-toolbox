import { flag_n_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class XBA extends Instruction {
  public static mnemonic = "XBA";
  public static opcode = 0xeb;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 3;

  public execute_effect(): void {
    const byte = this.p.a.byte;
    const page = this.p.a.page;
    this.p.a.byte = page;
    this.p.a.page = byte;
    this.p.flag_n = page & flag_n_mask;
    this.p.flag_z = page === 0;
  }
}
