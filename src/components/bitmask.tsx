import { range } from "../utils";
import "./bitmask.css";

export type InputBitmaskProps = {
  labelOn?: string;
  labelOff?: string;
  onChange: (value: number) => void;
  size: number;
  value: number;
};

export default function InputBitmask({
  labelOn,
  labelOff,
  onChange,
  size,
  value,
}: InputBitmaskProps) {
  labelOn ??= "1".repeat(size);
  labelOff ??= "0".repeat(size);
  return (
    <div className="Bitmask">
      {range(size).map((index) => {
        const offset = size - index - 1;
        const digit = (value >> offset) & 1;
        const newValue = (value & ~(1 << offset)) | ((~digit & 1) << offset);
        return (
          <span onClick={() => onChange(newValue)}>
            {digit ? labelOn.charAt(index) : labelOff.charAt(index)}
          </span>
        );
      })}
    </div>
  );
}
