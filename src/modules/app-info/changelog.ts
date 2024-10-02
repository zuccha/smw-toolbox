import { ChangelogRelease } from "../../components/changelog";

const changelog: ChangelogRelease[] = [
  {
    version: "1.2.0",
    date: "Unreleased",
    added: [
      "Add <b>Emulator</b> widget to write, assemble, and execute ASM code.",
      "<b>Emulator:</b> Add code editor with syntax highlight.",
      "<b>Emulator:</b> Add button and hotkey (<kbd>Ctrl+E</kbd>) to assemble and execute ASM code.",
      "<b>Emulator:</b> Support all opcodes during compilation.",
      "<b>Emulator:</b> Support defining labels and using them in instructions during compilation.",
      "<b>Emulator:</b> Support defining data tables during compilation.",
      "<b>Emulator:</b> Support multiple instructions on the same line during compilation.",
      "<b>Emulator:</b> Allow to configure the maximum number of instructions to execute.",
      "<b>Emulator:</b> Allow to configure the initial state of the processor.",
      "<b>Emulator:</b> Execute all opcodes, but interrupt-related ones, during emulation.",
      "<b>Emulator:</b> Display the result of the execution instruction-by-instruction.",
      "<b>Emulator:</b> Display the bare instruction (all args in hexadecimal) for each instruction.",
      "<b>Emulator:</b> Display the state of the processor, cycles taken, and amount of bytes for each instruction.",
      "<b>Emulator:</b> Show the instruction's bytes and effective address (if applicable) on hover.",
      "<b>Emulator:</b> Display the total amount of cycles and bytes.",
      "<b>Emulator:</b> Highlight registers that changed compared to the previous instruction.",
      "<b>Emulator:</b> Show registers' values in decimal, binary, and hexadecimal on hover.",
      "<b>Emulator:</b> Dim registers' high bytes when in 8-bit mode and cleared processor flags.",
      "<b>Emulator:</b> Display the state of memory at the end of execution.",
      "<b>Emulator:</b> Display the state of memory at a given instruction by selecting it.",
      "<b>Emulator:</b> Add input to manually specify which memory address to display.",
      "<b>Emulator:</b> Add buttons to decrement/increment the memory address to display by 0x10.",
      "<b>Emulator:</b> Add buttons to select beginning of RAM, beginning of ROM, and Stack Pointer",
      "<b>Emulator:</b> Highlight Stack Pointer in memory view.",
      "<b>Emulator:</b> Dim uninitialized addresses in memory view.",
      "<b>Emulator:</b> Allow to search opcodes by mnemonic, displaying hex, mode, example, affected flags, cycles, and length.",
      "<b>Emulator:</b> Add instructions detailing the emulator's usage.",
    ],
    changed: ["<b>Table Editor:</b> Move actions into section header."],
    fixed: ["Restore small-caps in non-collapsible section headers."],
    removed: ["<b>Table Editor:</b> Remove table name above table."],
  },
  {
    version: "1.0.1",
    date: "2024-09-08",
    fixed: ["Fix broken small-caps by replacing Inter with system font."],
  },
  {
    version: "1.0.0",
    date: "2024-02-06",
    added: [
      "Add <b>Calculator</b> widget to display and edit numbers in binary, decimal, and hexadecimal formats.",
      "<b>Calculator:</b> Add button and hotkey (<kbd>Ctrl+C</kbd>) to copy the selected value to the clipboard.",
      "<b>Calculator:</b> Add button and hotkey (<kbd>Ctrl+V</kbd>) to paste the selected value from the clipboard.",
      "<b>Calculator:</b> Add hotkey (<kbd>Space/Shift+Space</kbd>) to increment/decrement the selected digit by 1.",
      "<b>Calculator:</b> Add hotkey (<kbd>&lt;/&gt;</kbd>) to shift the selected value left and right.",
      "<b>Calculator:</b> Add hotkey (<kbd>{/}</kbd>) to rotate the selected value left and right.",
      "<b>Calculator:</b> Add hotkey (<kbd>!</kbd>) to negate the selected value.",
      "<b>Calculator:</b> Add hotkey (<kbd>Shift+Backspace/Shift+Delete</kbd>) to clear the selected value.",
      "<b>Calculator:</b> Add setting and hotkey (<kbd>Q</kbd>) to toggle advanced mode, which allows to perform operations between two values.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>+</kbd>) to switch to addition operation.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>-</kbd>) to switch to subtraction operation.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>&</kbd>) to switch to logical AND operation.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>|</kbd>) to switch to logical OR operation.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>^</kbd>) to switch to logical XOR operation.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>=</kbd>) to move the result of the operation in operand 2.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>;</kbd>) to swap the two operands.",
      "<b>Calculator (advanced):</b> Add hotkey (<kbd>Ctrl+Backspace/Ctrl+Delete</kbd>) to clear all operands.",
      "<b>Calculator:</b> Add buttons to toggle values' visibility.",
      "<b>Calculator:</b> Add setting and hotkeys (<kbd>Y/W</kbd>) to choose between byte (8 bits) or word (16 bits).",
      "<b>Calculator:</b> Add setting and hotkeys (<kbd>I/O</kbd>) to choose how digits are inserted while typing (insert or overwrite).",
      "<b>Calculator:</b> Add setting and hotkeys (<kbd>L/R</kbd>) to choose typing direction (left or right).",
      "<b>Calculator:</b> Add setting and hotkey (<kbd>M</kbd>) to disable movement after typing a digit.",
      "<b>Calculator:</b> Add setting and hotkey (<kbd>T</kbd>) to flip binary bits when clicking on a digit.",
      "<b>Calculator:</b> Add setting to customize caret appearance (bar, box, underline).",
      "<b>Calculator:</b> Add setting and hotkey (<kbd>N</kbd>) to display values as signed (they can be negative). The hotkey works only for decimals.",
      "<b>Calculator:</b> Add setting to add some space every 4 or 8 digits.",
      "<b>Calculator:</b> Add setting to display an on-screen keyboard, in compact or full mode (on mobile it's always in full mode).",
      "<b>Calculator:</b> Add instructions detailing actions, operations, and settings, with their corresponding keybindings.",
      "Add <b>Table Editor</b> widget to edit an ASM data table.",
      "<b>Table Editor:</b> Add Multi-selection while holding <kbd>Shift/Ctrl/Cmd</kbd>.",
      "<b>Table Editor:</b> Add Background colors for cells, with every value having a different corresponding color.",
      "<b>Table Editor:</b> Add button and hotkey (<kbd>Ctrl+C</kbd>) to copy the content of the table into the clipboard.",
      "<b>Table Editor:</b> Add button and hotkey (<kbd>Ctrl+V</kbd>) to paste the content of the clipboard into the table.",
      "<b>Table Editor:</b> Add Arrow movement in the table.",
      "<b>Table Editor:</b> Add setting to display the values in binary, decimal, or hexadecimal format.",
      "<b>Table Editor:</b> Add setting and hotkey (<kbd>Y/W</kbd>) to choose between byte (8 bits) or word (16 bits).",
      "<b>Table Editor:</b> Add settings to customize the width and height of the table (min 1x1, max 50x50).",
      "<b>Table Editor:</b> Add setting to customize the table's name.",
      "<b>Table Editor:</b> Add setting to choose the comment type for columns (number dec, number hex, value hex), applied on paste to clipboard.",
      "<b>Table Editor:</b> Add setting to choose the comment type for rows (number dec, number hex, range hex), applied on paste to clipboard.",
      "<b>Table Editor:</b> Add setting to choose the indentation for rows, applied on paste to clipboard.",
      "<b>Table Editor:</b> Add setting to choose whether to add a space between row values or not, applied on paste to clipboard.",
      "<b>Table Editor:</b> Add setting to select a background image for the table.",
      "<b>Table Editor:</b> Add setting to toggle the background image's visibility.",
      "<b>Table Editor:</b> Add setting to control the background image's opacity.",
      "<b>Table Editor:</b> Add setting to change the background color associated with a decimal value.",
      "<b>Table Editor:</b> Add button to reset the background color associated with a decimal value to its default.",
      "<b>Table Editor:</b> Add setting to control the background color's opacity.",
      "<b>Table Editor:</b> Add an on-screen keyboard, visible only on mobile",
      "<b>Table Editor:</b> Add instructions detailing actions and settings, with their corresponding keybindings.",
      "Add <b>App Settings</b> tab defining settings that affect all widgets.",
      "<b>App Settings:</b> Add setting to enable/disable (most) hotkeys.",
      "<b>App Settings:</b> Add setting to select between system, dark, or light mode.",
      "<b>App Settings:</b> Add setting to select color palette for accents, including the disco palette.",
      "<b>App Settings:</b> Add button to reset all settings and data.",
      "Add <b>App Info</b> tab containing generic information about the application.",
      "<b>App Info:</b> Add info section with app name, version, date, and author, and link to source code.",
      "<b>App Info:</b> Add changelog.",
      "<b>App Info:</b> Add license.",
      "Add hotkeys (<kbd>Ctrl+Digit</kbd>) to select tab.",
      "Add hotkeys (<kbd>Tab/Shift+Tab</kbd>) to navigate through focusable elements.",
      "Add navigation through URL tags.",
    ],
  },
];

export default changelog;
