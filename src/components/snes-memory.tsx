import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerLength,
  IntegerRadix,
  IntegerUnit,
} from "../models/integer";
import { range, toBin, toDec, toHex } from "../utils";
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

type Selection = { address: number; byte: number; index: number };

export default function SnesMemory({
  baseAddress,
  columnCount = 16,
  memory,
  onChangeAddress,
}: SnesMemoryProps) {
  const [selection, setSelection] = useState<Selection | undefined>();
  const safeBaseAddress = isNaN(baseAddress) ? 0 : baseAddress;

  const changeAddressString = useCallback(
    (nextValueString: string) => {
      const radix = IntegerRadix[IntegerEncoding.Hex];
      const nextAddress = Number.parseInt(nextValueString, radix);
      onChangeAddress(nextAddress);
    },
    [onChangeAddress],
  );

  useLayoutEffect(() => setSelection(undefined), [memory]);

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
            {memory.map((byte, index) => {
              const isSelected = selection?.index === index;
              const address = (safeBaseAddress + index) & 0xffffff;
              return (
                <div
                  className={isSelected ? "selected" : undefined}
                  onClick={() =>
                    isSelected
                      ? setSelection(undefined)
                      : setSelection({ address, byte, index })
                  }
                >
                  {toHex(byte, 2)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="SnesMemory_Footer">
        <div className="SnesMemory_Footer_Group">
          <div className="SnesMemory_Footer_Label">Base address:</div>
          <InputText
            format={formatInputValue}
            onChange={changeAddressString}
            pattern={longHexPattern}
            placeholder="7E0000"
            prefix="0x"
            size={IntegerLength[IntegerUnit.Long][IntegerEncoding.Hex]}
            value={formatAddress(baseAddress)}
          />
        </div>
        {selection && (
          <div className="SnesMemory_Footer_Group align-items_flex-end">
            <div className="SnesMemory_Footer_Label">Selected:</div>
            <div className="SnesMemory_Footer_Selection">
              <div>{toHex(selection.address, 6)}</div>→
              <div>
                <span className="dim">0b&#8203;</span>
                {toBin(selection.byte, 8)}
              </div>
              /<div>{toDec(selection.byte)}</div>/
              <div>
                <span className="dim">0x&#8203;</span>
                {toHex(selection.byte, 2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
