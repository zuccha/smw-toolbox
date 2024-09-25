import { useLayoutEffect, useState } from "preact/hooks";
import { Instruction } from "../extra/asm65816/emulator/instruction";
import { ProcessorSnapshot } from "../extra/asm65816/emulator/processor-snapshot";
import { l } from "../extra/asm65816/emulator/value";
import useItemsWindow from "../hooks/use-items-window";
import { IntegerEncoding, IntegerUnit } from "../models/integer";
import { classNames, padL, toHex } from "../utils";
import Tooltip from "./tooltip";
import { formatValue } from "./value";
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
              <TdRegister
                is8Bit={!!snapshotInitial.flag_m}
                value={snapshotInitial.a}
              />
              <TdRegister
                is8Bit={!!snapshotInitial.flag_x}
                value={snapshotInitial.x}
              />
              <TdRegister
                is8Bit={!!snapshotInitial.flag_x}
                value={snapshotInitial.y}
              />
              <td>{toHex(snapshotInitial.sp, 4)}</td>
              <td>{toHex(snapshotInitial.dp, 4)}</td>
              <td className="space-right">{toHex(snapshotInitial.db, 2)}</td>
              <TdFlags flags={snapshotInitial.flags} />
              <td className="right">-</td>
              <td className="right space-left">-</td>
            </tr>

            {instructionsWindow.items.map((instruction) => {
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
                      <TdRegister
                        is8Bit={!!instruction.snapshot.flag_m}
                        value={instruction.snapshot.a}
                      />
                      <TdRegister
                        is8Bit={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.x}
                      />
                      <TdRegister
                        is8Bit={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.y}
                      />
                      <td>{toHex(instruction.snapshot.sp, 4)}</td>
                      <td>{toHex(instruction.snapshot.dp, 4)}</td>
                      <td>{toHex(instruction.snapshot.db, 2)}</td>
                      <TdFlags flags={instruction.snapshot.flags} />
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
              <TdRegister is8Bit={!!snapshot.flag_m} value={snapshot.a} />
              <TdRegister is8Bit={!!snapshot.flag_x} value={snapshot.x} />
              <TdRegister is8Bit={!!snapshot.flag_x} value={snapshot.y} />
              <td>{toHex(snapshot.sp, 4)}</td>
              <td>{toHex(snapshot.dp, 4)}</td>
              <td className="space-right">{toHex(snapshot.db, 2)}</td>
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

function TdRegister({ is8Bit, value }: { is8Bit: boolean; value: number }) {
  const byte = formatValue(value & 0xff, IntegerEncoding.Hex, IntegerUnit.Byte);
  const word = formatValue(value, IntegerEncoding.Hex, IntegerUnit.Word);
  const tooltip = `8-bit: ${byte.tooltip}\n16-bit: ${word.tooltip}`;
  return (
    <td>
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

function TdFlags({ flags }: { flags: string }) {
  return (
    <td>
      {flags
        .split("")
        .map((flag) =>
          flag === flag.toUpperCase() ? <span>{flag}</span> : <dim>{flag}</dim>,
        )}
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
