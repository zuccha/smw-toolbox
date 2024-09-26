import { ReactNode, useMemo } from "preact/compat";
import useFrame from "../hooks/use-frame";
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
  maxVisibleItems?: number;
  onClickRow?: (item: T) => void;
  withFooter?: boolean;
};

export default function Table<T>({
  columns,
  isRowClickable = () => false,
  isRowSelected = () => false,
  items,
  maxVisibleItems,
  onClickRow = () => {},
  withFooter = false,
}: TableProps<T>) {
  maxVisibleItems = maxVisibleItems ?? items.length;
  const frame = useFrame(items, Math.min(maxVisibleItems, items.length));

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

  const handleHeight = `${(100 * frame.items.length) / items.length}%`;
  const handlePosition = `${(100 * frame.index) / items.length}%`;

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
        <tbody ref={frame.elementRef} onWheel={frame.mouseScroll.handleScroll}>
          {frame.items.map((item, rowIndex) => {
            const className = classNames([
              ["selected", isRowSelected(item)],
              ["clickable", isRowClickable(item)],
            ]);
            return (
              <tr className={className} onClick={() => onClickRow(item)}>
                {columns.map((column, columnIndex) => {
                  const context = {
                    prev: frame.items[rowIndex - 1],
                    next: frame.items[rowIndex + 1],
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

      {frame.items.length < items.length && (
        <div className="Table_Scrollbar">
          <div className="Table_Scrollbar_Spacer top">&nbsp;</div>
          <div className="Table_Scrollbar_Track">
            <div
              className="Table_Scrollbar_Handle"
              onDrag={(e) => e.currentTarget}
              style={{ height: handleHeight, top: handlePosition }}
              onMouseDown={frame.mouseDrag.handleMouseDown}
              onMouseMove={frame.mouseDrag.handleMouseMove}
              onMouseUp={frame.mouseDrag.handleMouseUp}
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
