import { useMemo } from "preact/hooks";
import SectionCollapsible from "../../components/section-collapsible";
import InputText from "../../components/input-text";
import Table, { TableColumn } from "../../components/table";
import {
  InstructionImpl,
  opcode_to_instruction,
} from "../../extra/asm65816/emulator/opcode-to-instruction";
import { toHex } from "../../utils";
import { useEmulatorOpcode, useEmulatorTabOpcodeIsVisible } from "./store";
import { l } from "../../extra/asm65816/emulator/value";
import {
  minus_2m,
  minus_e,
  minus_m,
  minus_x,
  plus_1_if_branch_taken,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
  plus_7_for_each_transfer,
  plus_x_to_restart_processor,
} from "../../extra/asm65816/emulator/constants";

const flags = ["n", "v", "m", "x", "d", "i", "z", "c"];

const columns: TableColumn<InstructionImpl>[] = [
  { header: "Hex", value: (impl) => toHex(impl.opcode, 2) },
  { header: "Mode", value: (impl) => impl.mode.text || "<implied>" },
  {
    header: "Example",
    value: (impl) =>
      `${impl.mnemonic} ${impl.mode.format({
        arg: l(0),
        arg_size: impl.mode.base_length - 1,
      })}`,
  },
  {
    header: "Flags",
    value: (impl) =>
      flags
        .map((flag, i) => (impl.affected_flags & (1 << (7 - i)) ? flag : "-"))
        .join(""),
  },
  {
    header: "Cycles",
    value: (impl) => {
      let cycles = `${impl.base_cycles}`;
      if (impl.cycles_modifier & minus_m) cycles += "-m";
      if (impl.cycles_modifier & minus_2m) cycles += "-2*m";
      if (impl.cycles_modifier & minus_x) cycles += "-x";
      if (impl.cycles_modifier & minus_e) cycles += "-e";
      if (impl.cycles_modifier & plus_1_if_dp_low_is_zero) cycles += "+d";
      if (impl.cycles_modifier & plus_1_if_index_x_crosses_page) cycles += "+p";
      if (impl.cycles_modifier & plus_1_if_index_y_crosses_page) cycles += "+p";
      if (impl.cycles_modifier & plus_1_if_branch_taken) cycles += "+b";
      if (impl.cycles_modifier & plus_7_for_each_transfer) cycles += "+7*t";
      if (impl.cycles_modifier & plus_x_to_restart_processor) cycles += "+r";
      return cycles;
    },
    align: "right",
  },
  {
    header: "Length",
    value: (impl) => {
      let length = `${impl.mode.base_length}`;
      if (impl.mode.length_modifier & minus_m) length += "-m";
      if (impl.mode.length_modifier & minus_x) length += "-x";
      return length;
    },
    align: "right",
  },
];

export default function EmulatorSectionLog() {
  const [isTabOpcodeVisible, setIsTabOpcodeVisible] =
    useEmulatorTabOpcodeIsVisible();

  const [opcode, setOpcode] = useEmulatorOpcode();

  const impls = useMemo(() => {
    return Object.values(opcode_to_instruction)
      .filter((impl) => impl.mnemonic === opcode.toUpperCase())
      .sort((i1, i2) => {
        if (i1.opcode < i2.opcode) return -1;
        if (i1.opcode > i2.opcode) return 1;
        return 0;
      });
  }, [opcode]);

  return (
    <SectionCollapsible
      isVisible={isTabOpcodeVisible}
      label="Search Opcode"
      onChange={setIsTabOpcodeVisible}
    >
      <div className="App_SectionCol">
        <InputText
          onChange={setOpcode}
          placeholder="ADC"
          size={3}
          value={opcode}
        />

        {impls.length > 0 && <Table columns={columns} items={impls} />}
      </div>
    </SectionCollapsible>
  );
}
