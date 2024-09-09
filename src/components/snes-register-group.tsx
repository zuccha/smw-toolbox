import { ReactNode } from "preact/compat";
import "./snes-register-group.css";

export type SnesRegisterGroupProps = {
  children: ReactNode;
  name: string;
};

export default function SnesRegisterGroup({
  children,
}: SnesRegisterGroupProps) {
  return <div className="SnesRegisterGroup">{children}</div>;
}
