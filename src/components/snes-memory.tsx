import { useMemo } from "preact/hooks";
import { range, toHex } from "../utils";
import "./snes-memory.css";

type SnesMemoryProps = {
  address: number;
  values: number[];
};

export default function SnesMemory({ address, values }: SnesMemoryProps) {
  const formattedValues = useMemo(() => {
    return values.map((value) => toHex(value, 2));
  }, [values]);

  return (
    <div className="SnesMemory">
      <div className="SnesMemory_Group">
        <div className="SnesMemory_Corner">&nbsp;</div>

        <div className="SnesMemory_RowIndex">
          {range(values.length / 16).map((index) => (
            <div>{toHex(address + 16 * index, 6)}</div>
          ))}
        </div>
      </div>

      <div className="SnesMemory_Group flex_1">
        <div className="SnesMemory_ColIndex">
          {range(16).map((index) => (
            <div>{toHex(index, 1)}</div>
          ))}
        </div>
        <div className="SnesMemory_Grid">
          {formattedValues.map((value) => (
            <div>{value}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
