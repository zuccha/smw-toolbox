import { Copy, Check, ClipboardPaste } from "lucide-preact";
import { ReactNode, Ref, RefObject, forwardRef } from "preact/compat";
import { useCallback, useRef, useImperativeHandle } from "preact/hooks";
import useAlternateComponentsWithCooldown from "../hooks/use-alternate-components-with-cooldown";
import { Integer, IntegerUnit, IntegerEncoding } from "../models/integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
} from "../models/integer-string";
import Caption from "./caption";
import CheckGroup from "./check-group";
import IconButton from "./icon-button";
import IntegerStringInput, {
  IntegerStringInputCaret,
  IntegerStringInputSpaceFrequency,
  IntegerStringInputRef,
} from "./integer-string-input";
import "./integer-input.css";
import { ok } from "../utils";

const visibilityLabels = ["B", "D", "H"];

type IntegerInputRowProps = {
  children: ReactNode;
  isPasteIconHidden?: boolean;
  label: string;
  onCopy: () => void;
  onPaste: () => void;
};

function IntegerInputRow({
  children,
  isPasteIconHidden = false,
  label,
  onCopy,
  onPaste,
}: IntegerInputRowProps) {
  const [CopyOrCheck, startCopyCooldown] = useAlternateComponentsWithCooldown(
    Copy,
    Check,
    1000,
  );

  const copy = useCallback(() => {
    startCopyCooldown();
    onCopy();
  }, [onCopy, startCopyCooldown]);

  return (
    <>
      <span class="IntegerInput_Label">{label}</span>
      <div class="IntegerInput_Input">{children}</div>
      <div class="IntegerInput_Actions">
        <IconButton Icon={CopyOrCheck} onClick={copy} tooltip="Copy" />
        {!isPasteIconHidden && (
          <IconButton Icon={ClipboardPaste} onClick={onPaste} tooltip="Paste" />
        )}
      </div>
    </>
  );
}

export type IntegerInputProps = {
  autoFocus?: boolean;
  caret: IntegerStringInputCaret;
  integer: Integer;
  isDisabled?: boolean;
  isPasteIconHidden?: boolean;
  isSignedBin?: boolean;
  isSignedDec?: boolean;
  isSignedHex?: boolean;
  minCaptionEncoding?: IntegerEncoding;
  onChangeValue: (integerValue: number) => Integer;
  onChangeVisibility: (visibility: [boolean, boolean, boolean]) => void;
  prefixBin?: string;
  prefixDec?: string;
  prefixHex?: string;
  refNext?: Ref<IntegerInputRef>;
  refPrev?: Ref<IntegerInputRef>;
  shouldFlipBitOnClick: boolean;
  shouldMoveAfterTyping: boolean;
  shouldShowLine?: boolean;
  spaceFrequency: IntegerStringInputSpaceFrequency;
  typingDirection: IntegerStringTypingDirection;
  typingMode: IntegerStringTypingMode;
  unit: IntegerUnit;
  visibility: [boolean, boolean, boolean];
};

export type IntegerInputRef = {
  focusFirst: () => boolean;
  focusLast: () => boolean;
  hasFocus: () => boolean;
  isVisible: () => boolean;
  moveDown: () => boolean;
  moveUp: () => boolean;
};

const useEditor = (ref: RefObject<IntegerStringInputRef>) => {
  const copy = useCallback(() => ref.current?.copy(), [ref]);
  const paste = useCallback(() => ref.current?.paste(), [ref]);
  return { copy, paste, ref };
};

