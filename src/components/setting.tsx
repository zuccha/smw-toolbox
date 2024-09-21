import { ReactNode } from "preact/compat";
import "./setting.css";
import { classNames } from "../utils";

type Setting = {
  align?: "center" | "top" | "bottom";
  children: ReactNode;
  hotkey?: string;
  inline?: boolean;
  label: string;
  size?: "md" | "lg";
};

export default function Setting({
  align = "center",
  children,
  hotkey,
  inline = false,
  label,
  size = "lg",
}: Setting) {
  const className = classNames([
    ["Setting", true],
    [`inline ${align}`, inline],
  ]);

  let formattedLabel = label;
  if (hotkey) formattedLabel += ` (${hotkey})`;
  if (inline) formattedLabel += ":";

  return (
    <div class={className}>
      <span class="Setting_Label">{formattedLabel}</span>
      <div class={`Setting_Input ${size}`}>{children}</div>
    </div>
  );
}
