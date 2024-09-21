import { PlayIcon } from "lucide-preact";
import { useMemo } from "preact/hooks";
import CodeEditor from "../../components/code-editor";
import InputNumber from "../../components/input-number";
import SectionStatic from "../../components/section-static";
import Setting from "../../components/setting";
import asm65816 from "../../extra/asm65816/assembler/language/asm65816";
import asm65816Linter from "../../extra/asm65816/assembler/language/asm65816-linter";
import { useEmulatorCode, useEmulatorMaxInstructions } from "./store";
import useEmulator from "./use-emulator";

const extensions = [asm65816(), asm65816Linter];

export default function EmulatorSectionMain() {
  const emulator = useEmulator();
  const [code, setCode] = useEmulatorCode();
  const [maxInstructions, setMaxInstructions] = useEmulatorMaxInstructions();

  const actions = useMemo(
    () => [{ icon: PlayIcon, onClick: emulator.run, tooltip: "Run (Ctrl+E)" }],
    [emulator.run],
  );

  return (
    <SectionStatic actions={actions} label="Emulator">
      <div className="App_SectionCol">
        <CodeEditor extensions={extensions} onChange={setCode} value={code} />

        <Setting inline label="Max Instructions" size="md">
          <InputNumber
            isInteger
            max={1000}
            min={1}
            onChange={setMaxInstructions}
            placeholder="100"
            value={maxInstructions}
          />
        </Setting>
      </div>
    </SectionStatic>
  );
}
