import { Text } from "@codemirror/state";
import AssemblerError from "./assembler-error";
import { asm65816Language } from "./language/asm65816";
import Definition_Label from "./definition-label";
import Definition from "./definition";
import Definition_Instruction from "./definition-instruction";
import Instruction, {
  Instruction_Label,
  Instruction_Value,
} from "./instruction";

export default class Assembler {
  public code = "";
  public bytes: number[] = [];
  public errors: AssemblerError[] = [];

  public constructor(code = "") {
    this.code = code;
  }

  public assemble(): void {
    this.errors = [];
    const definitions = this._parse_code();

    const { instructions, labels } = this._process_definitions(definitions);
    this.bytes = this._generate_bytes(instructions, labels);
  }

  private _parse_code(): Definition[] {
    const text = Text.of(this.code.split("\n"));
    const tree = asm65816Language.parser.parse(this.code);
    const cursor = tree.cursor();

    let instruction: Definition_Instruction | undefined;
    const definitions: Definition[] = [];

    const pushInstruction = () => {
      if (instruction) definitions.push(instruction);
      instruction = undefined;
    };

    while (cursor.next()) {
      const line = text.lineAt(cursor.from).number;
      const value = this.code.slice(cursor.from, cursor.to);

      const error = (message: string) => {
        const { from, to } =
          cursor.from === cursor.to ? text.lineAt(cursor.from) : cursor;
        this.errors.push(new AssemblerError(message, { from, to, line }));
      };

      if (cursor.type.isError) {
        error("Invalid syntax.");
        continue;
      }

      if (cursor.type.name === "Instruction") {
        pushInstruction();
        const range = { from: cursor.from, to: cursor.to, line };
        instruction = new Definition_Instruction(range);
        continue;
      }

      if (cursor.type.name === "Opcode") {
        const mnemonic = value.toUpperCase();
        if (!instruction)
          error(`Mode (${mnemonic}): missing instruction builder.`);
        else if (instruction.mnemonic)
          error(`Mode (${mnemonic}): mode already present`);
        else instruction.mnemonic = mnemonic;
        continue;
      }

      if (cursor.type.name.startsWith("Mode_")) {
        const mode = cursor.type.name.substring("Mode_".length);
        if (!instruction) error(`Mode (${mode}): missing instruction builder.`);
        else if (instruction.mode)
          error(`Mode (${mode}): mode already present`);
        else instruction.mode = mode;
        continue;
      }

      const process_arg = (unit: string, is_const = false) => {
        const [name, arg_value] = is_const
          ? [`const ${unit}`, value.substring(1)] // Remove leading '#'
          : [unit, value];
        if (!instruction)
          return error(`Arg (${name}): missing instruction builder.`);
        if (instruction.arg)
          return error(`Arg (${name}): arg is already defined.`);
        instruction.arg = parse_arg(arg_value);
      };

      if (cursor.type.name == "Byte") {
        process_arg("byte");
        continue;
      }

      if (cursor.type.name == "Word") {
        process_arg("word");
        continue;
      }

      if (cursor.type.name == "Long") {
        process_arg("long");
        continue;
      }

      if (cursor.type.name == "ConstByte") {
        process_arg("byte", true);
        continue;
      }

      if (cursor.type.name == "ConstWord") {
        process_arg("word", true);
        continue;
      }

      if (cursor.type.name == "LabelUsage") {
        if (!instruction) error(`Arg (label): missing instruction builder.`);
        else if (instruction.arg) error(`Arg (label): arg is already defined.`);
        else instruction.label = value;
        continue;
      }

      if (cursor.type.name == "MoveBanks") {
        if (!instruction)
          error(`Arg (block move): missing instruction builder.`);
        else if (instruction.arg)
          error(`Arg (block move): arg is already defined.`);
        else instruction.arg = parse_arg_move(value);
        continue;
      }

      if (cursor.type.name === "LabelDefinition") {
        pushInstruction();
        const range = { from: cursor.from, to: cursor.to, line };
        const label = value.substring(0, value.length - 1);
        definitions.push(new Definition_Label(label, range));
        continue;
      }
    }

    pushInstruction();

    return definitions;
  }

  private _process_definitions(definitions: Definition[]) {
    const instructions: Instruction[] = [];
    let labels: Map<string, number> = new Map();
    let pc = 0x008000;

    for (const definition of definitions) {
      if (definition instanceof Definition_Instruction) {
        const instruction = definition.build(pc);
        if (typeof instruction === "string") {
          this.errors.push(new AssemblerError(instruction, definition.range));
          continue;
        }
        instructions.push(instruction);
        pc += instruction.size;
        continue;
      }

      if (definition instanceof Definition_Label) {
        if (labels.has(definition.label)) {
          const message = `Label: label "${definition.label}" is already defined.`;
          this.errors.push(new AssemblerError(message, definition.range));
          continue;
        }
        labels.set(definition.label, pc);
        continue;
      }
    }

    return { instructions, labels };
  }

  private _generate_bytes(
    instructions: Instruction[],
    labels: Map<string, number>,
  ): number[] {
    const bytes: number[] = [];

    for (const instruction of instructions) {
      if (instruction instanceof Instruction_Value) {
        bytes.push(...instruction.bytes());
        continue;
      }

      if (instruction instanceof Instruction_Label) {
        const bytes_or_error = instruction.bytes(labels);
        if (typeof bytes_or_error === "string") {
          const error = new AssemblerError(bytes_or_error, instruction.range);
          this.errors.push(error);
        } else {
          bytes.push(...bytes_or_error);
        }
        continue;
      }
    }

    return bytes;
  }
}

function parse_arg(arg: string): number {
  if (arg.startsWith("$")) return Number.parseInt(arg.substring(1), 16);
  if (arg.startsWith("%")) return Number.parseInt(arg.substring(1), 2);
  return Number.parseInt(arg, 10);
}

function parse_arg_move(arg: string): number {
  const [src = 0, dest = 0] = arg.split(",").map(parse_arg);
  return src | (dest << 8);
}
