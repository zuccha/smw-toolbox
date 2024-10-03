import { Text } from "@codemirror/state";
import { Program } from "../program";
import AssemblerError from "./assembler-error";
import { asm65816Language } from "./language/asm65816";
import Definition from "./definition";
import Definition_Label from "./definition-label";
import Definition_Origin from "./definition-origin";
import Definition_Instruction from "./definition-instruction";
import Instruction, {
  Instruction_Data,
  Instruction_Label,
  Instruction_Value,
} from "./instruction";

type InstructionChunk = { origin: number; instructions: Instruction[] };

export default class Assembler {
  public code = "";
  public program: Program = { chunks: [] };
  public errors: AssemblerError[] = [];

  public constructor(code = "") {
    this.code = code;
  }

  public assemble(): void {
    this.errors = [];
    const definitions = this._parse_code();

    const { instructionChunks, labels } =
      this._generate_chunks_and_labels(definitions);
    this.program = this._generate_program(instructionChunks, labels);
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
        definitions.push(new Definition_Label(range, label));
        return;
      }

      if (node.name === "OrgDefinition") {
        pushInstruction();
        const range = { from: cursor.from, to: cursor.to, line };
        const address = parse_arg(value.replace(/org/, "").trim());
        definitions.push(new Definition_Origin(range, address));
        return;
      }
    });

    while (cursor.next()) {}

    pushInstruction();

    return definitions;
  }

  private _generate_chunks_and_labels(definitions: Definition[]) {
    let pc = 0x808000; // TODO: Extract?
    let chunk: InstructionChunk = { origin: pc, instructions: [] };
    const instructionChunks: InstructionChunk[] = [chunk];
    let labels: Map<string, number> = new Map();

    for (const definition of definitions) {
      if (definition instanceof Definition_Instruction) {
        const instruction = definition.build(pc);
        if (typeof instruction === "string") {
          this.errors.push(new AssemblerError(instruction, definition.range));
          continue;
        }
        chunk.instructions.push(instruction);
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

      if (definition instanceof Definition_Origin) {
        if (isNaN(definition.address)) {
          const message = `Origin: invalid origin address.`;
          this.errors.push(new AssemblerError(message, definition.range));
          continue;
        }
        chunk = { origin: definition.address, instructions: [] };
        pc = definition.address;
        instructionChunks.push(chunk);
        continue;
      }
    }

    return { instructionChunks, labels };
  }

  private _generate_program(
    instructionChunks: InstructionChunk[],
    labels: Map<string, number>,
  ): Program {
    return {
      chunks: instructionChunks.map((instructionChunk) => ({
        origin: instructionChunk.origin,
        bytes: instructionChunk.instructions
          .flatMap((instruction) => {
            if (
              instruction instanceof Instruction_Value ||
              instruction instanceof Instruction_Data
            ) {
              return instruction.bytes();
            }

            if (instruction instanceof Instruction_Label) {
              const bytes_or_error = instruction.bytes(labels);
              if (typeof bytes_or_error === "string") {
                const error = new AssemblerError(
                  bytes_or_error,
                  instruction.range,
                );
                this.errors.push(error);
                return undefined;
              }
              return bytes_or_error;
            }

            const message = "Invalid instruction type.";
            const error = new AssemblerError(message, instruction.range);
            this.errors.push(error);
            return undefined;
          })
          .filter((instruction) => instruction !== undefined),
      })),
    };
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
