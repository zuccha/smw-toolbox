import { Text } from "@codemirror/state";
import {
  Asm65168Instruction,
  Asm65816InstructionSchema,
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

const messageByParamType: Record<string, string> = {
  Implied: "",
  Accumulator: " A",
  Direct_Byte: " dp",
  Direct_Byte_S: " dp,s",
  Direct_Byte_X: " dp,x",
  Direct_Byte_Y: " dp,y",
  Direct_Long: " long",
  Direct_Long_X: " long,x",
  Direct_Word: " addr",
  Direct_Word_X: " addr,x",
  Direct_Word_Y: " addr,y",
  Immediate_Byte: " #const",
  Immediate_Word: " #const",
  IndirectLong_Byte: " [dp]",
  IndirectLong_Byte_Y: " [dp],y",
  IndirectLong_Word: " [addr]",
  Indirect_Byte: " (dp)",
  Indirect_Byte_SY: " (sr,s),y",
  Indirect_Byte_X: " (dp,x)",
  Indirect_Byte_Y: " (dp),y",
  Indirect_Word: " (addr)",
  Indirect_Word_X: " (addr,x)",
  Move: " srcBank,destBank",
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

export type Asm65816Program = {
  instructions: Asm65168Instruction[];
  errors: CompilationError[];
};

//==============================================================================
// Constructor
//==============================================================================

const paramTypePrefix = "Param_";
const unitByConstUnit = { ConstByte: "Byte", ConstWord: "Word" } as const;

export function Asm65168ProgramFromCode(code: string): Asm65816Program {
  const tree = asm65816Language.parser.parse(code);

  const text = Text.of(code.split("\n"));
  const cursor = tree.cursor();

  const instructions: Asm65168Instruction[] = [];
  let instructionBuilder: InstructionBuilder | undefined = undefined;
  let range = { from: 0, to: 0, line: 0 };

  const errors: CompilationError[] = [];

  const pushInstruction = () => {
    if (instructionBuilder) {
      if (!instructionBuilder.paramType && instructionBuilder.args.length === 0)
        instructionBuilder.paramType = "Implied";
      const instruction =
        Asm65816InstructionSchema.safeParse(instructionBuilder);
      if (instruction.success) instructions.push(instruction.data);
      else if (errors.every((error) => error.line !== range.line)) {
        const paramType = instructionBuilder.paramType;
        const paramTypeMessage = paramType
          ? messageByParamType[paramType] ?? paramType
          : "";
        errors.push({
          line: range.line,
          from: range.from,
          to: range.to,
          message: `Instruction "${instructionBuilder.opcode}${paramTypeMessage}" doesn't exist`,
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

    if (cursor.type.name.startsWith(paramTypePrefix)) {
      const type = cursor.type.name.substring(paramTypePrefix.length);
      if (!instructionBuilder)
        error(`Param Type (${type}): missing instruction builder`);
      else if (instructionBuilder.paramType)
        error(`Param Type (${type}): param type already present`);
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
        error(`Arg (${unit}): missing instruction builder`);
      else instructionBuilder.args.push({ value, unit });
      continue;
    }

    if (cursor.type.name == "ConstByte" || cursor.type.name == "ConstWord") {
      const unit = unitByConstUnit[cursor.type.name];
      const value = code.slice(cursor.from, cursor.to);
      if (!instructionBuilder)
        error(`Arg (${unit}): missing instruction builder`);
      else instructionBuilder.args.push({ value, unit });
      continue;
    }

    // Ignore other nodes.
  }

  pushInstruction();

  return { errors, instructions };
}
