# Changelog

## [1.2.0] - Unreleased

### Changed

- **Table Editor:** Move actions into section header.

### Fixed

- Restore small-caps in non-collapsible section headers.

### Removed

- **Table Editor:** Remove table above table.

## [1.0.1] - 2024-09-08

### Fixed

- Fix broken small-caps by replacing Inter with system font.

## [1.0.0] - 2024-02-06

### Added

- Add **Calculator** widget to display and edit numbers in binary, decimal, and hexadecimal formats.
- **Calculator:** Add Button and hotkey (`Ctrl+C`) to copy the selected value to the clipboard.
- **Calculator:** Add Button and hotkey (`Ctrl+V`) to paste the selected value from the clipboard.
- **Calculator:** Add Hotkey (`Space/Shift+Space`) to increment/decrement the selected digit by 1.
- **Calculator:** Add Hotkey (`&lt;/&gt;`) to shift the selected value left and right.
- **Calculator:** Add Hotkey (`{/}`) to rotate the selected value left and right.
- **Calculator:** Add Hotkey (`!`) to negate the selected value.
- **Calculator:** Add Hotkey (`Shift+Backspace/Shift+Delete`) to clear the selected value.
- **Calculator:** Add Setting and hotkey (`Q`) to toggle advanced mode, which allows to perform operations between two values.
- **Calculator (advanced):** Add Hotkey (`+`) to switch to addition operation.
- **Calculator (advanced):** Add Hotkey (`-`) to switch to subtraction operation.
- **Calculator (advanced):** Add Hotkey (`&`) to switch to logical AND operation.
- **Calculator (advanced):** Add Hotkey (`|`) to switch to logical OR operation.
- **Calculator (advanced):** Add Hotkey (`^`) to switch to logical XOR operation.
- **Calculator (advanced):** Add Hotkey (`=`) to move the result of the operation in operand 2.
- **Calculator (advanced):** Add Hotkey (`;`) to swap the two operands.
- **Calculator (advanced):** Add Hotkey (`Ctrl+Backspace/Ctrl+Delete`) to clear all operands.
- **Calculator:** Add Buttons to toggle values' visibility.
- **Calculator:** Add Setting and hotkeys (`Y/W`) to choose between byte (8 bits) or word (16 bits).
- **Calculator:** Add Setting and hotkeys (`I/O`) to choose how digits are inserted while typing (insert or overwrite).
- **Calculator:** Add Setting and hotkeys (`L/R`) to choose typing direction (left or right).
- **Calculator:** Add Setting and hotkey (`M`) to disable movement after typing a digit.
- **Calculator:** Add Setting and hotkey (`T`) to flip binary bits when clicking on a digit.
- **Calculator:** Add Setting to customize caret appearance (bar, box, underline).
- **Calculator:** Add Setting and hotkey (`N`) to display values as signed (they can be negative). The hotkey works only for decimals.
- **Calculator:** Add Setting to add some space every 4 or 8 digits.
- **Calculator:** Add Setting to display an on-screen keyboard, in compact or full mode (on mobile it's always in full mode).
- **Calculator:** Add Instructions detailing actions, operations, and settings, with their corresponding keybindings.
- Add **Table Editor** widget to edit an ASM data table.
- **Table Editor:** Add Multi-selection while holding `Shift/Ctrl/Cmd`.
- **Table Editor:** Add Background colors for cells, with every value having a different corresponding color.
- **Table Editor:** Add Button and hotkey (`Ctrl+C`) to copy the content of the table into the clipboard.
- **Table Editor:** Add Button and hotkey (`Ctrl+V`) to paste the content of the clipboard into the table.
- **Table Editor:** Add Arrow movement in the table.
- **Table Editor:** Add Setting to display the values in binary, decimal, or hexadecimal format.
- **Table Editor:** Add Setting and hotkey (`Y/W`) to choose between byte (8 bits) or word (16 bits).
- **Table Editor:** Add Settings to customize the width and height of the table (min 1x1, max 50x50).
- **Table Editor:** Add Setting to customize the table's name.
- **Table Editor:** Add Setting to choose the comment type for columns (number dec, number hex, value hex), applied on paste to clipboard.
- **Table Editor:** Add Setting to choose the comment type for rows (number dec, number hex, range hex), applied on paste to clipboard.
- **Table Editor:** Add Setting to choose the indentation for rows, applied on paste to clipboard.
- **Table Editor:** Add Setting to choose whether to add a space between row values or not, applied on paste to clipboard.
- **Table Editor:** Add Setting to select a background image for the table.
- **Table Editor:** Add Setting to toggle the background image's visibility.
- **Table Editor:** Add Setting to control the background image's opacity.
- **Table Editor:** Add Setting to change the background color associated with a decimal value.
- **Table Editor:** Add Button to reset the background color associated with a decimal value to its default.
- **Table Editor:** Add Setting to control the background color's opacity.
- **Table Editor:** Add An on-screen keyboard, visible only on mobile
- **Table Editor:** Add Instructions detailing actions and settings, with their corresponding keybindings.
- Add **App Settings** tab defining settings that affect all widgets.
- **App Settings:** Add Setting to enable/disable (most) hotkeys.
- **App Settings:** Add Setting to select between system, dark, or light mode.
- **App Settings:** Add Setting to select color palette for accents, including the disco palette.
- **App Settings:** Add Button to reset all settings and data.
- Add **App Info** tab containing generic information about the application.
- **App Info:** Add Info section with app name, version, date, and author, and link to source code.
- **App Info:** Add Changelog.
- **App Info:** Add License.
- Add hotkeys (`Ctrl+Digit`) to select tab.
- Add hotkeys (`Tab/Shift+Tab`) to navigate through focusable elements.
- Add navigation through URL tags.
