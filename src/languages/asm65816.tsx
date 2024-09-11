import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { linter, Diagnostic } from "@codemirror/lint";
import { styleTags, tags as t } from "@lezer/highlight";
import { Asm65168ProgramFromCode } from "../models/asm65816-program.js";
// @ts-ignore
import { parser } from "./asm65816-parser.js";

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Comment: t.lineComment,
      Opcode: t.keyword,
      "A ConstByte ConstWord": t.number,
      "Byte Word Long": t.variableName,
      "X Y S ,": t.derefOperator,
      "( ) [ ]": t.paren,
    }),
  ],
});

export const asm65816Language = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: { commentTokens: { line: ";" } },
});

export default function asm65816() {
  return new LanguageSupport(asm65816Language, []);
}

export const asm65816Linter = linter((view) => {
  const diagnostics: Diagnostic[] = [];

  const code = view.contentDOM.innerText;
  const { errors } = Asm65168ProgramFromCode(code);
  errors.forEach((error) => diagnostics.push({ ...error, severity: "error" }));

  return diagnostics;
});
