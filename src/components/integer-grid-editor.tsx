import { forwardRef } from "preact/compat";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { useIntegerState, useIntegerStore } from "../hooks/use-integer";
import {
  defaultIntegerStringContext,
  useIntegerAsString,
} from "../hooks/use-integer-as-string";
import useGridSelection from "../hooks/use-grid-selection";
import { useStoreString } from "../hooks/use-store";
import { Colors } from "../models/color";
import {
  IntegerTable,
  IntegerTableColumnCommentType,
  IntegerTableFromString,
  IntegerTableFromStringError,
  IntegerTableToString,
} from "../models/integer-table";
import { IntegerDataRowCommentType } from "../models/integer-data-row";
import {
  IntegerString,
  IntegerStringToInteger,
  IntegerStringTypingDirection,
} from "../models/integer-string";
import {
  Integer,
  IntegerEncoding,
  IntegerUnit,
  defaultInteger,
  isValidIntegerDigit,
} from "../models/integer";
import Store from "../store/store";
import { Either } from "../types";
import { classNames, doNothing, ok, range } from "../utils";
import "./integer-grid-editor.css";

//==============================================================================
// Cell
//==============================================================================

type CellProps = {
  colorOpacity: number;
  encoding: IntegerEncoding;
  id: string;
  isBackgroundImageVisible: boolean;
  isSelected: boolean;
  onDoubleClick: (value: number, x: number, y: number) => void;
  onMouseDown: (x: number, y: number) => void;
  onMouseOver: (x: number, y: number) => void;
  unit: IntegerUnit;
  x: number;
  y: number;
};

type CellRef = {
  edit: (value: number, index: number) => void;
  get: () => Integer;
  getValue: () => number;
  setValue: (value: number) => void;
};

const cellId = (id: string, x: number, y: number): string =>
  `${id}.grid[${y}][${x}]`;

const Cell = forwardRef<CellRef, CellProps>(
  (
    {
      colorOpacity,
      encoding,
      isBackgroundImageVisible,
      id,
      isSelected,
      onDoubleClick,
      onMouseDown,
      onMouseOver,
      unit,
      x,
      y,
    },
    ref,
  ) => {
    const [index, setIndex] = useState(0);
    const [integer, { setValue }] = useIntegerStore(
      cellId(id, x, y),
      defaultInteger,
      { unit },
    );
    const value = integer.value;

    const [{ digits }] = useIntegerAsString(integer, doNothing, {
      encoding,
      isSigned: false,
      shouldMoveAfterTyping: true,
      typingDirection: IntegerStringTypingDirection.Left,
      unit,
    });

    const digitsTyped = digits.slice(0, index);
    const digitsNotTyped = digits.slice(index);

    const [backgroundColor] = useStoreString(
      `${id}.backgroundColor.value[${value}]`,
      Colors[value % Colors.length]!,
    );

    const handleDoubleClick = useCallback(() => {
      onDoubleClick(value, x, y);
    }, [value, onDoubleClick, x, y]);

    const handleMouseDown = useCallback(() => {
      onMouseDown(x, y);
    }, [onMouseDown, x, y]);

    const handleMouseOver = useCallback(() => {
      onMouseOver(x, y);
    }, [onMouseOver, x, y]);

    const className = classNames([
      ["IntegerGridEditor_Cell", true],
      ["selected", isSelected],
    ]);

    const edit = useCallback(
      (nextValue: number, nextIndex: number) => {
        setValue(nextValue);
        setIndex(nextIndex);
      },
      [setValue],
    );

    const get = useCallback(() => integer, [integer]);
    const getValue = useCallback(() => value, [value]);

    useImperativeHandle(ref, () => ({ edit, get, getValue, setValue }), [
      edit,
      get,
      getValue,
      setValue,
    ]);

    useLayoutEffect(() => {
      if (!isSelected) setIndex(0);
    }, [isSelected]);

    const backgroundStyle = useMemo(() => {
      return isSelected
        ? { opacity: isBackgroundImageVisible ? 0.7 : 1 }
        : { opacity: colorOpacity / 100, backgroundColor };
    }, [
      backgroundColor,
      colorOpacity,
      isBackgroundImageVisible,
      isSelected,
      value,
    ]);

    return (
      <div
        class={className}
        onDblClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver}
      >
        <div
          class="IntegerGridEditor_Cell_Background"
          style={backgroundStyle}
        />
        <div>
          <span>{digitsTyped.join("")}</span>
          <span>{digitsNotTyped.join("")}</span>
        </div>
      </div>
    );
  },
);

//==============================================================================
// Grid
//==============================================================================

