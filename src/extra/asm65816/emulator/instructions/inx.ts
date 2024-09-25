import { flag_n_mask, flag_z_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class INX extends Instruction {
  public static mnemonic = "INX";
  public static opcode = 0xe8;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static baseLength = 1;
  public static affected_flags = flag_n_mask | flag_z_mask;

  public execute_effect(): void {
    if (this.p.flag_x) {
      const result = w(this.p.x.byte + 1);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      this.p.x = result;
    } else {
      const result = w(this.p.x.word + 1);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      this.p.x = result;
    }
  }
}
