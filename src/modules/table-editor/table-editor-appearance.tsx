import { Eye, EyeOff } from "lucide-preact";
import { useCallback } from "preact/hooks";
import Button from "../../components/button";
import InputFile from "../../components/input-file";
import Setting from "../../components/setting";
import Slider from "../../components/slider";
import { toggle } from "../../utils";
import InputNumber from "../../components/input-number";
import ColorInput from "../../components/color-input";
import { Colors } from "../../models/color";
import { IntegerBoundsUnsigned, IntegerUnit } from "../../models/integer";
import {
  useTableEditorBackgroundImageFileName,
  useTableEditorBackgroundImageImage,
  useTableEditorBackgroundImageIsVisible,
  useTableEditorBackgroundImageOpacity,
  useTableEditorColorByValue,
  useTableEditorColorOpacity,
  useTableEditorSelectedValue,
} from "./store";

export default function TableEditorAppearance() {
  const [valueOrNaN, setValueOrNaN] = useTableEditorSelectedValue();
  const value = valueOrNaN || 0;

  const [valueColor, setValueColor] = useTableEditorColorByValue(value);
  const [colorOpacity, setColorOpacity] = useTableEditorColorOpacity();

  const [backgroundImageFileName, setBackgroundImageFileName] =
    useTableEditorBackgroundImageFileName();
  const [_backgroundImage, setBackgroundImage] =
    useTableEditorBackgroundImageImage();
  const [isBackgroundImageVisible, setIsBackgroundImageVisible] =
    useTableEditorBackgroundImageIsVisible();
  const [backgroundImageOpacity, setBackgroundImageOpacity] =
    useTableEditorBackgroundImageOpacity();

  const toggleIsBackgroundImageVisible = useCallback(() => {
    setIsBackgroundImageVisible(toggle);
  }, [setIsBackgroundImageVisible]);

  const setBackgroundImageFile = useCallback(
    (file: File | undefined) => {
      if (file) {
        setBackgroundImageFileName(file.name);
        setBackgroundImage(URL.createObjectURL(file));
      } else {
        setBackgroundImageFileName("");
        setBackgroundImage("");
      }
    },
    [setBackgroundImage, setBackgroundImageFileName],
  );

  const resetValueColor = useCallback(() => {
    setValueColor(Colors[value % Colors.length]!);
  }, [setValueColor, value]);

  return (
    <div class="App_SectionCol">
      <div class="App_SectionFullRow">
        <Setting label="Background Image">
          <div class="App_SectionCluster flex_1 overflow_hidden">
            <Button
              label={<EyeToggle isVisible={isBackgroundImageVisible} />}
              onClick={toggleIsBackgroundImageVisible}
              tooltip={isBackgroundImageVisible ? "Hide" : "Show"}
              tooltipPosition="right"
            />

            <InputFile
              fileName={backgroundImageFileName}
              onChange={setBackgroundImageFile}
              placeholder="Upload image"
            />
          </div>
        </Setting>

        <Setting label="Background Image Opacity">
          <Slider
            max={100}
            min={0}
            onChange={setBackgroundImageOpacity}
            step={1}
            value={backgroundImageOpacity}
          />
        </Setting>
      </div>

      <div class="App_SectionFullRow">
        <Setting label="Decimal Value Color">
          <div class="App_SectionCluster flex_1 flex-wrap_wrap">
            <InputNumber
              isInteger
              max={IntegerBoundsUnsigned[IntegerUnit.Word].max}
              min={0}
              onChange={setValueOrNaN}
              placeholder="0"
              value={valueOrNaN}
            />

            <ColorInput onChange={setValueColor} value={valueColor} />

            <Button label="Reset" onClick={resetValueColor} />
          </div>
        </Setting>

        <Setting label="Color Opacity">
          <Slider
            max={100}
            min={0}
            onChange={setColorOpacity}
            step={1}
            value={colorOpacity}
          />
        </Setting>
      </div>
    </div>
  );
}

const EyeToggle = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? <Eye size="1em" /> : <EyeOff size="1em" />;
