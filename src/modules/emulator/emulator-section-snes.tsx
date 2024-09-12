import { useState } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import Setting from "../../components/setting";
import SnesMemory from "../../components/snes-memory";
import SnesProcessorStatus from "../../components/snes-processor-status";
import SnesRegister from "../../components/snes-register";
import SnesRegisterGroup from "../../components/snes-register-group";
import {
  Asm65816Emulator,
  Asm65816EmulatorFlag,
} from "../../models/asm65816-emulator";
import { IntegerUnit } from "../../models/integer";
import { useEmulatorTabSnesIsVisible } from "./store";

type EmulatorSectionSnesProps = {
  emulator: Asm65816Emulator;
};

export default function EmulatorSectionSnes({
  emulator,
}: EmulatorSectionSnesProps) {
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabSnesIsVisible();

  const [memoryAddress, setMemoryAddress] = useState(0);

  const isA8Bit = Boolean(emulator.state.flags & Asm65816EmulatorFlag.M);
  const isX8Bit = Boolean(emulator.state.flags & Asm65816EmulatorFlag.X);

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label="SNES State"
      onChange={setIsTabSnesVisible}
    >
      <div className="App_SectionCol">
        <div className="App_SectionRow align-items_flex-start">
          <Setting label="Registers" size="md">
            <div className="App_SectionCluster align-items_flex-start">
              <SnesRegisterGroup name="Registers">
                <SnesRegister
                  label="A"
                  shouldDimHighByte={isA8Bit}
                  value={emulator.state.a}
                  tooltip="Accumulator"
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="X"
                  shouldDimHighByte={isX8Bit}
                  value={emulator.state.x}
                  tooltip="X Index"
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="Y"
                  shouldDimHighByte={isX8Bit}
                  value={emulator.state.y}
                  tooltip="Y Index"
                  unit={IntegerUnit.Word}
                />
              </SnesRegisterGroup>

              <SnesRegisterGroup name="Registers">
                <SnesRegister
                  label="PB"
                  tooltip="Program Bank"
                  value={emulator.state.pb}
                  unit={IntegerUnit.Byte}
                />
                <SnesRegister
                  label="DB"
                  tooltip="Data Bank"
                  value={emulator.state.db}
                  unit={IntegerUnit.Byte}
                />
              </SnesRegisterGroup>

              <SnesRegisterGroup name="Generic">
                <SnesRegister
                  label="PC"
                  tooltip="Program Counter"
                  value={emulator.state.pc}
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="DP"
                  tooltip="Direct Page"
                  value={emulator.state.dp}
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="SP"
                  tooltip="Stack Pointer"
                  value={emulator.state.sp}
                  unit={IntegerUnit.Word}
                />
              </SnesRegisterGroup>
            </div>
          </Setting>

          <Setting label="Processor Status" size="md">
            <SnesProcessorStatus status={emulator.state.flags} />
          </Setting>
        </div>

        <Setting label="Memory" size="md">
          <SnesMemory
            address={memoryAddress}
            memory={emulator.state.memory}
            onChangeAddress={setMemoryAddress}
            size={8 * 16}
          />
        </Setting>
      </div>
    </SectionCollapsible>
  );
}
