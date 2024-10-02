import Tutorial, { TutorialAction } from "../../components/tutorial";
import { useEmulatorTabTutorialIsVisible } from "./store";

const memory: TutorialAction[] = [
  {
    name: "808000-FFFFFF",
    description: "ROM",
    keybindings: [],
  },
  {
    name: "008000-7DFFFF",
    description: "Mirror of 808000-FDFFFF",
    keybindings: [],
  },
  {
    name: "7E0000-7E1FFF 7E2000-7FFFFF",
    description: "WRAM",
    keybindings: [],
  },
  {
    name: "000000-3F1FFF 7F0000-7F1FFF 800000-BF1FFF",
    description: "Mirror of 7E0000-7E1FFF",
    keybindings: [],
  },
];

const processor: TutorialAction[] = [
  {
    name: "PC",
    description:
      "Program Counter. A combination of the Program Bank and the 16-bit Program Counter. This is the program counter before the instruction executes.",
    keybindings: [],
  },
  {
    name: "A",
    description: "Accumulator. When in 8-bit mode, the high byte is dimmed.",
    keybindings: [],
  },
  {
    name: "X",
    description: "X index. When in 8-bit mode, the high byte is dimmed.",
    keybindings: [],
  },
  {
    name: "Y",
    description: "Y index. When in 8-bit mode, the high byte is dimmed.",
    keybindings: [],
  },
  {
    name: "SP",
    description:
      "Stack Pointer. In memory, the stack pointer is marked with a colored outline.",
    keybindings: [],
  },
  {
    name: "DP",
    description: "Direct Page.",
    keybindings: [],
  },
  {
    name: "DB",
    description: "Data Bank.",
    keybindings: [],
  },
  {
    name: "Flags",
    description:
      "Processor status, NVMXDIZC in native mode and NV-BDIZC in emulation mode. Uppercase letters indicate set values, lowercase letters indicate cleared values.",
    keybindings: [],
  },
];

const modifiers: TutorialAction[] = [
  {
    name: "m",
    description: "1 if the M flag is set, 0 if cleared.",
    keybindings: [],
  },
  {
    name: "x",
    description: "1 if the X flag is set, 0 if cleared.",
    keybindings: [],
  },
  {
    name: "e",
    description: "1 if the E flag is set, 0 if cleared.",
    keybindings: [],
  },
  {
    name: "d",
    description:
      "1 if the low byte of the direct page register is not zero, 0 otherwise.",
    keybindings: [],
  },
  {
    name: "p",
    description:
      "1 if the X flag is set or if the index crosses the page boundary while computing the effective address during the instruction, 0 otherwise.",
    keybindings: [],
  },
  {
    name: "b",
    description: "1 if branch has been taken, 0 otherwise.",
    keybindings: [],
  },
  {
    name: "t",
    description: "Amount of bytes transferred during a MVN or MVP.",
    keybindings: [],
  },
  {
    name: "r",
    description: "A variable amount due to processor restart.",
    keybindings: [],
  },
];

