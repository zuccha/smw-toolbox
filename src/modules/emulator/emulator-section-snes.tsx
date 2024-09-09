import { useState } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import Setting from "../../components/setting";
import SnesMemory from "../../components/snes-memory";
import SnesProcessorStatus from "../../components/snes-processor-status";
import SnesRegister from "../../components/snes-register";
import SnesRegisterGroup from "../../components/snes-register-group";
import { IntegerUnit } from "../../models/integer";
import { range } from "../../utils";
import { useEmulatorTabSnesIsVisible } from "./store";

const memory = range(16 * 8);

export default function EmulatorSectionSnes() {
  const [isTabSnesVisible, setIsTabSnesVisible] = useEmulatorTabSnesIsVisible();

  const [a] = useState(0);
  const [x] = useState(0);
  const [y] = useState(0);

  const [pb] = useState(0);
  const [db] = useState(0);

  const [pc] = useState(0);
  const [dp] = useState(0);
  const [sp] = useState(0);

  const [ps] = useState(0b00110000);

  return (
    <SectionCollapsible
      isVisible={isTabSnesVisible}
      label="SNES State"
      onChange={setIsTabSnesVisible}
    >
      <div className="App_SectionCol">
        <div className="App_SectionRow align-items_flex-start">
          <Setting label="Registers">
            <div className="App_SectionCluster align-items_flex-start">
              <SnesRegisterGroup name="Registers">
                <SnesRegister
                  label="A"
                  shouldDimHighByte={Boolean(ps & 0b00100000)}
                  value={a}
                  tooltip="Accumulator"
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="X"
                  shouldDimHighByte={Boolean(ps & 0b00010000)}
                  value={x}
                  tooltip="X Index"
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="Y"
                  shouldDimHighByte={Boolean(ps & 0b00010000)}
                  value={y}
                  tooltip="Y Index"
                  unit={IntegerUnit.Word}
                />
              </SnesRegisterGroup>

              <SnesRegisterGroup name="Registers">
                <SnesRegister
                  label="PB"
                  tooltip="Program Bank"
                  value={pb}
                  unit={IntegerUnit.Byte}
                />
                <SnesRegister
                  label="DB"
                  tooltip="Data Bank"
                  value={db}
                  unit={IntegerUnit.Byte}
                />
              </SnesRegisterGroup>

              <SnesRegisterGroup name="Generic">
                <SnesRegister
                  label="PC"
                  tooltip="Program Counter"
                  value={pc}
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="DP"
                  tooltip="Direct Page"
                  value={dp}
                  unit={IntegerUnit.Word}
                />
                <SnesRegister
                  label="SP"
                  tooltip="Stack Pointer"
                  value={sp}
                  unit={IntegerUnit.Word}
                />
              </SnesRegisterGroup>
            </div>
          </Setting>

          <Setting label="Processor Status">
            <SnesProcessorStatus status={ps} />
          </Setting>
        </div>

        <Setting label="Memory">
          <SnesMemory address={0} values={memory} />
        </Setting>
      </div>
    </SectionCollapsible>
  );
}
