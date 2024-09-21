import { Instruction } from "../extra/asm65816/emulator/instruction";
import { padL, padR, toHex } from "../utils";
import Tooltip from "./tooltip";
import "./snes-log.css";
import { ProcessorSnapshot } from "../extra/asm65816/emulator/processor-snapshot";

export type SnesLogProps = {
  cycles: number;
  errors: readonly string[];
  instructions: readonly Instruction[];
  length: number;
  snapshot: ProcessorSnapshot;
};

const fill = " ";

export default function SnesLog({
  cycles,
  errors,
  instructions,
  length,
  snapshot,
}: SnesLogProps) {
  if (instructions.length === 0)
    return errors.length === 0 ? (
      <div className="SnesLog">Run emulator to see processor state.</div>
    ) : (
      <div>
        <div className="SnesLog_CompilationErrorLabel">
          {errors.length === 1 ? "Compilation error:" : "Compilation errors:"}
        </div>
        <ul className="SnesLog_CompilationErrors">
          {errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      </div>
    );

  const widths = {
    pc: 6,
    instruction: 13,
    a: 4,
    x: 4,
    y: 4,
    sp: 4,
    dp: 4,
    db: 2,
    flags: 8,
    cycles: String(cycles).length,
    length: String(length).length,
  };

  const headers = {
    pc: padR("PC", widths.pc, fill),
    instruction: padR("Instruction", widths.instruction, fill),
    a: padR("A", widths.a, fill),
    x: padR("X", widths.x, fill),
    y: padR("Y", widths.y, fill),
    sp: padR("SP", widths.sp, fill),
    dp: padR("DP", widths.dp, fill),
    db: padR("DB", widths.db, fill),
    flags: padR("Flags", widths.flags, fill),
    cycles: padL("C", widths.cycles, fill),
    length: padL("B", widths.length, fill),
  };

  const instructionCount =
    instructions.length === 1
      ? `${instructions.length} instruction`
      : `${instructions.length} instructions`;

  return (
    <div className="SnesLog">
      <div className="SnesLog_TableHeader">
        <Tooltip tooltip="Program Counter">{headers.pc}</Tooltip>
        <div>{headers.instruction}</div>
        <Tooltip tooltip="Accumulator">{headers.a}</Tooltip>
        <Tooltip tooltip="X index">{headers.x}</Tooltip>
        <Tooltip tooltip="Y index">{headers.y}</Tooltip>
        <Tooltip tooltip="Stack Pointer">{headers.sp}</Tooltip>
        <Tooltip tooltip="Direct Page">{headers.dp}</Tooltip>
        <Tooltip tooltip="Data Bank">{headers.db}</Tooltip>
        <div>{headers.flags}</div>
        <Tooltip tooltip="Cycles">{headers.cycles}</Tooltip>
        <Tooltip tooltip="Bytes">{headers.length}</Tooltip>
      </div>

      <div className="SnesLog_TableBody">
        <div className="SnesLog_TableBody_Instructions">
          {instructions.map((instruction) => {
            const className = instruction.snapshot ? undefined : "error";
            return (
              <div className="SnesLog_TableBody_Instruction">
                <div className={className}>{toHex(instruction.pc, 6)}</div>
                <div className={className}>
                  {padR(instruction.text_with_value, widths.instruction, fill)}
                </div>
                {instruction.snapshot && (
                  <>
                    <Register
                      shouldDimHighByte={!!instruction.snapshot.flag_m}
                      value={instruction.snapshot.a}
                    />
                    <Register
                      shouldDimHighByte={!!instruction.snapshot.flag_x}
                      value={instruction.snapshot.x}
                    />
                    <Register
                      shouldDimHighByte={!!instruction.snapshot.flag_x}
                      value={instruction.snapshot.y}
                    />
                    <div>{toHex(instruction.snapshot.sp, 4)}</div>
                    <div>{toHex(instruction.snapshot.dp, 4)}</div>
                    <div>{toHex(instruction.snapshot.db, 2)}</div>
                    <div>{instruction.snapshot.flags}</div>
                    <div>
                      {padL(`${instruction.cycles}`, widths.cycles, fill)}
                    </div>
                    <div>
                      {padL(`${instruction.length}`, widths.length, fill)}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="SnesLog_TableFooter">
        <div>
          {padR(instructionCount, widths.pc + widths.instruction, fill)}
        </div>
        <div></div>

        <Register shouldDimHighByte={!!snapshot.flag_m} value={snapshot.a} />
        <Register shouldDimHighByte={!!snapshot.flag_x} value={snapshot.x} />
        <Register shouldDimHighByte={!!snapshot.flag_x} value={snapshot.y} />
        <div>{toHex(snapshot.sp, 4)}</div>
        <div>{toHex(snapshot.dp, 4)}</div>
        <div>{toHex(snapshot.db, 2)}</div>
        <div>{snapshot.flags}</div>

        <div>{cycles}</div>
        <div>{length}</div>
      </div>

      {errors.length > 0 && (
        <div className="SnesLog_ExecutionErrors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function Register({
  shouldDimHighByte,
  value,
}: {
  shouldDimHighByte: boolean;
  value: number;
}) {
  const highByteClassName = shouldDimHighByte ? "dim" : undefined;
  return (
    <span>
      <span className={highByteClassName}>{toHex((value >> 8) & 0xff, 2)}</span>
      <span>{toHex(value & 0xff, 2)}</span>
    </span>
  );
}
