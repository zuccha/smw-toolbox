import { useMemo, useState } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import SnesMemory from "../../components/snes-memory";
import { range } from "../../utils";
import { emulator, useEmulatorTabSnesIsVisible } from "./store";
import useEmulator from "./use-emulator";

const memorySize = 8 * 16;

export default function EmulatorSectionMemory() {
  const { snapshot } = useEmulator();
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabSnesIsVisible();

  const [memoryAddress, setMemoryAddress] = useState(0x7e0000);

  const memory = useMemo(
    () => range(memorySize).map((i) => emulator.get_byte(memoryAddress + i)),
    [memoryAddress, snapshot],
  ); // Update when base address or snapshot changes.

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label="Memory"
      onChange={setIsTabSnesVisible}
    >
      <div className="App_SectionCol">
        <SnesMemory
          address={memoryAddress}
          memory={memory}
          onChangeAddress={setMemoryAddress}
        />
      </div>
    </SectionCollapsible>
  );
}
