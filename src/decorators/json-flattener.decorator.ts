import { bfsParsing } from "../utils/bfs-parsing.utils";
import { TransformFnParams } from "../types/json-flattener.types";

// Exported for testing
export function loadClassTransformer(): any {
  try {
    return eval('require("class-transformer")');
  } catch (error) {
    return null;
  }
}

// Exported for testing
export function warnMissingDependency(): void {
  // eslint-disable-next-line no-console
  console.warn(
    "JSONFlattener decorator requires 'class-transformer' as a peer dependency. " +
      "Install it with: npm install class-transformer",
  );
}

export function JSONFlattener(): PropertyDecorator {
  const classTransformer = loadClassTransformer();

  if (!classTransformer) {
    warnMissingDependency();
    return function () {};
  }

  if (!classTransformer.Transform) {
    warnMissingDependency();
    return function () {};
  }

  return classTransformer.Transform((params: TransformFnParams) => {
    const value = params.value;
    if (typeof value === "string") {
      try {
        return bfsParsing(value);
      } catch (error) {
        throw new Error(JSON.stringify(error));
      }
    }
    return value;
  });
}
