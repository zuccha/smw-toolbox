import { ReactNode, useLayoutEffect, useMemo } from "preact/compat";
import useItemsWindow from "../hooks/use-items-window";
import { classNames } from "../utils";
import "./table.css";

export type TableRowContext<T> = {
  prev?: T;
  next?: T;
};

export type TableColumn<T> = {
  header: ReactNode;
  footer?: ReactNode;
  value: (value: T, context: TableRowContext<T>) => ReactNode;
  align?: "left" | "right" | "center";
  space?: "left" | "right";
  colSpan?: (value: T, context: TableRowContext<T>) => number;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  isRowClickable?: (item: T) => boolean;
  isRowSelected?: (item: T) => boolean;
  onClickRow?: (item: T) => void;
  items: readonly T[];
  windowSize?: number;
  withFooter?: boolean;
};

export default function Table<T>({
  columns,
  isRowClickable = () => false,
  isRowSelected = () => false,
  items,
  onClickRow = () => {},
  windowSize,
  withFooter = false,
}: TableProps<T>) {
  const itemsWindow = useItemsWindow(items, windowSize ?? items.length);

  useLayoutEffect(
    () => itemsWindow.resetScroll(),
    [items, itemsWindow.resetScroll],
  );

  const columnClassNames = useMemo(
    () =>
      columns.map((column) =>
        classNames([
          [column.align!, !!column.align && column.align !== "left"],
          [`space-${column.space}`, !!column.space],
        ]),
      ),
    [columns],
  );

  return (
    <table className="Table">
      <thead>
        <tr>
          {columns.map((column, i) => (
            <td className={columnClassNames[i]}>{column.header}</td>
          ))}
        </tr>
      </thead>
      <tbody onWheel={itemsWindow.handleScroll}>
        {itemsWindow.items.map((item, rowIndex) => {
          const className = classNames([
            ["selected", isRowSelected(item)],
            ["clickable", isRowClickable(item)],
          ]);
          return (
            <tr className={className} onClick={() => onClickRow(item)}>
              {columns.map((column, columnIndex) => {
                const context = {
                  prev: items[rowIndex - 1],
                  next: items[rowIndex + 1],
                };
                const colSpan = column?.colSpan?.(item, context) ?? 1;
                return colSpan > 0 ? (
                  <td
                    className={columnClassNames[columnIndex]}
                    colSpan={colSpan}
                  >
                    {column.value(item, context)}
                  </td>
                ) : null;
              })}
            </tr>
          );
        })}
      </tbody>
      {withFooter && (
        <tfoot>
          <tr>
            {columns.map((column, i) => (
              <td className={columnClassNames[i]}>{column.footer}</td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
}
