import { bfsParsing } from "../utils/bfs-parsing.utils";

// Type definitions to avoid importing class-transformer when not available
type TransformFnParams = {
  value: any;
  key: string;
  obj: any;
  type: any;
};

export function JSONFlattener(): PropertyDecorator {
  let classTransformer: any;

  try {
    // Try to load class-transformer at runtime
    classTransformer = eval('require("class-transformer")');
  } catch (error) {
    // class-transformer not available
    // eslint-disable-next-line no-console
    console.warn(
      "JSONFlattener decorator requires 'class-transformer' as a peer dependency. " +
        "Install it with: npm install class-transformer",
    );

    // Return a no-op property decorator
    return function () {
      // No-op decorator that doesn't transform anything
    };
  }

  if (!classTransformer || !classTransformer.Transform) {
    // eslint-disable-next-line no-console
    console.warn(
      "JSONFlattener decorator requires 'class-transformer' as a peer dependency. " +
        "Install it with: npm install class-transformer",
    );

    return function () {
      // No-op decorator that doesn't transform anything
    };
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
