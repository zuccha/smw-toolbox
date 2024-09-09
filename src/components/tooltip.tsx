import { ReactNode } from "preact/compat";
import "./tooltip.css";

type TooltipProps = {
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  tooltip: string;
};

export default function Tooltip({
  children,
  position = "top",
  tooltip,
}: TooltipProps) {
  return (
    <div className="Tooltip">
      <div className={`Tooltip_Content ${position}`} data-tooltip={tooltip}>
        {children}
      </div>
    </div>
  );
}
