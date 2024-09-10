import { LanguageSupport, LRLanguage } from "@codemirror/language";
// @ts-ignore
import { parser } from "./asm-65168-assembler-parser.js";

const parserWithMetadata = parser.configure({ props: [] });

export const asm65168AssemblerLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: ";" },
  },
});

export default function asm65168Assembler() {
  return new LanguageSupport(asm65168AssemblerLanguage, []);
}