export default function EmulatorSectionTutorial() {
  const [isTabTutorialVisible, setIsTabTutorialVisible] =
    useEmulatorTabTutorialIsVisible();

  return (
    <Tutorial
      isVisible={isTabTutorialVisible}
      onChangeVisibility={setIsTabTutorialVisible}
    >
      <Tutorial.Section title="General">
        <div>
          This is a basic code editor, assembler, and emulator for the 65816.
          You can write ASM code and execute it, the result will be displayed in
          the <i>Log</i> and <i>Memory</i> sections. The emulator is a rough
          imitation of an actual SNES, simulating its processor and (partially)
          its memory.
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="The Processor">
        <div>
          Running the emulator will execute the code present in the editor and
          display the state of the processor (i.e., its registers) in the{" "}
          <i>Log</i> section for each instruction, as well as the instruction's
          cycles and length (in bytes), represented by the C and L columns
          respectively.
        </div>
        <div>
          The last row features the final state of the processor, where C
          represents the total amount of cycles taken by the program and L the
          total amount of bytes (note that L is not necessarily the sum of all
          instructions' lengths, as some may have been executed several times).
        </div>
        <div>The processor is made of the following registers:</div>
        <Tutorial.Actions actions={processor} />
        <div>
          Colored values are values that changed compared to the previous
          instruction. You can hover an instruction to display its bytes and the
          effective address used by the instruction (in brackets), if
          applicable. Hovering a register shows its values in binary, decimal,
          and hexadecimal.
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="Memory">
        <div>
          The <i>Memory</i> section represents both RAM and ROM. When executing
          a program, the code's bytes will be written in ROM. By default, this
          section will show the state of memory at the end of execution, but you
          can click on an instruction in the <i>Log</i> section to show the
          state of memory at that moment (click again the selected instruction
          to show the final state).
        </div>
        <div>
          Memory follows a pattern similar to LoROM. Supported memory areas are:
        </div>
        <Tutorial.Actions actions={memory} />
        <div>
          You can write to RAM during code execution, but not to ROM (it will
          result in an error). You can execute code from any location (e.g., you
          can <code>JML</code> to RAM).
        </div>
        <div>
          Code execution always starts from address <code>808000</code> (alias{" "}
          <code>008000</code>).
        </div>
        <div>
          Dimmed values are values that have not been set by the user (both in
          RAM and ROM).
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="The Language">
        <div>
          All operations are supported and assemble correctly; however the
          following operations are not implemented during emulation:{" "}
          <code>BRK</code>, <code>COP</code>, <code>RTI</code>, <code>STP</code>
          , and <code>WAI</code>. In particular, anything that involves
          interrupts doesn't work. Opcodes can be written uppercase or
          lowercase, but not mixed.
        </div>
        <div>
          Numbers can be specified in decimal form, binary (prefixed by a{" "}
          <code>%</code>), or hexadecimal (prefixed by a <code>$</code>). For
          example, the value 10 (decimal) can be written as <code>10</code>,{" "}
          <code>%00001010</code>, or <code>$0A</code>. Binaries can only be
          expressed with 8, 16, or 24 digits, and hexadecimals with 2, 4, or 6
          digits (e.g., <code>$1</code> is not valid). Based on their length in
          digits, values will always be assembled to the corresponding 8, 16, or
          24 bit value. Decimals with 1-3 digits assemble to an 8-bit value, 4-5
          to 16-bit, and 6-8 to 24-bit.
        </div>
        <div>
          Labels are defined by specifying an alphanumeric sequence prefixed by
          a period and ending with a column (e.g., <code>.my_label:</code>). To
          use a label you omit the column (e.g., <code>BEQ .my_label</code>).
          Labels can be used in branching operations, <code>JMP</code>,{" "}
          <code>JML</code>, <code>JSR</code>, <code>JSL</code>, <code>PER</code>
          , and anywhere you could put an absolute address (e.g.,{" "}
          <code>LDA .my_label,x</code>).
        </div>
        <div>
          You can define data tables with <code>db</code> for 8-bit numbers,{" "}
          <code>dw</code> for 16-bit numbers, and <code>dl</code> for 24-bit
          numbers. Every table instruction must be followed by one or more
          comma-separated values of corresponding size. Labels are not allowed
          in data tables. Examples:
          <div>
            <code>
              &nbsp;&nbsp;db $01, $02, $04, $08
              <br />
              &nbsp;&nbsp;dw $1234, %0110000001001111
              <br />
              &nbsp;&nbsp;dl %011000000100111100000000, 124711, $7E1233
            </code>
          </div>
        </div>
        <div>
          Every instruction, data table, or label definition must either start
          on a new line or be separated by a column (e.g.,{" "}
          <code>CLC : ADC #$10).</code>
        </div>
        <div>
          Line comments start with a semi-column (e.g.,{" "}
          <code>; This is a comment</code>).
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="Initial State and Other Options">
        <div>
          For ease of use, you can specify the processor's initial state via the
          corresponding section. The initial state will take effect when running
          the emulator (it does not live update). You can specify a 16-bit value
          for A even if the M flag is set (i.e., A is 8-bit). If you specify a
          high byte for X or Y when the X flag is set, the high byte will
          automatically be set to 0 at runtime. Press on a flag to toggle its
          status (uppercase is set, lowercase is clear).
        </div>
        <div>
          It's not possible to set memory's initial state (everything but ROM
          will be initialized to 0).
        </div>
        <div>The emulator will always start in native mode (E flag clear).</div>
        <div>
          The emulator will automatically stop when it tries to read an opcode
          from an address that has not been initialized, or if it exceeds the
          specified number of maximum instructions.
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="Searching Opcodes">
        <div>
          You can search for instructions in the <i>Search Opcodes</i> section,
          by typing the instruction's mnemonic in the input field. The result
          will show all related instructions, with their hex opcode, argument
          mode, example usage, flags affected, cycles used, and bytes required.
        </div>
        <div>
          Cycles and bytes might be affected by the following modifiers:
        </div>
        <Tutorial.Actions actions={modifiers} />
      </Tutorial.Section>
    </Tutorial>
  );
}
