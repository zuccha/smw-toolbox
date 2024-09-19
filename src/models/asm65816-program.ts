import { Text } from "@codemirror/state";
import {
  Asm65816Instruction,
  Asm65816InstructionSchema,
  Asm65816InstructionMode,
  Asm65816InstructionModeMetaByMode,
  Asm65816InstructionMetaById,
} from "./asm65816-instruction";
import { asm65816Language } from "../languages/asm65816";

//==============================================================================
// Compilation Error
//==============================================================================

type CompilationError = {
  line: number;
  from: number;
  to: number;
  message: string;
};

export type Asm65816CompilationError = CompilationError;

//==============================================================================
// Instruction Builder
//==============================================================================

type InstructionBuilder = {
  line: number;
  id: string | undefined;
  opcode: string | undefined;
  mode: string | undefined;
  args: { unit: "Byte" | "Word" | "Long"; value: string }[];
};

function InstructionBuilderFromLine(line: number): InstructionBuilder {
  return { line, id: undefined, opcode: undefined, mode: undefined, args: [] };
}

//==============================================================================
// Program
//==============================================================================

export type Asm65816Program = {
  bytes: number[];
  instructions: Asm65816Instruction[];
  errors: CompilationError[];
};

//==============================================================================
// Constructor
//==============================================================================

const modePrefix = "Mode_";
const unitByConstUnit = { ConstByte: "Byte", ConstWord: "Word" } as const;

export function Asm65168ProgramFromCode(code: string): Asm65816Program {
  const tree = asm65816Language.parser.parse(code);

  const text = Text.of(code.split("\n"));
  const cursor = tree.cursor();

  const instructions: Asm65816Instruction[] = [];
  let instructionBuilder: InstructionBuilder | undefined = undefined;
  let range = { from: 0, to: 0, line: 0 };

  const errors: CompilationError[] = [];

  const pushInstruction = () => {
    if (instructionBuilder) {
      if (!instructionBuilder.mode && instructionBuilder.args.length === 0)
        instructionBuilder.mode = "Implied";
      instructionBuilder.id = `${instructionBuilder.opcode}-${instructionBuilder.mode}`;
      const instruction =
        Asm65816InstructionSchema.safeParse(instructionBuilder);
      if (instruction.success) {
        instructions.push(instruction.data);
      } else if (errors.every((error) => error.line !== range.line)) {
        const mode = instructionBuilder.mode;
        const modeMeta =
          Asm65816InstructionModeMetaByMode[mode as Asm65816InstructionMode];
        const modeLabel = modeMeta?.label ? ` ${modeMeta.label}` : "";
        errors.push({
          line: range.line,
          from: range.from,
          to: range.to,
          message: `Instruction "${instructionBuilder.opcode}${modeLabel}" doesn't exist`,
        });
      }
    }
  };

  while (cursor.next()) {
    const line = text.lineAt(cursor.from).number;
    const error = (message: string) =>
      errors.push({ line, from: cursor.from, to: cursor.to, message });

    if (cursor.type.isError) {
      error(`Invalid syntax`);
      continue;
    }

    if (cursor.type.name === "Instruction") {
      pushInstruction();
      range = { from: cursor.from, to: cursor.to, line };
      instructionBuilder = InstructionBuilderFromLine(line);
      continue;
    }

    if (cursor.type.name === "Opcode") {
      const opcode = code.slice(cursor.from, cursor.to).toUpperCase();
      if (!instructionBuilder)
        error(`Opcode (${opcode}): missing instruction builder`);
      else if (instructionBuilder.opcode)
        error(`Opcode (${opcode}): opcode already present`);
      else instructionBuilder.opcode = opcode;
      continue;
    }

    if (cursor.type.name.startsWith(modePrefix)) {
      const type = cursor.type.name.substring(modePrefix.length);
      if (!instructionBuilder)
        error(`Param Type (${type}): missing instruction builder`);
      else if (instructionBuilder.mode)
        error(`Param Type (${type}): param type already present`);
      else instructionBuilder.mode = type;
      continue;
    }

    if (
      cursor.type.name == "Byte" ||
      cursor.type.name == "Word" ||
      cursor.type.name == "Long"
    ) {
      const unit = cursor.type.name;
      const value = code.slice(cursor.from, cursor.to);
      if (!instructionBuilder)
        error(`Arg (${unit}): missing instruction builder`);
      else instructionBuilder.args.push({ value, unit });
      continue;
    }

    if (cursor.type.name == "ConstByte" || cursor.type.name == "ConstWord") {
      const unit = unitByConstUnit[cursor.type.name];
      const value = code.slice(cursor.from + 1, cursor.to); // +1 to remove #
      if (!instructionBuilder)
        error(`Arg (${unit}): missing instruction builder`);
      else instructionBuilder.args.push({ value, unit });
      continue;
    }

    // Ignore other nodes.
  }

  pushInstruction();

  const bytes: number[] = [];
  for (const instruction of instructions) {
    bytes.push(Asm65816InstructionMetaById[instruction.id].hex);
    if (instruction.arg.l !== -1) bytes.push(instruction.arg.l);
    if (instruction.arg.h !== -1) bytes.push(instruction.arg.h);
    if (instruction.arg.b !== -1) bytes.push(instruction.arg.b);
  }

  return { bytes, errors, instructions };
}
