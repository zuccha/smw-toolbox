import { PlayIcon, XIcon } from "lucide-preact";
import { useCallback, useMemo } from "preact/hooks";
import CodeEditor from "../../components/code-editor";
import InputNumber from "../../components/input-number";
import SectionStatic from "../../components/section-static";
import Setting from "../../components/setting";
import asm65816 from "../../extra/asm65816/assembler/language/asm65816";
import asm65816Linter from "../../extra/asm65816/assembler/language/asm65816-linter";
import useCopyWithIcon from "../../hooks/use-copy-with-icon";
import { useEmulatorCode, useEmulatorMaxInstructions } from "./store";
import useEmulator from "./use-emulator";

const extensions = [asm65816(), asm65816Linter];

export default function EmulatorSectionEditor() {
  const [CopyIcon, copy] = useCopyWithIcon();

  const emulator = useEmulator();

  const [code, setCode] = useEmulatorCode();
  const clearCode = useCallback(() => setCode(""), [setCode]);
  const copyCode = useCallback(() => copy(code), [code, copy]);

  const [maxInstructions, setMaxInstructions] = useEmulatorMaxInstructions();

  const actions = useMemo(
    () => [
      { icon: PlayIcon, onClick: emulator.run, tooltip: "Run (Ctrl+E)" },
      { icon: XIcon, onClick: clearCode, tooltip: "Clear editor" },
      { icon: CopyIcon, onClick: copyCode, tooltip: "Copy code" },
    ],
    [CopyIcon, clearCode, copyCode, emulator.run],
  );

  return (
    <SectionStatic actions={actions} label="Editor">
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
