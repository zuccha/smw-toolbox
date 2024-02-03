import { ReactNode } from "preact/compat";
import { useCallback, useMemo } from "preact/hooks";
import { classNames } from "../utils";
import "./button.css";

export type ButtonProps = {
  isBorderless?: boolean;
  isSelected?: boolean;
  label: ReactNode;
  onClick: () => void;
  tooltip?: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
};

export default function Button({
  isBorderless = false,
  isSelected = false,
  label,
  onClick,
  tooltip,
  tooltipPosition = "bottom",
}: ButtonProps) {
  const className = useMemo(
    () =>
      classNames([
        ["Button", true],
        [tooltipPosition, Boolean(tooltip)],
        ["borderless", isBorderless],
        ["selected", isSelected],
      ]),
    [isSelected],
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }
    },
    [onClick],
  );

  return (
    <div
      class={className}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-tooltip={tooltip}
    >
      {label}
    </div>
  );
}
