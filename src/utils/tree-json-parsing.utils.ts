import { isJsonParsable } from "@utils/json-validation.utils";
import { cleanJsonString } from "@utils/clean-json-string.utils";

export const treeParsing = (jsonString: string): Record<string, any> => {
  function parseNested(data: Record<string, any>): void {
    for (const key in data) {
      if (typeof data[key] === "string" && isJsonParsable(data[key])) {
        data[key] = cleanJsonString(data[key]);
        parseNested(data[key]);
      } else if (typeof data[key] === "object") {
        parseNested(data[key]);
      }
    }
  }
  if (!isJsonParsable(jsonString)) return;
  const jsonData: Record<string, any> = cleanJsonString(jsonString);
  parseNested(jsonData);
  return jsonData;
};
