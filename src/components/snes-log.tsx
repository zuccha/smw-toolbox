import { useLayoutEffect, useState } from "preact/hooks";
import { Instruction } from "../extra/asm65816/emulator/instruction";
import { ProcessorSnapshot } from "../extra/asm65816/emulator/processor-snapshot";
import { l } from "../extra/asm65816/emulator/value";
import useItemsWindow from "../hooks/use-items-window";
import { IntegerEncoding, IntegerUnit } from "../models/integer";
import { classNames, padL, toHex } from "../utils";
import Tooltip from "./tooltip";
import Value, { formatValue } from "./value";
import "./snes-log.css";

export type SnesLogProps = {
  cycles: number;
  errors: readonly string[];
  instructions: readonly Instruction[];
  length: number;
  onClickValidInstruction: (id: number) => void;
  snapshot: ProcessorSnapshot;
  snapshotInitial: ProcessorSnapshot;
  windowSize?: number;
};

export default function SnesLog({
  cycles,
  errors,
  instructions,
  length,
  onClickValidInstruction,
  snapshot,
  snapshotInitial,
  windowSize = 16,
}: SnesLogProps) {
  const [selected, setSelected] = useState<Instruction | undefined>(undefined);
  const instructionsWindow = useItemsWindow(instructions, windowSize);

  useLayoutEffect(() => {
    setSelected(undefined);
    instructionsWindow.resetScroll();
  }, [instructions, instructionsWindow.resetScroll]);

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
      <div className="SnesLog_Table">
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>PC</td>
              <td>Instruction</td>
              <td>A</td>
              <td>X</td>
              <td>Y</td>
              <td>SP</td>
              <td>DP</td>
              <td className="space-right">DB</td>
              <td>Flags</td>
              <td className="right">C</td>
              <td className="right space-left">B</td>
            </tr>
          </thead>

          <tbody onWheel={instructionsWindow.handleScroll}>
            <tr>
              <TdId id={0} length={idLength} />
              <TdPc pb={snapshotInitial.pb} pc={snapshotInitial.pc} />
              <td colSpan={1}>{"<initial state>"}</td>
              <TdRegisterVar
                is8Bit={!!snapshotInitial.flag_m}
                value={snapshotInitial.a}
              />
              <TdRegisterVar
                is8Bit={!!snapshotInitial.flag_x}
                value={snapshotInitial.x}
              />
              <TdRegisterVar
                is8Bit={!!snapshotInitial.flag_x}
                value={snapshotInitial.y}
              />
              <TdRegister16Bit value={snapshotInitial.sp} />
              <TdRegister16Bit value={snapshotInitial.dp} />
              <TdRegister8Bit value={snapshotInitial.db} />
              <TdFlags flags={snapshotInitial.flags} />
              <td className="right">-</td>
              <td className="right space-left">-</td>
            </tr>

            {instructionsWindow.items.map((instruction) => {
              const prevSnapshot =
                instructions[instruction.id - 2]?.snapshot ?? snapshotInitial;
              const className = classNames([
                ["selected", instruction.id === selected?.id],
                ["error", !instruction.snapshot],
              ]);
              const onClick = instruction.snapshot
                ? () => {
                    const newSelected =
                      instruction.id === selected?.id ? undefined : instruction;
                    setSelected(newSelected);
                    onClickValidInstruction(newSelected?.id ?? -1);
                  }
                : undefined;
              return (
                <tr className={className} onClick={onClick}>
                  <TdId id={instruction.id} length={idLength} />
                  <TdPc pb={instruction.pb} pc={instruction.pc} />
                  <TdInstruction instruction={instruction} />
                  {instruction.snapshot ? (
                    <>
                      <TdRegisterVar
                        didChange={instruction.snapshot.a !== prevSnapshot.a}
                        is8Bit={!!instruction.snapshot.flag_m}
                        value={instruction.snapshot.a}
                      />
                      <TdRegisterVar
                        didChange={instruction.snapshot.x !== prevSnapshot.x}
                        is8Bit={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.x}
                      />
                      <TdRegisterVar
                        didChange={instruction.snapshot.y !== prevSnapshot.y}
                        is8Bit={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.y}
                      />
                      <TdRegister16Bit
                        didChange={instruction.snapshot.sp !== prevSnapshot.sp}
                        value={instruction.snapshot.sp}
                      />
                      <TdRegister16Bit
                        didChange={instruction.snapshot.dp !== prevSnapshot.dp}
                        value={instruction.snapshot.dp}
                      />
                      <TdRegister8Bit
                        didChange={instruction.snapshot.db !== prevSnapshot.db}
                        value={instruction.snapshot.db}
                      />
                      <TdFlags
                        flags={instruction.snapshot.flags}
                        prevFlags={prevSnapshot.flags}
                      />
                      <td className="right">{instruction.cycles}</td>
                      <td className="right space-left">{instruction.length}</td>
                    </>
                  ) : (
                    <td colSpan={10}>*** Error ***</td>
                  )}
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <TdId id={instructions.length} length={idLength} />
              <TdPc pb={snapshot.pb} pc={snapshot.pc} />
              <td></td>
              <TdRegisterVar is8Bit={!!snapshot.flag_m} value={snapshot.a} />
              <TdRegisterVar is8Bit={!!snapshot.flag_x} value={snapshot.x} />
              <TdRegisterVar is8Bit={!!snapshot.flag_x} value={snapshot.y} />
              <TdRegister16Bit value={snapshot.sp} />
              <TdRegister16Bit value={snapshot.dp} />
              <TdRegister8Bit value={snapshot.db} />
              <TdFlags flags={snapshot.flags} />
              <td className="right">{cycles}</td>
              <td className="right space-left">{length}</td>
            </tr>
          </tfoot>
        </table>
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

function TdId({ id, length }: { id: number; length: number }) {
  return <td>{padL(`${id}`, length, " ")}</td>;
}

function TdPc({ pb, pc }: { pb: number; pc: number }) {
  return <td>{l((pb << 16) | pc).format_address()}</td>;
}

function TdRegisterVar({
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
    <td className={didChange ? "highlight" : undefined}>
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
    </td>
  );
}

function TdRegister8Bit({
  didChange,
  value,
}: {
  didChange?: boolean;
  value: number;
}) {
  const [encoding, unit] = [IntegerEncoding.Hex, IntegerUnit.Byte];
  return (
    <td className={didChange ? "highlight" : undefined}>
      <Value encoding={encoding} unit={unit} value={value} />
    </td>
  );
}

function TdRegister16Bit({
  didChange = false,
  value,
}: {
  didChange?: boolean;
  value: number;
}) {
  const [encoding, unit] = [IntegerEncoding.Hex, IntegerUnit.Word];
  return (
    <td className={didChange ? "highlight" : undefined}>
      <Value encoding={encoding} unit={unit} value={value} />
    </td>
  );
}

function TdFlags({
  flags,
  prevFlags = "",
}: {
  flags: string;
  prevFlags?: string;
}) {
  return (
    <td>
      {flags.split("").map((flag, i) => {
        const active = flag === flag.toUpperCase();
        const prevFlag = prevFlags[i] ?? flag;
        const className = flag !== prevFlag ? "highlight" : undefined;
        return active ? (
          <span className={className}>{flag}</span>
        ) : (
          <dim className={className}>{flag}</dim>
        );
      })}
    </td>
  );
}

function TdInstruction({ instruction }: { instruction: Instruction }) {
  const bytes = instruction.bytes.map((byte) => toHex(byte, 2)).join(" ");
  const tooltip = instruction.has_addr
    ? `${bytes} ${instruction.addr.format_address()}`
    : bytes;
  return (
    <td>
      <span className="flex">
        <Tooltip monospace tooltip={tooltip}>
          {instruction.text_with_value}
        </Tooltip>
      </span>
    </td>
  );
}
