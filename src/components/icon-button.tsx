import { FunctionalComponent } from "preact";
import Button, { ButtonProps } from "./button";
import "./icon-button.css";

export type Icon = FunctionalComponent<{ size: number | string }>;

export type IconButtonProps = {
  Icon: Icon;
  isGhost?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  tooltip: string;
  tooltipPosition?: ButtonProps["tooltipPosition"];
};

export default function IconButton({
  Icon,
  isSelected = false,
  onClick,
  tooltip,
  tooltipPosition,
}: IconButtonProps) {
  return (
    <div class="IconButton">
      <Button
        isBorderless
        isSelected={isSelected}
        label={<Icon size="1em" />}
        onClick={onClick}
        tooltip={tooltip}
        tooltipPosition={tooltipPosition}
      />
    </div>
  );
}
