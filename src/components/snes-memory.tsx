import { useCallback, useMemo } from "preact/hooks";
import { range, toHex } from "../utils";
import IntegerStringInput, {
  IntegerStringInputCaret,
  IntegerStringInputSpaceFrequency,
} from "./integer-string-input";
import "./snes-memory.css";
import { IntegerEncoding, IntegerLength, IntegerUnit } from "../models/integer";
import { useIntegerState } from "../hooks/use-integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
} from "../models/integer-string";

type SnesMemoryProps = {
  address: number;
  onChangeAddress: (address: number) => void;
  values: number[];
};

const valueLength = IntegerLength[IntegerUnit.Byte][IntegerEncoding.Hex];

export default function SnesMemory({
  address,
  onChangeAddress,
  values,
}: SnesMemoryProps) {
  const [addressInteger, addressIntegerMethods] = useIntegerState(
    { value: address, valueRaw: address },
    { unit: IntegerUnit.Long },
  );

  const formattedValues = useMemo(() => {
    return values.map((value) => toHex(value, valueLength));
  }, [values]);

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
