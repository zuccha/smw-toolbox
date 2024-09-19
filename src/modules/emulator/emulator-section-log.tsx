import SectionCollapsible from "../../components/section-collapsible";
import SnesLog from "../../components/snes-log";
import { useEmulatorTabLogIsVisible } from "./store";
import useEmulator from "./use-emulator";

export default function EmulatorSectionLog() {
  const { compilationErrors, cycles, executionErrors, instructions, length } =
    useEmulator();
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabLogIsVisible();

  const errors =
    compilationErrors.length > 0
      ? compilationErrors
      : executionErrors.length > 0
      ? executionErrors
      : [];

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label="Log"
      onChange={setIsTabSnesVisible}
    >
      <SnesLog
        cycles={cycles}
        errors={errors}
        instructions={instructions}
        length={length}
      />
    </SectionCollapsible>
  );
}
