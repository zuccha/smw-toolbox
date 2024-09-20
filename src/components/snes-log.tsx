import { Instruction } from "../extra/asm65816/emulator/instruction";
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
        <div>{"Instruction  "}</div>
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
            <div className="SnesLog_TableBody_Instruction">
              <div>{toHex(instruction.pc, 6)}</div>
              <div>{padR(instruction.text_with_value, 13, " ")}</div>
              {instruction.snapshot ? (
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
                  <div>{instruction.formatted_flags}</div>
                  <div>{instruction.cycles}</div>
                  <div>{instruction.length}</div>
                </>
              ) : (
                <div class="error">*** Error ***</div>
              )}
            </div>
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
      <span className={highByteClassName}>{toHex((value >> 8) & 0xff, 2)}</span>
      <span>{toHex(value & 0xff, 2)}</span>
    </span>
  );
}
