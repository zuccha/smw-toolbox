import { forwardRef } from "preact/compat";
import {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "preact/hooks";
import { z } from "zod";
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
import {
  classNames,
  isPositiveDigit,
  firstIndexOf,
  lastIndexOf,
} from "../utils";
import "./integer-string-input.css";

//==============================================================================
// Caret
//==============================================================================

export enum IntegerStringInputCaret {
  Bar,
  Box,
  Underline,
}

export const IntegerStringInputCaretSchema = z.nativeEnum(
  IntegerStringInputCaret,
);

//==============================================================================
// Space Frequency
//==============================================================================

export enum IntegerStringInputSpaceFrequency {
  Digits4,
  Digits8,
  None,
}

export const IntegerStringInputSpaceFrequencySchema = z.nativeEnum(
  IntegerStringInputSpaceFrequency,
);

//==============================================================================
// Integer String Input
//==============================================================================

export type IntegerStringInputProps = {
  autoFocus?: boolean;
  caret?: IntegerStringInputCaret;
  encoding: IntegerEncoding;
  integer: Integer;
  isDisabled?: boolean;
  isSigned?: boolean;
  shouldFlipBitOnClick?: boolean;
  shouldMoveAfterTyping: boolean;
  onChangeValue: (integer: number) => Integer;
  spaceFrequency: IntegerStringInputSpaceFrequency;
  typingDirection: IntegerStringTypingDirection;
  typingMode: IntegerStringTypingMode;
  unit: IntegerUnit;
};

export type IntegerStringInputRef = {
  copy: () => void;
  focus: () => void;
  hasFocus: () => boolean;
  paste: () => void;
};

export default forwardRef<IntegerStringInputRef, IntegerStringInputProps>(
  function IntegerStringInput(
    {
      autoFocus = false,
      caret = IntegerStringInputCaret.Box,
      encoding,
      integer,
      isDisabled = false,
      isSigned = false,
      shouldFlipBitOnClick = false,
      shouldMoveAfterTyping,
      onChangeValue,
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
      ["IntegerStringInput", true],
      [
        {
          [IntegerStringInputCaret.Bar]: "caret-bar",
          [IntegerStringInputCaret.Box]: "caret-box",
          [IntegerStringInputCaret.Underline]: "caret-underline",
        }[caret],
        true,
      ],
      ["disabled", isDisabled],
      ["space-4", spaceFrequency === IntegerStringInputSpaceFrequency.Digits4],
      ["space-8", spaceFrequency === IntegerStringInputSpaceFrequency.Digits8],
    ]);

    const signClassName = classNames([
      ["IntegerStringInput_Char", true],
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

    const hasFocus = useCallback(() => {
      return document.activeElement === containerRef.current;
    }, []);

    useImperativeHandle(ref, () => ({ copy, focus, hasFocus, paste }), [
      copy,
      focus,
      hasFocus,
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
            ["IntegerStringInput_Char", true],
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
                <div class="IntegerStringInput_Caret" />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);
