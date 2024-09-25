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
  items: readonly T[];
  onClickRow?: (item: T) => void;
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

  const scrollRatio = itemsWindow.items.length / items.length;
  const scrollBegin = itemsWindow.scrollIndex / items.length;

  return (
    <div className="Table">
      <table>
        <thead>
          <tr className="Table_Header">
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
                    prev: itemsWindow.items[rowIndex - 1],
                    next: itemsWindow.items[rowIndex + 1],
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
        <tfoot>
          {withFooter && (
            <tr className="Table_Footer">
              {columns.map((column, i) => (
                <td className={columnClassNames[i]}>{column.footer}</td>
              ))}
            </tr>
          )}
        </tfoot>
      </table>

      {itemsWindow.items.length < items.length && (
        <div className="Table_Scrollbar">
          <div className="Table_Scrollbar_Spacer top">&nbsp;</div>
          <div className="Table_Scrollbar_Track">
            <div
              className="Table_Scrollbar_Handle"
              style={{
                height: `${100 * scrollRatio}%`,
                top: `${100 * scrollBegin}%`,
              }}
            />
          </div>
          {withFooter && (
            <div className="Table_Scrollbar_Spacer bottom">&nbsp;</div>
          )}
        </div>
      )}
    </div>
  );
}
