import useStore, {
  useStoreBoolean,
  useStoreNumber,
  useStoreString,
} from "../../hooks/use-store";
import { Colors } from "../../models/color";
import {
  IntegerEncoding,
  IntegerEncodingSchema,
  IntegerUnit,
  IntegerUnitSchema,
} from "../../models/integer";
import {
  IntegerDataRowCommentType,
  IntegerDataRowCommentTypeSchema,
} from "../../models/integer-data-row";
import {
  IntegerTableColumnCommentType,
  IntegerTableColumnCommentTypeSchema,
} from "../../models/integer-table";

export const tableEditorId = "TableEditor";

export const useTableEditorBackgroundImageFileName = () =>
  useStoreString(`${tableEditorId}.backgroundImage.fileName`, "");

export const useTableEditorBackgroundImageImage = () =>
  useStoreString(`${tableEditorId}.backgroundImage.image`, "");

export const useTableEditorBackgroundImageIsVisible = () =>
  useStoreBoolean(`${tableEditorId}.backgroundImage.isVisible`, true);

export const useTableEditorBackgroundImageOpacity = () =>
  useStoreNumber(`${tableEditorId}.backgroundImage.opacity`, 25);

export const useTableEditorColorByValue = (value: number) =>
  useStoreString(
    `${tableEditorId}.color.value[${value}]`,
    Colors[value % Colors.length]!,
  );

export const useTableEditorColorOpacity = () =>
  useStoreNumber(`${tableEditorId}.color.opacity`, 0);

export const useTableEditorColumnCommentType = () =>
  useStore(
    `${tableEditorId}.columnCommentType`,
    IntegerTableColumnCommentType.None,
    IntegerTableColumnCommentTypeSchema.parse,
  );

export const useTableEditorEncoding = () =>
  useStore(
    "TableEditor.table.encoding",
    IntegerEncoding.Hex,
    IntegerEncodingSchema.parse,
  );

export const useTableEditorIndentation = () =>
  useStoreNumber(`${tableEditorId}.indentation`, 0);

export const useTableEditorName = () =>
  useStoreString(`${tableEditorId}.name`, "");

export const useTableEditorRowCommentType = () =>
  useStore(
    `${tableEditorId}.rowCommentType`,
    IntegerDataRowCommentType.None,
    IntegerDataRowCommentTypeSchema.parse,
  );

export const useTableEditorSelectedValue = () =>
  useStoreNumber(`${tableEditorId}.selectedValue`, 0);

export const useTableEditorShouldSpaceValues = () =>
  useStoreBoolean(`${tableEditorId}.shouldSpaceValues`, false);

export const useTableEditorSizeHeight = () =>
  useStoreNumber(`${tableEditorId}.size.height`, 16);

export const useTableEditorSizeWidth = () =>
  useStoreNumber(`${tableEditorId}.size.width`, 16);

export const useTableEditorTabAppearanceIsVisible = () =>
  useStoreBoolean(`${tableEditorId}.tab.appearance.isVisible`, true);

export const useTableEditorTabSettingsIsVisible = () =>
  useStoreBoolean(`${tableEditorId}.tab.settings.isVisible`, true);

export const useTableEditorTabTutorialIsVisible = () =>
  useStoreBoolean(`${tableEditorId}.tab.tutorial.isVisible`, false);

export const useTableEditorUnit = () =>
  useStore(`${tableEditorId}.unit`, IntegerUnit.Byte, IntegerUnitSchema.parse);
