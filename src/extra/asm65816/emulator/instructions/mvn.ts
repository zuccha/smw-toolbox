import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { l } from "../value";

export class MVN extends Instruction {
  public static mnemonic = "MVN";
  public static opcode = 0x54;
  public static mode = InstructionMode.BlockMove;
  public static base_cycles = 0;

  private _iterations = 0;

  public get cycles(): number {
    return this._iterations * 7;
  }

  public execute_effect(): void {
    const srcBank = this._arg.byte;
    const destBank = this._arg.page;
    this.p.db.byte = destBank;
    this._iterations = 0;
    while (this.p.a.word !== 0xffff) {
      this._iterations++;
      const value = this.m.load_byte(l((srcBank << 16) + this.p.get_x()));
      this.m.save_byte(l((destBank << 16) + this.p.get_y()), value);
      this.p.x.add_byte(1);
      this.p.y.add_byte(1);
      this.p.a.sub_word(1);
    }
  }
}
