import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class XCE extends Instruction {
  public static mnemonic = "XCE";
  public static opcode = 0xfb;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;

  public execute_effect(): void {
    const c = this.p.flag_c;
    const e = this.p.flag_e;
    this.p.flag_c = e;
    this.p.flag_e = c;
  }
}
