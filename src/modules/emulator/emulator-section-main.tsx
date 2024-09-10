import { PlayIcon } from "lucide-preact";
import { useMemo, useState } from "preact/hooks";
import AsmEditor from "../../components/asm-editor";
import SectionStatic from "../../components/section-static";

const defaultCode = `\
ADC #$00      ; Immediate (A 8-bit)
ADC #$0000    ; Immediate (A 16-bit)
ADC $00       ; DP
ADC $00,x     ; DP Indexed,X
ADC $0000     ; Absolute
ADC $0000,x   ; Absolute Indexed,X
ADC $0000,y   ; Absolute Indexed,Y
ADC $000000   ; Long
ADC $000000,x ; Long Indexed,X
ADC $00,s     ; Stack Relative
ADC ($00)     ; DP Indirect
ADC ($00,x)   ; DP Indexed,X Indirect
ADC ($00),y   ; DP Indirect Indexed,Y
ADC [$00]     ; DP Indirect Long
ADC [$00],y   ; DP Indirect Long Indexed,Y
ADC ($00,s),y ; Stack Relative Indirect Indexed,Y
ASL A         ; Accumulator
BRK           ; Implied
MVN $00,$00   ; Block Move`;

export default function EmulatorSectionMain() {
  const [code, setCode] = useState(defaultCode);

  const actions = useMemo(
    () => [{ icon: PlayIcon, onClick: () => {}, tooltip: "Run" }],
    [],
  );

  return (
    <SectionStatic actions={actions} label="Emulator">
      <AsmEditor onChange={setCode} value={code} />
    </SectionStatic>
  );
}
