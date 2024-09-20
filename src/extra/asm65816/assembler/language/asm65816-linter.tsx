import { linter, Diagnostic } from "@codemirror/lint";
import Assembler from "../assembler";

const assembler = new Assembler();

const asm65816Linter = linter((view) => {
  const diagnostics: Diagnostic[] = [];

  assembler.code = view.contentDOM.innerText;
  assembler.assemble();
  assembler.errors.forEach((error) => {
    diagnostics.push({
      ...error.range,
      message: error.message,
      severity: "error",
    });
  });

  return diagnostics;
});

export default asm65816Linter;
