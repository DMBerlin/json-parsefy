import { bfsParsing } from "../utils/bfs-parsing.utils";
import { TransformFnParams } from "../types/json-flattener.types";

export function JSONFlattener(): PropertyDecorator {
  let classTransformer: any;

  try {
    classTransformer = eval('require("class-transformer")');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      "JSONFlattener decorator requires 'class-transformer' as a peer dependency. " +
        "Install it with: npm install class-transformer",
    );
    return function () {};
  }

  if (!classTransformer || !classTransformer.Transform) {
    // eslint-disable-next-line no-console
    console.warn(
      "JSONFlattener decorator requires 'class-transformer' as a peer dependency. " +
        "Install it with: npm install class-transformer",
    );

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
