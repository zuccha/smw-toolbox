import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import { IntegerEncoding, IntegerUnit } from "../models/integer";
import { range, toBin, toDec, toHex } from "../utils";
import InputValue from "./input-value";
import Setting from "./setting";
import "./snes-memory.css";
import Button from "./button";

type SnesMemoryProps = {
  baseAddress: number;
  columnCount?: number;
  initialRamAddress: number;
  initialRomAddress: number;
  memory: (number | undefined)[];
  onChangeAddress: (address: number) => void;
};

type Selection = { address: number; byte: number; index: number };

const zeroWidthSpace = "\u200b";

export default function SnesMemory({
  baseAddress,
  columnCount = 16,
  initialRamAddress,
  initialRomAddress,
  memory,
  onChangeAddress,
}: SnesMemoryProps) {
  const [selection, setSelection] = useState<Selection | undefined>();
  const safeBaseAddress = isNaN(baseAddress) ? 0 : baseAddress;

  useLayoutEffect(() => setSelection(undefined), [memory]);

  const increaseBaseAddress = useCallback(() => {
    onChangeAddress((baseAddress + 0x000010) & 0xffffff);
  }, [baseAddress]);

  const decreaseBaseAddress = useCallback(() => {
    onChangeAddress((baseAddress - 0x000010) & 0xffffff);
  }, [baseAddress]);

  const setBaseAddressToRam = useCallback(() => {
    onChangeAddress(initialRamAddress);
  }, [baseAddress, initialRamAddress]);

  const setBaseAddressToRom = useCallback(() => {
    onChangeAddress(initialRomAddress);
  }, [baseAddress, initialRomAddress]);

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
                      : setSelection({ address, byte: byte ?? 0, index })
                  }
                >
                  {byte === undefined ? <dim>00</dim> : toHex(byte, 2)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="SnesMemory_Footer">
        <Setting inline label="Base address" size="md">
          <div className="App_SectionCluster">
            <Button label="-10" onClick={decreaseBaseAddress} />

            <InputValue
              encoding={IntegerEncoding.Hex}
              onChange={onChangeAddress}
              placeholder="7E0000"
              unit={IntegerUnit.Long}
              value={baseAddress}
            />

            <Button label="+10" onClick={increaseBaseAddress} />

            <div className="divider"></div>

            <Button label="RAM" onClick={setBaseAddressToRam} />

            <Button label="ROM" onClick={setBaseAddressToRom} />
          </div>
        </Setting>

        {selection && (
          <Setting inline align="bottom" label="Selected" size="md">
            <div className="SnesMemory_Footer_Selection">
              <div>{toHex(selection.address, 6)}</div>
              {"→"}
              <div>
                <dim>{`0b${zeroWidthSpace}`}</dim>
                {toBin(selection.byte, 8)}
              </div>
              {"/"}
              <div>{toDec(selection.byte)}</div>
              {"/"}
              <div>
                <dim>{`0x${zeroWidthSpace}`}</dim>
                {toHex(selection.byte, 2)}
              </div>
            </div>
          </Setting>
        )}
      </div>
    </div>
  );
}
