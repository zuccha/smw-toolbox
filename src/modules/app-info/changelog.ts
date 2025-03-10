import { ChangelogRelease } from "../../components/changelog";

const changelog: ChangelogRelease[] = [
  {
    version: "1.2.1",
    date: "2025-03-05",
    fixed: [
      "<b>Table Editor:</b> Correctly compute instruction cycles based on direct page low byte and X page boundary cross.",
    ],
  },
  {
    version: "1.2.0",
    date: "2025-03-04",
    added: [
      "<b>Table Editor:</b> Add <kbd>Ctrl+M</kbd> hotkey to run emulator, in addition to the existing <kbd>Ctrl+E</kbd>, to make it usable on Edge.",
    ],
    fixed: [
      "<b>Table Editor:</b> Add -x modifier to CPX and CPY length description.",
    ],
  },
  {
    version: "1.1.0",
    date: "2024-10-03",
    changed: [
      "<b>Table Editor:</b> Move actions into section header.",
    ],
    fixed: [
      "Restore small-caps in non-collapsible section headers.",
    ],
    removed: [
      "<b>Table Editor:</b> Remove table above table.",
    ],
  },
  {
    version: "1.0.1",
    date: "2024-09-08",
    fixed: [
      "Fix broken small-caps by replacing Inter with system font.",
    ],
  },
  {
    version: "1.0.0",
    date: "2024-02-06",
    added: [
      "Add <b>Calculator</b> widget to display and edit numbers in binary, decimal, and hexadecimal formats.",
      "<b>Calculator:</b> Add Button and hotkey (<kbd>Ctrl+C</kbd>) to copy the selected value to the clipboard.",
      "<b>Calculator:</b> Add Button and hotkey (<kbd>Ctrl+V</kbd>) to paste the selected value from the clipboard.",
      "<b>Calculator:</b> Add Hotkey (<kbd>Space/Shift+Space</kbd>) to increment/decrement the selected digit by 1.",
      "<b>Calculator:</b> Add Hotkey (<kbd>&lt;/&gt;</kbd>) to shift the selected value left and right.",
      "<b>Calculator:</b> Add Hotkey (<kbd>{/}</kbd>) to rotate the selected value left and right.",
      "<b>Calculator:</b> Add Hotkey (<kbd>!</kbd>) to negate the selected value.",
      "<b>Calculator:</b> Add Hotkey (<kbd>Shift+Backspace/Shift+Delete</kbd>) to clear the selected value.",
      "<b>Calculator:</b> Add Setting and hotkey (<kbd>Q</kbd>) to toggle advanced mode, which allows to perform operations between two values.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>+</kbd>) to switch to addition operation.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>-</kbd>) to switch to subtraction operation.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>&</kbd>) to switch to logical AND operation.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>|</kbd>) to switch to logical OR operation.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>^</kbd>) to switch to logical XOR operation.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>=</kbd>) to move the result of the operation in operand 2.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>;</kbd>) to swap the two operands.",
      "<b>Calculator (advanced):</b> Add Hotkey (<kbd>Ctrl+Backspace/Ctrl+Delete</kbd>) to clear all operands.",
      "<b>Calculator:</b> Add Buttons to toggle values' visibility.",
      "<b>Calculator:</b> Add Setting and hotkeys (<kbd>Y/W</kbd>) to choose between byte (8 bits) or word (16 bits).",
      "<b>Calculator:</b> Add Setting and hotkeys (<kbd>I/O</kbd>) to choose how digits are inserted while typing (insert or overwrite).",
      "<b>Calculator:</b> Add Setting and hotkeys (<kbd>L/R</kbd>) to choose typing direction (left or right).",
      "<b>Calculator:</b> Add Setting and hotkey (<kbd>M</kbd>) to disable movement after typing a digit.",
      "<b>Calculator:</b> Add Setting and hotkey (<kbd>T</kbd>) to flip binary bits when clicking on a digit.",
      "<b>Calculator:</b> Add Setting to customize caret appearance (bar, box, underline).",
      "<b>Calculator:</b> Add Setting and hotkey (<kbd>N</kbd>) to display values as signed (they can be negative). The hotkey works only for decimals.",
      "<b>Calculator:</b> Add Setting to add some space every 4 or 8 digits.",
      "<b>Calculator:</b> Add Setting to display an on-screen keyboard, in compact or full mode (on mobile it's always in full mode).",
      "<b>Calculator:</b> Add Instructions detailing actions, operations, and settings, with their corresponding keybindings.",
      "Add <b>Table Editor</b> widget to edit an ASM data table.",
      "<b>Table Editor:</b> Add Multi-selection while holding <kbd>Shift/Ctrl/Cmd</kbd>.",
      "<b>Table Editor:</b> Add Background colors for cells, with every value having a different corresponding color.",
      "<b>Table Editor:</b> Add Button and hotkey (<kbd>Ctrl+C</kbd>) to copy the content of the table into the clipboard.",
      "<b>Table Editor:</b> Add Button and hotkey (<kbd>Ctrl+V</kbd>) to paste the content of the clipboard into the table.",
      "<b>Table Editor:</b> Add Arrow movement in the table.",
      "<b>Table Editor:</b> Add Setting to display the values in binary, decimal, or hexadecimal format.",
      "<b>Table Editor:</b> Add Setting and hotkey (<kbd>Y/W</kbd>) to choose between byte (8 bits) or word (16 bits).",
      "<b>Table Editor:</b> Add Settings to customize the width and height of the table (min 1x1, max 50x50).",
      "<b>Table Editor:</b> Add Setting to customize the table's name.",
      "<b>Table Editor:</b> Add Setting to choose the comment type for columns (number dec, number hex, value hex), applied on paste to clipboard.",
      "<b>Table Editor:</b> Add Setting to choose the comment type for rows (number dec, number hex, range hex), applied on paste to clipboard.",
      "<b>Table Editor:</b> Add Setting to choose the indentation for rows, applied on paste to clipboard.",
      "<b>Table Editor:</b> Add Setting to choose whether to add a space between row values or not, applied on paste to clipboard.",
      "<b>Table Editor:</b> Add Setting to select a background image for the table.",
      "<b>Table Editor:</b> Add Setting to toggle the background image's visibility.",
      "<b>Table Editor:</b> Add Setting to control the background image's opacity.",
      "<b>Table Editor:</b> Add Setting to change the background color associated with a decimal value.",
      "<b>Table Editor:</b> Add Button to reset the background color associated with a decimal value to its default.",
      "<b>Table Editor:</b> Add Setting to control the background color's opacity.",
      "<b>Table Editor:</b> Add An on-screen keyboard, visible only on mobile",
      "<b>Table Editor:</b> Add Instructions detailing actions and settings, with their corresponding keybindings.",
      "Add <b>App Settings</b> tab defining settings that affect all widgets.",
      "<b>App Settings:</b> Add Setting to enable/disable (most) hotkeys.",
      "<b>App Settings:</b> Add Setting to select between system, dark, or light mode.",
      "<b>App Settings:</b> Add Setting to select color palette for accents, including the disco palette.",
      "<b>App Settings:</b> Add Button to reset all settings and data.",
      "Add <b>App Info</b> tab containing generic information about the application.",
      "<b>App Info:</b> Add Info section with app name, version, date, and author, and link to source code.",
      "<b>App Info:</b> Add Changelog.",
      "<b>App Info:</b> Add License.",
      "Add hotkeys (<kbd>Ctrl+Digit</kbd>) to select tab.",
      "Add hotkeys (<kbd>Tab/Shift+Tab</kbd>) to navigate through focusable elements.",
      "Add navigation through URL tags.",
    ],
  },
];

export default changelog;
