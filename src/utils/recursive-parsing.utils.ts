import { isJsonParsable } from "../utils/data-validation.utils";

export function recursiveParsing<T = any>(result: unknown): T {
  if (isJsonParsable(result)) {
    return recursiveParsing<T>(JSON.parse(result as string));
  } else {
    return result as T;
  }
}
