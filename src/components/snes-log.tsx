import { Instruction } from "../models/asm65816/instruction";
import { padR, toHex } from "../utils";
import Tooltip from "./tooltip";
import "./snes-log.css";

export type SnesLogProps = {
  cycles: number;
  errors: readonly string[];
  instructions: readonly Instruction[];
  length: number;
};

export default function SnesLog({
  cycles,
  errors,
  instructions,
  length,
}: SnesLogProps) {
  if (instructions.length === 0)
    return errors.length === 0 ? (
      <div className="SnesLog">Run emulator to see processor state.</div>
    ) : (
      <div>
        <div>
          {errors.length === 1 ? "Compilation error:" : "Compilation errors:"}
        </div>
        <div className="SnesLog_Errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="SnesLog">
      <div className="SnesLog_TableHeader">
        <Tooltip tooltip="Program Counter">{"PC    "}</Tooltip>
        <div>{"Instruction    "}</div>
        <Tooltip tooltip="Accumulator">{"A   "}</Tooltip>
        <Tooltip tooltip="X index">{"X   "}</Tooltip>
        <Tooltip tooltip="Y index">{"Y   "}</Tooltip>
        <Tooltip tooltip="Stack Pointer">{"SP  "}</Tooltip>
        <Tooltip tooltip="Direct Page">{"DP  "}</Tooltip>
        <Tooltip tooltip="Data Bank">{"DB"}</Tooltip>
        <div>{"Flags   "}</div>
        <Tooltip tooltip="Cycles">{"C"}</Tooltip>
        <Tooltip tooltip="Bytes">{"B"}</Tooltip>
      </div>

      <div className="SnesLog_TableBody">
        <div className="SnesLog_TableBody_Instructions">
          {instructions.map((instruction) => (
            <>
              <span>{toHex(instruction.PC, 6)}</span>
              <span>{padR(instruction.text, 15, " ")}</span>
              {instruction.snapshot ? (
                <>
                  <Register
                    shouldDimHighByte={!!instruction.snapshot.flag.m}
                    value={instruction.snapshot.A}
                  />
                  <Register
                    shouldDimHighByte={!!instruction.snapshot.flag.x}
                    value={instruction.snapshot.X}
                  />
                  <Register
                    shouldDimHighByte={!!instruction.snapshot.flag.x}
                    value={instruction.snapshot.Y}
                  />
                  <span>{toHex(instruction.snapshot.SP, 4)}</span>
                  <span>{toHex(instruction.snapshot.DP, 4)}</span>
                  <span>{toHex(instruction.snapshot.DB, 2)}</span>
                  <span>{instruction.format_flags()}</span>
                  <span>{instruction.cycles}</span>
                  <span>{instruction.length}</span>
                </>
              ) : (
                <span class="error">*** Error ***</span>
              )}
            </>
          ))}
        </div>
      </div>

      {errors.length > 0 ? (
        <div className="SnesLog_Errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      ) : (
        <div className="SnesLog_Info">{`${instructions.length} instructions, ${cycles} cycles, ${length} bytes.`}</div>
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
      <span className={highByteClassName}>{toHex(value >> 8 && 0xff, 2)}</span>
      <span>{toHex(value & 0xff, 2)}</span>
    </span>
  );
}
