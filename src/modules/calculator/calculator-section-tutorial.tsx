import Tutorial, {
  TutorialAction,
  TutorialSetting,
} from "../../components/tutorial";
import { useCalculatorTabTutorialIsVisible } from "./store";

const baseActions: TutorialAction[] = [
  {
    name: "Type",
    description:
      "Type a valid digit in the editor. The digit will either be inserted to the right of the cursor, or replace the selected digit depending on which typing mode is selected. Afterwards, the cursor moves to the right.",
    keybindings: ["Digit"],
  },
  {
    name: "Delete (DEL)",
    description: "Delete the digit on the right of the cursor.",
    keybindings: ["Delete"],
  },
  {
    name: "Backspace (⌫)",
    description:
      "Delete the digit on the left of the cursor, then move the cursor to the left. If the cursors is already all the way to the left, then it will behave like Delete.",
    keybindings: ["Backspace"],
  },
  {
    name: "Negate (NEG)",
    description:
      "If the selected editor is negative it becomes positive and vice-versa.",
    keybindings: ["!"],
  },
  {
    name: "Shift Left («)",
    description:
      "Shift the digits of the selected editor to the left. The left-most digit is lost.",
    keybindings: ["<"],
  },
  {
    name: "Shift Right (»)",
    description:
      "Shift the digits of the selected editor to the right. The right-most digit is lost.",
    keybindings: [">"],
  },
  {
    name: "Rotate Left (ROL)",
    description:
      "Shift the digits of the selected editor to the left. The left-most digit is carried on the right side.",
    keybindings: ["{"],
  },
  {
    name: "Rotate Right (ROR)",
    description:
      "Shift the digits of the selected editor to the right. The right-most digit is carried on the left side.",
    keybindings: ["}"],
  },
  {
    name: "Clear (Cl)",
    description: "Set the value of the selected editor to zero.",
    keybindings: ["Shift+Backspace", "Shift+Delete"],
  },
  {
    name: "Increase (INC)",
    description:
      "Increase the selected digit by one. It wraps around if it exceeds the maximum. In binary, this is the equivalent of a bit flip.",
    keybindings: ["Space"],
  },
  {
    name: "Decrease (DEC)",
    description:
      "Decrease the selected digit by one. It wraps around if it goes below zero. In binary, this is the equivalent of a bit flip.",
    keybindings: ["Shift+Space"],
  },
  {
    name: "Movement",
    description: "Move across editors.",
    keybindings: ["Arrow"],
  },
  {
    name: "Navigate",
    keybindings: ["TAB", "Shift+Tab"],
    description: "Navigate to the next/previous focusable element.",
  },
  {
    name: "Copy",
    keybindings: ["Ctrl+C", "Cmd+C"],
    description:
      "Copy the value of the focused editor in the clipboard. You can also use the button on the right of the editor.",
  },
  {
    name: "Paste",
    keybindings: ["Ctrl+V", "Cmd+V"],
    description:
      "Paste a value from the clipboard in the focused editor. You can also use the button on the right of the editor. It won't do anything if the clipboard doesn't contain a valid value.",
  },
];

const advancedActions: TutorialAction[] = [
  {
    name: "Add (+)",
    description: "Add the two operands together.",
    keybindings: ["+"],
  },
  {
    name: "Subtract (-)",
    description: "Subtract operand 2 from operand 1.",
    keybindings: ["-"],
  },
  {
    name: "AND",
    description: "Logical AND between the two operands.",
    keybindings: ["&"],
  },
  {
    name: "OR",
    description: "Logical OR between the two operands.",
    keybindings: ["|"],
  },
  {
    name: "XOR",
    description: "Logical XOR between the two operands.",
    keybindings: ["^"],
  },
  {
    name: "Finalize (=)",
    description: "Transfer the result in operand 2.",
    keybindings: ["="],
  },
  {
    name: "Clear All (CA)",
    description: "Clear all values (set them to 0).",
    keybindings: ["Ctrl+Backspace", "Ctrl+Delete"],
  },
  {
    name: "Swap Operands (SWAP)",
    description: "Swap operand 1 with operand 2.",
    keybindings: [";"],
  },
];

