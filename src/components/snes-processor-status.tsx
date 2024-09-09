import { useMemo } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerToString,
  IntegerUnit,
} from "../models/integer";
import Tooltip from "./tooltip";
import "./snes-processor-status.css";

type SnesProcessorStatusProps = {
  status: number;
};

const flags = [
  { label: "N", tooltip: "Negative" },
  { label: "V", tooltip: "Overflow" },
  { label: "M", tooltip: "Accumulator Register Size\n0 = 16-bit, 1 = 8-bit" },
  { label: "X", tooltip: "Index Register Size\n0 = 16-bit, 1 = 8-bit" },
  { label: "D", tooltip: "Decimal" },
  { label: "I", tooltip: "IRQ Disable" },
  { label: "Z", tooltip: "Zero" },
  { label: "C", tooltip: "Carry" },
];

export default function SnesProcessorStatus({
  status,
}: SnesProcessorStatusProps) {
  const valueString = useMemo(
    () =>
      IntegerToString(
        { value: status, valueRaw: status },
        IntegerEncoding.Bin,
        false,
        false,
        { unit: IntegerUnit.Byte },
      ),
    [status],
  );

  return (
    <div className="SnesProcessorStatus">
      <div className="SnesProcessorStatus_Legend">
        {flags.map((flag) => (
          <Tooltip tooltip={flag.tooltip}>{flag.label}</Tooltip>
        ))}
      </div>
      <div className="SnesProcessorStatus_Values">
        {valueString.split("").map((digit) => (
          <span>{digit}</span>
        ))}
      </div>
    </div>
  );
}
