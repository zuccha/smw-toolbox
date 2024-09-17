import { useState } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import Setting from "../../components/setting";
import SnesMemory from "../../components/snes-memory";
import SnesProcessorStatus from "../../components/snes-processor-status";
import SnesRegister from "../../components/snes-register";
import SnesRegisterGroup from "../../components/snes-register-group";
import { Core } from "../../models/asm65816/core";
import { IntegerUnit } from "../../models/integer";
import { useEmulatorTabSnesIsVisible } from "./store";

type EmulatorSectionSnesProps = {
  snapshot: Core.Snapshot;
};

export default function EmulatorSectionSnes({
  snapshot,
}: EmulatorSectionSnesProps) {
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabSnesIsVisible();

  const [memoryAddress, setMemoryAddress] = useState(0);

  const isA8Bit = Boolean(snapshot.flag.m);
  const isX8Bit = Boolean(snapshot.flag.x);

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
                  value={snapshot.A}
                  tooltip="Accumulator"
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="X"
                  shouldDimHighByte={isX8Bit}
                  value={snapshot.X}
                  tooltip="X Index"
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="Y"
                  shouldDimHighByte={isX8Bit}
                  value={snapshot.Y}
                  tooltip="Y Index"
                  unit={IntegerUnit.Word}
                />
              </SnesRegisterGroup>

              <SnesRegisterGroup name="Registers">
                <SnesRegister
                  label="PB"
                  tooltip="Program Bank"
                  value={snapshot.PB}
                  unit={IntegerUnit.Byte}
                />
                <SnesRegister
                  label="DB"
                  tooltip="Data Bank"
                  value={snapshot.DB}
                  unit={IntegerUnit.Byte}
                />
              </SnesRegisterGroup>

              <SnesRegisterGroup name="Generic">
                <SnesRegister
                  label="PC"
                  tooltip="Program Counter"
                  value={snapshot.PC}
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="DP"
                  tooltip="Direct Page"
                  value={snapshot.DP}
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="SP"
                  tooltip="Stack Pointer"
                  value={snapshot.SP}
                  unit={IntegerUnit.Word}
                />
              </SnesRegisterGroup>
            </div>
          </Setting>

          <Setting label="Processor Status" size="md">
            <SnesProcessorStatus status={snapshot.flags} />
          </Setting>
        </div>

        <Setting label="Memory" size="md">
          <SnesMemory
            address={memoryAddress}
            memory={snapshot.ram}
            onChangeAddress={setMemoryAddress}
            size={8 * 16}
          />
        </Setting>
      </div>
    </SectionCollapsible>
  );
}
