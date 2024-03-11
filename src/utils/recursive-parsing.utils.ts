import { isJsonParsable } from "../utils/data-validation.utils";

export function recursiveParsing(
  result: string | Record<string, any>,
): Record<string, any> {
  if (isJsonParsable(result)) {
    return recursiveParsing(JSON.parse(result as string));
  } else {
    return result as Record<string, any>;
  }
}
