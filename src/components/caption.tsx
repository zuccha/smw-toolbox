import { useMemo } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerLength,
  IntegerUnit,
  digitToHex,
} from "../models/integer";
import { classNames, range } from "../utils";
import "./caption.css";
import { IntegerEditorSpaceFrequency } from "./integer-editor";

export type CaptionProps = {
  encoding: IntegerEncoding | undefined;
  isSigned: boolean;
  spaceFrequency: IntegerEditorSpaceFrequency;
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
    ["space-4", spaceFrequency === IntegerEditorSpaceFrequency.Digits4],
    ["space-8", spaceFrequency === IntegerEditorSpaceFrequency.Digits8],
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
