import Definition from "./definition";
import { Range } from "./range";

export default class Definition_Label extends Definition {
  public readonly label: string;

  public constructor(label: string, range: Range) {
    super(range);
    this.label = label;
  }
}
