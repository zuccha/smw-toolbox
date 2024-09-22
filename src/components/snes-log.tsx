import { useLayoutEffect, useState } from "preact/hooks";
import { Instruction } from "../extra/asm65816/emulator/instruction";
import { ProcessorSnapshot } from "../extra/asm65816/emulator/processor-snapshot";
import useItemsWindow from "../hooks/use-items-window";
import { classNames, padL, toHex } from "../utils";
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
  const [selectedId, setSelectedId] = useState(-1);
  const instructionsWindow = useItemsWindow(instructions, windowSize);

  useLayoutEffect(() => {
    setSelectedId(-1);
    instructionsWindow.resetScroll();
  }, [instructions, instructionsWindow.resetScroll]);

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

  const instructionCount =
    instructions.length === 1
      ? `${instructions.length} instruction`
      : `${instructions.length} instructions`;

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
                ["selected", instruction.id === selectedId],
                ["error", !instruction.snapshot],
              ]);
              const onClick = instruction.snapshot
                ? () => {
                    const newSelectedId =
                      instruction.id === selectedId ? -1 : instruction.id;
                    setSelectedId(newSelectedId);
                    onClickValidInstruction(newSelectedId);
                  }
                : undefined;
              return (
                <tr className={className} onClick={onClick}>
                  <td>{padL(`${instruction.id}`, idLength, " ")}</td>
                  <td>{toHex(instruction.pc, 6)}</td>
                  <td>{instruction.text_with_value}</td>
                  {instruction.snapshot ? (
                    <>
                      <Register
                        dimPage={!!instruction.snapshot.flag_m}
                        value={instruction.snapshot.a}
                      />
                      <Register
                        dimPage={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.x}
                      />
                      <Register
                        dimPage={!!instruction.snapshot.flag_x}
                        value={instruction.snapshot.y}
                      />
                      <td>{toHex(instruction.snapshot.sp, 4)}</td>
                      <td>{toHex(instruction.snapshot.dp, 4)}</td>
                      <td>{toHex(instruction.snapshot.db, 2)}</td>
                      <Flags flags={instruction.snapshot.flags} />
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
              <td colSpan={3}>{instructionCount}</td>
              <Register dimPage={!!snapshot.flag_m} value={snapshot.a} />
              <Register dimPage={!!snapshot.flag_x} value={snapshot.x} />
              <Register dimPage={!!snapshot.flag_x} value={snapshot.y} />
              <td>{toHex(snapshot.sp, 4)}</td>
              <td>{toHex(snapshot.dp, 4)}</td>
              <td className="space-right">{toHex(snapshot.db, 2)}</td>
              <Flags flags={snapshot.flags} />
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

function Register({ dimPage, value }: { dimPage: boolean; value: number }) {
  return dimPage ? (
    <td>
      <dim>{toHex((value >> 8) & 0xff, 2)}</dim>
      <span>{toHex(value & 0xff, 2)}</span>
    </td>
  ) : (
    <td>{toHex(value, 4)}</td>
  );
}

function Flags({ flags }: { flags: string }) {
  return (
    <td>
      {flags.split("").map((flag) => (
        <Flag flag={flag} />
      ))}
    </td>
  );
}

function Flag({ flag }: { flag: string }) {
  return flag === flag.toUpperCase() ? <span>{flag}</span> : <dim>{flag}</dim>;
}
