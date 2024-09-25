import { useMemo } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import SnesMemory from "../../components/snes-memory";
import { range } from "../../utils";
import {
  useEmulatorMemoryBaseAddress,
  useEmulatorTabMemoryIsVisible,
} from "./store";
import useEmulator from "./use-emulator";

const memorySize = 8 * 16;

export default function EmulatorSectionMemory() {
  const emulator = useEmulator();
  const [baseAddress, setBaseAddress] = useEmulatorMemoryBaseAddress();
  const [isTabSnesVisible, setIsTabSnesVisible] =
    useEmulatorTabMemoryIsVisible();

  const memory = useMemo(
    () => range(memorySize).map((i) => emulator.readByte(baseAddress + i)),
    [baseAddress, emulator.readByte],
  );

  const label =
    emulator.selectedInstructionId === -1
      ? "Memory"
      : `Memory (instruction ${emulator.selectedInstructionId})`;

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label={label}
      onChange={setIsTabSnesVisible}
    >
      <div className="App_SectionCol">
        <SnesMemory
          baseAddress={baseAddress}
          initialRamAddress={emulator.initialRamAddress}
          initialRomAddress={emulator.initialRomAddress}
          memory={memory}
          stackAddress={emulator.stackPointer}
          onChangeAddress={setBaseAddress}
        />
      </div>
    </SectionCollapsible>
  );
}
