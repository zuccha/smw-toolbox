import { useCallback } from "preact/hooks";
import { IntegerEncoding, IntegerUnit } from "../models/integer";
import { useIntegerState } from "../hooks/use-integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
} from "../models/integer-string";
import { range, toHex } from "../utils";
import IntegerStringInput, {
  IntegerStringInputCaret,
  IntegerStringInputSpaceFrequency,
} from "./integer-string-input";
import "./snes-memory.css";

type SnesMemoryProps = {
  address: number;
  columnCount?: number;
  memory: number[];
  onChangeAddress: (address: number) => void;
};

export default function SnesMemory({
  address,
  columnCount = 16,
  memory,
  onChangeAddress,
}: SnesMemoryProps) {
  const [addressInteger, addressIntegerMethods] = useIntegerState(
    { value: address, valueRaw: address },
    { unit: IntegerUnit.Long },
  );

  const changeAddress = useCallback(
    (nextAddress: number) => {
      const nextAddressInteger = addressIntegerMethods.setValue(nextAddress);
      onChangeAddress(nextAddressInteger.value);
      return nextAddressInteger;
    },
    [addressIntegerMethods.setValue, onChangeAddress],
  );

  return (
    <div className="SnesMemory">
      <div className="SnesMemory_Group">
        <div className="SnesMemory_Corner">
          <IntegerStringInput
            caret={IntegerStringInputCaret.Underline}
            encoding={IntegerEncoding.Hex}
            integer={addressInteger}
            shouldMoveAfterTyping
            onChangeValue={changeAddress}
            spaceFrequency={IntegerStringInputSpaceFrequency.None}
            typingDirection={IntegerStringTypingDirection.Right}
            typingMode={IntegerStringTypingMode.Insert}
            unit={IntegerUnit.Long}
          />
        </div>

        <div className="SnesMemory_RowIndex">
          {range(memory.length / columnCount).map((index) => (
            <div>{toHex(address + columnCount * index, 6)}</div>
          ))}
        </div>
      </div>

      <div className="SnesMemory_Group flex_1">
        <div className="SnesMemory_ColIndex">
          {range(columnCount).map((index) => (
            <div>{toHex(index, 1)}</div>
          ))}
        </div>
        <div className="SnesMemory_Grid">
          {memory.map((byte) => (
            <div>{toHex(byte, 2)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
