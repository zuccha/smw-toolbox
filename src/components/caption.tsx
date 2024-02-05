import { useMemo } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerLength,
  IntegerUnit,
  digitToHex,
} from "../models/integer";
import { classNames, range } from "../utils";
import "./caption.css";
import { IntegerStringInputSpaceFrequency } from "./integer-string-input";

export type CaptionProps = {
  encoding: IntegerEncoding | undefined;
  isSigned: boolean;
  spaceFrequency: IntegerStringInputSpaceFrequency;
  unit: IntegerUnit;
};

export default function Caption({
  encoding,
  isSigned,
  spaceFrequency,
  unit,
}: CaptionProps) {
  const digits = useMemo(() => {
    const length = encoding !== undefined ? IntegerLength[unit][encoding] : 0;
    return range(length).reverse();
  }, [encoding, unit]);

  const className = classNames([
    ["Caption", true],
    ["space-4", spaceFrequency === IntegerStringInputSpaceFrequency.Digits4],
    ["space-8", spaceFrequency === IntegerStringInputSpaceFrequency.Digits8],
  ]);

  return (
    <div class={className}>
      {isSigned && (
        <div class="Caption_Char">
          <span>±</span>
        </div>
      )}
      {digits.map((digit) => (
        <div class="Caption_Char" key={digit}>
          {<span>{digitToHex(digit)}</span>}
        </div>
      ))}
    </div>
  );
}
