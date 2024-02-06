import Tutorial, {
  TutorialAction,
  TutorialSetting,
} from "../../components/tutorial";
import { useTableEditorTabTutorialIsVisible } from "./store";

const actions: TutorialAction[] = [
  {
    name: "Copy",
    description:
      "Copy the table to the clipboard via the copy icon button on the top right of the grid. The table will be formatted according to its settings.",
    keybindings: ["Ctrl+C", "Cmd+C"],
  },
  {
    name: "Paste",
    description:
      'Paste an ASM table from the clipboard into the tool via the paste icon button on the top right of the grid. Every row of the table has to start either with "db" or "dw", no mixed values are admitted. Every row must have the same number of elements. One label is admitted and, if present, will be used as table name. No other ASM code is allowed. Comments will be removed. Any error will cause the operation to fail and display a message below the icon buttons.',
    keybindings: ["Ctrl+V", "Cmd+V"],
  },
  {
    name: "Clear",
    description:
      "Clear the grid by pressing the X icon button. Clearing the grid sets all values to zero.",
    keybindings: [],
  },
  {
    name: "Type",
    description: "Type a valid digit to edit selected cells.",
    keybindings: ["Digit"],
  },
  {
    name: "Backspace (⌫)",
    description: "Delete the last typed digit in the selection.",
    keybindings: [],
  },
  {
    name: "Delete (DEL)",
    description: "It sets the value of the selection to zero.",
    keybindings: [],
  },
  {
    name: "Movement",
    description: "Select the next cell in the corresponding direction.",
    keybindings: ["Arrow"],
  },
  {
    name: "Multi-Selection",
    description: "Select multiple groups of cells at once.",
    keybindings: ["Shift", "Ctrl", "Cmd"],
  },
];

const settings: TutorialSetting[] = [
  {
    name: "Encoding",
    values: [
      {
        type: "Bin",
        description: "Display table values in binary form.",
      },
      {
        type: "Dec",
        description: "Display table values in decimal form.",
      },
      {
        type: "Hex",
        description: "Display table values in hexadecimal form.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Unit",
    values: [
      {
        type: "Byte",
        description:
          "Display table values in 8-bit. The high byte is preserved and restored once switching back to 16-bit.",
        keybindings: ["Y"],
      },
      {
        type: "Word",
        description: "Display table values in 16-bit.",
        keybindings: ["W"],
      },
    ],
  },
  {
    name: "Width",
    values: [
      {
        type: "#Number",
        description:
          "Number of columns of the table. If you shrink then expand the table again, the previous column values will be restored.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Height",
    values: [
      {
        type: "#Number",
        description:
          "Number of rows of the table. If you shrink then expand the table again, the previous row values will be restored.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Table Name",
    values: [
      {
        type: "#Text",
        description:
          "Name (label) of the table. The table name can only contain letters, digits, and underscores, it cannot start with a digit, and it can start with any number of periods.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Column Comment",
    values: [
      {
        type: "None",
        description: "No comment will be added.",
      },
      {
        type: "Column Number (dec)",
        description:
          "A comment line will be added on top of the table values when copied, with the index of the column (in decimal) aligned with each column.",
      },
      {
        type: "Column Number (hex)",
        description:
          "A comment line will be added on top of the table values when copied, with the index of the column (in hexadecimal) aligned with each column.",
      },
      {
        type: "Column Value (hex)",
        description:
          "A comment line will be added on top of the table values when copied, with the value of the column aligned with each column. The value of the column is the column index if the unit is byte, and the column index times two if the unit is word.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Row Comment",
    values: [
      {
        type: "None",
        description: "No comment will be added.",
      },
      {
        type: "Row Number (dec)",
        description:
          "A comment will be added next to each row when copied, with the index of the row (in decimal).",
      },
      {
        type: "Row Number (hex)",
        description:
          "A comment will be added next to each row when copied, with the index of the row (in hexadecimal).",
      },
      {
        type: "Row Range (hex)",
        description:
          'A comment will be added next to each row when copied, with the range of values covered by the row. E.g., for the second row of a table of width 8 it will be "8-F".',
      },
    ],
    keybindings: [],
  },
  {
    name: "Indentation",
    values: [
      {
        type: "#Number",
        description:
          "Number of spaces to prepend to each row while copying it.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Space Values",
    values: [
      {
        type: "Yes",
        description:
          "Add a space between each value on a row while copying the table.",
      },
      {
        type: "No",
        description:
          "Don't add a space between each value on a row while copying the table.",
      },
    ],
    keybindings: [],
  },
];

const appearance: TutorialSetting[] = [
  {
    name: "Background Image",
    values: [
      {
        type: "#File",
        description:
          "An image to display as background for the table. You can toggle the image visibility with the icon button.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Background Image Opacity",
    values: [
      {
        type: "#Number",
        description: "Opacity for the background image.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Decimal Value Color",
    values: [
      {
        type: "#Number+Color",
        description:
          "Background color for cells with the specified value. Every value has a corresponding color that's useful to distinguish blocks of values. Selecting a cell in the table will set its value in this editor. Use the reset button to restore the default color for the value.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Color Opacity",
    values: [
      {
        type: "#Number",
        description:
          "Opacity for the background background colors of the cells.",
      },
    ],
    keybindings: [],
  },
];

const visibility: TutorialAction[] = [
  {
    name: "Settings",
    description: "Toggle settings tab visibility.",
    keybindings: ["S"],
  },
  {
    name: "Appearance",
    description: "Toggle appearance tab visibility.",
    keybindings: ["T"],
  },
  {
    name: "Instructions",
    description: "Toggle instructions tab visibility.",
    keybindings: ["H"],
  },
];

export default function TableEditorTutorial() {
  const [isTabTutorialVisible, setIsTabTutorialVisible] =
    useTableEditorTabTutorialIsVisible();

  return (
    <Tutorial
      isVisible={isTabTutorialVisible}
      onChangeVisibility={setIsTabTutorialVisible}
    >
      <Tutorial.Section title="General">
        <div>
          Click on the table to select cells and type to modify them. You can
          use the icon buttons on the top right of the grid to copy, paste, and
          clear the table.
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="Actions">
        <div>
          Actions that can be performed while something is selected in the
          table.
        </div>
        <Tutorial.Actions actions={actions} />
      </Tutorial.Section>

      <Tutorial.Section title="Settings">
        <div>Settings used for visualization and for exporting the table.</div>
        <Tutorial.Settings settings={settings} />
      </Tutorial.Section>

      <Tutorial.Section title="Appearance">
        <div>Settings used for visualization only.</div>
        <Tutorial.Settings settings={appearance} />
      </Tutorial.Section>

      <Tutorial.Section title="Visibility">
        <div>Shortcuts to toggle sections' visibility.</div>
        <Tutorial.Actions actions={visibility} />
      </Tutorial.Section>
    </Tutorial>
  );
}