export type IntegerGridEditorProps = {
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  columnCommentType: IntegerTableColumnCommentType;
  colorOpacity: number;
  encoding: IntegerEncoding;
  height: number;
  id: string;
  indentation: number;
  name: string;
  onBackgroundImageError: () => void;
  onCopy: (table: IntegerTable) => void;
  onPaste: (
    tableOrError: Either<IntegerTable, IntegerTableFromStringError>,
  ) => void;
  onSelect: (value: number) => void;
  rowCommentType: IntegerDataRowCommentType;
  shouldSpaceValues: boolean;
  unit: IntegerUnit;
  width: number;
};

export type IntegerGridEditorRef = {
  clear: () => void;
  copy: () => void;
  focus: () => void;
  paste: () => void;
};

const IntegerGridEditor = forwardRef<
  IntegerGridEditorRef,
  IntegerGridEditorProps
>(
  (
    {
      backgroundImage,
      backgroundImageOpacity = 0,
      columnCommentType,
      colorOpacity,
      encoding,
      height,
      id,
      indentation,
      name,
      onBackgroundImageError = () => {},
      onCopy,
      onPaste,
      onSelect,
      rowCommentType,
      shouldSpaceValues,
      unit,
      width,
    },
    ref,
  ) => {
    height = Number.isNaN(height) ? 1 : height;
    width = Number.isNaN(width) ? 1 : width;

    const cellRefs = useRef<Record<string, CellRef>>({});
    const multipleSelection = useRef(false);

    const [_gridSelection, $gridSelection] = useGridSelection(width, height);
    const [integer, $integer] = useIntegerState(defaultInteger, { unit });
    const [_integerString, $integerString] = useIntegerAsString(
      integer,
      useCallback(
        (nextInteger: Integer) => $integer.setValue(nextInteger.value),
        [$integer.setValue],
      ),
      { encoding, shouldAllowOutOfBoundsCursor: true, unit },
    );

    const editValues = useCallback(
      (value: number, index: number) => {
        for (let y = 0; y < height; ++y)
          for (let x = 0; x < width; ++x)
            cellRefs.current[cellId(id, x, y)]?.edit(value, index);
      },
      [height, id, width],
    );

    const editSelectedValues = useCallback(
      (value: number, index: number) => {
        for (let y = 0; y < height; ++y)
          for (let x = 0; x < width; ++x)
            if ($gridSelection.isSelected(x, y))
              cellRefs.current[cellId(id, x, y)]?.edit(value, index);
      },
      [$gridSelection.isSelected, height, id, width],
    );

    const copy = useCallback(() => {
      const grid: Integer[][] = [];
      for (let y = 0; y < height; ++y) {
        const row: Integer[] = [];
        for (let x = 0; x < width; ++x)
          row.push(cellRefs.current[cellId(id, x, y)]?.get() ?? defaultInteger);
        grid.push(row);
      }
      const table = { grid, height, name, unit, width };

      const tableString = IntegerTableToString(table, {
        columnCommentType,
        encoding,
        indentation,
        isSigned: false,
        rowCommentType,
        shouldSpaceValues,
        name,
      });
      navigator.clipboard.writeText(tableString);
      onCopy(table);
    }, [
      columnCommentType,
      height,
      id,
      indentation,
      name,
      onCopy,
      rowCommentType,
      shouldSpaceValues,
      unit,
      width,
    ]);

    const paste = useCallback(() => {
      navigator.clipboard.readText().then((dataRaw) => {
        const [table, tableError] = IntegerTableFromString(dataRaw);
        if (tableError) return onPaste([undefined, tableError]);

        for (let y = 0; y < table.grid.length; ++y)
          for (let x = 0; x < table.grid[0]!.length; ++x)
            Store.save(cellId(id, x, y), table.grid[y]![x]!);

        onPaste([table, undefined]);
      });
    }, [id, onPaste]);

    const handleCellDoubleClick = useCallback(
      (value: number) =>
        $gridSelection.selectIf((x, y) => {
          const cell = cellRefs.current[cellId(id, x, y)];
          return Boolean(cell && cell.getValue() === value);
        }),
      [$gridSelection.selectIf, id],
    );

    const handleCellMouseDown = useCallback(
      (x: number, y: number, shouldStop?: boolean) => {
        containerRef.current?.focus();
        if (multipleSelection.current) $gridSelection.start(x, y);
        else {
          $integerString.clear();
          $gridSelection.restart(x, y, shouldStop);
          const value = cellRefs.current[cellId(id, x, y)]?.getValue();
          if (value !== undefined) onSelect(value);
        }
      },
      [$gridSelection.restart, $gridSelection.start, $integerString.clear],
    );

    const handleCellMouseOver = useCallback(
      (x: number, y: number) => $gridSelection.update(x, y),
      [$gridSelection.update],
    );

    const handleMouseUp = useCallback(() => {
      $gridSelection.stop();
    }, [$gridSelection.stop]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const processKeys = () => {
          const type = (nextIntegerString: IntegerString) => {
            const nextInteger = IntegerStringToInteger(nextIntegerString, {
              ...defaultIntegerStringContext,
              encoding,
              unit,
            });
            editSelectedValues(
              nextInteger ? nextInteger.value : 0,
              nextInteger ? nextIntegerString.index : 0,
            );
            return true;
          };

          if (e.key === "c" && (e.ctrlKey || e.metaKey)) return ok(copy());
          if (e.key === "v" && (e.ctrlKey || e.metaKey)) return ok(paste());

          if (e.ctrlKey || e.metaKey || e.shiftKey)
            multipleSelection.current = true;

          if (e.key === "Delete") return type($integerString.deleteDigit());
          if (e.key === "Backspace") return type($integerString.removeDigit());
          if (isValidIntegerDigit(e.key, encoding))
            return type($integerString.insertDigit(e.key));

          const clear = !multipleSelection.current;
          if (e.key === "ArrowDown")
            return ok($gridSelection.move(0, 1, clear));
          if (e.key === "ArrowLeft")
            return ok($gridSelection.move(-1, 0, clear));
          if (e.key === "ArrowRight")
            return ok($gridSelection.move(1, 0, clear));
          if (e.key === "ArrowUp") return ok($gridSelection.move(0, -1, clear));

          return false;
        };

        if (processKeys()) e.preventDefault();
      },
      [
        $gridSelection.move,
        $integerString.deleteDigit,
        $integerString.insertDigit,
        $integerString.removeDigit,
        editSelectedValues,
        copy,
        encoding,
        paste,
        unit,
      ],
    );

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
      const processKeys = () => {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey)
          multipleSelection.current = false;
        return false;
      };

      if (processKeys()) e.preventDefault();
    }, []);

    useEffect(() => {
      const clearMultipleSelection = () => (multipleSelection.current = false);
      window.addEventListener("focus", clearMultipleSelection);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("focus", clearMultipleSelection);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [handleKeyDown, handleKeyUp, handleMouseUp]);

    const handleFocus = useCallback(() => {
      if (!$gridSelection.hasSelection()) $gridSelection.select(0, 0);
    }, [$gridSelection.hasSelection, $gridSelection.select]);

    const handleBlur = useCallback(() => {
      $integerString.clear();
      $gridSelection.clear();
    }, [$gridSelection.clear, $integerString.clear]);

    const containerRef = useRef<HTMLDivElement>(null);

    const clear = useCallback(() => {
      $gridSelection.clear();
      $integerString.clear();
      editValues(0, 0);
    }, [$gridSelection.clear, $integerString.clear, editValues]);

    const focus = useCallback(() => {
      return handleCellMouseDown(0, 0, true);
    }, [handleCellMouseDown]);

    useImperativeHandle(ref, () => ({ clear, copy, focus, paste }), [
      clear,
      copy,
      focus,
      paste,
    ]);

    const gridStyle = useMemo(
      () => ({ maxWidth: `${width * 3.4}em` }),
      [width],
    );

    const backgroundImageStyle = useMemo(
      () => ({ opacity: backgroundImageOpacity / 100 }),
      [backgroundImageOpacity],
    );

    return (
      <div class="IntegerGridEditor">
        <div
          class="IntegerGridEditor_Grid"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          ref={containerRef}
          style={gridStyle}
          tabIndex={0}
        >
          {range(height).map((y) => (
            <div class="IntegerGridEditor_Row" key={y}>
              {range(width).map((x) => (
                <Cell
                  colorOpacity={colorOpacity}
                  encoding={encoding}
                  id={id}
                  isBackgroundImageVisible={Boolean(backgroundImage)}
                  isSelected={$gridSelection.isSelected(x, y)}
                  key={cellId(id, x, y)}
                  onDoubleClick={handleCellDoubleClick}
                  onMouseDown={handleCellMouseDown}
                  onMouseOver={handleCellMouseOver}
                  ref={(cellRef: CellRef | null) => {
                    if (cellRef) cellRefs.current[cellId(id, x, y)] = cellRef;
                  }}
                  unit={unit}
                  x={x}
                  y={y}
                />
              ))}
            </div>
          ))}

          {backgroundImage && (
            <img
              class="IntegerGridEditor_Background"
              onError={onBackgroundImageError}
              src={backgroundImage}
              style={backgroundImageStyle}
            />
          )}
        </div>
      </div>
    );
  },
);

export default IntegerGridEditor;
