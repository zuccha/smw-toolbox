import { ReactNode } from "preact/compat";
import Button from "./button";
import "./icon-button.css";

type IconButtonProps = {
  isSelected?: boolean;
  label: ReactNode;
  onClick: () => void;
  tooltip: string;
  tooltipPosition?: "bottom" | "left" | "right" | "top";
};

export default function IconButton({
  isSelected = false,
  label,
  onClick,
  tooltip,
  tooltipPosition = "bottom",
}: IconButtonProps) {
  return (
    <div class={`icon-button ${tooltipPosition}`} data-tooltip={tooltip}>
      <Button
        isBorderless
        isSelected={isSelected}
        label={label}
        onClick={onClick}
      />
    </div>
  );
}
