import { useMemo } from "preact/hooks";
import {
  Integer,
  IntegerBoundsUnsigned,
  IntegerFromValue,
  IntegerOperation,
  IntegerUnit,
} from "../../models/integer";
import { mod } from "../../utils";

export default function useResult(
  operand1: Integer,
  operand2: Integer,
  operation: IntegerOperation,
  unit: IntegerUnit,
): [Integer, () => Integer] {
  return useMemo(() => {
    const resultValue = (() => {
      switch (operation) {
        case IntegerOperation.Add:
          return mod(
            operand1.value + operand2.value,
            IntegerBoundsUnsigned[unit].max + 1,
          );
        case IntegerOperation.And:
          return operand1.value & operand2.value;
        case IntegerOperation.Or:
          return operand1.value | operand2.value;
        case IntegerOperation.Subtract:
          return mod(
            operand1.value - operand2.value,
            IntegerBoundsUnsigned[unit].max + 1,
          );
        case IntegerOperation.Xor:
          return operand1.value ^ operand2.value;
      }
    })();
    const result = IntegerFromValue(resultValue, { unit });
    return [result, () => result];
  }, [operand1.value, operand2.value, operation, unit]);
}
