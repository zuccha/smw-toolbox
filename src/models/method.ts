type Tail<Obj, Context, T extends any[]> = ((...t: T) => void) extends (
  obj: Obj,
  context: Context,
  ...rest: infer R
) => void
  ? R
  : never;

export type PureMethod<Obj, Context, Args extends any[], Return> = ((
  obj: Obj,
  context: Context,
  ...args: Args
) => Return) & {
  deps: (obj: Obj, context: Context) => unknown[];
};

export type Method<
  Obj,
  Context,
  Args extends any[],
  PM extends PureMethod<Obj, Context, Args, any>,
> = (...args: Tail<Obj, Context, Parameters<PM>>) => ReturnType<PM>;

export type Methods<
  Obj,
  Context,
  T extends Record<string, PureMethod<Obj, Context, any[], any>>,
> = {
  [method in keyof T]: Method<Obj, Context, any[], T[method]>;
};

export function methodDeps<
  Obj extends Record<string, unknown>,
  Context extends Record<string, unknown>,
>(
  objProps: (keyof Obj)[] = [],
  contextProps: (keyof Context)[] = [],
  methods: { deps: (obj: any, context: any) => unknown[] }[] = [],
): (obj: Obj | undefined, context: Context) => unknown[] {
  return (obj, context) => [
    ...(obj ? objProps.map((prop) => obj[prop]) : []),
    ...contextProps.map((prop) => context[prop]),
    ...methods.flatMap((method) => method.deps(obj, context)),
  ];
}

export type MethodDeps<
  Obj extends Record<string, unknown>,
  Context extends Record<string, unknown>,
> = typeof methodDeps<Obj, Context>;
