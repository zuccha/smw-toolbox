import { Check, ClipboardPaste, Copy, X } from "lucide-preact";
import { useCallback, useMemo, useRef, useState } from "preact/hooks";
import { isMobile } from "react-device-detect";
import IconButton from "../../components/icon-button";
import IntegerGridEditor, {
  IntegerGridEditorRef,
} from "../../components/integer-grid-editor";
import Keyboard, { KeyboardAction } from "../../components/keyboard";
import useComponentsWithCooldown from "../../hooks/use-alternate-with-cooldown";
import {
  IntegerTable,
  IntegerTableFromStringError,
} from "../../models/integer-table";
import { IntegerHexDigits } from "../../models/integer";
import {
  tableEditorId,
  useTableEditorBackgroundImageFileName,
  useTableEditorBackgroundImageImage,
  useTableEditorBackgroundImageIsVisible,
  useTableEditorBackgroundImageOpacity,
  useTableEditorColorOpacity,
  useTableEditorColumnCommentType,
  useTableEditorEncoding,
  useTableEditorIndentation,
  useTableEditorName,
  useTableEditorRowCommentType,
  useTableEditorSelectedValue,
  useTableEditorShouldSpaceValues,
  useTableEditorSizeHeight,
  useTableEditorSizeWidth,
  useTableEditorUnit,
} from "./store";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";
import { isNothingFocused, ok } from "../../utils";
import { Either } from "../../types";

const type = (key: string) => () => {
  if (document.activeElement)
    document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key }));
};

const keyboardActions: KeyboardAction[] = isMobile
  ? [
      ...IntegerHexDigits.map((digit) => ({
        label: digit,
        onClick: type(digit),
      })),
      { label: "DEL", onClick: type("Delete"), size: "xs" },
      { label: "⌫", onClick: type("Backspace") },
    ]
  : [];

export default function TableEditorGrid() {
  const integerGridEditorRef = useRef<IntegerGridEditorRef>(null);

  const [encoding] = useTableEditorEncoding();
  const [unit, setUnit] = useTableEditorUnit();

  const [height, setHeight] = useTableEditorSizeHeight();
  const [width, setWidth] = useTableEditorSizeWidth();

  const [name, setName] = useTableEditorName();

  const [indentationOrNaN] = useTableEditorIndentation();
  const indentation = Number.isNaN(indentationOrNaN) ? 0 : indentationOrNaN;

  const [columnCommentType] = useTableEditorColumnCommentType();
  const [rowCommentType] = useTableEditorRowCommentType();

  const [shouldSpaceValues] = useTableEditorShouldSpaceValues();

  const [colorOpacity] = useTableEditorColorOpacity();

  const [_backgroundImageFileName, setBackgroundImageFileName] =
    useTableEditorBackgroundImageFileName();
  const [backgroundImage, setBackgroundImage] =
    useTableEditorBackgroundImageImage();
  const [backgroundImageOpacity] = useTableEditorBackgroundImageOpacity();

  const [isBackgroundImageVisible] = useTableEditorBackgroundImageIsVisible();

  const [_valueOrNaN, setValueOrNaN] = useTableEditorSelectedValue();

  const [importError, setImportError] = useState("");
  const clearImportError = useCallback(() => setImportError(""), []);

  const clearGrid = useCallback(() => {
    integerGridEditorRef.current?.clear();
    clearImportError();
  }, [clearImportError]);

  const clearBackgroundImage = useCallback(() => {
    setBackgroundImage("");
    setBackgroundImageFileName("");
  }, [setBackgroundImage, setBackgroundImageFileName]);

  const [CopyOrCheck, startCopyCooldown] = useComponentsWithCooldown(
    Copy,
    Check,
    1000,
  );

  const copyTable = useCallback(() => {
    integerGridEditorRef.current?.copy();
  }, []);

  const pasteTable = useCallback(() => {
    integerGridEditorRef.current?.paste();
  }, [clearImportError, setHeight, setName, setUnit, setWidth]);

  const updateSettings = useCallback(
    (tableOrError: Either<IntegerTable, IntegerTableFromStringError>) => {
      const [table, tableError] = tableOrError;
      if (tableError) return setImportError(tableError.message);

      clearImportError();
      setName(table.name);
      setHeight(table.height);
      setWidth(table.width);
      setUnit(table.unit);
    },
    [clearImportError, setHeight, setName, setUnit, setWidth],
  );

  const hotkeys: Hotkey[] = useMemo(() => {
    const focusGridEditor = () =>
      isNothingFocused() ? ok(integerGridEditorRef.current?.focus()) : false;
    return [{ key: "Tab", onPress: focusGridEditor }];
  }, [copyTable, pasteTable]);

  useHotkeys(hotkeys);

  return (
    <div class="App_SectionCol">
      <div class="App_SectionRow font-size_l">
        <span class="font-family_monospace">{name ? `${name}:` : ""}</span>

        <div class="flex_1" />

        <div class="App_SectionCluster">
          <IconButton
            Icon={ClipboardPaste}
            onClick={pasteTable}
            tooltip="Paste"
          />
          <IconButton Icon={CopyOrCheck} onClick={copyTable} tooltip="Copy" />
          <IconButton Icon={X} onClick={clearGrid} tooltip="Clear" />
        </div>
      </div>

      {importError && (
        <div class="App_SectionCluster">
          <div class="flex_1" />
          <div class="App_ErrorMessage">{`Import failed: ${importError}`}</div>
          <IconButton Icon={X} onClick={clearImportError} tooltip="Clear" />
        </div>
      )}

      <IntegerGridEditor
        columnCommentType={columnCommentType}
        backgroundImage={isBackgroundImageVisible ? backgroundImage : undefined}
        backgroundImageOpacity={backgroundImageOpacity}
        colorOpacity={colorOpacity}
        encoding={encoding}
        height={height}
        indentation={indentation}
        id={tableEditorId}
        name={name}
        onBackgroundImageError={clearBackgroundImage}
        onCopy={startCopyCooldown}
        onPaste={updateSettings}
        onSelect={setValueOrNaN}
        ref={integerGridEditorRef}
        rowCommentType={rowCommentType}
        shouldSpaceValues={shouldSpaceValues}
        unit={unit}
        width={width}
      />

      {keyboardActions.length > 0 && (
        <div class="App_Center">
          <Keyboard actions={keyboardActions} rowSize={9} />
        </div>
      )}
    </div>
  );
}
