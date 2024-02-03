import { forwardRef } from "preact/compat";
import {
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "preact/hooks";
import IntegerEditor, {
  IntegerEditorCaret,
  IntegerEditorRef,
  IntegerEditorSpaceFrequency,
} from "../../components/integer-editor";
import { Integer, IntegerEncoding, IntegerUnit } from "../../models/integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
} from "../../models/integer-string";
import { Direction, Focusable } from "../../types";
import CalculatorEditor from "./calculator-editor";

export type CalculatorEditorsProps = {
  autoFocus?: boolean;
  caret: IntegerEditorCaret;
  integer: Integer;
  isDisabled?: boolean;
  isPasteIconHidden?: boolean;
  isSignedBin?: boolean;
  isSignedDec?: boolean;
  isSignedHex?: boolean;
  isVisibleBin?: boolean;
  isVisibleDec?: boolean;
  isVisibleHex?: boolean;
  onChangeValue: (integerValue: number) => Integer;
  prefixBin?: string;
  prefixDec?: string;
  prefixHex?: string;
  refNext?: Ref<CalculatorEditorsRef>;
  refPrev?: Ref<CalculatorEditorsRef>;
  shouldFlipBitOnClick: boolean;
  shouldMoveAfterTyping: boolean;
  spaceFrequency: IntegerEditorSpaceFrequency;
  typingDirection: IntegerStringTypingDirection;
  typingMode: IntegerStringTypingMode;
  unit: IntegerUnit;
};

export type CalculatorEditorsRef = Focusable;

const useEditor = (
  ref: Ref<IntegerEditorRef>,
  prevs: (Ref<Focusable> | undefined)[],
  nexts: (Ref<Focusable> | undefined)[],
) => {
  const refNext = useMemo(() => nexts.find(Boolean), nexts);
  const refPrev = useMemo(() => prevs.find(Boolean), prevs);
  const copy = useCallback(() => ref.current?.copy(), [ref]);
  const paste = useCallback(() => ref.current?.paste(), [ref]);
  return { copy, paste, ref, refNext, refPrev };
};

export default forwardRef<CalculatorEditorsRef, CalculatorEditorsProps>(
  function CalculatorEditors(
    {
      autoFocus,
      caret,
      integer,
      isDisabled = false,
      isPasteIconHidden = false,
      isSignedBin = false,
      isSignedDec = false,
      isSignedHex = false,
      isVisibleBin = false,
      isVisibleDec = false,
      isVisibleHex = false,
      onChangeValue,
      prefixBin = "",
      prefixDec = "",
      prefixHex = "",
      refNext,
      refPrev,
      shouldFlipBitOnClick,
      shouldMoveAfterTyping,
      spaceFrequency,
      typingDirection,
      typingMode,
      unit,
    },
    ref,
  ) {
    const props = {
      caret,
      integer,
      isDisabled,
      onChangeValue,
      shouldFlipBitOnClick,
      shouldMoveAfterTyping,
      spaceFrequency,
      typingDirection,
      typingMode,
      unit,
    };

    const binRef = useRef<IntegerEditorRef>(null);
    const decRef = useRef<IntegerEditorRef>(null);
    const hexRef = useRef<IntegerEditorRef>(null);

    const bin = isVisibleBin ? binRef : undefined;
    const dec = isVisibleDec ? decRef : undefined;
    const hex = isVisibleHex ? hexRef : undefined;

    const binProps = useEditor(binRef, [refPrev], [dec, hex, refNext]);
    const decProps = useEditor(decRef, [bin, refPrev], [hex, refNext]);
    const hexProps = useEditor(hexRef, [dec, bin, refPrev], [refNext]);

    useImperativeHandle(
      ref,
      () => ({
        focus: (direction?: Direction): boolean => {
          switch (direction) {
            case Direction.Down:
              const nexts = [bin, dec, hex, refNext];
              return Boolean(
                nexts.find(Boolean)?.current?.focus(Direction.Down),
              );
            case Direction.Up:
              const prevs = [hex, dec, bin, refPrev];
              return Boolean(prevs.find(Boolean)?.current?.focus(Direction.Up));
          }
          return false;
        },
      }),
      [bin, dec, hex, refNext, refPrev],
    );

    return (
      <>
        {isVisibleBin && (
          <CalculatorEditor
            isPasteIconHidden={isPasteIconHidden}
            label={prefixBin}
            onCopy={binProps.copy}
            onPaste={binProps.paste}
          >
            <IntegerEditor
              {...props}
              {...binProps}
              autoFocus={autoFocus}
              encoding={IntegerEncoding.Bin}
              isSigned={isSignedBin}
            />
          </CalculatorEditor>
        )}

        {isVisibleDec && (
          <CalculatorEditor
            isPasteIconHidden={isPasteIconHidden}
            label={prefixDec}
            onCopy={decProps.copy}
            onPaste={decProps.paste}
          >
            <IntegerEditor
              {...props}
              {...decProps}
              encoding={IntegerEncoding.Dec}
              isSigned={isSignedDec}
            />
          </CalculatorEditor>
        )}

        {isVisibleHex && (
          <CalculatorEditor
            isPasteIconHidden={isPasteIconHidden}
            label={prefixHex}
            onCopy={hexProps.copy}
            onPaste={hexProps.paste}
          >
            <IntegerEditor
              {...props}
              {...hexProps}
              encoding={IntegerEncoding.Hex}
              isSigned={isSignedHex}
            />
          </CalculatorEditor>
        )}
      </>
    );
  },
);
