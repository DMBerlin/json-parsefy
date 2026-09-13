import { bfsParsing } from "../utils/bfs-parsing.utils";
import { TransformFnParams } from "../types/json-flattener.types";
import {
  loadClassTransformer,
  warnMissingDependency,
} from "./class-transformer-loader.utils";

export { loadClassTransformer, warnMissingDependency };

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
      } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(message);
      }
    }
    return value;
  });
}
