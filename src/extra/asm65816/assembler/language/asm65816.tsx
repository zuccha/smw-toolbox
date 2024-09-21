import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
// @ts-ignore
import { parser } from "./asm65816-parser.js";

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Comment: t.lineComment,
      Opcode: t.keyword,
      "A ConstByte ConstWord": t.number,
      "Byte Word Long MoveBanks": t.variableName,
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
