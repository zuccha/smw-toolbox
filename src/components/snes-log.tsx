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
  windowSize?: number;
};

export default function SnesLog({
  cycles,
  errors,
  instructions,
  length,
  onClickValidInstruction,
  snapshot,
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
                  <td>{padL(`${instruction.id}`, idLength, " ")}</td>
                  <td>{instruction.pc.format_address()}</td>
                  <TdInstruction instruction={instruction} />
                  {instruction.snapshot ? (
                    <>
                      <TdRegister
                        dimPage={!!instruction.snapshot.flag_m}
                        value={instruction.snapshot.a}
                      />
                      <TdRegister
                        dimPage={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.x}
                      />
                      <TdRegister
                        dimPage={!!instruction.snapshot.flag_x}
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
              <td>{instructions.length}</td>
              <td>{l((snapshot.pb << 16) + snapshot.pc).format_address()}</td>
              <td></td>
              <TdRegister dimPage={!!snapshot.flag_m} value={snapshot.a} />
              <TdRegister dimPage={!!snapshot.flag_x} value={snapshot.x} />
              <TdRegister dimPage={!!snapshot.flag_x} value={snapshot.y} />
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

function TdRegister({ dimPage, value }: { dimPage: boolean; value: number }) {
  const byte = formatValue(value & 0xff, IntegerEncoding.Hex, IntegerUnit.Byte);
  const word = formatValue(value, IntegerEncoding.Hex, IntegerUnit.Word);
  const tooltip = `8-bit: ${byte.tooltip}\n16-bit: ${word.tooltip}`;
  return (
    <td>
      <Tooltip monospace tooltip={tooltip}>
        {dimPage ? (
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
