import { useCallback } from "preact/hooks";
import { Eye, EyeOff } from "lucide-preact";
import Button from "../../components/button";
import InputFile from "../../components/input-file";
import Setting from "../../components/setting";
import { toggle } from "../../utils";
import {
  useTableEditorBackgroundImageFileName,
  useTableEditorBackgroundImageImage,
  useTableEditorBackgroundImageIsVisible,
} from "./store";

const EyeToggle = ({ isVisible }: { isVisible: boolean }) =>
  isVisible ? <Eye size="1em" /> : <EyeOff size="1em" />;

export default function AppEditorSettingBackgroundImage() {
  const [backgroundImageFileName, setBackgroundImageFileName] =
    useTableEditorBackgroundImageFileName();

  const [_backgroundImage, setBackgroundImage] =
    useTableEditorBackgroundImageImage();

  const [isBackgroundImageVisible, setIsBackgroundImageVisible] =
    useTableEditorBackgroundImageIsVisible();

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

  return (
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
  );
}
