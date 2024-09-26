import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import { IntegerEncoding, IntegerUnit } from "../models/integer";
import { classNames, range, toHex } from "../utils";
import Button from "./button";
import InputValue from "./input-value";
import Setting from "./setting";
import Value from "./value";
import "./snes-memory.css";

type SnesMemoryProps = {
  baseAddress: number;
  columnCount?: number;
  initialRamAddress: number;
  initialRomAddress: number;
  stackAddress: number;
  memory: (number | undefined)[];
  onChangeAddress: (address: number) => void;
};

type Selection = { address: number; byte: number; index: number };

const long = 0xffffff;
const offset = 0xfffff0;

export default function SnesMemory({
  baseAddress,
  columnCount = 16,
  initialRamAddress,
  initialRomAddress,
  stackAddress,
  memory,
  onChangeAddress,
}: SnesMemoryProps) {
  const [selection, setSelection] = useState<Selection | undefined>();

  useLayoutEffect(() => setSelection(undefined), [memory]);

  const increaseBaseAddress = useCallback(() => {
    onChangeAddress((baseAddress + 0x000010) & long);
  }, [baseAddress]);

  const decreaseBaseAddress = useCallback(() => {
    onChangeAddress((baseAddress - 0x000010) & long);
  }, [baseAddress]);

  const setBaseAddressToRam = useCallback(() => {
    onChangeAddress(initialRamAddress);
  }, [baseAddress, initialRamAddress]);

  const setBaseAddressToRom = useCallback(() => {
    onChangeAddress(initialRomAddress);
  }, [baseAddress, initialRomAddress]);

  const setBaseAddressToStack = useCallback(() => {
    onChangeAddress(stackAddress & offset);
  }, [baseAddress, stackAddress]);

  const baseAddressOffset = baseAddress & offset;
  const isRamSelected = baseAddressOffset === (initialRamAddress & offset);
  const isRomSelected = baseAddressOffset === (initialRomAddress & offset);
  const isStackSelected = baseAddressOffset === (stackAddress & offset);

  return (
    <div className="SnesMemory">
      <div className="SnesMemory_Table">
        <div className="SnesMemory_Table_Group">
          <div className="SnesMemory_Table_Corner">{"\u00a0".repeat(6)}</div>

          <div className="SnesMemory_Table_RowIndex">
            {range(memory.length / columnCount).map((index) => (
              <div>{toHex((baseAddress + columnCount * index) & long, 6)}</div>
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
              const address = (baseAddress + index) & 0xffffff;
              const className = classNames([
                ["selected", isSelected],
                ["stack", address === stackAddress],
              ]);
              return (
                <div
                  className={className}
                  onClick={() =>
                    isSelected
                      ? setSelection(undefined)
                      : setSelection({ address, byte: byte ?? 0, index })
                  }
                >
                  {byte === undefined ? (
                    <Value
                      dim
                      encoding={IntegerEncoding.Hex}
                      unit={IntegerUnit.Byte}
                      value={0}
                    />
                  ) : (
                    <Value
                      encoding={IntegerEncoding.Hex}
                      unit={IntegerUnit.Byte}
                      value={byte}
                    />
                  )}
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

            <Button
              isSelected={isRamSelected}
              label="RAM"
              onClick={setBaseAddressToRam}
            />

            <Button
              isSelected={isRomSelected}
              label="ROM"
              onClick={setBaseAddressToRom}
            />

            <Button
              isSelected={isStackSelected}
              label="Stack"
              onClick={setBaseAddressToStack}
            />
          </div>
        </Setting>
      </div>
    </div>
  );
}
