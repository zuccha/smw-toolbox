import Input, { InputProps } from "./input";

export type InputTextProps = Omit<InputProps, "max" | "min" | "type">;

export default function InputText(props: InputTextProps) {
  return <Input {...props} type="text" />;
}
