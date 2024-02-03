import { isJsonParsable } from "@utils/json-data-validation.utils";

export function cleanJsonString(
  result: string | Record<string, any>,
): Record<string, any> {
  if (isJsonParsable(result)) {
    return cleanJsonString(JSON.parse(result as string));
  } else {
    return result as Record<string, any>;
  }
}
