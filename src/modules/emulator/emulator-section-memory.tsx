import { useMemo } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import SnesMemory from "../../components/snes-memory";
import { range } from "../../utils";
import {
  useEmulatorMemoryBaseAddress,
  useEmulatorTabSnesIsVisible,
} from "./store";
import useEmulator from "./use-emulator";

const memorySize = 8 * 16;

export default function EmulatorSectionMemory() {
  const { instructionId, readByte } = useEmulator();
  const [baseAddress, setBaseAddress] = useEmulatorMemoryBaseAddress();
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabSnesIsVisible();

  const safeBaseAddress = isNaN(baseAddress) ? 0 : baseAddress;

  const memory = useMemo(
    () => range(memorySize).map((i) => readByte(safeBaseAddress + i)),
    [safeBaseAddress, readByte],
  );

  const label =
    instructionId === -1 ? "Memory" : `Memory (instruction ${instructionId})`;

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label={label}
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
