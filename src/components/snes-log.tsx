import { Instruction } from "../extra/asm65816/emulator/instruction";
import { ProcessorSnapshot } from "../extra/asm65816/emulator/processor-snapshot";
import { l } from "../extra/asm65816/emulator/value";
import { IntegerEncoding, IntegerUnit } from "../models/integer";
import { padL, toHex } from "../utils";
import Table from "./table";
import Tooltip from "./tooltip";
import Value, { formatValue } from "./value";
import "./snes-log.css";

export type SnesLogProps = {
  cycles: number;
  errors: readonly string[];
  instructions: readonly Instruction[];
  length: number;
  onClickValidInstruction: (id: number) => void;
  selectedInstructionId: number;
  snapshot: ProcessorSnapshot;
  windowSize?: number;
};

export default function SnesLog({
  cycles,
  errors,
  instructions,
  length,
  onClickValidInstruction,
  selectedInstructionId,
  snapshot,
}: SnesLogProps) {
  if (instructions.length === 0)
    return errors.length === 0 ? (
      <div className="SnesLog">
        Run the emulator to see the processor's state.
      </div>
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

  const idLength = `${instructions.length}`.length;

  return (
    <div className="SnesLog">
      <Table
        columns={[
          {
            header: "Id",
            footer: <Cell_Id id={instructions.length - 1} length={idLength} />,
            value: (instruction) => (
              <Cell_Id id={instruction.id} length={idLength} />
            ),
          },
          {
            header: "PC",
            footer: <Cell_Pc pb={snapshot.pb} pc={snapshot.pc} />,
            value: (instruction) => (
              <Cell_Pc pb={instruction.pb} pc={instruction.pc} />
            ),
          },
          {
            header: "Instruction",
            value: (instruction) => (
              <Cell_Instruction instruction={instruction} />
            ),
          },
          {
            header: "A",
            footer: (
              <Cell_RegisterVar is8Bit={!!snapshot.flag_m} value={snapshot.a} />
            ),
            value: (instruction, { prev }) =>
              instruction.snapshot ? (
                <Cell_RegisterVar
                  didChange={c(instruction.snapshot.a, prev?.snapshot?.a)}
                  is8Bit={!!instruction.snapshot.flag_m}
                  value={instruction.snapshot.a}
                />
              ) : (
                <span className="SnesLog_Error">*** Error ***</span>
              ),
            colSpan: (instruction) => (instruction.snapshot ? 1 : 7),
          },
          {
            header: "X",
            footer: (
              <Cell_RegisterVar is8Bit={!!snapshot.flag_x} value={snapshot.x} />
            ),
            value: (instruction, { prev }) =>
              instruction.snapshot && (
                <Cell_RegisterVar
                  didChange={c(instruction.snapshot.x, prev?.snapshot?.x)}
                  is8Bit={!!instruction.snapshot.flag_x}
                  value={instruction.snapshot.x}
                />
              ),
            colSpan: (instruction) => (instruction.snapshot ? 1 : 0),
          },
          {
            header: "Y",
            footer: (
              <Cell_RegisterVar is8Bit={!!snapshot.flag_x} value={snapshot.y} />
            ),
            value: (instruction, { prev }) =>
              instruction.snapshot && (
                <Cell_RegisterVar
                  didChange={c(instruction.snapshot.y, prev?.snapshot?.y)}
                  is8Bit={!!instruction.snapshot.flag_x}
                  value={instruction.snapshot.y}
                />
              ),
            colSpan: (instruction) => (instruction.snapshot ? 1 : 0),
          },
          {
            header: "SP",
            footer: <Cell_Register16Bit value={snapshot.sp} />,
            value: (instruction, { prev }) =>
              instruction.snapshot && (
                <Cell_Register16Bit
                  didChange={c(instruction.snapshot.sp, prev?.snapshot?.sp)}
                  value={instruction.snapshot.sp}
                />
              ),
            colSpan: (instruction) => (instruction.snapshot ? 1 : 0),
          },
          {
            header: "DP",
            footer: <Cell_Register16Bit value={snapshot.dp} />,
            value: (instruction, { prev }) =>
              instruction.snapshot && (
                <Cell_Register16Bit
                  didChange={c(instruction.snapshot.dp, prev?.snapshot?.dp)}
                  value={instruction.snapshot.dp}
                />
              ),
            colSpan: (instruction) => (instruction.snapshot ? 1 : 0),
          },
          {
            header: "DB",
            footer: <Cell_Register8Bit value={snapshot.db} />,
            value: (instruction, { prev }) =>
              instruction.snapshot && (
                <Cell_Register8Bit
                  didChange={c(instruction.snapshot.db, prev?.snapshot?.db)}
                  value={instruction.snapshot.db}
                />
              ),
            space: "right",
            colSpan: (instruction) => (instruction.snapshot ? 1 : 0),
          },
          {
            header: "Flags",
            footer: <Cell_Flags flags={snapshot.flags} />,
            value: (instruction, { prev }) =>
              instruction.snapshot && (
                <Cell_Flags
                  flags={instruction.snapshot.flags}
                  prevFlags={prev?.snapshot?.flags}
                />
              ),
            colSpan: (instruction) => (instruction.snapshot ? 1 : 0),
          },
          {
            header: "C",
            footer: cycles,
            value: (instruction) => instruction.cycles,
            align: "right",
          },
          {
            header: "L",
            footer: length,
            value: (instruction) => instruction.length,
            align: "right",
            space: "left",
          },
        ]}
        isRowClickable={(instruction) => !!instruction.snapshot}
        isRowSelected={(instruction) =>
          instruction.id === selectedInstructionId
        }
        items={instructions}
        onClickRow={(instruction) => {
          if (instruction.snapshot) {
            const newSelectedInstructionId =
              instruction.id === selectedInstructionId ? -1 : instruction.id;
            onClickValidInstruction(newSelectedInstructionId);
          }
        }}
        maxVisibleItems={16}
        withFooter
      />

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

function Cell_Id({ id, length }: { id: number; length: number }) {
  return <span>{padL(`${id}`, length, " ")}</span>;
}

function Cell_Pc({ pb, pc }: { pb: number; pc: number }) {
  return <span>{l((pb << 16) | pc).format_address()}</span>;
}

function Cell_RegisterVar({
  didChange = false,
  is8Bit,
  value,
}: {
  didChange?: boolean;
  is8Bit: boolean;
  value: number;
}) {
  const byte = formatValue(value & 0xff, IntegerEncoding.Hex, IntegerUnit.Byte);
  const word = formatValue(value, IntegerEncoding.Hex, IntegerUnit.Word);
  const tooltip = `8-bit: ${byte.tooltip}\n16-bit: ${word.tooltip}`;
  return (
    <span className={didChange ? "SnesLog_Highlight" : undefined}>
      <Tooltip monospace tooltip={tooltip}>
        {is8Bit ? (
          <>
            <dim>{toHex((value >> 8) & 0xff, 2)}</dim>
            <span>{byte.formatted}</span>
          </>
        ) : (
          <span>{word.formatted}</span>
        )}
      </Tooltip>
    </span>
  );
}

function Cell_Register8Bit({
  didChange,
  value,
}: {
  didChange?: boolean;
  value: number;
}) {
  const [encoding, unit] = [IntegerEncoding.Hex, IntegerUnit.Byte];
  return (
    <span className={didChange ? "SnesLog_Highlight" : undefined}>
      <Value encoding={encoding} unit={unit} value={value} />
    </span>
  );
}

function Cell_Register16Bit({
  didChange = false,
  value,
}: {
  didChange?: boolean;
  value: number;
}) {
  const [encoding, unit] = [IntegerEncoding.Hex, IntegerUnit.Word];
  return (
    <span className={didChange ? "SnesLog_Highlight" : undefined}>
      <Value encoding={encoding} unit={unit} value={value} />
    </span>
  );
}

function Cell_Flags({
  flags,
  prevFlags = "",
}: {
  flags: string;
  prevFlags?: string;
}) {
  return (
    <span>
      {flags.split("").map((flag, i) => {
        const active = flag === flag.toUpperCase();
        const prevFlag = prevFlags[i] ?? flag;
        const className = flag !== prevFlag ? "SnesLog_Highlight" : undefined;
        return active ? (
          <span className={className}>{flag}</span>
        ) : (
          <dim className={className}>{flag}</dim>
        );
      })}
    </span>
  );
}

function Cell_Instruction({ instruction }: { instruction: Instruction }) {
  const bytes = instruction.bytes.map((byte) => toHex(byte, 2)).join(" ");
  const tooltip = instruction.has_addr
    ? `${bytes} ${instruction.addr.format_address()}`
    : bytes;
  return (
    <span className="flex">
      {tooltip ? (
        <Tooltip monospace tooltip={tooltip}>
          {instruction.text_with_value}
        </Tooltip>
      ) : (
        instruction.text_with_value
      )}
    </span>
  );
}

const c = (value: number, prev: number | undefined) =>
  prev !== undefined && value !== prev;
