import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
// @ts-ignore
import { parser } from "./asm-65168-editor-parser.js";

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Comment: t.lineComment,
      Opcode: t.keyword,
      "Byte Word Long": t.variableName,
      "X Y S ,": t.derefOperator,
      "A ImmediateByte ImmediateWord": t.number,
      "( ) [ ]": t.paren,
    }),
  ],
});

export const asm65168EditorLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: ";" },
  },
});

export default function asm65168Editor() {
  return new LanguageSupport(asm65168EditorLanguage, []);
}
