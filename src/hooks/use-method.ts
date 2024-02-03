import { useCallback } from "preact/hooks";
import { Method, PureMethod } from "../models/method";

export function useGetter<Obj, Context, Args extends any[]>(
  method: PureMethod<Obj, Context, Args, any>,
  methodContext: { obj: Obj; context: Context },
): Method<Obj, Context, Args, typeof method> {
  const { obj, context } = methodContext;
  return useCallback(
    (...args: Parameters<Method<Obj, Context, Args, typeof method>>) => {
      return method(obj, context, ...args);
    },
    method.deps(obj, context),
  );
}

export function useSetter<Obj, Context, Args extends any[]>(
  method: PureMethod<Obj, Context, Args, Obj>,
  methodContext: { obj: Obj; setObj: (obj: Obj) => void; context: Context },
): Method<Obj, Context, Args, typeof method> {
  const { obj, setObj, context } = methodContext;
  return useCallback(
    (...args: Parameters<Method<Obj, Context, Args, typeof method>>) => {
      const nextObj = method(obj, context, ...args);
      setObj(nextObj);
      return nextObj;
    },
    method.deps(obj, context),
  );
}
