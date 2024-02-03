import { forwardRef } from "preact/compat";
import {
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "preact/hooks";
import { useIntegerAsString } from "../hooks/use-integer-as-string";
import {
  Integer,
  IntegerEncoding,
  IntegerRadix,
  IntegerUnit,
  isValidIntegerDigit,
} from "../models/integer";
import {
  IntegerStringSign,
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
  isIntegerStringSign,
} from "../models/integer-string";
import { Direction, Focusable } from "../types";
import {
  classNames,
  isPositiveDigit,
  firstIndexOf,
  lastIndexOf,
} from "../utils";
import "./integer-editor.css";
import { z } from "zod";

//==============================================================================
// Caret
//==============================================================================

export enum IntegerEditorCaret {
  Bar,
  Box,
  Underline,
}

export const IntegerEditorCaretSchema = z.nativeEnum(IntegerEditorCaret);

//==============================================================================
// Space Frequency
//==============================================================================

export enum IntegerEditorSpaceFrequency {
  Digits4,
  Digits8,
  None,
}

export const IntegerEditorSpaceFrequencySchema = z.nativeEnum(
  IntegerEditorSpaceFrequency,
);

//==============================================================================
// Space Frequency
//==============================================================================

export type IntegerEditorProps = {
  autoFocus?: boolean;
  caret?: IntegerEditorCaret;
  encoding: IntegerEncoding;
  integer: Integer;
  isDisabled?: boolean;
  isSigned?: boolean;
  shouldFlipBitOnClick?: boolean;
  shouldMoveAfterTyping: boolean;
  onChangeValue: (integer: number) => Integer;
  refNext?: Ref<Focusable>;
  refPrev?: Ref<Focusable>;
  spaceFrequency: IntegerEditorSpaceFrequency;
  typingDirection: IntegerStringTypingDirection;
  typingMode: IntegerStringTypingMode;
  unit: IntegerUnit;
};

export type IntegerEditorRef = Focusable & {
  copy: () => void;
  paste: () => void;
};

export default forwardRef<IntegerEditorRef, IntegerEditorProps>(
  function IntegerEditor(
    {
      autoFocus = false,
      caret = IntegerEditorCaret.Box,
      encoding,
      integer,
      isDisabled = false,
      isSigned = false,
      shouldFlipBitOnClick = false,
      shouldMoveAfterTyping,
      onChangeValue,
      refNext,
      refPrev,
      spaceFrequency,
      typingDirection,
      typingMode,
      unit,
    },
    ref,
  ) {
    //----------------------------------------------------------------------------
    // State
    //----------------------------------------------------------------------------

    const containerRef = useRef<HTMLDivElement>(null);

    const setInteger = useCallback(
      (nextInteger: Integer) => onChangeValue(nextInteger.value),
      [onChangeValue],
    );

    const [
      { sign, digits, index },
      {
        deleteDigit,
        insertDigit,
        jumpTo,
        moveLeft,
        moveRight,
        negate,
        removeDigit,
        replaceDigit,
        shiftDigit,
        shiftLeft,
        shiftRight,
      },
    ] = useIntegerAsString(integer, setInteger, {
      encoding,
      isSigned,
      shouldMoveAfterTyping,
      typingDirection,
      unit,
    });

    const copy = useCallback(() => {
      navigator.clipboard.writeText(`${sign ?? ""}${digits.join("")}`);
      return true;
    }, [digits, sign]);

    const paste = useCallback(() => {
      if (isDisabled) return false;
      navigator.clipboard.readText().then((maybeIntegerString) => {
        const radix = IntegerRadix[encoding];
        const value = Number.parseInt(maybeIntegerString, radix);
        if (!Number.isNaN(value)) return onChangeValue(value);
      });
      return true;
    }, [encoding, isDisabled, onChangeValue]);

    //----------------------------------------------------------------------------
    // Styles
    //----------------------------------------------------------------------------

    const last = useMemo(
      () =>
        typingDirection === IntegerStringTypingDirection.Right
          ? Math.max(lastIndexOf(digits, isPositiveDigit), index - 1)
          : Math.min(firstIndexOf(digits, isPositiveDigit), index),
      [digits, index, typingDirection],
    );

    const isSolid = useCallback(
      (i: number) =>
        typingDirection === IntegerStringTypingDirection.Right
          ? i <= last
          : i >= last,
      [last, typingDirection],
    );

    const isEmpty = useCallback(
      (i: number) =>
        typingDirection === IntegerStringTypingDirection.Right
          ? i > last
          : i < last,
      [last, typingDirection],
    );

    const className = classNames([
      ["IntegerEditor", true],
      [
        {
          [IntegerEditorCaret.Bar]: "caret-bar",
          [IntegerEditorCaret.Box]: "caret-box",
          [IntegerEditorCaret.Underline]: "caret-underline",
        }[caret],
        true,
      ],
      ["disabled", isDisabled],
      ["space-4", spaceFrequency === IntegerEditorSpaceFrequency.Digits4],
      ["space-8", spaceFrequency === IntegerEditorSpaceFrequency.Digits8],
    ]);

    const signClassName = classNames([
      ["IntegerEditor_Char", true],
      ["solid", typingDirection === IntegerStringTypingDirection.Right],
      ["empty", typingDirection === IntegerStringTypingDirection.Left],
    ]);

    //----------------------------------------------------------------------------
    // Keyboard Event Listener
    //----------------------------------------------------------------------------

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const ok = (_: unknown) => true;

        const processKeys = (): boolean => {
          if ((e.ctrlKey || e.metaKey) && e.key === "c") return copy();
          if ((e.ctrlKey || e.metaKey) && e.key === "v") return paste();

          if (e.ctrlKey || e.metaKey) return false;

          if (e.key === "ArrowDown")
            return Boolean(refNext?.current?.focus(Direction.Down));
          if (e.key === "ArrowUp")
            return Boolean(refPrev?.current?.focus(Direction.Up));
          if (e.key === "ArrowLeft") return ok(moveLeft());
          if (e.key === "ArrowRight") return ok(moveRight());

          if (isDisabled) return false;

          if (e.shiftKey && e.key === "Backspace") return ok(onChangeValue(0));
          if (e.shiftKey && e.key === "Delete") return ok(onChangeValue(0));

          if (e.key === ">") return ok(shiftRight());
          if (e.key === "<") return ok(shiftLeft());

          if (e.key === "}") return ok(shiftRight(true));
          if (e.key === "{") return ok(shiftLeft(true));

          if (e.key === " ") return ok(shiftDigit(e.shiftKey ? -1 : 1));

          if (e.key === "!") return ok(onChangeValue(integer.value * -1));

          if (e.key === "Delete") return ok(deleteDigit());
          if (e.key === "Backspace") return ok(removeDigit());

          if (isValidIntegerDigit(e.key, encoding)) {
            switch (typingMode) {
              case IntegerStringTypingMode.Insert:
                return ok(insertDigit(e.key));
              case IntegerStringTypingMode.Overwrite:
                return ok(replaceDigit(e.key));
            }
          }

          return false;
        };

        if (processKeys()) e.preventDefault();
      },
      [
        copy,
        deleteDigit,
        encoding,
        isDisabled,
        insertDigit,
        integer.value,
        moveLeft,
        moveRight,
        negate,
        onChangeValue,
        refNext,
        refPrev,
        removeDigit,
        replaceDigit,
        shiftLeft,
        shiftRight,
        typingMode,
      ],
    );

    //----------------------------------------------------------------------------
    // Ref
    //----------------------------------------------------------------------------

    const focus = useCallback(() => {
      if (!containerRef.current) return false;
      containerRef.current.focus();
      return true;
    }, []);

    useImperativeHandle(ref, () => ({ copy, focus, paste }), [
      copy,
      focus,
      paste,
    ]);

    //----------------------------------------------------------------------------
    // Render
    //----------------------------------------------------------------------------

    return (
      <div
        autoFocus={autoFocus}
        class={className}
        onKeyDown={handleKeyDown}
        ref={containerRef}
        tabIndex={0}
      >
        {isIntegerStringSign(sign) && (
          <div class={signClassName}>
            {sign === IntegerStringSign.Negative ? "-" : "+"}
          </div>
        )}

        {digits.map((digit, i) => {
          const className = classNames([
            ["IntegerEditor_Char", true],
            ["selected", i === index],
            ["solid", isSolid(i)],
            ["empty", isEmpty(i)],
          ]);

          return (
            <div
              class={className}
              key={i}
              onMouseDown={(e: MouseEvent) => {
                e.preventDefault();
                focus();
                if (isDisabled) return;
                if (shouldFlipBitOnClick && encoding === IntegerEncoding.Bin)
                  shiftDigit(1, i);
                else jumpTo(i);
              }}
            >
              {digit}
              {!isDisabled && i === index && (
                <div class="IntegerEditor_Caret" />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);
