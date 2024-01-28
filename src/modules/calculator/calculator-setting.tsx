import { ReactNode } from "preact/compat";

type CalculatorSetting = {
  children: ReactNode;
  hotkey?: string;
  label: string;
};

export default function CalculatorSetting({
  children,
  hotkey,
  label,
}: CalculatorSetting) {
  return (
    <div class="calculator-setting">
      <span class="calculator-setting-label">
        {hotkey ? `${label} (${hotkey})` : label}
      </span>
      <div class="calculator-setting-input">{children}</div>
    </div>
  );
}
