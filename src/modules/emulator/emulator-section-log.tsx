import { useCallback } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import SnesLog from "../../components/snes-log";
import { useEmulatorTabLogIsVisible } from "./store";
import useEmulator from "./use-emulator";

export default function EmulatorSectionLog() {
  const emulator = useEmulator();
  const [isTabLogVisible, setIsTabLogVisible] = useEmulatorTabLogIsVisible();

  const clickValidInstruction = useCallback(
    (id: number) => emulator.runUntil(id),
    [emulator.runUntil],
  );

  return (
    <SectionCollapsible
      isVisible={isTabLogVisible}
      label="Log"
      onChange={setIsTabLogVisible}
    >
      <SnesLog
        cycles={emulator.cycles}
        compilationErrors={emulator.compilationErrors}
        executionErrors={emulator.executionErrors}
        instructions={emulator.instructions}
        length={emulator.length}
        onClickValidInstruction={clickValidInstruction}
        selectedInstructionId={emulator.selectedInstructionId}
        snapshot={emulator.snapshot}
      />
    </SectionCollapsible>
  );
}
