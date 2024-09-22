import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { v } from "../value";

export class MVP extends Instruction {
  public static mnemonic = "MVP";
  public static opcode = 0x44;
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
      const value = this.m.load_byte(v((srcBank << 16) + this.p.get_x()));
      this.m.save_byte(v((destBank << 16) + this.p.get_y()), value);
      this.p.x.sub_byte(1);
      this.p.y.sub_byte(1);
      this.p.a.sub_word(1);
    }
  }
}
