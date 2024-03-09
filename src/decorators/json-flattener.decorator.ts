import { Transform, TransformFnParams } from "class-transformer";
import { bfsParsing } from "@/utils/bfs-parsing.utils";

export function JSONFlattener(): PropertyDecorator {
  return Transform((params: TransformFnParams) => {
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
