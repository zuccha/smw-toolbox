import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { linter, Diagnostic } from "@codemirror/lint";
import { styleTags, tags as t } from "@lezer/highlight";
import { Asm65168ProgramFromCode } from "../models/asm65168-program";
// @ts-ignore
import { parser } from "./asm65168-parser.js";

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

export const asm65168Language = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: { commentTokens: { line: ";" } },
});

export default function asm65168() {
  return new LanguageSupport(asm65168Language, []);
}

export const asm65168Linter = linter((view) => {
  const diagnostics: Diagnostic[] = [];

  const code = view.contentDOM.innerText;
  const { errors } = Asm65168ProgramFromCode(code);
  errors.forEach((error) => diagnostics.push({ ...error, severity: "error" }));

  return diagnostics;
});
