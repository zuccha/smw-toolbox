import { useCallback } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import SnesLog from "../../components/snes-log";
import { useEmulatorTabLogIsVisible } from "./store";
import useEmulator from "./use-emulator";

export default function EmulatorSectionLog() {
  const emulator = useEmulator();
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabLogIsVisible();

  const errors =
    emulator.compilationErrors.length > 0
      ? emulator.compilationErrors
      : emulator.executionErrors.length > 0
      ? emulator.executionErrors
      : [];

  const clickValidInstruction = useCallback(
    (id: number) => emulator.runUntil(id),
    [emulator.runUntil],
  );

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label="Log"
      onChange={setIsTabSnesVisible}
    >
      <SnesLog
        cycles={emulator.cycles}
        errors={errors}
        instructions={emulator.instructions}
        length={emulator.length}
        onClickValidInstruction={clickValidInstruction}
        selectedInstructionId={emulator.selectedInstructionId}
        snapshot={emulator.snapshot}
      />
    </SectionCollapsible>
  );
}
