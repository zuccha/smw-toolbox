import { useCallback } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerLength,
  IntegerRadix,
  IntegerUnit,
} from "../models/integer";
import { range, toHex } from "../utils";
import InputText from "./input-text";
import "./snes-memory.css";

type SnesMemoryProps = {
  baseAddress: number;
  columnCount?: number;
  memory: number[];
  onChangeAddress: (address: number) => void;
};

const longHexPattern = /^[0-9a-fA-F]{0,6}$/;

const formatAddress = (baseAddress: number): string =>
  isNaN(baseAddress)
    ? ""
    : baseAddress.toString(IntegerRadix[IntegerEncoding.Hex]).toUpperCase();

const formatInputValue = (value: string): string => value.toUpperCase();

export default function SnesMemory({
  baseAddress,
  columnCount = 16,
  memory,
  onChangeAddress,
}: SnesMemoryProps) {
  const safeBaseAddress = isNaN(baseAddress) ? 0 : baseAddress;

  const changeAddressString = useCallback(
    (nextValueString: string) => {
      const radix = IntegerRadix[IntegerEncoding.Hex];
      const nextAddress = Number.parseInt(nextValueString, radix);
      onChangeAddress(nextAddress);
    },
    [onChangeAddress],
  );

  return (
    <div className="SnesMemory">
      <div className="SnesMemory_Table">
        <div className="SnesMemory_Table_Group">
          <div className="SnesMemory_Table_Corner">{"\u00a0".repeat(6)}</div>

          <div className="SnesMemory_Table_RowIndex">
            {range(memory.length / columnCount).map((index) => (
              <div>
                {toHex((safeBaseAddress + columnCount * index) & 0xffffff, 6)}
              </div>
            ))}
          </div>
        </div>

        <div className="SnesMemory_Table_Group flex_1">
          <div className="SnesMemory_Table_ColIndex">
            {range(columnCount).map((index) => (
              <div>{toHex(index, 1)}</div>
            ))}
          </div>
          <div className="SnesMemory_Table_Grid">
            {memory.map((byte) => (
              <div>{toHex(byte, 2)}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="SnesMemory_BaseAddress">
        <span>Base address:</span>
        <InputText
          format={formatInputValue}
          onChange={changeAddressString}
          pattern={longHexPattern}
          placeholder="7E0000"
          prefix="$"
          size={IntegerLength[IntegerUnit.Long][IntegerEncoding.Hex]}
          value={formatAddress(baseAddress)}
        />
      </div>
    </div>
  );
}
