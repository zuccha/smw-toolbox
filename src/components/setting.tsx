import { ReactNode } from "preact/compat";
import "./setting.css";

type Setting = {
  children: ReactNode;
  hotkey?: string;
  label: string;
  size?: "md" | "lg";
};

export default function Setting({
  children,
  hotkey,
  label,
  size = "lg",
}: Setting) {
  return (
    <div class="Setting">
      <span class="Setting_Label">
        {hotkey ? `${label} (${hotkey})` : label}
      </span>
      <div class={`Setting_Input ${size}`}>{children}</div>
    </div>
  );
}
