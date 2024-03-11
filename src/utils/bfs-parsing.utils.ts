import { isJsonParsable } from "../utils/data-validation.utils";
import { recursiveParsing } from "../utils/recursive-parsing.utils";

export function bfsParsing(jsonString: string): Record<string, any> {
  const bfs = (node: Record<string, any>): void => {
    for (const key in node) {
      if (isJsonParsable(node[key])) {
        node[key] = recursiveParsing(node[key]);
        bfs(node[key]);
      } else if (typeof node[key] === "object") {
        bfs(node[key]);
      }
    }
  };
  if (!isJsonParsable(jsonString)) return;
  const jsonData: Record<string, any> = recursiveParsing(jsonString);
  bfs(jsonData);
  return jsonData;
}
