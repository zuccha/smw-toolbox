import { linter, Diagnostic } from "@codemirror/lint";
import Assembler from "../assembler";
import AssemblerError from "../assembler-error";

const assembler = new Assembler();

const asm65816Linter = linter((view) => {
  const diagnostics: Diagnostic[] = [];

  assembler.code = view.state.doc.toString();
  assembler.assemble();
  removeOuterErrors(assembler.errors).forEach((error) => {
    diagnostics.push({
      ...error.range,
      message: error.message,
      severity: "error",
    });
  });

  return diagnostics;
});

export default asm65816Linter;

function removeOuterErrors(errors: AssemblerError[]): AssemblerError[] {
  const sortedErrors = [...errors].sort((e1, e2) =>
    e1.range.from === e2.range.from
      ? e1.range.to - e2.range.to
      : e2.range.from - e1.range.from,
  );

  const filteredErrors: AssemblerError[] = [];
  let minTo = Infinity;

  for (const error of sortedErrors) {
    if (error.range.to <= minTo) {
      filteredErrors.push(error);
      minTo = error.range.to;
    }
  }

  return filteredErrors;
}
