import { Transform, TransformFnParams } from "class-transformer";
import { cleanJsonString } from "@utils/clean-json-string.utils";

export function JSONFlattener(): PropertyDecorator {
  return Transform((params: TransformFnParams) => {
    const value = params.value;
    if (typeof value === "string") {
      try {
        return cleanJsonString(value);
      } catch (error) {
        throw new Error(JSON.stringify(error));
      }
    }
    return value;
  });
}
