import { ReactNode } from "preact/compat";
import "./setting.css";

type Setting = {
  children: ReactNode;
  hotkey?: string;
  label: string;
};

export default function Setting({ children, hotkey, label }: Setting) {
  return (
    <div class="setting">
      <span class="setting-label">
        {hotkey ? `${label} (${hotkey})` : label}
      </span>
      <div class="setting-input">{children}</div>
    </div>
  );
}