const settings: TutorialSetting[] = [
  // Functionalities
  {
    name: "Advanced",
    values: [
      {
        type: "On",
        description: "Calculator mode.",
      },
      {
        type: "Off",
        description: "Converter-only mode.",
      },
    ],
    keybindings: ["Q"],
  },
  {
    name: "Unit",
    values: [
      {
        type: "Byte",
        description:
          "8-bit editing mode. The high byte is preserved and restored once switching back to 16-bit.",
        keybindings: ["Y"],
      },
      {
        type: "Word",
        description: "16-bit editing mode.",
        keybindings: ["W"],
      },
    ],
  },
  {
    name: "Keyboard",
    values: [
      {
        type: "None",
        description: "Display no keyboard.",
      },
      {
        type: "Compact",
        description: "Display keys corresponding to different operations.",
      },
      {
        type: "Full",
        description:
          "Display all keys, including digits and arrows. This is a forced option on mobile.",
      },
    ],
    keybindings: [],
  },
  // Typing & Cursor
  {
    name: "Typing Mode",
    values: [
      {
        type: "Insert",
        description: "Insert the typed digit where the cursor is.",
        keybindings: ["I"],
      },
      {
        type: "Overwrite",
        description: "Replace the selected digit with the typed digit.",
        keybindings: ["O"],
      },
    ],
  },
  {
    name: "Typing Direction",
    values: [
      {
        type: "Left",
        description:
          "Move the cursors to the left after typing. Backspace moves to the right.",
        keybindings: ["L"],
      },
      {
        type: "Right",
        description:
          "Move the cursors to the right after typing. Backspace moves to the left.",
        keybindings: ["R"],
      },
    ],
  },
  {
    name: "Move Cursor",
    values: [
      {
        type: "On",
        description: "Move cursor after typing.",
      },
      {
        type: "Off",
        description: "Don't move cursor after typing.",
      },
    ],
    keybindings: ["M"],
  },
  {
    name: "Flip Bit",
    values: [
      {
        type: "On",
        description: "Flip a bit of the binary editor when clicking on it.",
      },
      {
        type: "Off",
        description: "Don't flip any bit when clicking on the editors.",
      },
    ],
    keybindings: ["T"],
  },
  // Signed
  {
    name: "Signed Binary",
    values: [
      {
        type: "On",
        description: "Binary numbers are signed (they can be negative).",
      },
      {
        type: "Off",
        description: "Binary numbers are always positive.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Signed Decimal",
    values: [
      {
        type: "On",
        description: "Decimal numbers are signed (they can be negative).",
      },
      {
        type: "Off",
        description: "Decimal numbers are always positive.",
      },
    ],
    keybindings: ["N"],
  },
  {
    name: "Signed Hexadecimal",
    values: [
      {
        type: "On",
        description: "Hexadecimal numbers are signed (they can be negative).",
      },
      {
        type: "Off",
        description: "Hexadecimal numbers are always positive.",
      },
    ],
    keybindings: [],
  },
  // Appearance
  {
    name: "Caret",
    values: [
      {
        type: "Bar",
        description:
          "Display a bar between digits, to the left of the selected digit.",
      },
      {
        type: "Box",
        description: "Display a box around the selected digit.",
      },
      {
        type: "Underline",
        description: "Display a dash below the selected digit.",
      },
    ],
    keybindings: [],
  },
  {
    name: "Space Frequency",
    values: [
      {
        type: "None",
        description: "No space between digits.",
      },
      {
        type: "8 Digits",
        description: "Add a space every 8 digits.",
      },
      {
        type: "4 Digits",
        description: "Add a space every 4 digits.",
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
    name: "Instructions",
    description: "Toggle instructions tab visibility.",
    keybindings: ["H"],
  },
];

export default function CalculatorSectionTutorial() {
  const [isTabTutorialVisible, setIsTabTutorialVisible] =
    useCalculatorTabTutorialIsVisible();

  return (
    <Tutorial
      isVisible={isTabTutorialVisible}
      onChangeVisibility={setIsTabTutorialVisible}
    >
      <Tutorial.Section title="General">
        <div>
          Click on a number to edit it. In a group (bin/dec/hex), the numbers
          are connected, editing one will cause the others to update. To hide
          numbers, click on the three toggle buttons on the top-right of the
          group.
        </div>
        <div>
          The calculator can be in two modes: <i>basic</i> or <i>advanced</i>.
          Basic mode allows to insert one value and instantly see it's binary,
          decimal, and hexadecimal counterparts. Advanced mode allows to
          performs basic logical and arithmetical operations between two values.
        </div>
      </Tutorial.Section>

      <Tutorial.Section title="Basic Actions">
        <div>
          Actions that can be performed while an editor is selected. Between
          parenthesis, you find the equivalent of the command on the visual
          keyboard.
        </div>
        <Tutorial.Actions actions={baseActions} />
      </Tutorial.Section>

      <Tutorial.Section title="Advanced Mode">
        <div>
          Calculator mode allows to perform operations between two values. The
          widget is divided in three groups (separated by lines): the first two
          are the operands, the last one holds the result of the operation (it
          cannot be modified manually).
        </div>
        <Tutorial.Actions actions={advancedActions} />
      </Tutorial.Section>

      <Tutorial.Section title="Settings">
        <div>
          Settings to customize the appearance and behavior of the calculator.
        </div>
        <Tutorial.Settings settings={settings} />
      </Tutorial.Section>

      <Tutorial.Section title="Visibility">
        <div>Shortcuts to toggle sections' visibility.</div>
        <Tutorial.Actions actions={visibility} />
      </Tutorial.Section>
    </Tutorial>
  );
}
