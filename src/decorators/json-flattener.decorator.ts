import { Transform, TransformFnParams } from "class-transformer";
import { treeParsing } from "@utils/json-tree-parsing.utils";

export function JSONFlattener(): PropertyDecorator {
  return Transform((params: TransformFnParams) => {
    const value = params.value;
    if (typeof value === "string") {
      try {
        return treeParsing(value);
      } catch (error) {
        throw new Error(JSON.stringify(error));
      }
    }
    return value;
  });
}
