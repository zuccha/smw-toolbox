import { PlayIcon } from "lucide-preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import CodeEditor from "../../components/code-editor";
import SectionStatic from "../../components/section-static";
import {
  Asm65168ProgramFromCode,
  Asm65816Program,
} from "../../models/asm65816-program";
import asm65816, { asm65816Linter } from "../../languages/asm65816";

const defaultCode = `\
NOP           ; Implied
ASL A         ; Accumulator
ADC #$00      ; Immediate Byte
ADC #$0000    ; Immediate Word
ADC $00       ; Direct Byte
ADC $00,x     ; Direct Byte X
LDX $00,y     ; Direct Byte X
ADC $00,s     ; Direct Byte S
ADC $0000     ; Direct Word
ADC $0000,x   ; Direct Word X
ADC $0000,y   ; Direct Word Y
ADC $000000   ; Direct Long
ADC $000000,x ; Direct Long X
ADC ($00)     ; Indirect Byte
ADC ($00,x)   ; Indirect Byte X
ADC ($00),y   ; Indirect Byte Y
ADC ($00,s),y ; Indirect Byte S Y
JMP ($0000)   ; Indirect Word
JMP ($0000,x) ; Indirect Word X
ADC [$00]     ; Indirect Long Byte
ADC [$00],y   ; Indirect Long Byte Y
JML [$0000]   ; Indirect Long Word
MVN $00,$00   ; Move`;

const extensions = [asm65816(), asm65816Linter];

type EmulatorSectionMainProps = {
  onRun: (program: Asm65816Program) => void;
};

export default function EmulatorSectionMain({
  onRun,
}: EmulatorSectionMainProps) {
  const [code, setCode] = useState(defaultCode);

  const run = useCallback(() => {
    const program = Asm65168ProgramFromCode(code.trimEnd());
    onRun(program);
  }, [code, onRun]);

  const actions = useMemo(
    () => [{ icon: PlayIcon, onClick: run, tooltip: "Run" }],
    [run],
  );

  return (
    <SectionStatic actions={actions} label="Emulator">
      <CodeEditor extensions={extensions} onChange={setCode} value={code} />
    </SectionStatic>
  );
}
