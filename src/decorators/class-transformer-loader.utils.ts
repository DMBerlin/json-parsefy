// Helper to safely load class-transformer in both CJS and ESM environments
export function loadClassTransformer(
  requireFn: (id: string) => any = typeof require !== "undefined"
    ? require
    : /* istanbul ignore next */ () => {
        throw new Error("require is not defined");
      },
): any {
  try {
    return requireFn("class-transformer");
  } catch {
    return null;
  }
}

export function warnMissingDependency(): void {
  // eslint-disable-next-line no-console
  console.warn(
    "JSONFlattener decorator requires 'class-transformer' as a peer dependency. " +
      "Install it with: npm install class-transformer",
  );
}
