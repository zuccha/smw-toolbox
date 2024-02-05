import { useCallback } from "preact/hooks";
import { IntegerOperation } from "../../models/integer";
import { useCalculatorOperation } from "./store";

export const OperationLabel = {
  [IntegerOperation.And]: "AND",
  [IntegerOperation.Add]: "+",
  [IntegerOperation.Or]: "OR",
  [IntegerOperation.Subtract]: "-",
  [IntegerOperation.Xor]: "XOR",
};

export default function useOperations() {
  const [, setOperation] = useCalculatorOperation();

  const apply = useCallback(
    (nextOperation: IntegerOperation) => setOperation(nextOperation),
    [setOperation],
  );

  const add = useCallback(() => apply(IntegerOperation.Add), [apply]);
  const subtract = useCallback(() => apply(IntegerOperation.Subtract), [apply]);
  const and = useCallback(() => apply(IntegerOperation.And), [apply]);
  const or = useCallback(() => apply(IntegerOperation.Or), [apply]);
  const xor = useCallback(() => apply(IntegerOperation.Xor), [apply]);

  return { add, and, or, subtract, xor };
}
