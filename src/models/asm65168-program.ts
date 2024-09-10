import { Text } from "@codemirror/state";
import { asm65168AssemblerLanguage } from "../languages/asm-65168-assembler";
import {
  Asm65168Instruction,
  Asm65168InstructionSchema,
} from "./asm65168-instruction";

//==============================================================================
// Compilation Error
//==============================================================================

type CompilationError = {
  line: number;
  from: number;
  to: number;
  type: string;
  payload?: unknown;
};

//==============================================================================
// Instruction Builder
//==============================================================================

type InstructionBuilder = {
  line: number;
  opcode: string | undefined;
  paramType: string | undefined;
  args: { unit: "Byte" | "Word" | "Long"; value: string }[];
};

function InstructionBuilderFromLine(line: number): InstructionBuilder {
  return { line, opcode: undefined, paramType: undefined, args: [] };
}

//==============================================================================
// Program
//==============================================================================

export type Asm65168Program = {
  instructions: Asm65168Instruction[];
  errors: CompilationError[];
};

//==============================================================================
// Constructor
//==============================================================================

const paramTypePrefix = "Param_";

export function Asm65168ProgramFromCode(code: string): Asm65168Program {
  const tree = asm65168AssemblerLanguage.parser.parse(code);

  const text = Text.of(code.split("\n"));
  const cursor = tree.cursor();

  const instructions: Asm65168Instruction[] = [];
  let instructionBuilder: InstructionBuilder | undefined = undefined;
  let line = 0;

  const errors: CompilationError[] = [];

  const pushInstruction = () => {
    if (instructionBuilder) {
      if (!instructionBuilder.paramType && instructionBuilder.args.length === 0)
        instructionBuilder.paramType = "Implied";
      const instruction =
        Asm65168InstructionSchema.safeParse(instructionBuilder);
      if (instruction.success) instructions.push(instruction.data);
      else
        errors.push({
          line: text.lineAt(cursor.from).number,
          from: cursor.from,
          to: cursor.to,
          type: "Invalid Instruction",
          payload: instruction.error,
        });
    }
  };

  while (cursor.next()) {
    const error = (type: string) => ({
      line,
      from: cursor.from,
      to: cursor.to,
      type,
    });

    if (cursor.type.isError) {
      errors.push(error(`Generic: ${cursor.type.name}`));
      continue;
    }

    if (cursor.type.name === "Instruction") {
      pushInstruction();
      line = text.lineAt(cursor.from).number;
      instructionBuilder = InstructionBuilderFromLine(line);
      continue;
    }

    if (cursor.type.name === "Opcode") {
      const opcode = code.slice(cursor.from, cursor.to).toUpperCase();
      if (!instructionBuilder)
        errors.push(error(`Opcode (${opcode}): missing instruction builder`));
      else if (instructionBuilder.opcode)
        errors.push(error(`Opcode (${opcode}): opcode already present`));
      else instructionBuilder.opcode = opcode;
      continue;
    }

    if (cursor.type.name.startsWith(paramTypePrefix)) {
      const type = cursor.type.name.substring(paramTypePrefix.length);
      if (!instructionBuilder)
        errors.push(error(`Param Type (${type}): missing instruction builder`));
      else if (instructionBuilder.paramType)
        errors.push(error(`Param Type (${type}): param type already present`));
      else instructionBuilder.paramType = type;
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
        errors.push(error(`Arg (${unit}): missing instruction builder`));
      else instructionBuilder.args.push({ value, unit });
      continue;
    }

    const name = cursor.type.name;
    errors.push(error(`Unknown Node (${name})`));
  }

  pushInstruction();

  return { errors, instructions };
}
