import { Text } from "@codemirror/state";
import AssemblerError from "./assembler-error";
import { asm65816Language } from "./language/asm65816";
import Definition_Label from "./definition-label";
import Definition from "./definition";
import Definition_Instruction from "./definition-instruction";
import Instruction, {
  Instruction_Data,
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

    cursor.iterate((node) => {
      const line = text.lineAt(node.from).number;
      const value = this.code.slice(node.from, node.to);

      const error = (message: string) => {
        const { from, to } =
          node.from === node.to ? text.lineAt(node.from) : node;
        this.errors.push(new AssemblerError(message, { from, to, line }));
      };

      if (cursor.type.isError) {
        error("Invalid syntax.");
        return;
      }

      if (node.name === "Instruction") {
        pushInstruction();
        const range = { from: cursor.from, to: cursor.to, line };
        instruction = new Definition_Instruction(range);
        return;
      }

      if (["Opcode", "DB", "DW", "DL"].includes(node.name)) {
        const mnemonic = value.toUpperCase();
        if (!instruction)
          error(`Mode (${mnemonic}): missing instruction builder.`);
        else if (instruction.mnemonic)
          error(`Mode (${mnemonic}): mode already present`);
        else instruction.mnemonic = mnemonic;
        return;
      }

      if (node.name.startsWith("Mode_")) {
        const mode = node.name.substring("Mode_".length);
        if (!instruction) error(`Mode (${mode}): missing instruction builder.`);
        else if (instruction.mode)
          error(`Mode (${mode}): mode already present`);
        else instruction.mode = mode;
        return;
      }

      const process_arg = (unit: string, is_const = false) => {
        const [name, arg_value] = is_const
          ? [`const ${unit}`, value.substring(1)] // Remove leading '#'
          : [unit, value];
        if (!instruction)
          return error(`Arg (${name}): missing instruction builder.`);

        if (!instruction.mnemonic)
          return error(`Arg (${name}): missing instruction mnemonic.`);

        if (instruction.mnemonic === "DB") {
          if (unit !== "byte")
            return error(`"db" requires bytes, but you provided a ${name}.`);
          instruction.bytes.push(parse_arg(arg_value));
          return;
        }

        if (instruction.mnemonic === "DW") {
          if (unit !== "word")
            return error(`"dw" requires words, but you provided a ${name}.`);
          instruction.bytes.push(parse_arg(arg_value));
          return;
        }

        if (instruction.mnemonic === "DL") {
          if (unit !== "long")
            return error(`"dl" requires longs, but you provided a ${name}.`);
          instruction.bytes.push(parse_arg(arg_value));
          return;
        }

        if (instruction.arg)
          return error(`Arg (${name}): arg is already defined.`);
        instruction.arg = parse_arg(arg_value);
      };

      if (node.name == "Byte") {
        process_arg("byte");
        return;
      }

      if (node.name == "Word") {
        process_arg("word");
        return;
      }

      if (node.name == "Long") {
        process_arg("long");
        return;
      }

      if (node.name == "ConstByte") {
        process_arg("byte", true);
        return;
      }

      if (node.name == "ConstWord") {
        process_arg("word", true);
        return;
      }

      if (node.name == "LabelUsage") {
        if (!instruction) error(`Arg (label): missing instruction builder.`);
        else if (instruction.arg) error(`Arg (label): arg is already defined.`);
        else instruction.label = value;
        return;
      }

      if (node.name == "MoveBanks") {
        if (!instruction)
          error(`Arg (block move): missing instruction builder.`);
        else if (instruction.arg)
          error(`Arg (block move): arg is already defined.`);
        else instruction.arg = parse_arg_move(value);
        return;
      }

      if (node.name === "LabelDefinition") {
        pushInstruction();
        const range = { from: cursor.from, to: cursor.to, line };
        const label = value.substring(0, value.length - 1);
        definitions.push(new Definition_Label(label, range));
        return;
      }
    });

    while (cursor.next()) {}

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
      if (
        instruction instanceof Instruction_Value ||
        instruction instanceof Instruction_Data
      ) {
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
