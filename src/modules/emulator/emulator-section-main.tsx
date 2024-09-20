import { PlayIcon } from "lucide-preact";
import { useMemo } from "preact/hooks";
import CodeEditor from "../../components/code-editor";
import SectionStatic from "../../components/section-static";
import asm65816 from "../../extra/asm65816/assembler/language/asm65816";
import asm65816Linter from "../../extra/asm65816/assembler/language/asm65816-linter";
import useEmulator from "./use-emulator";
import { useEmulatorCode } from "./store";

const extensions = [asm65816(), asm65816Linter];

export default function EmulatorSectionMain() {
  const { run } = useEmulator();
  const [code, setCode] = useEmulatorCode();

  const actions = useMemo(
    () => [{ icon: PlayIcon, onClick: run, tooltip: "Run (Ctrl+E)" }],
    [run],
  );

  return (
    <SectionStatic actions={actions} label="Emulator">
      <CodeEditor extensions={extensions} onChange={setCode} value={code} />
    </SectionStatic>
  );
}
