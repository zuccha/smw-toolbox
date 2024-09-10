import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
// @ts-ignore
import { parser } from "./asm-65168-parser.js";

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Instruction: t.keyword,
      "X Y S ,": t.derefOperator,
      "Byte Word Long": t.variableName,
      "A ImmediateByte ImmediateWord": t.number,
      Comment: t.lineComment,
      "( ) [ ]": t.paren,
    }),
  ],
});

const asm65168Language = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: ";" },
  },
});

export default function asm65168() {
  return new LanguageSupport(asm65168Language, []);
}
