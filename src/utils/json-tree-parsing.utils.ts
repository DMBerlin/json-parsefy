import { isJsonParsable } from "@utils/json-data-validation.utils";
import { cleanJsonString } from "@utils/json-string-cleaner.utils";

export function treeParsing(jsonString: string): Record<string, any> {
  const bfs = (node: Record<string, any>): void => {
    for (const key in node) {
      if (isJsonParsable(node[key])) {
        node[key] = cleanJsonString(node[key]);
        bfs(node[key]);
      } else if (typeof node[key] === "object") {
        bfs(node[key]);
      }
    }
  };
  if (!isJsonParsable(jsonString)) return;
  const jsonData: Record<string, any> = cleanJsonString(jsonString);
  bfs(jsonData);
  return jsonData;
}
