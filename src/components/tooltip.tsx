import { ReactNode } from "preact/compat";
import "./tooltip.css";
import { classNames } from "../utils";

type TooltipProps = {
  children: ReactNode;
  monospace?: boolean;
  position?: "left" | "right" | "top" | "bottom";
  tooltip: string;
};

export default function Tooltip({
  children,
  monospace = false,
  position = "top",
  tooltip,
}: TooltipProps) {
  const className = classNames([
    [`Tooltip_Content ${position}`, true],
    ["monospace", monospace],
  ]);
  return (
    <div className="Tooltip">
      <div className={className} data-tooltip={tooltip}>
        {children}
      </div>
    </div>
  );
}
