import {
  IntegerEncoding,
  IntegerLength,
  IntegerPrefix,
  IntegerUnit,
} from "../models/integer";
import { toBin, toHex } from "../utils";
import Tooltip from "./tooltip";
import "./snes-register.css";

type SnesRegisterProps = {
  label: string;
  shouldDimHighByte?: boolean;
  shouldShowBin?: boolean;
  shouldShowHex?: boolean;
  shouldShowPrefix?: boolean;
  tooltip: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
  value: number;
  unit: IntegerUnit;
};

const binCutoff = IntegerLength[IntegerUnit.Byte][IntegerEncoding.Bin];
const hexCutoff = IntegerLength[IntegerUnit.Byte][IntegerEncoding.Hex];

export default function SnesRegister({
  label,
  shouldDimHighByte = false,
  shouldShowBin = false,
  shouldShowHex = true,
  shouldShowPrefix = false,
  tooltip,
  tooltipPosition = "left",
  value,
  unit,
}: SnesRegisterProps) {
  const valueBin = toBin(value, IntegerLength[unit][IntegerEncoding.Bin]);
  const valueHex = toHex(value, IntegerLength[unit][IntegerEncoding.Hex]);

  return (
    <div className="SnesRegister">
      <Tooltip position={tooltipPosition} tooltip={tooltip}>
        <div className={`SnesRegister_Label ${tooltipPosition}`}>{label}</div>
      </Tooltip>
      <div className="SnesRegister_Values">
        {shouldShowBin && (
          <div className="SnesRegister_Value">
            {shouldShowPrefix && (
              <span className="dim">{IntegerPrefix[IntegerEncoding.Bin]}</span>
            )}
            {shouldDimHighByte && unit === IntegerUnit.Word ? (
              <>
                <span class="dim">{valueBin.slice(0, binCutoff)}</span>
                <span>{valueBin.slice(binCutoff)}</span>
              </>
            ) : (
              <span>{valueBin}</span>
            )}
          </div>
        )}
        {shouldShowHex && (
          <div className="SnesRegister_Value">
            {shouldShowPrefix && (
              <span className="dim">{IntegerPrefix[IntegerEncoding.Hex]}</span>
            )}
            {shouldDimHighByte && unit === IntegerUnit.Word ? (
              <>
                <span class="dim">{valueHex.slice(0, hexCutoff)}</span>
                <span>{valueHex.slice(hexCutoff)}</span>
              </>
            ) : (
              <span>{valueHex}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
