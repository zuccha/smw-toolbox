import { useMemo, useCallback } from "preact/hooks";
import { IntegerEncoding } from "../../models/integer";
import {
  useCalculatorOperand1,
  useCalculatorOperand2,
  useCalculatorOperation,
  useCalculatorUnit,
} from "./store";
import useResult from "./use-result";

export default function useActions(): {
  clear: () => void;
  finalize: () => void;
  swap: () => void;
} {
  const [unit] = useCalculatorUnit();

  const integerContext = useMemo(
    () => ({ encoding: IntegerEncoding.Bin, isSigned: false, unit }),
    [unit],
  );

  const [operand1, { setValue: setOperand1 }] =
    useCalculatorOperand1(integerContext);
  const [operand2, { setValue: setOperand2 }] =
    useCalculatorOperand2(integerContext);
  const [operation] = useCalculatorOperation();

  const [result] = useResult(operand1, operand2, operation, unit);

  const finalize = useCallback(() => {
    setOperand2(result.value);
  }, [result.value]);

  const clear = useCallback(() => {
    setOperand1(0);
    setOperand2(0);
  }, [setOperand1, setOperand2]);

  const swap = useCallback(() => {
    setOperand1(operand2.value);
    setOperand2(operand1.value);
  }, [operand1.value, operand2.value, setOperand1, setOperand2]);

  return { clear, finalize, swap };
}
