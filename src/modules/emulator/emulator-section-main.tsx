import { PlayIcon } from "lucide-preact";
import { useMemo, useState } from "preact/hooks";
import AsarEditor from "../../components/asar-editor";
import SectionStatic from "../../components/section-static";

export default function EmulatorSectionMain() {
  const [code, setCode] = useState("");

  const actions = useMemo(
    () => [{ icon: PlayIcon, onClick: () => {}, tooltip: "Run" }],
    [],
  );

  return (
    <SectionStatic actions={actions} label="Emulator">
      <AsarEditor onChange={setCode} value={code} />
    </SectionStatic>
  );
}