export default forwardRef<IntegerInputRef, IntegerInputProps>(
  function IntegerEditor(
    {
      autoFocus,
      caret,
      integer,
      isDisabled = false,
      isPasteIconHidden = false,
      isSignedBin = false,
      isSignedDec = false,
      isSignedHex = false,
      minCaptionEncoding,
      onChangeValue,
      onChangeVisibility,
      prefixBin = "",
      prefixDec = "",
      prefixHex = "",
      shouldFlipBitOnClick,
      shouldMoveAfterTyping,
      shouldShowLine = false,
      spaceFrequency,
      typingDirection,
      typingMode,
      unit,
      visibility,
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

    const binRef = useRef<IntegerStringInputRef>(null);
    const decRef = useRef<IntegerStringInputRef>(null);
    const hexRef = useRef<IntegerStringInputRef>(null);

    const binProps = useEditor(binRef);
    const decProps = useEditor(decRef);
    const hexProps = useEditor(hexRef);

    const maybeBinRef = visibility[0] ? binRef : undefined;
    const maybeDecRef = visibility[1] ? decRef : undefined;
    const maybeHexRef = visibility[2] ? hexRef : undefined;

    const binNextRef = maybeDecRef ?? maybeHexRef;
    const decPrevRef = maybeBinRef;
    const decNextRef = maybeHexRef;
    const hexPrevRef = maybeDecRef ?? maybeBinRef;

    const firstRef = maybeBinRef ?? maybeDecRef ?? maybeHexRef;
    const lastRef = maybeHexRef ?? maybeDecRef ?? maybeBinRef;

    useImperativeHandle(
      ref,
      () => ({
        focusFirst: () =>
          firstRef?.current ? ok(firstRef.current.focus()) : false,
        focusLast: () =>
          lastRef?.current ? ok(lastRef.current.focus()) : false,
        hasFocus: () =>
          binRef.current?.hasFocus() ||
          decRef.current?.hasFocus() ||
          hexRef.current?.hasFocus() ||
          false,
        isVisible: () => visibility.some((isVisible) => isVisible),
        moveDown: () =>
          binRef.current?.hasFocus()
            ? binNextRef?.current
              ? ok(binNextRef?.current.focus())
              : false
            : decRef.current?.hasFocus()
            ? decNextRef?.current
              ? ok(decNextRef?.current.focus())
              : false
            : false,
        moveUp: () =>
          hexRef.current?.hasFocus()
            ? hexPrevRef?.current
              ? ok(hexPrevRef?.current.focus())
              : false
            : decRef.current?.hasFocus()
            ? decPrevRef?.current
              ? ok(decPrevRef?.current.focus())
              : false
            : false,
      }),
      [binNextRef, decNextRef, decPrevRef, firstRef, hexPrevRef, lastRef],
    );

    const captionEncoding =
      visibility[0] || minCaptionEncoding === IntegerEncoding.Bin
        ? IntegerEncoding.Bin
        : visibility[1] || minCaptionEncoding === IntegerEncoding.Dec
        ? IntegerEncoding.Dec
        : visibility[2] || minCaptionEncoding === IntegerEncoding.Hex
        ? IntegerEncoding.Hex
        : minCaptionEncoding;

    const isCaptionSigned =
      captionEncoding !== undefined
        ? {
            [IntegerEncoding.Bin]: isSignedBin,
            [IntegerEncoding.Dec]: isSignedDec,
            [IntegerEncoding.Hex]: isSignedHex,
          }[captionEncoding]
        : false;

    return (
      <div class="IntegerInput">
        <>
          {shouldShowLine ? (
            <div class="IntegerInput_Line" />
          ) : (
            <>
              <div class="IntegerInput_Label">&nbsp;&nbsp;&nbsp;</div>
              <Caption
                encoding={captionEncoding}
                isSigned={isCaptionSigned}
                spaceFrequency={spaceFrequency}
                unit={unit}
              />
            </>
          )}

          <div class="IntegerInput_Visibility">
            <CheckGroup
              labels={visibilityLabels}
              onChange={onChangeVisibility}
              values={visibility}
            />
          </div>
        </>

        {visibility[0] && (
          <IntegerInputRow
            isPasteIconHidden={isPasteIconHidden}
            label={prefixBin}
            onCopy={binProps.copy}
            onPaste={binProps.paste}
          >
            <IntegerStringInput
              {...props}
              {...binProps}
              autoFocus={autoFocus}
              encoding={IntegerEncoding.Bin}
              isSigned={isSignedBin}
            />
          </IntegerInputRow>
        )}

        {visibility[1] && (
          <IntegerInputRow
            isPasteIconHidden={isPasteIconHidden}
            label={prefixDec}
            onCopy={decProps.copy}
            onPaste={decProps.paste}
          >
            <IntegerStringInput
              {...props}
              {...decProps}
              encoding={IntegerEncoding.Dec}
              isSigned={isSignedDec}
            />
          </IntegerInputRow>
        )}

        {visibility[2] && (
          <IntegerInputRow
            isPasteIconHidden={isPasteIconHidden}
            label={prefixHex}
            onCopy={hexProps.copy}
            onPaste={hexProps.paste}
          >
            <IntegerStringInput
              {...props}
              {...hexProps}
              encoding={IntegerEncoding.Hex}
              isSigned={isSignedHex}
            />
          </IntegerInputRow>
        )}
      </div>
    );
  },
);
