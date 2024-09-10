import { LanguageSupport, LRLanguage } from "@codemirror/language";
import { linter, Diagnostic } from "@codemirror/lint";
import { Asm65168ProgramFromCode } from "../models/asm65168-program";
// @ts-ignore
import { parser } from "./asm65168-assembler-parser.js";

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

export const asm65168AssemblerLinter = linter((view) => {
  const diagnostics: Diagnostic[] = [];

  const code = view.contentDOM.innerText;
  const { errors } = Asm65168ProgramFromCode(code);
  errors.forEach((error) => diagnostics.push({ ...error, severity: "error" }));

  return diagnostics;
});
