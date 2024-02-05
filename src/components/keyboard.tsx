import { ReactNode, useCallback, useMemo } from "preact/compat";
import { doNothing } from "../utils";
import Button from "./button";
import "./keyboard.css";
import { z } from "zod";

export enum KeyboardMode {
  Compact,
  Full,
  None,
}

export const KeyboardModeSchema = z.nativeEnum(KeyboardMode);

export type KeyboardAction =
  | {
      isActive?: boolean;
      colSpan?: number;
      label: ReactNode;
      onClick: () => void;
      size?: "xxs" | "xs" | "s" | "m" | "l";
    }
  | undefined;

type KeyboardProps = {
  actions: KeyboardAction[];
  rowSize?: number;
};

export default function Keyboard({ actions, rowSize = 8 }: KeyboardProps) {
  const handleMouseDown = useCallback(
    (e: MouseEvent) => e.preventDefault(),
    [],
  );

  const style = useMemo(
    () => ({ gridTemplateColumns: `repeat(${rowSize}, max-content)` }),
    [rowSize],
  );

  return (
    <div class="Keyboard" onMouseDown={handleMouseDown} style={style}>
      {actions.map((action, i) =>
        action ? (
          <div
            class="Keyboard_Key"
            style={
              action.colSpan
                ? { gridColumn: `span ${action.colSpan}`, width: "100%" }
                : undefined
            }
          >
            <Button
              isSelected={action.isActive}
              key={i}
              label={
                <div class={`Keyboard_Key_${action.size}`}>{action.label}</div>
              }
              onClick={action.isActive ? doNothing : action.onClick}
            />
          </div>
        ) : (
          <div key={i} />
        ),
      )}
    </div>
  );
}
