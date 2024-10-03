import Definition from "./definition";
import { Range } from "./range";

export default class Definition_Origin extends Definition {
  public readonly address: number;

  public constructor(range: Range, address: number) {
    super(range);
    this.address = address;
  }
}
