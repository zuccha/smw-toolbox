import { useMemo } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import SnesMemory from "../../components/snes-memory";
import { range } from "../../utils";
import {
  emulator,
  useEmulatorMemoryBaseAddress,
  useEmulatorTabSnesIsVisible,
} from "./store";
import useEmulator from "./use-emulator";

const memorySize = 8 * 16;

export default function EmulatorSectionMemory() {
  const { snapshot } = useEmulator();
  const [baseAddress, setBaseAddress] = useEmulatorMemoryBaseAddress();
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabSnesIsVisible();

  const safeBaseAddress = isNaN(baseAddress) ? 0 : baseAddress;

  const memory = useMemo(
    () =>
      range(memorySize).map((i) => {
        try {
          return emulator.get_byte((safeBaseAddress + i) & 0xffffff);
        } catch {
          return 0;
        }
      }),
    [safeBaseAddress, snapshot],
  ); // Update when base address or snapshot changes.

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label="Memory"
      onChange={setIsTabSnesVisible}
    >
      <div className="App_SectionCol">
        <SnesMemory
          baseAddress={baseAddress}
          memory={memory}
          onChangeAddress={setBaseAddress}
        />
      </div>
    </SectionCollapsible>
  );
}
